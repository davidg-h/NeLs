"""Dataset serialization I/O for NELS: save and load"""

import json
import os
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
    """Write dataset dict to disk: dataset.json, samples.jsonl, compact embeddings + umap npy files

    Write each file to a temp sibling, then atomically replace
    Avoids truncated files on crashes
    Callers holding mmap'd np.load(..., mmap_mode="r") handles on these paths must release them
    """
    path = Path(output_path)
    path.mkdir(parents=True, exist_ok=True)

    _atomic_write_text(
        path / "dataset.json",
        json.dumps(dataset["metadata"], indent=2, ensure_ascii=False),
    )

    samples_text = "".join(
        json.dumps(sample, ensure_ascii=False) + "\n" for sample in dataset["samples"]
    )
    _atomic_write_text(path / "samples.jsonl", samples_text)

    _atomic_save_npy(path / "compact_embeddings.npy", dataset["compact_embeddings"])
    if dataset.get("umap_2d") is not None:
        _atomic_save_npy(path / "umap_2d.npy", dataset["umap_2d"])
    if dataset.get("umap_3d") is not None:
        _atomic_save_npy(path / "umap_3d.npy", dataset["umap_3d"])

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
        with samples_file.open("r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    samples.append(json.loads(line))

    embeddings_path = path / "compact_embeddings.npy"
    if not embeddings_path.exists():
        raise FileNotFoundError(f"compact_embeddings.npy not found in {path}")
    compact_embeddings = np.load(str(embeddings_path), mmap_mode="r")

    def _load_npy(name: str) -> np.ndarray | None:
        p = path / name
        return np.load(str(p), mmap_mode="r") if p.exists() else None

    return {
        "metadata": metadata,
        "samples": samples,
        "compact_embeddings": compact_embeddings,
        "umap_2d": _load_npy("umap_2d.npy"),
        "umap_3d": _load_npy("umap_3d.npy"),
    }


# ---- internals ----


def _atomic_write_text(path: Path, text: str) -> None:
    """Write text to a temp sibling then atomically replace path"""
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(text, encoding="utf-8")
    os.replace(tmp, path)


def _atomic_save_npy(path: Path, array: np.ndarray) -> None:
    """Save array to a temp sibling then atomically replace path"""
    tmp = path.with_name(path.name + ".tmp")
    with tmp.open("wb") as f:
        np.save(f, array)
    os.replace(tmp, path)
