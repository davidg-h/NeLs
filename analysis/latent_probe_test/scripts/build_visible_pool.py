"""Build the 800-point 'visible' reference pool for Latent Probe test.

Reuses dataset_strategy_test's 800/200 split (imagenet1k_split_manifest.jsonl).
Only filters imagenet1k_labels_classic's existing arrays down to the 800 train rows.
"""

import json
import shutil
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import REPO_ROOT, dataset_path, load_jsonl, results_dir, test_root  # noqa: E402

SOURCE_DATASET = dataset_path("imagenet1k_labels_classic")
SPLIT_MANIFEST = (
    REPO_ROOT
    / "analysis"
    / "dataset_strategy_test"
    / "artifacts"
    / "data"
    / "imagenet1k_split_manifest.jsonl"
)
ROOT = test_root(__file__)
OUT_DIR = ROOT / "visible_pool_dataset"
RESULTS_DIR = results_dir(__file__)


def main() -> None:
    manifest = load_jsonl(SPLIT_MANIFEST)
    samples = load_jsonl(SOURCE_DATASET / "samples.jsonl")
    id_to_index = {s["id"]: i for i, s in enumerate(samples)}

    train_ids = [m["original_id"] for m in manifest if m["split"] == "train"]
    heldout_ids = [m["original_id"] for m in manifest if m["split"] == "heldout"]
    assert len(train_ids) == 800 and len(heldout_ids) == 200, (
        len(train_ids),
        len(heldout_ids),
    )

    train_idx = np.array([id_to_index[i] for i in train_ids], dtype=np.int64)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for name in (
        "dataset.json",
        "umap_model_2d.joblib",
        "umap_model_3d.joblib",
        "umap_model_cluster.joblib",
        "hdbscan_model.joblib",
    ):
        src = SOURCE_DATASET / name
        if src.exists():
            shutil.copy2(src, OUT_DIR / name)

    for arr_name in ("umap_2d.npy", "umap_3d.npy", "compact_embeddings.npy"):
        arr = np.load(SOURCE_DATASET / arr_name)
        np.save(OUT_DIR / arr_name, arr[train_idx])

    filtered_samples = [samples[i] for i in train_idx]
    with (OUT_DIR / "samples.jsonl").open("w", encoding="utf-8") as f:
        for s in filtered_samples:
            f.write(json.dumps(s) + "\n")

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    (RESULTS_DIR / "heldout_ids.json").write_text(
        json.dumps(heldout_ids, indent=2), encoding="utf-8"
    )

    print(f"Visible pool: {len(filtered_samples)} points -> {OUT_DIR}")
    print(
        f"Held-out: {len(heldout_ids)} points recorded -> {RESULTS_DIR / 'heldout_ids.json'}"
    )


if __name__ == "__main__":
    main()
