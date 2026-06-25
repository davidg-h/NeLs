"""Vector-walk operations for NELS sessions: linear/spherical interpolation and delta walk"""

from collections.abc import Iterable
from typing import Any

import torch

from ..tensor_ops import (
    delta_walk_step,
    flatten_tensor,
    normalize_tensor,
    point_embedding,
    selected_points,
    slerp,
    trajectory_payload,
    trajectory_point,
    validate_embedding_set,
)


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
    source_texts = [
        start.get("metadata", {}).get("text", "") or start.get("label", ""),
        end.get("metadata", {}).get("text", "") or end.get("label", ""),
    ]

    alphas = validate_alpha_schedule(alpha_schedule)
    trajectory_points = []
    for index, alpha in enumerate(alphas):
        if method == "lerp":
            tensor = torch.lerp(point_embedding(start), point_embedding(end), float(alpha))
        elif method == "slerp":
            tensor = slerp(point_embedding(start), point_embedding(end), alpha)
        else:
            raise ValueError(f"Unsupported interpolation method: {method}")
        step = trajectory_point(index, tensor, alpha, method)
        trajectory_points.append(step)

    return trajectory_payload(
        operation=method,
        trajectory_points=trajectory_points,
        source_point_ids=[start["id"], end["id"]],
        source_texts=source_texts,
        request_id=request_id,
        state_revision=state_revision,
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

    a_norm = normalize_tensor(point_embedding(points[0]))
    b_norm = normalize_tensor(point_embedding(points[1]))
    start = points[2]
    start_raw = point_embedding(start)
    start_mag = float(torch.linalg.vector_norm(flatten_tensor(start_raw)))
    c_norm = normalize_tensor(start_raw)
    source_ids = [points[0]["id"], points[1]["id"], points[2]["id"]]
    source_texts = [p.get("metadata", {}).get("text", "") or p.get("label", "") for p in points[:3]]

    trajectory_points = []
    for index, scale in enumerate(
        validate_alpha_schedule(alpha_schedule, min_val=-2.0, max_val=4.0)
    ):
        stepped = delta_walk_step(a_norm, b_norm, c_norm, scale, eps=1e-12)
        tensor = stepped * start_mag
        step = trajectory_point(index, tensor, scale, "delta_walk")
        trajectory_points.append(step)

    return trajectory_payload(
        operation="delta_walk",
        trajectory_points=trajectory_points,
        source_point_ids=source_ids,
        source_texts=source_texts,
        request_id=request_id,
        state_revision=state_revision,
    )
