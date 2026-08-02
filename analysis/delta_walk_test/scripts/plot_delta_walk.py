"""Render the figures from analyze_delta_walk.py's saved output.

Reads only results/delta_walk_summary.json, results/delta_walk_{consecutive,baseline}_steps.csv,
and the already-generated step images under runs/
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
from analysis.plotting import (  # noqa: E402
    COLOR_AXIS,
    COLOR_TEXT,
    add_figures_dir_arg,
    apply_plot_style,
)

ROOT = test_root(__file__)
RUNS_DIR = ROOT / "runs"
RESULTS_DIR = results_dir(__file__)
MANIFEST_PATH = ROOT / "direction_manifest.json"
FIGURES_DIR = figures_dir()

COLOR_NEAR = "#2a78d6"  # blue
COLOR_FAR = "#eb6834"  # orange

ALPHAS = [-2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0]

apply_plot_style(grid=True)


def plot_baseline_drift(manifest: dict, summary: dict) -> None:
    directions = manifest["directions"]
    fig, axes = plt.subplots(2, 3, figsize=(13, 6.5), sharex=True)

    for col, direction in enumerate(directions):
        for walk in direction["walks"]:
            run_id = walk["run_id"]
            s = summary["per_walk"][run_id]
            color = COLOR_NEAR if walk["context"] == "near" else COLOR_FAR
            lpips_by_alpha = s["baseline_lpips_by_alpha"]
            cos_by_alpha = s["baseline_cosine_by_alpha"]
            lpips_vals = [lpips_by_alpha[str(a)] for a in ALPHAS]
            cos_vals = [cos_by_alpha[str(a)] for a in ALPHAS]
            axes[0, col].plot(
                ALPHAS,
                lpips_vals,
                color=color,
                linewidth=2,
                marker="o",
                markersize=6,
                label=walk["context"],
            )
            axes[1, col].plot(
                ALPHAS,
                cos_vals,
                color=color,
                linewidth=2,
                marker="o",
                markersize=6,
                label=walk["context"],
            )

        axes[0, col].axvline(0, color=COLOR_AXIS, linewidth=1, linestyle=":")
        axes[0, col].axvline(1, color=COLOR_AXIS, linewidth=1, linestyle=":")
        axes[1, col].axvline(0, color=COLOR_AXIS, linewidth=1, linestyle=":")
        axes[1, col].axvline(1, color=COLOR_AXIS, linewidth=1, linestyle=":")
        axes[0, col].set_title(
            f"Direction {direction['direction']}", fontsize=10, color=COLOR_TEXT
        )
        axes[1, col].set_ylim(0.75, 1.0)

    axes[0, 0].set_ylabel("LPIPS from α=0")
    axes[1, 0].set_ylabel("Cosine sim. to α=0")
    axes[1, 1].set_xlabel("α (dotted lines mark α=0 and α=1)")
    axes[0, 0].legend(frameon=False, fontsize=8)

    fig.suptitle(
        "Drift from the unmodified starting point C as the direction is scaled by α",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.94))

    out_path = FIGURES_DIR / "delta-walk-baseline-drift.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


def plot_step_profile(manifest: dict) -> None:
    rows = list(
        csv.DictReader(
            (RESULTS_DIR / "delta_walk_consecutive_steps.csv").open(encoding="utf-8")
        )
    )
    for row in rows:
        row["lpips"] = float(row["lpips"])
        row["cosine_similarity"] = float(row["cosine_similarity"])
        row["alpha_from"] = float(row["alpha_from"])
        row["alpha_to"] = float(row["alpha_to"])
        row["direction"] = int(row["direction"])

    directions = manifest["directions"]
    fig, axes = plt.subplots(2, 3, figsize=(13, 6), sharex=True)
    x_positions = list(range(6))

    for col, direction in enumerate(directions):
        dnum = direction["direction"]
        for walk in direction["walks"]:
            context = walk["context"]
            color = COLOR_NEAR if context == "near" else COLOR_FAR
            walk_rows = [
                r for r in rows if r["direction"] == dnum and r["context"] == context
            ]
            walk_rows.sort(key=lambda r: r["alpha_from"])
            lpips_vals = [r["lpips"] for r in walk_rows]
            cos_vals = [r["cosine_similarity"] for r in walk_rows]
            axes[0, col].plot(
                x_positions,
                lpips_vals,
                color=color,
                linewidth=2,
                marker="o",
                markersize=6,
                label=context,
            )
            axes[1, col].plot(
                x_positions,
                cos_vals,
                color=color,
                linewidth=2,
                marker="o",
                markersize=6,
                label=context,
            )

        labels = [f"{r['alpha_from']:.0f}→{r['alpha_to']:.0f}" for r in walk_rows]
        axes[0, col].set_xticks(x_positions)
        axes[0, col].set_xticklabels(labels, fontsize=8)
        axes[1, col].set_xticks(x_positions)
        axes[1, col].set_xticklabels(labels, fontsize=8)
        axes[0, col].set_title(f"Direction {dnum}", fontsize=10, color=COLOR_TEXT)

    axes[0, 0].set_ylabel("LPIPS")
    axes[1, 0].set_ylabel("Cosine similarity")
    axes[1, 1].set_xlabel("Step transition (alpha)")
    axes[0, 0].legend(frameon=False, fontsize=8)

    fig.suptitle(
        "Per-step (consecutive) LPIPS and cosine similarity profile",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.94))

    out_path = FIGURES_DIR / "delta-walk-step-profile.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


def plot_strip(direction: dict, out_name: str) -> None:
    fig, axes = plt.subplots(2, 7, figsize=(15, 4.6))

    for row, walk in enumerate(direction["walks"]):
        run_dir = RUNS_DIR / walk["run_id"]
        for col, alpha in enumerate(ALPHAS):
            img_path = run_dir / f"step_{col:03d}_alpha_{alpha:.3f}.png"
            img = Image.open(img_path)
            ax = axes[row, col]
            ax.imshow(img)
            ax.set_xticks([])
            ax.set_yticks([])
            for spine in ax.spines.values():
                spine.set_visible(False)
            if row == 0:
                ax.set_title(f"α={alpha:.0f}", fontsize=9, color=COLOR_TEXT)
        axes[row, 0].set_ylabel(walk["context"], fontsize=10, color=COLOR_TEXT)

    fig.suptitle(
        f"Direction {direction['direction']}: {direction['label']}",
        fontsize=10,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.92))

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
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    summary = json.loads(
        (RESULTS_DIR / "delta_walk_summary.json").read_text(encoding="utf-8")
    )

    plot_baseline_drift(manifest, summary)
    plot_step_profile(manifest)

    for direction in manifest["directions"]:
        plot_strip(direction, f"delta-walk-strip-direction{direction['direction']}.png")


if __name__ == "__main__":
    main()
