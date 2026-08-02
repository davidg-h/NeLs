"""Select anchor/held-out points for Semantic Axis Projection test.

For each axis pair, two source clusters (already assigned by the dataset's own two_pass
build) are split into an anchor set to define Group A/Group B and a held-out set, used only to check
whether the resulting axis separates points it never saw.
"""

import json
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import dataset_path, load_jsonl, results_dir  # noqa: E402

DATASET_PATH = dataset_path("gustavosta_sd_prompts_v2_two_pass")
RESULTS_DIR = results_dir(__file__)

ANCHOR_N = 20
SEED = 42

# Cluster themes identified by inspecting samples.jsonl this session
PAIRS = [
    {
        "pair": 1,
        "label": "cyberpunk vs. steampunk",
        "cluster_a": {"id": 23, "theme": "steampunk"},
        "cluster_b": {"id": 70, "theme": "cyberpunk"},
    },
    {
        "pair": 2,
        "label": "dragon/monster creatures vs. fairytale architecture",
        "cluster_a": {"id": 99, "theme": "dragon/monster creatures"},
        "cluster_b": {"id": 109, "theme": "fairytale architecture and interiors"},
    },
]


def main() -> None:
    samples = load_jsonl(DATASET_PATH / "samples.jsonl")
    by_cluster: dict[int, list[dict]] = {}
    for i, s in enumerate(samples):
        if s.get("is_noise"):
            continue
        cid = s.get("cluster_global")
        by_cluster.setdefault(cid, []).append(
            {"id": s["id"], "index": i, "text": s.get("text", "")}
        )

    rng = random.Random(SEED)
    manifest_pairs = []
    for pair in PAIRS:
        entry = {"pair": pair["pair"], "label": pair["label"], "clusters": {}}
        for side, cluster in (
            ("cluster_a", pair["cluster_a"]),
            ("cluster_b", pair["cluster_b"]),
        ):
            members = list(by_cluster[cluster["id"]])
            rng.shuffle(members)
            anchors = members[:ANCHOR_N]
            heldout = members[ANCHOR_N:]
            entry["clusters"][side] = {
                "cluster_id": cluster["id"],
                "theme": cluster["theme"],
                "n_total": len(members),
                "n_anchor": len(anchors),
                "n_heldout": len(heldout),
                "anchors": anchors,
                "heldout": heldout,
            }
        manifest_pairs.append(entry)
        print(
            f"Pair {pair['pair']} ({pair['label']}): "
            f"A={pair['cluster_a']['theme']} ({entry['clusters']['cluster_a']['n_anchor']}/"
            f"{entry['clusters']['cluster_a']['n_heldout']} anchor/heldout), "
            f"B={pair['cluster_b']['theme']} ({entry['clusters']['cluster_b']['n_anchor']}/"
            f"{entry['clusters']['cluster_b']['n_heldout']} anchor/heldout)"
        )

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out_path = RESULTS_DIR / "axis_pairs_manifest.json"
    out_path.write_text(
        json.dumps({"pairs": manifest_pairs}, indent=2), encoding="utf-8"
    )
    print(f"\nWrote {out_path}")


if __name__ == "__main__":
    main()
