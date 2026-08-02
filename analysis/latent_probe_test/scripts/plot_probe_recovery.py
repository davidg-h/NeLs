"""Render the Test A figure from run_probe_recovery.py's saved output"""

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
    COLOR_TEXT_SECONDARY,
    add_figures_dir_arg,
    apply_plot_style,
)

RESULTS_DIR = results_dir(__file__)
FIGURES_DIR = figures_dir()

COLOR_2D = "#2a78d6"
COLOR_3D = "#008300"

apply_plot_style(grid=True)

PANELS = [
    (
        "probe_recovery_summary.json",
        "random_pair_baseline.json",
        "ImageNet-1k (template-heavy)",
    ),
    (
        "probe_recovery_summary_gustavosta.json",
        "random_pair_baseline_gustavosta.json",
        "gustavosta (natural language)",
    ),
]


def plot_panel(ax, recovery_file: str, baseline_file: str, title: str) -> None:
    data = json.loads((RESULTS_DIR / recovery_file).read_text(encoding="utf-8"))
    baseline = json.loads((RESULTS_DIR / baseline_file).read_text(encoding="utf-8"))
    pts = data["per_point"]
    c2d = np.array([p["recovery_cosine_2d"] for p in pts])
    c3d = np.array([p["recovery_cosine_3d"] for p in pts])

    lo = min(c2d.min(), c3d.min(), baseline["mean"] - 3 * baseline["std"]) - 0.005
    bins = np.linspace(lo, 1.0, 40)
    ax.axvspan(
        baseline["mean"] - baseline["std"],
        baseline["mean"] + baseline["std"],
        color=COLOR_AXIS,
        alpha=0.3,
        zorder=0,
        label="random-pair baseline (±1 SD)",
    )
    ax.axvline(
        baseline["mean"],
        color=COLOR_TEXT_SECONDARY,
        linewidth=1.4,
        linestyle="--",
        zorder=1,
    )
    ax.hist(
        c2d,
        bins=bins,
        color=COLOR_2D,
        alpha=0.65,
        label=f"2D probe (mean {c2d.mean():.4f})",
    )
    ax.hist(
        c3d,
        bins=bins,
        color=COLOR_3D,
        alpha=0.65,
        label=f"3D probe (mean {c3d.mean():.4f})",
    )
    ax.set_xlabel("cosine similarity: q vs. true embedding")
    ax.set_title(title, fontsize=10, color=COLOR_TEXT)
    ax.legend(frameon=False, fontsize=8)


def main() -> None:
    global FIGURES_DIR
    parser = argparse.ArgumentParser()
    add_figures_dir_arg(parser)
    args = parser.parse_args()
    FIGURES_DIR = figures_dir(args.figures_dir)
    FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    fig, axes = plt.subplots(1, 2, figsize=(13, 4.5))
    for ax, (recovery_file, baseline_file, title) in zip(axes, PANELS, strict=True):
        plot_panel(ax, recovery_file, baseline_file, title)
    axes[0].set_ylabel("count (of 200 held-out points)")

    fig.suptitle(
        "Latent Probe held-out embedding-recovery test, two datasets",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.93))

    out_path = FIGURES_DIR / "latent-probe-recovery-histogram.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
