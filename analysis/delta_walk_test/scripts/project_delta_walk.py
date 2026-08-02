"""Project Delta Walk directions and walks into the real dataset's embedding space.

For each of the 3 directions, transforms A's and B's real compact embeddings
and each walk's saved embeddings.npy through the dataset's own RUNTIME 2D and 3D reducers

Only computes and saves coordinates (JSON)
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

from core.projection_ops import (  # noqa: E402
    load_projection_strategy,
    load_reducer,
    reducer_backend_for_strategy,
    reducer_path,
)

ROOT = test_root(__file__)
RUNS_DIR = ROOT / "runs"
RESULTS_DIR = results_dir(__file__)
MANIFEST_PATH = ROOT / "direction_manifest.json"

DATASET_PATH = dataset_path("gustavosta_sd_prompts_v2_two_pass")
BACKGROUND_SAMPLE_SIZE = 800
BACKGROUND_SEED = 42


def main() -> None:
    strategy = load_projection_strategy(DATASET_PATH)
    backend = reducer_backend_for_strategy(strategy)
    print(f"Dataset strategy: {strategy} (backend: {backend})")

    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))

    gt_samples = load_jsonl(DATASET_PATH / "samples.jsonl")
    gt_id_to_idx = {s["id"]: i for i, s in enumerate(gt_samples)}
    gt_embeddings = np.load(DATASET_PATH / "compact_embeddings.npy")

    results: dict[str, dict] = {
        "2d": {"background": [], "directions": {}},
        "3d": {"background": [], "directions": {}},
    }

    for dim in ("2d", "3d"):
        model_path = reducer_path(DATASET_PATH, strategy, dim)
        reducer = load_reducer(model_path, backend=backend)

        full_coords = np.load(DATASET_PATH / f"umap_{dim}.npy")
        if dim == "2d":
            # 2D shows the directions' overall position relative to the whole dataset
            results[dim]["background"] = full_coords.tolist()
        else:
            # 3D is zoomed into each direction's own local neighborhood
            rng = np.random.default_rng(BACKGROUND_SEED)
            sample_idx = rng.choice(
                full_coords.shape[0], size=BACKGROUND_SAMPLE_SIZE, replace=False
            )
            results[dim]["background"] = full_coords[sample_idx].tolist()

        for direction in manifest["directions"]:
            dnum = direction["direction"]
            a_idx = gt_id_to_idx[direction["point_a"]["real_id"]]
            b_idx = gt_id_to_idx[direction["point_b"]["real_id"]]
            a_vec = np.asarray(gt_embeddings[a_idx], dtype=np.float32).reshape(1, -1)
            b_vec = np.asarray(gt_embeddings[b_idx], dtype=np.float32).reshape(1, -1)
            a_coord = reducer.transform(a_vec)[0]
            b_coord = reducer.transform(b_vec)[0]

            walks: dict[str, list] = {}
            for walk in direction["walks"]:
                embeddings = np.load(
                    RUNS_DIR / walk["run_id"] / "embeddings.npy"
                ).astype(np.float32)
                coords = reducer.transform(embeddings)
                walks[walk["context"]] = coords.tolist()
                print(f"  [{dim}] direction {dnum} {walk['context']}: {coords.shape}")

            results[dim]["directions"][str(dnum)] = {
                "label": direction["label"],
                "point_a": a_coord.tolist(),
                "point_b": b_coord.tolist(),
                "walks": walks,
            }

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out_path = RESULTS_DIR / "delta_walk_projections.json"
    out_path.write_text(json.dumps(results, indent=2))
    print(f"\nWrote {out_path}")


if __name__ == "__main__":
    main()
