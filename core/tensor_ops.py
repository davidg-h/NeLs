"""Shared embedding-set contracts and tensor helpers for NELS nodes"""

import copy
import math
import uuid
from collections.abc import Iterable
from typing import Any

import numpy as np
import torch

from .defaults import EPS_NORM

EMBEDDING_SET_TYPE = "NELS_EMBEDDING_SET"


def selected_points(
    embedding_set: dict[str, Any],
    selection: dict[str, Any] | None,
) -> list[dict[str, Any]]:
    """Resolve selection IDs against an embedding set, skipping missing points"""
    validate_embedding_set(embedding_set)
    selected_ids = (selection or {}).get("selected_point_ids") or []
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
    metadata: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Create a runtime `NELS_EMBEDDING_SET` payload"""
    payload = {
        "type": EMBEDDING_SET_TYPE,
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
) -> tuple[torch.Tensor, bool]:
    """Spherical linear interpolation between two tensors, reshaped to input shape

    Returns (interpolated_tensor, fell_back_to_lerp)
    """
    start_vec = flatten_tensor(start)
    end_vec = flatten_tensor(end)
    if start_vec.shape != end_vec.shape:
        raise ValueError(
            f"slerp shape mismatch: {tuple(start_vec.shape)} != {tuple(end_vec.shape)}"
        )

    start_norm = torch.linalg.vector_norm(start_vec)
    end_norm = torch.linalg.vector_norm(end_vec)
    if float(start_norm) <= eps or float(end_norm) <= eps:
        return torch.lerp(start, end, float(alpha)), True

    start_unit = start_vec / start_norm.clamp_min(eps)
    end_unit = end_vec / end_norm.clamp_min(eps)
    dot = torch.clamp(torch.dot(start_unit, end_unit), -1.0, 1.0)
    if abs(float(dot)) > float(dot_threshold):
        return torch.lerp(start, end, float(alpha)), True

    theta = torch.acos(dot)
    sin_theta = torch.sin(theta).clamp_min(eps)
    left = torch.sin((1.0 - float(alpha)) * theta) / sin_theta
    right = torch.sin(float(alpha) * theta) / sin_theta
    interpolated = left * start_vec + right * end_vec
    return interpolated.reshape_as(start).to(start.dtype), False


def normalize_tensor(value: torch.Tensor, eps: float = EPS_NORM) -> torch.Tensor:
    """Normalize tensor as flat vector"""
    vector = flatten_tensor(value)
    norm = torch.linalg.vector_norm(vector)
    return vector / norm.clamp_min(eps)


def cosine_similarity(left: torch.Tensor, right: torch.Tensor, eps: float = EPS_NORM) -> float:
    """Cosine similarity after flattening"""
    left_vector = normalize_tensor(left, eps=eps)
    right_vector = normalize_tensor(right, eps=eps)
    return float(torch.dot(left_vector, right_vector).item())


def normalize_l2_safe(matrix: np.ndarray) -> None:
    """L2-normalize `matrix` in place for FAISS using numpy"""

    # faiss.normalize_L2's SIMD routine (fvec_renorm_L2) can crash with a native access
    # violation when TensorFlow has also been loaded into the process - both bundle their own OpenMP/oneDNN runtime with conflict
    # normalizing in place instead
    norms = np.linalg.norm(matrix, axis=1, keepdims=True)
    np.divide(matrix, norms, out=matrix, where=norms > 0)


def build_faiss_ip_index(matrix: np.ndarray, *, batch_size: int = 10_000) -> Any:
    """Build a FAISS inner-product index for a float32 matrix and process vectors in batches"""
    import faiss

    if matrix.ndim != 2:
        raise ValueError(f"Expected a 2D matrix, got shape {matrix.shape}")
    n, dim = matrix.shape

    if n > 200_000:
        nlist = round(math.sqrt(n))
        quantizer = faiss.IndexFlatIP(dim)
        index = faiss.IndexIVFFlat(quantizer, dim, nlist, faiss.METRIC_INNER_PRODUCT)
        # Train the coarse quantizer on a representative random sample rather than the full matrix
        _POINTS_PER_CENTROID_CAP = 256
        train_size = min(n, min(round(n * 0.40), _POINTS_PER_CENTROID_CAP * nlist))
        rng = np.random.default_rng(42)
        train_idx = np.sort(rng.choice(n, size=train_size, replace=False))
        train_sample = np.array(matrix[train_idx], dtype=np.float32, copy=True)
        normalize_l2_safe(train_sample)
        index.train(train_sample)
        del train_sample
        index.nprobe = max(1, round(nlist * 0.2))
    else:
        index = faiss.IndexFlatIP(dim)

    for start in range(0, n, batch_size):
        batch = np.array(matrix[start : start + batch_size], dtype=np.float32, copy=True)
        normalize_l2_safe(batch)
        index.add(batch)

    return index


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


def slerp_cond(a: torch.Tensor, b: torch.Tensor, alpha: float) -> tuple[torch.Tensor, bool]:
    """Spherically interpolate between two cond tensors, padding the shorter one with zeros if needed

    Returns (interpolated_tensor, fell_back_to_lerp)
    """
    max_len = max(a.shape[0], b.shape[0])
    return slerp(_pad_cond(a, max_len), _pad_cond(b, max_len), alpha)


def mean_cond(tensors: list[torch.Tensor]) -> torch.Tensor:
    """Mean of a list of seq_cond tensors, padding shorter ones with zeros"""
    if not tensors:
        raise ValueError("mean_cond: empty tensor list")
    max_len = max(t.shape[0] for t in tensors)
    return torch.stack([_pad_cond(t, max_len) for t in tensors]).mean(dim=0)


def delta_walk_step(
    a_norm: torch.Tensor,
    b_norm: torch.Tensor,
    c_norm: torch.Tensor,
    alpha: float,
    eps: float = EPS_NORM,
) -> torch.Tensor:
    """Step c_norm along the a_norm->b_norm direction by alpha, renormalized to unit length

    Shared core of every delta-walk variant (seq cond, pooled, compact embedding)
    normalize their own inputs and rescale the result to whatever magnitude they need
    """
    direction = b_norm - a_norm
    stepped = c_norm + direction * float(alpha)
    return stepped / stepped.norm().clamp_min(eps)


def delta_cond(
    cond_a: torch.Tensor, cond_b: torch.Tensor, cond_c: torch.Tensor, alpha: float
) -> torch.Tensor:
    """Delta walk in seq_cond space: normalize all, walk C_norm along A->B direction, restore C magnitude"""
    max_len = max(cond_a.shape[0], cond_b.shape[0], cond_c.shape[0])
    a = _pad_cond(cond_a, max_len)
    b = _pad_cond(cond_b, max_len)
    c = _pad_cond(cond_c, max_len)
    c_mag = c.norm().clamp_min(EPS_NORM)
    a_norm = a / a.norm().clamp_min(EPS_NORM)
    b_norm = b / b.norm().clamp_min(EPS_NORM)
    c_norm = c / c_mag
    return delta_walk_step(a_norm, b_norm, c_norm, alpha) * c_mag


def point_embedding(point: dict[str, Any]) -> torch.Tensor:
    """Flattened embedding tensor for one embedding-set point - shared across every operation"""
    return flatten_tensor(point["tensor"])


def trajectory_point(
    index: int,
    tensor: torch.Tensor,
    alpha: float,
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
        **tensor_summary(tensor),
    }


def trajectory_payload(
    *,
    operation: str,
    trajectory_points: list[dict[str, Any]],
    source_point_ids: list[str],
    source_texts: list[str],
    request_id: str | None,
    state_revision: int | None,
    fallback_to_lerp: bool | None = None,
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
        **({"fallback_to_lerp": fallback_to_lerp} if fallback_to_lerp is not None else {}),
    }


# ---- internals ----


def _nearest_neighbors_faiss(
    query: torch.Tensor,
    candidates: list[torch.Tensor],
    *,
    limit: int,
) -> list[tuple[int, float]]:
    import faiss  # optional accelerated search, falls back to torch if unavailable

    n = len(candidates)
    mat = np.stack([flatten_tensor(c).numpy() for c in candidates]).astype(np.float32)
    q = flatten_tensor(query).numpy().astype(np.float32).reshape(1, -1)
    normalize_l2_safe(q)

    index = build_faiss_ip_index(mat)
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
    else:
        embedding_set["tensor_shape"] = []


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
