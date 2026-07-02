"""Dataset computation and orchestration for NELS: build, UMAP, finalize, loaders"""

import gc
import json
import random
import re
import shutil
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import faiss
import hdbscan
import joblib
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
    PROJECTION_STRATEGY_CLASSIC,
    PROJECTION_STRATEGY_PARAMETRIC,
    PROJECTION_STRATEGY_TWO_PASS,
    RUNTIME_CLUSTER_K,
    RUNTIME_CLUSTER_NOISE_THRESHOLD,
    RUNTIME_CLUSTER_TEMPERATURE,
    RUNTIME_SUBSET_SIZE,
    UMAP_MIN_DIST,
    UMAP_N_NEIGHBORS,
    UMAP_SEED,
)
from .encoding_ops import encode_prompts_dataset_embeddings
from .operations.cluster_annotation import generate_frequency_labels
from .projection_ops import (
    compute_cluster_umap,
    compute_umap,
    load_projection_strategy,
    load_reducer,
    reducer_backend_for_strategy,
    reducer_path,
    save_reducer,
)


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
    """Load texts from a .txt file or HuggingFace dataset, return (records, source_id)"""
    path = Path(source)

    # ---- local file ----
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

    # ---- HuggingFace ----
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


def build_source_loader_meta(
    *,
    source_input: str,
    hf_config: str | None = None,
    hf_split: str = "train",
    hf_column: str | None = None,
    text_template: str | None = None,
    encode_limit: int = 0,
    dedupe: bool = False,
    min_words: int = 0,
    max_words: int = 0,
) -> dict[str, Any]:
    """Build the source_loader metadata block saved in dataset.json, shared by CLI and node encoders"""
    return {
        "input": source_input,
        "hf_config": hf_config,
        "hf_split": hf_split,
        "hf_column": hf_column,
        "text_template": text_template,
        "encode_limit": encode_limit,
        "dedupe": dedupe,
        "min_words": min_words,
        "max_words": max_words,
    }


def split_comma_list(value: str | None) -> list[str] | None:
    """Split a comma-separated string into a trimmed, non-empty list, or None"""
    if not value:
        return None
    return [c.strip() for c in value.split(",") if c.strip()] or None


def normalize_source_inputs(
    text_template: str,
    metadata_columns: str,
    hf_config: str,
) -> tuple[str | None, list[str] | None, str | None]:
    """Normalize raw text_template/metadata_columns/hf_config UI strings to None-able values"""
    tmpl = text_template.strip() or None
    meta_cols = split_comma_list(metadata_columns)
    cfg = hf_config.strip() or None
    return tmpl, meta_cols, cfg


def build_dataset_config(
    *,
    name: str,
    encoder: str,
    source_id: str,
    projection: dict[str, Any],
    source_loader: dict[str, Any],
    clip_type: str | None = None,
) -> dict[str, Any]:
    """Assemble the dataset config dict shared by node and CLI dataset creation"""
    config: dict[str, Any] = {
        "name": name,
        "encoder": encoder,
        "source_dataset": source_id,
        "projection": projection,
        "source_loader": source_loader,
    }
    if clip_type:
        config["clip_type"] = clip_type
    return config


