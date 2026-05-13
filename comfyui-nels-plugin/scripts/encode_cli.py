"""
NELS dataset CLI — encode prompts or images using ComfyUI model classes directly.

No ComfyUI server required. Models are loaded from .safetensors files using ComfyUI's
own infrastructure, producing embeddings that are byte-for-byte identical to those
created by the ComfyUI encoder nodes.

Subcommands:
  create   Encode a new dataset (prompts or images)
  add      Append new samples to an existing dataset

ComfyUI root detection (in order):
  1. --comfyui-path flag
  2. COMFYUI_ROOT environment variable
  3. Auto-detect: 4 levels up from this file when plugin is symlinked inside custom_nodes/

Usage examples:
  python -m scripts.encode_cli create \\
      --type prompt \\
      --clip models/text_encoders/qwen_3_4b.safetensors --clip-type FLUX2 \\
      --input Gustavosta/Stable-Diffusion-Prompts --hf-column Prompt \\
      --output datasets/sd_prompts --encode-limit 5000

  python -m scripts.encode_cli add \\
      --dataset datasets/sd_prompts \\
      --type prompt \\
      --input extra_prompts.txt
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path
from typing import Any

import numpy as np

from dataset_core import (
    _load_full_latents_all,
    compute_knn,
    compute_umap,
    finalize_dataset,
    load_dataset,
    load_images_from_source,
    load_prompts_from_source,
    save_dataset,
)
from encoding_utils import encode_image_tensor, encode_prompts

_PLUGIN_ROOT = Path(__file__).parent.parent


# ---------------------------------------------------------------------------
# ComfyUI root detection
# ---------------------------------------------------------------------------


def _find_comfyui_root(explicit: str | None = None) -> Path:
    if explicit:
        p = Path(explicit)
        if not (p / "comfy").is_dir():
            raise RuntimeError(
                f"Not a valid ComfyUI root (no comfy/ subdirectory): {explicit}"
            )
        return p

    if "COMFYUI_ROOT" in os.environ:
        p = Path(os.environ["COMFYUI_ROOT"])
        if not (p / "comfy").is_dir():
            raise RuntimeError(
                f"COMFYUI_ROOT={p} is not a valid ComfyUI root (no comfy/ subdirectory)"
            )
        return p

    # location search: encode_cli.py -> scripts/ -> plugin_root/ -> custom_nodes/ -> ComfyUI/
    candidate = Path(__file__).parent.parent.parent.parent
    if (candidate / "comfy").is_dir() and (candidate / "main.py").exists():
        return candidate

    raise RuntimeError(
        "ComfyUI root not found.\n"
        "Options:\n"
        "  1. Set the COMFYUI_ROOT environment variable:\n"
        "       export COMFYUI_ROOT=/path/to/ComfyUI\n"
        "  2. Pass --comfyui-path /path/to/ComfyUI\n"
        "  3. Run from inside the custom_nodes/ directory structure."
    )


def _setup_paths(comfyui_root: Path) -> None:
    for p in (str(comfyui_root), str(_PLUGIN_ROOT)):
        if p not in sys.path:
            sys.path.insert(0, p)


# ---------------------------------------------------------------------------
# Model loading (only after _setup_paths)
# ---------------------------------------------------------------------------


def _load_clip(clip_path: str, clip_type_str: str, comfyui_root: Path) -> Any:
    _setup_paths(comfyui_root)
    import comfy.sd as sd
    from comfy.sd import CLIPType

    type_map: dict[str, Any] = {}
    for name in dir(CLIPType):
        if not name.startswith("_"):
            type_map[name.upper()] = getattr(CLIPType, name)

    clip_type = type_map.get(clip_type_str.upper())
    if clip_type is None:
        raise ValueError(
            f"Unknown --clip-type {clip_type_str!r}. Valid values: {sorted(type_map)}"
        )

    p = Path(clip_path)
    if not p.exists():
        raise FileNotFoundError(f"CLIP model not found: {clip_path}")

    print(f"Loading CLIP ({clip_type_str}): {clip_path}")
    return sd.load_clip(ckpt_paths=[str(p)], clip_type=clip_type)


def _load_vae(vae_path: str, comfyui_root: Path) -> Any:
    _setup_paths(comfyui_root)
    import comfy.sd as sd
    import comfy.utils

    p = Path(vae_path)
    if not p.exists():
        raise FileNotFoundError(f"VAE not found: {vae_path}")

    print(f"Loading VAE: {vae_path}")
    sd_dict = comfy.utils.load_torch_file(str(p))
    return sd.VAE(sd=sd_dict)


# ---------------------------------------------------------------------------
# Relative path helper
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
    """Store path relative to ComfyUI root for portability; fall back to absolute."""
    try:
        return str(Path(path_str).resolve().relative_to(comfyui_root.resolve()))
    except ValueError:
        return path_str


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
        "metric": args.umap_metric,
        "random_state": args.umap_seed,
    }

    if args.type == "prompt":
        print(f"Loading prompts from: {args.input}")
        prompts, source_id = load_prompts_from_source(
            args.input,
            args.hf_column or "Prompt",
            args.encode_limit,
            hf_split=args.hf_split,
        )
        if not prompts:
            raise SystemExit(
                "No prompts found — check --input, --hf-column, --encode-limit."
            )

        clip = _load_clip(args.clip, args.clip_type, comfyui_root)
        print(f"Encoding {len(prompts)} prompts...")
        vectors = encode_prompts(clip, prompts, batch_size=args.batch_size)

        samples = [
            {
                "id": f"pt_{i:06d}",
                "type": "prompt_embedding",
                "text": p,
                "source": source_id,
                "cluster": None,
            }
            for i, p in enumerate(prompts)
        ]
        config: dict[str, Any] = {
            "name": name,
            "type": "prompt_embedding",
            "encoder": _to_rel(args.clip, comfyui_root),
            "source_dataset": source_id,
            "text_pooling": "pooler",
            "umap_params": umap_params,
            "cli_encoder": {
                "clip_path": _to_rel(args.clip, comfyui_root),
                "clip_type": args.clip_type,
            },
        }
        full_latents_np = None
        latent_shape = processed_size = None

    else:  # image
        vae = _load_vae(args.vae, comfyui_root)
        _iw = args.image_width if args.image_width and args.image_width > 0 else None
        _ih = args.image_height if args.image_height and args.image_height > 0 else None

        print(f"Loading images from: {args.input}")
        image_tensor, image_names = load_images_from_source(
            args.input,
            args.hf_column or "image",
            args.encode_limit,
            hf_split=args.hf_split,
        )

        # Actual pixel dims before VAE encoding
        actual_w = _iw if _iw is not None else int(image_tensor.shape[2])
        actual_h = _ih if _ih is not None else int(image_tensor.shape[1])

        print(f"Encoding {len(image_names)} images...")
        vectors, latent_shape, full_latents_np = encode_image_tensor(
            vae,
            image_tensor,
            image_pooling=args.image_pooling,
            save_full_latents=args.save_full_latents,
            image_width=_iw,
            image_height=_ih,
            batch_size=args.batch_size,
        )

        processed_size: list[int] | None = [actual_w, actual_h]
        vae_scale_factor: int | None = None
        if latent_shape and latent_shape[2] > 0:
            vae_scale_factor = actual_w // latent_shape[2]

        samples = [
            {
                "id": f"img_{i:06d}",
                "type": "image_latent",
                "image_path": image_names[i]
                if i < len(image_names)
                else f"img_{i:06d}",
                "source": args.input,
                "cluster": None,
            }
            for i in range(vectors.shape[0])
        ]
        config = {
            "name": name,
            "type": "image_latent",
            "encoder": _to_rel(args.vae, comfyui_root),
            "source_dataset": args.input,
            "latent_mode": "mean",
            "image_pooling": args.image_pooling,
            "latent_shape": latent_shape,
            "processed_size": processed_size,
            "vae_scale_factor": vae_scale_factor,
            "latent_reproducible": True,
            "save_full_latents": args.save_full_latents,
            "umap_params": umap_params,
            "cli_encoder": {"vae_path": _to_rel(args.vae, comfyui_root)},
        }

    out = finalize_dataset(
        vectors,
        samples,
        config,
        output_path,
        compute_umap_flag=not args.no_umap,
        umap_params=umap_params,
        compute_knn_flag=not args.no_knn,
        knn_k=args.knn_k,
        full_latents=full_latents_np,
    )

    n = vectors.shape[0]
    print(f"\nDataset saved to: {out}")
    print(f"  samples: {n}  |  dim: {vectors.shape[1]}")
    if args.type == "image":
        print(f"  latent_shape: {latent_shape}  |  processed_size: {processed_size}")
    _print_files(Path(out))


# ---------------------------------------------------------------------------
# add subcommand
# ---------------------------------------------------------------------------


def cmd_add(args: argparse.Namespace) -> None:
    comfyui_root = _find_comfyui_root(args.comfyui_path)
    _setup_paths(comfyui_root)

    path_obj = Path(args.dataset.strip())
    if not path_obj.is_dir():
        raise SystemExit(f"Dataset folder not found: {args.dataset}")

    ds = load_dataset(path_obj)
    meta = ds["metadata"]
    existing_vectors: np.ndarray = ds["pooled"]
    existing_samples: list[dict] = ds["samples"]
    offset = len(existing_samples)

    cli_enc: dict[str, Any] = meta.get("cli_encoder", {})

    def _resolve(arg_val: str | None, block_key: str) -> str | None:
        if arg_val:
            return arg_val
        rel = cli_enc.get(block_key)
        return str(comfyui_root / rel) if rel else None

    clip_path = _resolve(args.clip, "clip_path")
    vae_path = _resolve(args.vae, "vae_path")
    clip_type_str = args.clip_type or cli_enc.get("clip_type") or "FLUX2"

    enc = meta.get("encoding_params", {})
    orig_image_pooling: str = enc.get("image_pooling", "spatial_mean")
    orig_save_full_latents: bool = bool(enc.get("save_full_latents", False))
    processed_size = enc.get("processed_size")
    orig_width: int | None = processed_size[0] if processed_size else None
    orig_height: int | None = processed_size[1] if processed_size else None

    new_full_latents_np: np.ndarray | None = None

    if args.type == "prompt":
        if not clip_path:
            raise SystemExit(
                "Cannot determine CLIP model path.\n"
                "Dataset was created via ComfyUI node — model paths were not recorded.\n"
                "Specify: --clip /path/to/clip.safetensors --clip-type FLUX2"
            )
        clip = _load_clip(clip_path, clip_type_str, comfyui_root)

        print(f"Loading prompts from: {args.input}")
        prompts, source_id = load_prompts_from_source(
            args.input,
            args.hf_column or "Prompt",
            args.encode_limit,
            hf_split=args.hf_split,
        )
        if not prompts:
            raise SystemExit("No prompts found — check --input and --encode-limit.")

        print(f"Encoding {len(prompts)} new prompts...")
        new_vectors = encode_prompts(clip, prompts, batch_size=args.batch_size)
        new_samples = [
            {
                "id": f"pt_{offset + i:06d}",
                "type": "prompt_embedding",
                "text": p,
                "source": source_id,
                "cluster": None,
            }
            for i, p in enumerate(prompts)
        ]

    else:  # image
        if not vae_path:
            raise SystemExit(
                "Cannot determine VAE model path.\n"
                "Dataset was created via ComfyUI node — model paths were not recorded.\n"
                "Specify: --vae /path/to/vae.safetensors"
            )
        vae = _load_vae(vae_path, comfyui_root)

        print(f"Loading images from: {args.input}")
        image_tensor, image_names = load_images_from_source(
            args.input,
            args.hf_column or "image",
            args.encode_limit,
            hf_split=args.hf_split,
        )
        new_vectors, _, new_full_latents_np = encode_image_tensor(
            vae,
            image_tensor,
            image_pooling=orig_image_pooling,
            save_full_latents=orig_save_full_latents,
            image_width=orig_width,
            image_height=orig_height,
            batch_size=args.batch_size,
        )
        new_samples = [
            {
                "id": f"img_{offset + i:06d}",
                "type": "image_latent",
                "image_path": image_names[i]
                if i < len(image_names)
                else f"img_{offset + i:06d}",
                "source": args.input,
                "cluster": None,
            }
            for i in range(new_vectors.shape[0])
        ]

    if existing_vectors.shape[1] != new_vectors.shape[1]:
        raise SystemExit(
            f"Dimension mismatch: dataset has dim {existing_vectors.shape[1]}, "
            f"new vectors have dim {new_vectors.shape[1]}.\n"
            "Ensure you use the same model that was used for the original dataset."
        )

    merged_vectors = np.concatenate([existing_vectors, new_vectors], axis=0)
    merged_samples = existing_samples + new_samples

    # Merge full latents if the original dataset had them
    full_latents_for_save: np.ndarray | None = None
    if new_full_latents_np is not None and ds.get("full_latents_available"):
        existing_full = _load_full_latents_all(path_obj)
        if existing_full is not None:
            existing_ordered = np.stack(
                [existing_full[str(s["id"])] for s in existing_samples], axis=0
            )
            full_latents_for_save = np.concatenate(
                [existing_ordered, new_full_latents_np], axis=0
            )
        else:
            full_latents_for_save = new_full_latents_np

    # UMAP: transform new points into existing space, or refit if models are missing
    umap_2d = ds.get("umap_2d")
    umap_3d = ds.get("umap_3d")
    if umap_2d is not None:
        try:
            import joblib

            model_2d = path_obj / "umap_model_2d.pkl"
            model_3d = path_obj / "umap_model_3d.pkl"
            if model_2d.exists() and model_3d.exists():
                r2d = joblib.load(model_2d)
                r3d = joblib.load(model_3d)
                new_2d = r2d.transform(new_vectors).astype(np.float32)
                new_3d = r3d.transform(new_vectors).astype(np.float32)
                umap_2d = np.concatenate([umap_2d, new_2d], axis=0)
                umap_3d = np.concatenate([umap_3d, new_3d], axis=0)
            else:
                umap_params = meta.get("umap_params", {})
                umap_2d, umap_3d, r2d, r3d = compute_umap(
                    merged_vectors, params=umap_params
                )
                if r2d is not None:
                    joblib.dump(r2d, model_2d)
                    joblib.dump(r3d, model_3d)
        except ImportError:
            umap_2d = None
            umap_3d = None

    knn_params = meta.get("knn_params")
    knn_arrays: dict = {}
    if knn_params or not getattr(args, "no_knn", False):
        effective_k = getattr(args, "knn_k", None) or (knn_params or {}).get("k", 15)
        print(f"Recomputing kNN graphs (k={effective_k}, cosine + euclidean)...")
        try:
            for metric in ("cosine", "euclidean"):
                knn_idx, knn_dst = compute_knn(
                    merged_vectors, k=int(effective_k), metric=metric
                )
                knn_arrays[f"knn_{metric}_indices"] = knn_idx
                knn_arrays[f"knn_{metric}_distances"] = knn_dst
            updated_meta = {
                **meta,
                "sample_count": len(merged_samples),
                "knn_params": {"k": int(effective_k)},
            }
        except ImportError:
            print(
                "Warning: scikit-learn not installed — skipping kNN. pip install scikit-learn"
            )
            updated_meta = {**meta, "sample_count": len(merged_samples)}
    else:
        updated_meta = {**meta, "sample_count": len(merged_samples)}

    before = _snapshot_mtimes(path_obj)
    save_dataset(
        {
            "metadata": updated_meta,
            "samples": merged_samples,
            "pooled": merged_vectors,
            "umap_2d": umap_2d,
            "umap_3d": umap_3d,
            "full_latents": full_latents_for_save,
            **knn_arrays,
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
    cp = subparsers.add_parser("create", help="Create a new NELS dataset.")
    cp.add_argument(
        "--type",
        dest="type",
        choices=["prompt", "image"],
        required=True,
        help="What to encode.",
    )
    cp.add_argument(
        "--input",
        required=True,
        help="Prompt .txt file, HuggingFace dataset ID, or image folder path.",
    )
    cp.add_argument("--output", required=True, help="Output folder for the dataset.")
    cp.add_argument(
        "--name",
        default=None,
        help="Human-readable dataset name (defaults to output folder name).",
    )
    cp.add_argument(
        "--clip",
        default=None,
        help="Path to CLIP .safetensors. Required when --type prompt.",
    )
    cp.add_argument(
        "--clip-type",
        default="FLUX2",
        help="ComfyUI CLIPType (default: FLUX2). Others: FLUX, STABLE_DIFFUSION, SD3.",
    )
    cp.add_argument(
        "--vae",
        default=None,
        help="Path to VAE .safetensors. Required when --type image.",
    )
    cp.add_argument(
        "--hf-column",
        default=None,
        help="Column name when --input is a HuggingFace dataset. Defaults to 'Prompt' for --type prompt, 'image' for --type image.",
    )
    cp.add_argument(
        "--hf-split",
        default="train",
        help="HuggingFace dataset split for prompt or image datasets (default: train).",
    )
    cp.add_argument(
        "--encode-limit",
        type=int,
        default=0,
        help="Max samples to encode. 0 = all (default: 0).",
    )
    cp.add_argument(
        "--batch-size", type=int, default=8, help="Encoding batch size (default: 8)."
    )
    cp.add_argument(
        "--image-pooling",
        default="spatial_mean",
        choices=["spatial_mean", "flatten"],
        help="Latent pooling strategy for images (default: spatial_mean).",
    )
    cp.add_argument(
        "--image-width",
        type=int,
        default=0,
        help="Resize images to this width before encoding. 0 = keep original.",
    )
    cp.add_argument(
        "--image-height",
        type=int,
        default=0,
        help="Resize images to this height before encoding. 0 = keep original.",
    )
    cp.add_argument(
        "--save-full-latents",
        action="store_true",
        help="Save raw (C,H,W) latents per image to full_latents.safetensors.",
    )
    cp.add_argument(
        "--no-umap",
        action="store_true",
        help="Skip UMAP computation (faster, but graph panel needs UMAP to display).",
    )
    cp.add_argument("--umap-n-neighbors", type=int, default=15)
    cp.add_argument("--umap-min-dist", type=float, default=0.1)
    cp.add_argument("--umap-metric", default="cosine")
    cp.add_argument("--umap-seed", type=int, default=42)
    cp.add_argument(
        "--knn-k",
        type=int,
        default=15,
        help="kNN k for precomputed graph (default: 15). Both cosine and euclidean are stored.",
    )
    cp.add_argument("--no-knn", action="store_true", help="Skip kNN precomputation.")

    # ---- add ----
    ap = subparsers.add_parser(
        "add", help="Add new samples to an existing NELS dataset."
    )
    ap.add_argument(
        "--dataset", required=True, help="Path to the existing dataset folder."
    )
    ap.add_argument(
        "--type",
        dest="type",
        choices=["prompt", "image"],
        required=True,
        help="Type of new samples.",
    )
    ap.add_argument(
        "--input",
        required=True,
        help="New data source: prompt .txt file, HuggingFace dataset ID, or image folder.",
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
        "--vae",
        default=None,
        help="Path to VAE .safetensors. "
        "Auto-loaded from cli_encoder block if dataset was created via CLI. "
        "Required if dataset was created via ComfyUI node.",
    )
    ap.add_argument(
        "--hf-column",
        default=None,
        help="Column name when --input is a HuggingFace dataset. Defaults to 'Prompt' for --type prompt, 'image' for --type image.",
    )
    ap.add_argument(
        "--hf-split",
        default="train",
        help="HuggingFace dataset split for prompt or image datasets (default: train).",
    )
    ap.add_argument(
        "--encode-limit",
        type=int,
        default=0,
        help="Max new samples to encode. 0 = all (default: 0).",
    )
    ap.add_argument("--batch-size", type=int, default=8)
    ap.add_argument(
        "--knn-k",
        type=int,
        default=15,
        help="kNN k for precomputed graph (default: 15). Both cosine and euclidean are stored.",
    )
    ap.add_argument("--no-knn", action="store_true", help="Skip kNN precomputation.")

    args = parser.parse_args()

    if args.command == "create":
        if args.type == "prompt" and not args.clip:
            parser.error("--clip is required when --type prompt")
        if args.type == "image" and not args.vae:
            parser.error("--vae is required when --type image")

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
            _mp.ModelPatcher.__del__ = lambda self: None
            gc.collect()
        except Exception:
            pass


if __name__ == "__main__":
    main()
