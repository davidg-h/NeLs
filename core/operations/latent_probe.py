"""Latent space probe operation for NELS sessions: inverse projection + text reconstruction"""

import contextlib
import json
import time
from pathlib import Path
from typing import Any

import numpy as np
import torch

from ..dataset_ops import predict_cluster_for_new
from ..defaults import EPS_NORM
from ..encoding_ops import encode_prompts_real_conditioning
from ..tensor_ops import trajectory_payload, trajectory_point
from ..text_terms import clean_llm_line


def inverse_project(
    coords: list[float],
    dataset_path: str,
    *,
    mode: str = "2d",
    neighbor_count: int = 5,
    loaded_points: list[dict[str, Any]] | None = None,
) -> tuple[list[dict[str, Any]], np.ndarray, dict[str, Any]]:
    """Use raw projection coords -> estimated embedding, top-k nearest prompts

    Embedding estimation always uses the full dataset for accuracy
    """
    path = Path(dataset_path)
    ref_key = "umap_2d.npy" if mode == "2d" else "umap_3d.npy"
    ref_path = path / ref_key
    pooled_path = path / "compact_embeddings.npy"
    if not ref_path.exists() or not pooled_path.exists():
        raise FileNotFoundError(f"Dataset files missing in {path}")

    # 1: estimate high-dim embedding from full dataset
    ref: np.ndarray = np.load(str(ref_path))
    pooled: np.ndarray = np.load(str(pooled_path), mmap_mode="r")
    query_raw = np.array(coords, dtype=np.float32)
    ref_f32 = ref.astype(np.float32)
    dists = np.linalg.norm(ref_f32 - query_raw, axis=1)
    k_inv = min(10, len(ref_f32))
    nn_idx = np.argpartition(dists, k_inv)[:k_inv]
    weights = 1.0 / (dists[nn_idx] + 1e-8)
    weights /= weights.sum()
    q = (np.array(pooled[nn_idx], dtype=np.float32) * weights[:, None]).sum(axis=0)

    cluster_results = predict_cluster_for_new(path, q.reshape(1, -1))
    cluster_hit = cluster_results[0]
    cluster_info = {
        "cluster_id": None if cluster_hit.get("is_noise") else cluster_hit.get("cluster_global"),
        "is_noise": bool(cluster_hit.get("is_noise")),
        "membership_strength": float(cluster_hit.get("membership_strength") or 0.0),
    }

    # 2: nearest-prompts kNN on loaded points
    if loaded_points:
        valid: list[tuple[dict, np.ndarray]] = []
        for pt in loaded_points:
            t = pt.get("tensor")
            if t is not None:
                emb = (
                    t.detach().float().cpu().numpy().ravel()
                    if hasattr(t, "detach")
                    else np.array(t, dtype=np.float32).ravel()
                )
                valid.append((pt, emb))
        if valid:
            lp_matrix = np.stack([emb for _, emb in valid]).astype(np.float32)
            ranked_local = _cosine_knn_numpy(q, lp_matrix, k=min(neighbor_count, len(valid)))
            results = []
            for local_idx, score in ranked_local:
                pt, emb = valid[local_idx]
                results.append(
                    {
                        "id": str(pt.get("id", f"p_{local_idx:06d}")),
                        "label": str(pt.get("label") or pt.get("id", ""))[:80],
                        "score": float(score),
                        "_embedding": emb,
                        "full_text": pt.get("metadata", {}).get("text"),
                    }
                )
            return results, q, cluster_info

    # Fallback: full dataset search (results may not be selectable in canvas)
    samples_path = path / "samples.jsonl"
    if not samples_path.exists():
        raise FileNotFoundError(f"samples.jsonl missing in {path}")
    ranked_full = _cosine_knn_numpy(q, pooled, k=neighbor_count)
    needed = {idx for idx, _ in ranked_full}
    samples: dict[int, dict] = {}
    with samples_path.open(encoding="utf-8") as f:
        for line_no, line in enumerate(f):
            if line_no in needed:
                samples[line_no] = json.loads(line)
            if len(samples) == len(needed):
                break
    results = []
    for idx, score in ranked_full:
        if idx not in samples:
            continue
        s = samples[idx]
        results.append(
            {
                "id": s.get("id", f"p_{idx:06d}"),
                "label": (s.get("text") or s.get("id", ""))[:80],
                "score": float(score),
                "_embedding": pooled[idx],
                "full_text": s.get("text"),
            }
        )
    return results, q, cluster_info


