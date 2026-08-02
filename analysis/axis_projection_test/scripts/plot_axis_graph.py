"""Render the axis-projection graphs from analyze_axis_projection.py's saved output.

Reads only results/axis_projection_points.json and the dataset's own saved umap_2d.npy/
umap_3d.npy (canonical, already-computed positions) for the plot
"""

import argparse
import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import dataset_path, figures_dir, results_dir  # noqa: E402
from analysis.plotting import (  # noqa: E402
    COLOR_GRID,
    COLOR_TEXT,
    add_figures_dir_arg,
    apply_plot_style,
)

DATASET_PATH = dataset_path("gustavosta_sd_prompts_v2_two_pass")
RESULTS_DIR = results_dir(__file__)
FIGURES_DIR = figures_dir()

COLOR_A = "#2a78d6"  # blue, cluster A / heldout_a
COLOR_B = "#eb6834"  # orange, cluster B / heldout_b
COLOR_ARROW = "#0b0b0b"
COLOR_BACKGROUND = "#c3c2b7"

apply_plot_style()


def mean_coords(entries: list[dict], coords: np.ndarray) -> np.ndarray:
    idx = [e["index"] for e in entries]
    return coords[idx].mean(axis=0)


def zoom_limits(
    heldout: np.ndarray,
    anchors: np.ndarray,
    margin_frac: float,
    pct: tuple[float, float] = (5.0, 95.0),
) -> tuple[np.ndarray, np.ndarray]:
    """Per-axis zoom bounds from the held-out points' percentile range, widened to always
    include the anchor means, then padded by a margin"""
    lo = np.percentile(heldout, pct[0], axis=0)
    hi = np.percentile(heldout, pct[1], axis=0)
    lo = np.minimum(lo, anchors.min(axis=0))
    hi = np.maximum(hi, anchors.max(axis=0))
    span = hi - lo
    margin = np.where(span > 1e-6, span * margin_frac, 2.0)
    return lo - margin, hi + margin


def plot_2d(manifest_labels: dict, points: dict, coords_2d: np.ndarray) -> None:
    fig, axes = plt.subplots(1, 2, figsize=(11, 5))
    for ax, pair in zip(axes, points["pairs"], strict=True):
        bg_idx = [e["index"] for e in pair["background"]]
        ax.scatter(
            coords_2d[bg_idx, 0],
            coords_2d[bg_idx, 1],
            s=5,
            color=COLOR_BACKGROUND,
            alpha=0.4,
            linewidths=0,
            label="background (4000)",
        )

        ha_idx = [e["index"] for e in pair["heldout_a"]]
        hb_idx = [e["index"] for e in pair["heldout_b"]]
        ax.scatter(
            coords_2d[ha_idx, 0],
            coords_2d[ha_idx, 1],
            s=16,
            color=COLOR_A,
            alpha=0.75,
            linewidths=0,
            label="heldout A",
        )
        ax.scatter(
            coords_2d[hb_idx, 0],
            coords_2d[hb_idx, 1],
            s=16,
            color=COLOR_B,
            alpha=0.75,
            linewidths=0,
            label="heldout B",
        )

        mean_a = mean_coords(pair["anchor_a"], coords_2d)
        mean_b = mean_coords(pair["anchor_b"], coords_2d)
        ax.annotate(
            "",
            xy=(mean_b[0], mean_b[1]),
            xytext=(mean_a[0], mean_a[1]),
            arrowprops={
                "arrowstyle": "-|>",
                "color": COLOR_ARROW,
                "linewidth": 2,
                "shrinkA": 0,
                "shrinkB": 0,
            },
            zorder=5,
        )
        ax.scatter(
            [mean_a[0]],
            [mean_a[1]],
            s=70,
            color=COLOR_ARROW,
            marker="s",
            zorder=6,
            label="anchor A mean",
        )
        ax.scatter(
            [mean_b[0]],
            [mean_b[1]],
            s=70,
            color=COLOR_ARROW,
            marker="D",
            zorder=6,
            label="anchor B mean",
        )

        # Zoom to the held-out points' own neighborhood
        # Percentile-based (not min/max) so a single stray held-out point cannot stretch the box back out
        lo, hi = zoom_limits(
            np.vstack([coords_2d[ha_idx], coords_2d[hb_idx]]),
            np.vstack([mean_a, mean_b]),
            margin_frac=0.3,
        )
        ax.set_xlim(lo[0], hi[0])
        ax.set_ylim(lo[1], hi[1])

        ax.set_title(manifest_labels[pair["pair"]], fontsize=10, color=COLOR_TEXT)
        ax.set_xlabel("UMAP dim. 1")
        ax.grid(color=COLOR_GRID, linewidth=0.8)
        for spine in ("top", "right"):
            ax.spines[spine].set_visible(False)
    axes[0].set_ylabel("UMAP dim. 2")
    axes[0].legend(frameon=False, fontsize=7.5, loc="best")

    fig.suptitle(
        "Axis anchor direction (A->B, black) and held-out cluster members, canonical 2D projection",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.93))

    out_path = FIGURES_DIR / "axis-projection-graph-2d.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


