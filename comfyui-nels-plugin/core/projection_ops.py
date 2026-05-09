"""
Projection helpers for enhanced NELS graph exploration.

UMAP is the primary projection path for the finished graph workflow. PCA stays
available as a lightweight debug/fallback projection that requires no extra
dependency.
"""

from __future__ import annotations

import warnings
from typing import Any, Iterable

import torch

from .embedding_ops import (
    NelsEmbeddingError,
    build_weighted_edges,
    collect_point_tensors,
    cosine_similarity,
    euclidean_distance,
    flatten_tensor,
    validate_embedding_set,
)

try:  # Declared plugin dependency for the enhanced graph pipeline.
    import umap  # type: ignore
except Exception:  # pragma: no cover - depends on local runtime environment.
    umap = None


PROJECTION_MODES = (
    "2d_umap",
    "3d_umap",
    "2d_pca_debug",
    "3d_pca_debug",
)


class NelsProjectionError(ValueError):
    """Raised when projection cannot be computed with the requested mode."""


def project_embedding_set(
    embedding_set: dict[str, Any],
    *,
    projection_mode: str = "2d_umap",
    seed: int = 0,
    normalize: bool = True,
    edge_mode: str = "knn_cosine",
    neighbor_count: int = 3,
    similarity_threshold: float = 0.5,
) -> dict[str, Any]:
    """Project a `NELS_EMBEDDING_SET` into frontend-ready graph data."""
    validate_embedding_set(embedding_set)
    points = embedding_set["points"]
    tensors = collect_point_tensors(embedding_set)
    result = project_tensors(
        tensors,
        projection_mode=projection_mode,
        seed=seed,
        normalize=normalize,
    )
    edges = build_edges_for_mode(
        embedding_set,
        edge_mode=edge_mode,
        neighbor_count=neighbor_count,
        similarity_threshold=similarity_threshold,
    )

    projected_points = []
    for point, coords in zip(points, result["coordinates"]):
        projected_points.append(
            {
                "id": point["id"],
                "label": point["label"],
                "coords": coords,
                "metadata": point.get("metadata", {}),
            }
        )

    return {
        "projection_mode": projection_mode,
        "projection_method": result["projection_method"],
        "dimensions": result["dimensions"],
        "normalized": result["normalized"],
        "warnings": result["warnings"],
        "points": projected_points,
        "edges": edges,
    }


def project_tensors(
    tensors: Iterable[torch.Tensor],
    *,
    projection_mode: str = "2d_umap",
    seed: int = 0,
    normalize: bool = True,
) -> dict[str, Any]:
    """Project tensors into 2D or 3D coordinates."""
    dimensions, method = parse_projection_mode(projection_mode)
    matrix = stack_flattened_tensors(tensors)
    warnings: list[str] = []

    if matrix.shape[0] == 0:
        coords = torch.zeros((0, dimensions), dtype=torch.float32)
        actual_method = "empty"
    elif matrix.shape[0] == 1:
        coords = torch.zeros((1, dimensions), dtype=torch.float32)
        actual_method = "single_point"
    elif method == "umap":
        try:
            coords = umap_project(matrix, dimensions=dimensions, seed=seed)
            actual_method = "umap"
        except NelsProjectionError as exc:
            coords = pca_project(matrix, dimensions=dimensions)
            actual_method = "pca_fallback"
            warnings.append(str(exc))
    elif method == "pca":
        coords = pca_project(matrix, dimensions=dimensions)
        actual_method = "pca"
    else:  # pragma: no cover - parse_projection_mode guards this.
        raise NelsProjectionError(f"Unsupported projection method: {method}")

    if normalize and coords.numel() > 0:
        coords = normalize_projected_coordinates(coords)

    return {
        "coordinates": coords.tolist(),
        "projection_method": actual_method,
        "dimensions": dimensions,
        "normalized": bool(normalize),
        "warnings": warnings,
    }


def parse_projection_mode(projection_mode: str) -> tuple[int, str]:
    """Return `(dimensions, method)` for a supported projection mode."""
    mode = str(projection_mode or "").strip().lower()
    if mode not in PROJECTION_MODES:
        raise NelsProjectionError(
            f"Unsupported projection_mode {projection_mode!r}; expected one of "
            f"{', '.join(PROJECTION_MODES)}"
        )

    dimensions = 3 if mode.startswith("3d_") else 2
    method = "umap" if mode.endswith("_umap") else "pca"
    return dimensions, method


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


