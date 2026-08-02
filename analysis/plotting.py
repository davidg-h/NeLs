"""Shared matplotlib styling for analysis/ plot scripts."""

import argparse

import matplotlib.pyplot as plt

COLOR_TEXT = "#0b0b0b"
COLOR_TEXT_SECONDARY = "#52514e"
COLOR_GRID = "#e1e0d9"
COLOR_AXIS = "#c3c2b7"


def apply_plot_style(*, grid: bool = False) -> None:
    """Base figure chrome shared by all analysis plot scripts

    `grid` adds the global grid/spine settings used by scripts that don't
    draw their grid/spines manually per-axes
    """
    style = {
        "font.family": "sans-serif",
        "text.color": COLOR_TEXT,
        "axes.edgecolor": COLOR_AXIS,
        "axes.labelcolor": COLOR_TEXT_SECONDARY,
        "xtick.color": COLOR_TEXT_SECONDARY,
        "ytick.color": COLOR_TEXT_SECONDARY,
        "figure.facecolor": "white",
        "axes.facecolor": "white",
        "savefig.facecolor": "white",
    }
    if grid:
        style.update(
            {
                "axes.grid": True,
                "grid.color": COLOR_GRID,
                "grid.linewidth": 0.8,
                "axes.spines.top": False,
                "axes.spines.right": False,
            }
        )
    plt.rcParams.update(style)


def add_figures_dir_arg(parser: argparse.ArgumentParser) -> None:
    parser.add_argument(
        "--figures-dir",
        default=None,
        help="Override output directory for generated figures (default: manuscript/figures)",
    )
