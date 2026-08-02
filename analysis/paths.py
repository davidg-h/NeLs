"""Shared path resolution and small IO helpers for analysis/ scripts."""

import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PLUGIN_ROOT = REPO_ROOT / "comfyui-nels-plugin"
COMFYUI_ROOT = REPO_ROOT / "comfyUI-portable" / "ComfyUI-windows-portable" / "ComfyUI"


def setup_plugin_imports(*, comfyui: bool = False) -> None:
    """Add the plugin (and optionally ComfyUI) root to sys.path"""
    roots = (PLUGIN_ROOT, COMFYUI_ROOT) if comfyui else (PLUGIN_ROOT,)
    for root in roots:
        if str(root) not in sys.path:
            sys.path.insert(0, str(root))


def dataset_path(name: str) -> Path:
    return REPO_ROOT / "datasets" / name


def test_root(test_file: str) -> Path:
    """Root of the calling test folder, e.g. analysis/axis_projection_test"""
    return Path(test_file).resolve().parent.parent


def results_dir(test_file: str, *, under: str | None = None) -> Path:
    """Results dir for a script at analysis/<test>/scripts/<file>.py

    `under` handles test folders whose results live in a subdirectory
    (e.g. dataset_strategy_test uses artifacts/results, not results/)
    """
    root = test_root(test_file)
    return root / under / "results" if under else root / "results"


def figures_dir(override: str | None = None) -> Path:
    """Output directory for generated thesis figures, overridable via --figures-dir"""
    return Path(override) if override else REPO_ROOT / "manuscript" / "figures"


def load_jsonl(path: Path) -> list[dict]:
    with path.open(encoding="utf-8") as f:
        return [json.loads(line) for line in f]
