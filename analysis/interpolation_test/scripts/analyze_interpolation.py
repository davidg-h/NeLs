"""LERP vs SLERP held-out trajectory analysis

For each of the 12 runs (6 prompt pairs x lerp/slerp), computes two step-to-step metrics
between consecutive trajectory frames:
  - LPIPS: perceptual distance between consecutive generated images
  - cosine similarity: between consecutive steps compact embeddings

Aggregates per run, per pair, and per similarity tier (high/medium/low, see pair_manifest.json)
to compare LERP vs SLERP smoothness, and whether that depends on how close the two endpoint
prompts are
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
MANIFEST_PATH = ROOT / "pair_manifest.json"


def load_image_tensor(path: Path) -> torch.Tensor:
    """Load a PNG as a [-1, 1]-normalized (1, 3, H, W) float tensor for LPIPS"""
    img = Image.open(path).convert("RGB")
    arr = np.asarray(img, dtype=np.float32) / 255.0
    tensor = torch.from_numpy(arr).permute(2, 0, 1).unsqueeze(0)
    return tensor * 2.0 - 1.0


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))


def analyze_run(run_dir: Path, loss_fn: lpips.LPIPS) -> tuple[dict, list[dict]]:
    meta = json.loads((run_dir / "metadata.json").read_text(encoding="utf-8"))
    embeddings = np.load(run_dir / "embeddings.npy")
    image_paths = sorted(run_dir.glob("step_*.png"))
    if len(image_paths) != embeddings.shape[0]:
        raise ValueError(
            f"{run_dir.name}: {len(image_paths)} images but {embeddings.shape[0]} embedding rows"
        )

    images = [load_image_tensor(p) for p in image_paths]
    alphas = meta["alpha_schedule"]

    step_lpips: list[float] = []
    step_cosine: list[float] = []
    with torch.no_grad():
        for i in range(len(images) - 1):
            step_lpips.append(float(loss_fn(images[i], images[i + 1]).item()))
            step_cosine.append(cosine_similarity(embeddings[i], embeddings[i + 1]))

    per_step = [
        {
            "run_id": meta["run_id"],
            "operation": meta["operation"],
            "alpha_from": alphas[i],
            "alpha_to": alphas[i + 1],
            "lpips": step_lpips[i],
            "cosine_similarity": step_cosine[i],
        }
        for i in range(len(step_lpips))
    ]

    peak_idx = int(np.argmax(step_lpips))
    trough_idx = int(np.argmin(step_cosine))
    summary = {
        "run_id": meta["run_id"],
        "operation": meta["operation"],
        "source_point_ids": meta["source_point_ids"],
        "source_texts": meta["source_texts"],
        "step_lpips": step_lpips,
        "step_cosine_similarity": step_cosine,
        "lpips_mean": float(np.mean(step_lpips)),
        "lpips_max": float(np.max(step_lpips)),
        "lpips_max_step": {
            "alpha_from": alphas[peak_idx],
            "alpha_to": alphas[peak_idx + 1],
        },
        "cosine_similarity_mean": float(np.mean(step_cosine)),
        "cosine_similarity_min": float(np.min(step_cosine)),
        "cosine_similarity_min_step": {
            "alpha_from": alphas[trough_idx],
            "alpha_to": alphas[trough_idx + 1],
        },
    }
    return summary, per_step


def main() -> None:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    loss_fn = lpips.LPIPS()

    per_run: dict[str, dict] = {}
    all_per_step: list[dict] = []
    for pair in manifest["pairs"]:
        for op, run_id in pair["run_ids"].items():
            print(f"Analyzing {run_id}...")
            summary, per_step = analyze_run(RUNS_DIR / run_id, loss_fn)
            summary["pair"] = pair["pair"]
            summary["tier"] = pair["tier"]
            for row in per_step:
                row["pair"] = pair["pair"]
                row["tier"] = pair["tier"]
            per_run[run_id] = summary
            all_per_step.extend(per_step)
            print(
                f"  lpips_mean={summary['lpips_mean']:.4f}  "
                f"cosine_similarity_mean={summary['cosine_similarity_mean']:.4f}"
            )

    # Per-tier aggregate: lerp vs slerp, averaged over the two pairs in each tier
    tier_runs: dict[str, dict[str, list[dict]]] = {}
    for pair in manifest["pairs"]:
        bucket = tier_runs.setdefault(pair["tier"], {"lerp": [], "slerp": []})
        for op, run_id in pair["run_ids"].items():
            bucket[op].append(per_run[run_id])

    per_tier: dict[str, dict[str, dict]] = {}
    print("\nPer-tier summary (mean across both pairs in each tier):")
    for tier in ("high", "medium", "low"):
        if tier not in tier_runs:
            continue
        per_tier[tier] = {}
        for op in ("lerp", "slerp"):
            runs = tier_runs[tier][op]
            agg = {
                "lpips_mean": float(np.mean([r["lpips_mean"] for r in runs])),
                "cosine_similarity_mean": float(
                    np.mean([r["cosine_similarity_mean"] for r in runs])
                ),
                # Mean of each runs worst single step, not the mean over all steps
                "lpips_max_mean": float(np.mean([r["lpips_max"] for r in runs])),
                "cosine_similarity_min_mean": float(
                    np.mean([r["cosine_similarity_min"] for r in runs])
                ),
            }
            per_tier[tier][op] = agg
            print(
                f"  {tier:8s} {op:5s}: lpips_mean={agg['lpips_mean']:.4f}  "
                f"lpips_max_mean={agg['lpips_max_mean']:.4f}  "
                f"cosine_sim_mean={agg['cosine_similarity_mean']:.4f}  "
                f"cosine_sim_min_mean={agg['cosine_similarity_min_mean']:.4f}"
            )

    print("\nPeak-step location per run (where the single worst LPIPS jump occurs):")
    for run_id, summary in per_run.items():
        step = summary["lpips_max_step"]
        print(
            f"  {run_id:20s} peak at alpha {step['alpha_from']:.2f}->{step['alpha_to']:.2f}  "
            f"(lpips_max={summary['lpips_max']:.4f})"
        )

    results = {"per_run": per_run, "per_tier": per_tier}

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    summary_path = RESULTS_DIR / "interpolation_summary.json"
    summary_path.write_text(json.dumps(results, indent=2))
    print(f"\nWrote {summary_path}")

    per_step_path = RESULTS_DIR / "interpolation_per_step.csv"
    with per_step_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(all_per_step[0].keys()))
        writer.writeheader()
        writer.writerows(all_per_step)
    print(f"Wrote {per_step_path}")


if __name__ == "__main__":
    main()
