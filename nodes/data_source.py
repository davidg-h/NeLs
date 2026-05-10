"""NELS source node that creates data for the executable pipeline."""

from __future__ import annotations

from typing import Any

import torch

from ..core.embedding_ops import create_embedding_set, make_embedding_point
from ..core.projection_ops import project_embedding_set
from ..core.session_contracts import json_dumps
from ..server.session_store import get_store, source_config_hash


def build_sample_source(
    *,
    session_id: str,
    sample_count: int,
    embedding_dim: int,
    seed: int,
    label_prefix: str,
    metadata_mode: str,
    cluster_count: int,
    projection_mode: str,
    edge_mode: str,
    neighbor_count: int,
) -> tuple[dict[str, Any], dict[str, Any]]:
    count = max(1, min(int(sample_count), 1024))
    dim = max(2, min(int(embedding_dim), 8192))
    clusters = max(1, min(int(cluster_count), count))
    prefix = str(label_prefix or "sample").strip() or "sample"
    mode = str(metadata_mode or "clustered")

    centers = _deterministic_centers(clusters=clusters, dim=dim, seed=int(seed))
    points: list[dict[str, Any]] = []
    for index in range(count):
        cluster = index % clusters
        if mode == "clustered":
            tensor = centers[cluster] + _deterministic_offset(
                index=index,
                dim=dim,
                seed=int(seed),
                scale=0.12,
            )
        else:
            tensor = _deterministic_offset(
                index=index,
                dim=dim,
                seed=int(seed),
                scale=1.0,
            )

        point_id = f"{prefix}_{index:04d}"
        metadata: dict[str, Any] = {"source": "sample", "index": index, "seed": int(seed)}
        if mode in ("prompt_like", "clustered"):
            metadata["prompt"] = f"{prefix} prompt {index:04d}"
        if mode == "clustered":
            metadata["cluster"] = cluster
        points.append(
            make_embedding_point(point_id, f"{prefix}-{index:04d}", tensor, metadata)
        )

    embedding_set = create_embedding_set(
        points,
        embedding_type="sample",
        metadata={
            "session_id": str(session_id or "default"),
            "source": "NELS Data Source",
            "sample_count": count,
            "embedding_dim": dim,
            "seed": int(seed),
            "label_prefix": prefix,
            "metadata_mode": mode,
            "cluster_count": clusters,
            "projection_mode": projection_mode,
            "edge_mode": edge_mode,
            "neighbor_count": int(neighbor_count),
        },
    )
    projection = project_embedding_set(
        embedding_set,
        projection_mode=projection_mode,
        seed=int(seed),
        edge_mode=edge_mode,
        neighbor_count=int(neighbor_count),
    )
    config = {
        "sample_count": count,
        "embedding_dim": dim,
        "seed": int(seed),
        "label_prefix": prefix,
        "metadata_mode": mode,
        "cluster_count": clusters,
        "projection_mode": projection_mode,
        "edge_mode": edge_mode,
        "neighbor_count": int(neighbor_count),
    }
    config_hash = source_config_hash(config)
    embedding_set["metadata"]["source_config_hash"] = config_hash
    snapshot = {
        "version": 1,
        "session_id": str(session_id or "default"),
        "state_revision": get_store().get_revision(session_id),
        "source": embedding_set["metadata"],
        "source_config": config,
        "source_config_hash": config_hash,
        "points": projection["points"],
        "edges": projection["edges"],
        "projection_mode": projection["projection_mode"],
        "projection_method": projection["projection_method"],
        "dimensions": projection["dimensions"],
        "warnings": projection.get("warnings", []),
    }
    snapshot = stabilize_snapshot_coordinates(session_id, snapshot)
    return embedding_set, snapshot


def _deterministic_centers(*, clusters: int, dim: int, seed: int) -> torch.Tensor:
    axis = torch.arange(dim, dtype=torch.float32)
    seed_phase = float(int(seed) % 1009) * 0.013
    centers = []
    for cluster in range(clusters):
        phase = seed_phase + float(cluster) * 0.731
        center = torch.sin(axis * 0.173 + phase) + 0.65 * torch.cos(
            axis * 0.071 + phase * 1.7
        )
        norm = torch.linalg.vector_norm(center).clamp_min(1e-6)
        centers.append(center / norm * 3.0)
    return torch.stack(centers).float()


def _deterministic_offset(
    *,
    index: int,
    dim: int,
    seed: int,
    scale: float,
) -> torch.Tensor:
    axis = torch.arange(dim, dtype=torch.float32)
    phase = float(int(seed) % 1291) * 0.019 + float(index) * 0.413
    offset = torch.sin(axis * 0.211 + phase) + 0.5 * torch.cos(
        axis * 0.097 + phase * 1.31
    )
    norm = torch.linalg.vector_norm(offset).clamp_min(1e-6)
    return (offset / norm * float(scale)).float()


