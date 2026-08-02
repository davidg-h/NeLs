"""Vector-walk operations for NELS sessions: linear/spherical interpolation and delta walk"""

from collections.abc import Iterable
from typing import Any

from ..encoding_ops import (
    compact_embedding_from_real_conditioning,
    delta_optional_pooled,
    encode_prompts_real_conditioning,
    interpolate_optional_pooled,
    set_optional_pooled_output,
)
from ..tensor_ops import (
    delta_cond,
    lerp_cond,
    selected_points,
    slerp_cond,
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
    clip_obj: Any,
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
    encoded = encode_prompts_real_conditioning(clip_obj, source_texts)
    cond_a = encoded[0]["cond"]
    cond_b = encoded[1]["cond"] if len(encoded) > 1 else encoded[0]["cond"]
    pooled_a = encoded[0]["pooled_output"]
    pooled_b = encoded[1]["pooled_output"] if len(encoded) > 1 else pooled_a

    alphas = validate_alpha_schedule(alpha_schedule)
    trajectory_points = []
    fallback_to_lerp = None
    for index, alpha in enumerate(alphas):
        alpha_value = float(alpha)
        if method == "slerp":
            cond, fallback_to_lerp = slerp_cond(cond_a, cond_b, alpha_value)
            pooled_step = interpolate_optional_pooled(
                pooled_a,
                pooled_b,
                alpha_value,
                spherical=True,
            )
        elif method == "lerp":
            cond = lerp_cond(cond_a, cond_b, alpha_value)
            pooled_step = interpolate_optional_pooled(pooled_a, pooled_b, alpha_value)
        else:
            raise ValueError(f"Unsupported interpolation method: {method}")
        tensor = compact_embedding_from_real_conditioning(cond, pooled_step)
        step = trajectory_point(index, tensor, alpha_value, method)
        step["cond"] = cond
        set_optional_pooled_output(step, pooled_step)
        trajectory_points.append(step)

    return trajectory_payload(
        operation=method,
        trajectory_points=trajectory_points,
        source_point_ids=[start["id"], end["id"]],
        source_texts=source_texts,
        request_id=request_id,
        state_revision=state_revision,
        fallback_to_lerp=fallback_to_lerp,
    )


def build_delta_walk_trajectory(
    embedding_set: dict[str, Any],
    selection: dict[str, Any],
    *,
    clip_obj: Any,
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

    source_ids = [points[0]["id"], points[1]["id"], points[2]["id"]]
    source_texts = [p.get("metadata", {}).get("text", "") or p.get("label", "") for p in points[:3]]
    encoded = encode_prompts_real_conditioning(clip_obj, source_texts)

    trajectory_points = []
    for index, scale in enumerate(
        validate_alpha_schedule(alpha_schedule, min_val=-2.0, max_val=4.0)
    ):
        alpha_value = float(scale)
        cond = delta_cond(
            encoded[0]["cond"],
            encoded[1]["cond"],
            encoded[2]["cond"],
            alpha_value,
        )
        pooled_step = delta_optional_pooled(
            encoded[0]["pooled_output"],
            encoded[1]["pooled_output"],
            encoded[2]["pooled_output"],
            alpha_value,
        )
        tensor = compact_embedding_from_real_conditioning(cond, pooled_step)
        step = trajectory_point(index, tensor, scale, "delta_walk")
        step["cond"] = cond
        set_optional_pooled_output(step, pooled_step)
        trajectory_points.append(step)

    return trajectory_payload(
        operation="delta_walk",
        trajectory_points=trajectory_points,
        source_point_ids=source_ids,
        source_texts=source_texts,
        request_id=request_id,
        state_revision=state_revision,
    )
