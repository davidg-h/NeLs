"""Render the sweep figure from run_consistency_sweep.py's saved output.

Reads only results/consistency_sweep_summary.json for the plot.
"""

import argparse
import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt

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

COLORS = {"short": "#2a78d6", "medium": "#008300", "long": "#eb6834"}

apply_plot_style(grid=True)


def main() -> None:
    global FIGURES_DIR
    parser = argparse.ArgumentParser()
    add_figures_dir_arg(parser)
    args = parser.parse_args()
    FIGURES_DIR = figures_dir(args.figures_dir)
    FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    data = json.loads(
        (RESULTS_DIR / "consistency_sweep_summary.json").read_text(encoding="utf-8")
    )
    runs = data["runs"]
    seed_word_counts = {r["seed_label"]: r["seed_word_count"] for r in runs}

    fig, axes = plt.subplots(2, 1, figsize=(8, 8), sharex=True)

    for seed_label, color in COLORS.items():
        seed_runs = sorted(
            (r for r in runs if r["seed_label"] == seed_label),
            key=lambda r: r["strength"],
        )
        strengths = [r["strength"] for r in seed_runs]
        sc = [r["consistency_score"] for r in seed_runs]
        stability = [r["cluster_stability"] for r in seed_runs]
        label = f"{seed_label} ({seed_word_counts[seed_label]} words)"
        axes[0].plot(
            strengths,
            sc,
            color=color,
            linewidth=2,
            marker="o",
            markersize=6,
            label=label,
        )
        axes[1].plot(
            strengths,
            stability,
            color=color,
            linewidth=2,
            marker="o",
            markersize=6,
            label=label,
        )

    for ax in axes:
        ax.axvline(0.35, color=COLOR_AXIS, linewidth=1.4, linestyle="--")
        ax.axvline(0.4, color=COLOR_AXIS, linewidth=1, linestyle=":")
        ax.axvline(0.7, color=COLOR_AXIS, linewidth=1, linestyle=":")

    axes[0].set_ylabel("consistency score")
    axes[1].set_ylabel("cluster stability")
    axes[1].set_xlabel(
        "variation strength\n(dashed: word-dropout -> LLM boundary; dotted: LLM style-tier boundaries at 0.4/0.7)"
    )
    axes[0].legend(frameon=False, fontsize=9, loc="upper left")

    fig.suptitle(
        "Consistency Check strength sweep, three seed prompts of different length",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.96))

    out_path = FIGURES_DIR / "consistency-check-strength-sweep.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