def stabilize_snapshot_coordinates(
    session_id: str,
    snapshot: dict[str, Any],
) -> dict[str, Any]:
    """Reuse existing display coordinates when source data did not change."""
    try:
        previous = get_store().get_session(session_id).get("source_snapshot")
    except Exception:
        previous = None
    if not previous:
        return snapshot

    if _coordinate_config(previous) != _coordinate_config(snapshot):
        return snapshot

    previous_points = previous.get("points") or []
    current_points = snapshot.get("points") or []
    if len(previous_points) != len(current_points):
        return snapshot

    previous_by_id = {str(point.get("id")): point for point in previous_points}
    if any(str(point.get("id")) not in previous_by_id for point in current_points):
        return snapshot

    stabilized = dict(snapshot)
    stabilized["points"] = [
        {
            **point,
            "coords": previous_by_id[str(point.get("id"))].get("coords", point.get("coords")),
        }
        for point in current_points
    ]
    return stabilized


def _coordinate_config(snapshot: dict[str, Any]) -> dict[str, Any]:
    source_config = snapshot.get("source_config") or {}
    return {
        key: source_config.get(key)
        for key in (
            "sample_count",
            "embedding_dim",
            "seed",
            "label_prefix",
            "metadata_mode",
            "cluster_count",
            "projection_mode",
        )
    }


class NelsDataSource:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "sample_count": ("INT", {"default": 32, "min": 1, "max": 1024, "step": 1}),
                "embedding_dim": ("INT", {"default": 64, "min": 2, "max": 8192, "step": 1}),
                "seed": ("INT", {"default": 42, "min": 0, "max": 2147483647, "step": 1}),
                "label_prefix": ("STRING", {"default": "sample"}),
                "metadata_mode": (["minimal", "prompt_like", "clustered"],),
                "cluster_count": ("INT", {"default": 4, "min": 1, "max": 64, "step": 1}),
                "projection_mode": (["2d_umap"],),
                "edge_mode": (
                    ["none", "knn_cosine", "knn_euclidean", "threshold_cosine", "fully_connected"],
                ),
                "neighbor_count": ("INT", {"default": 4, "min": 1, "max": 64, "step": 1}),
            },
        }

    RETURN_TYPES = ("NELS_EMBEDDING_SET", "STRING")
    RETURN_NAMES = ("embedding_set", "source_meta_json")
    FUNCTION = "execute"
    CATEGORY = "nels/enhanced"

    def execute(
        self,
        sample_count: int,
        embedding_dim: int,
        seed: int,
        label_prefix: str,
        metadata_mode: str,
        cluster_count: int,
        projection_mode: str,
        edge_mode: str,
        neighbor_count: int,
    ):
        store = get_store()
        config = {
            "sample_count": int(sample_count),
            "embedding_dim": int(embedding_dim),
            "seed": int(seed),
            "label_prefix": str(label_prefix or "sample"),
            "metadata_mode": str(metadata_mode or "clustered"),
            "cluster_count": int(cluster_count),
            "projection_mode": projection_mode,
            "edge_mode": edge_mode,
            "neighbor_count": int(neighbor_count),
        }
        cached = store.get_cached_source(config)
        if cached is None:
            embedding_set, snapshot = build_sample_source(
                session_id="source",
                sample_count=sample_count,
                embedding_dim=embedding_dim,
                seed=seed,
                label_prefix=label_prefix,
                metadata_mode=metadata_mode,
                cluster_count=cluster_count,
                projection_mode=projection_mode,
                edge_mode=edge_mode,
                neighbor_count=neighbor_count,
            )
            store.set_cached_source(config, embedding_set, snapshot)
        else:
            embedding_set, snapshot = cached
        meta = {
            "node": "NELS Data Source",
            "source": embedding_set.get("metadata", {}),
            "source_config": config,
            "source_config_hash": source_config_hash(config),
            "graph_snapshot": snapshot,
        }
        return (
            embedding_set,
            json_dumps(meta),
        )


def preview_sample_source(
    *,
    session_id: str,
    sample_count: int,
    embedding_dim: int,
    seed: int,
    label_prefix: str,
    metadata_mode: str,
    cluster_count: int,
    projection_mode: str,
    edge_mode: str,
    neighbor_count: int,
) -> tuple[dict[str, Any], dict[str, Any]]:
    config = {
        "sample_count": int(sample_count),
        "embedding_dim": int(embedding_dim),
        "seed": int(seed),
        "label_prefix": str(label_prefix or "sample"),
        "metadata_mode": str(metadata_mode or "clustered"),
        "cluster_count": int(cluster_count),
        "projection_mode": projection_mode,
        "edge_mode": edge_mode,
        "neighbor_count": int(neighbor_count),
    }
    store = get_store()
    cached = store.get_cached_source(config)
    if cached is None:
        embedding_set, snapshot = build_sample_source(
            session_id=session_id,
            sample_count=sample_count,
            embedding_dim=embedding_dim,
            seed=seed,
            label_prefix=label_prefix,
            metadata_mode=metadata_mode,
            cluster_count=cluster_count,
            projection_mode=projection_mode,
            edge_mode=edge_mode,
            neighbor_count=neighbor_count,
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


NODE_CLASS_MAPPINGS = {"nels_DataSource": NelsDataSource}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_DataSource": "NELS Data Source"}
