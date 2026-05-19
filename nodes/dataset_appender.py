"""
NELS Add to Dataset node:
appends new prompts or images to an existing dataset.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import numpy as np

from ..scripts.dataset_core import (
    _load_cond_tensors_all,
    compute_knn,
    compute_umap,
    load_dataset,
    load_images_from_folder,
    load_images_from_source,
    load_prompts_from_source,
    save_dataset,
)
from ..scripts.encoding_utils import encode_image_tensor, encode_prompts


class NelsAddToDataset:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dataset_path": ("STRING", {"default": ""}),
                "type": (["prompt", "image"],),
            },
            "optional": {
                "clip": ("CLIP", {}),
                "vae": ("VAE", {}),
                "input_source": (
                    ["local", "huggingface"],
                    {"tooltip": "Where to load new data from."},
                ),
                "hf_dataset_id": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "HuggingFace dataset ID (input_source='huggingface'), e.g. 'Gustavosta/Stable-Diffusion-Prompts'.",
                    },
                ),
                "hf_column": (
                    "STRING",
                    {
                        "default": "Prompt",
                        "tooltip": "Column name in the HF dataset. For type=prompt use the text column (e.g. 'Prompt'); for type=image use the image column (e.g. 'image').",
                    },
                ),
                "hf_split": (
                    "STRING",
                    {
                        "default": "train",
                        "tooltip": "HuggingFace dataset split to load (input_source='huggingface').",
                    },
                ),
                "prompt_text": (
                    "STRING",
                    {
                        "multiline": True,
                        "default": "",
                        "tooltip": "[Prompt] Extra prompts (one per line). Prepended to the source.",
                    },
                ),
                "prompt_file_path": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "[Prompt] Path to a .txt file of prompts (input_source='local').",
                    },
                ),
                "image_folder_path": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "[Image] Folder of images to encode (input_source='local').",
                    },
                ),
                "encode_limit": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 1000000,
                        "step": 1,
                        "tooltip": "Max items to encode. 0 = no limit.",
                    },
                ),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("dataset_path",)
    OUTPUT_NODE = True
    FUNCTION = "execute"
    CATEGORY = "nels/data"

    def execute(
        self,
        dataset_path: str,
        type: str,
        clip: Any = None,
        vae: Any = None,
        input_source: str = "local",
        hf_dataset_id: str = "",
        hf_split: str = "train",
        prompt_text: str = "",
        prompt_file_path: str = "",
        hf_column: str = "Prompt",
        image_folder_path: str = "",
        encode_limit: int = 0,
    ) -> tuple[str]:
        path_obj = Path(dataset_path.strip())
        if not path_obj.is_dir():
            raise ValueError(f"Dataset folder not found: {dataset_path}")

        ds = load_dataset(path_obj)
        existing_vectors: np.ndarray = ds["pooled"]
        existing_samples: list[dict] = ds["samples"]
        meta: dict = ds["metadata"]
        offset = len(existing_samples)

        new_cond_list: list[np.ndarray] | None = None

        # encode new items using the same settings as the original dataset
        if type == "prompt":
            if clip is None:
                raise ValueError(
                    "NELS Add to Dataset: CLIP must be connected when type=prompt."
                )

            has_full_cond = bool(ds.get("cond_tensors_available", False))

            extra = [line.strip() for line in prompt_text.splitlines() if line.strip()]
            source_limit = max(0, encode_limit - len(extra)) if encode_limit > 0 else 0

            if input_source == "huggingface" and hf_dataset_id.strip():
                source_prompts, source_id = load_prompts_from_source(
                    hf_dataset_id.strip(), hf_column, source_limit, hf_split=hf_split
                )
            elif prompt_file_path.strip():
                source_prompts, source_id = load_prompts_from_source(
                    prompt_file_path.strip(), limit=source_limit
                )
            else:
                source_prompts, source_id = [], "inline"

            prompts = extra + list(source_prompts)
            if encode_limit > 0:
                prompts = prompts[:encode_limit]

            if not prompts:
                raise ValueError("NELS Add to Dataset: no prompts to encode.")

            new_vectors, new_cond_list = encode_prompts(
                clip, prompts, save_full_cond=has_full_cond
            )
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

        else:  # image: read original encoding settings from dataset.json
            if vae is None:
                raise ValueError(
                    "NELS Add to Dataset: VAE must be connected when type=image."
                )

            enc = meta.get("encoding_params", {})
            orig_image_pooling: str = enc.get("image_pooling", "flatten")

            # Restore original resize dimensions so new latents live in the same space
            processed_size: list | None = enc.get("processed_size")
            orig_width: int | None = processed_size[0] if processed_size else None
            orig_height: int | None = processed_size[1] if processed_size else None

            if input_source == "huggingface" and hf_dataset_id.strip():
                image_tensor, image_names = load_images_from_source(
                    hf_dataset_id.strip(),
                    image_column=hf_column,
                    limit=encode_limit,
                    hf_split=hf_split,
                )
                source_id = hf_dataset_id.strip()
            elif image_folder_path and image_folder_path.strip():
                image_tensor, image_names = load_images_from_folder(
                    image_folder_path.strip(), limit=encode_limit
                )
                source_id = image_folder_path.strip()
            else:
                raise ValueError(
                    "NELS Add to Dataset: provide an image_folder_path, "
                    "or set input_source='huggingface' with a hf_dataset_id."
                )

            new_vectors, _ = encode_image_tensor(
                vae,
                image_tensor,
                encode_limit=0,
                image_pooling=orig_image_pooling,
                image_width=orig_width,
                image_height=orig_height,
            )
            new_samples = [
                {
                    "id": f"img_{offset + i:06d}",
                    "type": "image_latent",
                    "image_path": image_names[i]
                    if i < len(image_names)
                    else f"img_{offset + i:06d}",
                    "source": source_id,
                    "cluster": None,
                }
                for i in range(new_vectors.shape[0])
            ]

        # validate dimensions
        if existing_vectors.shape[1] != new_vectors.shape[1]:
            raise ValueError(
                f"Dimension mismatch: dataset has dim {existing_vectors.shape[1]}, "
                f"new vectors have dim {new_vectors.shape[1]}. "
                "Make sure you use the same encoder model as the original dataset."
            )

        merged_vectors = np.concatenate([existing_vectors, new_vectors], axis=0)
        merged_samples = existing_samples + new_samples

        # merge cond tensors if the original dataset had them (prompt datasets only)
        cond_for_save: list[np.ndarray] | None = None
        if type == "prompt" and new_cond_list is not None:
            if new_cond_list:
                hidden_dim = new_cond_list[0].shape[-1]
                if hidden_dim >= 2048:
                    print(
                        "Warning: cond_tensors.safetensors is very large for T5 models "
                        "(~4GB/1k samples). Loading into memory for merge."
                    )
            existing_cond = _load_cond_tensors_all(path_obj) or {}
            for i, cond in enumerate(new_cond_list):
                existing_cond[str(new_samples[i]["id"])] = cond
            cond_for_save = [
                existing_cond[str(s["id"])]
                for s in merged_samples
                if str(s["id"]) in existing_cond
            ]
            if len(cond_for_save) != len(merged_samples):
                cond_for_save = None  # incomplete merge — skip to avoid corrupt file

        # UMAP: transform new points into existing space, or refit
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

        # kNN: recompute both metrics for merged dataset using stored k
        knn_params = meta.get("knn_params")
        knn_arrays: dict = {}
        if knn_params:
            try:
                k = int(knn_params.get("k", 15))
                for metric in ("cosine", "euclidean"):
                    knn_idx, knn_dst = compute_knn(merged_vectors, k=k, metric=metric)
                    knn_arrays[f"knn_{metric}_indices"] = knn_idx
                    knn_arrays[f"knn_{metric}_distances"] = knn_dst
            except ImportError:
                pass

        # save everything
        updated_meta = {**meta, "sample_count": len(merged_samples)}
        dataset_dict: dict[str, Any] = {
            "metadata": updated_meta,
            "samples": merged_samples,
            "pooled": merged_vectors,
            "umap_2d": umap_2d,
            "umap_3d": umap_3d,
            **knn_arrays,
        }
        if cond_for_save is not None:
            dataset_dict["cond_tensors"] = cond_for_save

        save_dataset(dataset_dict, path_obj)
        return (str(path_obj),)


NODE_CLASS_MAPPINGS = {"nels_AddToDataset": NelsAddToDataset}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_AddToDataset": "NELS Add to Dataset"}
