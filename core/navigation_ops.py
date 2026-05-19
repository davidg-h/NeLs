"""
High-dimensional graph navigation operations for enhanced NELS nodes.
"""

from __future__ import annotations

import json
import uuid
from typing import Any, Iterable

import torch

from .embedding_ops import (
    NelsEmbeddingError,
    cosine_similarity,
    flatten_tensor,
    get_embedding_point,
    nearest_neighbors,
    tensor_summary,
    validate_embedding_set,
)


class NelsNavigationError(ValueError):
    """Raised when a graph navigation operation cannot be executed."""


def parse_alpha_schedule(alpha_schedule: str | Iterable[float]) -> list[float]:
    """Parse comma/space separated alpha values."""
    if isinstance(alpha_schedule, str):
        raw_parts = alpha_schedule.replace(";", ",").replace(" ", ",").split(",")
        values = [float(part) for part in raw_parts if part.strip()]
    else:
        values = [float(value) for value in alpha_schedule]
    if not values:
        raise NelsNavigationError("alpha_schedule must contain at least one value")
    return values


def lerp_tensor(start: torch.Tensor, end: torch.Tensor, alpha: float) -> torch.Tensor:
    """Linear interpolation between two tensors."""
    return start + (end - start) * float(alpha)


def slerp_tensor(
    start: torch.Tensor,
    end: torch.Tensor,
    alpha: float,
    *,
    dot_threshold: float = 0.9995,
    eps: float = 1e-8,
) -> torch.Tensor:
    """Spherical interpolation between flattened tensors, reshaped to input shape."""
    start_vec = flatten_tensor(start)
    end_vec = flatten_tensor(end)
    if start_vec.shape != end_vec.shape:
        raise NelsNavigationError(
            f"SLERP shape mismatch: {tuple(start_vec.shape)} != {tuple(end_vec.shape)}"
        )

    start_norm = torch.linalg.vector_norm(start_vec)
    end_norm = torch.linalg.vector_norm(end_vec)
    if float(start_norm) <= eps or float(end_norm) <= eps:
        return lerp_tensor(start, end, alpha)

    start_unit = start_vec / start_norm.clamp_min(eps)
    end_unit = end_vec / end_norm.clamp_min(eps)
    dot = torch.clamp(torch.dot(start_unit, end_unit), -1.0, 1.0)
    if abs(float(dot)) > float(dot_threshold):
        return lerp_tensor(start, end, alpha)

    theta = torch.acos(dot)
    sin_theta = torch.sin(theta).clamp_min(eps)
    left = torch.sin((1.0 - float(alpha)) * theta) / sin_theta
    right = torch.sin(float(alpha) * theta) / sin_theta
    interpolated_direction = left * start_unit + right * end_unit
    interpolated_norm = (1.0 - float(alpha)) * start_norm + float(alpha) * end_norm
    return (interpolated_direction * interpolated_norm).reshape_as(start).to(start.dtype)


def selected_points(
    embedding_set: dict[str, Any],
    selection: dict[str, Any] | None,
) -> list[dict[str, Any]]:
    """Resolve selection IDs against an embedding set."""
    validate_embedding_set(embedding_set)
    selected_ids = (selection or {}).get("selected_point_ids") or []
    if isinstance(selected_ids, str):
        selected_ids = [selected_ids]
    points = []
    for point_id in selected_ids:
        try:
            points.append(get_embedding_point(embedding_set, str(point_id)))
        except NelsEmbeddingError:
            continue
    return points