def plot_3d(manifest_labels: dict, points: dict, coords_3d: np.ndarray) -> None:
    fig = plt.figure(figsize=(12, 5.5))
    for i, pair in enumerate(points["pairs"]):
        ax = fig.add_subplot(1, 2, i + 1, projection="3d")
        bg_idx = [e["index"] for e in pair["background"]]
        ax.scatter(
            coords_3d[bg_idx, 0],
            coords_3d[bg_idx, 1],
            coords_3d[bg_idx, 2],
            s=4,
            color=COLOR_BACKGROUND,
            alpha=0.3,
            linewidths=0,
            label="background",
        )

        ha_idx = [e["index"] for e in pair["heldout_a"]]
        hb_idx = [e["index"] for e in pair["heldout_b"]]
        ax.scatter(
            coords_3d[ha_idx, 0],
            coords_3d[ha_idx, 1],
            coords_3d[ha_idx, 2],
            s=6,
            color=COLOR_A,
            alpha=0.7,
            linewidths=0,
            label="heldout A",
        )
        ax.scatter(
            coords_3d[hb_idx, 0],
            coords_3d[hb_idx, 1],
            coords_3d[hb_idx, 2],
            s=6,
            color=COLOR_B,
            alpha=0.7,
            linewidths=0,
            label="heldout B",
        )

        mean_a = mean_coords(pair["anchor_a"], coords_3d)
        mean_b = mean_coords(pair["anchor_b"], coords_3d)
        ax.plot(
            [mean_a[0], mean_b[0]],
            [mean_a[1], mean_b[1]],
            [mean_a[2], mean_b[2]],
            color=COLOR_ARROW,
            linewidth=2,
            zorder=6,
        )
        ax.scatter(
            [mean_a[0]],
            [mean_a[1]],
            [mean_a[2]],
            s=45,
            color=COLOR_ARROW,
            marker="s",
            label="anchor A mean",
        )
        ax.scatter(
            [mean_b[0]],
            [mean_b[1]],
            [mean_b[2]],
            s=45,
            color=COLOR_ARROW,
            marker="D",
            label="anchor B mean",
        )

        lo, hi = zoom_limits(
            np.vstack([coords_3d[ha_idx], coords_3d[hb_idx]]),
            np.vstack([mean_a, mean_b]),
            margin_frac=0.25,
        )
        for axis_idx, set_lim in enumerate((ax.set_xlim, ax.set_ylim, ax.set_zlim)):
            set_lim(lo[axis_idx], hi[axis_idx])

        ax.set_title(manifest_labels[pair["pair"]], fontsize=10, color=COLOR_TEXT)
        ax.set_xlabel("dim. 1", fontsize=8)
        ax.set_ylabel("dim. 2", fontsize=8)
        ax.set_zlabel("dim. 3", fontsize=8)
        ax.tick_params(labelsize=7)
        if i == 0:
            ax.legend(frameon=False, fontsize=7.5, loc="upper left")

    fig.suptitle(
        "Axis anchor direction (A->B, black) and held-out cluster members, canonical 3D projection, zoomed to each pair's own neighborhood",
        fontsize=11,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.93))

    out_path = FIGURES_DIR / "axis-projection-graph-3d.png"
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
    manifest = json.loads(
        (RESULTS_DIR / "axis_pairs_manifest.json").read_text(encoding="utf-8")
    )
    points = json.loads(
        (RESULTS_DIR / "axis_projection_points.json").read_text(encoding="utf-8")
    )
    manifest_labels = {p["pair"]: p["label"] for p in manifest["pairs"]}

    coords_2d = np.load(DATASET_PATH / "umap_2d.npy")
    coords_3d = np.load(DATASET_PATH / "umap_3d.npy")

    plot_2d(manifest_labels, points, coords_2d)
    plot_3d(manifest_labels, points, coords_3d)


if __name__ == "__main__":
    main()
