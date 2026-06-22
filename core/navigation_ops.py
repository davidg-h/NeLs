"""High-dimensional navigation operations for NELS nodes"""

import contextlib
import random
import time
import uuid
from collections.abc import Iterable
from pathlib import Path
from typing import Any

import numpy as np
import torch

from .dataset_ops import predict_cluster_for_new
from .encoding_ops import encode_prompts_pooled
from .projection_ops import project_trajectory
from .tensor_ops import (
    cosine_similarity,
    flatten_tensor,
    nearest_neighbors,
    normalize_tensor,
    selected_points,
    slerp,
    tensor_summary,
    validate_embedding_set,
)


def build_axis_projection(
    embedding_set: dict[str, Any],
    *,
    axis_group_a: list[str] | None = None,
    axis_group_b: list[str] | None = None,
    request_id: str | None = None,
    state_revision: int | None = None,
) -> dict[str, Any]:
    """Project all dataset points onto user-defined axis A->B; returns ranked scores

    Analyse-Space (unit-normalized embeddings) for direction math and scoring
    Generator-Space (raw embeddings) for trajectory conditioning tensors
    """
    validate_embedding_set(embedding_set)
    id_to_point = {str(p["id"]): p for p in embedding_set["points"]}

    if not axis_group_a or not axis_group_b:
        raise ValueError(
            "Semantic Axis Projection requires at least one point in Group A and one in Group B. "
            "Use 'Add selected' to assign points to each group."
        )
    group_a = [id_to_point[i] for i in axis_group_a if i in id_to_point]
    group_b = [id_to_point[i] for i in axis_group_b if i in id_to_point]
    if not group_a or not group_b:
        raise ValueError("axis_projection: both groups must have at least one valid point")

    # Generator-Space: raw embeddings for trajectory conditioning tensors
    all_raw = torch.stack([flatten_tensor(_point_embedding(p)) for p in embedding_set["points"]])
    id_to_idx = {str(p["id"]): i for i, p in enumerate(embedding_set["points"])}
    raw_centroid_a = all_raw[[id_to_idx[str(p["id"])] for p in group_a]].mean(dim=0)
    raw_centroid_b = all_raw[[id_to_idx[str(p["id"])] for p in group_b]].mean(dim=0)
    raw_origin = (raw_centroid_a + raw_centroid_b) / 2

    # Analyse-Space: unit-normalized embeddings for math/scoring
    all_norms = torch.linalg.vector_norm(all_raw, dim=1, keepdim=True).clamp_min(1e-12)
    X = all_raw / all_norms

    a_centroid = X[[id_to_idx[str(p["id"])] for p in group_a]].mean(dim=0)
    b_centroid = X[[id_to_idx[str(p["id"])] for p in group_b]].mean(dim=0)

    direction = b_centroid - a_centroid
    centroid_dist = float(torch.linalg.vector_norm(direction))
    if centroid_dist < 1e-8:
        raise ValueError("axis_projection: group centroids are identical")
    axis_1 = direction / centroid_dist

    # Axis 1 scores: origin = A/B midpoint, scale = centroid_dist/2 -> centroids map to +/-1
    origin = (a_centroid + b_centroid) / 2
    scale = centroid_dist / 2

    results: list[dict[str, Any]] = []
    for i, point in enumerate(embedding_set["points"]):
        score = float(torch.dot(X[i] - origin, axis_1).item()) / scale
        results.append({"id": point["id"], "label": point["label"], "projection_score": score})
    results.sort(key=lambda x: x["projection_score"], reverse=True)

    _N = 5
    _k1 = max(_N, len(results) // 10)
    axis_1_labels_b = _evenly_sample_labels(results[:_k1], _N)
    axis_1_labels_a = _evenly_sample_labels(results[-_k1:], _N)

    # Axis 1 LLM label (computed first so it can be excluded from Axis 2 candidates)
    axis_1_label: str | None = None
    with contextlib.suppress(Exception):
        from . import llm_ops

        top_l = [r["label"] for r in results[:_k1]]
        bot_l = [r["label"] for r in results[-_k1:]]
        mid = len(results) // 2
        neutral_l = [r["label"] for r in results[max(0, mid - 10) : mid + 10]]
        axis_1_label = llm_ops.label_axis(top_l, bot_l, neutral_labels=neutral_l)

    # Axis 2: SVD top-3 on residuals (centered on dataset_mean, Axis 1 component removed)
    mean = X.mean(dim=0)
    centered = X - mean
    proj1 = torch.mv(centered, axis_1)
    residuals = centered - proj1.unsqueeze(1) * axis_1.unsqueeze(0)

    components, variances, stability = _svd_top_k_components(residuals, k=5)

    axis_2: torch.Tensor | None = None
    axis_2_variance: float = 0.0
    axis_2_label: str | None = None
    axis_2_results: list[dict[str, Any]] | None = None
    axis_2_labels_neg: list[str] = []
    axis_2_labels_pos: list[str] = []
    axis_2_distance: float = 1.0

    if components and variances[0] >= 0.05:
        best_component: torch.Tensor | None = None
        best_combined = -1.0
        best_label: str | None = None
        best_variance = 0.0

        with contextlib.suppress(Exception):
            from . import llm_ops

            for comp, var in zip(components, variances, strict=True):
                # Re-orthogonalize against axis_1 to remove any residual component
                comp = comp - float(torch.dot(comp, axis_1)) * axis_1
                comp_norm = float(torch.linalg.vector_norm(comp))
                if comp_norm < 1e-8:
                    continue
                comp = comp / comp_norm

                cand_scores = [
                    float(torch.dot(residuals[i], comp).item())
                    for i in range(len(embedding_set["points"]))
                ]
                order = sorted(range(len(cand_scores)), key=lambda i: cand_scores[i])
                _ck = max(5, len(order) // 10)
                bot_l = [embedding_set["points"][i]["label"] for i in order[:_ck]]
                top_l = [embedding_set["points"][i]["label"] for i in order[-_ck:]]
                mid = len(order) // 2
                neutral_l = [
                    embedding_set["points"][i]["label"] for i in order[max(0, mid - 10) : mid + 10]
                ]

                cand_label, confidence = llm_ops.label_axis_candidate(
                    top_l, bot_l, neutral_labels=neutral_l, exclude_label=axis_1_label
                )
                combined = var * confidence
                if combined > best_combined:
                    best_combined = combined
                    best_component = comp
                    best_label = cand_label
                    best_variance = var

        if best_component is not None and best_combined > 0.0:
            axis_2 = best_component
            axis_2_variance = best_variance
            axis_2_label = best_label

            raw_scores = [
                float(torch.dot(residuals[i], axis_2).item())
                for i in range(len(embedding_set["points"]))
            ]

            raw_abs = torch.tensor(raw_scores).abs()
            axis_2_distance = float(
                torch.quantile(raw_abs, 0.95).item()
            )  # trajectory scale -> robust against outliers
            axis_2_display_scale = max(
                float(raw_abs.max().item()), 1e-8
            )  # display scale all scores in [-1, 1]

            axis_2_entries = [
                {
                    "id": embedding_set["points"][i]["id"],
                    "label": embedding_set["points"][i]["label"],
                    "projection_score": raw_scores[i] / axis_2_display_scale,
                }
                for i in range(len(embedding_set["points"]))
            ]
            axis_2_entries.sort(key=lambda x: x["projection_score"], reverse=True)
            axis_2_results = axis_2_entries

            _ak = max(_N, len(axis_2_entries) // 10)
            axis_2_labels_pos = _evenly_sample_labels(axis_2_entries[:_ak], _N)
            axis_2_labels_neg = _evenly_sample_labels(axis_2_entries[-_ak:], _N)

    return {
        "operation": "axis_projection",
        "request_id": request_id or uuid.uuid4().hex,
        "state_revision": int(state_revision or 0),
        "source_group_a": [str(p["id"]) for p in group_a],
        "source_group_b": [str(p["id"]) for p in group_b],
        "axis_projection": results,
        "axis_label": axis_1_label,
        "axis_b_projection": axis_2_results,
        "axis_b_label": axis_2_label,
        "axis_b_variance": axis_2_variance if axis_2 is not None else None,
        # Internal tensors for trajectory building
        "_raw_centroid_a": raw_centroid_a,
        "_raw_centroid_b": raw_centroid_b,
        "_raw_origin": raw_origin,
        "_axis_1": axis_1,
        "_axis_2": axis_2,
        "_axis_2_distance": axis_2_distance,
        "_axis_1_labels_a": axis_1_labels_a,
        "_axis_1_labels_b": axis_1_labels_b,
        "_axis_2_labels_neg": axis_2_labels_neg,
        "_axis_2_labels_pos": axis_2_labels_pos,
    }


def generate_variants(
    prompt: str, count: int, strength: float, *, random_seed: int = 42
) -> list[str]:
    """Generate text variants; uses word dropout at low strength LLM paraphrase at higher strength"""
    if strength < _LLM_STRENGTH_THRESHOLD:
        return _word_dropout(prompt, count, strength, random_seed=random_seed)
    try:
        from . import llm_ops

        llm_variants = llm_ops.paraphrase(prompt, count, strength)
        if len(llm_variants) >= count:
            return llm_variants[:count]
        print(f"[nels] LLM returned {len(llm_variants)}/{count} variants - padding with seed text")
        while len(llm_variants) < count:
            llm_variants.append(prompt)
        return llm_variants[:count]
    except Exception:
        pass
    return _word_dropout(prompt, count, strength, random_seed=random_seed)


def consistency_score_metrics(
    seed_vec: torch.Tensor,
    variant_vecs: list[torch.Tensor],
    dataset_vecs: list[torch.Tensor],
    *,
    inter_sample_size: int = 100,
    random_seed: int = 42,
) -> dict[str, float]:
    """Compute SC = mean_intra_dist / mean_inter_dist; lower = tighter semantic cluster"""
    seed_f = flatten_tensor(seed_vec).float()
    intra = [1.0 - cosine_similarity(seed_f, v) for v in variant_vecs]
    mean_intra = sum(intra) / len(intra)

    rng = random.Random(random_seed)
    sample = rng.sample(dataset_vecs, min(inter_sample_size, len(dataset_vecs)))
    inter = [1.0 - cosine_similarity(seed_f, v) for v in sample]
    mean_inter = sum(inter) / len(inter)

    sc = mean_intra / max(mean_inter, 1e-8)
    return {"mean_intra": float(mean_intra), "mean_inter": float(mean_inter), "sc_score": float(sc)}


def validate_alpha_schedule(
    alpha_schedule: Iterable[float],
    *,
    min_val: float = 0.0,
    max_val: float = 1.0,
) -> list[float]:
    """Validate an iterable of alpha values and return a sorted list of floats"""
    try:
        values = [float(v) for v in alpha_schedule]
    except Exception as exc:
        raise ValueError("alpha_schedule must be an iterable of numbers") from exc
    values = [v for v in values if v >= min_val and v <= max_val]
    if not values:
        raise ValueError(f"alpha_schedule must contain at least one value in [{min_val},{max_val}]")
    values.sort()
    return values


def build_interpolation_trajectory(
    embedding_set: dict[str, Any],
    selection: dict[str, Any],
    *,
    method: str,
    alpha_schedule: Iterable[float],
    request_id: str | None = None,
    state_revision: int | None = None,
) -> dict[str, Any]:
    """Build LERP/SLERP trajectory from the first two selected points"""
    points = selected_points(embedding_set, selection)
    if len(points) < 2:
        raise ValueError(f"{method.upper()} requires two selected points")

    start, end = points[0], points[1]
    embedding_type = embedding_set.get("embedding_type")
    source_texts = [
        start.get("metadata", {}).get("text", "") or start.get("label", ""),
        end.get("metadata", {}).get("text", "") or end.get("label", ""),
    ]

    alphas = validate_alpha_schedule(alpha_schedule)
    trajectory_points = []
    for index, alpha in enumerate(alphas):
        if method == "lerp":
            tensor = torch.lerp(_point_embedding(start), _point_embedding(end), float(alpha))
        elif method == "slerp":
            tensor = slerp(_point_embedding(start), _point_embedding(end), alpha)
        else:
            raise ValueError(f"Unsupported interpolation method: {method}")
        step = _trajectory_point(index, tensor, alpha, [start["id"], end["id"]], method)
        trajectory_points.append(step)

    return _trajectory_payload(
        operation=method,
        trajectory_points=trajectory_points,
        source_point_ids=[start["id"], end["id"]],
        source_texts=source_texts,
        request_id=request_id,
        state_revision=state_revision,
        embedding_type=embedding_type,
    )


def build_delta_walk_trajectory(
    embedding_set: dict[str, Any],
    selection: dict[str, Any],
    *,
    alpha_schedule: Iterable[float],
    request_id: str | None = None,
    state_revision: int | None = None,
) -> dict[str, Any]:
    """Build delta-walk trajectory from selected points"""
    validate_embedding_set(embedding_set)
    points = selected_points(embedding_set, selection)
    if len(points) < 3:
        raise ValueError(
            "delta_walk requires exactly 3 points: A (direction from), B (direction to), C (walk start)."
        )

    embedding_type = embedding_set.get("embedding_type")

    a_norm = normalize_tensor(_point_embedding(points[0]))
    b_norm = normalize_tensor(_point_embedding(points[1]))
    direction = b_norm - a_norm
    start = points[2]
    start_raw = _point_embedding(start)
    start_mag = float(torch.linalg.vector_norm(flatten_tensor(start_raw)))
    c_norm = normalize_tensor(start_raw)
    source_ids = [points[0]["id"], points[1]["id"], points[2]["id"]]
    source_texts = [p.get("metadata", {}).get("text", "") or p.get("label", "") for p in points[:3]]

    trajectory_points = []
    for index, scale in enumerate(
        validate_alpha_schedule(alpha_schedule, min_val=-2.0, max_val=4.0)
    ):
        stepped = normalize_tensor(c_norm + direction * float(scale))
        tensor = stepped * start_mag
        step = _trajectory_point(index, tensor, scale, source_ids, "delta_walk")
        trajectory_points.append(step)

    return _trajectory_payload(
        operation="delta_walk",
        trajectory_points=trajectory_points,
        source_point_ids=source_ids,
        source_texts=source_texts,
        request_id=request_id,
        state_revision=state_revision,
        embedding_type=embedding_type,
    )


def nearest_neighbor_result(
    embedding_set: dict[str, Any],
    selection: dict[str, Any],
    *,
    neighbor_count: int,
    request_id: str | None = None,
    state_revision: int | None = None,
) -> dict[str, Any]:
    """Rank nearest neighbors for all selected points, one query per point"""
    validate_embedding_set(embedding_set)
    query_points = selected_points(embedding_set, selection)
    if not query_points:
        raise ValueError("nearest_neighbor requires at least one selected point")

    candidates = embedding_set["points"]
    selected_id_set = {str(p["id"]) for p in query_points}
    # Fetch extra candidates per query to account for selected points being skipped
    limit = max(1, int(neighbor_count) + len(query_points))

    all_neighbors: list[dict[str, Any]] = []
    for query in query_points:
        query_id = str(query["id"])
        ranked = nearest_neighbors(
            _point_embedding(query),
            [_point_embedding(point) for point in candidates],
            limit=limit,
        )
        count = 0
        for index, score in ranked:
            candidate = candidates[index]
            cid = str(candidate["id"])
            if cid in selected_id_set:
                continue
            all_neighbors.append(
                {
                    "id": candidate["id"],
                    "label": candidate["label"],
                    "score": float(score),
                    "metadata": candidate.get("metadata", {}),
                    "query_id": query_id,
                }
            )
            count += 1
            if count >= int(neighbor_count):
                break

    return {
        "operation": "nearest_neighbor",
        "request_id": request_id or uuid.uuid4().hex,
        "state_revision": int(state_revision or 0),
        "source_point_ids": [str(p["id"]) for p in query_points],
        "neighbors": all_neighbors,
    }


def trajectory_result_summary(
    trajectory: dict[str, Any],
    embedding_set: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Graph-readable JSON summary for a trajectory, annotates steps with top-3 kNN if embedding_set given"""
    points = trajectory.get("points", [])
    steps = []
    for point in points:
        step: dict[str, Any] = {
            "index": point.get("index"),
            "id": point.get("id"),
            "alpha": point.get("alpha"),
            "norm": point.get("norm"),
            "tensor_shape": point.get("tensor_shape", []),
            "dtype": point.get("dtype"),
        }
        if embedding_set is not None and point.get("tensor") is not None:
            step["nearest_top_k"] = _nearest_real_samples(point["tensor"], embedding_set, k=3)
        steps.append(step)

    return {
        "operation": trajectory.get("operation"),
        "request_id": trajectory.get("request_id"),
        "state_revision": trajectory.get("state_revision", 0),
        "source_point_ids": trajectory.get("source_point_ids", []),
        "trajectory": steps,
    }


def build_consistency_check_result(
    seed_prompt: str,
    seed_point_id: str,
    variant_count: int,
    variation_strength: float,
    clip_obj: Any,
    embedding_set: dict[str, Any],
    dataset_path: str,
    request_id: str,
    state_revision: int,
    *,
    random_seed: int = 42,
) -> tuple[dict[str, Any], dict[str, Any]]:
    """Generate variants, encode with CLIP, compute SC metrics, and project to UMAP coords

    Returns (result, trajectory) - trajectory has one step per variant (+ seed at index 0),
    each with source_text_index for per-step conditioning in NelsPromptConditioningBatch
    """
    variants = generate_variants(
        seed_prompt, variant_count, variation_strength, random_seed=random_seed
    )
    all_texts = [seed_prompt] + variants
    encoded = encode_prompts_pooled(clip_obj, all_texts)

    seed_vec = torch.from_numpy(encoded[0]).float()
    variant_vecs = [torch.from_numpy(encoded[i + 1]).float() for i in range(len(variants))]
    dataset_vecs = [
        flatten_tensor(_point_embedding(p)).float() for p in embedding_set.get("points", [])
    ]

    metrics = consistency_score_metrics(
        seed_vec, variant_vecs, dataset_vecs, random_seed=random_seed
    )

    cluster_results, _ = (
        predict_cluster_for_new(Path(dataset_path), encoded[1:])
        if dataset_path
        else (
            [{"cluster_global": -1, "is_noise": True, "membership_strength": 0.0}] * len(variants),
            None,
        )
    )

    cv_items = [
        {
            "id": f"cv_{i:04d}",
            "text": variants[i],
            "cosine_sim": cosine_similarity(seed_vec, variant_vecs[i]),
            "cluster_id": None
            if cluster_results[i].get("is_noise")
            else cluster_results[i].get("cluster_global"),
        }
        for i in range(len(variants))
    ]

    traj_pts = [
        {"id": f"cv_{i:04d}", "alpha": i / max(len(variants) - 1, 1), "tensor": variant_vecs[i]}
        for i in range(len(variants))
    ]
    overlay, _ = project_trajectory(traj_pts, dataset_path)
    for pt in overlay:
        idx_str = pt["id"].split("_")[-1]
        idx = int(idx_str) if idx_str.isdigit() else -1
        if 0 <= idx < len(variants):
            pt["label"] = variants[idx]
            pt["cluster_id"] = cv_items[idx].get("cluster_id")

    coords_by_id = {pt["id"]: pt for pt in overlay}
    for item in cv_items:
        pt = coords_by_id.get(item["id"], {})
        if pt.get("coords_2d"):
            item["coords_2d"] = pt["coords_2d"]
        if pt.get("coords_3d"):
            item["coords_3d"] = pt["coords_3d"]

    result = {
        "operation": "consistency_check",
        "request_id": request_id,
        "state_revision": state_revision,
        "seed_point_id": seed_point_id,
        "seed_prompt": seed_prompt,
        "consistency_score": metrics["sc_score"],
        "mean_intra": metrics["mean_intra"],
        "mean_inter": metrics["mean_inter"],
        "consistency_variants": cv_items,
        "trajectory_overlay": overlay,
    }

    # Trajectory: seed at step 0, then each variant -> per-step text via source_text_index
    all_vecs = [seed_vec] + variant_vecs
    traj_points = []
    for i, vec in enumerate(all_vecs):
        pt = _trajectory_point(
            i, vec, i / max(len(all_vecs) - 1, 1), [seed_point_id], "consistency_check"
        )
        pt["source_text_index"] = i
        traj_points.append(pt)

    trajectory = _trajectory_payload(
        operation="consistency_check",
        trajectory_points=traj_points,
        source_point_ids=[seed_point_id],
        source_texts=all_texts,
        request_id=request_id,
        state_revision=state_revision,
    )

    return result, trajectory


def build_text_reconstruction(
    target_embedding: np.ndarray,
    seed_texts: list[str],
    clip_obj: Any,
    llm_ops: Any | None = None,
    *,
    noise_texts: list[str] | None = None,
    negative_texts: list[str] | None = None,
    n_iter: int = 10,
    beam_width: int = 8,
    max_minutes: float = 5.0,
    convergence_threshold: float = 0.002,
    convergence_patience: int = 4,
    on_iteration: Any | None = None,
) -> dict[str, Any]:
    """Iterative LLM beam search for a novel prompt near target_embedding

    - Seeds + noise bootstrap the first LLM call and then dropped
    - Negatives steer the LLM away from unrelated concepts every iteration
    - Beam contains only LLM-generated candidates throughout
    - Returns the best result plus one snapshot (raw CLIP embedding + best text) for the
      starting point and each step where the best similarity genuinely improved, for
      trajectory construction

    Stops when: max iterations reached, time limit reached, no candidates returned, or best cosine sim hasn't improved by > convergence_threshold for convergence_patience consecutive iterations.
    """
    if not seed_texts or llm_ops is None:
        return {"text": "", "cosine_sim": 0.0, "snapshots": []}

    _t_norm = target_embedding / (np.linalg.norm(target_embedding) + 1e-8)
    positives = list(dict.fromkeys(t for t in (seed_texts + (noise_texts or [])) if t))
    negatives = negative_texts or []
    deadline = time.monotonic() + max_minutes * 60

    # raw CLIP vecs per text -> used later to build trajectory point tensors
    text_to_raw_vec: dict[str, np.ndarray] = {}

    # bootstrap beam from seeds + noise (none of these enter the beam)
    initial: list[str] = []
    with contextlib.suppress(Exception):
        initial = llm_ops.probe_synthesize(positives, negatives, count=beam_width * 2)

    if not initial:
        return {"text": "", "cosine_sim": 0.0, "snapshots": []}

    vecs = encode_prompts_pooled(clip_obj, initial)
    scored = []
    for txt, rv in zip(initial, vecs, strict=True):
        rn = np.linalg.norm(rv)
        sim = float(np.dot(rv / (rn + 1e-8), _t_norm)) if rn > 1e-8 else 0.0
        scored.append((sim, txt))
        text_to_raw_vec[txt] = rv
    scored.sort(reverse=True)
    beam: list[tuple[float, str]] = scored[:beam_width]

    snapshots: list[dict[str, Any]] = []

    def _snapshot(step: int) -> None:
        best_sim, best_text = beam[0]
        snapshots.append(
            {
                "step": step,
                "text": best_text,
                "cosine_sim": best_sim,
                "embedding": text_to_raw_vec.get(best_text),
            }
        )

    # Step 1 is always recorded - the starting point before any refinement
    _snapshot(1)
    if on_iteration is not None:
        with contextlib.suppress(Exception):
            on_iteration(1, beam[0][1], beam[0][0])

    # Steps 2..n_iter: refinement
    no_improve_streak = 0
    prev_best = beam[0][0]
    last_snapshot_best = beam[0][0]
    stopped_early = False
    final_step = 1

    for step in range(2, n_iter + 1):
        final_step = step
        if time.monotonic() >= deadline:
            stopped_early = True
            break

        candidates: list[str] = []
        with contextlib.suppress(Exception):
            candidates = llm_ops.probe_suggest_iter(beam, negatives, count=beam_width * 2)

        if not candidates:
            stopped_early = True
            break

        cand_vecs = encode_prompts_pooled(clip_obj, candidates)
        new_scored = []
        for txt, rv in zip(candidates, cand_vecs, strict=True):
            rn = np.linalg.norm(rv)
            sim = float(np.dot(rv / (rn + 1e-8), _t_norm)) if rn > 1e-8 else 0.0
            new_scored.append((sim, txt))
            text_to_raw_vec[txt] = rv

        combined = sorted(beam + new_scored, reverse=True)
        seen: set[str] = set()
        new_beam: list[tuple[float, str]] = []
        for s, t in combined:
            if t not in seen:
                seen.add(t)
                new_beam.append((s, t))
            if len(new_beam) == beam_width:
                break

        beam = new_beam
        if on_iteration is not None:
            with contextlib.suppress(Exception):
                on_iteration(step, beam[0][1], beam[0][0])
        current_best = beam[0][0]
        if current_best - prev_best > convergence_threshold:
            no_improve_streak = 0
            prev_best = current_best
        else:
            no_improve_streak += 1
            if no_improve_streak >= convergence_patience:
                stopped_early = True

        # Snapshot threshold is independent of (and smaller than) the stop threshold,
        # so small-but-real movement still shows up on the trajectory without needing
        # to keep searching longer than the stop logic deems worthwhile.
        if current_best - last_snapshot_best > _SNAPSHOT_MIN_IMPROVEMENT:
            last_snapshot_best = current_best
            _snapshot(step)

        if stopped_early:
            break

    llm_ops.unload()
    best_sim, best_text = beam[0]
    # Always append the final result as the last trajectory point, so the user-facing
    # reconstruction is guaranteed to match the trajectory's last step
    _snapshot(final_step)
    return {"text": best_text, "cosine_sim": best_sim, "snapshots": snapshots}


def build_axis_trajectory(
    axis_projection_result: dict[str, Any],
    *,
    alpha_schedule: list[float] | None = None,
    request_id: str | None = None,
    state_revision: int | None = None,
) -> dict[str, Any]:
    """Build trajectory along Axis 1 (A->B) and optionally Axis 2 (orthogonal)

    Pooled cond: lerp between raw Generator-Space centroids
    Seq cond: lerp between mean of N=5 exemplar seq_conds per side (via seq_cond_group_size)
    source_text_pair=0 for Axis 1, source_text_pair=1 for Axis 2
    source_texts layout: [a_1..a_N, b_1..b_N] or [a_1..a_N, b_1..b_N, neg_1..neg_N, pos_1..pos_N]
    """
    raw_centroid_a: torch.Tensor = axis_projection_result["_raw_centroid_a"]
    raw_centroid_b: torch.Tensor = axis_projection_result["_raw_centroid_b"]
    raw_origin: torch.Tensor = axis_projection_result["_raw_origin"]
    axis_2: torch.Tensor | None = axis_projection_result.get("_axis_2")
    axis_2_distance: float = axis_projection_result.get("_axis_2_distance", 1.0)
    axis_1_labels_a: list[str] = axis_projection_result.get("_axis_1_labels_a", [])
    axis_1_labels_b: list[str] = axis_projection_result.get("_axis_1_labels_b", [])
    axis_2_labels_neg: list[str] = axis_projection_result.get("_axis_2_labels_neg", [])
    axis_2_labels_pos: list[str] = axis_projection_result.get("_axis_2_labels_pos", [])

    alphas = alpha_schedule if alpha_schedule is not None else [0.0, 0.25, 0.5, 0.75, 1.0]
    N = len(axis_1_labels_a)

    points = []
    for i, alpha in enumerate(alphas):
        tensor = torch.lerp(raw_centroid_a, raw_centroid_b, float(alpha))
        pt = _trajectory_point(i, tensor, float(alpha), [], "axis_projection")
        pt["source_text_pair"] = 0
        points.append(pt)

    # source_texts: [a_1..a_N, b_1..b_N, (neg_1..neg_N, pos_1..pos_N if axis_2)]
    source_texts = axis_1_labels_a + axis_1_labels_b

    if axis_2 is not None:
        offset = len(points)
        for j, alpha in enumerate(alphas):
            scale = 2.0 * float(alpha) - 1.0
            tensor = raw_origin + scale * axis_2 * axis_2_distance
            pt = _trajectory_point(offset + j, tensor, float(alpha), [], "axis_orth")
            pt["source_text_pair"] = 1
            points.append(pt)
        source_texts += axis_2_labels_neg + axis_2_labels_pos

    payload = _trajectory_payload(
        operation="axis_projection",
        trajectory_points=points,
        source_point_ids=list(axis_projection_result.get("source_group_a", []))
        + list(axis_projection_result.get("source_group_b", [])),
        source_texts=source_texts,
        request_id=request_id,
        state_revision=state_revision,
    )
    payload["seq_cond_group_size"] = N
    return payload


def build_latent_probe_recon_trajectory(
    snapshots: list[dict[str, Any]],
    fallback_embedding: np.ndarray,
    *,
    request_id: str | None = None,
    state_revision: int | None = None,
) -> dict[str, Any]:
    """Build trajectory from text-reconstruction snapshots, one point per snapshot

    Falls back to fallback_embedding when a snapshot has no captured embedding
    """
    trajectory_points = []
    source_texts = []
    for i, snap in enumerate(snapshots):
        alpha = i / max(len(snapshots) - 1, 1)
        raw_emb = snap.get("embedding")
        tensor = (
            torch.from_numpy(raw_emb).float()
            if raw_emb is not None
            else torch.from_numpy(fallback_embedding).float()
        )
        pt = _trajectory_point(i, tensor, alpha, [], "latent_probe_recon")
        pt["source_text_index"] = i
        trajectory_points.append(pt)
        source_texts.append(snap.get("text") or "")

    return _trajectory_payload(
        operation="latent_probe",
        trajectory_points=trajectory_points,
        source_point_ids=[],
        source_texts=source_texts,
        request_id=request_id,
        state_revision=state_revision,
    )


# ---- internals ----

_LLM_STRENGTH_THRESHOLD = 0.35
_WORD_DROPOUT_MAX_FRACTION = 0.2
_SNAPSHOT_MIN_IMPROVEMENT = 0.0005


def _evenly_sample_labels(items: list[dict[str, Any]], n: int) -> list[str]:
    """Sample n items evenly spaced from list, return their labels"""
    if len(items) <= n:
        return [r["label"] for r in items]
    indices = [round(i * (len(items) - 1) / (n - 1)) for i in range(n)]
    return [items[idx]["label"] for idx in indices]


def _point_embedding(point: dict[str, Any]) -> torch.Tensor:
    return flatten_tensor(point["tensor"])


def _svd_top_k_components(
    matrix: torch.Tensor,
    k: int = 3,
) -> tuple[list[torch.Tensor], list[float], float]:
    """Top-k principal components of matrix rows via SVD

    returns (components, per_component_variance_ratios, stability=S[0]/S[1])
    stability < 1.3 means top components are too similar to trust
    """
    if matrix.shape[0] < 2:
        return [], [], 0.0
    try:
        _, s, vh = torch.linalg.svd(matrix, full_matrices=False)
        total = float((s**2).sum())
        if total < 1e-12:
            return [], [], 0.0
        n = min(k, len(s))
        stability = float(s[0] / s[1]) if len(s) > 1 else float("inf")
        components = [vh[i] for i in range(n)]
        variances = [float(s[i] ** 2) / total for i in range(n)]
        return components, variances, stability
    except Exception:
        return [], [], 0.0


def _word_dropout(
    prompt: str,
    count: int,
    strength: float,
    *,
    random_seed: int = 42,
) -> list[str]:
    """Word-dropout fallback for variant generation"""
    words = prompt.split()
    rng = random.Random(random_seed)
    # Cap how much of the prompt can be dropped regardless of strength, so low-strength
    # variants stay close in length to the seed instead of losing a third of their words
    dropout_n = max(
        0, min(len(words) - 1, round(min(strength, _WORD_DROPOUT_MAX_FRACTION) * len(words)))
    )
    seen: set[str] = set()
    variants: list[str] = []
    for _ in range(count * 8):
        w = words[:]
        if dropout_n > 0:
            drop_idx = set(rng.sample(range(len(w)), k=dropout_n))
            w = [word for i, word in enumerate(w) if i not in drop_idx]
        if strength > 0.55 and len(w) > 1:
            rng.shuffle(w)
        v = " ".join(w).strip()
        if v and v not in seen:
            seen.add(v)
            variants.append(v)
        if len(variants) >= count:
            break
    while len(variants) < count:
        variants.append(prompt)
    return variants[:count]


def _nearest_real_samples(
    tensor: torch.Tensor,
    embedding_set: dict[str, Any],
    k: int = 3,
) -> list[dict[str, Any]]:
    """Top-k nearest real samples (cosine), deduped by label"""
    candidates = embedding_set.get("points", [])
    if not candidates:
        return []
    ranked = nearest_neighbors(
        tensor,
        [_point_embedding(p) for p in candidates],
        limit=min(len(candidates), k * 4),
    )
    seen_labels: set[str] = set()
    result: list[dict[str, Any]] = []
    for idx, score in ranked:
        label = str(candidates[idx].get("label", candidates[idx]["id"]))
        if label in seen_labels:
            continue
        seen_labels.add(label)
        result.append(
            {
                "id": str(candidates[idx]["id"]),
                "distance": float(score),
                "label": label,
            }
        )
        if len(result) >= k:
            break
    return result


def _trajectory_point(
    index: int,
    tensor: torch.Tensor,
    alpha: float,
    source_point_ids: list[str],
    operation: str,
) -> dict[str, Any]:
    """Format a trajectory/interpolated point with metadata and tensor summary"""
    t_float = tensor.detach().float()
    return {
        "id": f"{operation}_{index:04d}",
        "index": int(index),
        "alpha": float(alpha),
        "tensor": tensor,
        "norm": float(t_float.norm().item()),
        "source_point_ids": list(source_point_ids),
        **tensor_summary(tensor),
    }


def _trajectory_payload(
    *,
    operation: str,
    trajectory_points: list[dict[str, Any]],
    source_point_ids: list[str],
    source_texts: list[str],
    request_id: str | None,
    state_revision: int | None,
    embedding_type: str | None = None,
) -> dict[str, Any]:
    """Format the full trajectory payload with metadata and tensor summaries"""
    return {
        "type": "NELS_TRAJECTORY",
        "operation": operation,
        "request_id": request_id or uuid.uuid4().hex,
        "state_revision": int(state_revision or 0),
        "source_point_ids": list(source_point_ids),
        "source_texts": list(source_texts),
        "points": trajectory_points,
        "embedding_type": embedding_type,
    }
