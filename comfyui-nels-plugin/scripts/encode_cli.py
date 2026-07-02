"""
NELS dataset CLI:
encode prompts using ComfyUI model classes

No ComfyUI server required - models are loaded from .safetensors files using ComfyUIs
own infrastructure, producing embeddings byte-for-byte identical to those
created by ComfyUI encoder nodes

Subcommands:
  create   Encode a new prompt dataset
  add      Append new prompts to an existing dataset

ComfyUI root detection (in order):
  1. --comfyui-path flag (explicit path to ComfyUI root)
  2. COMFYUI_ROOT environment variable
  3. Auto-detect: walks up from this file until a ComfyUI root is found

Usage: Read the ENCODE_CLI.md documentation for detailed instructions
"""

import argparse
import logging
import os
import sys
from pathlib import Path
from typing import Any

# Bootstrap plugin root so core/ is importable at module load time
_PLUGIN_ROOT = Path(__file__).parent.parent
if str(_PLUGIN_ROOT) not in sys.path:
    sys.path.insert(0, str(_PLUGIN_ROOT))

from core.dataset_io import (
    load_dataset,
    resolve_dataset_path,
)
from core.dataset_ops import (
    append_records_to_dataset,
    build_dataset_config,
    build_projection_config,
    build_source_loader_meta,
    collect_prompt_records,
    create_dataset_from_records,
    split_comma_list,
)
from core.defaults import (
    CLUSTER_MIN_SAMPLES,
    CLUSTER_MIN_SIZE,
    CLUSTER_UMAP_DIMS,
    CLUSTER_UMAP_NEIGHBORS,
    DEFAULT_DATASETS,
    PROJECTION_STRATEGY_CLASSIC,
    PROJECTION_STRATEGY_PARAMETRIC,
    PROJECTION_STRATEGY_TWO_PASS,
    RUNTIME_SUBSET_SIZE,
    UMAP_MIN_DIST,
    UMAP_N_NEIGHBORS,
    UMAP_SEED,
)
from core.operations.cluster_annotation import ANNOTATION_MODEL, ANNOTATION_TOP_N, annotate_clusters

# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="nels",
        description="NELS dataset CLI - create and extend datasets using ComfyUI models.",
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
    cp.add_argument(
        "--annotate",
        nargs="?",
        const=ANNOTATION_MODEL,
        default=None,
        metavar="MODEL",
        help="Run LLM cluster annotation after dataset creation. "
        f"Optionally pass a HuggingFace model ID (default: {ANNOTATION_MODEL}).",
    )
    cp.add_argument(
        "--annotate-top-n",
        type=int,
        default=ANNOTATION_TOP_N,
        help=f"Prompts per cluster sent to the LLM (default: {ANNOTATION_TOP_N}).",
    )
    cp.add_argument("--umap-n-neighbors", type=int, default=UMAP_N_NEIGHBORS)
    cp.add_argument("--umap-min-dist", type=float, default=UMAP_MIN_DIST)
    cp.add_argument("--umap-seed", type=int, default=UMAP_SEED)
    cp.add_argument(
        "--projection-strategy",
        choices=[
            PROJECTION_STRATEGY_CLASSIC,
            PROJECTION_STRATEGY_TWO_PASS,
            PROJECTION_STRATEGY_PARAMETRIC,
        ],
        default=PROJECTION_STRATEGY_PARAMETRIC,
    )
    cp.add_argument(
        "--cluster-umap-dims",
        type=int,
        default=CLUSTER_UMAP_DIMS,
        help=f"Dimensions for cluster UMAP (default: {CLUSTER_UMAP_DIMS}).",
    )
    cp.add_argument(
        "--cluster-umap-neighbors",
        type=int,
        default=CLUSTER_UMAP_NEIGHBORS,
        help=f"n_neighbors for cluster UMAP (default: {CLUSTER_UMAP_NEIGHBORS}).",
    )
    cp.add_argument(
        "--cluster-min-size",
        type=int,
        default=CLUSTER_MIN_SIZE,
        help=f"HDBSCAN min_cluster_size (default: {CLUSTER_MIN_SIZE}).",
    )
    cp.add_argument(
        "--cluster-min-samples",
        type=int,
        default=CLUSTER_MIN_SAMPLES,
        help=f"HDBSCAN min_samples (default: {CLUSTER_MIN_SAMPLES}).",
    )
    cp.add_argument("--runtime-subset-size", type=int, default=RUNTIME_SUBSET_SIZE)
    cp.add_argument("--runtime-subset-seed", type=int, default=UMAP_SEED)
    cp.add_argument("--runtime-umap-n-neighbors", type=int, default=UMAP_N_NEIGHBORS)
    cp.add_argument("--runtime-umap-min-dist", type=float, default=UMAP_MIN_DIST)
    cp.add_argument("--runtime-cluster-umap-dims", type=int, default=CLUSTER_UMAP_DIMS)
    cp.add_argument("--runtime-cluster-umap-neighbors", type=int, default=CLUSTER_UMAP_NEIGHBORS)

    # ---- annotate ----
    annp = subparsers.add_parser(
        "annotate", help="Generate LLM cluster labels for an existing dataset."
    )
    annp.add_argument("--dataset", required=True, help="Path to the dataset folder.")
    annp.add_argument(
        "--model",
        default=ANNOTATION_MODEL,
        help=f"HuggingFace model for annotation (default: {ANNOTATION_MODEL}).",
    )
    annp.add_argument(
        "--top-n",
        type=int,
        default=ANNOTATION_TOP_N,
        help=f"Prompts per cluster sent to the LLM (default: {ANNOTATION_TOP_N}).",
    )

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
        required=True,
        help="Path to CLIP .safetensors, or HF path owner/repo/file.safetensors (downloaded automatically).",
    )
    ap.add_argument(
        "--clip-type",
        default="FLUX2",
        help="ComfyUI CLIPType (default: FLUX2). Others: FLUX, STABLE_DIFFUSION, SD3.",
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
    ap.add_argument(
        "--annotate",
        nargs="?",
        const=ANNOTATION_MODEL,
        default=None,
        metavar="MODEL",
        help="Run LLM cluster annotation after appending (clusters are renumbered on every add). "
        f"Optionally pass a HuggingFace model ID (default: {ANNOTATION_MODEL}).",
    )
    ap.add_argument(
        "--annotate-top-n",
        type=int,
        default=ANNOTATION_TOP_N,
        help=f"Prompts per cluster sent to the LLM (default: {ANNOTATION_TOP_N}).",
    )

    args = parser.parse_args()

    try:
        if args.command == "create":
            cmd_create(args)
        elif args.command == "annotate":
            cmd_annotate(args)
        else:
            cmd_add(args)
    finally:
        try:
            import comfy.model_management

            comfy.model_management.unload_all_models()
        except Exception as exc:
            logging.warning("Failed to unload ComfyUI models during CLI cleanup: %s", exc)

        try:
            import gc

            gc.collect()
        except Exception as exc:
            logging.warning("Failed to run garbage collection during CLI cleanup: %s", exc)


# ---------------------------------------------------------------------------
# create subcommand
# ---------------------------------------------------------------------------


def cmd_create(args: argparse.Namespace) -> None:
    comfyui_root = _find_comfyui_root(args.comfyui_path)
    _setup_paths(comfyui_root)

    output_path = Path(args.output)
    name = output_path.name
    umap_params = {
        "n_neighbors": args.umap_n_neighbors,
        "min_dist": args.umap_min_dist,
        "random_state": args.umap_seed,
    }
    cluster_params = {
        "umap_dims": args.cluster_umap_dims,
        "umap_neighbors": args.cluster_umap_neighbors,
        "min_size": args.cluster_min_size,
        "min_samples": args.cluster_min_samples,
    }
    runtime_umap_params = {
        "n_neighbors": args.runtime_umap_n_neighbors,
        "min_dist": args.runtime_umap_min_dist,
        "random_state": args.runtime_subset_seed,
    }
    runtime_cluster_params = {
        "umap_dims": args.runtime_cluster_umap_dims,
        "umap_neighbors": args.runtime_cluster_umap_neighbors,
        "min_size": args.cluster_min_size,
        "min_samples": args.cluster_min_samples,
    }
    projection = build_projection_config(
        strategy=args.projection_strategy,
        canonical_umap_params=umap_params,
        canonical_cluster_params=cluster_params,
        runtime_subset_size=args.runtime_subset_size,
        runtime_subset_seed=args.runtime_subset_seed,
        runtime_umap_params=runtime_umap_params,
        runtime_cluster_params=runtime_cluster_params,
    )

    resolved_clip = _resolve_clip_path(args.clip, comfyui_root)

    metadata_cols = split_comma_list(args.metadata_columns)

    print(f"Loading texts from: {args.input}")
    records, source_id = collect_prompt_records(
        source_input=args.input,
        encode_limit=args.encode_limit,
        hf_column=args.hf_column or "Prompt",
        hf_split=args.hf_split,
        hf_config=args.hf_config,
        text_template=args.text_template,
        metadata_columns=metadata_cols,
        dedupe=args.dedupe,
        min_words=args.min_words,
        max_words=args.max_words,
    )
    if not records:
        raise SystemExit("No texts found: check --input, --hf-column, --encode-limit.")

    clip = _load_clip(resolved_clip, args.clip_type, comfyui_root)
    print(f"Encoding {len(records)} prompts...")
    config = build_dataset_config(
        name=name,
        encoder=_to_rel(str(resolved_clip), comfyui_root),
        source_id=source_id,
        projection=projection,
        clip_type=args.clip_type,
        source_loader=build_source_loader_meta(
            source_input=args.input,
            hf_config=args.hf_config,
            hf_split=args.hf_split,
            hf_column=args.hf_column,
            text_template=args.text_template,
            encode_limit=args.encode_limit,
            dedupe=args.dedupe,
            min_words=args.min_words,
            max_words=args.max_words,
        ),
    )

    out, vectors = create_dataset_from_records(
        clip,
        records,
        source_id,
        config=config,
        output_path=output_path,
    )

    n = vectors.shape[0]
    print(f"\nDataset saved to: {out}")
    print(f"  samples: {n}  |  dim: {vectors.shape[1]}")
    _print_files(Path(out))

    if args.annotate:
        print("\nRunning cluster annotation...")
        annotate_clusters(Path(out), model_name=args.annotate, top_n=args.annotate_top_n)


# ---------------------------------------------------------------------------
# annotate subcommand
# ---------------------------------------------------------------------------


def cmd_annotate(args: argparse.Namespace) -> None:
    path = resolve_dataset_path(args.dataset.strip(), datasets_root=DEFAULT_DATASETS)
    if not path.is_dir():
        raise SystemExit(f"Dataset folder not found: {args.dataset}")
    annotate_clusters(path, model_name=args.model, top_n=args.top_n)


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

    resolved_clip = _resolve_clip_path(args.clip, comfyui_root)
    clip = _load_clip(resolved_clip, args.clip_type, comfyui_root)

    metadata_cols = split_comma_list(args.metadata_columns)

    print(f"Loading texts from: {args.input}")
    records, source_id = collect_prompt_records(
        source_input=args.input,
        encode_limit=args.encode_limit,
        hf_column=args.hf_column or "Prompt",
        hf_split=args.hf_split,
        hf_config=args.hf_config,
        text_template=args.text_template,
        metadata_columns=metadata_cols,
        dedupe=args.dedupe,
        min_words=args.min_words,
        max_words=args.max_words,
    )
    if not records:
        raise SystemExit("No texts found - check --input and --encode-limit.")

    print(f"Encoding {len(records)} new prompts...")

    before = _snapshot_mtimes(path_obj)
    try:
        updated_meta, new_vectors = append_records_to_dataset(
            path_obj,
            ds,
            clip,
            records,
            source_id,
        )
    except ValueError as exc:
        raise SystemExit(str(exc)) from exc

    n_new = new_vectors.shape[0]
    print(f"\nAdded {n_new} samples to: {path_obj}")
    print(f"  total: {updated_meta['sample_count']} samples  |  dim: {new_vectors.shape[1]}")
    _print_updated_files(path_obj, before)

    if args.annotate:
        print("\nRunning cluster annotation...")
        annotate_clusters(path_obj, model_name=args.annotate, top_n=args.annotate_top_n)


# ---------------------------------------------------------------------------
# Helper functions for CLI commands
# ---------------------------------------------------------------------------

# ---- ComfyUI root detection ----


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

    # walk up from encode_cli.py until a ComfyUI root is found
    candidate = Path(__file__).resolve()
    for _ in range(8):
        candidate = candidate.parent
        print(f"Checking for ComfyUI root at: {candidate}")
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
    """Add ComfyUI root and plugin root to sys.path"""
    if str(comfyui_root) not in sys.path:
        sys.path.insert(0, str(comfyui_root))
    if str(_PLUGIN_ROOT) not in sys.path:
        sys.path.insert(0, str(_PLUGIN_ROOT))


# ---- Model loading (only after _setup_paths) ----


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

    print(f"Downloading {repo_id}/{hf_file} -> {dest}")
    downloaded = hf_hub_download(repo_id=repo_id, filename=hf_file, local_dir=str(local_dir))
    return Path(downloaded)


def _load_clip(clip_path: Path, clip_type_str: str, comfyui_root: Path) -> Any:
    """Load a CLIP model using ComfyUI's infrastructure, return the loaded model object"""
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


if __name__ == "__main__":
    main()
