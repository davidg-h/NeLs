"""Latent Probe held-out embedding-recovery test

For each of the 200 held-out points from dataset_strategy_test split, calls the real, unmodified
`inverse_project()` (core/operations/latent_probe.py) with that point's own true UMAP
position as the probe click, searched against the 800-point visible pool built by
build_visible_pool.py

Measures whether the resulting inverse-distance-weighted estimate q recovers the held-out point's own true compact embedding and true cluster

Needs ComfyUI's python_embeded
"""

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import (
    dataset_path,
    load_jsonl,
    results_dir,
    setup_plugin_imports,
    test_root,
)  # noqa: E402

setup_plugin_imports()

from core.operations.latent_probe import inverse_project  # noqa: E402

SOURCE_DATASET = dataset_path("imagenet1k_labels_classic")
ROOT = test_root(__file__)
VISIBLE_POOL = ROOT / "visible_pool_dataset"
RESULTS_DIR = results_dir(__file__)


def cosine(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8))


def main() -> None:
    heldout_ids = json.loads(
        (RESULTS_DIR / "heldout_ids.json").read_text(encoding="utf-8")
    )
    samples = load_jsonl(SOURCE_DATASET / "samples.jsonl")
    id_to_index = {s["id"]: i for i, s in enumerate(samples)}
    umap_2d = np.load(SOURCE_DATASET / "umap_2d.npy")
    umap_3d = np.load(SOURCE_DATASET / "umap_3d.npy")
    compact = np.load(SOURCE_DATASET / "compact_embeddings.npy", mmap_mode="r")

    per_point = []
    for hid in heldout_ids:
        idx = id_to_index[hid]
        sample = samples[idx]
        true_embedding = np.asarray(compact[idx], dtype=np.float32)
        true_cluster = None if sample.get("is_noise") else sample.get("cluster_global")

        hits_2d, q_2d, cluster_2d = inverse_project(
            umap_2d[idx].tolist(), str(VISIBLE_POOL), mode="2d"
        )
        hits_3d, q_3d, cluster_3d = inverse_project(
            umap_3d[idx].tolist(), str(VISIBLE_POOL), mode="3d"
        )

        pred_cluster_2d = (
            None if cluster_2d.get("is_noise") else cluster_2d.get("cluster_id")
        )
        pred_cluster_3d = (
            None if cluster_3d.get("is_noise") else cluster_3d.get("cluster_id")
        )

        per_point.append(
            {
                "id": hid,
                "text": sample.get("text", ""),
                "true_cluster": true_cluster,
                "recovery_cosine_2d": cosine(q_2d, true_embedding),
                "recovery_cosine_3d": cosine(q_3d, true_embedding),
                "pred_cluster_2d": pred_cluster_2d,
                "pred_cluster_3d": pred_cluster_3d,
                "cluster_match_2d": pred_cluster_2d == true_cluster,
                "cluster_match_3d": pred_cluster_3d == true_cluster,
                "top_hit_2d": hits_2d[0]["label"] if hits_2d else None,
                "top_hit_2d_score": hits_2d[0]["score"] if hits_2d else None,
                "top_hit_3d": hits_3d[0]["label"] if hits_3d else None,
                "top_hit_3d_score": hits_3d[0]["score"] if hits_3d else None,
            }
        )

    cos_2d = np.array([p["recovery_cosine_2d"] for p in per_point])
    cos_3d = np.array([p["recovery_cosine_3d"] for p in per_point])
    summary = {
        "n_heldout": len(per_point),
        "recovery_cosine_2d": {
            "mean": float(cos_2d.mean()),
            "median": float(np.median(cos_2d)),
            "std": float(cos_2d.std()),
        },
        "recovery_cosine_3d": {
            "mean": float(cos_3d.mean()),
            "median": float(np.median(cos_3d)),
            "std": float(cos_3d.std()),
        },
        "cluster_match_rate_2d": float(
            np.mean([p["cluster_match_2d"] for p in per_point])
        ),
        "cluster_match_rate_3d": float(
            np.mean([p["cluster_match_3d"] for p in per_point])
        ),
    }
    print(json.dumps(summary, indent=2))

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    (RESULTS_DIR / "probe_recovery_summary.json").write_text(
        json.dumps({"summary": summary, "per_point": per_point}, indent=2),
        encoding="utf-8",
    )
    print(f"\nWrote {RESULTS_DIR / 'probe_recovery_summary.json'}")


if __name__ == "__main__":
    main()
