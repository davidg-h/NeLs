"""Trajectory result formatting shared by every NELS operation that builds a NELS_TRAJECTORY"""

from typing import Any

import torch

from .tensor_ops import nearest_neighbors, point_embedding


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


# ---- internals ----


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
        [point_embedding(p) for p in candidates],
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
