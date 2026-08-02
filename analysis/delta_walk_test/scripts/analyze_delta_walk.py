"""Delta Walk direction-transfer analysis

For each of the 6 walks (3 directions x near/far starting context), computes two families of
step-to-step measures across the seven alpha steps (-2, -1, 0, 1, 2, 3, 4):
  - consecutive: LPIPS/cosine similarity between each pair of adjacent steps -> shows local smoothness along the extrapolation
  - baseline-relative: LPIPS/cosine similarity between each step and the alpha=0 step -> shows how far a step has drifted from C d

Analysis only - assumes all 6 runs under runs/ already exist using ComfyUI graph system and save run node
"""

import csv
import json
import sys
from pathlib import Path

import lpips
import numpy as np
import torch
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import results_dir, test_root  # noqa: E402

ROOT = test_root(__file__)
RUNS_DIR = ROOT / "runs"
RESULTS_DIR = results_dir(__file__)
MANIFEST_PATH = ROOT / "direction_manifest.json"

LPIPS_NET = "alex"


def load_image_tensor(path: Path) -> torch.Tensor:
    """Load a PNG as a [-1, 1]-normalized (1, 3, H, W) float tensor for LPIPS"""
    img = Image.open(path).convert("RGB")
    arr = np.asarray(img, dtype=np.float32) / 255.0
    tensor = torch.from_numpy(arr).permute(2, 0, 1).unsqueeze(0)
    return tensor * 2.0 - 1.0


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))


def analyze_walk(
    run_dir: Path, loss_fn: lpips.LPIPS
) -> tuple[dict, list[dict], list[dict]]:
    meta = json.loads((run_dir / "metadata.json").read_text(encoding="utf-8"))
    embeddings = np.load(run_dir / "embeddings.npy")
    image_paths = sorted(run_dir.glob("step_*.png"))
    if len(image_paths) != embeddings.shape[0]:
        raise ValueError(
            f"{run_dir.name}: {len(image_paths)} images but {embeddings.shape[0]} embedding rows"
        )

    images = [load_image_tensor(p) for p in image_paths]
    alphas = meta["alpha_schedule"]
    zero_idx = alphas.index(0.0)

    consecutive_rows: list[dict] = []
    with torch.no_grad():
        for i in range(len(images) - 1):
            consecutive_rows.append(
                {
                    "run_id": meta["run_id"],
                    "alpha_from": alphas[i],
                    "alpha_to": alphas[i + 1],
                    "lpips": float(loss_fn(images[i], images[i + 1]).item()),
                    "cosine_similarity": cosine_similarity(
                        embeddings[i], embeddings[i + 1]
                    ),
                }
            )

    baseline_rows: list[dict] = []
    with torch.no_grad():
        for i in range(len(images)):
            baseline_rows.append(
                {
                    "run_id": meta["run_id"],
                    "alpha": alphas[i],
                    "lpips_from_baseline": float(
                        loss_fn(images[zero_idx], images[i]).item()
                    ),
                    "cosine_similarity_to_baseline": cosine_similarity(
                        embeddings[zero_idx], embeddings[i]
                    ),
                }
            )

    consecutive_lpips = [r["lpips"] for r in consecutive_rows]
    consecutive_cos = [r["cosine_similarity"] for r in consecutive_rows]
    peak_idx = int(np.argmax(consecutive_lpips))
    summary = {
        "run_id": meta["run_id"],
        "source_point_ids": meta["source_point_ids"],
        "source_texts": meta["source_texts"],
        "consecutive_lpips_mean": float(np.mean(consecutive_lpips)),
        "consecutive_lpips_max": float(np.max(consecutive_lpips)),
        "consecutive_lpips_max_step": {
            "alpha_from": consecutive_rows[peak_idx]["alpha_from"],
            "alpha_to": consecutive_rows[peak_idx]["alpha_to"],
        },
        "consecutive_cosine_similarity_mean": float(np.mean(consecutive_cos)),
        "consecutive_cosine_similarity_min": float(np.min(consecutive_cos)),
        "baseline_lpips_by_alpha": {
            str(r["alpha"]): r["lpips_from_baseline"] for r in baseline_rows
        },
        "baseline_cosine_by_alpha": {
            str(r["alpha"]): r["cosine_similarity_to_baseline"] for r in baseline_rows
        },
        "baseline_lpips_max": float(
            max(r["lpips_from_baseline"] for r in baseline_rows)
        ),
        "baseline_lpips_max_alpha": max(
            baseline_rows, key=lambda r: r["lpips_from_baseline"]
        )["alpha"],
    }
    return summary, consecutive_rows, baseline_rows


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    loss_fn = lpips.LPIPS(net=LPIPS_NET)

    per_walk: dict[str, dict] = {}
    all_consecutive: list[dict] = []
    all_baseline: list[dict] = []

    for direction in manifest["directions"]:
        for walk in direction["walks"]:
            run_id = walk["run_id"]
            print(f"Analyzing {run_id}...")
            summary, consecutive_rows, baseline_rows = analyze_walk(
                RUNS_DIR / run_id, loss_fn
            )
            summary["direction"] = direction["direction"]
            summary["direction_label"] = direction["label"]
            summary["context"] = walk["context"]
            for row in consecutive_rows:
                row["direction"] = direction["direction"]
                row["context"] = walk["context"]
            for row in baseline_rows:
                row["direction"] = direction["direction"]
                row["context"] = walk["context"]
            per_walk[run_id] = summary
            all_consecutive.extend(consecutive_rows)
            all_baseline.extend(baseline_rows)
            print(
                f"  consecutive lpips_mean={summary['consecutive_lpips_mean']:.4f}  "
                f"baseline lpips_max={summary['baseline_lpips_max']:.4f} "
                f"at alpha={summary['baseline_lpips_max_alpha']}"
            )

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    summary_path = RESULTS_DIR / "delta_walk_summary.json"
    summary_path.write_text(json.dumps({"per_walk": per_walk}, indent=2))
    print(f"\nWrote {summary_path}")

    consecutive_path = RESULTS_DIR / "delta_walk_consecutive_steps.csv"
    with consecutive_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(all_consecutive[0].keys()))
        writer.writeheader()
        writer.writerows(all_consecutive)
    print(f"Wrote {consecutive_path}")

    baseline_path = RESULTS_DIR / "delta_walk_baseline_steps.csv"
    with baseline_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(all_baseline[0].keys()))
        writer.writeheader()
        writer.writerows(all_baseline)
    print(f"Wrote {baseline_path}")


if __name__ == "__main__":
    main()
