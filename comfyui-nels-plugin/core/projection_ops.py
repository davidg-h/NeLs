"""Projection helpers for the NELS graph pipeline."""

from __future__ import annotations

import warnings
from typing import Any, Callable, Iterable

import torch

from .embedding_ops import (
    NelsEmbeddingError,
    build_weighted_edges,
    collect_point_tensors,
    flatten_tensor,
    validate_embedding_set,
)

try:  # Declared plugin dependency for the enhanced graph pipeline.
    import umap  # type: ignore
except Exception:  # pragma: no cover - depends on local runtime environment.
    umap = None


class NelsProjectionError(ValueError):
    """Raised when projection cannot be computed with the requested mode."""


def stack_flattened_tensors(tensors: Iterable[torch.Tensor]) -> torch.Tensor:
    """Stack tensors as a float matrix `[points, features]`."""
    vectors = [flatten_tensor(tensor) for tensor in tensors]
    if not vectors:
        return torch.zeros((0, 0), dtype=torch.float32)

    expected_shape = vectors[0].shape
    for index, vector in enumerate(vectors):
        if vector.shape != expected_shape:
            raise NelsEmbeddingError(
                f"Tensor {index} flattened shape {tuple(vector.shape)} does not "
                f"match expected shape {tuple(expected_shape)}"
            )
    return torch.stack(vectors).float().cpu()


def umap_project(
    matrix: torch.Tensor,
    *,
    dimensions: int,
    seed: int = 0,
) -> torch.Tensor:
    """Project with native UMAP, raising a clear error if unavailable."""
    if umap is None:
        raise NelsProjectionError(
            "UMAP projection requires the 'umap-learn' package. Install the "
            "plugin requirements or run: pip install umap-learn"
        )
    if dimensions not in (2, 3):
        raise NelsProjectionError("UMAP projection supports only 2D or 3D")
    if matrix.shape[0] < 2:
        return torch.zeros((matrix.shape[0], dimensions), dtype=torch.float32)

    n_neighbors = min(15, max(2, matrix.shape[0] - 1))
    reducer = umap.UMAP(
        n_components=dimensions,
        n_neighbors=n_neighbors,
        random_state=int(seed) & 0xFFFFFFFF,
    )
    with warnings.catch_warnings():
        warnings.filterwarnings(
            "ignore",
            message="n_jobs value .* overridden to 1 by setting random_state.*",
            category=UserWarning,
            module=r"umap\.umap_",
        )
        projected = reducer.fit_transform(matrix.numpy())
    return torch.as_tensor(projected, dtype=torch.float32)


def normalize_projected_coordinates(
    coordinates: torch.Tensor,
    *,
    target_radius: float = 1.0,
) -> torch.Tensor:
    """Center and scale projected coordinates for frontend display."""
    if coordinates.ndim != 2:
        raise NelsProjectionError("Projected coordinates must be a 2D matrix")
    if coordinates.numel() == 0:
        return coordinates.float()

    coords = torch.nan_to_num(coordinates.float(), nan=0.0, posinf=0.0, neginf=0.0)
    coords = coords - coords.mean(dim=0, keepdim=True)
    max_abs = torch.max(torch.abs(coords))
    if float(max_abs) > 0.0:
        coords = coords / max_abs * float(target_radius)
    return coords


def _edges_from_precomputed_knn(
    points: list[dict[str, Any]],
    indices: Any,  # np.ndarray (N, k), -1 means no neighbor
    distances: Any,  # np.ndarray (N, k)
    metric: str = "cosine",
) -> list[dict[str, Any]]:
    """Build edge list from a precomputed kNN index array (local indices)."""
    import numpy as _np

    edges: list[dict[str, Any]] = []
    seen: set[tuple[int, int]] = set()
    n = len(points)
    for i, point in enumerate(points):
        for pos in range(indices.shape[1]):
            j = int(indices[i, pos])
            if j < 0 or j >= n or j == i:
                continue
            key = (min(i, j), max(i, j))
            if key in seen:
                continue
            seen.add(key)
            dist = float(distances[i, pos])
            weight = max(0.0, 1.0 - dist) if metric == "cosine" else float(dist)
            edges.append(
                {
                    "source": point["id"],
                    "target": points[j]["id"],
                    "weight": weight,
                    "metric": metric,
                }
            )
    return edges


def build_edges_for_mode(
    embedding_set: dict[str, Any],
    *,
    edge_mode: str = "knn_cosine",
    neighbor_count: int = 3,
    similarity_threshold: float = 0.5,
    precomputed_knn: dict[str, Any] | None = None,
) -> list[dict[str, Any]]:
    """Build frontend graph edges from high-dimensional relationships."""
    mode = str(edge_mode or "").strip().lower()
    if mode == "none":
        return []

    if mode in ("knn_cosine", "knn_euclidean"):
        metric = "cosine" if mode == "knn_cosine" else "euclidean"
        if precomputed_knn is not None:
            pknn_metric = precomputed_knn.get("metric", "cosine")
            pknn_idx = precomputed_knn.get("indices")
            pknn_dst = precomputed_knn.get("distances")
            stored_k = int(pknn_idx.shape[1]) if pknn_idx is not None else 0
            if (
                pknn_metric == metric
                and pknn_idx is not None
                and neighbor_count <= stored_k
            ):
                return _edges_from_precomputed_knn(
                    embedding_set["points"],
                    pknn_idx[:, :neighbor_count],
                    pknn_dst[:, :neighbor_count],
                    metric=metric,
                )
        return build_weighted_edges(
            embedding_set,
            neighbor_count=neighbor_count,
            metric=metric,
            include_self=False,
        )

    if mode == "threshold_cosine":
        return build_threshold_cosine_edges(
            embedding_set,
            similarity_threshold=similarity_threshold,
        )
    if mode == "fully_connected":
        n = len(embedding_set["points"])
        if n > 300:
            raise NelsProjectionError(
                f"fully_connected is disabled for N={n} > 300. Use kNN modes for large datasets."
            )
        return build_fully_connected_edges(embedding_set, metric="cosine")
    raise NelsProjectionError(
        f"Unsupported edge_mode {edge_mode!r}; expected none, knn_cosine, "
        "knn_euclidean, threshold_cosine, or fully_connected"
    )