def build_interpolation_trajectory(
    embedding_set: dict[str, Any],
    selection: dict[str, Any],
    *,
    method: str,
    alpha_schedule: str | Iterable[float],
    request_id: str | None = None,
    state_revision: int | None = None,
) -> dict[str, Any]:
    """Build a LERP/SLERP trajectory from the first two selected points."""
    points = selected_points(embedding_set, selection)
    if len(points) < 2:
        raise NelsNavigationError(f"{method.upper()} requires two selected points")

    start, end = points[0], points[1]
    enc = embedding_set.get("metadata", {}).get("encoding_params", {})
    embedding_type = embedding_set.get("embedding_type")
    latent_shape = enc.get("latent_shape")
    image_pooling = enc.get("image_pooling")
    has_cond = bool(embedding_set.get("metadata", {}).get("has_full_cond", False))
    cond_a = start.get("cond_tensor")
    cond_b = end.get("cond_tensor")

    alphas = parse_alpha_schedule(alpha_schedule)
    trajectory_points = []
    for index, alpha in enumerate(alphas):
        if method == "lerp":
            tensor = lerp_tensor(start["tensor"], end["tensor"], alpha)
        elif method == "slerp":
            tensor = slerp_tensor(start["tensor"], end["tensor"], alpha)
        else:
            raise NelsNavigationError(f"Unsupported interpolation method: {method}")
        step = _trajectory_point(index, tensor, alpha, [start["id"], end["id"]], method)
        if cond_a is not None and cond_b is not None:
            step["cond_tensor"] = lerp_tensor(cond_a, cond_b, alpha)
        trajectory_points.append(step)

    return _trajectory_payload(
        operation=method,
        trajectory_points=trajectory_points,
        source_point_ids=[start["id"], end["id"]],
        request_id=request_id,
        state_revision=state_revision,
        embedding_type=embedding_type,
        latent_shape=latent_shape,
        image_pooling=image_pooling,
        has_cond_tensors=has_cond,
    )


def build_delta_walk_trajectory(
    embedding_set: dict[str, Any],
    selection: dict[str, Any],
    *,
    alpha_schedule: str | Iterable[float],
    request_id: str | None = None,
    state_revision: int | None = None,
) -> dict[str, Any]:
    """Build a delta-walk trajectory from selected points."""
    validate_embedding_set(embedding_set)
    points = selected_points(embedding_set, selection)
    if not points:
        raise NelsNavigationError("delta_walk requires at least one selected point")

    enc = embedding_set.get("metadata", {}).get("encoding_params", {})
    embedding_type = embedding_set.get("embedding_type")
    latent_shape = enc.get("latent_shape")
    image_pooling = enc.get("image_pooling")
    has_cond = bool(embedding_set.get("metadata", {}).get("has_full_cond", False))

    start = points[0]
    cond_a: torch.Tensor | None = None
    cond_b: torch.Tensor | None = None
    if len(points) >= 2:
        direction = points[1]["tensor"] - points[0]["tensor"]
        source_ids = [points[0]["id"], points[1]["id"]]
        cond_a = points[0].get("cond_tensor")
        cond_b = points[1].get("cond_tensor")
    else:
        tensors = [point["tensor"].detach().float() for point in embedding_set["points"]]
        centroid = torch.stack(tensors).mean(dim=0).to(start["tensor"].device)
        direction = start["tensor"] - centroid
        source_ids = [start["id"]]

    trajectory_points = []
    for index, scale in enumerate(parse_alpha_schedule(alpha_schedule)):
        tensor = start["tensor"] + direction * float(scale)
        step = _trajectory_point(index, tensor, scale, source_ids, "delta_walk")
        if cond_a is not None and cond_b is not None:
            step["cond_tensor"] = lerp_tensor(cond_a, cond_b, scale)
        trajectory_points.append(step)

    return _trajectory_payload(
        operation="delta_walk",
        trajectory_points=trajectory_points,
        source_point_ids=source_ids,
        request_id=request_id,
        state_revision=state_revision,
        embedding_type=embedding_type,
        latent_shape=latent_shape,
        image_pooling=image_pooling,
        has_cond_tensors=has_cond,
    )