def pca_project(matrix: torch.Tensor, *, dimensions: int = 2) -> torch.Tensor:
    """Project with deterministic PCA using torch SVD."""
    if dimensions not in (2, 3):
        raise NelsProjectionError("PCA projection supports only 2D or 3D")
    if matrix.ndim != 2:
        raise NelsProjectionError("PCA input matrix must be 2D")
    if matrix.shape[0] == 0:
        return torch.zeros((0, dimensions), dtype=torch.float32)
    if matrix.shape[0] == 1:
        return torch.zeros((1, dimensions), dtype=torch.float32)

    centered = matrix.float() - matrix.float().mean(dim=0, keepdim=True)
    try:
        _, _, vh = torch.linalg.svd(centered, full_matrices=False)
    except RuntimeError as exc:  # pragma: no cover - defensive fallback.
        raise NelsProjectionError(f"PCA projection failed: {exc}") from exc

    available = min(dimensions, vh.shape[0])
    basis = vh[:available].T
    coords = centered @ basis
    if available < dimensions:
        padding = torch.zeros((coords.shape[0], dimensions - available))
        coords = torch.cat([coords, padding], dim=1)
    return coords[:, :dimensions].contiguous()


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


def build_edges_for_mode(
    embedding_set: dict[str, Any],
    *,
    edge_mode: str = "knn_cosine",
    neighbor_count: int = 3,
    similarity_threshold: float = 0.5,
) -> list[dict[str, Any]]:
    """Build frontend graph edges from high-dimensional relationships."""
    mode = str(edge_mode or "").strip().lower()
    if mode == "none":
        return []
    if mode == "knn_cosine":
        return build_weighted_edges(
            embedding_set,
            neighbor_count=neighbor_count,
            metric="cosine",
            include_self=False,
        )
    if mode == "knn_euclidean":
        return build_weighted_edges(
            embedding_set,
            neighbor_count=neighbor_count,
            metric="euclidean",
            include_self=False,
        )
    if mode == "threshold_cosine":
        return build_threshold_cosine_edges(
            embedding_set,
            similarity_threshold=similarity_threshold,
        )
    if mode == "fully_connected":
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
    validate_embedding_set(embedding_set)
    points = embedding_set["points"]
    edges: list[dict[str, Any]] = []
    for source_index, source in enumerate(points):
        for target_index in range(source_index + 1, len(points)):
            target = points[target_index]
            score = cosine_similarity(source["tensor"], target["tensor"])
            if score >= float(similarity_threshold):
                edges.append(
                    {
                        "source": source["id"],
                        "target": target["id"],
                        "weight": float(score),
                        "metric": "cosine",
                    }
                )
    return edges


def build_fully_connected_edges(
    embedding_set: dict[str, Any],
    *,
    metric: str = "cosine",
) -> list[dict[str, Any]]:
    """Build undirected all-to-all edges for small/debug graph views."""
    validate_embedding_set(embedding_set)
    points = embedding_set["points"]
    edges: list[dict[str, Any]] = []
    for source_index, source in enumerate(points):
        for target_index in range(source_index + 1, len(points)):
            target = points[target_index]
            if metric == "cosine":
                weight = cosine_similarity(source["tensor"], target["tensor"])
            elif metric == "euclidean":
                weight = euclidean_distance(source["tensor"], target["tensor"])
            else:
                raise NelsProjectionError(f"Unsupported fully_connected metric: {metric}")
            edges.append(
                {
                    "source": source["id"],
                    "target": target["id"],
                    "weight": float(weight),
                    "metric": metric,
                }
            )
    return edges


__all__ = [
    "PROJECTION_MODES",
    "NelsProjectionError",
    "build_edges_for_mode",
    "build_fully_connected_edges",
    "build_threshold_cosine_edges",
    "normalize_projected_coordinates",
    "parse_projection_mode",
    "pca_project",
    "project_embedding_set",
    "project_tensors",
    "stack_flattened_tensors",
    "umap_project",
]
