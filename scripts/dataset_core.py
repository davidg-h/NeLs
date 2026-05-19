"""Shared dataset I/O for NELS.

Runtime dependencies (imported lazily or with safe fallbacks):
  - datasets  : required for loading HuggingFace prompt datasets
  - umap-learn: required for UMAP projection
  - scikit-learn: required for kNN precomputation
  - joblib    : required for saving/loading UMAP reducer models
  - safetensors + torch: used when saving tensors; falls back to npz if absent
"""

from __future__ import annotations

import json
import random
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import numpy as np

try:
    from datasets import load_dataset as hf_load
except ImportError:
    hf_load = None

DATASET_VERSION = 3

DEFAULT_UMAP_PARAMS: dict[str, Any] = {
    "n_neighbors": 15,
    "min_dist": 0.1,
    "metric": "cosine",
    "random_state": 42,
}


# ---------------------------------------------------------------------------
# Dataset construction
# ---------------------------------------------------------------------------


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
            "has_full_cond": config.get("save_full_cond", False),
        }
        top_level_pooling = config.get("text_pooling", "pooler")
    elif config.get("type") == "image_latent":
        encoding_params = {
            "latent_mode": config.get("latent_mode", "mean"),
            "image_pooling": config.get("image_pooling", "flatten"),
            "vae_scale_factor": config.get("vae_scale_factor", 8),
            "vae_latent_scaling_factor": config.get("vae_latent_scaling_factor"),
            "latents_scaled_for_diffusion": False,
            "latent_shape": config.get("latent_shape"),
            "processed_size": config.get("processed_size"),
            "latent_reproducible": config.get("latent_reproducible", True),
            "batch_size": config.get("batch_size"),
        }
        top_level_pooling = config.get("image_pooling", "flatten")
    else:
        top_level_pooling = config.get("pooling", "none")

    encoding_params = {k: v for k, v in encoding_params.items() if v is not None}

    metadata: dict[str, Any] = {
        "name": str(config.get("name") or "dataset"),
        "version": DATASET_VERSION,
        "type": str(config.get("type") or "prompt_embedding"),
        "sample_count": n,
        "full_dim": d,
        "pooled_dim": d,
        "encoder": str(config.get("encoder") or "unknown"),
        "pooling": str(top_level_pooling),
        "source_dataset": str(config.get("source_dataset") or ""),
        "created": datetime.now(timezone.utc).isoformat(),
        "encoding_params": encoding_params,
        "umap_params": config.get("umap_params") or dict(DEFAULT_UMAP_PARAMS),
    }
    if config.get("cli_encoder"):
        metadata["cli_encoder"] = config["cli_encoder"]

    return {
        "metadata": metadata,
        "samples": [dict(s) for s in samples],
        "pooled": vectors,
        "umap_2d": None,
        "umap_3d": None,
    }


# ---------------------------------------------------------------------------
# UMAP
# ---------------------------------------------------------------------------


def compute_umap(
    pooled: np.ndarray,
    params: dict[str, Any] | None = None,
) -> tuple[np.ndarray, np.ndarray, Any, Any]:
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

    p = {**DEFAULT_UMAP_PARAMS, **(params or {})}
    n_neighbors = min(int(p.get("n_neighbors", 15)), max(2, n - 1))
    min_dist = float(p.get("min_dist", 0.1))
    metric = str(p.get("metric", "cosine"))
    reducer_2d = umap_lib.UMAP(
        n_components=2,
        n_neighbors=n_neighbors,
        min_dist=min_dist,
        metric=metric,
        n_jobs=-1,
    )
    reducer_3d = umap_lib.UMAP(
        n_components=3,
        n_neighbors=n_neighbors,
        min_dist=min_dist,
        metric=metric,
        n_jobs=-1,
    )
    umap_2d = reducer_2d.fit_transform(pooled).astype(np.float32)
    umap_3d = reducer_3d.fit_transform(pooled).astype(np.float32)
    return umap_2d, umap_3d, reducer_2d, reducer_3d


# ---------------------------------------------------------------------------
# kNN
# ---------------------------------------------------------------------------