def nearest_neighbor_result(
    embedding_set: dict[str, Any],
    selection: dict[str, Any],
    *,
    neighbor_count: int,
    request_id: str | None = None,
    state_revision: int | None = None,
    metric: str = "cosine",
) -> dict[str, Any]:
    """Rank nearest neighbors for all selected points (one query per selected point)."""
    validate_embedding_set(embedding_set)
    query_points = selected_points(embedding_set, selection)
    if not query_points:
        raise NelsNavigationError("nearest_neighbor requires at least one selected point")

    candidates = embedding_set["points"]
    selected_id_set = {str(p["id"]) for p in query_points}
    # Fetch extra candidates per query to account for selected points being skipped
    limit = max(1, int(neighbor_count) + len(query_points))

    all_neighbors: list[dict[str, Any]] = []
    for query in query_points:
        query_id = str(query["id"])
        ranked = nearest_neighbors(
            query["tensor"],
            [point["tensor"] for point in candidates],
            limit=limit,
            metric=metric,
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
                    "metric": metric,
                    "metadata": candidate.get("metadata", {}),
                    "query_id": query_id,
                }
            )
            count += 1
            if count >= int(neighbor_count):
                break

    return {
        "version": 1,
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
    """Create graph-readable JSON summary for a trajectory.

    If embedding_set is provided, each step is annotated with the top-3 nearest
    real dataset samples (cosine kNN).
    """
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
            try:
                step["nearest_top_k"] = _nearest_real_samples(point["tensor"], embedding_set, k=3)
            except Exception:
                pass
        steps.append(step)

    return {
        "version": 1,
        "operation": trajectory.get("operation"),
        "request_id": trajectory.get("request_id"),
        "state_revision": trajectory.get("state_revision", 0),
        "source_point_ids": trajectory.get("source_point_ids", []),
        "trajectory": steps,
    }


def _nearest_real_samples(
    tensor: torch.Tensor,
    embedding_set: dict[str, Any],
    k: int = 3,
) -> list[dict[str, Any]]:
    """Return the top-k nearest real dataset samples to a synthetic tensor (cosine).

    Deduplicates by label so that near-identical embeddings with the same label
    don't fill all k slots.
    """
    candidates = embedding_set.get("points", [])
    if not candidates:
        return []
    ranked = nearest_neighbors(
        tensor,
        [p["tensor"] for p in candidates],
        limit=min(len(candidates), k * 4),
        metric="cosine",
    )
    seen_labels: set[str] = set()
    result: list[dict[str, Any]] = []
    for idx, score in ranked:
        label = str(candidates[idx].get("label", candidates[idx]["id"]))
        if label in seen_labels:
            continue
        seen_labels.add(label)
        result.append({
            "id": str(candidates[idx]["id"]),
            "distance": float(score),
            "label": label,
        })
        if len(result) >= k:
            break
    return result


def operation_result_to_json(result: dict[str, Any]) -> str:
    """Serialize operation result summaries with stable formatting."""
    return json.dumps(result, indent=2, sort_keys=True, default=str)


def _trajectory_point(
    index: int,
    tensor: torch.Tensor,
    alpha: float,
    source_point_ids: list[str],
    operation: str,
) -> dict[str, Any]:
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
    request_id: str | None,
    state_revision: int | None,
    embedding_type: str | None = None,
    latent_shape: list[int] | None = None,
    image_pooling: str | None = None,
    has_cond_tensors: bool = False,
) -> dict[str, Any]:
    return {
        "version": 1,
        "type": "NELS_TRAJECTORY",
        "operation": operation,
        "request_id": request_id or uuid.uuid4().hex,
        "state_revision": int(state_revision or 0),
        "source_point_ids": list(source_point_ids),
        "points": trajectory_points,
        "embedding_type": embedding_type,
        "latent_shape": latent_shape,
        "image_pooling": image_pooling,
        "has_cond_tensors": has_cond_tensors,
    }


def compute_trajectory_metrics(
    trajectory_points: list[dict[str, Any]],
    metric_mode: str,
) -> list[float]:
    """Compute one float per trajectory step for the chosen metric mode."""
    tensors = [
        pt["tensor"].detach().float()
        for pt in trajectory_points
        if pt.get("tensor") is not None
    ]
    if not tensors:
        return []
    n = len(tensors)

    if metric_mode == "step_distance":
        values: list[float] = [0.0]
        for i in range(1, n):
            values.append(max(0.0, 1.0 - float(cosine_similarity(tensors[i], tensors[i - 1]))))
        return values

    if metric_mode == "distance_to_start":
        start = tensors[0]
        return [max(0.0, 1.0 - float(cosine_similarity(t, start))) for t in tensors]

    if metric_mode == "distance_to_target":
        end = tensors[-1]
        return [max(0.0, 1.0 - float(cosine_similarity(t, end))) for t in tensors]

    if metric_mode == "norm_drift":
        return [float(t.norm().item()) for t in tensors]

    if metric_mode == "similarity_matrix":
        values = [1.0]
        for i in range(1, n):
            values.append(float(cosine_similarity(tensors[i], tensors[i - 1])))
        return values

    return []


__all__ = [
    "NelsNavigationError",
    "build_delta_walk_trajectory",
    "build_interpolation_trajectory",
    "compute_trajectory_metrics",
    "lerp_tensor",
    "nearest_neighbor_result",
    "operation_result_to_json",
    "parse_alpha_schedule",
    "selected_points",
    "slerp_tensor",
    "trajectory_result_summary",
]
