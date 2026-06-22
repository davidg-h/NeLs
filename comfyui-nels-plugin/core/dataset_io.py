"""Dataset serialization I/O for NELS: save and load"""

import json
from pathlib import Path
from typing import Any

import numpy as np


def resolve_dataset_path(
    dataset_path: str | Path,
    *,
    datasets_root: str | Path | None = None,
) -> Path:
    """Resolve a dataset path optionally relative to a datasets root"""
    path = Path(dataset_path)
    if not str(path).strip():
        raise ValueError("dataset_path is empty")
    if path.is_absolute() or datasets_root is None:
        return path
    return Path(datasets_root) / path


def save_dataset(dataset: dict[str, Any], output_path: str | Path) -> str:
    """Write dataset dict to disk: dataset.json, samples.jsonl, embeddings + umap npy files"""
    path = Path(output_path)
    path.mkdir(parents=True, exist_ok=True)

    (path / "dataset.json").write_text(
        json.dumps(dataset["metadata"], indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    with (path / "samples.jsonl").open("w", encoding="utf-8") as f:
        for sample in dataset["samples"]:
            f.write(json.dumps(sample, ensure_ascii=False) + "\n")

    np.save(str(path / "embeddings.npy"), dataset["pooled"])

    if dataset.get("umap_cluster") is not None:
        np.save(str(path / "umap_cluster.npy"), dataset["umap_cluster"])
    if dataset.get("umap_2d") is not None:
        np.save(str(path / "umap_2d.npy"), dataset["umap_2d"])
    if dataset.get("umap_3d") is not None:
        np.save(str(path / "umap_3d.npy"), dataset["umap_3d"])

    return str(path)


def load_dataset(dataset_path: str | Path) -> dict[str, Any]:
    """Load a dataset dir back into the dict shape save_dataset expects, npy arrays with mmap"""
    path = Path(dataset_path)
    if not path.is_dir():
        raise FileNotFoundError(f"Dataset folder not found: {path}")

    meta_file = path / "dataset.json"
    if not meta_file.exists():
        raise FileNotFoundError(f"dataset.json missing in {path}")

    metadata = json.loads(meta_file.read_text(encoding="utf-8"))

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
    pooled = np.load(str(embeddings_path), mmap_mode="r")

    def _load_npy(name: str) -> np.ndarray | None:
        p = path / name
        return np.load(str(p), mmap_mode="r") if p.exists() else None

    return {
        "metadata": metadata,
        "samples": samples,
        "pooled": pooled,
        "umap_cluster": _load_npy("umap_cluster.npy"),
        "umap_2d": _load_npy("umap_2d.npy"),
        "umap_3d": _load_npy("umap_3d.npy"),
    }
