"""Dataset computation and orchestration for NELS: build, UMAP, finalize, loaders"""

from __future__ import annotations

import random
import re
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import numpy as np

try:
    from datasets import load_dataset as hf_load
except ImportError:
    hf_load = None

from .dataset_io import save_dataset
from .defaults import (
    CLUSTER_MIN_SAMPLES,
    CLUSTER_MIN_SIZE,
    CLUSTER_UMAP_DIMS,
    CLUSTER_UMAP_NEIGHBORS,
    UMAP_METRIC,
    UMAP_MIN_DIST,
    UMAP_N_NEIGHBORS,
    UMAP_SEED,
)
from .projection_ops import (
    compute_cluster_umap,
    compute_umap,
)


# text/prompt loading
def load_texts_from_source(
    source: str,
    column: str = "Prompt",
    limit: int = 0,
    hf_split: str = "train",
    hf_config: str | None = None,
    text_template: str | None = None,
    metadata_columns: list[str] | None = None,
    dedupe: bool = False,
    min_words: int = 0,
    max_words: int = 0,
) -> tuple[list[dict], str]:
    """Load texts from a .txt file or HuggingFace dataset — returns (records, source_id)"""
    path = Path(source)

    # --- local file ---
    if path.exists() and path.is_file():
        lines = path.read_text(encoding="utf-8").splitlines()
        raw_texts = [line.strip() for line in lines if line.strip()]
        if limit > 0:
            raw_texts = raw_texts[:limit]
        records = _build_records(raw_texts, text_template, None, None)
        records = _clean_records(records, dedupe, min_words, max_words)
        return records, str(path)

    if path.suffix.lower() in {".txt", ".csv", ".jsonl"} and not path.exists():
        raise FileNotFoundError(
            f"File not found: {path}. "
            "If this is a HuggingFace dataset ID, it should not have a file extension."
        )

    # --- HuggingFace ---
    if hf_load is None:
        raise ImportError(
            "The 'datasets' package is required to load HuggingFace datasets. "
            "Install it with: pip install datasets"
        )

    load_kwargs: dict[str, Any] = {
        "split": hf_split,
        "streaming": True,
        "trust_remote_code": False,
    }
    if hf_config:
        load_kwargs["name"] = hf_config

    ds = hf_load(source, **load_kwargs)

    if column not in ds.column_names:
        raise ValueError(
            f"Column {column!r} not found in dataset.\nAvailable columns: {ds.column_names}"
        )
    if metadata_columns:
        missing = [c for c in metadata_columns if c not in ds.column_names]
        if missing:
            raise ValueError(
                f"Metadata columns not found: {missing}\nAvailable columns: {ds.column_names}"
            )

    needed: set[str] = {column}
    if text_template:
        extra = set(re.findall(r"\{(\w+)\}", text_template)) - {"text"}
        missing_tmpl = [c for c in extra if c not in ds.column_names]
        if missing_tmpl:
            raise ValueError(
                f"Template column(s) not found: {missing_tmpl}\n"
                f"Available columns: {ds.column_names}"
            )
        needed |= extra
    if metadata_columns:
        needed |= set(metadata_columns)
    ds = ds.select_columns(list(needed))

    if limit > 0:
        ds = ds.take(limit)

    raw_texts: list[str] = []
    row_dicts: list[dict] | None = [] if (text_template or metadata_columns) else None
    for row in ds:
        raw_texts.append(str(row[column]).strip())
        if row_dicts is not None:
            row_dicts.append(dict(row))

    records = _build_records(raw_texts, text_template, row_dicts, metadata_columns)
    records = _clean_records(records, dedupe, min_words, max_words)

    source_id = f"{source}/{hf_config}" if hf_config else source
    return records, source_id


# Dataset construction
def build_dataset(
    vectors: np.ndarray,
    samples: list[dict[str, Any]],
    config: dict[str, Any],
) -> dict[str, Any]:
    vectors = np.asarray(vectors, dtype=np.float32)
    n, d = vectors.shape
    if len(samples) != n:
        raise ValueError(f"vectors has {n} rows but samples has {len(samples)} entries")

    encoding_params: dict[str, Any] = {}
    if config.get("type") == "prompt_embedding":
        encoding_params = {
            "text_pooling": config.get("text_pooling", "pooler"),
            "batch_size": config.get("batch_size"),
            "hf_split": config.get("hf_split", "train"),
        }
        top_level_pooling = config.get("text_pooling", "pooler")
    else:
        top_level_pooling = config.get("pooling", "none")

    encoding_params = {k: v for k, v in encoding_params.items() if v is not None}

    metadata: dict[str, Any] = {
        "name": str(config.get("name") or "dataset"),
        "type": str(config.get("type") or "prompt_embedding"),
        "sample_count": n,
        "full_dim": d,
        "pooled_dim": d,
        "encoder": str(config.get("encoder") or "unknown"),
        "pooling": str(top_level_pooling),
        "source_dataset": str(config.get("source_dataset") or ""),
        "created": datetime.now(UTC).isoformat(),
        "encoding_params": encoding_params,
        "umap_params": config.get("umap_params") or {},
    }
    if config.get("cli_encoder"):
        metadata["cli_encoder"] = config["cli_encoder"]
    if config.get("source_loader"):
        metadata["source_loader"] = config["source_loader"]

    return {
        "metadata": metadata,
        "samples": [dict(s) for s in samples],
        "pooled": vectors,
        "umap_2d": None,
        "umap_3d": None,
    }