def compute_knn(
    pooled: np.ndarray,
    k: int = 15,
    metric: str = "cosine",
) -> tuple[np.ndarray, np.ndarray]:
    """Compute kNN graph with sklearn. Returns (indices, distances) arrays of shape (N, k)."""
    try:
        from sklearn.neighbors import NearestNeighbors
    except ImportError as exc:
        raise ImportError(
            "scikit-learn is required for kNN precomputation: pip install scikit-learn"
        ) from exc

    n = pooled.shape[0]
    if n <= 1:
        return np.zeros((n, 0), dtype=np.int32), np.zeros((n, 0), dtype=np.float32)

    effective_k = min(k, n - 1)
    nn = NearestNeighbors(
        n_neighbors=effective_k + 1,  # +1 to include self, then strip it
        metric=metric,
        algorithm="auto",
        n_jobs=-1,
    )
    nn.fit(pooled)
    distances, indices = nn.kneighbors(pooled)

    out_idx = np.zeros((n, effective_k), dtype=np.int32)
    out_dst = np.zeros((n, effective_k), dtype=np.float32)
    for i in range(n):
        mask = indices[i] != i
        out_idx[i] = indices[i][mask][:effective_k]
        out_dst[i] = distances[i][mask][:effective_k]

    return out_idx, out_dst


# ---------------------------------------------------------------------------
# Disk I/O
# ---------------------------------------------------------------------------


