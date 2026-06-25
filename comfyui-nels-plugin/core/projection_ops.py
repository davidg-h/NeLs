"""Projection helpers for the NELS graph pipeline"""

from collections.abc import Iterable
from pathlib import Path
from typing import Any

import numpy as np
import torch

from .defaults import UMAP_3D_MIN_DIST, UMAP_3D_SPREAD
from .tensor_ops import flatten_tensor


def project_trajectory(
    trajectory_points: list[dict[str, Any]],
    dataset_path: str | None,
) -> list[dict[str, Any]]:
    """Project synthetic trajectory tensors and ghost nodes into 2D and 3D canvas space"""

    if not dataset_path:
        raise ValueError("Dataset path is required for trajectory projection")

    path = Path(dataset_path)
    model_2d_path = path / "umap_model_2d"
    model_3d_path = path / "umap_model_3d"
    ref_2d_path = path / "umap_2d.npy"
    ref_3d_path = path / "umap_3d.npy"

    model_2d = load_parametric_umap(model_2d_path)
    model_3d = load_parametric_umap(model_3d_path)
    ref_2d: np.ndarray = np.load(str(ref_2d_path))
    ref_3d: np.ndarray = np.load(str(ref_3d_path))

    # Build synthetic embedding matrix [steps, features]
    tensors = [pt["tensor"] for pt in trajectory_points if pt.get("tensor") is not None]
    if not tensors:
        return []

    matrix = _stack_flattened_tensors(tensors).numpy()
    raw_2d: np.ndarray = model_2d.transform(matrix)
    raw_3d: np.ndarray = model_3d.transform(matrix)

    # Normalize ghost coords into the same space as real graph points
    norm_2d = _apply_projection_mapping(raw_2d, ref_2d)
    norm_3d = _apply_projection_mapping(raw_3d, ref_3d)

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
                **(
                    {"source_text_pair": pt["source_text_pair"]} if "source_text_pair" in pt else {}
                ),
            }
        )
        mat_idx += 1

    return overlay


def map_coords_to_range(
    coordinates: torch.Tensor,
    *,
    target_radius: float = 1.0,
) -> torch.Tensor:
    """Center and scale projected coords to [-target_radius, target_radius] for frontend display"""
    if coordinates.ndim != 2:
        raise ValueError("Projected coordinates must be a 2D matrix")
    if coordinates.numel() == 0:
        return coordinates.float()

    coords = torch.nan_to_num(coordinates.float(), nan=0.0, posinf=0.0, neginf=0.0)
    coords = coords - coords.mean(dim=0, keepdim=True)
    max_abs = torch.max(torch.abs(coords))
    if float(max_abs) > 0.0:
        coords = coords / max_abs * float(target_radius)
    return coords


def compute_umap(
    pooled: np.ndarray,
    n_neighbors: int,
    min_dist: float,
    random_state: int,
) -> tuple[np.ndarray, np.ndarray, Any, Any]:
    """Fit 2D and 3D Parametric UMAP reducers on the full dataset, return coords and models"""
    n = pooled.shape[0]
    nn = min(int(n_neighbors), max(2, n - 1))
    reducer_2d = _build_parametric_umap(
        n_components=2,
        n_neighbors=nn,
        min_dist=float(min_dist),
        random_state=int(random_state),
    )
    reducer_3d = _build_parametric_umap(
        n_components=3,
        n_neighbors=nn,
        min_dist=UMAP_3D_MIN_DIST,
        random_state=int(random_state),
        spread=UMAP_3D_SPREAD,
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
    """Fit cluster-space Parametric UMAP on the full dataset with min_dist=0.0"""
    n = pooled.shape[0]
    reducer = _build_parametric_umap(
        n_components=min(int(n_components), n - 1),
        n_neighbors=min(int(n_neighbors), max(2, n - 1)),
        min_dist=0.0,
        random_state=int(random_state),
    )

    cluster_coords = reducer.fit_transform(pooled).astype(np.float32)

    return cluster_coords, reducer


def save_parametric_umap(reducer: Any, model_dir: Path) -> None:
    """Persist a fitted Parametric UMAP reducer to model_dir (directory, not a file)

    Temporarily clears reducer.parametric_model before delegating to the librarys own
    .save()

    Note: umap-learn cannot serialize that Keras submodel under Keras >=3 (open
    upstream bug: lmcinnes/umap issues #980/#1056), but .transform() only ever reads
    reducer.encoder, so the skipped submodel is never needed again for our use cases
    """
    model_dir.mkdir(parents=True, exist_ok=True)
    parametric_model = reducer.parametric_model
    reducer.parametric_model = None
    try:
        reducer.save(str(model_dir), verbose=True)
    finally:
        reducer.parametric_model = parametric_model


def load_parametric_umap(model_dir: Path) -> Any:
    """Load a previously saved Parametric UMAP reducer from model_dir"""
    import tensorflow as tf

    tf.config.set_visible_devices([], "GPU")
    from umap.parametric_umap import load_ParametricUMAP

    return load_ParametricUMAP(str(model_dir), verbose=True)


def compute_iso_bounds(reference: np.ndarray) -> tuple[np.ndarray, float]:
    """Midpoint and isotropic span of reference, shared by the forward/inverse canvas mapping"""
    mins = reference.min(axis=0)
    maxs = reference.max(axis=0)
    midpoint = (mins + maxs) / 2.0
    iso_span = float((maxs - mins).max()) or 1.0
    return midpoint, iso_span


# ---- internals ----


def _stack_flattened_tensors(tensors: Iterable[torch.Tensor]) -> torch.Tensor:
    """Stack tensors as float matrix [points, features] for UMAP ghost node projection"""
    vectors = [flatten_tensor(tensor) for tensor in tensors]
    if not vectors:
        return torch.zeros((0, 0), dtype=torch.float32)

    expected_shape = vectors[0].shape
    for index, vector in enumerate(vectors):
        if vector.shape != expected_shape:
            raise ValueError(
                f"Tensor {index} flattened shape {tuple(vector.shape)} does not "
                f"match expected shape {tuple(expected_shape)}"
            )
    return torch.stack(vectors).float().cpu()


def _apply_projection_mapping(ghost: np.ndarray, reference: np.ndarray) -> np.ndarray:
    """Map ghost coords into the same range as reference: 2*(raw-midpoint)/iso_span"""
    midpoint, iso_span = compute_iso_bounds(reference)
    return 2.0 * (ghost - midpoint) / iso_span


def _build_parametric_umap(
    n_components: int,
    n_neighbors: int,
    min_dist: float,
    random_state: int,
    **extra_umap_kwargs: Any,
) -> Any:
    """Construct a CPU-forced Parametric UMAP reducer with the given UMAP hyperparameters"""
    import tensorflow as tf

    tf.config.set_visible_devices([], "GPU")
    try:
        from umap.parametric_umap import ParametricUMAP
    except ImportError as exc:
        raise ImportError(
            "umap-learn[parametric_umap] is required for UMAP projection: "
            "pip install umap-learn[parametric_umap]"
        ) from exc

    return ParametricUMAP(
        n_components=n_components,
        n_neighbors=n_neighbors,
        min_dist=min_dist,
        metric="cosine",
        random_state=random_state,
        **extra_umap_kwargs,
    )