def build_threshold_cosine_edges(
    embedding_set: dict[str, Any],
    *,
    similarity_threshold: float = 0.5,
) -> list[dict[str, Any]]:
    """Build undirected edges where cosine similarity clears a threshold."""
    import numpy as _np

    validate_embedding_set(embedding_set)
    points = embedding_set["points"]
    n = len(points)
    if n < 2:
        return []

    matrix = torch.stack([p["tensor"] for p in points])
    normalized = torch.nn.functional.normalize(matrix.float(), dim=1)
    sim = (normalized @ normalized.T).numpy()

    rows, cols = _np.where(_np.triu(sim >= float(similarity_threshold), k=1))
    return [
        {
            "source": points[int(r)]["id"],
            "target": points[int(c)]["id"],
            "weight": float(sim[r, c]),
            "metric": "cosine",
        }
        for r, c in zip(rows, cols)
    ]


def build_fully_connected_edges(
    embedding_set: dict[str, Any],
    *,
    metric: str = "cosine",
) -> list[dict[str, Any]]:
    """Build undirected all-to-all edges for small/debug graph views (N≤300 only)."""
    import numpy as _np

    validate_embedding_set(embedding_set)
    points = embedding_set["points"]
    n = len(points)
    if n < 2:
        return []

    matrix = torch.stack([p["tensor"] for p in points]).float()
    if metric == "cosine":
        normalized = torch.nn.functional.normalize(matrix, dim=1)
        weight_matrix = (normalized @ normalized.T).numpy()
    elif metric == "euclidean":
        weight_matrix = torch.cdist(matrix, matrix, p=2).numpy()
    else:
        raise NelsProjectionError(f"Unsupported fully_connected metric: {metric}")

    rows, cols = _np.triu_indices(n, k=1)
    return [
        {
            "source": points[int(r)]["id"],
            "target": points[int(c)]["id"],
            "weight": float(weight_matrix[r, c]),
            "metric": metric,
        }
        for r, c in zip(rows, cols)
    ]


def _project_umap(
    matrix: torch.Tensor,
    *,
    dimensions: int,
    seed: int,
    normalize: bool,
) -> list[list[float]]:
    if matrix.shape[0] == 0:
        return []
    if matrix.shape[0] == 1:
        return [[0.0] * dimensions]
    coords = umap_project(matrix, dimensions=dimensions, seed=seed)
    if normalize and coords.numel() > 0:
        coords = normalize_projected_coordinates(coords)
    return coords.tolist()


def project_both_modes(
    embedding_set: dict[str, Any],
    *,
    seed: int = 0,
    normalize: bool = True,
    edge_mode: str = "knn_cosine",
    neighbor_count: int = 3,
    similarity_threshold: float = 0.5,
    on_progress: Callable[[str], None] | None = None,
) -> dict[str, Any]:
    """Project embeddings into both 2D and 3D simultaneously, sharing edge computation."""
    validate_embedding_set(embedding_set)
    points = embedding_set["points"]
    tensors = collect_point_tensors(embedding_set)
    matrix = stack_flattened_tensors(tensors)

    if on_progress:
        on_progress("Computing 2D UMAP...")
    coords_2d = _project_umap(matrix, dimensions=2, seed=seed, normalize=normalize)

    if on_progress:
        on_progress("Computing 3D UMAP...")
    coords_3d = _project_umap(matrix, dimensions=3, seed=seed, normalize=normalize)

    if on_progress:
        on_progress("Building graph edges...")
    edges = build_edges_for_mode(
        embedding_set,
        edge_mode=edge_mode,
        neighbor_count=neighbor_count,
        similarity_threshold=similarity_threshold,
    )

    projected_2d = [
        {
            "id": p["id"],
            "label": p["label"],
            "coords": c,
            "metadata": p.get("metadata", {}),
        }
        for p, c in zip(points, coords_2d)
    ]
    projected_3d = [
        {
            "id": p["id"],
            "label": p["label"],
            "coords": c,
            "metadata": p.get("metadata", {}),
        }
        for p, c in zip(points, coords_3d)
    ]

    return {
        "points_2d": projected_2d,
        "points_3d": projected_3d,
        "edges": edges,
        "warnings": [],
    }


__all__ = [
    "NelsProjectionError",
    "build_edges_for_mode",
    "build_fully_connected_edges",
    "build_threshold_cosine_edges",
    "normalize_projected_coordinates",
    "project_both_modes",
    "stack_flattened_tensors",
]
