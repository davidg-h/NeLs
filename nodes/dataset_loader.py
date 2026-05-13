"""NELS Dataset Loader — loads a pre-encoded dataset from disk into the session pipeline."""

from __future__ import annotations

from pathlib import Path
from typing import Any, Callable

import numpy as np
import torch

from ..core.embedding_ops import create_embedding_set, make_embedding_point
from ..core.projection_ops import (
    build_edges_for_mode,
    normalize_projected_coordinates,
    project_both_modes,
)
from ..core.session_contracts import (
    assemble_snapshot,
    json_dumps,
    merge_dual_points,
    zip_point_coords,
)
from ..scripts.dataset_core import load_dataset, select_sample_indices
from ..server.session_store import get_store, source_config_hash

_PLUGIN_ROOT = Path(__file__).parent.parent
_DEFAULT_DATASETS = _PLUGIN_ROOT / "datasets"


def _remap_knn_to_local(
    knn_indices: Any,  # np.ndarray (N_full, k)
    knn_distances: Any,  # np.ndarray (N_full, k)
    selected_indices: list[int],
) -> tuple[Any, Any]:
    """Remap global kNN row/col indices to local indices for a selected subset."""
    import numpy as _np

    global_to_local = {int(g): l for l, g in enumerate(selected_indices)}
    n = len(selected_indices)
    stored_k = knn_indices.shape[1]

    out_idx = _np.full((n, stored_k), -1, dtype=_np.int32)
    out_dst = _np.zeros((n, stored_k), dtype=_np.float32)

    for local_i, global_i in enumerate(selected_indices):
        col = 0
        for pos in range(stored_k):
            j_global = int(knn_indices[global_i, pos])
            if j_global in global_to_local:
                out_idx[local_i, col] = global_to_local[j_global]
                out_dst[local_i, col] = float(knn_distances[global_i, pos])
                col += 1

    return out_idx, out_dst


def _make_precomputed_knn(
    dataset: dict[str, Any] | None,
    indices: list[int] | None,
    metric: str = "cosine",
) -> dict[str, Any] | None:
    if dataset is None:
        return None
    knn_idx = dataset.get(f"knn_{metric}_indices")
    knn_dst = dataset.get(f"knn_{metric}_distances")
    if knn_idx is None or knn_dst is None:
        return None
    k = int(
        dataset.get("metadata", {}).get("knn_params", {}).get("k", knn_idx.shape[1])
    )
    if indices is not None:
        knn_idx, knn_dst = _remap_knn_to_local(knn_idx, knn_dst, indices)
    return {"indices": knn_idx, "distances": knn_dst, "metric": metric, "k": k}


def _resolve_dataset_path(dataset_path: str) -> Path:
    """Resolve dataset_path to an absolute Path, raising a clear error if empty."""
    if not dataset_path or not dataset_path.strip():
        available = (
            sorted(d.name for d in _DEFAULT_DATASETS.iterdir() if d.is_dir())
            if _DEFAULT_DATASETS.is_dir()
            else []
        )
        hint = (
            "\n".join(f"  {n}" for n in available)
            if available
            else "  (none — run scripts/encode_cli.py create first)"
        )
        raise ValueError(
            f"dataset_path is empty. Available datasets in {_DEFAULT_DATASETS}:\n{hint}"
        )
    p = Path(dataset_path)
    if p.is_absolute():
        return p
    return _DEFAULT_DATASETS / dataset_path.strip()


