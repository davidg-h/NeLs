"""High-dimensional graph navigation operations for enhanced NELS nodes."""

from __future__ import annotations

import json
import uuid
from typing import Any, Iterable

import torch

from .embedding_ops import (
    NelsEmbeddingError,
    cosine_similarity,
    euclidean_distance,
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
    alphas = parse_alpha_schedule(alpha_schedule)
    trajectory_points = []
    for index, alpha in enumerate(alphas):
        if method == "lerp":
            tensor = lerp_tensor(start["tensor"], end["tensor"], alpha)
        elif method == "slerp":
            tensor = slerp_tensor(start["tensor"], end["tensor"], alpha)
        else:
            raise NelsNavigationError(f"Unsupported interpolation method: {method}")
        trajectory_points.append(
            _trajectory_point(index, tensor, alpha, [start["id"], end["id"]], method)
        )

    return _trajectory_payload(
        operation=method,
        trajectory_points=trajectory_points,
        source_point_ids=[start["id"], end["id"]],
        request_id=request_id,
        state_revision=state_revision,
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

    start = points[0]
    if len(points) >= 2:
        direction = points[1]["tensor"] - points[0]["tensor"]
        source_ids = [points[0]["id"], points[1]["id"]]
    else:
        tensors = [point["tensor"].detach().float() for point in embedding_set["points"]]
        centroid = torch.stack(tensors).mean(dim=0).to(start["tensor"].device)
        direction = start["tensor"] - centroid
        source_ids = [start["id"]]

    trajectory_points = []
    for index, scale in enumerate(parse_alpha_schedule(alpha_schedule)):
        tensor = start["tensor"] + direction * float(scale)
        trajectory_points.append(
            _trajectory_point(index, tensor, scale, source_ids, "delta_walk")
        )

    return _trajectory_payload(
        operation="delta_walk",
        trajectory_points=trajectory_points,
        source_point_ids=source_ids,
        request_id=request_id,
        state_revision=state_revision,
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
    """Rank nearest neighbors for the first selected point."""
    validate_embedding_set(embedding_set)
    points = selected_points(embedding_set, selection)
    if not points:
        raise NelsNavigationError("nearest_neighbor requires one selected point")

    query = points[0]
    candidates = embedding_set["points"]
    ranked = nearest_neighbors(
        query["tensor"],
        [point["tensor"] for point in candidates],
        limit=max(1, int(neighbor_count) + 1),
        metric=metric,
    )
    neighbors = []
    for index, score in ranked:
        candidate = candidates[index]
        if candidate["id"] == query["id"]:
            continue
        neighbors.append(
            {
                "id": candidate["id"],
                "label": candidate["label"],
                "score": float(score),
                "metric": metric,
                "metadata": candidate.get("metadata", {}),
            }
        )
        if len(neighbors) >= int(neighbor_count):
            break

    return {
        "version": 1,
        "operation": "nearest_neighbor",
        "request_id": request_id or uuid.uuid4().hex,
        "state_revision": int(state_revision or 0),
        "source_point_ids": [query["id"]],
        "neighbors": neighbors,
    }


def trajectory_result_summary(trajectory: dict[str, Any]) -> dict[str, Any]:
    """Create graph-readable JSON summary for a trajectory."""
    points = trajectory.get("points", [])
    return {
        "version": 1,
        "operation": trajectory.get("operation"),
        "request_id": trajectory.get("request_id"),
        "state_revision": trajectory.get("state_revision", 0),
        "source_point_ids": trajectory.get("source_point_ids", []),
        "trajectory": [
            {
                "index": point.get("index"),
                "id": point.get("id"),
                "alpha": point.get("alpha"),
                "tensor_shape": point.get("tensor_shape", []),
                "dtype": point.get("dtype"),
                "metadata": point.get("metadata", {}),
            }
            for point in points
        ],
    }


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
    return {
        "id": f"{operation}_{index:04d}",
        "index": int(index),
        "alpha": float(alpha),
        "tensor": tensor,
        "source_point_ids": list(source_point_ids),
        "metadata": {
            "operation": operation,
            "alpha": float(alpha),
            "source_point_ids": list(source_point_ids),
        },
        **tensor_summary(tensor),
    }


def _trajectory_payload(
    *,
    operation: str,
    trajectory_points: list[dict[str, Any]],
    source_point_ids: list[str],
    request_id: str | None,
    state_revision: int | None,
) -> dict[str, Any]:
    return {
        "version": 1,
        "type": "NELS_TRAJECTORY",
        "operation": operation,
        "request_id": request_id or uuid.uuid4().hex,
        "state_revision": int(state_revision or 0),
        "source_point_ids": list(source_point_ids),
        "points": trajectory_points,
    }


def tensor_distance(left: torch.Tensor, right: torch.Tensor, metric: str) -> float:
    """Distance/similarity helper used by metrics."""
    if metric == "cosine_similarity":
        return cosine_similarity(left, right)
    if metric == "cosine_distance":
        return 1.0 - cosine_similarity(left, right)
    if metric == "euclidean":
        return euclidean_distance(left, right)
    raise NelsNavigationError(f"Unsupported metric: {metric}")


__all__ = [
    "NelsNavigationError",
    "build_delta_walk_trajectory",
    "build_interpolation_trajectory",
    "lerp_tensor",
    "nearest_neighbor_result",
    "operation_result_to_json",
    "parse_alpha_schedule",
    "selected_points",
    "slerp_tensor",
    "tensor_distance",
    "trajectory_result_summary",
]
