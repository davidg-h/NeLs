"""Projection helpers for the NELS graph pipeline"""

from __future__ import annotations

from collections.abc import Iterable
from pathlib import Path
from typing import Any

import numpy as np
import torch

from .defaults import UMAP_METRIC, UMAP_MIN_DIST, UMAP_N_NEIGHBORS, UMAP_SEED


def project_trajectory(
    trajectory_points: list[dict[str, Any]],
    dataset_path: str | None,
) -> tuple[list[dict[str, Any]], str | None]:
    """Project synthetic trajectory tensors/ghost nodes into 2D/3D canvas space — returns (overlay_points, warning)"""

    if not dataset_path:
        return [], "UMAP model unavailable — showing arc only"

    path = Path(dataset_path)
    model_2d_path = path / "umap_model_2d.pkl"
    model_3d_path = path / "umap_model_3d.pkl"
    ref_2d_path = path / "umap_2d.npy"
    ref_3d_path = path / "umap_3d.npy"

    try:
        import joblib as _joblib

        model_2d = _joblib.load(model_2d_path)
        model_3d = _joblib.load(model_3d_path)
        ref_2d: np.ndarray = np.load(str(ref_2d_path))
        ref_3d: np.ndarray = np.load(str(ref_3d_path))
    except Exception as exc:
        return [], f"UMAP model unavailable — showing arc only ({exc})"

    # Build synthetic embedding matrix [steps, features]
    tensors = [pt["tensor"] for pt in trajectory_points if pt.get("tensor") is not None]
    if not tensors:
        return [], None

    try:
        matrix = stack_flattened_tensors(tensors).numpy()
        raw_2d: np.ndarray = model_2d.transform(matrix)
        raw_3d: np.ndarray = model_3d.transform(matrix)
    except Exception as exc:
        return [], f"UMAP transform failed — showing arc only ({exc})"

    # Normalize ghost coords using same params as real dataset
    # puts ghost nodes in the same space as real graph points
    norm_2d = apply_reference_normalization(raw_2d, ref_2d)
    norm_3d = apply_reference_normalization(raw_3d, ref_3d)

    overlay: list[dict[str, Any]] = []
    mat_idx = 0
    for pt in trajectory_points:
        if pt.get("tensor") is None:
            continue
        overlay.append(
            {
                "id": pt["id"],
                "alpha": float(pt.get("alpha", 0.0)),
                "coords_2d": [float(norm_2d[mat_idx, 0]), float(norm_2d[mat_idx, 1])],
                "coords_3d": [
                    float(norm_3d[mat_idx, 0]),
                    float(norm_3d[mat_idx, 1]),
                    float(norm_3d[mat_idx, 2]),
                ],
            }
        )
        mat_idx += 1

    return overlay, None


def stack_flattened_tensors(tensors: Iterable[torch.Tensor]) -> torch.Tensor:
    """
    Stack tensors as float matrix `[points, features]`
    and make it useable for UMAP ghost nodes projection
    """
    from .embedding_ops import NelsEmbeddingError, flatten_tensor

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


def normalize_projected_coordinates(
    coordinates: torch.Tensor,
    *,
    target_radius: float = 1.0,
) -> torch.Tensor:
    """Center and scale projected coords for frontend display"""
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


def apply_reference_normalization(ghost: np.ndarray, reference: np.ndarray) -> np.ndarray:
    """Normalize `ghost` coordinates using mean and max_abs from `reference`"""
    mean = reference.mean(axis=0)
    max_abs = float(np.abs(reference - mean).max())
    if max_abs == 0.0:
        return ghost - mean
    return (ghost - mean) / max_abs