def _build_embedding_set(
    dataset: dict[str, Any],
    indices: list[int],
) -> dict[str, Any]:
    """Convert selected rows of a loaded dataset into a NELS_EMBEDDING_SET."""
    pooled = dataset["pooled"]
    samples = dataset["samples"]
    meta = dataset["metadata"]

    points = []
    for i in indices:
        sample = samples[i]
        vec = torch.from_numpy(pooled[i]).float()
        point_meta: dict[str, Any] = {
            "source_type": sample.get("type", meta.get("type", "prompt_embedding")),
            "index": i,
            "source": sample.get("source", ""),
        }
        if sample.get("text"):
            point_meta["text"] = sample["text"]
        if sample.get("image_path"):
            point_meta["image_path"] = sample["image_path"]
        if sample.get("cluster") is not None:
            point_meta["cluster"] = sample["cluster"]
        if sample.get("original_size") is not None:
            point_meta["original_size"] = sample["original_size"]

        point_id = str(sample.get("id", f"p_{i:06d}"))
        label = sample.get("text") or sample.get("image_path") or point_id
        label = str(label)[:64]  # cap label length for display

        points.append(make_embedding_point(point_id, label, vec, point_meta))

    has_full_latents = dataset.get("full_latents_available", False)

    return create_embedding_set(
        points,
        embedding_type=meta.get("type", "prompt_embedding"),
        metadata={
            "dataset_name": meta.get("name", ""),
            "dataset_path": str(dataset.get("path", "")),
            "source_type": meta.get("type", "prompt_embedding"),
            "sample_count": len(indices),
            "embedding_dim": int(pooled.shape[1]) if pooled.ndim > 1 else int(pooled.shape[0]),
            "encoder": meta.get("encoder", ""),
            "source_dataset": meta.get("source_dataset", ""),
            "encoding_params": meta.get("encoding_params", {}),
            "has_full_latents": has_full_latents,
        },
    )


def build_loader_snapshot(
    embedding_set: dict[str, Any],
    *,
    session_id: str,
    config: dict[str, Any],
    dataset: dict[str, Any] | None = None,
    indices: list[int] | None = None,
    edge_mode: str = "knn_cosine",
    neighbor_count: int = 4,
    on_progress: Callable[[str], None] | None = None,
) -> dict[str, Any]:
    """Build a graph snapshot, using saved UMAP projections when available."""
    store = get_store()
    points = embedding_set["points"]

    saved_2d = dataset.get("umap_2d") if dataset else None
    saved_3d = dataset.get("umap_3d") if dataset else None

    if saved_2d is not None and saved_3d is not None and indices is not None:
        # Fast path: use the pre-computed projections saved by the encoder.
        coords_2d = normalize_projected_coordinates(
            torch.from_numpy(np.asarray(saved_2d[indices], dtype=np.float32))
        ).tolist()
        coords_3d = normalize_projected_coordinates(
            torch.from_numpy(np.asarray(saved_3d[indices], dtype=np.float32))
        ).tolist()
        if on_progress:
            on_progress("Building graph edges...")
        knn_metric = "euclidean" if edge_mode == "knn_euclidean" else "cosine"
        precomputed_knn = _make_precomputed_knn(dataset, indices, metric=knn_metric)
        edges = build_edges_for_mode(
            embedding_set,
            edge_mode=edge_mode,
            neighbor_count=neighbor_count,
            precomputed_knn=precomputed_knn,
        )
        snapshot_points = zip_point_coords(points, coords_2d, coords_3d)
        warnings: list[str] = []
        projection_method = "umap"
    else:
        # Slow fallback: recompute UMAP (dataset was created with --no-umap or projections missing).
        dual = project_both_modes(
            embedding_set,
            seed=config.get("random_seed", 42),
            edge_mode=edge_mode,
            neighbor_count=neighbor_count,
            on_progress=on_progress,
        )
        snapshot_points = merge_dual_points(dual["points_2d"], dual["points_3d"])
        edges = dual["edges"]
        warnings = dual["warnings"]
        projection_method = "umap_recomputed"

    # Expose the datasets precomputed kNN k so the UI can warn on overflow.
    if dataset:
        knn_k = dataset.get("metadata", {}).get("knn_params", {}).get("k")
        if knn_k is not None:
            config = {**config, "knn_k": int(knn_k)}

    return assemble_snapshot(
        snapshot_points,
        edges,
        session_id=session_id,
        config=config,
        config_hash=source_config_hash(config),
        source_meta=embedding_set["metadata"],
        state_revision=store.get_revision(session_id),
        projection_method=projection_method,
        warnings=warnings,
    )


def load_and_build(
    *,
    session_id: str,
    dataset_path: str,
    load_mode: str,
    count: int,
    window_start: int,
    random_seed: int,
    edge_mode: str = "knn_cosine",
    neighbor_count: int = 4,
    on_progress: Callable[[str], None] | None = None,
) -> tuple[dict[str, Any], dict[str, Any]]:
    """Load dataset, select samples, build embedding set and snapshot."""
    resolved = _resolve_dataset_path(dataset_path)
    dataset = load_dataset(resolved)

    total = len(dataset["samples"])
    indices = select_sample_indices(
        total,
        count,
        load_mode,
        window_start=window_start,
        random_seed=random_seed,
    )

    embedding_set = _build_embedding_set(dataset, indices)

    config = {
        "dataset_path": str(resolved),
        "load_mode": load_mode,
        "count": count,
        "window_start": window_start,
        "random_seed": random_seed,
    }
    snapshot = build_loader_snapshot(
        embedding_set,
        session_id=session_id,
        config=config,
        dataset=dataset,
        indices=indices,
        edge_mode=edge_mode,
        neighbor_count=neighbor_count,
        on_progress=on_progress,
    )
    return embedding_set, snapshot