# Dataset creation
def finalize_dataset(
    vectors: np.ndarray,
    samples: list[dict[str, Any]],
    config: dict[str, Any],
    output_path: str | Path,
    *,
    umap_params: dict[str, Any] | None = None,
    cluster_params: dict[str, Any] | None = None,
) -> str:
    """Build, compute cluster UMAP + HDBSCAN + viz UMAP, and save — returns saved path"""
    output_path = Path(output_path)
    dataset = build_dataset(vectors, samples, config)

    up = umap_params or {}
    cp = cluster_params or {}
    random_state = int(up.get("random_state", UMAP_SEED))
    r2d = r3d = r_cluster = hdbscan_model = None

    try:
        n_dims = int(cp.get("umap_dims", CLUSTER_UMAP_DIMS))
        print(f"Computing cluster UMAP ({n_dims}D) + HDBSCAN...")
        cluster_coords, r_cluster = compute_cluster_umap(
            vectors,
            n_components=n_dims,
            n_neighbors=int(cp.get("umap_neighbors", CLUSTER_UMAP_NEIGHBORS)),
            random_state=random_state,
        )
        dataset["umap_cluster"] = cluster_coords
        hdbscan_model, cluster_results = _fit_and_cluster(
            cluster_coords,
            min_cluster_size=int(cp.get("min_size", CLUSTER_MIN_SIZE)),
            min_samples=int(cp.get("min_samples", CLUSTER_MIN_SAMPLES)),
        )
        for sample, result in zip(dataset["samples"], cluster_results, strict=False):
            sample["cluster_global"] = result["cluster_global"]
            sample["is_noise"] = result["is_noise"]
            sample["membership_strength"] = result["membership_strength"]

        print("Computing UMAP 2D + 3D projections...")
        umap_2d, umap_3d, r2d, r3d = compute_umap(
            vectors,
            n_neighbors=int(up.get("n_neighbors", UMAP_N_NEIGHBORS)),
            min_dist=float(up.get("min_dist", UMAP_MIN_DIST)),
            metric=str(up.get("metric", UMAP_METRIC)),
            random_state=random_state,
        )
        dataset["umap_2d"] = umap_2d
        dataset["umap_3d"] = umap_3d
    except ImportError:
        print("  Skipped: umap-learn not installed.")

    print("Saving dataset...")
    path = save_dataset(dataset, output_path)

    # optionally save fitted models for reuse
    try:
        import joblib

        if r_cluster is not None:
            joblib.dump(r_cluster, output_path / "umap_model_cluster.pkl")
        if hdbscan_model is not None:
            joblib.dump(hdbscan_model, output_path / "hdbscan_model.pkl")
        if r2d is not None:
            joblib.dump(r2d, output_path / "umap_model_2d.pkl")
            joblib.dump(r3d, output_path / "umap_model_3d.pkl")
    except ImportError:
        pass

    return path


def select_sample_indices(  # Index selection of dataset samples
    total: int,
    count: int,
    mode: str,
    *,
    window_start: int,
    random_seed: int,
) -> list[int]:
    if mode == "all":
        return list(range(total))
    if count <= 0:
        return []

    n = min(int(count), total)

    if mode == "first_n":
        return list(range(n))

    if mode == "window":
        start = max(0, min(int(window_start), total - 1))
        return list(range(start, min(start + n, total)))

    if mode == "random_n":
        rng = random.Random(int(random_seed))
        indices = list(range(total))
        rng.shuffle(indices)
        return sorted(indices[:n])

    raise ValueError(f"Unknown load_mode: {mode!r}. Expected first_n, random_n, window, or all.")