def compute_umap(
    pooled: np.ndarray,
    n_neighbors: int,
    min_dist: float,
    metric: str,
    random_state: int,
) -> tuple[np.ndarray, np.ndarray, Any, Any]:
    """Fit 2D/3D UMAP reducers and return coords plus fitted models"""
    n = pooled.shape[0]
    if n < 4:
        umap_2d = np.zeros((n, 2), dtype=np.float32)
        umap_3d = np.zeros((n, 3), dtype=np.float32)
        if n >= 2:
            umap_2d[:, 0] = np.arange(n, dtype=np.float32)
            umap_3d[:, 0] = np.arange(n, dtype=np.float32)
        return umap_2d, umap_3d, None, None

    try:
        import umap as umap_lib
    except ImportError as exc:
        raise ImportError(
            "umap-learn is required for UMAP projection: pip install umap-learn"
        ) from exc

    nn = min(int(n_neighbors), max(2, n - 1))
    reducer_2d = umap_lib.UMAP(
        n_components=2,
        n_neighbors=nn,
        min_dist=float(min_dist),
        metric=str(metric),
        random_state=int(random_state),
        n_jobs=1,
    )
    reducer_3d = umap_lib.UMAP(
        n_components=3,
        n_neighbors=nn,
        min_dist=float(min_dist),
        metric=str(metric),
        random_state=int(random_state),
        n_jobs=1,
    )
    umap_2d = reducer_2d.fit_transform(pooled).astype(np.float32)
    umap_3d = reducer_3d.fit_transform(pooled).astype(np.float32)
    return umap_2d, umap_3d, reducer_2d, reducer_3d


def compute_cluster_umap(
    pooled: np.ndarray,
    n_components: int,
    n_neighbors: int,
    random_state: int,
) -> tuple[np.ndarray, Any]:
    """UMAP for clustering with min_dist=0.0 for compact clusters"""
    n = pooled.shape[0]
    if n < 4:
        return np.zeros((n, n_components), dtype=np.float32), None

    try:
        import umap as umap_lib
    except ImportError as exc:
        raise ImportError(
            "umap-learn is required for UMAP projection: pip install umap-learn"
        ) from exc

    reducer = umap_lib.UMAP(
        n_components=min(int(n_components), n - 1),
        n_neighbors=min(int(n_neighbors), max(2, n - 1)),
        min_dist=0.0,
        metric="cosine",
        random_state=int(random_state),
        n_jobs=1,
    )
    return reducer.fit_transform(pooled).astype(np.float32), reducer


def extend_umap_with_models_or_refit(
    path: Path,
    merged_vectors: np.ndarray,
    new_vectors: np.ndarray,
    existing_umap_2d: np.ndarray | None,
    existing_umap_3d: np.ndarray | None,
    umap_params: dict[str, Any] | None = None,
) -> tuple[np.ndarray | None, np.ndarray | None]:
    """Extend existing UMAP coords via saved reducers or refit on merged vectors"""
    umap_2d = existing_umap_2d
    umap_3d = existing_umap_3d

    if umap_2d is None or umap_3d is None:
        return umap_2d, umap_3d

    try:
        import joblib
    except ImportError:
        return None, None

    model_2d = path / "umap_model_2d.pkl"
    model_3d = path / "umap_model_3d.pkl"
    if model_2d.exists() and model_3d.exists():
        r2d = joblib.load(model_2d)
        r3d = joblib.load(model_3d)
        umap_2d = np.concatenate([umap_2d, r2d.transform(new_vectors).astype(np.float32)])
        umap_3d = np.concatenate([umap_3d, r3d.transform(new_vectors).astype(np.float32)])
        return umap_2d, umap_3d

    up = umap_params or {}
    umap_2d, umap_3d, r2d, r3d = compute_umap(
        merged_vectors,
        n_neighbors=int(up.get("n_neighbors", UMAP_N_NEIGHBORS)),
        min_dist=float(up.get("min_dist", UMAP_MIN_DIST)),
        metric=str(up.get("metric", UMAP_METRIC)),
        random_state=int(up.get("random_state", UMAP_SEED)),
    )
    if r2d is not None:
        joblib.dump(r2d, model_2d)
        joblib.dump(r3d, model_3d)
    return umap_2d, umap_3d


class NelsProjectionError(ValueError):
    """Raised when projection cannot be computed with the requested mode"""


__all__ = [
    "NelsProjectionError",
    "compute_umap",
    "compute_cluster_umap",
    "extend_umap_with_models_or_refit",
    "normalize_projected_coordinates",
    "apply_reference_normalization",
    "project_trajectory",
    "stack_flattened_tensors",
]