def preview_dataset_source(
    *,
    session_id: str,
    dataset_path: str,
    load_mode: str,
    count: int,
    window_start: int,
    random_seed: int,
    edge_mode: str = "knn_cosine",
    neighbor_count: int = 4,
    on_progress: Callable[[str], None] | None = None,
) -> tuple[dict[str, Any], dict[str, Any]]:
    """Fetch or rebuild the cached snapshot for the panel's Refresh button."""
    config = {
        "dataset_path": dataset_path,
        "load_mode": load_mode,
        "count": count,
        "window_start": window_start,
        "random_seed": random_seed,
        "edge_mode": edge_mode,
        "neighbor_count": neighbor_count,
    }
    store = get_store()
    cached = store.get_cached_source(config)
    if cached is None:
        embedding_set, snapshot = load_and_build(
            session_id=session_id,
            dataset_path=dataset_path,
            load_mode=load_mode,
            count=count,
            window_start=window_start,
            random_seed=random_seed,
            edge_mode=edge_mode,
            neighbor_count=neighbor_count,
            on_progress=on_progress,
        )
        store.set_cached_source(config, embedding_set, snapshot)
    else:
        embedding_set, snapshot = cached
        snapshot = {
            **snapshot,
            "session_id": str(session_id or "default"),
            "state_revision": store.get_revision(session_id),
        }
    return embedding_set, snapshot


class NelsDatasetLoader:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dataset_path": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": (
                            "Absolute path or name of a dataset in the plugin datasets/ folder. "
                            "Leave empty to see available datasets."
                        ),
                    },
                ),
                "load_mode": (["first_n", "random_n", "window", "all"],),
                "count": (
                    "INT",
                    {
                        "default": 1000,
                        "min": 1,
                        "max": 100000,
                        "step": 1,
                        "tooltip": "Number of samples to load. Ignored when load_mode is 'all'.",
                    },
                ),
            },
            "optional": {
                "window_start": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 1000000,
                        "step": 1,
                        "tooltip": "Start index for window load_mode.",
                    },
                ),
                "random_seed": (
                    "INT",
                    {
                        "default": 42,
                        "min": 0,
                        "max": 2147483647,
                        "step": 1,
                        "tooltip": "Seed for reproducible random_n sampling.",
                    },
                ),
            },
        }

    RETURN_TYPES = ("NELS_EMBEDDING_SET", "STRING")
    RETURN_NAMES = ("embedding_set", "dataset_info_json")
    FUNCTION = "execute"
    CATEGORY = "nels/data"

    def execute(
        self,
        dataset_path: str,
        load_mode: str,
        count: int,
        window_start: int = 0,
        random_seed: int = 42,
    ):
        store = get_store()
        config = {
            "dataset_path": str(dataset_path).strip(),
            "load_mode": str(load_mode),
            "count": int(count),
            "window_start": int(window_start),
            "random_seed": int(random_seed),
        }
        cached = store.get_cached_source(config)
        if cached is None:
            embedding_set, snapshot = load_and_build(
                session_id="loader",
                dataset_path=config["dataset_path"],
                load_mode=config["load_mode"],
                count=config["count"],
                window_start=config["window_start"],
                random_seed=config["random_seed"],
            )
            store.set_cached_source(config, embedding_set, snapshot)
        else:
            embedding_set, snapshot = cached

        # Inject the full loader config so NelsSession can sync it to the store.
        embedding_set["_source_config"] = config

        info = {
            "node": "NELS Dataset Loader",
            "dataset": embedding_set.get("metadata", {}),
            "config": config,
            "source_config_hash": source_config_hash(config),
            "graph_snapshot": snapshot,
        }
        return (embedding_set, json_dumps(info))


NODE_CLASS_MAPPINGS = {"nels_DatasetLoader": NelsDatasetLoader}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_DatasetLoader": "NELS Dataset Loader"}
