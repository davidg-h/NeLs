"""Render the figures from analyze_interpolation.py's saved output.

Reads only results/interpolation_summary.json, results/interpolation_per_step.csv, and the
already-generated step images under runs/
"""

import argparse
import csv
import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import figures_dir, results_dir, test_root  # noqa: E402
from analysis.plotting import COLOR_TEXT, add_figures_dir_arg, apply_plot_style  # noqa: E402

ROOT = test_root(__file__)
RUNS_DIR = ROOT / "runs"
RESULTS_DIR = results_dir(__file__)
MANIFEST_PATH = ROOT / "pair_manifest.json"
FIGURES_DIR = figures_dir()

COLOR_LERP = "#2a78d6"  # blue
COLOR_SLERP = "#008300"  # green

TIER_ORDER = ["high", "medium", "low"]
TIER_LABELS = {"high": "high", "medium": "medium", "low": "low"}

apply_plot_style(grid=True)


def plot_tier_trend(summary: dict) -> None:
    per_tier = summary["per_tier"]
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9, 3.6))

    x = range(len(TIER_ORDER))
    for op, color, marker in (("lerp", COLOR_LERP, "o"), ("slerp", COLOR_SLERP, "^")):
        lpips_vals = [per_tier[t][op]["lpips_mean"] for t in TIER_ORDER]
        cos_vals = [per_tier[t][op]["cosine_similarity_mean"] for t in TIER_ORDER]
        ax1.plot(
            x,
            lpips_vals,
            color=color,
            linewidth=2,
            marker=marker,
            markersize=7,
            label=op,
        )
        ax2.plot(
            x, cos_vals, color=color, linewidth=2, marker=marker, markersize=7, label=op
        )

    ax1.set_xticks(list(x))
    ax1.set_xticklabels(TIER_ORDER)
    ax1.set_xlabel("Prompt-pair similarity tier")
    ax1.set_ylabel("Mean step-to-step LPIPS")
    ax1.set_title("Perceptual distance", fontsize=10, color=COLOR_TEXT)
    ax1.legend(frameon=False, fontsize=8)

    ax2.set_xticks(list(x))
    ax2.set_xticklabels(TIER_ORDER)
    ax2.set_xlabel("Prompt-pair similarity tier")
    ax2.set_ylabel("Mean step-to-step cosine similarity")
    ax2.set_title("Embedding continuity", fontsize=10, color=COLOR_TEXT)
    ax2.legend(frameon=False, fontsize=8)

    fig.suptitle(
        "Trajectory smoothness vs. prompt-pair similarity",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.94))

    out_path = FIGURES_DIR / "interpolation-tier-trend.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


def plot_step_profile(per_step_path: Path) -> None:
    rows = list(csv.DictReader(per_step_path.open(encoding="utf-8")))
    for row in rows:
        row["step_lpips"] = float(
            row["step_lpips"] if "step_lpips" in row else row["lpips"]
        )
        row["step_cosine_similarity"] = float(
            row["step_cosine_similarity"]
            if "step_cosine_similarity" in row
            else row["cosine_similarity"]
        )
        row["alpha_from"] = float(row["alpha_from"])
        row["alpha_to"] = float(row["alpha_to"])

    fig, axes = plt.subplots(2, 3, figsize=(12, 6), sharex=True)
    x_positions = [0, 1, 2, 3]

    for col, tier in enumerate(TIER_ORDER):
        for op, color, marker in (
            ("lerp", COLOR_LERP, "o"),
            ("slerp", COLOR_SLERP, "^"),
        ):
            tier_op_rows = [
                r for r in rows if r["tier"] == tier and r["operation"] == op
            ]
            # average the two pairs in this tier at each of the 4 step transitions
            by_step: dict[tuple, list[float]] = {}
            by_step_cos: dict[tuple, list[float]] = {}
            for r in tier_op_rows:
                key = (r["alpha_from"], r["alpha_to"])
                by_step.setdefault(key, []).append(r["step_lpips"])
                by_step_cos.setdefault(key, []).append(r["step_cosine_similarity"])
            steps_sorted = sorted(by_step.keys())
            lpips_avg = [sum(by_step[k]) / len(by_step[k]) for k in steps_sorted]
            cos_avg = [sum(by_step_cos[k]) / len(by_step_cos[k]) for k in steps_sorted]

            axes[0, col].plot(
                x_positions,
                lpips_avg,
                color=color,
                linewidth=2,
                marker=marker,
                markersize=6,
                label=op,
            )
            axes[1, col].plot(
                x_positions,
                cos_avg,
                color=color,
                linewidth=2,
                marker=marker,
                markersize=6,
                label=op,
            )

        labels = [f"{a:.2g}→{b:.2g}" for a, b in steps_sorted]
        axes[0, col].set_xticks(x_positions)
        axes[0, col].set_xticklabels(labels, fontsize=8)
        axes[1, col].set_xticks(x_positions)
        axes[1, col].set_xticklabels(labels, fontsize=8)
        axes[0, col].set_title(TIER_LABELS[tier], fontsize=10, color=COLOR_TEXT)

    axes[0, 0].set_ylabel("LPIPS")
    axes[1, 0].set_ylabel("Cosine similarity")
    axes[1, 1].set_xlabel("Step transition (alpha)")
    axes[0, 0].legend(frameon=False, fontsize=8)

    fig.suptitle(
        "Per-step trajectory profile, averaged over the two pairs per tier",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.95))

    out_path = FIGURES_DIR / "interpolation-step-profile.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


def plot_strip(pair: dict, out_name: str) -> None:
    alphas = [0.0, 0.25, 0.5, 0.75, 1.0]
    fig, axes = plt.subplots(2, 5, figsize=(11, 4.6))

    for row, op in enumerate(("lerp", "slerp")):
        run_dir = RUNS_DIR / pair["run_ids"][op]
        for col, alpha in enumerate(alphas):
            img_path = run_dir / f"step_{col:03d}_alpha_{alpha:.3f}.png"
            img = Image.open(img_path)
            ax = axes[row, col]
            ax.imshow(img)
            ax.set_xticks([])
            ax.set_yticks([])
            for spine in ax.spines.values():
                spine.set_visible(False)
            if row == 0:
                ax.set_title(f"α={alpha:.2f}", fontsize=9, color=COLOR_TEXT)
        axes[row, 0].set_ylabel(op, fontsize=10, color=COLOR_TEXT)

    fig.suptitle(
        f"Pair {pair['pair']} ({pair['tier']} similarity tier)",
        fontsize=10,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.93))

    out_path = FIGURES_DIR / out_name
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


def main() -> None:
    global FIGURES_DIR
    parser = argparse.ArgumentParser()
    add_figures_dir_arg(parser)
    args = parser.parse_args()
    FIGURES_DIR = figures_dir(args.figures_dir)
    FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    summary = json.loads(
        (RESULTS_DIR / "interpolation_summary.json").read_text(encoding="utf-8")
    )
    plot_tier_trend(summary)
    plot_step_profile(RESULTS_DIR / "interpolation_per_step.csv")

    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    pairs_by_number = {p["pair"]: p for p in manifest["pairs"]}

    plot_strip(pairs_by_number[2], "interpolation-strip-high.png")
    plot_strip(pairs_by_number[4], "interpolation-strip-medium.png")
    plot_strip(pairs_by_number[5], "interpolation-strip-low.png")


if __name__ == "__main__":
    main()
