"""Shared embedding-set contracts and tensor helpers for NELS nodes"""

import copy
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
        except ValueError:
            continue
    return points


def flatten_tensor(value: torch.Tensor) -> torch.Tensor:
    """Return detached 1D float tensor for distance/projection math"""
    if not torch.is_tensor(value):
        raise ValueError("Expected a torch.Tensor")
    return value.detach().float().reshape(-1)


def tensor_summary(value: torch.Tensor) -> dict[str, Any]:
    """JSON-safe tensor summary without copying values"""
    if not torch.is_tensor(value):
        raise ValueError("Expected a torch.Tensor")
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
) -> dict[str, Any]:
    """Create one runtime point record"""
    if not str(point_id).strip():
        raise ValueError("point_id must not be empty")
    if not str(label).strip():
        raise ValueError("label must not be empty")
    if not torch.is_tensor(tensor):
        raise ValueError("tensor must be a torch.Tensor")

    return {
        "id": str(point_id),
        "label": str(label),
        "tensor": tensor,
        "metadata": copy.deepcopy(metadata or {}),
        **tensor_summary(tensor),
    }


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


def validate_embedding_point(point: dict[str, Any]) -> dict[str, Any]:
    """Validate and normalize one embedding point"""
    if not isinstance(point, dict):
        raise ValueError("Embedding point must be a dict")

    point_id = str(point.get("id", "")).strip()
    label = str(point.get("label", "")).strip()
    if not point_id:
        raise ValueError("Embedding point is missing id")
    if not label:
        raise ValueError(f"Embedding point {point_id!r} is missing label")

    point["id"] = point_id
    point["label"] = label
    if not isinstance(point.get("metadata", {}), dict):
        raise ValueError(f"Embedding point {point_id!r} metadata must be a dict")
    point.setdefault("metadata", {})

    tensor = point.get("tensor")
    if torch.is_tensor(tensor):
        point.update(tensor_summary(tensor))
    else:
        raise ValueError(f"Embedding point {point_id!r} is missing tensor")

    return point


def validate_embedding_set(embedding_set: dict[str, Any]) -> dict[str, Any]:
    """Validate and normalize a `NELS_EMBEDDING_SET` payload"""
    if not isinstance(embedding_set, dict):
        raise ValueError("NELS_EMBEDDING_SET must be a dict")

    points = embedding_set.get("points")
    if not isinstance(points, list):
        raise ValueError("NELS_EMBEDDING_SET points must be a list")

    seen_ids: set[str] = set()
    expected_shape: list[int] | None = None
    for point in points:
        validate_embedding_point(point)
        point_id = point["id"]
        if point_id in seen_ids:
            raise ValueError(f"Duplicate embedding point id: {point_id}")
        seen_ids.add(point_id)

        shape = list(point.get("tensor_shape", []))
        if expected_shape is None:
            expected_shape = shape
        elif shape != expected_shape:
            raise ValueError(
                f"Embedding point {point_id!r} shape {shape} does not match "
                f"expected shape {expected_shape}"
            )

    embedding_set.setdefault("type", EMBEDDING_SET_TYPE)
    embedding_set.setdefault("embedding_type", "unknown")
    embedding_set.setdefault("metadata", {})
    if not isinstance(embedding_set["metadata"], dict):
        raise ValueError("NELS_EMBEDDING_SET metadata must be a dict")

    _refresh_embedding_set_summary(embedding_set)
    return embedding_set


def get_embedding_point(
    embedding_set: dict[str, Any],
    point_id: str,
) -> dict[str, Any]:
    """Return point by ID, raise if not found"""
    validate_embedding_set(embedding_set)
    for point in embedding_set["points"]:
        if point["id"] == point_id:
            return point
    raise ValueError(f"Embedding point not found: {point_id}")


def add_embedding_point(
    embedding_set: dict[str, Any],
    point: dict[str, Any],
) -> dict[str, Any]:
    """Add point to an embedding set"""
    validate_embedding_point(point)
    points = embedding_set.setdefault("points", [])
    if not isinstance(points, list):
        raise ValueError("NELS_EMBEDDING_SET points must be a list")

    for existing in points:
        if existing.get("id") == point["id"]:
            raise ValueError(f"Duplicate embedding point id: {point['id']}")

    _validate_point_shape_compatible(points, point)
    points.append(point)
    _refresh_embedding_set_summary(embedding_set)
    return embedding_set


