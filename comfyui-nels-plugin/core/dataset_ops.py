"""Dataset computation and orchestration for NELS: build, UMAP, finalize, loaders"""

import gc
import random
import re
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

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
    UMAP_MIN_DIST,
    UMAP_N_NEIGHBORS,
    UMAP_SEED,
)
from .encoding_ops import encode_prompts_dataset_embeddings
from .operations.cluster_annotation import generate_frequency_labels
from .projection_ops import (
    compute_cluster_umap,
    compute_umap,
    load_parametric_umap,
    save_parametric_umap,
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
    umap_params: dict[str, Any],
    source_loader: dict[str, Any],
    clip_type: str | None = None,
) -> dict[str, Any]:
    """Assemble the dataset config dict shared by node and CLI dataset creation"""
    config: dict[str, Any] = {
        "name": name,
        "encoder": encoder,
        "source_dataset": source_id,
        "umap_params": umap_params,
        "source_loader": source_loader,
    }
    if clip_type:
        config["clip_type"] = clip_type
    return config


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
    input_source: str = "file",
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

    if input_source == "huggingface" and source_input:
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
    elif source_input:
        source_records, source_id = load_texts_from_source(
            source_input,
            limit=source_limit,
            text_template=text_template,
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
    umap_params: dict[str, Any] | None = None,
    cluster_params: dict[str, Any] | None = None,
) -> tuple[str, np.ndarray]:
    """Encode records, finalize dataset, return saved path plus vectors"""
    vectors, samples, embedding_info = encode_prompt_records(clip, records, source_id)
    saved_path = finalize_dataset(
        vectors,
        samples,
        config,
        output_path,
        umap_params=umap_params,
        cluster_params=cluster_params,
        embedding_info=embedding_info,
    )
    return saved_path, vectors


def finalize_dataset(
    vectors: np.ndarray,
    samples: list[dict[str, Any]],
    config: dict[str, Any],
    output_path: str | Path,
    *,
    umap_params: dict[str, Any] | None = None,
    cluster_params: dict[str, Any] | None = None,
    embedding_info: dict[str, Any] | None = None,
) -> str:
    """Build dataset, compute projections and clusters, then save"""
    output_path = Path(output_path)
    cp = cluster_params or {}
    dataset = _build_dataset(vectors, samples, config, embedding_info=embedding_info)
    dataset["metadata"]["cluster_params"] = cp

    umap_2d, umap_3d, fitted_samples = _fit_and_save_projection_models(
        vectors,
        dataset["samples"],
        output_path,
        umap_params=umap_params or {},
        cluster_params=cp,
    )
    dataset["samples"] = fitted_samples
    dataset["umap_2d"] = umap_2d
    dataset["umap_3d"] = umap_3d

    freq_labels = generate_frequency_labels(dataset["samples"])
    if freq_labels:
        dataset["metadata"]["cluster_labels"] = freq_labels

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
    """Predict cluster labels for new vectors using saved UMAP and HDBSCAN models at runtime"""
    umap_dir = Path(path) / "umap_model_cluster"
    hdbscan_pkl = Path(path) / "hdbscan_model.pkl"
    if not umap_dir.exists() or not hdbscan_pkl.exists():
        raise FileNotFoundError(
            f"Dataset is missing runtime cluster models: {umap_dir.name}, {hdbscan_pkl.name}"
        )

    r_cluster = load_parametric_umap(umap_dir)
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
    existing_vectors: np.ndarray = ds["pooled"]
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

    # Release mmap'd arrays before overwriting the same files on Windows
    del existing_vectors
    ds.clear()
    gc.collect()

    umap_2d, umap_3d, merged_samples = _fit_and_save_projection_models(
        merged_vectors,
        merged_samples,
        path,
        umap_params=meta.get("umap_params") or {},
        cluster_params=meta.get("cluster_params") or {},
    )

    freq_labels = generate_frequency_labels(merged_samples)
    updated_meta = {
        **meta,
        "sample_count": len(merged_samples),
        "cluster_labels": freq_labels or {},
    }
    if embedding_info:
        updated_meta["full_dim"] = embedding_info.get("full_embedding_shape", [])
        updated_meta["embedding_shape"] = [int(merged_vectors.shape[1])]
        updated_meta["embedding_strategy"] = embedding_info.get("embedding_strategy", "unknown")
    save_dataset(
        {
            "metadata": updated_meta,
            "samples": merged_samples,
            "pooled": merged_vectors,
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
        "full_dim": (embedding_info or {}).get("full_embedding_shape", []),
        "embedding_shape": [d],
        "encoder": str(config.get("encoder") or "unknown"),
        "source_dataset": str(config.get("source_dataset") or ""),
        "created": datetime.now(UTC).isoformat(),
        "umap_params": config.get("umap_params") or {},
        "embedding_strategy": (embedding_info or {}).get("embedding_strategy", "unknown"),
    }
    if config.get("clip_type"):
        metadata["clip_type"] = config["clip_type"]
    if config.get("source_loader"):
        metadata["source_loader"] = config["source_loader"]

    return {
        "metadata": metadata,
        "samples": [dict(s) for s in samples],
        "pooled": vectors,
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
    umap_params: dict[str, Any],
    cluster_params: dict[str, Any],
) -> tuple[np.ndarray, np.ndarray, list[dict[str, Any]]]:
    """Fit cluster/viz UMAP models, cluster with HDBSCAN, persist all artifacts"""
    samples = [dict(s) for s in samples]
    random_state = int(umap_params.get("random_state", UMAP_SEED))
    sample_count = int(vectors.shape[0])
    min_cluster_size = int(cluster_params.get("min_size", CLUSTER_MIN_SIZE))
    min_required_samples = max(4, min_cluster_size)
    if sample_count < min_required_samples:
        raise ValueError(
            "Dataset needs at least "
            f"{min_required_samples} samples for the current HDBSCAN min_cluster_size setting, "
            f"got {sample_count}"
        )

    n_dims = int(cluster_params.get("umap_dims", CLUSTER_UMAP_DIMS))
    print(f"Computing cluster UMAP ({n_dims}D) + HDBSCAN...")
    umap_cluster, r_cluster = compute_cluster_umap(
        vectors,
        n_components=n_dims,
        n_neighbors=int(cluster_params.get("umap_neighbors", CLUSTER_UMAP_NEIGHBORS)),
        random_state=random_state,
    )
    hdbscan_model, cluster_results = _fit_and_cluster(
        umap_cluster,
        min_cluster_size=min_cluster_size,
        min_samples=int(cluster_params.get("min_samples", CLUSTER_MIN_SAMPLES)),
    )
    for sample, result in zip(samples, cluster_results, strict=True):
        sample["cluster_global"] = result["cluster_global"]
        sample["is_noise"] = result["is_noise"]
        sample["membership_strength"] = result["membership_strength"]

    print("Computing UMAP 2D + 3D projections...")
    umap_2d, umap_3d, r2d, r3d = compute_umap(
        vectors,
        n_neighbors=int(umap_params.get("n_neighbors", UMAP_N_NEIGHBORS)),
        min_dist=float(umap_params.get("min_dist", UMAP_MIN_DIST)),
        random_state=random_state,
    )

    print("Saving projection models...")
    save_parametric_umap(r_cluster, output_path / "umap_model_cluster")
    save_parametric_umap(r2d, output_path / "umap_model_2d")
    save_parametric_umap(r3d, output_path / "umap_model_3d")
    joblib.dump(hdbscan_model, output_path / "hdbscan_model.pkl")

    return umap_2d, umap_3d, samples
