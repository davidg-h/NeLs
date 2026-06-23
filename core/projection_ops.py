"""Projection helpers for the NELS graph pipeline"""

import json
from collections.abc import Iterable
from pathlib import Path
from typing import Any

import numpy as np
import torch

from .defaults import (
    UMAP_3D_MIN_DIST,
    UMAP_3D_SPREAD,
    UMAP_MIN_DIST,
    UMAP_N_NEIGHBORS,
    UMAP_SEED,
)
from .tensor_ops import flatten_tensor


def project_trajectory(
    trajectory_points: list[dict[str, Any]],
    dataset_path: str | None,
) -> tuple[list[dict[str, Any]], str | None]:
    """Project synthetic trajectory tensors/ghost nodes into 2D/3D canvas space

    returns (overlay_points, warning)
    """

    if not dataset_path:
        return [], "UMAP model unavailable - showing arc only"

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
        return [], f"UMAP model unavailable - showing arc only ({exc})"

    # Build synthetic embedding matrix [steps, features]
    tensors = [pt["tensor"] for pt in trajectory_points if pt.get("tensor") is not None]
    if not tensors:
        return [], None

    try:
        matrix = _stack_flattened_tensors(tensors).numpy()
        raw_2d: np.ndarray = model_2d.transform(matrix)
        raw_3d: np.ndarray = model_3d.transform(matrix)
    except Exception as exc:
        return [], f"UMAP transform failed - showing arc only ({exc})"

    # Normalize ghost coords using same params as real dataset
    # puts ghost nodes in the same space as real graph points
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

    return overlay, None


def inverse_project(
    coords: list[float],
    dataset_path: str,
    *,
    mode: str = "2d",
    neighbor_count: int = 5,
    loaded_points: list[dict[str, Any]] | None = None,
) -> tuple[list[dict[str, Any]], np.ndarray]:
    """Inverse-project canvas coords -> estimated embedding & top-k nearest prompts

    Embedding estimation always uses the full dataset for accuracy
    """
    path = Path(dataset_path)
    ref_key = "umap_2d.npy" if mode == "2d" else "umap_3d.npy"
    ref_path = path / ref_key
    pooled_path = path / "embeddings.npy"
    if not ref_path.exists() or not pooled_path.exists():
        raise FileNotFoundError(f"Dataset files missing in {path}")

    # 1: estimate high-dim embedding from full dataset
    ref: np.ndarray = np.load(str(ref_path))
    pooled: np.ndarray = np.load(str(pooled_path), mmap_mode="r")
    query_raw = _denormalize_canvas_coords(coords, ref, mode)
    ref_f32 = ref.astype(np.float32)
    dists = np.linalg.norm(ref_f32 - query_raw, axis=1)
    k_inv = min(10, len(ref_f32))
    nn_idx = np.argpartition(dists, k_inv)[:k_inv]
    weights = 1.0 / (dists[nn_idx] + 1e-8)
    weights /= weights.sum()
    q = (np.array(pooled[nn_idx], dtype=np.float32) * weights[:, None]).sum(axis=0)

    # 2: nearest-prompts kNN on loaded points
    if loaded_points:
        valid: list[tuple[dict, np.ndarray]] = []
        for pt in loaded_points:
            t = pt.get("tensor")
            if t is not None:
                emb = (
                    t.detach().float().cpu().numpy().ravel()
                    if hasattr(t, "detach")
                    else np.array(t, dtype=np.float32).ravel()
                )
                valid.append((pt, emb))
        if valid:
            lp_matrix = np.stack([emb for _, emb in valid]).astype(np.float32)
            ranked_local = _cosine_knn_numpy(q, lp_matrix, k=min(neighbor_count, len(valid)))
            results = []
            for local_idx, score in ranked_local:
                pt, emb = valid[local_idx]
                results.append(
                    {
                        "id": str(pt.get("id", f"p_{local_idx:06d}")),
                        "label": str(pt.get("label") or pt.get("id", ""))[:80],
                        "score": float(score),
                        "_embedding": emb,
                        "full_text": pt.get("metadata", {}).get("text"),
                    }
                )
            return results, q

    # Fallback: full dataset search (results may not be selectable in canvas)
    samples_path = path / "samples.jsonl"
    if not samples_path.exists():
        raise FileNotFoundError(f"samples.jsonl missing in {path}")
    ranked_full = _cosine_knn_numpy(q, pooled, k=neighbor_count)
    needed = {idx for idx, _ in ranked_full}
    samples: dict[int, dict] = {}
    with samples_path.open(encoding="utf-8") as f:
        for line_no, line in enumerate(f):
            if line_no in needed:
                samples[line_no] = json.loads(line)
            if len(samples) == len(needed):
                break
    results = []
    for idx, score in ranked_full:
        if idx not in samples:
            continue
        s = samples[idx]
        results.append(
            {
                "id": s.get("id", f"p_{idx:06d}"),
                "label": (s.get("text") or s.get("id", ""))[:80],
                "score": float(score),
                "_embedding": pooled[idx],
                "full_text": s.get("text"),
            }
        )
    return results, q


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
    *,
    fit_indices: np.ndarray | None = None,
) -> tuple[np.ndarray, np.ndarray, Any, Any]:
    """Fit 2D/3D UMAP reducers and return coords plus fitted models

    When fit_indices is provided, the reducers are fit on that subset only and then transform() is called on all of pooled
    """
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
        metric="cosine",
        random_state=int(random_state),
        n_jobs=1,
    )
    reducer_3d = umap_lib.UMAP(
        n_components=3,
        n_neighbors=nn,
        min_dist=UMAP_3D_MIN_DIST,
        spread=UMAP_3D_SPREAD,
        metric="cosine",
        random_state=int(random_state),
        n_jobs=1,
    )

    if fit_indices is not None:
        fit_data = pooled[fit_indices]
        reducer_2d.fit(fit_data)
        umap_2d = reducer_2d.transform(pooled).astype(np.float32)
        reducer_3d.fit(fit_data)
        umap_3d = reducer_3d.transform(pooled).astype(np.float32)
    else:
        umap_2d = reducer_2d.fit_transform(pooled).astype(np.float32)
        umap_3d = reducer_3d.fit_transform(pooled).astype(np.float32)

    for _r in (reducer_2d, reducer_3d):
        if hasattr(_r, "_raw_data"):
            del _r._raw_data

    return umap_2d, umap_3d, reducer_2d, reducer_3d


