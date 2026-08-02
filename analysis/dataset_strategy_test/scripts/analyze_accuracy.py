"""Held-out projection/cluster accuracy per strategy (classic/two_pass/parametric).

Analysis only - assumes the three 800-point datasets already exist (run build_datasets.py
first);  Run with ComfyUI's embedded Python because of dependency parity
(umap-learn/hdbscan/faiss/tensorflow)
"""

import csv
import json
import sys
from pathlib import Path

import numpy as np
from scipy.linalg import orthogonal_procrustes
from sklearn.metrics import adjusted_rand_score

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import dataset_path, load_jsonl, results_dir, setup_plugin_imports  # noqa: E402

setup_plugin_imports()

from core.dataset_ops import predict_cluster_for_new  # noqa: E402
from core.defaults import RUNTIME_CLUSTER_K  # noqa: E402
from core.projection_ops import (  # noqa: E402
    load_projection_strategy,
    load_reducer,
    reducer_backend_for_strategy,
    reducer_path,
)

ARTIFACTS_DIR = Path(__file__).resolve().parent.parent / "artifacts"
DATA_DIR = ARTIFACTS_DIR / "data"
NEW_DATASETS_ROOT = ARTIFACTS_DIR / "datasets"
RESULTS_DIR = results_dir(__file__, under="artifacts")

STRATEGIES = ["classic", "two_pass", "parametric"]
SHARES_CANONICAL_BASIS = {
    "classic": ["classic", "two_pass"],
    "two_pass": ["classic", "two_pass"],
    "parametric": None,
}
# diverged build showing different parametric datasets saved as `imagenet1k_labels_parametric_diverged`
# to show significance of TF_ENABLE_ONEDNN_OPTS=0 flag not being set and resulting inaccuracy of data
GROUND_TRUTH_DATASET_NAME = {
    "classic": "imagenet1k_labels_classic",
    "two_pass": "imagenet1k_labels_two_pass",
    "parametric": "imagenet1k_labels_parametric",
}


def procrustes_with_scale(
    source: np.ndarray, target: np.ndarray
) -> tuple[np.ndarray, np.ndarray, np.ndarray, float]:
    """Fit rotation+reflection+uniform scale mapping `source` onto `target` (paired points)"""
    source = source.astype(np.float64)
    target = target.astype(np.float64)
    source_centroid = source.mean(axis=0)
    target_centroid = target.mean(axis=0)
    source_centered = source - source_centroid
    target_centered = target - target_centroid

    source_norm = np.linalg.norm(source_centered)
    target_norm = np.linalg.norm(target_centered)
    source_unit = source_centered / source_norm
    target_unit = target_centered / target_norm

    rotation, _ = orthogonal_procrustes(source_unit, target_unit)
    scale = target_norm / source_norm

    return rotation, source_centroid, target_centroid, scale


def apply_procrustes(
    points: np.ndarray,
    rotation: np.ndarray,
    source_centroid: np.ndarray,
    target_centroid: np.ndarray,
    scale: float,
) -> np.ndarray:
    points = points.astype(np.float64)
    return (points - source_centroid) @ rotation * scale + target_centroid


def top_k_indices_cosine(
    queries: np.ndarray, candidates: np.ndarray, k: int
) -> list[set[int]]:
    """Top-k candidate row indices per query, by cosine similarity"""
    q = queries.astype(np.float64) / np.linalg.norm(queries, axis=1, keepdims=True)
    c = candidates.astype(np.float64) / np.linalg.norm(
        candidates, axis=1, keepdims=True
    )
    sims = q @ c.T
    k = min(k, candidates.shape[0])
    top = np.argpartition(-sims, kth=k - 1, axis=1)[:, :k]
    return [set(row.tolist()) for row in top]


def top_k_indices_euclidean(
    queries: np.ndarray, candidates: np.ndarray, k: int
) -> list[set[int]]:
    """Top-k candidate row indices per query, by Euclidean distance"""
    dists = np.linalg.norm(queries[:, None, :] - candidates[None, :, :], axis=2)
    k = min(k, candidates.shape[0])
    top = np.argpartition(dists, kth=k - 1, axis=1)[:, :k]
    return [set(row.tolist()) for row in top]


def mean_recall_at_k(
    true_sets: list[set[int]], pred_sets: list[set[int]], k: int
) -> float:
    """Mean fraction of each query's true top-k neighbors also found in its predicted top-k"""
    overlaps = [len(t & p) / k for t, p in zip(true_sets, pred_sets, strict=True)]
    return float(np.mean(overlaps))


