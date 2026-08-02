"""Build the three 800-point training datasets (classic/two_pass/parametric) used to
test each projection strategy's runtime approximation accuracy.
"""

import subprocess
import sys
from pathlib import Path

from split_held_out import TRAIN_FILE, make_split

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import COMFYUI_ROOT, PLUGIN_ROOT, REPO_ROOT  # noqa: E402

PYTHON_EMBEDED = (
    REPO_ROOT
    / "comfyUI-portable"
    / "ComfyUI-windows-portable"
    / "python_embeded"
    / "python.exe"
)
ENCODE_CLI = PLUGIN_ROOT / "scripts" / "encode_cli.py"
CLIP_PATH = COMFYUI_ROOT / "models" / "text_encoders" / "qwen_3_4b.safetensors"

OUTPUT_ROOT = Path(__file__).resolve().parent.parent / "artifacts" / "datasets"

# Canonical params copied exactly from the existing imagenet1k_labels_* dataset.json files,
CANONICAL_ARGS = [
    "--umap-n-neighbors",
    "30",
    "--umap-min-dist",
    "0.2",
    "--umap-seed",
    "42",
    "--cluster-umap-dims",
    "10",
    "--cluster-umap-neighbors",
    "30",
    "--cluster-min-size",
    "10",
    "--cluster-min-samples",
    "3",
]

# Scaled proportionally from the existing two_pass build's runtime_subset_size=500/1000 (50%)
TWO_PASS_RUNTIME_ARGS = [
    "--runtime-subset-size",
    "400",
    "--runtime-subset-seed",
    "42",
    "--runtime-umap-n-neighbors",
    "20",
    "--runtime-umap-min-dist",
    "0.1",
    "--runtime-cluster-umap-dims",
    "10",
    "--runtime-cluster-umap-neighbors",
    "20",
]

STRATEGIES = ["classic", "two_pass", "parametric"]


def build_strategy(strategy: str) -> None:
    output_dir = OUTPUT_ROOT / f"imagenet1k_800train_{strategy}"
    cmd = [
        str(PYTHON_EMBEDED),
        str(ENCODE_CLI),
        "--comfyui-path",
        str(COMFYUI_ROOT),
        "create",
        "--clip",
        str(CLIP_PATH),
        "--clip-type",
        "FLUX2",
        "--input",
        str(TRAIN_FILE),
        "--encode-limit",
        "800",
        "--dedupe",
        *CANONICAL_ARGS,
        "--projection-strategy",
        strategy,
        "--output",
        str(output_dir),
    ]
    if strategy == "two_pass":
        cmd += TWO_PASS_RUNTIME_ARGS

    print(f"\n{'=' * 60}\nBuilding {strategy} -> {output_dir}\n{'=' * 60}")
    print(" ".join(cmd))
    result = subprocess.run(cmd)
    if result.returncode != 0:
        raise RuntimeError(
            f"encode_cli.py create failed for strategy={strategy!r} (exit {result.returncode})"
        )


def main() -> None:
    if not PYTHON_EMBEDED.exists():
        raise FileNotFoundError(f"python_embeded not found: {PYTHON_EMBEDED}")
    if not ENCODE_CLI.exists():
        raise FileNotFoundError(f"encode_cli.py not found: {ENCODE_CLI}")
    if not CLIP_PATH.exists():
        raise FileNotFoundError(f"CLIP model not found: {CLIP_PATH}")

    make_split()

    for strategy in STRATEGIES:
        build_strategy(strategy)

    print("\nAll three 800-point training datasets built successfully.")


if __name__ == "__main__":
    main()