def compute_cluster_umap(
    pooled: np.ndarray,
    n_components: int,
    n_neighbors: int,
    random_state: int,
    *,
    fit_indices: np.ndarray | None = None,
) -> tuple[np.ndarray, Any]:
    """UMAP for clustering with min_dist=0.0 for compact clusters

    When fit_indices is provided, fits on that subset then transforms all of pooled
    """
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

    if fit_indices is not None:
        reducer.fit(pooled[fit_indices])
        cluster_coords = reducer.transform(pooled).astype(np.float32)
    else:
        cluster_coords = reducer.fit_transform(pooled).astype(np.float32)

    if hasattr(reducer, "_raw_data"):
        del reducer._raw_data

    return cluster_coords, reducer


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
        random_state=int(up.get("random_state", UMAP_SEED)),
    )
    if r2d is not None:
        joblib.dump(r2d, model_2d)
        joblib.dump(r3d, model_3d)
    return umap_2d, umap_3d


def select_random_indices(n: int, size: int, seed: int) -> np.ndarray:
    """Return a sorted array of min(size, n) unique random indices from [0, n)"""
    rng = np.random.default_rng(seed)
    return np.sort(rng.choice(n, size=min(size, n), replace=False))


def select_stratified_indices(
    n: int,
    size: int,
    labels: np.ndarray,
    min_per_cluster: int,
    seed: int,
) -> np.ndarray:
    """Return sorted indices of ~size points drawn proportionally from each cluster

    Each cluster (label >= 0) gets at least min_per_cluster seats, or all its points
    if smaller - remaining budget fills proportionally, then noise (-1) gets a
    proportional share (falls back to random if no non-noise clusters exist)
    """
    rng = np.random.default_rng(seed)
    unique = np.unique(labels[labels >= 0])
    if len(unique) == 0:
        return select_random_indices(n, size, seed)

    selected: list[int] = []
    for cid in unique:
        idx = np.where(labels == cid)[0]
        proportional = int(size * len(idx) / n)
        take = min(max(min_per_cluster, proportional), len(idx))
        selected.extend(rng.choice(idx, size=take, replace=False).tolist())

    noise_idx = np.where(labels == -1)[0]
    noise_budget = max(0, size - len(selected))
    if len(noise_idx) > 0 and noise_budget > 0:
        take_noise = min(noise_budget, len(noise_idx))
        selected.extend(rng.choice(noise_idx, size=take_noise, replace=False).tolist())

    # fill any remaining budget from unselected points
    if len(selected) < size:
        remaining = np.setdiff1d(np.arange(n), selected)
        extra = min(size - len(selected), len(remaining))
        if extra > 0:
            selected.extend(rng.choice(remaining, size=extra, replace=False).tolist())

    return np.sort(np.array(selected[:size]))


# ---- internals ----


def _denormalize_canvas_coords(coords: list[float], ref: np.ndarray, mode: str) -> np.ndarray:
    """Invert the frontend [-1, 1] isotropic normalization

    Frontend formula: coord = 2 * (raw - midpoint) / iso_span
    Inverse:          raw   = coord * iso_span / 2 + midpoint
    2D special case:  Y is negated in Sigma (y_graph = -y_norm) -> undo that too
    """
    mins = ref.min(axis=0)
    maxs = ref.max(axis=0)
    midpoint = (mins + maxs) / 2.0
    iso_span = float((maxs - mins).max()) or 1.0
    q = np.array(coords, dtype=np.float32)
    if mode == "2d" and len(q) >= 2:
        q = q.copy()
        q[1] = -q[1]  # undo Sigma Y-flip
    return q * (iso_span / 2.0) + midpoint


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
    mins = reference.min(axis=0)
    maxs = reference.max(axis=0)
    midpoint = (mins + maxs) / 2.0
    iso_span = float((maxs - mins).max()) or 1.0
    return 2.0 * (ghost - midpoint) / iso_span


def _cosine_knn_numpy(
    query: np.ndarray,
    matrix: np.ndarray,
    k: int,
) -> list[tuple[int, float]]:
    """Cosine kNN for a single query vector against a large matrix"""
    k = min(k, len(matrix))
    mat = np.array(matrix, dtype=np.float32)
    norms = np.linalg.norm(mat, axis=1, keepdims=True)
    mat /= norms + 1e-8
    q = query.astype(np.float32)
    q /= np.linalg.norm(q) + 1e-8
    sims = mat @ q
    top = np.argpartition(sims, -k)[-k:]
    top = top[np.argsort(sims[top])[::-1]]
    return [(int(i), float(sims[i])) for i in top]
