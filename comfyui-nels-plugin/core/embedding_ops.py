"""Shared embedding-set contracts and tensor helpers for NELS nodes"""

from __future__ import annotations

import copy
import math
from collections.abc import Iterable
from typing import Any

import torch

EMBEDDING_SET_TYPE = "NELS_EMBEDDING_SET"


def selected_points(
    embedding_set: dict[str, Any],
    selection: dict[str, Any] | None,
) -> list[dict[str, Any]]:
    """Resolve selection IDs against an embedding set, skipping missing points"""
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


def flatten_tensor(value: torch.Tensor) -> torch.Tensor:
    """Return detached 1D float tensor for distance/projection math"""
    if not torch.is_tensor(value):
        raise NelsEmbeddingError("Expected a torch.Tensor")
    return value.detach().float().reshape(-1)


def tensor_summary(value: torch.Tensor) -> dict[str, Any]:
    """JSON-safe tensor summary without copying values"""
    if not torch.is_tensor(value):
        raise NelsEmbeddingError("Expected a torch.Tensor")
    return {
        "tensor_shape": list(value.shape),
        "dtype": str(value.dtype).replace("torch.", ""),
        "device": str(value.device),
    }


def make_embedding_point(
    point_id: str,
    label: str,
    tensor: torch.Tensor,
    metadata: dict[str, Any] | None = None,
    *,
    tensor_ref: str | None = None,
) -> dict[str, Any]:
    """Create one runtime point record"""
    if not str(point_id).strip():
        raise NelsEmbeddingError("point_id must not be empty")
    if not str(label).strip():
        raise NelsEmbeddingError("label must not be empty")
    if not torch.is_tensor(tensor):
        raise NelsEmbeddingError("tensor must be a torch.Tensor")

    point = {
        "id": str(point_id),
        "label": str(label),
        "tensor": tensor,
        "metadata": copy.deepcopy(metadata or {}),
        **tensor_summary(tensor),
    }
    if tensor_ref:
        point["tensor_ref"] = str(tensor_ref)
    return point


