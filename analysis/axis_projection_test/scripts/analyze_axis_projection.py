"""Semantic Axis Projection analysis

Calls the real `build_axis_projection` operation (core/operations/axis_projection.py)
directly, the same function the plugin uses live, with a small anchor set per cluster as
Group A/Group B and checks whether the resulting axis places each cluster's held-out
(non-anchor) members on the correct side.
"""

import json
import sys
from pathlib import Path

import numpy as np
import torch
from scipy.stats import mannwhitneyu

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import dataset_path, load_jsonl, results_dir, setup_plugin_imports  # noqa: E402

setup_plugin_imports()
from core.operations.axis_projection import _support_band_size, build_axis_projection  # noqa: E402
from core.tensor_ops import create_embedding_set, make_embedding_point  # noqa: E402

DATASET_PATH = dataset_path("gustavosta_sd_prompts_v2_two_pass")
RESULTS_DIR = results_dir(__file__)

N_BACKGROUND = 4000
BACKGROUND_SEED = 42


def make_point(
    sample_id: str, text: str, index: int, compact_embeddings: np.ndarray, group: str
) -> dict:
    vec = torch.from_numpy(compact_embeddings[index].copy()).float()
    label = (text or sample_id)[:64]
    return make_embedding_point(
        sample_id, label, vec, {"text": text, "index": index, "group": group}
    )


def compute_auc(scores_pos: np.ndarray, scores_neg: np.ndarray) -> float:
    """AUC = P(random positive-class score > random negative-class score), Mann-Whitney U / (n_pos*n_neg)"""
    u_pos, _ = mannwhitneyu(scores_pos, scores_neg, alternative="two-sided")
    return float(u_pos / (len(scores_pos) * len(scores_neg)))


def band_composition(
    band_entries: list[dict], anchor_ids: set[str], heldout_ids: set[str]
) -> dict:
    anchor_n = sum(1 for e in band_entries if e["id"] in anchor_ids)
    heldout_n = sum(1 for e in band_entries if e["id"] in heldout_ids)
    other_n = len(band_entries) - anchor_n - heldout_n
    return {
        "anchor_n": anchor_n,
        "heldout_n": heldout_n,
        "other_n": other_n,
        "precision": (anchor_n + heldout_n) / len(band_entries),
    }


