"""Semantic consistency check operation for NELS sessions"""

import contextlib
import random
from pathlib import Path
from typing import Any

import torch

from ..dataset_ops import predict_cluster_for_new
from ..encoding_ops import encode_prompts_pooled
from ..projection_ops import project_trajectory
from ..tensor_ops import (
    cosine_similarity,
    flatten_tensor,
    point_embedding,
    trajectory_payload,
    trajectory_point,
)
from ..text_terms import first_line


def generate_variants(
    prompt: str, count: int, strength: float, *, random_seed: int = 42
) -> list[str]:
    """Generate text variants; uses word dropout at low strength LLM paraphrase at higher strength"""
    if strength < _LLM_STRENGTH_THRESHOLD:
        return _word_dropout(prompt, count, strength, random_seed=random_seed)
    # LLM may be unavailable/fail -> fall through to word dropout
    with contextlib.suppress(Exception):
        llm_variants = paraphrase(prompt, count, strength)
        if len(llm_variants) >= count:
            return llm_variants[:count]
        print(f"[nels] LLM returned {len(llm_variants)}/{count} variants - padding with seed text")
        while len(llm_variants) < count:
            llm_variants.append(prompt)
        return llm_variants[:count]
    return _word_dropout(prompt, count, strength, random_seed=random_seed)


def paraphrase(text: str, count: int, strength: float) -> list[str]:
    """Return exactly `count` paraphrases (one LLM call per variant)"""
    from .. import llm_ops  # heavy transformers dependency - only load when paraphrasing runs

    style = (
        "minor rewording, synonyms only"
        if strength < 0.4
        else "moderate rephrasing, vary structure"
        if strength < 0.7
        else "aggressive paraphrase, change phrasing substantially"
    )
    # Token budget for one complete image prompt
    tokens_per_variant = max(80, len(text.split()) * 6)
    seen: set[str] = {text}
    result: list[str] = []
    for _ in range(count):
        avoid_hint = (
            " Avoid these already used paraphrases: " + "; ".join(f'"{r}"' for r in result)
            if result
            else ""
        )
        messages = [
            {
                "role": "system",
                "content": (
                    "You paraphrase short image generation prompts. "
                    f"Style: {style}. "
                    "Output exactly ONE paraphrase: a single line, no numbering, no extra text."
                    + avoid_hint
                ),
            },
            {"role": "user", "content": text},
        ]
        raw = llm_ops.query(messages, max_new_tokens=tokens_per_variant)
        line = first_line(raw).lstrip("-•·1234567890.) ").strip()
        if line and line not in seen:
            seen.add(line)
            result.append(line)
    return result


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
        flatten_tensor(point_embedding(p)).float() for p in embedding_set.get("points", [])
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
        pt = trajectory_point(
            i, vec, i / max(len(all_vecs) - 1, 1), [seed_point_id], "consistency_check"
        )
        pt["source_text_index"] = i
        traj_points.append(pt)

    trajectory = trajectory_payload(
        operation="consistency_check",
        trajectory_points=traj_points,
        source_point_ids=[seed_point_id],
        source_texts=all_texts,
        request_id=request_id,
        state_revision=state_revision,
    )

    return result, trajectory


# ---- internals ----

_LLM_STRENGTH_THRESHOLD = 0.35
_WORD_DROPOUT_MAX_FRACTION = 0.2


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
