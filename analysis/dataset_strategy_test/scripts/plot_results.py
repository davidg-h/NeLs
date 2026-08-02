"""Render the two figures from analyze_accuracy.py's saved output.

Reads only artifacts/results/held_out_accuracy_summary.json and
held_out_accuracy_per_point.csv
"""

import argparse
import csv
import sys
from pathlib import Path

import matplotlib.pyplot as plt

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import figures_dir, results_dir  # noqa: E402
from analysis.plotting import COLOR_TEXT, add_figures_dir_arg, apply_plot_style  # noqa: E402

RESULTS_DIR = results_dir(__file__, under="artifacts")
FIGURES_DIR = figures_dir()

COLOR_CLASSIC = "#2a78d6"  # blue
COLOR_TWO_PASS = "#008300"  # green
COLOR_PARAMETRIC = "#e87ba4"  # magenta
COLOR_GT = "#898781"  # muted ink (ground truth points)

STRATEGY_COLORS = {
    "classic": COLOR_CLASSIC,
    "two_pass": COLOR_TWO_PASS,
    "parametric": COLOR_PARAMETRIC,
}
STRATEGY_LABELS = {
    "classic": "classic",
    "two_pass": "two_pass",
    "parametric": "parametric",
}

apply_plot_style(grid=True)


def plot_position_scatter(per_point_path: Path) -> None:
    rows_by_strategy: dict[str, list[dict]] = {
        "classic": [],
        "two_pass": [],
        "parametric": [],
    }
    with per_point_path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            rows_by_strategy[row["strategy"]].append(row)

    fig, axes = plt.subplots(1, 3, figsize=(12, 4.2))
    strategies = ["classic", "two_pass", "parametric"]

    for ax, strategy in zip(axes, strategies, strict=True):
        rows = rows_by_strategy[strategy]
        gt_x = [float(r["gt_2d_x"]) for r in rows]
        gt_y = [float(r["gt_2d_y"]) for r in rows]
        pred_x = [float(r["pred_2d_x"]) for r in rows]
        pred_y = [float(r["pred_2d_y"]) for r in rows]

        ax.scatter(
            gt_x,
            gt_y,
            s=18,
            marker="o",
            color=COLOR_GT,
            alpha=0.55,
            linewidths=0,
            label="Ground truth",
        )
        ax.scatter(
            pred_x,
            pred_y,
            s=22,
            marker="^",
            color=STRATEGY_COLORS[strategy],
            alpha=0.7,
            linewidths=0,
            label="Predicted (aligned)",
        )

        ax.set_title(STRATEGY_LABELS[strategy], fontsize=10, color=COLOR_TEXT)
        ax.set_xlabel("UMAP dim. 1")
        if strategy == "classic":
            ax.set_ylabel("UMAP dim. 2")
        ax.set_aspect("equal", adjustable="datalim")
        ax.legend(frameon=False, fontsize=7.5, loc="upper right")

    fig.suptitle(
        "Held-out points: ground-truth vs. runtime-predicted 2D position (per strategy)",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.94))

    out_path = FIGURES_DIR / "dataset-strategy-position-scatter.png"
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
    plot_position_scatter(RESULTS_DIR / "held_out_accuracy_per_point.csv")


if __name__ == "__main__":
    main()