def slerp(
    start: torch.Tensor,
    end: torch.Tensor,
    alpha: float,
    *,
    dot_threshold: float = 0.9995,
    eps: float = 1e-8,
) -> torch.Tensor:
    """Spherical linear interpolation between two tensors, reshaped to input shape"""
    start_vec = flatten_tensor(start)
    end_vec = flatten_tensor(end)
    if start_vec.shape != end_vec.shape:
        raise ValueError(
            f"slerp shape mismatch: {tuple(start_vec.shape)} != {tuple(end_vec.shape)}"
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


def normalize_tensor(value: torch.Tensor, eps: float = 1e-12) -> torch.Tensor:
    """Normalize tensor as flat vector"""
    vector = flatten_tensor(value)
    norm = torch.linalg.vector_norm(vector)
    return vector / norm.clamp_min(eps)


def cosine_similarity(left: torch.Tensor, right: torch.Tensor, eps: float = 1e-12) -> float:
    """Cosine similarity after flattening"""
    left_vector = normalize_tensor(left, eps=eps)
    right_vector = normalize_tensor(right, eps=eps)
    return float(torch.dot(left_vector, right_vector).item())


def nearest_neighbors(
    query: torch.Tensor,
    candidates: Iterable[torch.Tensor],
    *,
    limit: int = 5,
    tie_precision: int = 8,
) -> list[tuple[int, float]]:
    """Ranked candidate indices and cosine scores for one query tensor - FAISS primary, torch fallback"""
    if limit <= 0:
        return []

    cand_list = list(candidates)
    if not cand_list:
        return []

    try:
        return _nearest_neighbors_faiss(query, cand_list, limit=limit)
    except Exception:
        return _nearest_neighbors_torch(query, cand_list, limit=limit, tie_precision=tie_precision)


def lerp_cond(a: torch.Tensor, b: torch.Tensor, alpha: float) -> torch.Tensor:
    """Linearly interpolate between two cond tensors, padding the shorter one with zeros if needed"""
    max_len = max(a.shape[0], b.shape[0])
    return torch.lerp(_pad_cond(a, max_len), _pad_cond(b, max_len), alpha)


def slerp_cond(a: torch.Tensor, b: torch.Tensor, alpha: float) -> torch.Tensor:
    """Spherically interpolate between two cond tensors, padding the shorter one with zeros if needed"""
    max_len = max(a.shape[0], b.shape[0])
    return slerp(_pad_cond(a, max_len), _pad_cond(b, max_len), alpha)


def mean_cond(tensors: list[torch.Tensor]) -> torch.Tensor:
    """Mean of a list of seq_cond tensors, padding shorter ones with zeros"""
    if not tensors:
        raise ValueError("mean_cond: empty tensor list")
    max_len = max(t.shape[0] for t in tensors)
    return torch.stack([_pad_cond(t, max_len) for t in tensors]).mean(dim=0)


def delta_cond(
    cond_a: torch.Tensor, cond_b: torch.Tensor, cond_c: torch.Tensor, alpha: float
) -> torch.Tensor:
    """Delta walk in seq_cond space: normalize all, walk C_norm along A->B direction, restore C magnitude"""
    max_len = max(cond_a.shape[0], cond_b.shape[0], cond_c.shape[0])
    a = _pad_cond(cond_a, max_len)
    b = _pad_cond(cond_b, max_len)
    c = _pad_cond(cond_c, max_len)
    c_mag = c.norm().clamp_min(1e-8)
    a_norm = a / a.norm().clamp_min(1e-8)
    b_norm = b / b.norm().clamp_min(1e-8)
    c_norm = c / c_mag
    direction = b_norm - a_norm
    stepped = c_norm + direction * alpha
    return stepped / stepped.norm().clamp_min(1e-8) * c_mag


# ---- internals ----


def _nearest_neighbors_faiss(
    query: torch.Tensor,
    candidates: list[torch.Tensor],
    *,
    limit: int,
) -> list[tuple[int, float]]:
    import faiss
    import numpy as np

    n = len(candidates)
    dim = flatten_tensor(candidates[0]).shape[0]

    mat = np.stack([flatten_tensor(c).numpy() for c in candidates]).astype(np.float32)
    q = flatten_tensor(query).numpy().astype(np.float32).reshape(1, -1)

    faiss.normalize_L2(mat)
    faiss.normalize_L2(q)
    if n > 200_000:
        nlist = 128
        quantizer = faiss.IndexFlatIP(dim)
        index = faiss.IndexIVFFlat(quantizer, dim, nlist, faiss.METRIC_INNER_PRODUCT)
        index.train(mat)
    else:
        index = faiss.IndexFlatIP(dim)
    index.add(mat)
    scores, indices = index.search(q, min(limit, n))
    return [
        (int(indices[0, i]), float(scores[0, i]))
        for i in range(len(indices[0]))
        if indices[0, i] >= 0
    ]


def _nearest_neighbors_torch(
    query: torch.Tensor,
    candidates: list[torch.Tensor],
    *,
    limit: int,
    tie_precision: int,
) -> list[tuple[int, float]]:
    ranked = [(i, cosine_similarity(query, c)) for i, c in enumerate(candidates)]
    precision = max(0, int(tie_precision))
    return sorted(ranked, key=lambda item: (-round(item[1], precision), item[0]))[:limit]


def _refresh_embedding_set_summary(embedding_set: dict[str, Any]) -> None:
    """Keep metadata of embedding set consistent"""
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
        raise ValueError(
            f"Embedding point {point['id']!r} shape {shape} does not match "
            f"expected shape {expected_shape}"
        )


def _pad_cond(t: torch.Tensor, length: int) -> torch.Tensor:
    if t.shape[0] < length:
        t = torch.cat([t, t.new_zeros(length - t.shape[0], t.shape[1])], dim=0)
    return t