def create_embedding_set(
    points: Iterable[dict[str, Any]] | None = None,
    *,
    embedding_type: str = "unknown",
    metadata: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Create a runtime `NELS_EMBEDDING_SET` payload"""
    payload = {
        "type": EMBEDDING_SET_TYPE,
        "embedding_type": str(embedding_type),
        "points": [],
        "metadata": copy.deepcopy(metadata or {}),
    }
    for point in points or []:
        add_embedding_point(payload, point)
    _refresh_embedding_set_summary(payload)
    return payload


def validate_embedding_point(
    point: dict[str, Any],
    *,
    require_tensor: bool = True,
) -> dict[str, Any]:
    """Validate and normalize one embedding point"""
    if not isinstance(point, dict):
        raise NelsEmbeddingError("Embedding point must be a dict")

    point_id = str(point.get("id", "")).strip()
    label = str(point.get("label", "")).strip()
    if not point_id:
        raise NelsEmbeddingError("Embedding point is missing id")
    if not label:
        raise NelsEmbeddingError(f"Embedding point {point_id!r} is missing label")

    point["id"] = point_id
    point["label"] = label
    if not isinstance(point.get("metadata", {}), dict):
        raise NelsEmbeddingError(f"Embedding point {point_id!r} metadata must be a dict")
    point.setdefault("metadata", {})

    tensor = point.get("tensor")
    if torch.is_tensor(tensor):
        point.update(tensor_summary(tensor))
    elif require_tensor:
        raise NelsEmbeddingError(f"Embedding point {point_id!r} is missing tensor")
    else:
        if "tensor_shape" not in point:
            raise NelsEmbeddingError(
                f"Embedding point {point_id!r} needs tensor_shape without tensor"
            )

    return point


def validate_embedding_set(
    embedding_set: dict[str, Any],
    *,
    require_tensors: bool = True,
) -> dict[str, Any]:
    """Validate and normalize a `NELS_EMBEDDING_SET` payload"""
    if not isinstance(embedding_set, dict):
        raise NelsEmbeddingError("NELS_EMBEDDING_SET must be a dict")

    points = embedding_set.get("points")
    if not isinstance(points, list):
        raise NelsEmbeddingError("NELS_EMBEDDING_SET points must be a list")

    seen_ids: set[str] = set()
    expected_shape: list[int] | None = None
    for point in points:
        validate_embedding_point(point, require_tensor=require_tensors)
        point_id = point["id"]
        if point_id in seen_ids:
            raise NelsEmbeddingError(f"Duplicate embedding point id: {point_id}")
        seen_ids.add(point_id)

        shape = list(point.get("tensor_shape", []))
        if expected_shape is None:
            expected_shape = shape
        elif shape != expected_shape:
            raise NelsEmbeddingError(
                f"Embedding point {point_id!r} shape {shape} does not match "
                f"expected shape {expected_shape}"
            )

    embedding_set.setdefault("type", EMBEDDING_SET_TYPE)
    embedding_set.setdefault("embedding_type", "unknown")
    embedding_set.setdefault("metadata", {})
    if not isinstance(embedding_set["metadata"], dict):
        raise NelsEmbeddingError("NELS_EMBEDDING_SET metadata must be a dict")

    _refresh_embedding_set_summary(embedding_set)
    return embedding_set


def embedding_set_snapshot(embedding_set: dict[str, Any]) -> dict[str, Any]:
    """JSON-safe snapshot of an embedding set without tensor values"""
    validate_embedding_set(embedding_set, require_tensors=False)
    snapshot = {
        "type": embedding_set.get("type", EMBEDDING_SET_TYPE),
        "embedding_type": embedding_set.get("embedding_type", "unknown"),
        "point_count": len(embedding_set.get("points", [])),
        "tensor_shape": list(embedding_set.get("tensor_shape", [])),
        "dtype": embedding_set.get("dtype"),
        "metadata": _json_safe(embedding_set.get("metadata", {})),
        "points": [],
    }
    for point in embedding_set.get("points", []):
        safe_point = {
            "id": point["id"],
            "label": point["label"],
            "tensor_shape": list(point.get("tensor_shape", [])),
            "dtype": point.get("dtype"),
            "device": point.get("device"),
            "metadata": _json_safe(point.get("metadata", {})),
        }
        if point.get("tensor_ref"):
            safe_point["tensor_ref"] = str(point["tensor_ref"])
        snapshot["points"].append(safe_point)
    return snapshot


def get_embedding_point(
    embedding_set: dict[str, Any],
    point_id: str,
) -> dict[str, Any]:
    """Return point by ID, raise if not found"""
    validate_embedding_set(embedding_set)
    for point in embedding_set["points"]:
        if point["id"] == point_id:
            return point
    raise NelsEmbeddingError(f"Embedding point not found: {point_id}")


def add_embedding_point(
    embedding_set: dict[str, Any],
    point: dict[str, Any],
    *,
    replace: bool = False,
) -> dict[str, Any]:
    """Add point to an embedding set, optionally replacing existing ID"""
    validate_embedding_point(point)
    points = embedding_set.setdefault("points", [])
    if not isinstance(points, list):
        raise NelsEmbeddingError("NELS_EMBEDDING_SET points must be a list")

    for index, existing in enumerate(points):
        if existing.get("id") == point["id"]:
            if not replace:
                raise NelsEmbeddingError(f"Duplicate embedding point id: {point['id']}")
            points[index] = point
            validate_embedding_set(embedding_set)
            _refresh_embedding_set_summary(embedding_set)
            return embedding_set

    _validate_point_shape_compatible(points, point)
    points.append(point)
    _refresh_embedding_set_summary(embedding_set)
    return embedding_set


def collect_point_tensors(embedding_set: dict[str, Any]) -> list[torch.Tensor]:
    """Collect point tensors in order"""
    validate_embedding_set(embedding_set)
    return [point["tensor"] for point in embedding_set["points"]]


def normalize_tensor(value: torch.Tensor, eps: float = 1e-12) -> torch.Tensor:
    """Normalize tensor as flat vector"""
    vector = flatten_tensor(value)
    norm = torch.linalg.vector_norm(vector)
    if float(norm) <= eps:
        return torch.zeros_like(vector)
    return vector / norm.clamp_min(eps)


def cosine_similarity(left: torch.Tensor, right: torch.Tensor, eps: float = 1e-12) -> float:
    """Cosine similarity after flattening"""
    left_vector = normalize_tensor(left, eps=eps)
    right_vector = normalize_tensor(right, eps=eps)
    return float(torch.dot(left_vector, right_vector).item())


def euclidean_distance(left: torch.Tensor, right: torch.Tensor) -> float:
    """Euclidean distance after flattening"""
    left_vector = flatten_tensor(left)
    right_vector = flatten_tensor(right)
    if left_vector.shape != right_vector.shape:
        raise NelsEmbeddingError(
            f"Shape mismatch: {tuple(left_vector.shape)} != {tuple(right_vector.shape)}"
        )
    return float(torch.linalg.vector_norm(left_vector - right_vector).item())


def nearest_neighbors(
    query: torch.Tensor,
    candidates: Iterable[torch.Tensor],
    *,
    limit: int = 5,
    metric: str = "cosine",
    tie_precision: int = 8,
) -> list[tuple[int, float]]:
    """Ranked candidate indices and scores for one query tensor"""
    if limit <= 0:
        return []

    ranked: list[tuple[int, float]] = []
    for index, candidate in enumerate(candidates):
        if metric == "cosine":
            score = cosine_similarity(query, candidate)
            ranked.append((index, score))
        elif metric == "euclidean":
            score = euclidean_distance(query, candidate)
            ranked.append((index, score))
        else:
            raise NelsEmbeddingError(f"Unsupported neighbor metric: {metric}")

    precision = max(0, int(tie_precision))
    if metric == "cosine":
        return sorted(ranked, key=lambda item: (-round(item[1], precision), item[0]))[:limit]
    return sorted(ranked, key=lambda item: (round(item[1], precision), item[0]))[:limit]


def _refresh_embedding_set_summary(embedding_set: dict[str, Any]) -> None:
    """keep metadata of embedding set consistent"""
    points = embedding_set.get("points", [])
    embedding_set.setdefault("type", EMBEDDING_SET_TYPE)
    embedding_set["point_count"] = len(points)
    if points:
        first = points[0]
        embedding_set["tensor_shape"] = list(first.get("tensor_shape", []))
        embedding_set["dtype"] = first.get("dtype")
    else:
        embedding_set["tensor_shape"] = []
        embedding_set["dtype"] = None


def _validate_point_shape_compatible(
    existing_points: list[dict[str, Any]],
    point: dict[str, Any],
) -> None:
    if not existing_points:
        return
    expected_shape = list(existing_points[0].get("tensor_shape", []))
    shape = list(point.get("tensor_shape", []))
    if shape != expected_shape:
        raise NelsEmbeddingError(
            f"Embedding point {point['id']!r} shape {shape} does not match "
            f"expected shape {expected_shape}"
        )


def _json_safe(value: Any) -> Any:
    """Convert value to JSON-safe representation"""
    if torch.is_tensor(value):
        return tensor_summary(value)
    if isinstance(value, dict):
        return {str(key): _json_safe(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [_json_safe(item) for item in value]
    if isinstance(value, (str, int, float, bool)) or value is None:
        if isinstance(value, float) and not math.isfinite(value):
            return str(value)
        return value
    return str(value)


class NelsEmbeddingError(ValueError):
    """Raised when an embedding-set payload violates the NELS contract"""


__all__ = [
    "EMBEDDING_SET_TYPE",
    "NelsEmbeddingError",
    "add_embedding_point",
    "collect_point_tensors",
    "cosine_similarity",
    "create_embedding_set",
    "embedding_set_snapshot",
    "euclidean_distance",
    "flatten_tensor",
    "get_embedding_point",
    "make_embedding_point",
    "nearest_neighbors",
    "normalize_tensor",
    "selected_points",
    "tensor_summary",
    "validate_embedding_point",
    "validate_embedding_set",
]
