"""
NELS dataset CLI:
encode prompts using ComfyUI model classes

No ComfyUI server required — models are loaded from .safetensors files using ComfyUIs
own infrastructure, producing embeddings byte-for-byte identical to those
created by ComfyUI encoder nodes

Subcommands:
  create   Encode a new prompt dataset
  add      Append new prompts to an existing dataset

ComfyUI root detection (in order):
  1. --comfyui-path flag (explicit path to ComfyUI root)
  2. COMFYUI_ROOT environment variable
  3. Auto-detect: 4 levels up from this file when plugin is inside custom_nodes/

Usage: Read the ENCODE_CLI.md documentation for detailed instructions
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path
from typing import Any

import numpy as np

# Bootstrap plugin root so core/ is importable at module load time
_PLUGIN_ROOT = Path(__file__).parent.parent
if str(_PLUGIN_ROOT) not in sys.path:
    sys.path.insert(0, str(_PLUGIN_ROOT))

from core.dataset_io import (
    load_dataset,
    resolve_dataset_path,
    save_dataset,
)
from core.dataset_ops import (
    finalize_dataset,
    load_texts_from_source,
    predict_cluster_for_new,
)
from core.defaults import (
    CLUSTER_MIN_SAMPLES,
    CLUSTER_MIN_SIZE,
    CLUSTER_UMAP_DIMS,
    CLUSTER_UMAP_NEIGHBORS,
    DEFAULT_DATASETS,
    ENCODE_BATCH_SIZE,
    UMAP_METRIC,
    UMAP_MIN_DIST,
    UMAP_N_NEIGHBORS,
    UMAP_SEED,
)
from core.encoding_ops import encode_prompts
from core.projection_ops import extend_umap_with_models_or_refit

# ---------------------------------------------------------------------------
# ComfyUI root detection
# ---------------------------------------------------------------------------


def _is_comfyui_root(p: Path) -> bool:
    return (p / "comfy").is_dir() and (p / "main.py").exists()


def _find_comfyui_root(explicit: str | None = None) -> Path:
    if explicit:
        p = Path(explicit)
        if not _is_comfyui_root(p):
            raise RuntimeError(f"Not a valid ComfyUI root (no comfy/ or main.py): {explicit}")
        return p

    if "COMFYUI_ROOT" in os.environ:
        p = Path(os.environ["COMFYUI_ROOT"])
        if not _is_comfyui_root(p):
            raise RuntimeError(
                f"COMFYUI_ROOT={p} is not a valid ComfyUI root (no comfy/ or main.py)"
            )
        return p

    # location search: encode_cli.py -> scripts/ -> plugin_root/ -> custom_nodes/ -> ComfyUI/
    candidate = Path(__file__).parent.parent.parent.parent
    if _is_comfyui_root(candidate):
        return candidate

    raise RuntimeError(
        "ComfyUI root not found.\n"
        "Options:\n"
        "  1. Pass --comfyui-path /path/to/ComfyUI\n"
        "  2. Set the COMFYUI_ROOT environment variable:\n"
        "       export COMFYUI_ROOT=/path/to/ComfyUI\n"
        "  3. Run from inside the custom_nodes/ directory structure."
    )


def _setup_paths(comfyui_root: Path) -> None:
    """add ComfyUI root and plugin root to sys.path"""
    if str(comfyui_root) not in sys.path:
        sys.path.insert(0, str(comfyui_root))
    if str(_PLUGIN_ROOT) not in sys.path:
        sys.path.insert(0, str(_PLUGIN_ROOT))


# ---------------------------------------------------------------------------
# Model loading (only after _setup_paths)
# ---------------------------------------------------------------------------


def _resolve_clip_path(clip_str: str, comfyui_root: Path) -> Path:
    """Return a local path for --clip; downloads from HF if needed

    Accepts local path or HF path: owner/repo/[subpath/]filename.safetensors
    Downloads to <comfyui_root>/models/text_encoders/
    """
    p = Path(clip_str)
    if p.exists():
        return p
    if p.is_absolute():
        raise FileNotFoundError(f"CLIP model not found: {clip_str}")

    # relative path that doesnt exist locally -> treat as HF owner/repo/file
    parts = clip_str.replace("\\", "/").split("/")
    if len(parts) < 3:
        raise ValueError(
            f"--clip {clip_str!r} is not a local file and not a valid HF path.\n"
            "Expected a local path or: owner/repo/filename.safetensors"
        )

    repo_id = f"{parts[0]}/{parts[1]}"
    hf_file = "/".join(parts[2:])
    local_dir = comfyui_root / "models" / "text_encoders"
    local_dir.mkdir(parents=True, exist_ok=True)

    try:
        from huggingface_hub import hf_hub_download
    except ImportError as err:
        raise RuntimeError(
            "huggingface_hub is required for HF model downloads: pip install huggingface_hub"
        ) from err

    dest = local_dir / Path(hf_file)
    if dest.exists():
        print(f"Using cached model: {dest}")
        return dest

    print(f"Downloading {repo_id}/{hf_file} → {dest}")
    downloaded = hf_hub_download(repo_id=repo_id, filename=hf_file, local_dir=str(local_dir))
    return Path(downloaded)


def _load_clip(clip_path: Path, clip_type_str: str, comfyui_root: Path) -> Any:
    """load a CLIP model using ComfyUIs infrastructure, returning the loaded model object"""
    _setup_paths(comfyui_root)
    import comfy.sd as sd
    from comfy.sd import CLIPType

    type_map: dict[str, Any] = {}
    for name in dir(CLIPType):
        if not name.startswith("_"):
            type_map[name.upper()] = getattr(CLIPType, name)

    clip_type = type_map.get(clip_type_str.upper())
    if clip_type is None:
        raise ValueError(f"Unknown --clip-type {clip_type_str!r}. Valid values: {sorted(type_map)}")

    print(f"Loading CLIP ({clip_type_str}): {clip_path}")
    return sd.load_clip(ckpt_paths=[str(clip_path)], clip_type=clip_type)


# ---------------------------------------------------------------------------
# Relative path helper & file reporting
# ---------------------------------------------------------------------------


def _file_size_label(size: int) -> str:
    if size >= 1024 * 1024:
        return f"{size / (1024 * 1024):.1f} MB"
    if size >= 1024:
        return f"{size // 1024} KB"
    return f"{size} B"


def _print_files(folder: Path) -> None:
    print("\nGenerated files:")
    for f in sorted(folder.iterdir()):
        print(f"  {f.name:<40} {_file_size_label(f.stat().st_size)}")


def _snapshot_mtimes(folder: Path) -> dict:
    return {f: f.stat().st_mtime for f in folder.iterdir() if f.is_file()}


def _print_updated_files(folder: Path, before: dict) -> None:
    print("\nUpdated files:")
    for f in sorted(folder.iterdir()):
        if not f.is_file():
            continue
        st = f.stat()
        if f not in before or st.st_mtime != before[f]:
            print(f"  {f.name:<40} {_file_size_label(st.st_size)}")


def _to_rel(path_str: str, comfyui_root: Path) -> str:
    """Store path relative to ComfyUI root for portability; fall back to absolute"""
    try:
        return str(Path(path_str).resolve().relative_to(comfyui_root.resolve()))
    except ValueError:
        return path_str


# ---------------------------------------------------------------------------
# Shared helpers for create / add
# ---------------------------------------------------------------------------


def _parse_metadata_columns(args: Any) -> list[str] | None:
    val = getattr(args, "metadata_columns", None)
    if not val:
        return None
    return [c.strip() for c in val.split(",") if c.strip()]


def _make_sample(sample_id: str, record: dict, source_id: str) -> dict:
    s: dict = {
        "id": sample_id,
        "type": "prompt_embedding",
        "text": record["text"],
        "raw_text": record.get("raw_text", record["text"]),
        "source": source_id,
    }
    if record.get("template"):
        s["template"] = record["template"]
    if record.get("metadata"):
        s["metadata"] = record["metadata"]
    return s


def _source_loader_meta(args: Any, source_id: str) -> dict:
    return {
        "input": args.input,
        "hf_config": getattr(args, "hf_config", None),
        "hf_split": getattr(args, "hf_split", "train"),
        "hf_column": getattr(args, "hf_column", None),
        "text_template": getattr(args, "text_template", None),
        "encode_limit": getattr(args, "encode_limit", 0),
        "dedupe": getattr(args, "dedupe", False),
        "min_words": getattr(args, "min_words", 0),
        "max_words": getattr(args, "max_words", 0),
        "source_id": source_id,
    }


# ---------------------------------------------------------------------------
# create subcommand
# ---------------------------------------------------------------------------


def cmd_create(args: argparse.Namespace) -> None:
    comfyui_root = _find_comfyui_root(args.comfyui_path)
    _setup_paths(comfyui_root)

    output_path = Path(args.output)
    name = args.name or output_path.name
    umap_params = {
        "n_neighbors": args.umap_n_neighbors,
        "min_dist": args.umap_min_dist,
        "metric": UMAP_METRIC,
        "random_state": args.umap_seed,
    }
    cluster_params = {
        "umap_dims": args.cluster_umap_dims,
        "umap_neighbors": args.cluster_umap_neighbors,
        "min_size": args.cluster_min_size,
        "min_samples": args.cluster_min_samples,
    }

    resolved_clip = _resolve_clip_path(args.clip, comfyui_root)

    metadata_cols = _parse_metadata_columns(args)

    print(f"Loading texts from: {args.input}")
    records, source_id = load_texts_from_source(
        args.input,
        column=args.hf_column or "Prompt",
        limit=args.encode_limit,
        hf_split=args.hf_split,
        hf_config=getattr(args, "hf_config", None),
        text_template=getattr(args, "text_template", None),
        metadata_columns=metadata_cols,
        dedupe=getattr(args, "dedupe", False),
        min_words=getattr(args, "min_words", 0),
        max_words=getattr(args, "max_words", 0),
    )
    if not records:
        raise SystemExit("No texts found: check --input, --hf-column, --encode-limit.")

    prompts = [r["text"] for r in records]
    clip = _load_clip(resolved_clip, args.clip_type, comfyui_root)
    print(f"Encoding {len(prompts)} prompts...")
    vectors = encode_prompts(clip, prompts, batch_size=args.batch_size)

    samples = [_make_sample(f"pt_{i:06d}", r, source_id) for i, r in enumerate(records)]
    config: dict[str, Any] = {
        "name": name,
        "type": "prompt_embedding",
        "encoder": _to_rel(str(resolved_clip), comfyui_root),
        "source_dataset": source_id,
        "text_pooling": "pooler",
        "umap_params": umap_params,
        "cli_encoder": {
            "clip_path": _to_rel(str(resolved_clip), comfyui_root),
            "clip_type": args.clip_type,
        },
        "source_loader": _source_loader_meta(args, source_id),
    }

    out = finalize_dataset(
        vectors,
        samples,
        config,
        output_path,
        umap_params=umap_params,
        cluster_params=cluster_params,
    )

    n = vectors.shape[0]
    print(f"\nDataset saved to: {out}")
    print(f"  samples: {n}  |  dim: {vectors.shape[1]}")
    _print_files(Path(out))


# ---------------------------------------------------------------------------
# add subcommand
# ---------------------------------------------------------------------------


def cmd_add(args: argparse.Namespace) -> None:
    comfyui_root = _find_comfyui_root(args.comfyui_path)
    _setup_paths(comfyui_root)

    path_obj = resolve_dataset_path(args.dataset.strip(), datasets_root=DEFAULT_DATASETS)
    if not path_obj.is_dir():
        raise SystemExit(f"Dataset folder not found: {args.dataset}")

    ds = load_dataset(path_obj)
    meta = ds["metadata"]
    existing_vectors: np.ndarray = ds["pooled"]
    existing_samples: list[dict] = ds["samples"]
    offset = len(existing_samples)

    cli_enc: dict[str, Any] = meta.get("cli_encoder", {})

    clip_path = args.clip
    if not clip_path:
        rel = cli_enc.get("clip_path")
        clip_path = str(comfyui_root / rel) if rel else None
    clip_type_str = args.clip_type or cli_enc.get("clip_type") or "FLUX2"

    if not clip_path:
        raise SystemExit(
            "Cannot determine CLIP model path.\n"
            "Dataset was created via ComfyUI node — model paths were not recorded.\n"
            "Specify: --clip /path/to/clip.safetensors --clip-type FLUX2"
        )

    # user-supplied --clip may be an HF path; cli_encoder paths are already local
    resolved_clip = _resolve_clip_path(args.clip, comfyui_root) if args.clip else Path(clip_path)
    clip = _load_clip(resolved_clip, clip_type_str, comfyui_root)

    metadata_cols = _parse_metadata_columns(args)

    print(f"Loading texts from: {args.input}")
    records, source_id = load_texts_from_source(
        args.input,
        column=args.hf_column or "Prompt",
        limit=args.encode_limit,
        hf_split=args.hf_split,
        hf_config=getattr(args, "hf_config", None),
        text_template=getattr(args, "text_template", None),
        metadata_columns=metadata_cols,
        dedupe=getattr(args, "dedupe", False),
        min_words=getattr(args, "min_words", 0),
        max_words=getattr(args, "max_words", 0),
    )
    if not records:
        raise SystemExit("No texts found — check --input and --encode-limit.")

    prompts = [r["text"] for r in records]
    print(f"Encoding {len(prompts)} new prompts...")
    new_vectors = encode_prompts(clip, prompts, batch_size=args.batch_size)
    new_samples = [
        _make_sample(f"pt_{offset + i:06d}", r, source_id) for i, r in enumerate(records)
    ]

    if existing_vectors.shape[1] != new_vectors.shape[1]:
        raise SystemExit(
            f"Dimension mismatch: dataset has dim {existing_vectors.shape[1]}, "
            f"new vectors have dim {new_vectors.shape[1]}.\n"
            "Ensure you use the same model that was used for the original dataset."
        )

    merged_vectors = np.concatenate([existing_vectors, new_vectors], axis=0)
    merged_samples = existing_samples + new_samples

    umap_2d, umap_3d = extend_umap_with_models_or_refit(
        path=path_obj,
        merged_vectors=merged_vectors,
        new_vectors=new_vectors,
        existing_umap_2d=ds.get("umap_2d"),
        existing_umap_3d=ds.get("umap_3d"),
        umap_params=meta.get("umap_params") or {},
    )

    cluster_results, cluster_warning = predict_cluster_for_new(path_obj, new_vectors)
    for sample, result in zip(new_samples, cluster_results, strict=True):
        sample["cluster_global"] = result["cluster_global"]
        sample["is_noise"] = result["is_noise"]
        sample["membership_strength"] = result["membership_strength"]

    if cluster_warning:
        print(cluster_warning)

    updated_meta = {**meta, "sample_count": len(merged_samples)}
    before = _snapshot_mtimes(path_obj)
    save_dataset(
        {
            "metadata": updated_meta,
            "samples": merged_samples,
            "pooled": merged_vectors,
            "umap_cluster": ds.get("umap_cluster"),
            "umap_2d": umap_2d,
            "umap_3d": umap_3d,
        },
        path_obj,
    )

    n_new = new_vectors.shape[0]
    print(f"\nAdded {n_new} samples to: {path_obj}")
    print(f"  total: {len(merged_samples)} samples  |  dim: {merged_vectors.shape[1]}")
    _print_updated_files(path_obj, before)


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="nels",
        description="NELS dataset CLI — create and extend datasets using ComfyUI models.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--comfyui-path",
        default=None,
        help="Path to ComfyUI root. Overrides COMFYUI_ROOT env var and auto-detection.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    # ---- create ----
    cp = subparsers.add_parser("create", help="Create a new NELS prompt dataset.")
    cp.add_argument(
        "--input",
        required=True,
        help="Prompt .txt file or HuggingFace dataset ID.",
    )
    cp.add_argument("--output", required=True, help="Output folder for the dataset.")
    cp.add_argument(
        "--name",
        default=None,
        help="Human-readable dataset name (defaults to output folder name).",
    )
    cp.add_argument(
        "--clip",
        required=True,
        help="Path to CLIP .safetensors.",
    )
    cp.add_argument(
        "--clip-type",
        default="FLUX2",
        help="ComfyUI CLIPType (default: FLUX2). Others: FLUX, STABLE_DIFFUSION, SD3.",
    )
    cp.add_argument(
        "--hf-column",
        default="Prompt",
        help="Column name when --input is a HuggingFace dataset (default: Prompt).",
    )
    cp.add_argument(
        "--hf-split",
        default="train",
        help="HuggingFace dataset split to load (default: train).",
    )
    cp.add_argument(
        "--hf-config",
        default=None,
        help="HuggingFace dataset config/name (e.g. 2m_text_only for DiffusionDB).",
    )
    cp.add_argument(
        "--text-template",
        default=None,
        help="Template to build the encoded text. Use {text} for the column value, "
        "or any column name as {column}. Example: 'A photo of a {text}'.",
    )
    cp.add_argument(
        "--metadata-columns",
        default=None,
        help="Comma-separated HF columns to store in each sample (e.g. label,species).",
    )
    cp.add_argument(
        "--dedupe",
        action="store_true",
        help="Remove duplicate texts before encoding.",
    )
    cp.add_argument(
        "--min-words",
        type=int,
        default=0,
        help="Drop texts with fewer words than this. 0 = no minimum.",
    )
    cp.add_argument(
        "--max-words",
        type=int,
        default=0,
        help="Drop texts with more words than this. 0 = no maximum.",
    )
    cp.add_argument(
        "--encode-limit",
        type=int,
        default=0,
        help="Max samples to encode. 0 = all (default: 0).",
    )
    cp.add_argument("--batch-size", type=int, default=ENCODE_BATCH_SIZE, help=f"Encoding batch size (default: {ENCODE_BATCH_SIZE}).")
    cp.add_argument("--umap-n-neighbors", type=int, default=UMAP_N_NEIGHBORS)
    cp.add_argument("--umap-min-dist", type=float, default=UMAP_MIN_DIST)
    cp.add_argument("--umap-seed", type=int, default=UMAP_SEED)
    cp.add_argument("--cluster-umap-dims", type=int, default=CLUSTER_UMAP_DIMS,
                    help=f"Dimensions for cluster UMAP (default: {CLUSTER_UMAP_DIMS}).")
    cp.add_argument("--cluster-umap-neighbors", type=int, default=CLUSTER_UMAP_NEIGHBORS,
                    help=f"n_neighbors for cluster UMAP (default: {CLUSTER_UMAP_NEIGHBORS}).")
    cp.add_argument("--cluster-min-size", type=int, default=CLUSTER_MIN_SIZE,
                    help=f"HDBSCAN min_cluster_size (default: {CLUSTER_MIN_SIZE}).")
    cp.add_argument("--cluster-min-samples", type=int, default=CLUSTER_MIN_SAMPLES,
                    help=f"HDBSCAN min_samples (default: {CLUSTER_MIN_SAMPLES}).")

    # ---- add ----
    ap = subparsers.add_parser("add", help="Add new samples to an existing NELS dataset.")
    ap.add_argument("--dataset", required=True, help="Path to the existing dataset folder.")
    ap.add_argument(
        "--input",
        required=True,
        help="New data source: prompt .txt file or HuggingFace dataset ID.",
    )
    ap.add_argument(
        "--clip",
        default=None,
        help="Path to CLIP .safetensors. "
        "Auto-loaded from cli_encoder block if dataset was created via CLI. "
        "Required if dataset was created via ComfyUI node.",
    )
    ap.add_argument(
        "--clip-type",
        default=None,
        help="ComfyUI CLIPType. Required alongside --clip when no cli_encoder block.",
    )
    ap.add_argument(
        "--hf-column",
        default="Prompt",
        help="Column name when --input is a HuggingFace dataset (default: Prompt).",
    )
    ap.add_argument(
        "--hf-split",
        default="train",
        help="HuggingFace dataset split to load (default: train).",
    )
    ap.add_argument("--hf-config", default=None, help="HuggingFace dataset config/name.")
    ap.add_argument(
        "--text-template",
        default=None,
        help="Template for the encoded text. Use {text} for the column value.",
    )
    ap.add_argument(
        "--metadata-columns",
        default=None,
        help="Comma-separated HF columns to store in each sample.",
    )
    ap.add_argument("--dedupe", action="store_true", help="Remove duplicate texts.")
    ap.add_argument("--min-words", type=int, default=0, help="Drop texts below this word count.")
    ap.add_argument("--max-words", type=int, default=0, help="Drop texts above this word count.")
    ap.add_argument(
        "--encode-limit",
        type=int,
        default=0,
        help="Max new samples to encode. 0 = all (default: 0).",
    )
    ap.add_argument("--batch-size", type=int, default=ENCODE_BATCH_SIZE, help=f"Encoding batch size (default: {ENCODE_BATCH_SIZE}).")

    args = parser.parse_args()

    try:
        if args.command == "create":
            cmd_create(args)
        else:
            cmd_add(args)
    finally:
        try:
            import gc

            import comfy.model_management
            import comfy.model_patcher as _mp

            comfy.model_management.unload_all_models()
            _mp.ModelPatcher.__del__ = lambda _: None
            gc.collect()
        except Exception:
            pass


if __name__ == "__main__":
    main()
