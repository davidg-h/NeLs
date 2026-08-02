"""Render the 2D and 3D trajectory-in-embedding-space figures from project_trajectories.py's
saved output. Reads only results/trajectory_projections.json
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

COLOR_LERP = "#2a78d6"  # blue
COLOR_SLERP = "#008300"  # green
COLOR_BACKGROUND = "#c3c2b7"

REPRESENTATIVE_PAIRS = [2, 4, 5]
TIER_BY_PAIR = {2: "high", 4: "medium", 5: "low"}

apply_plot_style()


def plot_2d(data: dict) -> None:
    background = data["background"]
    bg_x = [p[0] for p in background]
    bg_y = [p[1] for p in background]

    fig, axes = plt.subplots(1, 3, figsize=(13, 4.4))
    for ax, pair_num in zip(axes, REPRESENTATIVE_PAIRS, strict=True):
        ax.scatter(
            bg_x,
            bg_y,
            s=6,
            color=COLOR_BACKGROUND,
            alpha=0.4,
            linewidths=0,
            label="Dataset (all points)",
        )
        for op, color, marker in (
            ("lerp", COLOR_LERP, "o"),
            ("slerp", COLOR_SLERP, "^"),
        ):
            traj = data["trajectories"][f"pair{pair_num}_{op}"]["coords"]
            xs = [p[0] for p in traj]
            ys = [p[1] for p in traj]
            ax.plot(
                xs,
                ys,
                color=color,
                linewidth=1.6,
                marker=marker,
                markersize=7,
                label=op,
                zorder=3,
            )
        ax.set_title(
            f"Pair {pair_num} ({TIER_BY_PAIR[pair_num]})", fontsize=10, color=COLOR_TEXT
        )
        ax.set_xlabel("UMAP dim. 1")
        ax.grid(color=COLOR_GRID, linewidth=0.8)
        for spine in ("top", "right"):
            ax.spines[spine].set_visible(False)
    axes[0].set_ylabel("UMAP dim. 2")
    axes[0].legend(frameon=False, fontsize=8, loc="best")

    fig.suptitle(
        "LERP/SLERP trajectories in gustavosta_sd_prompts_v2_two_pass's runtime 2D projection",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.93))

    out_path = FIGURES_DIR / "interpolation-trajectory-graph-2d.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


def plot_3d(data: dict) -> None:
    background = data["background"]
    bg_x = [p[0] for p in background]
    bg_y = [p[1] for p in background]
    bg_z = [p[2] for p in background]

    fig = plt.figure(figsize=(15, 5))
    for i, pair_num in enumerate(REPRESENTATIVE_PAIRS):
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

        # limits are set to the trajectory's own bounding box plus a margin
        all_traj_points = [
            p
            for op in ("lerp", "slerp")
            for p in data["trajectories"][f"pair{pair_num}_{op}"]["coords"]
        ]
        for op, color, marker in (
            ("lerp", COLOR_LERP, "o"),
            ("slerp", COLOR_SLERP, "^"),
        ):
            traj = data["trajectories"][f"pair{pair_num}_{op}"]["coords"]
            xs = [p[0] for p in traj]
            ys = [p[1] for p in traj]
            zs = [p[2] for p in traj]
            ax.plot(
                xs,
                ys,
                zs,
                color=color,
                linewidth=1.6,
                marker=marker,
                markersize=6,
                label=op,
            )

        for axis_idx, set_lim in enumerate((ax.set_xlim, ax.set_ylim, ax.set_zlim)):
            values = [p[axis_idx] for p in all_traj_points]
            lo, hi = min(values), max(values)
            span = hi - lo
            margin = span * 0.6 if span > 1e-6 else 2.0
            set_lim(lo - margin, hi + margin)

        ax.set_title(
            f"Pair {pair_num} ({TIER_BY_PAIR[pair_num]})", fontsize=10, color=COLOR_TEXT
        )
        ax.set_xlabel("dim. 1", fontsize=8)
        ax.set_ylabel("dim. 2", fontsize=8)
        ax.set_zlabel("dim. 3", fontsize=8)
        ax.tick_params(labelsize=7)
        if i == 0:
            ax.legend(frameon=False, fontsize=8, loc="upper left")

    fig.suptitle(
        "LERP/SLERP trajectories in gustavosta_sd_prompts_v2_two_pass's runtime 3D projection",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.93))

    out_path = FIGURES_DIR / "interpolation-trajectory-graph-3d.png"
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
        (RESULTS_DIR / "trajectory_projections.json").read_text(encoding="utf-8")
    )
    plot_2d(data["2d"])
    plot_3d(data["3d"])


if __name__ == "__main__":
    main()