def analyze_strategy(
    strategy: str,
    heldout_ids: list[str],
    heldout_vectors: np.ndarray,
    manifest: list[dict],
    ground_truth_dir: Path,
    dataset_path: Path | None = None,
) -> tuple[dict, list[dict]]:
    if dataset_path is None:
        dataset_path = NEW_DATASETS_ROOT / f"imagenet1k_800train_{strategy}"
    loaded_strategy = load_projection_strategy(dataset_path)
    assert loaded_strategy == strategy, (
        f"dataset.json strategy mismatch: {loaded_strategy} != {strategy}"
    )
    backend = reducer_backend_for_strategy(strategy)

    # --- project held-out points through this strategy's runtime 2D/3D reducers ---
    model_2d = load_reducer(reducer_path(dataset_path, strategy, "2d"), backend=backend)
    model_3d = load_reducer(reducer_path(dataset_path, strategy, "3d"), backend=backend)
    predicted_2d = model_2d.transform(heldout_vectors).astype(np.float64)
    predicted_3d = model_3d.transform(heldout_vectors).astype(np.float64)

    # --- predict cluster assignment for held-out points ---
    cluster_results = predict_cluster_for_new(dataset_path, heldout_vectors)

    # --- Procrustes alignment using the 800 shared training points as landmarks ---
    own_umap_2d = np.load(dataset_path / "umap_2d.npy").astype(np.float64)
    own_umap_3d = np.load(dataset_path / "umap_3d.npy").astype(np.float64)

    gt_samples = load_jsonl(ground_truth_dir / "samples.jsonl")
    gt_id_to_idx = {s["id"]: i for i, s in enumerate(gt_samples)}
    gt_umap_2d = np.load(ground_truth_dir / "umap_2d.npy")
    gt_umap_3d = np.load(ground_truth_dir / "umap_3d.npy")

    train_gt_idx = [gt_id_to_idx[row["original_id"]] for row in manifest]
    train_gt_2d = gt_umap_2d[train_gt_idx].astype(np.float64)
    train_gt_3d = gt_umap_3d[train_gt_idx].astype(np.float64)

    rot2d, src_c2d, tgt_c2d, scale2d = procrustes_with_scale(own_umap_2d, train_gt_2d)
    rot3d, src_c3d, tgt_c3d, scale3d = procrustes_with_scale(own_umap_3d, train_gt_3d)

    aligned_2d = apply_procrustes(predicted_2d, rot2d, src_c2d, tgt_c2d, scale2d)
    aligned_3d = apply_procrustes(predicted_3d, rot3d, src_c3d, tgt_c3d, scale3d)

    print(f"  [{strategy}] procrustes scale 2d={scale2d:.6g} 3d={scale3d:.6g}")

    # --- ground truth for the held-out points themselves ---
    heldout_gt_idx = [gt_id_to_idx[i] for i in heldout_ids]
    gt_2d = gt_umap_2d[heldout_gt_idx].astype(np.float64)
    gt_3d = gt_umap_3d[heldout_gt_idx].astype(np.float64)
    gt_cluster = [gt_samples[i]["cluster_global"] for i in heldout_gt_idx]
    gt_is_noise = [gt_samples[i]["is_noise"] for i in heldout_gt_idx]

    coord_dist_2d = np.linalg.norm(aligned_2d - gt_2d, axis=1)
    coord_dist_3d = np.linalg.norm(aligned_3d - gt_3d, axis=1)

    # Neighbor recall vs. raw compact-embedding neighbors
    own_compact_embeddings = np.load(dataset_path / "compact_embeddings.npy").astype(
        np.float32
    )
    k = min(RUNTIME_CLUSTER_K, own_compact_embeddings.shape[0])
    raw_neighbors = top_k_indices_cosine(heldout_vectors, own_compact_embeddings, k)

    # predicted_2d/3d must be aligned into own_umap_2d/3d's frame specifically (not the
    # ground-truth frame used above) -> for two_pass this is a genuinely different runtime
    # manifold, so "nearest" would be meaningless without this second alignment
    own_transform_2d = model_2d.transform(own_compact_embeddings).astype(np.float64)
    own_transform_3d = model_3d.transform(own_compact_embeddings).astype(np.float64)
    nb_rot2d, nb_src_c2d, nb_tgt_c2d, nb_scale2d = procrustes_with_scale(
        own_transform_2d, own_umap_2d
    )
    nb_rot3d, nb_src_c3d, nb_tgt_c3d, nb_scale3d = procrustes_with_scale(
        own_transform_3d, own_umap_3d
    )
    predicted_2d_for_neighbors = apply_procrustes(
        predicted_2d, nb_rot2d, nb_src_c2d, nb_tgt_c2d, nb_scale2d
    )
    predicted_3d_for_neighbors = apply_procrustes(
        predicted_3d, nb_rot3d, nb_src_c3d, nb_tgt_c3d, nb_scale3d
    )

    subset_neighbors_2d = top_k_indices_euclidean(
        predicted_2d_for_neighbors, own_umap_2d, k
    )
    subset_neighbors_3d = top_k_indices_euclidean(
        predicted_3d_for_neighbors, own_umap_3d, k
    )
    canonical_neighbors_2d = top_k_indices_euclidean(gt_2d, train_gt_2d, k)
    canonical_neighbors_3d = top_k_indices_euclidean(gt_3d, train_gt_3d, k)
    neighbor_recall = {
        "k": k,
        "subset_2d": mean_recall_at_k(raw_neighbors, subset_neighbors_2d, k),
        "subset_3d": mean_recall_at_k(raw_neighbors, subset_neighbors_3d, k),
        "canonical_2d": mean_recall_at_k(raw_neighbors, canonical_neighbors_2d, k),
        "canonical_3d": mean_recall_at_k(raw_neighbors, canonical_neighbors_3d, k),
    }

    pred_labels = [
        -1 if r["is_noise"] else r["cluster_global"] for r in cluster_results
    ]
    gt_labels = [-1 if n else c for c, n in zip(gt_cluster, gt_is_noise, strict=True)]
    ari = adjusted_rand_score(gt_labels, pred_labels)
    noise_agreement = float(
        np.mean(
            [
                r["is_noise"] == n
                for r, n in zip(cluster_results, gt_is_noise, strict=True)
            ]
        )
    )

    summary = {
        "n_heldout": len(heldout_ids),
        "coord_dist_2d": {
            "mean": float(coord_dist_2d.mean()),
            "median": float(np.median(coord_dist_2d)),
            "std": float(coord_dist_2d.std()),
        },
        "coord_dist_3d": {
            "mean": float(coord_dist_3d.mean()),
            "median": float(np.median(coord_dist_3d)),
            "std": float(coord_dist_3d.std()),
        },
        "cluster_ari": float(ari),
        "noise_agreement": noise_agreement,
        "procrustes_scale_2d": float(scale2d),
        "procrustes_scale_3d": float(scale3d),
        "neighbor_recall_at_k": neighbor_recall,
        "shares_canonical_basis_with": SHARES_CANONICAL_BASIS[strategy],
    }

    per_point = [
        {
            "strategy": strategy,
            "original_id": heldout_ids[i],
            "coord_dist_2d": float(coord_dist_2d[i]),
            "coord_dist_3d": float(coord_dist_3d[i]),
            "predicted_cluster": pred_labels[i],
            "ground_truth_cluster": gt_labels[i],
            "predicted_is_noise": cluster_results[i]["is_noise"],
            "ground_truth_is_noise": gt_is_noise[i],
            "membership_strength": cluster_results[i]["membership_strength"],
            # Raw 2D positions (post-Procrustes-alignment for predicted), for plotting only
            "pred_2d_x": float(aligned_2d[i, 0]),
            "pred_2d_y": float(aligned_2d[i, 1]),
            "gt_2d_x": float(gt_2d[i, 0]),
            "gt_2d_y": float(gt_2d[i, 1]),
        }
        for i in range(len(heldout_ids))
    ]

    return summary, per_point