def predict_cluster_for_new(
    path: Path,
    new_vectors: np.ndarray,
) -> tuple[list[dict[str, Any]], str | None]:
    """Predict cluster labels for new vectors using saved UMAP + HDBSCAN models

    Falls back to noise labels if models are missing or hdbscan is unavailable
    """
    noise = [
        {"cluster_global": -1, "is_noise": True, "membership_strength": 0.0}
        for _ in range(len(new_vectors))
    ]

    try:
        import joblib
    except ImportError:
        return (
            noise,
            "Cluster prediction fallback: 'joblib' is not installed, so new samples were marked as noise.",
        )

    umap_pkl = Path(path) / "umap_model_cluster.pkl"
    hdbscan_pkl = Path(path) / "hdbscan_model.pkl"
    if not umap_pkl.exists() or not hdbscan_pkl.exists():
        return (
            noise,
            "Cluster prediction fallback: saved cluster models are missing, so new samples were marked as noise.",
        )

    try:
        import hdbscan

        r_cluster = joblib.load(umap_pkl)
        clusterer = joblib.load(hdbscan_pkl)
        cluster_coords = r_cluster.transform(new_vectors).astype(np.float32)
        labels, strengths = hdbscan.approximate_predict(clusterer, cluster_coords)
        return [
            {
                "cluster_global": int(lbl),
                "is_noise": lbl == -1,
                "membership_strength": float(s),
            }
            for lbl, s in zip(labels.tolist(), strengths.tolist(), strict=True)
        ], None
    except Exception as exc:
        return (
            noise,
            f"Cluster prediction fallback: saved cluster models could not be used ({exc}); new samples were marked as noise.",
        )


def _build_records(
    raw_texts: list[str],
    text_template: str | None,
    rows: list[dict] | None,
    metadata_columns: list[str] | None,
) -> list[dict]:
    """Apply text templating and build record dicts with optional metadata"""
    records = []
    for i, raw in enumerate(raw_texts):
        if not raw:
            continue
        if text_template:
            row = rows[i] if rows else {}
            try:
                final = text_template.format(text=raw, **row)
            except KeyError as e:
                available = list(row.keys()) if row else []
                raise ValueError(
                    f"Template placeholder {e} not found in dataset row.\n"
                    f"Available columns: {available}"
                ) from e
        else:
            final = raw

        record: dict = {"text": final, "raw_text": raw, "template": text_template}
        if metadata_columns and rows:
            record["metadata"] = {c: rows[i].get(c) for c in metadata_columns}
        records.append(record)
    return records


def _clean_records(
    records: list[dict],
    dedupe: bool,
    min_words: int,
    max_words: int,
) -> list[dict]:
    """Deduplicate and word-count-filter records"""
    seen: set[str] = set()
    out = []
    for r in records:
        t = r["text"]
        if min_words > 0 and len(t.split()) < min_words:
            continue
        if max_words > 0 and len(t.split()) > max_words:
            continue
        if dedupe:
            if t in seen:
                continue
            seen.add(t)
        out.append(r)
    return out


def _fit_and_cluster(
    coords_nd: np.ndarray,
    min_cluster_size: int,
    min_samples: int,
) -> tuple[Any, list[dict[str, Any]]]:
    """Fit HDBSCAN on nD cluster UMAP coords — returns (clusterer | None, list of result dicts)

    Tries standalone hdbscan (prediction_data=True), then sklearn HDBSCAN, then KMeans
    Result dicts: cluster_global, is_noise, membership_strength
    """
    n = coords_nd.shape[0]
    if n < 4:
        return None, [
            {"cluster_global": i, "is_noise": False, "membership_strength": 1.0} for i in range(n)
        ]

    # Standalone hdbscan: supports prediction_data for approximate_predict on new points
    try:
        import hdbscan

        clusterer = hdbscan.HDBSCAN(
            min_cluster_size=min_cluster_size,
            min_samples=min_samples,
            prediction_data=True,
        ).fit(coords_nd)
        labels = clusterer.labels_.tolist()
        strengths = clusterer.probabilities_.tolist()
        return clusterer, [
            {
                "cluster_global": int(lbl),
                "is_noise": lbl == -1,
                "membership_strength": float(s),
            }
            for lbl, s in zip(labels, strengths, strict=True)
        ]
    except ImportError:
        pass

    # sklearn HDBSCAN: no prediction_data, but still returns probabilities
    try:
        from sklearn.cluster import HDBSCAN

        clusterer = HDBSCAN(
            min_cluster_size=min_cluster_size,
            min_samples=min_samples,
        ).fit(coords_nd)
        labels = clusterer.labels_.tolist()
        strengths = (
            clusterer.probabilities_.tolist() if hasattr(clusterer, "probabilities_") else [1.0] * n
        )
        return None, [
            {
                "cluster_global": int(lbl),
                "is_noise": lbl == -1,
                "membership_strength": float(s),
            }
            for lbl, s in zip(labels, strengths, strict=True)
        ]
    except (ImportError, AttributeError):
        pass

    # KMeans fallback: no noise concept, strength always 1.0
    from sklearn.cluster import KMeans

    k = max(2, min(12, round((n / 2) ** 0.5)))
    labels = KMeans(n_clusters=k, random_state=42, n_init=10).fit_predict(coords_nd).tolist()
    return None, [
        {"cluster_global": int(lbl), "is_noise": False, "membership_strength": 1.0}
        for lbl in labels
    ]
