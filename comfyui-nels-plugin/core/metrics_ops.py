"""Metrics for NELS graph selections and trajectories."""

from __future__ import annotations

import json
from typing import Any

import torch

from .embedding_ops import cosine_similarity, euclidean_distance, validate_embedding_set
from .navigation_ops import selected_points


class NelsMetricsError(ValueError):
    """Raised when metric computation cannot be completed."""


def compute_metrics(
    *,
    metric_mode: str,
    embedding_set: dict[str, Any] | None = None,
    trajectory: dict[str, Any] | None = None,
    selection: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Compute graph-readable metrics from selected tensors or trajectory tensors."""
    mode = str(metric_mode or "").strip().lower()
    if mode == "similarity_matrix":
        if embedding_set is None:
            raise NelsMetricsError("similarity_matrix requires embedding_set")
        return similarity_matrix(embedding_set, selection)

    points = _trajectory_points(trajectory)
    if not points:
        raise NelsMetricsError(f"{mode} requires a non-empty trajectory")

    if mode == "distance_to_start":
        values = _distance_to_anchor(points, points[0]["tensor"], "euclidean")
    elif mode == "distance_to_target":
        values = _distance_to_anchor(points, points[-1]["tensor"], "euclidean")
    elif mode == "step_distance":
        values = _step_distances(points)
    elif mode == "norm_drift":
        values = _norm_drift(points)
    else:
        raise NelsMetricsError(
            "Unsupported metric_mode; expected distance_to_start, "
            "distance_to_target, step_distance, norm_drift, or similarity_matrix"
        )

    return {
        "version": 1,
        "type": "NELS_METRICS",
        "metric_mode": mode,
        "request_id": (trajectory or {}).get("request_id"),
        "state_revision": (trajectory or {}).get("state_revision", 0),
        "source_point_ids": (trajectory or {}).get("source_point_ids", []),
        "series": values,
    }


def similarity_matrix(
    embedding_set: dict[str, Any],
    selection: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Compute cosine similarity matrix for selected points or all points."""
    validate_embedding_set(embedding_set)
    points = selected_points(embedding_set, selection)
    if not points:
        points = embedding_set["points"]
    matrix = []
    for row in points:
        matrix_row = []
        for column in points:
            matrix_row.append(round(cosine_similarity(row["tensor"], column["tensor"]), 6))
        matrix.append(matrix_row)

    return {
        "version": 1,
        "type": "NELS_METRICS",
        "metric_mode": "similarity_matrix",
        "point_ids": [point["id"] for point in points],
        "labels": [point["label"] for point in points],
        "matrix": matrix,
    }


def metrics_to_json(metrics: dict[str, Any]) -> str:
    """Serialize metrics with stable formatting."""
    return json.dumps(metrics, indent=2, sort_keys=True, default=str)


def _trajectory_points(trajectory: dict[str, Any] | None) -> list[dict[str, Any]]:
    if not isinstance(trajectory, dict):
        return []
    points = trajectory.get("points", [])
    return [
        point
        for point in points
        if isinstance(point, dict) and torch.is_tensor(point.get("tensor"))
    ]


def _distance_to_anchor(
    points: list[dict[str, Any]],
    anchor: torch.Tensor,
    metric: str,
) -> list[dict[str, Any]]:
    return [
        {
            "index": point.get("index", index),
            "id": point.get("id"),
            "alpha": point.get("alpha"),
            "value": round(euclidean_distance(point["tensor"], anchor), 6)
            if metric == "euclidean"
            else None,
        }
        for index, point in enumerate(points)
    ]


def _step_distances(points: list[dict[str, Any]]) -> list[dict[str, Any]]:
    values = [{"index": 0, "id": points[0].get("id"), "alpha": points[0].get("alpha"), "value": 0.0}]
    for index in range(1, len(points)):
        values.append(
            {
                "index": points[index].get("index", index),
                "id": points[index].get("id"),
                "alpha": points[index].get("alpha"),
                "value": round(
                    euclidean_distance(points[index - 1]["tensor"], points[index]["tensor"]),
                    6,
                ),
            }
        )
    return values


def _norm_drift(points: list[dict[str, Any]]) -> list[dict[str, Any]]:
    start_norm = torch.linalg.vector_norm(points[0]["tensor"].detach().float())
    values = []
    for index, point in enumerate(points):
        norm = torch.linalg.vector_norm(point["tensor"].detach().float())
        values.append(
            {
                "index": point.get("index", index),
                "id": point.get("id"),
                "alpha": point.get("alpha"),
                "value": round(float((norm - start_norm).item()), 6),
                "norm": round(float(norm.item()), 6),
            }
        )
    return values


__all__ = [
    "NelsMetricsError",
    "compute_metrics",
    "metrics_to_json",
    "similarity_matrix",
]
