"""High-dimensional navigation operations for NELS nodes"""

from __future__ import annotations

import contextlib
import uuid
from collections.abc import Iterable
from typing import Any

import torch

from .embedding_ops import (
    flatten_tensor,
    nearest_neighbors,
    selected_points,
    tensor_summary,
    validate_embedding_set,
)


def validate_alpha_schedule(alpha_schedule: Iterable[float]) -> list[float]:
    """Validate an iterable of alpha values and return a sorted list of floats"""
    try:
        values = [float(v) for v in alpha_schedule]
    except Exception as exc:
        raise NelsNavigationError("alpha_schedule must be an iterable of numbers") from exc
    # filter and clamp to valid range
    values = [v for v in values if v >= 0.0 and v <= 1.0]
    if not values:
        raise NelsNavigationError("alpha_schedule must contain at least one value in [0,1]")
    values.sort()
    return values


def slerp_tensor(
    start: torch.Tensor,
    end: torch.Tensor,
    alpha: float,
    *,
    dot_threshold: float = 0.9995,
    eps: float = 1e-8,
) -> torch.Tensor:
    """Spherical interpolation between flattened tensors, reshaped to input shape"""
    start_vec = flatten_tensor(start)
    end_vec = flatten_tensor(end)
    if start_vec.shape != end_vec.shape:
        raise NelsNavigationError(
            f"SLERP shape mismatch: {tuple(start_vec.shape)} != {tuple(end_vec.shape)}"
        )

    start_norm = torch.linalg.vector_norm(start_vec)
    end_norm = torch.linalg.vector_norm(end_vec)
    if float(start_norm) <= eps or float(end_norm) <= eps:
        return torch.lerp(start, end, float(alpha))

    start_unit = start_vec / start_norm.clamp_min(eps)
    end_unit = end_vec / end_norm.clamp_min(eps)
    dot = torch.clamp(torch.dot(start_unit, end_unit), -1.0, 1.0)
    if abs(float(dot)) > float(dot_threshold):
        return torch.lerp(start, end, float(alpha))

    theta = torch.acos(dot)
    sin_theta = torch.sin(theta).clamp_min(eps)
    left = torch.sin((1.0 - float(alpha)) * theta) / sin_theta
    right = torch.sin(float(alpha) * theta) / sin_theta
    interpolated_direction = left * start_unit + right * end_unit
    interpolated_norm = (1.0 - float(alpha)) * start_norm + float(alpha) * end_norm
    return (interpolated_direction * interpolated_norm).reshape_as(start).to(start.dtype)


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
        raise NelsNavigationError(f"{method.upper()} requires two selected points")

    start, end = points[0], points[1]
    enc = embedding_set.get("metadata", {}).get("encoding_params", {})
    embedding_type = embedding_set.get("embedding_type")
    latent_shape = enc.get("latent_shape")
    image_pooling = enc.get("image_pooling")
    source_texts = [
        start.get("metadata", {}).get("text", "") or start.get("label", ""),
        end.get("metadata", {}).get("text", "") or end.get("label", ""),
    ]

    alphas = validate_alpha_schedule(alpha_schedule)
    trajectory_points = []
    for index, alpha in enumerate(alphas):
        if method == "lerp":
            tensor = torch.lerp(start["tensor"], end["tensor"], float(alpha))
        elif method == "slerp":
            tensor = slerp_tensor(start["tensor"], end["tensor"], alpha)
        else:
            raise NelsNavigationError(f"Unsupported interpolation method: {method}")
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
        latent_shape=latent_shape,
        image_pooling=image_pooling,
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
    if not points:
        raise NelsNavigationError("delta_walk requires at least one selected point")

    enc = embedding_set.get("metadata", {}).get("encoding_params", {})
    embedding_type = embedding_set.get("embedding_type")
    latent_shape = enc.get("latent_shape")
    image_pooling = enc.get("image_pooling")

    start = points[0]
    if len(points) >= 2:
        direction = points[1]["tensor"] - points[0]["tensor"]
        source_ids = [points[0]["id"], points[1]["id"]]
        source_texts = [
            points[0].get("metadata", {}).get("text", "") or points[0].get("label", ""),
            points[1].get("metadata", {}).get("text", "") or points[1].get("label", ""),
        ]
    else:
        tensors = [point["tensor"].detach().float() for point in embedding_set["points"]]
        centroid = torch.stack(tensors).mean(dim=0).to(start["tensor"].device)
        direction = start["tensor"] - centroid
        source_ids = [start["id"]]
        source_texts = [
            start.get("metadata", {}).get("text", "") or start.get("label", ""),
        ]

    trajectory_points = []
    for index, scale in enumerate(validate_alpha_schedule(alpha_schedule)):
        tensor = start["tensor"] + direction * float(scale)
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
        latent_shape=latent_shape,
        image_pooling=image_pooling,
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
            metric="cosine",
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
                    "metric": "cosine",
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
    """Graph-readable JSON summary for a trajectory; annotates steps with top-3 kNN if embedding_set given"""
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
            with contextlib.suppress(Exception):
                step["nearest_top_k"] = _nearest_real_samples(point["tensor"], embedding_set, k=3)
        steps.append(step)

    return {
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
    """Top-k nearest real samples (cosine), deduped by label"""
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
    latent_shape: list[int] | None = None,
    image_pooling: str | None = None,
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
        "latent_shape": latent_shape,
        "image_pooling": image_pooling,
    }


class NelsNavigationError(ValueError):
    """Raised when a navigation operation cannot be executed"""


__all__ = [
    "NelsNavigationError",
    "build_delta_walk_trajectory",
    "build_interpolation_trajectory",
    "nearest_neighbor_result",
    "validate_alpha_schedule",
    "slerp_tensor",
    "trajectory_result_summary",
]