def main() -> None:
    split_manifest = load_jsonl(DATA_DIR / "imagenet1k_split_manifest.jsonl")
    manifest = [row for row in split_manifest if row["split"] == "train"]
    heldout_ids = [
        row["original_id"] for row in split_manifest if row["split"] == "heldout"
    ]

    # No re-encoding needed - held-out compact embeddings already exist, byte-identical,
    # in the existing classic dataset (same encoder, same prompts, verified deterministic)
    classic_gt_dir = dataset_path("imagenet1k_labels_classic")
    classic_samples = load_jsonl(classic_gt_dir / "samples.jsonl")
    id_to_idx = {s["id"]: i for i, s in enumerate(classic_samples)}
    compact_embeddings = np.load(classic_gt_dir / "compact_embeddings.npy")
    heldout_indices = [id_to_idx[i] for i in heldout_ids]
    heldout_vectors = compact_embeddings[heldout_indices].astype(np.float32)

    summaries = {}
    all_per_point = []
    for strategy in STRATEGIES:
        print(f"\nAnalyzing strategy: {strategy}")
        ground_truth_dir = dataset_path(GROUND_TRUTH_DATASET_NAME[strategy])
        summary, per_point = analyze_strategy(
            strategy, heldout_ids, heldout_vectors, manifest, ground_truth_dir
        )
        summaries[strategy] = summary
        all_per_point.extend(per_point)
        nr = summary["neighbor_recall_at_k"]
        print(
            f"  coord_dist_2d mean={summary['coord_dist_2d']['mean']:.4f}  "
            f"cluster_ari={summary['cluster_ari']:.4f}  "
            f"noise_agreement={summary['noise_agreement']:.4f}"
        )
        print(
            f"  neighbor_recall@{nr['k']}: subset_2d={nr['subset_2d']:.4f}  "
            f"subset_3d={nr['subset_3d']:.4f}  canonical_2d={nr['canonical_2d']:.4f}  "
            f"canonical_3d={nr['canonical_3d']:.4f}"
        )

    results = {
        "per_strategy": summaries,
    }

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    summary_path = RESULTS_DIR / "held_out_accuracy_summary.json"
    summary_path.write_text(json.dumps(results, indent=2))
    print(f"\nWrote {summary_path}")

    per_point_path = RESULTS_DIR / "held_out_accuracy_per_point.csv"
    with per_point_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(all_per_point[0].keys()))
        writer.writeheader()
        writer.writerows(all_per_point)
    print(f"Wrote {per_point_path}")


if __name__ == "__main__":
    main()
