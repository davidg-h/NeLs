"""Random-pair cosine-similarity baseline for `gustavosta_sd_prompts_v2_two_pass`

Same procedure as compute_random_baseline.py
"""

import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import dataset_path, results_dir  # noqa: E402

SOURCE_DATASET = dataset_path("gustavosta_sd_prompts_v2_two_pass")
RESULTS_DIR = results_dir(__file__)

N_PAIRS = 2000
SEED = 42


def main() -> None:
    compact = np.load(SOURCE_DATASET / "compact_embeddings.npy", mmap_mode="r")
    rng = np.random.default_rng(SEED)
    n = len(compact)
    idx_a = rng.choice(n, N_PAIRS, replace=True)
    idx_b = rng.choice(n, N_PAIRS, replace=True)
    mask = idx_a != idx_b
    a = np.asarray(compact[idx_a[mask]], dtype=np.float32)
    b = np.asarray(compact[idx_b[mask]], dtype=np.float32)
    a /= np.linalg.norm(a, axis=1, keepdims=True)
    b /= np.linalg.norm(b, axis=1, keepdims=True)
    sims = (a * b).sum(axis=1)

    summary = {
        "n_pairs": int(mask.sum()),
        "mean": float(sims.mean()),
        "median": float(np.median(sims)),
        "std": float(sims.std()),
        "min": float(sims.min()),
        "max": float(sims.max()),
    }
    print(json.dumps(summary, indent=2))

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out_path = RESULTS_DIR / "random_pair_baseline_gustavosta.json"
    out_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(f"\nWrote {out_path}")


if __name__ == "__main__":
    main()
