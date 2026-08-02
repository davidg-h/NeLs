"""Render the primary axis-1 projection-score distributions.

This is the visualization of the held-out AUC result from analyze_axis_projection.py
Reads only results/axis_projection_summary.json and results/axis_projection_points.json.
"""

import argparse
import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import figures_dir, results_dir  # noqa: E402
from analysis.plotting import (  # noqa: E402
    COLOR_AXIS,
    COLOR_TEXT,
    add_figures_dir_arg,
    apply_plot_style,
)

RESULTS_DIR = results_dir(__file__)
FIGURES_DIR = figures_dir()

COLOR_A = "#2a78d6"  # blue, cluster A
COLOR_B = "#eb6834"  # orange, cluster B

apply_plot_style(grid=True)


def main() -> None:
    global FIGURES_DIR
    parser = argparse.ArgumentParser()
    add_figures_dir_arg(parser)
    args = parser.parse_args()
    FIGURES_DIR = figures_dir(args.figures_dir)
    FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    summary = json.loads(
        (RESULTS_DIR / "axis_projection_summary.json").read_text(encoding="utf-8")
    )
    points = json.loads(
        (RESULTS_DIR / "axis_projection_points.json").read_text(encoding="utf-8")
    )
    summary_by_pair = {p["pair"]: p for p in summary["pairs"]}

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.5))
    for ax, pair in zip(axes, points["pairs"], strict=True):
        s = summary_by_pair[pair["pair"]]
        scores_a = np.array([e["score"] for e in pair["heldout_a"]])
        scores_b = np.array([e["score"] for e in pair["heldout_b"]])
        anchor_scores_a = np.array([e["score"] for e in pair["anchor_a"]])
        anchor_scores_b = np.array([e["score"] for e in pair["anchor_b"]])

        lo = min(
            scores_a.min(), scores_b.min(), anchor_scores_a.min(), anchor_scores_b.min()
        )
        hi = max(
            scores_a.max(), scores_b.max(), anchor_scores_a.max(), anchor_scores_b.max()
        )
        bins = np.linspace(lo, hi, 50)

        ax.hist(scores_a, bins=bins, color=COLOR_A, alpha=0.65, label="held-out A")
        ax.hist(scores_b, bins=bins, color=COLOR_B, alpha=0.65, label="held-out B")

        ax.axvline(0, color=COLOR_AXIS, linewidth=1, linestyle=":")
        ax.scatter(
            anchor_scores_a,
            np.zeros_like(anchor_scores_a) - 0.02 * ax.get_ylim()[1],
            marker="|",
            color=COLOR_A,
            s=1,
        )
        y_top = ax.get_ylim()[1]
        ax.scatter(
            anchor_scores_a,
            np.full_like(anchor_scores_a, -0.03 * y_top),
            marker="^",
            color=COLOR_A,
            s=25,
            clip_on=False,
            label="anchor A",
        )
        ax.scatter(
            anchor_scores_b,
            np.full_like(anchor_scores_b, -0.03 * y_top),
            marker="^",
            color=COLOR_B,
            s=25,
            clip_on=False,
            label="anchor B",
        )

        ax.set_title(s["label"], fontsize=10, color=COLOR_TEXT)
        ax.set_xlabel("axis-1 projection score")
    axes[0].set_ylabel("count (held-out points)")

    handles, labels = axes[0].get_legend_handles_labels()
    fig.legend(
        handles,
        labels,
        loc="lower center",
        ncol=4,
        frameon=False,
        fontsize=8,
        bbox_to_anchor=(0.5, 0.0),
    )

    fig.suptitle(
        "Axis-1 projection-score distribution, held-out cluster members (triangles: 20 anchor points per side)",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0.08, 1, 0.93))

    out_path = FIGURES_DIR / "axis-projection-score-distribution.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
