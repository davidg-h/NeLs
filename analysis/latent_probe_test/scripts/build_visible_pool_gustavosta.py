"""Build a 200-point held-out split and visible reference pool for `gustavosta_sd_prompts_v2_two_pass`.

Same no-refit approach as build_visible_pool.py: 200 points are
excluded from a copy of the dataset's own already-computed umap_2d.npy/umap_3d.npy/
compact_embeddings.npy/samples.jsonl
"""

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import dataset_path, load_jsonl, results_dir, test_root  # noqa: E402

SOURCE_DATASET = dataset_path("gustavosta_sd_prompts_v2_two_pass")
ROOT = test_root(__file__)
OUT_DIR = ROOT / "visible_pool_dataset_gustavosta"
RESULTS_DIR = results_dir(__file__)

N_HELDOUT = 200
SEED = 42


def main() -> None:
    samples = load_jsonl(SOURCE_DATASET / "samples.jsonl")
    n = len(samples)
    rng = np.random.default_rng(SEED)
    heldout_idx = rng.choice(n, size=N_HELDOUT, replace=False)
    heldout_mask = np.zeros(n, dtype=bool)
    heldout_mask[heldout_idx] = True
    visible_idx = np.where(~heldout_mask)[0]

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    dataset_json = json.loads(
        (SOURCE_DATASET / "dataset.json").read_text(encoding="utf-8")
    )
    dataset_json["name"] = "gustavosta_sd_prompts_v2_two_pass_visible_pool"
    dataset_json["sample_count"] = int(len(visible_idx))
    (OUT_DIR / "dataset.json").write_text(
        json.dumps(dataset_json, indent=2), encoding="utf-8"
    )

    for arr_name in ("umap_2d.npy", "umap_3d.npy", "compact_embeddings.npy"):
        arr = np.load(SOURCE_DATASET / arr_name, mmap_mode="r")
        np.save(OUT_DIR / arr_name, np.asarray(arr[visible_idx]))

    filtered_samples = [samples[i] for i in visible_idx]
    with (OUT_DIR / "samples.jsonl").open("w", encoding="utf-8") as f:
        for s in filtered_samples:
            f.write(json.dumps(s) + "\n")

    heldout_ids = [samples[i]["id"] for i in heldout_idx]
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    (RESULTS_DIR / "heldout_ids_gustavosta.json").write_text(
        json.dumps(heldout_ids, indent=2), encoding="utf-8"
    )

    print(f"Visible pool: {len(filtered_samples)} points -> {OUT_DIR}")
    print(
        f"Held-out: {len(heldout_ids)} points recorded -> {RESULTS_DIR / 'heldout_ids_gustavosta.json'}"
    )


if __name__ == "__main__":
    main()
