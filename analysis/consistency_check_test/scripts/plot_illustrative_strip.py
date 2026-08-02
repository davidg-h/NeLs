"""Compose the illustrative image strip from the 4 already-rendered PNGs.

Reads only results/illustrative_render_manifest.json and the PNGs it references.
"""

import argparse
import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import figures_dir, results_dir  # noqa: E402
from analysis.plotting import COLOR_TEXT, add_figures_dir_arg  # noqa: E402

RESULTS_DIR = results_dir(__file__)
FIGURES_DIR = figures_dir()

LABELS = {
    "seed.png": "seed (α=0)\ncluster: Hyperrealistic Celebrity Art",
    "strength_0.2.png": "strength=0.2\n(word dropout)\ncluster: Star Wars Concept Art",
    "strength_0.35.png": "strength=0.35\n(LLM minor)\ncluster: Star Wars Concept Art",
    "strength_0.7_0.9.png": "strength=0.7/0.9\n(LLM aggressive)\ncluster: Star Wars Concept Art",
}


def main() -> None:
    global FIGURES_DIR
    parser = argparse.ArgumentParser()
    add_figures_dir_arg(parser)
    args = parser.parse_args()
    FIGURES_DIR = figures_dir(args.figures_dir)
    manifest = json.loads(
        (RESULTS_DIR / "illustrative_render_manifest.json").read_text(encoding="utf-8")
    )
    files = [img["file"] for img in manifest["images"]]

    fig, axes = plt.subplots(1, len(files), figsize=(14, 4.2))
    for ax, fname in zip(axes, files, strict=True):
        img = Image.open(RESULTS_DIR / fname)
        ax.imshow(img)
        ax.set_xticks([])
        ax.set_yticks([])
        for spine in ax.spines.values():
            spine.set_visible(False)
        ax.set_title(LABELS[fname], fontsize=10, color=COLOR_TEXT)

    fig.suptitle(
        'Seed "medium" (Dwayne Johnson lightsaber), images rendered from the exact variant texts measured in the sweep',
        fontsize=10.5,
        color=COLOR_TEXT,
    )
    fig.tight_layout(rect=(0, 0, 1, 0.9))

    out_path = FIGURES_DIR / "consistency-check-illustrative-strip.png"
    fig.savefig(out_path, dpi=220)
    plt.close(fig)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
