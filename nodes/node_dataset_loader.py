"""NELS Dataset Loader - load a pre-encoded dataset from disk into the session pipeline"""

import hashlib
from pathlib import Path
from typing import Any

import numpy as np
import torch

from ..core.dataset_io import load_dataset, resolve_dataset_path
from ..core.dataset_ops import select_sample_indices
from ..core.defaults import DEFAULT_DATASETS, UMAP_SEED
from ..core.projection_ops import map_coords_to_range
from ..core.session_contracts import (
    assemble_snapshot,
    json_dumps,
    source_config_hash,
    zip_point_coords,
)
from ..core.tensor_ops import create_embedding_set, make_embedding_point
from ..server.session_store import get_store


def preview_dataset_source(
    *,
    session_id: str,
    dataset_path: str,
    load_mode: str,
    count: int,
    window_start: int,
    random_seed: int,
) -> tuple[dict[str, Any], dict[str, Any]]:
    """Fetch or rebuild cached snapshot for panel Refresh"""
    config = {
        "dataset_path": dataset_path,
        "load_mode": load_mode,
        "count": count,
        "window_start": window_start,
        "random_seed": random_seed,
    }
    store = get_store()
    cache_config = _cache_config(config)
    embedding_set, snapshot, from_cache = _get_cached_or_build_source(
        config,
        cache_config=cache_config,
        session_id=session_id,
    )
    if from_cache:
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
        random_seed: int = UMAP_SEED,
    ):
        config = {
            "dataset_path": str(dataset_path).strip(),
            "load_mode": str(load_mode),
            "count": int(count),
            "window_start": int(window_start),
            "random_seed": int(random_seed),
        }
        cache_config = _cache_config(config)
        embedding_set, snapshot, _from_cache = _get_cached_or_build_source(
            config,
            cache_config=cache_config,
            session_id="loader",
        )

        # Inject full loader config so NelsSession can sync it to the store
        embedding_set["_source_config"] = config

        info = {
            "node": "NELS Dataset Loader",
            "dataset": embedding_set.get("metadata", {}),
            "config": config,
            "source_config_hash": source_config_hash(cache_config),
            "graph_snapshot": snapshot,
        }
        return (embedding_set, json_dumps(info))


NODE_CLASS_MAPPINGS = {"nels_DatasetLoader": NelsDatasetLoader}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_DatasetLoader": "NELS Dataset Loader"}

# ---- internals ----


def _build_embedding_set(
    dataset: dict[str, Any],
    indices: list[int],
) -> dict[str, Any]:
    """Convert selected rows into a NELS_EMBEDDING_SET"""
    pooled = dataset["pooled"]
    samples = dataset["samples"]
    meta = dataset["metadata"]

    points = []
    for i in indices:
        sample = samples[i]
        vec = torch.from_numpy(pooled[i].copy()).float()
        point_meta: dict[str, Any] = {
            "index": i,
            "source": sample.get("source", ""),
        }
        if sample.get("text"):
            point_meta["text"] = sample["text"]
        if sample.get("cluster_global") is not None:
            point_meta["cluster_global"] = sample["cluster_global"]
            point_meta["is_noise"] = sample.get("is_noise", False)
            point_meta["membership_strength"] = sample.get("membership_strength", 1.0)

        point_id = str(sample.get("id", f"p_{i:06d}"))
        label = sample.get("text") or point_id
        label = str(label)[:64]  # cap label length for display

        point = make_embedding_point(point_id, label, vec, point_meta)
        points.append(point)

    return create_embedding_set(
        points,
        metadata={
            "dataset_name": meta.get("name", ""),
            "loaded_sample_count": len(indices),
            "total_sample_count": meta.get("sample_count", len(indices)),
            "embedding_dim": int(pooled.shape[1]) if pooled.ndim > 1 else int(pooled.shape[0]),
            "encoder": meta.get("encoder", ""),
            "source_dataset": meta.get("source_dataset", ""),
            "umap_params": meta.get("umap_params", {}),
            "cluster_labels": meta.get("cluster_labels", {}),
        },
    )