def save_dataset(dataset: dict[str, Any], output_path: str | Path) -> str:
    path = Path(output_path)
    path.mkdir(parents=True, exist_ok=True)

    (path / "dataset.json").write_text(
        json.dumps(dataset["metadata"], indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    with open(path / "samples.jsonl", "w", encoding="utf-8") as f:
        for sample in dataset["samples"]:
            f.write(json.dumps(sample, ensure_ascii=False) + "\n")

    np.save(str(path / "embeddings.npy"), dataset["pooled"])

    if dataset.get("umap_2d") is not None:
        np.save(str(path / "umap_2d.npy"), dataset["umap_2d"])
    if dataset.get("umap_3d") is not None:
        np.save(str(path / "umap_3d.npy"), dataset["umap_3d"])

    for metric in ("cosine", "euclidean"):
        if dataset.get(f"knn_{metric}_indices") is not None:
            np.save(
                str(path / f"knn_{metric}_indices.npy"),
                dataset[f"knn_{metric}_indices"],
            )
        if dataset.get(f"knn_{metric}_distances") is not None:
            np.save(
                str(path / f"knn_{metric}_distances.npy"),
                dataset[f"knn_{metric}_distances"],
            )

    if dataset.get("cond_tensors") is not None:
        _save_cond_tensors(dataset["cond_tensors"], dataset["samples"], path)

    return str(path)


def load_dataset(dataset_path: str | Path) -> dict[str, Any]:
    path = Path(dataset_path)
    if not path.is_dir():
        raise FileNotFoundError(f"Dataset folder not found: {path}")

    meta_file = path / "dataset.json"
    if not meta_file.exists():
        raise FileNotFoundError(f"dataset.json missing in {path}")

    metadata = json.loads(meta_file.read_text(encoding="utf-8"))
    version = int(metadata.get("version", 0))
    if version > DATASET_VERSION:
        raise ValueError(
            f"Dataset version {version} is newer than supported ({DATASET_VERSION}). "
            "Please upgrade the NELS plugin."
        )
    if version < DATASET_VERSION:
        import warnings

        warnings.warn(
            f"Loading v{version} dataset (current format: v{DATASET_VERSION}). "
            "Re-encode with encode_cli.py to get full metadata.",
            UserWarning,
            stacklevel=2,
        )

    samples: list[dict[str, Any]] = []
    samples_file = path / "samples.jsonl"
    if samples_file.exists():
        for line in samples_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line:
                samples.append(json.loads(line))

    embeddings_path = path / "embeddings.npy"
    if not embeddings_path.exists():
        raise FileNotFoundError(f"embeddings.npy not found in {path}")
    pooled = np.load(str(embeddings_path))

    umap_2d: np.ndarray | None = (
        np.load(str(path / "umap_2d.npy")) if (path / "umap_2d.npy").exists() else None
    )
    umap_3d: np.ndarray | None = (
        np.load(str(path / "umap_3d.npy")) if (path / "umap_3d.npy").exists() else None
    )
    knn_cosine_indices: np.ndarray | None = (
        np.load(str(path / "knn_cosine_indices.npy"))
        if (path / "knn_cosine_indices.npy").exists()
        else None
    )
    knn_cosine_distances: np.ndarray | None = (
        np.load(str(path / "knn_cosine_distances.npy"))
        if (path / "knn_cosine_distances.npy").exists()
        else None
    )
    knn_euclidean_indices: np.ndarray | None = (
        np.load(str(path / "knn_euclidean_indices.npy"))
        if (path / "knn_euclidean_indices.npy").exists()
        else None
    )
    knn_euclidean_distances: np.ndarray | None = (
        np.load(str(path / "knn_euclidean_distances.npy"))
        if (path / "knn_euclidean_distances.npy").exists()
        else None
    )

    cond_tensors_available = (path / "cond_tensors.safetensors").exists()

    return {
        "metadata": metadata,
        "samples": samples,
        "pooled": pooled,
        "umap_2d": umap_2d,
        "umap_3d": umap_3d,
        "knn_cosine_indices": knn_cosine_indices,
        "knn_cosine_distances": knn_cosine_distances,
        "knn_euclidean_indices": knn_euclidean_indices,
        "knn_euclidean_distances": knn_euclidean_distances,
        "cond_tensors_available": cond_tensors_available,
        "path": str(path),
    }


# ---------------------------------------------------------------------------
# Dataset creation pipeline
# ---------------------------------------------------------------------------


def finalize_dataset(
    vectors: np.ndarray,
    samples: list[dict[str, Any]],
    config: dict[str, Any],
    output_path: str | Path,
    *,
    compute_umap_flag: bool = True,
    umap_params: dict[str, Any] | None = None,
    compute_knn_flag: bool = True,
    knn_k: int = 15,
    cond_tensors: list[np.ndarray] | None = None,
) -> str:
    """
    Build, compute projections, and save a dataset. Returns the saved path string.

    Single entry point for the create pipeline shared by CLI and ComfyUI nodes.
    """
    output_path = Path(output_path)
    dataset = build_dataset(vectors, samples, config)
    if cond_tensors is not None:
        dataset["cond_tensors"] = cond_tensors

    r2d = r3d = None
    if compute_umap_flag:
        print("Computing UMAP projections (2D + 3D)...")
        try:
            umap_2d, umap_3d, r2d, r3d = compute_umap(vectors, params=umap_params)
            dataset["umap_2d"] = umap_2d
            dataset["umap_3d"] = umap_3d
        except ImportError:
            print("  Skipped — umap-learn not installed.")

    if compute_knn_flag:
        print(f"Computing kNN graphs (k={knn_k}, cosine + euclidean)...")
        try:
            for metric in ("cosine", "euclidean"):
                knn_idx, knn_dst = compute_knn(vectors, k=knn_k, metric=metric)
                dataset[f"knn_{metric}_indices"] = knn_idx
                dataset[f"knn_{metric}_distances"] = knn_dst
            dataset["metadata"]["knn_params"] = {"k": knn_k}
        except ImportError:
            print("  Skipped — scikit-learn not installed.")

    print("Saving dataset...")
    path = save_dataset(dataset, output_path)

    if r2d is not None:
        try:
            import joblib

            joblib.dump(r2d, output_path / "umap_model_2d.pkl")
            joblib.dump(r3d, output_path / "umap_model_3d.pkl")
        except ImportError:
            pass

    return path


# ---------------------------------------------------------------------------
# Index selection
# ---------------------------------------------------------------------------


def select_sample_indices(
    total: int,
    count: int,
    mode: str,
    *,
    window_start: int = 0,
    random_seed: int = 42,
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

    raise ValueError(
        f"Unknown load_mode: {mode!r}. Expected first_n, random_n, window, or all."
    )


# ---------------------------------------------------------------------------
# Prompt loading
# ---------------------------------------------------------------------------


def load_prompts_from_source(
    source: str,
    hf_column: str = "Prompt",
    limit: int = 0,
    hf_split: str = "train",
) -> tuple[list[str], str]:
    path = Path(source)
    if path.exists() and path.is_file():
        lines = path.read_text(encoding="utf-8").splitlines()
        prompts = [line.strip() for line in lines if line.strip()]
        if limit > 0:
            prompts = prompts[:limit]
        return prompts, str(path)

    if path.suffix.lower() in {".txt", ".csv", ".jsonl"} and not path.exists():
        raise FileNotFoundError(
            f"File not found: {path}. "
            "If this is a HuggingFace dataset ID, it should not have a file extension."
        )

    if hf_load is None:
        raise ImportError(
            "The 'datasets' package is required to load HuggingFace datasets. "
            "Install it with: pip install datasets"
        )

    ds = hf_load(source, split=hf_split, streaming=False, trust_remote_code=False)
    if limit > 0:
        ds = ds.select(range(min(limit, len(ds))))
    prompts = [str(row[hf_column]) for row in ds]
    return prompts, source


def load_images_from_folder(folder_path: str, limit: int = 0) -> tuple:
    """Load images from a local folder into a single (B, H, W, C) float32 tensor."""
    import torch
    from PIL import Image as _PILImage

    folder = Path(folder_path)
    if not folder.is_dir():
        raise ValueError(f"Not a directory: {folder_path}")

    exts = {".jpg", ".jpeg", ".png", ".bmp", ".webp", ".tiff"}
    img_paths = sorted(p for p in folder.iterdir() if p.suffix.lower() in exts)
    if not img_paths:
        raise ValueError(f"No images found in: {folder_path}")
    if limit > 0:
        img_paths = img_paths[:limit]

    ref_size: tuple[int, int] | None = None
    arrs = []
    for p in img_paths:
        img = _PILImage.open(p).convert("RGB")
        if ref_size is None:
            ref_size = img.size  # (W, H)
        elif img.size != ref_size:
            img = img.resize(ref_size, _PILImage.LANCZOS)
        arrs.append(np.array(img).astype(np.float32) / 255.0)

    return torch.from_numpy(np.stack(arrs, axis=0)), [p.name for p in img_paths]


def load_images_from_source(
    source: str,
    image_column: str = "image",
    limit: int = 0,
    hf_split: str = "train",
) -> tuple:
    """
    Load images from a local folder or HuggingFace dataset.

    For local folders, delegates to load_images_from_folder.
    For HuggingFace dataset IDs, loads via datasets.load_dataset and converts
    each row's image column to an RGB float32 array.

    Returns (image_tensor [B, H, W, C] float32 in [0, 1], image_names list[str]).
    """
    import io
    import torch
    from PIL import Image as _PILImage

    path = Path(source)
    if path.exists() and path.is_dir():
        return load_images_from_folder(str(path), limit=limit)

    if hf_load is None:
        raise ImportError(
            "The 'datasets' package is required to load HuggingFace image datasets. "
            "Install it with: pip install datasets"
        )

    ds = hf_load(source, split=hf_split, streaming=False, trust_remote_code=False)
    if limit > 0:
        ds = ds.select(range(min(limit, len(ds))))

    ref_size: tuple[int, int] | None = None
    arrs = []
    names = []

    for i, row in enumerate(ds):
        raw = row[image_column]
        if isinstance(raw, _PILImage.Image):
            img = raw.convert("RGB")
        elif isinstance(raw, dict):
            if raw.get("bytes"):
                img = _PILImage.open(io.BytesIO(raw["bytes"])).convert("RGB")
            elif raw.get("path"):
                img = _PILImage.open(raw["path"]).convert("RGB")
            else:
                raise ValueError(
                    f"Cannot decode image dict at row {i}: keys={list(raw.keys())}"
                )
        elif isinstance(raw, str):
            img = _PILImage.open(raw).convert("RGB")
        else:
            raise ValueError(
                f"Unexpected image type at row {i}: {type(raw).__name__}. "
                "Use --hf-column to specify the correct column."
            )

        if ref_size is None:
            ref_size = img.size  # (W, H)
        elif img.size != ref_size:
            img = img.resize(ref_size, _PILImage.LANCZOS)

        arrs.append(np.array(img).astype(np.float32) / 255.0)
        names.append(f"{source}:{i:06d}")

    if not arrs:
        raise ValueError(f"No images loaded from HuggingFace dataset: {source}")

    return torch.from_numpy(np.stack(arrs, axis=0)), names


# ---------------------------------------------------------------------------
# Private helpers
# ---------------------------------------------------------------------------


def _save_cond_tensors(
    cond_list: list[np.ndarray],
    samples: list[dict[str, Any]],
    path: Path,
) -> str:
    """Save per-sample cond tensors indexed by sample ID to cond_tensors.safetensors."""
    import torch
    from safetensors.torch import save_file

    tensors = {
        str(s["id"]): torch.from_numpy(cond_list[i]).float()
        for i, s in enumerate(samples)
    }
    save_file(tensors, str(path / "cond_tensors.safetensors"))
    return "cond_tensors.safetensors"


def _load_cond_tensors_all(path: Path) -> dict[str, np.ndarray] | None:
    """Load all cond tensors from cond_tensors.safetensors into a {sample_id: array} dict."""
    sf_path = path / "cond_tensors.safetensors"
    if not sf_path.exists():
        return None
    try:
        from safetensors import safe_open

        result: dict[str, np.ndarray] = {}
        with safe_open(str(sf_path), framework="pt") as f:
            for k in f.keys():
                result[k] = f.get_tensor(k).numpy().copy()
        return result
    except ImportError:
        return None