def build_text_reconstruction(
    target_embedding: np.ndarray,
    seed_texts: list[str],
    clip_obj: Any,
    *,
    noise_texts: list[str] | None = None,
    negative_texts: list[str] | None = None,
    n_iter: int = 10,
    beam_width: int = 8,
    max_minutes: float = 5.0,
    convergence_threshold: float = 0.0007,
    convergence_patience: int = 4,
    on_iteration: Any | None = None,
) -> dict[str, Any]:
    """Iterative LLM beam search for a novel prompt near target_embedding

    - Seeds + noise bootstrap the first LLM call and then dropped
    - Negatives steer the LLM away from unrelated concepts every iteration
    - Beam contains only LLM-generated candidates throughout
    - Returns the best result plus one snapshot (real conditioning + compact embedding + best text)
      for the starting point and each step where the best similarity genuinely improved, for
      trajectory construction

    Stops when: max iterations reached, time limit reached, no candidates returned, or best cosine sim hasn't improved by > convergence_threshold for convergence_patience consecutive iterations.
    """
    if not seed_texts:
        return {"text": "", "cosine_sim": 0.0, "snapshots": []}

    _t_norm = target_embedding / (np.linalg.norm(target_embedding) + EPS_NORM)
    positives = list(dict.fromkeys(t for t in (seed_texts + (noise_texts or [])) if t))
    negatives = negative_texts or []
    deadline = time.monotonic() + max_minutes * 60
    from .. import llm_ops  # heavy transformers dependency - only load when reconstruction runs

    # per-text encoded state -> used later to build trajectory point tensors and sampler conds
    text_to_state: dict[str, dict[str, Any]] = {}

    # bootstrap beam from seeds + noise (none of these enter the beam)
    initial: list[str] = []
    with contextlib.suppress(Exception):
        initial = probe_synthesize(positives, negatives, count=beam_width * 2)

    if not initial:
        return {"text": "", "cosine_sim": 0.0, "snapshots": []}

    encoded_initial = encode_prompts_real_conditioning(clip_obj, initial)
    scored = []
    for txt, state in zip(initial, encoded_initial, strict=True):
        rv = state["embedding"].detach().cpu().numpy()
        rn = np.linalg.norm(rv)
        sim = float(np.dot(rv / (rn + EPS_NORM), _t_norm)) if rn > EPS_NORM else 0.0
        scored.append((sim, txt))
        text_to_state[txt] = {
            "embedding": rv.copy(),
            "cond": state["cond"].detach().float(),
            "pooled_output": (
                state["pooled_output"].detach().float()
                if state["pooled_output"] is not None
                else None
            ),
        }
    scored.sort(reverse=True)
    beam: list[tuple[float, str]] = scored[:beam_width]

    snapshots: list[dict[str, Any]] = []

    def _snapshot(step: int) -> None:
        best_sim, best_text = beam[0]
        state = text_to_state.get(best_text, {})
        snapshots.append(
            {
                "step": step,
                "text": best_text,
                "cosine_sim": best_sim,
                "embedding": state.get("embedding"),
                "cond": state.get("cond"),
                "pooled_output": state.get("pooled_output"),
            }
        )

    def _ensure_final_snapshot(step: int) -> None:
        best_sim, best_text = beam[0]
        state = text_to_state.get(best_text, {})
        if snapshots and snapshots[-1].get("text") == best_text:
            snapshots[-1]["step"] = step
            snapshots[-1]["cosine_sim"] = best_sim
            snapshots[-1]["embedding"] = state.get("embedding")
            snapshots[-1]["cond"] = state.get("cond")
            snapshots[-1]["pooled_output"] = state.get("pooled_output")
            return
        snapshots.append(
            {
                "step": step,
                "text": best_text,
                "cosine_sim": best_sim,
                "embedding": state.get("embedding"),
                "cond": state.get("cond"),
                "pooled_output": state.get("pooled_output"),
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
            candidates = probe_suggest_iter(beam, negatives, count=beam_width * 2)

        if not candidates:
            stopped_early = True
            break

        encoded_candidates = encode_prompts_real_conditioning(clip_obj, candidates)
        new_scored = []
        for txt, state in zip(candidates, encoded_candidates, strict=True):
            rv = state["embedding"].detach().cpu().numpy()
            rn = np.linalg.norm(rv)
            sim = float(np.dot(rv / (rn + EPS_NORM), _t_norm)) if rn > EPS_NORM else 0.0
            new_scored.append((sim, txt))
            text_to_state[txt] = {
                "embedding": rv.copy(),
                "cond": state["cond"].detach().float(),
                "pooled_output": (
                    state["pooled_output"].detach().float()
                    if state["pooled_output"] is not None
                    else None
                ),
            }

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
        # so small-but-real movement still shows up on the trajectory
        if current_best - last_snapshot_best > _SNAPSHOT_MIN_IMPROVEMENT:
            last_snapshot_best = current_best
            _snapshot(step)

        if stopped_early:
            break

    llm_ops.unload()
    best_sim, best_text = beam[0]
    # Always append the final result as the last trajectory point, so the user-facing
    # reconstruction is guaranteed to match the trajectory's last step without duplication
    _ensure_final_snapshot(final_step)
    return {"text": best_text, "cosine_sim": best_sim, "snapshots": snapshots}


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
        pt = trajectory_point(i, tensor, alpha, "latent_probe_recon")
        pt["source_text_index"] = i
        cond = snap.get("cond")
        if cond is not None:
            pt["cond"] = (
                cond.detach().float() if hasattr(cond, "detach") else torch.as_tensor(cond).float()
            )
        pooled_output = snap.get("pooled_output")
        if pooled_output is not None:
            pt["pooled_output"] = (
                pooled_output.detach().float()
                if hasattr(pooled_output, "detach")
                else torch.as_tensor(pooled_output).float()
            )
        trajectory_points.append(pt)
        source_texts.append(snap.get("text") or "")

    return trajectory_payload(
        operation="latent_probe",
        trajectory_points=trajectory_points,
        source_point_ids=[],
        source_texts=source_texts,
        request_id=request_id,
        state_revision=state_revision,
    )


# ---- internals ----

_SNAPSHOT_MIN_IMPROVEMENT = 0.0001


def probe_synthesize(seed_texts: list[str], negative_texts: list[str], count: int = 3) -> list[str]:
    """Synthesize novel prompts near seed_texts -> negative_texts steers LLM away from those concepts"""
    from .. import llm_ops  # heavy transformers dependency - only load when reconstruction runs

    user_content = "Prompts near the target concept (write something like these):\n" + "\n".join(
        f"- {t}" for t in seed_texts
    )
    if negative_texts:
        user_content += (
            "\n\nPrompts far from the target concept (do not write anything like these):\n"
            + "\n".join(f"- {t}" for t in negative_texts)
        )
    messages = [
        {
            "role": "system",
            "content": (
                "You synthesize image generation prompts. "
                "Given reference prompts near a target concept and prompts far from it, "
                "write new prompts that match the target concept. "
                f"Output exactly {count} prompts, one per line, no numbering, no explanations. "
                "Do not copy phrases from the references. "
                "Each prompt must be 5-20 words and a complete self-contained image description."
            ),
        },
        {"role": "user", "content": user_content},
    ]
    raw = llm_ops.query(messages, max_new_tokens=count * 40)
    seen: set[str] = set(seed_texts)
    result: list[str] = []
    for line in raw.splitlines():
        line = clean_llm_line(line)
        if line and line not in seen:
            seen.add(line)
            result.append(line)
        if len(result) >= count:
            break
    return result


def probe_suggest_iter(
    beam: list[tuple[float, str]],
    negative_texts: list[str],
    *,
    count: int = 5,
) -> list[str]:
    """Generate candidate prompts from the full ranked beam with CLIP score feedback"""
    from .. import llm_ops  # heavy transformers dependency - only load when reconstruction runs

    ranked_block = "\n".join(
        f"{i + 1}. (score={sim:.4f}) {txt}" for i, (sim, txt) in enumerate(beam)
    )
    neg_block = (
        "\n\nPrompts far from the target concept (avoid these themes entirely):\n"
        + "\n".join(f"- {t}" for t in negative_texts)
        if negative_texts
        else ""
    )
    user_content = (
        "Candidates ranked by similarity to the target concept (higher score = closer):\n"
        + ranked_block
        + neg_block
        + f"\n\nWrite {count} new image prompts that push further in the direction of the "
        "top-scoring candidates and avoid the themes of the negatives. "
        "Use different vocabulary and phrasing - do not copy from the ranked list above."
    )
    messages = [
        {
            "role": "system",
            "content": (
                "You write short image generation prompts. "
                "Output only the prompts themselves - one per line, no numbering, no explanations, no analysis. "
                "Every line must be a self-contained image prompt of 5-20 words."
            ),
        },
        {"role": "user", "content": user_content},
    ]
    raw = llm_ops.query(messages, max_new_tokens=count * 30)
    seen: set[str] = {txt for _, txt in beam}
    result: list[str] = []
    for line in raw.splitlines():
        line = clean_llm_line(line)
        if line and line not in seen:
            seen.add(line)
            result.append(line)
        if len(result) >= count:
            break
    return result
def _cosine_knn_numpy(
    query: np.ndarray,
    matrix: np.ndarray,
    k: int,
) -> list[tuple[int, float]]:
    """Cosine kNN for a single query vector against a large matrix"""
    k = min(k, len(matrix))
    mat = np.array(matrix, dtype=np.float32)
    norms = np.linalg.norm(mat, axis=1, keepdims=True)
    mat /= norms + EPS_NORM
    q = query.astype(np.float32)
    q /= np.linalg.norm(q) + EPS_NORM
    sims = mat @ q
    top = np.argpartition(sims, -k)[-k:]
    top = top[np.argsort(sims[top])[::-1]]
    return [(int(i), float(sims[i])) for i in top]