def _build_loader_snapshot(
    embedding_set: dict[str, Any],
    *,
    session_id: str,
    config: dict[str, Any],
    dataset: dict[str, Any],
    indices: list[int],
) -> dict[str, Any]:
    """Build graph snapshot from pre-computed projections, raise if npy files are missing"""
    store = get_store()
    points = embedding_set["points"]

    saved_2d = dataset.get("umap_2d")
    saved_3d = dataset.get("umap_3d")

    if saved_2d is None or saved_3d is None:
        missing = [
            n for n, v in (("umap_2d.npy", saved_2d), ("umap_3d.npy", saved_3d)) if v is None
        ]
        raise ValueError(
            f"Dataset is missing pre-computed projections: {missing}. "
            "Re-encode the dataset with scripts/encode_cli.py to generate them."
        )

    coords_2d = map_coords_to_range(
        torch.from_numpy(np.asarray(saved_2d[indices], dtype=np.float32))
    ).tolist()
    coords_3d = map_coords_to_range(
        torch.from_numpy(np.asarray(saved_3d[indices], dtype=np.float32))
    ).tolist()
    snapshot_points = zip_point_coords(points, coords_2d, coords_3d)

    return assemble_snapshot(
        snapshot_points,
        session_id=session_id,
        config=config,
        source_meta=embedding_set["metadata"],
        state_revision=store.get_revision(session_id),
    )


def _load_and_build(
    *,
    session_id: str,
    dataset_path: str,
    load_mode: str,
    count: int,
    window_start: int,
    random_seed: int,
) -> tuple[dict[str, Any], dict[str, Any]]:
    """Load dataset, select samples, build embedding set and snapshot"""
    if not dataset_path or not dataset_path.strip():
        available = (
            sorted(d.name for d in DEFAULT_DATASETS.iterdir() if d.is_dir())
            if DEFAULT_DATASETS.is_dir()
            else []
        )
        hint = (
            "\n".join(f"  {n}" for n in available)
            if available
            else "  (none - run scripts/encode_cli.py create first)"
        )
        raise ValueError(
            f"dataset_path is empty. Available datasets in {DEFAULT_DATASETS}:\n{hint}"
        )

    store = get_store()
    store.publish_node_event(
        session_id,
        "computing_projection",
        node_name="NELS Dataset Loader",
        message="Loading dataset...",
        status="running",
    )
    resolved = resolve_dataset_path(dataset_path, datasets_root=DEFAULT_DATASETS)
    dataset = load_dataset(resolved)

    total = len(dataset["samples"])
    indices = select_sample_indices(
        total,
        count,
        load_mode,
        window_start=window_start,
        random_seed=random_seed,
    )

    store.publish_node_event(
        session_id,
        "computing_projection",
        node_name="NELS Dataset Loader",
        message="Building graph points...",
        status="running",
    )
    embedding_set = _build_embedding_set(dataset, indices)

    config = {
        "dataset_path": str(resolved),
        "load_mode": load_mode,
        "count": count,
        "window_start": window_start,
        "random_seed": random_seed,
    }
    store.publish_node_event(
        session_id,
        "computing_projection",
        node_name="NELS Dataset Loader",
        message="Computing projections...",
        status="running",
    )
    snapshot = _build_loader_snapshot(
        embedding_set,
        session_id=session_id,
        config=config,
        dataset=dataset,
        indices=indices,
    )
    return embedding_set, snapshot


def _get_cached_or_build_source(
    config: dict[str, Any],
    *,
    cache_config: dict[str, Any],
    session_id: str,
) -> tuple[dict[str, Any], dict[str, Any], bool]:
    """Get cached loader output or build and cache it"""
    store = get_store()
    cached = store.get_cached_source(cache_config)
    if cached is not None:
        embedding_set, snapshot = cached
        return embedding_set, snapshot, True

    embedding_set, snapshot = _load_and_build(
        session_id=session_id,
        dataset_path=config["dataset_path"],
        load_mode=config["load_mode"],
        count=config["count"],
        window_start=config["window_start"],
        random_seed=config["random_seed"],
    )
    store.set_cached_source(cache_config, embedding_set, snapshot)
    return embedding_set, snapshot, False


def _cache_config(config: dict[str, Any]) -> dict[str, Any]:
    """Normalize loader config and include dataset file state for cache invalidation"""
    if not str(config.get("dataset_path", "")).strip():
        return dict(config)

    resolved = resolve_dataset_path(config["dataset_path"], datasets_root=DEFAULT_DATASETS)
    return {
        **config,
        "dataset_path": str(resolved),
        "dataset_version": _dataset_version(resolved),
    }


def _dataset_version(dataset_path: Path) -> str:
    """Hash sizes and mtimes of dataset files that affect loader output"""
    tracked = (
        "dataset.json",
        "samples.jsonl",
        "compact_embeddings.npy",
        "umap_2d.npy",
        "umap_3d.npy",
    )
    parts: list[str] = []
    for name in tracked:
        path = dataset_path / name
        if not path.exists():
            parts.append(f"{name}:missing")
            continue
        stat = path.stat()
        parts.append(f"{name}:{stat.st_size}:{stat.st_mtime_ns}")
    stable = "|".join(parts).encode("utf-8")
    return hashlib.sha256(stable).hexdigest()[:16]
