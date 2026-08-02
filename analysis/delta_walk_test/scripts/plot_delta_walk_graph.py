"""Render the 2D and 3D direction-transfer figures from project_delta_walk.py's saved output.

Reads only results/delta_walk_projections.json
"""

import argparse
import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import figures_dir, results_dir  # noqa: E402
from analysis.plotting import (  # noqa: E402
    COLOR_GRID,
    COLOR_TEXT,
    add_figures_dir_arg,
    apply_plot_style,
)

RESULTS_DIR = results_dir(__file__)
FIGURES_DIR = figures_dir()

COLOR_DIRECTION = (
    "#0b0b0b"  # the A->B reference arrow, in ink black to stand apart from the
)
# walk paths themselves
COLOR_NEAR = "#2a78d6"  # blue
COLOR_FAR = "#eb6834"  # orange
COLOR_BACKGROUND = "#c3c2b7"

apply_plot_style()


def plot_2d(data: dict) -> None:
    background = data["background"]
    bg_x = [p[0] for p in background]
    bg_y = [p[1] for p in background]

    directions = data["directions"]
    fig, axes = plt.subplots(1, 3, figsize=(13, 4.6))
    for ax, (dnum, d) in zip(
        axes, sorted(directions.items(), key=lambda kv: int(kv[0])), strict=True
    ):
        ax.scatter(
            bg_x,
            bg_y,
            s=6,
            color=COLOR_BACKGROUND,
            alpha=0.4,
            linewidths=0,
            label="Dataset (sample)",
        )

        a, b = d["point_a"], d["point_b"]
        ax.annotate(
            "",
            xy=(b[0], b[1]),
            xytext=(a[0], a[1]),
            arrowprops={
                "arrowstyle": "-|>",
                "color": COLOR_DIRECTION,
                "linewidth": 2,
                "shrinkA": 0,
                "shrinkB": 0,
            },
            zorder=4,
        )
        ax.scatter(
            [a[0]], [a[1]], s=45, color=COLOR_DIRECTION, marker="s", zorder=5, label="A"
        )
        ax.scatter(
            [b[0]], [b[1]], s=45, color=COLOR_DIRECTION, marker="D", zorder=5, label="B"
        )

        for context, color, marker in (
            ("near", COLOR_NEAR, "o"),
            ("far", COLOR_FAR, "^"),
        ):
            coords = d["walks"][context]
            xs = [p[0] for p in coords]
            ys = [p[1] for p in coords]
            ax.plot(
                xs,
                ys,
                color=color,
                linewidth=1.6,
                marker=marker,
                markersize=6,
                label=f"walk ({context})",
                zorder=3,
            )

        ax.set_title(f"Direction {dnum}", fontsize=10, color=COLOR_TEXT)
        ax.set_xlabel("UMAP dim. 1")
        ax.grid(color=COLOR_GRID, linewidth=0.8)
        for spine in ("top", "right"):
            ax.spines[spine].set_visible(False)
    axes[0].set_ylabel("UMAP dim. 2")
    axes[0].legend(frameon=False, fontsize=7.5, loc="best")

    fig.suptitle(
        "Delta Walk direction (A->B, black) vs. near/far walk paths, runtime 2D projection",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.93))

    out_path = FIGURES_DIR / "delta-walk-trajectory-graph-2d.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


def plot_3d(data: dict) -> None:
    background = data["background"]
    bg_x = [p[0] for p in background]
    bg_y = [p[1] for p in background]
    bg_z = [p[2] for p in background]

    directions = data["directions"]
    fig = plt.figure(figsize=(15, 5))
    for i, (dnum, d) in enumerate(
        sorted(directions.items(), key=lambda kv: int(kv[0]))
    ):
        ax = fig.add_subplot(1, 3, i + 1, projection="3d")
        ax.scatter(
            bg_x,
            bg_y,
            bg_z,
            s=5,
            color=COLOR_BACKGROUND,
            alpha=0.3,
            linewidths=0,
            label="Dataset (sample)",
        )

        walk_points = []
        for context, color, marker in (
            ("near", COLOR_NEAR, "o"),
            ("far", COLOR_FAR, "^"),
        ):
            coords = d["walks"][context]
            walk_points.extend(coords)
            xs = [p[0] for p in coords]
            ys = [p[1] for p in coords]
            zs = [p[2] for p in coords]
            ax.plot(
                xs,
                ys,
                zs,
                color=color,
                linewidth=1.6,
                marker=marker,
                markersize=5,
                label=f"walk ({context})",
            )

        # Zoom to the two walks own neighborhood only
        for axis_idx, set_lim in enumerate((ax.set_xlim, ax.set_ylim, ax.set_zlim)):
            values = [p[axis_idx] for p in walk_points]
            lo, hi = min(values), max(values)
            span = hi - lo
            margin = span * 0.5 if span > 1e-6 else 0.5
            set_lim(lo - margin, hi + margin)

        ax.set_title(f"Direction {dnum}", fontsize=10, color=COLOR_TEXT)
        ax.set_xlabel("dim. 1", fontsize=8)
        ax.set_ylabel("dim. 2", fontsize=8)
        ax.set_zlabel("dim. 3", fontsize=8)
        ax.tick_params(labelsize=7)
        if i == 0:
            ax.legend(frameon=False, fontsize=7.5, loc="upper left")

    fig.suptitle(
        "Delta Walk near/far walk paths, runtime 3D projection, zoomed to each walk's own neighborhood",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.93))

    out_path = FIGURES_DIR / "delta-walk-trajectory-graph-3d.png"
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
    data = json.loads(
        (RESULTS_DIR / "delta_walk_projections.json").read_text(encoding="utf-8")
    )
    plot_2d(data["2d"])
    plot_3d(data["3d"])


if __name__ == "__main__":
    main()
