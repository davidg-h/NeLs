"""
Shared embedding-set data contracts and tensor helpers for enhanced NELS nodes.
"""

from __future__ import annotations

import copy
import json
import math
from typing import Any, Iterable

import torch


EMBEDDING_SET_VERSION = 1
EMBEDDING_SET_TYPE = "NELS_EMBEDDING_SET"


class NelsEmbeddingError(ValueError):
    """Raised when an embedding-set payload violates the NELS contract."""


def flatten_tensor(value: torch.Tensor) -> torch.Tensor:
    """Return a detached 1D float tensor for distance/projection math."""
    if not torch.is_tensor(value):
        raise NelsEmbeddingError("Expected a torch.Tensor")
    return value.detach().float().reshape(-1)


def tensor_summary(value: torch.Tensor) -> dict[str, Any]:
    """Create a JSON-safe tensor summary without copying tensor values."""
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
    """Create one runtime point record for a NELS embedding set."""
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
    version: int = EMBEDDING_SET_VERSION,
) -> dict[str, Any]:
    """Create a runtime `NELS_EMBEDDING_SET` payload."""
    payload = {
        "version": int(version),
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
    """Validate and normalize one embedding point in place."""
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
        raise NelsEmbeddingError(
            f"Embedding point {point_id!r} metadata must be a dict"
        )
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
    """Validate and normalize a runtime `NELS_EMBEDDING_SET` payload in place."""
    if not isinstance(embedding_set, dict):
        raise NelsEmbeddingError("NELS_EMBEDDING_SET must be a dict")
    if int(embedding_set.get("version", 0)) != EMBEDDING_SET_VERSION:
        raise NelsEmbeddingError(
            f"Unsupported embedding set version: {embedding_set.get('version')!r}"
        )

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
    """Return a JSON-safe snapshot of an embedding set without tensor values."""
    validate_embedding_set(embedding_set, require_tensors=False)
    snapshot = {
        "version": embedding_set["version"],
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


def embedding_set_to_json(embedding_set: dict[str, Any]) -> str:
    """Serialize an embedding set snapshot to stable JSON."""
    return json.dumps(embedding_set_snapshot(embedding_set), indent=2, sort_keys=True)


def get_embedding_point(
    embedding_set: dict[str, Any],
    point_id: str,
) -> dict[str, Any]:
    """Return a point by ID or raise a clear contract error."""
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
    """Add a point to an embedding set, optionally replacing an existing ID."""
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


def delete_embedding_point(
    embedding_set: dict[str, Any],
    point_id: str,
    *,
    missing_ok: bool = False,
) -> dict[str, Any]:
    """Delete a point from an embedding set by ID."""
    validate_embedding_set(embedding_set)
    points = embedding_set["points"]
    original_count = len(points)
    embedding_set["points"] = [point for point in points if point["id"] != point_id]
    if len(embedding_set["points"]) == original_count and not missing_ok:
        raise NelsEmbeddingError(f"Embedding point not found: {point_id}")
    _refresh_embedding_set_summary(embedding_set)
    return embedding_set


def update_embedding_point(
    embedding_set: dict[str, Any],
    point_id: str,
    *,
    label: str | None = None,
    tensor: torch.Tensor | None = None,
    metadata: dict[str, Any] | None = None,
    tensor_ref: str | None = None,
) -> dict[str, Any]:
    """Modify a point while preserving unspecified runtime fields."""
    point = get_embedding_point(embedding_set, point_id)
    if label is not None:
        if not str(label).strip():
            raise NelsEmbeddingError("label must not be empty")
        point["label"] = str(label)
    if metadata is not None:
        if not isinstance(metadata, dict):
            raise NelsEmbeddingError("metadata must be a dict")
        point["metadata"] = copy.deepcopy(metadata)
    if tensor is not None:
        if not torch.is_tensor(tensor):
            raise NelsEmbeddingError("tensor must be a torch.Tensor")
        point["tensor"] = tensor
        point.update(tensor_summary(tensor))
    if tensor_ref is not None:
        point["tensor_ref"] = str(tensor_ref)

    validate_embedding_point(point)
    _refresh_embedding_set_summary(embedding_set)
    return embedding_set


def collect_point_tensors(embedding_set: dict[str, Any]) -> list[torch.Tensor]:
    """Collect point tensors in point order."""
    validate_embedding_set(embedding_set)
    return [point["tensor"] for point in embedding_set["points"]]


def normalize_tensor(value: torch.Tensor, eps: float = 1e-12) -> torch.Tensor:
    """Normalize a tensor as a flat vector."""
    vector = flatten_tensor(value)
    norm = torch.linalg.vector_norm(vector)
    if float(norm) <= eps:
        return torch.zeros_like(vector)
    return vector / norm.clamp_min(eps)


def cosine_similarity(
    left: torch.Tensor, right: torch.Tensor, eps: float = 1e-12
) -> float:
    """Cosine similarity between two tensors after flattening."""
    left_vector = normalize_tensor(left, eps=eps)
    right_vector = normalize_tensor(right, eps=eps)
    return float(torch.dot(left_vector, right_vector).item())


def euclidean_distance(left: torch.Tensor, right: torch.Tensor) -> float:
    """Euclidean distance between two tensors after flattening."""
    left_vector = flatten_tensor(left)
    right_vector = flatten_tensor(right)
    if left_vector.shape != right_vector.shape:
        raise NelsEmbeddingError(
            f"Shape mismatch: {tuple(left_vector.shape)} != {tuple(right_vector.shape)}"
        )
    return float(torch.linalg.vector_norm(left_vector - right_vector).item())


def pairwise_distance_matrix(
    tensors: Iterable[torch.Tensor],
    *,
    metric: str = "euclidean",
) -> torch.Tensor:
    """Compute a pairwise distance/similarity matrix for flattened tensors."""
    vectors = [flatten_tensor(tensor) for tensor in tensors]
    if not vectors:
        return torch.zeros((0, 0), dtype=torch.float32)
    matrix = torch.stack(vectors).float()
    if metric == "euclidean":
        return torch.cdist(matrix, matrix, p=2)
    if metric == "cosine_distance":
        normalized = torch.nn.functional.normalize(matrix, dim=1)
        return 1.0 - (normalized @ normalized.T)
    if metric == "cosine_similarity":
        normalized = torch.nn.functional.normalize(matrix, dim=1)
        return normalized @ normalized.T
    raise NelsEmbeddingError(f"Unsupported pairwise metric: {metric}")


def nearest_neighbors(
    query: torch.Tensor,
    candidates: Iterable[torch.Tensor],
    *,
    limit: int = 5,
    metric: str = "cosine",
    tie_precision: int = 8,
) -> list[tuple[int, float]]:
    """Return ranked candidate indices and scores for one query tensor."""
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
        return sorted(ranked, key=lambda item: (-round(item[1], precision), item[0]))[
            :limit
        ]
    return sorted(ranked, key=lambda item: (round(item[1], precision), item[0]))[:limit]


def build_weighted_edges(
    embedding_set: dict[str, Any],
    *,
    neighbor_count: int = 3,
    metric: str = "cosine",
    include_self: bool = False,
) -> list[dict[str, Any]]:
    """Build KNN-style weighted edges. Uses sklearn when available, falls back to pairwise scan."""
    validate_embedding_set(embedding_set)
    points = embedding_set["points"]
    n = len(points)
    if n < 2:
        return []
    k = int(neighbor_count)

    try:
        import numpy as _np
        from sklearn.neighbors import NearestNeighbors as _NNN

        matrix = _np.stack([p["tensor"].numpy() for p in points])
        actual_k = min(k + (1 if not include_self else 0) + 1, n)
        nn = _NNN(n_neighbors=actual_k, metric=metric, algorithm="auto", n_jobs=-1)
        nn.fit(matrix)
        distances, indices = nn.kneighbors(matrix)

        edges: list[dict[str, Any]] = []
        seen: set[tuple[int, int]] = set()
        for i, point in enumerate(points):
            emitted = 0
            for dist, j in zip(distances[i], indices[i]):
                j = int(j)
                if j == i and not include_self:
                    continue
                key = (min(i, j), max(i, j))
                if key in seen:
                    continue
                seen.add(key)
                weight = (
                    max(0.0, 1.0 - float(dist)) if metric == "cosine" else float(dist)
                )
                edges.append(
                    {
                        "source": point["id"],
                        "target": points[j]["id"],
                        "weight": weight,
                        "metric": metric,
                    }
                )
                emitted += 1
                if emitted >= k:
                    break
        return edges

    except ImportError:
        pass

    # Fallback: original O(N²) scan
    tensors = [point["tensor"] for point in points]
    edges = []
    for source_index, source in enumerate(points):
        ranked = nearest_neighbors(
            tensors[source_index],
            tensors,
            limit=min(n, max(k + 1, 1)),
            metric=metric,
        )
        emitted = 0
        for target_index, score in ranked:
            if target_index == source_index and not include_self:
                continue
            edges.append(
                {
                    "source": source["id"],
                    "target": points[target_index]["id"],
                    "weight": float(score),
                    "metric": metric,
                }
            )
            emitted += 1
            if emitted >= k:
                break
    return edges


def _refresh_embedding_set_summary(embedding_set: dict[str, Any]) -> None:
    points = embedding_set.get("points", [])
    embedding_set.setdefault("version", EMBEDDING_SET_VERSION)
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


__all__ = [
    "EMBEDDING_SET_TYPE",
    "EMBEDDING_SET_VERSION",
    "NelsEmbeddingError",
    "add_embedding_point",
    "build_weighted_edges",
    "collect_point_tensors",
    "cosine_similarity",
    "create_embedding_set",
    "delete_embedding_point",
    "embedding_set_snapshot",
    "embedding_set_to_json",
    "euclidean_distance",
    "flatten_tensor",
    "get_embedding_point",
    "make_embedding_point",
    "nearest_neighbors",
    "normalize_tensor",
    "pairwise_distance_matrix",
    "tensor_summary",
    "update_embedding_point",
    "validate_embedding_point",
    "validate_embedding_set",
]
