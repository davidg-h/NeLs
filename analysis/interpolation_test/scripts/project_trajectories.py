"""Project representative LERP/SLERP trajectories into the real dataset's embedding space

For the same three representative pairs used in the image strips (2/high, 4/medium, 5/low),
transforms each run's saved embeddings.npy through gustavosta_sd_prompts_v2_two_pass's own
RUNTIME 2D and 3D reducers

Only computes and saves coordinates here (JSON)
"""

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import dataset_path, results_dir, setup_plugin_imports, test_root  # noqa: E402

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
MANIFEST_PATH = ROOT / "pair_manifest.json"

DATASET_PATH = dataset_path("gustavosta_sd_prompts_v2_two_pass")
BACKGROUND_SAMPLE_SIZE = 800
BACKGROUND_SEED = 42

REPRESENTATIVE_PAIRS = [2, 4, 5]


def main() -> None:
    strategy = load_projection_strategy(DATASET_PATH)
    backend = reducer_backend_for_strategy(strategy)
    print(f"Dataset strategy: {strategy} (backend: {backend})")

    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    pairs_by_number = {p["pair"]: p for p in manifest["pairs"]}

    results: dict[str, dict] = {
        "2d": {"background": [], "trajectories": {}},
        "3d": {"background": [], "trajectories": {}},
    }

    for dim in ("2d", "3d"):
        model_path = reducer_path(DATASET_PATH, strategy, dim)
        reducer = load_reducer(model_path, backend=backend)

        full_coords = np.load(DATASET_PATH / f"umap_{dim}.npy")
        if dim == "2d":
            # 2D shows the trajectories' overall position relative to the whole dataset,
            results[dim]["background"] = full_coords.tolist()
        else:
            # 3D is zoomed into each trajectory's own local neighborhood
            rng = np.random.default_rng(BACKGROUND_SEED)
            sample_idx = rng.choice(
                full_coords.shape[0], size=BACKGROUND_SAMPLE_SIZE, replace=False
            )
            results[dim]["background"] = full_coords[sample_idx].tolist()

        for pair_num in REPRESENTATIVE_PAIRS:
            pair = pairs_by_number[pair_num]
            for op, run_id in pair["run_ids"].items():
                embeddings = np.load(RUNS_DIR / run_id / "embeddings.npy").astype(
                    np.float32
                )
                coords = reducer.transform(embeddings)
                key = f"pair{pair_num}_{op}"
                results[dim]["trajectories"][key] = {
                    "pair": pair_num,
                    "tier": pair["tier"],
                    "operation": op,
                    "coords": coords.tolist(),
                }
                print(f"  [{dim}] {key}: {coords.shape}")

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out_path = RESULTS_DIR / "trajectory_projections.json"
    out_path.write_text(json.dumps(results, indent=2))
    print(f"\nWrote {out_path}")


if __name__ == "__main__":
    main()