def main() -> None:
    samples = load_jsonl(DATASET_PATH / "samples.jsonl")
    id_to_sample = {s["id"]: s for s in samples}
    compact_embeddings = np.load(DATASET_PATH / "compact_embeddings.npy", mmap_mode="r")

    manifest = json.loads(
        (RESULTS_DIR / "axis_pairs_manifest.json").read_text(encoding="utf-8")
    )

    rng = np.random.default_rng(BACKGROUND_SEED)
    all_indices = np.arange(len(samples))
    noise_mask = np.array([bool(s.get("is_noise")) for s in samples])

    summary_pairs = []
    points_out = {"pairs": []}

    for pair in manifest["pairs"]:
        pnum = pair["pair"]
        ca = pair["clusters"]["cluster_a"]
        cb = pair["clusters"]["cluster_b"]
        print(f"\nPair {pnum}: {pair['label']}")

        anchors_a, heldout_a = ca["anchors"], ca["heldout"]
        anchors_b, heldout_b = cb["anchors"], cb["heldout"]
        used_indices = {
            p["index"] for p in anchors_a + heldout_a + anchors_b + heldout_b
        }

        candidate_mask = ~noise_mask
        candidate_mask[list(used_indices)] = False
        candidates = all_indices[candidate_mask]
        background_indices = rng.choice(candidates, size=N_BACKGROUND, replace=False)

        points = []
        anchor_a_ids, anchor_b_ids = [], []
        for p in anchors_a:
            points.append(
                make_point(
                    p["id"], p["text"], p["index"], compact_embeddings, "anchor_a"
                )
            )
            anchor_a_ids.append(p["id"])
        for p in anchors_b:
            points.append(
                make_point(
                    p["id"], p["text"], p["index"], compact_embeddings, "anchor_b"
                )
            )
            anchor_b_ids.append(p["id"])
        for p in heldout_a:
            points.append(
                make_point(
                    p["id"], p["text"], p["index"], compact_embeddings, "heldout_a"
                )
            )
        for p in heldout_b:
            points.append(
                make_point(
                    p["id"], p["text"], p["index"], compact_embeddings, "heldout_b"
                )
            )
        for idx in background_indices:
            s = samples[int(idx)]
            points.append(
                make_point(
                    s["id"],
                    s.get("text", ""),
                    int(idx),
                    compact_embeddings,
                    "background",
                )
            )

        embedding_set = create_embedding_set(points)
        result = build_axis_projection(
            embedding_set,
            axis_group_a=anchor_a_ids,
            axis_group_b=anchor_b_ids,
            compute_labels=False,
        )

        id_to_score = {
            r["id"]: r["projection_score"] for r in result["axis_projection"]
        }
        heldout_a_ids = {p["id"] for p in heldout_a}
        heldout_b_ids = {p["id"] for p in heldout_b}
        scores_heldout_a = np.array([id_to_score[i] for i in heldout_a_ids])
        scores_heldout_b = np.array([id_to_score[i] for i in heldout_b_ids])
        auc = compute_auc(scores_heldout_b, scores_heldout_a)

        n_total = len(points)
        band_n = _support_band_size(n_total)
        sorted_desc = result["axis_projection"]
        band_b_entries = sorted_desc[:band_n]
        band_a_entries = list(reversed(sorted_desc[-band_n:]))
        band_a = band_composition(band_a_entries, set(anchor_a_ids), heldout_a_ids)
        band_b = band_composition(band_b_entries, set(anchor_b_ids), heldout_b_ids)

        axis_2 = None
        if result.get("axis_b_projection") is not None:
            ab_sorted = result["axis_b_projection"]
            top5 = [
                (e["id"], id_to_sample[e["id"]].get("text", "")) for e in ab_sorted[:5]
            ]
            bottom5 = [
                (e["id"], id_to_sample[e["id"]].get("text", "")) for e in ab_sorted[-5:]
            ]
            axis_2 = {
                "variance": result["axis_b_variance"],
                "keywords_a": result["axis_b_keywords_a"],
                "keywords_b": result["axis_b_keywords_b"],
                "top5_texts": top5,
                "bottom5_texts": bottom5,
            }

        summary_pairs.append(
            {
                "pair": pnum,
                "label": pair["label"],
                "cluster_a": {
                    "id": ca["cluster_id"],
                    "theme": ca["theme"],
                    "n_anchor": len(anchors_a),
                    "n_heldout": len(heldout_a),
                },
                "cluster_b": {
                    "id": cb["cluster_id"],
                    "theme": cb["theme"],
                    "n_anchor": len(anchors_b),
                    "n_heldout": len(heldout_b),
                },
                "n_total_loaded": n_total,
                "auc_heldout_separation": auc,
                "support_band_size": band_n,
                "band_a": band_a,
                "band_b": band_b,
                "axis_1_keywords_a": result["axis_keywords_a"],
                "axis_1_keywords_b": result["axis_keywords_b"],
                "axis_2": axis_2,
            }
        )
        print(f"  AUC (heldout separation): {auc:.4f}")
        print(
            f"  band_a precision: {band_a['precision']:.4f} (anchor={band_a['anchor_n']} heldout={band_a['heldout_n']} other={band_a['other_n']})"
        )
        print(
            f"  band_b precision: {band_b['precision']:.4f} (anchor={band_b['anchor_n']} heldout={band_b['heldout_n']} other={band_b['other_n']})"
        )
        if axis_2:
            print(
                f"  axis_2 variance: {axis_2['variance']:.4f}, keywords A/B: {axis_2['keywords_a']} / {axis_2['keywords_b']}"
            )

        points_out["pairs"].append(
            {
                "pair": pnum,
                "anchor_a": [
                    {"id": p["id"], "index": p["index"], "score": id_to_score[p["id"]]}
                    for p in anchors_a
                ],
                "anchor_b": [
                    {"id": p["id"], "index": p["index"], "score": id_to_score[p["id"]]}
                    for p in anchors_b
                ],
                "heldout_a": [
                    {"id": p["id"], "index": p["index"], "score": id_to_score[p["id"]]}
                    for p in heldout_a
                ],
                "heldout_b": [
                    {"id": p["id"], "index": p["index"], "score": id_to_score[p["id"]]}
                    for p in heldout_b
                ],
                "background": [
                    {
                        "id": samples[int(idx)]["id"],
                        "index": int(idx),
                        "score": id_to_score[samples[int(idx)]["id"]],
                    }
                    for idx in background_indices
                ],
            }
        )

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    summary_path = RESULTS_DIR / "axis_projection_summary.json"
    summary_path.write_text(
        json.dumps({"pairs": summary_pairs}, indent=2), encoding="utf-8"
    )
    print(f"\nWrote {summary_path}")

    points_path = RESULTS_DIR / "axis_projection_points.json"
    points_path.write_text(json.dumps(points_out, indent=2), encoding="utf-8")
    print(f"Wrote {points_path}")


if __name__ == "__main__":
    main()