def build_projection_config(
    *,
    strategy: str,
    canonical_umap_params: dict[str, Any],
    canonical_cluster_params: dict[str, Any],
    runtime_subset_size: int = RUNTIME_SUBSET_SIZE,
    runtime_subset_seed: int = UMAP_SEED,
    runtime_umap_params: dict[str, Any] | None = None,
    runtime_cluster_params: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Assemble projection metadata shared by CLI and node builders"""
    if strategy not in {
        PROJECTION_STRATEGY_CLASSIC,
        PROJECTION_STRATEGY_TWO_PASS,
        PROJECTION_STRATEGY_PARAMETRIC,
    }:
        raise ValueError(f"Unsupported projection strategy: {strategy!r}")

    projection: dict[str, Any] = {
        "strategy": strategy,
        "canonical": {
            "umap_params": dict(canonical_umap_params or {}),
            "cluster_params": dict(canonical_cluster_params or {}),
        },
    }
    if strategy != PROJECTION_STRATEGY_TWO_PASS:
        return projection

    projection["runtime"] = {
        "subset_size": int(runtime_subset_size),
        "subset_seed": int(runtime_subset_seed),
        "umap_params": dict(runtime_umap_params or canonical_umap_params or {}),
        "cluster_params": dict(runtime_cluster_params or canonical_cluster_params or {}),
    }
    return projection


def require_projection_meta(source: dict[str, Any]) -> dict[str, Any]:
    """Return validated projection metadata from config or dataset metadata"""
    projection = source.get("projection")
    if not isinstance(projection, dict):
        raise ValueError("Dataset is missing projection metadata")

    strategy = str(projection.get("strategy") or "").strip()
    if strategy not in {
        PROJECTION_STRATEGY_CLASSIC,
        PROJECTION_STRATEGY_TWO_PASS,
        PROJECTION_STRATEGY_PARAMETRIC,
    }:
        raise ValueError(f"Unsupported projection strategy: {strategy!r}")

    canonical = projection.get("canonical")
    if not isinstance(canonical, dict):
        raise ValueError("Dataset projection is missing canonical settings")

    umap_params = canonical.get("umap_params")
    cluster_params = canonical.get("cluster_params")
    if not isinstance(umap_params, dict) or not isinstance(cluster_params, dict):
        raise ValueError("Dataset projection canonical settings are incomplete")

    if strategy != PROJECTION_STRATEGY_TWO_PASS:
        return projection

    runtime = projection.get("runtime")
    if not isinstance(runtime, dict):
        raise ValueError("Two-pass dataset is missing runtime projection settings")
    if not isinstance(runtime.get("umap_params"), dict) or not isinstance(
        runtime.get("cluster_params"), dict
    ):
        raise ValueError("Two-pass dataset runtime projection settings are incomplete")
    return projection


def build_inline_records(prompt_text: str, text_template: str | None) -> list[dict]:
    """Build record dicts from inline prompt_text lines with no metadata columns"""
    records = []
    for line in prompt_text.splitlines():
        raw = line.strip()
        if not raw:
            continue
        if text_template:
            try:
                final = text_template.format(text=raw)
            except KeyError as e:
                raise ValueError(
                    f"Template placeholder {e} not available for inline prompts. "
                    "Only {text} is supported for the prompt_text box."
                ) from e
        else:
            final = raw
        records.append({"text": final, "raw_text": raw, "template": text_template})
    return records


def make_sample_record(sample_id: str, record: dict, source_id: str) -> dict:
    """Build one sample dict for samples.jsonl from a loaded or inline record"""
    sample: dict = {
        "id": sample_id,
        "text": record["text"],
        "raw_text": record.get("raw_text", record["text"]),
        "source": source_id,
    }
    if record.get("template"):
        sample["template"] = record["template"]
    if record.get("metadata"):
        sample["metadata"] = record["metadata"]
    return sample


def collect_prompt_records(
    *,
    source_input: str | None,
    prompt_text: str = "",
    encode_limit: int = 0,
    hf_column: str = "Prompt",
    hf_split: str = "train",
    hf_config: str | None = None,
    text_template: str | None = None,
    metadata_columns: list[str] | None = None,
    dedupe: bool = False,
    min_words: int = 0,
    max_words: int = 0,
) -> tuple[list[dict], str]:
    """Collect inline and external prompt records into one ordered list"""
    extra_records = build_inline_records(prompt_text, text_template)
    source_limit = max(0, encode_limit - len(extra_records)) if encode_limit > 0 else 0

    if source_input:
        source_records, source_id = load_texts_from_source(
            source_input,
            column=hf_column,
            limit=source_limit,
            hf_split=hf_split,
            hf_config=hf_config,
            text_template=text_template,
            metadata_columns=metadata_columns,
            dedupe=dedupe,
            min_words=min_words,
            max_words=max_words,
        )
    else:
        source_records, source_id = [], "inline"

    records = extra_records + source_records
    if encode_limit > 0:
        records = records[:encode_limit]

    return records, source_id


def encode_prompt_records(
    clip: Any,
    records: list[dict[str, Any]],
    source_id: str,
    *,
    id_offset: int = 0,
) -> tuple[np.ndarray, list[dict[str, Any]], dict[str, Any]]:
    """Encode records and build sample rows with stable pt_<index> ids"""
    prompts = [record["text"] for record in records]
    vectors, embedding_info = encode_prompts_dataset_embeddings(clip, prompts)
    samples = [
        make_sample_record(f"pt_{id_offset + i:06d}", record, source_id)
        for i, record in enumerate(records)
    ]
    return vectors, samples, embedding_info


def create_dataset_from_records(
    clip: Any,
    records: list[dict[str, Any]],
    source_id: str,
    *,
    config: dict[str, Any],
    output_path: str | Path,
) -> tuple[str, np.ndarray]:
    """Encode records, finalize dataset, return saved path plus compact embeddings"""
    vectors, samples, embedding_info = encode_prompt_records(clip, records, source_id)
    saved_path = finalize_dataset(
        vectors,
        samples,
        config,
        output_path,
        embedding_info=embedding_info,
    )
    return saved_path, vectors


def finalize_dataset(
    vectors: np.ndarray,
    samples: list[dict[str, Any]],
    config: dict[str, Any],
    output_path: str | Path,
    *,
    embedding_info: dict[str, Any] | None = None,
) -> str:
    """Build dataset, compute projections and clusters, then save"""
    output_path = Path(output_path)
    dataset = _build_dataset(vectors, samples, config, embedding_info=embedding_info)

    umap_2d, umap_3d, fitted_samples = _fit_and_save_projection_models(
        vectors,
        dataset["samples"],
        output_path,
        projection=dataset["metadata"]["projection"],
    )
    dataset["samples"] = fitted_samples
    dataset["umap_2d"] = umap_2d
    dataset["umap_3d"] = umap_3d

    freq_labels = generate_frequency_labels(dataset["samples"])
    dataset["metadata"]["cluster_labels"] = freq_labels or {}

    print("Saving dataset...")
    return save_dataset(dataset, output_path)


def select_sample_indices(
    total: int,
    count: int,
    mode: str,
    *,
    window_start: int,
    random_seed: int,
) -> list[int]:
    """Select sample indices based on loader mode"""
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
) -> list[dict[str, Any]]:
    """Predict cluster labels for new vectors using the saved runtime strategy"""
    strategy = load_projection_strategy(path)
    if strategy == PROJECTION_STRATEGY_TWO_PASS:
        return _predict_clusters_two_pass(path, new_vectors)

    backend = reducer_backend_for_strategy(strategy)
    cluster_model_path = reducer_path(path, strategy, "cluster")
    hdbscan_path = path / "hdbscan_model.joblib"
    if not cluster_model_path.exists() or not hdbscan_path.exists():
        raise FileNotFoundError(
            f"Dataset is missing runtime cluster models: {cluster_model_path.name}, {hdbscan_path.name}"
        )

    reducer = load_reducer(cluster_model_path, backend=backend)
    clusterer = joblib.load(hdbscan_path)
    cluster_coords = reducer.transform(new_vectors).astype(np.float32)
    labels, strengths = hdbscan.approximate_predict(clusterer, cluster_coords)
    return [
        {
            "cluster_global": int(lbl),
            "is_noise": lbl == -1,
            "membership_strength": float(s),
        }
        for lbl, s in zip(labels.tolist(), strengths.tolist(), strict=True)
    ]


def append_to_dataset(
    path: Path,
    ds: dict[str, Any],
    new_vectors: np.ndarray,
    new_samples: list[dict[str, Any]],
    embedding_info: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Merge new vectors/samples into a loaded dataset, fully refit cluster/viz UMAP +
    HDBSCAN on the merged data and save -> add is a ground-truth operation like create

    Raises ValueError on embedding-dimension mismatch
    Returns the updated metadata dict
    """
    existing_vectors: np.ndarray = ds["compact_embeddings"]
    existing_samples: list[dict] = ds["samples"]
    meta: dict = ds["metadata"]

    if existing_vectors.shape[1] != new_vectors.shape[1]:
        raise ValueError(
            f"Dimension mismatch: dataset has dim {existing_vectors.shape[1]}, "
            f"new vectors have dim {new_vectors.shape[1]}. "
            "Make sure you use the same encoder model as the original dataset."
        )

    merged_vectors = np.concatenate([existing_vectors, new_vectors], axis=0)
    merged_samples = existing_samples + new_samples
    projection = require_projection_meta(meta)

    # Release mmap'd arrays before overwriting the same files on Windows
    del existing_vectors
    ds.clear()
    gc.collect()

    umap_2d, umap_3d, merged_samples = _fit_and_save_projection_models(
        merged_vectors,
        merged_samples,
        path,
        projection=projection,
    )

    freq_labels = generate_frequency_labels(merged_samples)
    updated_meta = {
        **meta,
        "sample_count": len(merged_samples),
        "cluster_labels": freq_labels or {},
        "projection": projection,
    }
    if embedding_info:
        updated_meta["full_dim"] = embedding_info.get("full_embedding_shape", [])
        updated_meta["embedding_shape"] = [int(merged_vectors.shape[1])]
        updated_meta["embedding_strategy"] = embedding_info.get("embedding_strategy", "unknown")
    save_dataset(
        {
            "metadata": updated_meta,
            "samples": merged_samples,
            "compact_embeddings": merged_vectors,
            "umap_2d": umap_2d,
            "umap_3d": umap_3d,
        },
        path,
    )
    return updated_meta


def append_records_to_dataset(
    path: Path,
    ds: dict[str, Any],
    clip: Any,
    records: list[dict[str, Any]],
    source_id: str,
) -> tuple[dict[str, Any], np.ndarray]:
    """Encode records, append them to dataset, return metadata plus new vectors"""
    offset = len(ds["samples"])
    new_vectors, new_samples, embedding_info = encode_prompt_records(
        clip,
        records,
        source_id,
        id_offset=offset,
    )
    updated_meta = append_to_dataset(
        path, ds, new_vectors, new_samples, embedding_info=embedding_info
    )
    return updated_meta, new_vectors


# ---- internals ----


def _build_dataset(
    vectors: np.ndarray,
    samples: list[dict[str, Any]],
    config: dict[str, Any],
    *,
    embedding_info: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Build the internal dataset dict shape used by save_dataset"""
    vectors = np.asarray(vectors, dtype=np.float32)
    n, d = vectors.shape
    if len(samples) != n:
        raise ValueError(f"vectors has {n} rows but samples has {len(samples)} entries")

    metadata: dict[str, Any] = {
        "name": str(config.get("name") or "dataset"),
        "sample_count": n,
        "encoder": str(config.get("encoder") or "unknown"),
        "source_dataset": str(config.get("source_dataset") or ""),
        "created": datetime.now(UTC).isoformat(),
        "source_loader": dict(config.get("source_loader") or {}),
        "full_dim": (embedding_info or {}).get("full_embedding_shape", []),
        "embedding_shape": [d],
        "projection": require_projection_meta(config),
        "embedding_strategy": (embedding_info or {}).get("embedding_strategy", "unknown"),
        "clip_type": str(config.get("clip_type") or ""),
        "cluster_labels": {},
    }

    return {
        "metadata": metadata,
        "samples": [dict(s) for s in samples],
        "compact_embeddings": vectors,
        "umap_2d": None,
        "umap_3d": None,
    }


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
    """Deduplicate and word-count filter records"""
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
    """Fit HDBSCAN on cluster-space UMAP coords"""
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


def _fit_and_save_projection_models(
    vectors: np.ndarray,
    samples: list[dict[str, Any]],
    output_path: Path,
    *,
    projection: dict[str, Any],
) -> tuple[np.ndarray, np.ndarray, list[dict[str, Any]]]:
    """Fit cluster/viz UMAP models, cluster with HDBSCAN, persist all artifacts"""
    samples = [dict(s) for s in samples]
    projection = require_projection_meta({"projection": projection})
    strategy = projection["strategy"]
    canonical = projection["canonical"]
    canonical_umap_params = canonical["umap_params"]
    canonical_cluster_params = canonical["cluster_params"]
    random_state = int(canonical_umap_params.get("random_state", UMAP_SEED))
    sample_count = int(vectors.shape[0])
    min_cluster_size = int(canonical_cluster_params.get("min_size", CLUSTER_MIN_SIZE))
    min_required_samples = max(4, min_cluster_size)
    if sample_count < min_required_samples:
        raise ValueError(
            "Dataset needs at least "
            f"{min_required_samples} samples for the current HDBSCAN min_cluster_size setting, "
            f"got {sample_count}"
        )

    _clear_projection_artifacts(output_path)
    canonical_backend = reducer_backend_for_strategy(
        PROJECTION_STRATEGY_PARAMETRIC
        if strategy == PROJECTION_STRATEGY_PARAMETRIC
        else PROJECTION_STRATEGY_CLASSIC
    )

    n_dims = int(canonical_cluster_params.get("umap_dims", CLUSTER_UMAP_DIMS))
    print(f"Computing canonical cluster UMAP ({n_dims}D) + HDBSCAN...")
    umap_cluster, r_cluster = compute_cluster_umap(
        vectors,
        n_components=n_dims,
        n_neighbors=int(canonical_cluster_params.get("umap_neighbors", CLUSTER_UMAP_NEIGHBORS)),
        random_state=random_state,
        backend=canonical_backend,
    )
    hdbscan_model, cluster_results = _fit_and_cluster(
        umap_cluster,
        min_cluster_size=min_cluster_size,
        min_samples=int(canonical_cluster_params.get("min_samples", CLUSTER_MIN_SAMPLES)),
    )
    for sample, result in zip(samples, cluster_results, strict=True):
        sample["cluster_global"] = result["cluster_global"]
        sample["is_noise"] = result["is_noise"]
        sample["membership_strength"] = result["membership_strength"]

    print("Computing canonical UMAP 2D + 3D projections...")
    umap_2d, umap_3d, r2d, r3d = compute_umap(
        vectors,
        n_neighbors=int(canonical_umap_params.get("n_neighbors", UMAP_N_NEIGHBORS)),
        min_dist=float(canonical_umap_params.get("min_dist", UMAP_MIN_DIST)),
        random_state=random_state,
        backend=canonical_backend,
    )

    if strategy == PROJECTION_STRATEGY_TWO_PASS:
        _save_two_pass_runtime_models(
            output_path,
            vectors,
            samples,
            projection["runtime"],
        )
        return umap_2d, umap_3d, samples

    print("Saving projection models...")
    save_reducer(
        r_cluster,
        output_path
        / (
            "umap_model_cluster"
            if strategy == PROJECTION_STRATEGY_PARAMETRIC
            else "umap_model_cluster.joblib"
        ),
        backend=canonical_backend,
    )
    save_reducer(
        r2d,
        output_path
        / (
            "umap_model_2d"
            if strategy == PROJECTION_STRATEGY_PARAMETRIC
            else "umap_model_2d.joblib"
        ),
        backend=canonical_backend,
    )
    save_reducer(
        r3d,
        output_path
        / (
            "umap_model_3d"
            if strategy == PROJECTION_STRATEGY_PARAMETRIC
            else "umap_model_3d.joblib"
        ),
        backend=canonical_backend,
    )
    joblib.dump(hdbscan_model, output_path / "hdbscan_model.joblib")

    return umap_2d, umap_3d, samples


def _save_two_pass_runtime_models(
    output_path: Path,
    vectors: np.ndarray,
    samples: list[dict[str, Any]],
    runtime: dict[str, Any],
) -> None:
    """Fit and save two-pass runtime reducers plus subset manifest"""
    subset_indices = _select_runtime_subset_indices(
        samples,
        subset_size=int(runtime.get("subset_size", RUNTIME_SUBSET_SIZE)),
        random_seed=int(runtime.get("subset_seed", UMAP_SEED)),
    )
    if len(subset_indices) < 2:
        raise ValueError("Two-pass runtime subset needs at least 2 samples")

    runtime_vectors = np.asarray(vectors[subset_indices], dtype=np.float32)
    runtime_umap_params = runtime.get("umap_params") or {}
    runtime_cluster_params = runtime.get("cluster_params") or {}
    runtime_seed = int(runtime_umap_params.get("random_state", UMAP_SEED))

    runtime_cluster_dims = int(runtime_cluster_params.get("umap_dims", CLUSTER_UMAP_DIMS))
    print(f"Computing two-pass runtime cluster UMAP ({runtime_cluster_dims}D)...")
    _, runtime_cluster_model = compute_cluster_umap(
        runtime_vectors,
        n_components=runtime_cluster_dims,
        n_neighbors=int(runtime_cluster_params.get("umap_neighbors", CLUSTER_UMAP_NEIGHBORS)),
        random_state=runtime_seed,
        backend=PROJECTION_STRATEGY_CLASSIC,
    )

    print("Computing two-pass runtime UMAP 2D + 3D projections...")
    _, _, runtime_2d_model, runtime_3d_model = compute_umap(
        runtime_vectors,
        n_neighbors=int(runtime_umap_params.get("n_neighbors", UMAP_N_NEIGHBORS)),
        min_dist=float(runtime_umap_params.get("min_dist", UMAP_MIN_DIST)),
        random_state=runtime_seed,
        backend=PROJECTION_STRATEGY_CLASSIC,
    )

    print("Saving two-pass runtime projection models...")
    save_reducer(
        runtime_cluster_model,
        output_path / "runtime_umap_model_cluster.joblib",
        backend=PROJECTION_STRATEGY_CLASSIC,
    )
    save_reducer(
        runtime_2d_model,
        output_path / "runtime_umap_model_2d.joblib",
        backend=PROJECTION_STRATEGY_CLASSIC,
    )
    save_reducer(
        runtime_3d_model,
        output_path / "runtime_umap_model_3d.joblib",
        backend=PROJECTION_STRATEGY_CLASSIC,
    )
    _save_used_subset(output_path / "used_subset.jsonl", samples, subset_indices)


def _select_runtime_subset_indices(
    samples: list[dict[str, Any]],
    *,
    subset_size: int,
    random_seed: int,
) -> list[int]:
    """Select one deterministic runtime subset from canonical clusters"""
    subset_size = max(0, int(subset_size))
    if subset_size <= 0:
        return []

    eligible_clusters: dict[int, list[int]] = {}
    noise_indices: list[int] = []
    for index, sample in enumerate(samples):
        cluster_id = int(sample.get("cluster_global", -1))
        if cluster_id == -1 or sample.get("is_noise", False):
            noise_indices.append(index)
            continue
        eligible_clusters.setdefault(cluster_id, []).append(index)

    if not eligible_clusters:
        return noise_indices[:subset_size]

    sorted_clusters = sorted(eligible_clusters)
    total_cluster_points = sum(len(eligible_clusters[cluster_id]) for cluster_id in sorted_clusters)
    base_allocations: dict[int, int] = {}
    remainders: list[tuple[float, int]] = []
    remaining = subset_size
    cluster_floor = 1 if subset_size >= len(sorted_clusters) else 0

    for cluster_id in sorted_clusters:
        cluster_size = len(eligible_clusters[cluster_id])
        proportional = subset_size * (cluster_size / total_cluster_points)
        allocation = min(cluster_size, max(cluster_floor, int(proportional)))
        base_allocations[cluster_id] = allocation
        remainders.append((proportional - int(proportional), cluster_id))
        remaining -= allocation

    if remaining < 0:
        for _remainder, cluster_id in sorted(remainders):
            if remaining >= 0:
                break
            if base_allocations[cluster_id] <= 0:
                continue
            base_allocations[cluster_id] -= 1
            remaining += 1

    if remaining > 0:
        for _remainder, cluster_id in sorted(remainders, reverse=True):
            if remaining <= 0:
                break
            cluster_size = len(eligible_clusters[cluster_id])
            if base_allocations[cluster_id] >= cluster_size:
                continue
            base_allocations[cluster_id] += 1
            remaining -= 1

    if remaining > 0 and noise_indices:
        noise_take = min(len(noise_indices), remaining)
        noise_indices = _sample_indices_by_strength(samples, noise_indices, noise_take)
        remaining -= len(noise_indices)
    else:
        noise_indices = []

    chosen: list[int] = []
    for cluster_id in sorted_clusters:
        cluster_indices = eligible_clusters[cluster_id]
        allocation = min(base_allocations[cluster_id], len(cluster_indices))
        chosen.extend(_sample_indices_by_strength(samples, cluster_indices, allocation))

    if remaining > 0:
        extra_indices = [
            index
            for cluster_id in sorted_clusters
            for index in eligible_clusters[cluster_id]
            if index not in chosen
        ]
        rng = random.Random(int(random_seed))
        rng.shuffle(extra_indices)
        chosen.extend(extra_indices[:remaining])

    chosen.extend(noise_indices)
    return sorted(chosen[:subset_size])


def _sample_indices_by_strength(
    samples: list[dict[str, Any]],
    indices: list[int],
    count: int,
) -> list[int]:
    """Sample evenly across cluster members ordered by membership strength"""
    if count <= 0:
        return []
    if count >= len(indices):
        return sorted(indices)

    ordered = sorted(
        indices,
        key=lambda index: float(samples[index].get("membership_strength") or 0.0),
        reverse=True,
    )
    if count == 1:
        return [ordered[0]]

    positions = np.linspace(0, len(ordered) - 1, num=count)
    chosen: list[int] = []
    seen: set[int] = set()
    for position in positions:
        index = ordered[int(round(float(position)))]
        if index in seen:
            continue
        seen.add(index)
        chosen.append(index)

    for index in ordered:
        if len(chosen) >= count:
            break
        if index in seen:
            continue
        seen.add(index)
        chosen.append(index)

    return sorted(chosen)


def _save_used_subset(path: Path, samples: list[dict[str, Any]], indices: list[int]) -> None:
    """Write used subset rows as inspectable JSONL"""
    rows = []
    for index in indices:
        sample = samples[index]
        rows.append(
            json.dumps(
                {
                    "index": int(index),
                    "id": sample.get("id"),
                    "text": sample.get("text"),
                    "cluster_global": sample.get("cluster_global"),
                    "is_noise": sample.get("is_noise", False),
                    "membership_strength": sample.get("membership_strength", 0.0),
                },
                ensure_ascii=False,
            )
        )
    path.write_text("\n".join(rows) + ("\n" if rows else ""), encoding="utf-8")


def _clear_projection_artifacts(output_path: Path) -> None:
    """Remove old projection artifacts before saving a rebuilt dataset"""
    targets = [
        output_path / "hdbscan_model.joblib",
        output_path / "umap_model_cluster.joblib",
        output_path / "umap_model_2d.joblib",
        output_path / "umap_model_3d.joblib",
        output_path / "runtime_umap_model_cluster.joblib",
        output_path / "runtime_umap_model_2d.joblib",
        output_path / "runtime_umap_model_3d.joblib",
        output_path / "used_subset.jsonl",
        output_path / "umap_model_cluster",
        output_path / "umap_model_2d",
        output_path / "umap_model_3d",
    ]
    for target in targets:
        if not target.exists():
            continue
        if target.is_dir():
            shutil.rmtree(target)
            continue
        target.unlink()


def _predict_clusters_two_pass(
    path: Path,
    new_vectors: np.ndarray,
) -> list[dict[str, Any]]:
    """Predict clusters for two-pass datasets using canonical labels and kNN vote"""
    embeddings_path = path / "compact_embeddings.npy"
    samples_path = path / "samples.jsonl"
    if not embeddings_path.exists() or not samples_path.exists():
        raise FileNotFoundError(
            f"Dataset is missing runtime cluster inputs: {embeddings_path.name}, {samples_path.name}"
        )

    labels, noise_flags = _load_canonical_cluster_labels(samples_path)
    index = _get_or_build_cluster_index(path, embeddings_path)
    normalized_queries = np.asarray(new_vectors, dtype=np.float32).copy()
    faiss.normalize_L2(normalized_queries)
    scores, indices = index.search(normalized_queries, min(RUNTIME_CLUSTER_K, len(labels)))

    results: list[dict[str, Any]] = []
    for query_scores, query_indices in zip(scores, indices, strict=True):
        results.append(_vote_clusters(query_scores, query_indices, labels, noise_flags))
    return results


def _load_canonical_cluster_labels(samples_path: Path) -> tuple[np.ndarray, np.ndarray]:
    """Load canonical cluster labels and noise flags from samples.jsonl"""
    labels: list[int] = []
    noise_flags: list[bool] = []
    for line in samples_path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        sample = json.loads(line)
        labels.append(int(sample.get("cluster_global", -1)))
        noise_flags.append(bool(sample.get("is_noise", False)))
    return np.asarray(labels, dtype=np.int32), np.asarray(noise_flags, dtype=bool)


_CLUSTER_INDEX_CACHE: dict[str, tuple[str, Any]] = {}


def _get_or_build_cluster_index(dataset_path: Path, embeddings_path: Path) -> Any:
    """Build and cache a FAISS cosine index for one dataset"""
    cache_key = str(dataset_path.resolve())
    cache_version = _cluster_index_version(embeddings_path)
    cached = _CLUSTER_INDEX_CACHE.get(cache_key)
    if cached is not None and cached[0] == cache_version:
        return cached[1]

    embeddings = np.load(str(embeddings_path), mmap_mode="r")
    matrix = np.ascontiguousarray(np.asarray(embeddings, dtype=np.float32))
    index = _build_faiss_index(matrix)
    _CLUSTER_INDEX_CACHE[cache_key] = (cache_version, index)
    return index


def _cluster_index_version(embeddings_path: Path) -> str:
    """Stable cache version for one embeddings file"""
    stat = embeddings_path.stat()
    return f"{stat.st_size}:{stat.st_mtime_ns}"


def _build_faiss_index(matrix: np.ndarray) -> Any:
    """Build one FAISS cosine index for the full compact embedding matrix"""
    import faiss

    if matrix.ndim != 2:
        raise ValueError("compact_embeddings.npy must be a 2D matrix")

    normalized = np.ascontiguousarray(matrix.copy())
    faiss.normalize_L2(normalized)
    dim = normalized.shape[1]
    n = normalized.shape[0]

    if n > 200_000:
        nlist = 128
        quantizer = faiss.IndexFlatIP(dim)
        index = faiss.IndexIVFFlat(quantizer, dim, nlist, faiss.METRIC_INNER_PRODUCT)
        index.train(normalized)
        index.nprobe = min(16, nlist)
    else:
        index = faiss.IndexFlatIP(dim)

    index.add(normalized)
    return index


def _vote_clusters(
    scores: np.ndarray,
    indices: np.ndarray,
    labels: np.ndarray,
    noise_flags: np.ndarray,
) -> dict[str, Any]:
    """Convert top-k similarities into one cluster vote"""
    valid_mask = indices >= 0
    if not np.any(valid_mask):
        return {"cluster_global": -1, "is_noise": True, "membership_strength": 0.0}

    valid_scores = scores[valid_mask].astype(np.float32)
    valid_indices = indices[valid_mask].astype(np.int64)
    scaled = valid_scores * float(RUNTIME_CLUSTER_TEMPERATURE)
    scaled -= scaled.max()
    weights = np.exp(scaled)
    total = float(weights.sum()) or 1.0
    normalized = weights / total

    vote_weights: dict[int, float] = {}
    vote_noise: dict[int, bool] = {}
    for weight, neighbor_index in zip(normalized.tolist(), valid_indices.tolist(), strict=True):
        cluster_id = int(labels[neighbor_index])
        vote_weights[cluster_id] = vote_weights.get(cluster_id, 0.0) + float(weight)
        vote_noise[cluster_id] = bool(noise_flags[neighbor_index])

    winner_cluster, winner_weight = max(vote_weights.items(), key=lambda item: item[1])
    is_noise = (
        vote_noise.get(winner_cluster, False) or winner_weight < RUNTIME_CLUSTER_NOISE_THRESHOLD
    )
    return {
        "cluster_global": int(winner_cluster),
        "is_noise": bool(is_noise),
        "membership_strength": float(winner_weight),
    }
