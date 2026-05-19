"""
NELS Dataset Encoder nodes:
prompt (CLIP) and image (VAE) variants.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import numpy as np

from ..scripts.dataset_core import (
    finalize_dataset,
    load_images_from_folder,
    load_images_from_source,
    load_prompts_from_source,
)
from ..scripts.encoding_utils import encode_image_tensor, encode_prompts

_PLUGIN_ROOT = Path(__file__).parent.parent
_DEFAULT_DATASETS = _PLUGIN_ROOT / "datasets"


def _resolve_save_path(save_path: str, dataset_name: str) -> Path:
    if save_path and save_path.strip():
        return Path(save_path.strip()) / dataset_name.strip()
    _DEFAULT_DATASETS.mkdir(parents=True, exist_ok=True)
    return _DEFAULT_DATASETS / dataset_name.strip()


def _run_finalize(
    vectors: np.ndarray,
    samples: list[dict[str, Any]],
    config: dict[str, Any],
    output_path: Path,
    compute_umap_flag: bool,
    umap_params: dict[str, Any],
    cond_tensors: list[np.ndarray] | None = None,
    compute_knn_flag: bool = True,
    knn_k: int = 15,
) -> tuple[str]:
    path = finalize_dataset(
        vectors,
        samples,
        config,
        output_path,
        compute_umap_flag=compute_umap_flag,
        umap_params=umap_params,
        compute_knn_flag=compute_knn_flag,
        knn_k=knn_k,
        cond_tensors=cond_tensors,
    )
    return (path,)


_UMAP_INPUTS = {
    "umap_n_neighbors": (
        "INT",
        {
            "default": 15,
            "min": 2,
            "max": 200,
            "step": 1,
            "tooltip": "UMAP n_neighbors — lower = more local structure.",
        },
    ),
    "umap_min_dist": (
        "FLOAT",
        {
            "default": 0.1,
            "min": 0.0,
            "max": 1.0,
            "step": 0.01,
            "tooltip": "UMAP min_dist — lower = tighter clusters.",
        },
    ),
    "umap_metric": (
        ["cosine", "euclidean", "manhattan", "dot"],
        {"tooltip": "Distance metric used by UMAP (default: cosine)."},
    ),
    "umap_seed": (
        "INT",
        {
            "default": 42,
            "min": 0,
            "max": 2147483647,
            "step": 1,
            "tooltip": "Random seed for reproducible UMAP layout.",
        },
    ),
}

_SAVE_PATH_INPUT = (
    "STRING",
    {
        "default": "",
        "tooltip": "Absolute path for the dataset folder. Leave empty to use datasets/.",
    },
)

_COMPUTE_UMAP_INPUT = (
    "BOOLEAN",
    {
        "default": True,
        "tooltip": "Compute and save UMAP projections alongside the dataset.",
    },
)

_KNN_INPUTS = {
    "knn_k": (
        "INT",
        {
            "default": 15,
            "min": 1,
            "max": 100,
            "step": 1,
            "tooltip": "k for the precomputed kNN graph. Both cosine and euclidean are stored.",
        },
    ),
}

_COMPUTE_KNN_INPUT = (
    "BOOLEAN",
    {
        "default": True,
        "tooltip": "Precompute and save a kNN graph for fast edge rendering.",
    },
)


class NelsPromptEncoder:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dataset_name": (
                    "STRING",
                    {
                        "default": "my_prompts",
                        "tooltip": "Name for the saved dataset folder.",
                    },
                ),
                "encode_limit": (
                    "INT",
                    {
                        "default": 1000,
                        "min": 0,
                        "max": 1000000,
                        "step": 1,
                        "tooltip": "Max prompts to encode. 0 = encode all.",
                    },
                ),
            },
            "optional": {
                "clip": ("CLIP", {"tooltip": "Connect a Load CLIP node."}),
                "input_source": (
                    ["file", "huggingface"],
                    {
                        "tooltip": "Primary prompt source: a .txt file or a HuggingFace dataset."
                    },
                ),
                "prompt_text": (
                    "STRING",
                    {
                        "multiline": True,
                        "default": "",
                        "tooltip": "Additional prompts (one per line). Prepended to the source above.",
                    },
                ),
                "file_path": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "Path to a .txt file with one prompt per line (input_source='file').",
                    },
                ),
                "hf_dataset_id": (
                    "STRING",
                    {
                        "default": "Gustavosta/Stable-Diffusion-Prompts",
                        "tooltip": "HuggingFace dataset ID (input_source='huggingface').",
                    },
                ),
                "hf_column": (
                    "STRING",
                    {
                        "default": "Prompt",
                        "tooltip": "Column name in the HuggingFace dataset.",
                    },
                ),
                "hf_split": (
                    "STRING",
                    {
                        "default": "train",
                        "tooltip": "HuggingFace dataset split to load (input_source='huggingface').",
                    },
                ),
                "save_full_cond": (
                    "BOOLEAN",
                    {
                        "default": False,
                        "tooltip": "Save full CLIP cond tensors [seq_len, hidden_dim] per sample for KSampler. "
                        "Not recommended for T5/Flux (~4GB/1k samples).",
                    },
                ),
                "save_path": _SAVE_PATH_INPUT,
                "compute_umap": _COMPUTE_UMAP_INPUT,
                **_UMAP_INPUTS,
                "compute_knn": _COMPUTE_KNN_INPUT,
                **_KNN_INPUTS,
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("dataset_path",)
    OUTPUT_NODE = True
    FUNCTION = "execute"
    CATEGORY = "nels/data"

    def execute(
        self,
        dataset_name: str,
        encode_limit: int,
        clip: Any = None,
        input_source: str = "file",
        prompt_text: str = "",
        file_path: str = "",
        hf_dataset_id: str = "Gustavosta/Stable-Diffusion-Prompts",
        hf_column: str = "Prompt",
        hf_split: str = "train",
        save_full_cond: bool = False,
        save_path: str = "",
        compute_umap: bool = True,
        umap_n_neighbors: int = 15,
        umap_min_dist: float = 0.1,
        umap_metric: str = "cosine",
        umap_seed: int = 42,
        compute_knn: bool = True,
        knn_k: int = 15,
    ):
        if clip is None:
            raise ValueError("NELS Prompt Encoder: a CLIP node must be connected.")

        extra = (
            [line.strip() for line in prompt_text.splitlines() if line.strip()]
            if prompt_text and prompt_text.strip()
            else []
        )
        source_limit = max(0, encode_limit - len(extra)) if encode_limit > 0 else 0

        if input_source == "file":
            source_prompts, source_id = load_prompts_from_source(
                file_path, limit=source_limit
            )
        else:
            source_prompts, source_id = load_prompts_from_source(
                hf_dataset_id, hf_column, source_limit, hf_split=hf_split
            )

        prompts = extra + list(source_prompts)
        if encode_limit > 0:
            prompts = prompts[:encode_limit]

        if not prompts:
            raise ValueError("NELS Prompt Encoder: no prompts to encode.")

        vectors, cond_list = encode_prompts(
            clip, prompts, save_full_cond=save_full_cond
        )
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
        umap_params = {
            "n_neighbors": umap_n_neighbors,
            "min_dist": umap_min_dist,
            "metric": umap_metric,
            "random_state": umap_seed,
        }
        config = {
            "name": dataset_name,
            "type": "prompt_embedding",
            "encoder": "comfyui_clip",
            "source_dataset": source_id,
            "text_pooling": "pooler",
            "umap_params": umap_params,
            "save_full_cond": save_full_cond,
        }
        return _run_finalize(
            vectors,
            samples,
            config,
            _resolve_save_path(save_path, dataset_name),
            compute_umap,
            umap_params,
            cond_tensors=cond_list,
            compute_knn_flag=compute_knn,
            knn_k=knn_k,
        )


class NelsImageEncoder:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dataset_name": (
                    "STRING",
                    {
                        "default": "my_images",
                        "tooltip": "Name for the saved dataset folder.",
                    },
                ),
                "encode_limit": (
                    "INT",
                    {
                        "default": 1000,
                        "min": 0,
                        "max": 1000000,
                        "step": 1,
                        "tooltip": "Max images to encode. 0 = encode all.",
                    },
                ),
            },
            "optional": {
                "vae": ("VAE", {"tooltip": "Connect a Load VAE node."}),
                "images": (
                    "IMAGE",
                    {
                        "tooltip": "Image batch from another node. Always takes priority over folder/HF source."
                    },
                ),
                "input_source": (
                    ["folder", "huggingface"],
                    {
                        "tooltip": "Image source when no images node is connected: a local folder or a HuggingFace dataset."
                    },
                ),
                "folder_path": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "Folder of images to encode (input_source='folder').",
                    },
                ),
                "hf_dataset_id": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "HuggingFace dataset ID (input_source='huggingface'), e.g. 'lambdalabs/pokemon-blip-captions'.",
                    },
                ),
                "hf_image_column": (
                    "STRING",
                    {
                        "default": "image",
                        "tooltip": "Column name for images in the HF dataset.",
                    },
                ),
                "hf_split": (
                    "STRING",
                    {
                        "default": "train",
                        "tooltip": "HuggingFace dataset split to load (input_source='huggingface').",
                    },
                ),
                "image_pooling": (
                    ["flatten", "spatial_mean"],
                    {
                        "tooltip": "flatten: full C×H×W vector — supports trajectory decode. "
                        "spatial_mean: compact (C,) — navigation only, cannot decode. "
                        "Requires consistent image dimensions when using flatten."
                    },
                ),
                "image_width": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 64,
                        "tooltip": "Resize images to this width before encoding. 0 = keep original. Required for flatten pooling with mixed-size images.",
                    },
                ),
                "image_height": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 8192,
                        "step": 64,
                        "tooltip": "Resize images to this height before encoding. 0 = keep original.",
                    },
                ),
                "save_path": _SAVE_PATH_INPUT,
                "compute_umap": _COMPUTE_UMAP_INPUT,
                **_UMAP_INPUTS,
                "compute_knn": _COMPUTE_KNN_INPUT,
                **_KNN_INPUTS,
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("dataset_path",)
    OUTPUT_NODE = True
    FUNCTION = "execute"
    CATEGORY = "nels/data"

    def execute(
        self,
        dataset_name: str,
        encode_limit: int,
        vae: Any = None,
        images: Any = None,
        input_source: str = "folder",
        folder_path: str = "",
        hf_dataset_id: str = "",
        hf_image_column: str = "image",
        hf_split: str = "train",
        image_pooling: str = "flatten",
        image_width: int = 0,
        image_height: int = 0,
        save_path: str = "",
        compute_umap: bool = True,
        umap_n_neighbors: int = 15,
        umap_min_dist: float = 0.1,
        umap_metric: str = "cosine",
        umap_seed: int = 42,
        compute_knn: bool = True,
        knn_k: int = 15,
    ):
        if vae is None:
            raise ValueError("NELS Image Encoder: VAE must be connected.")

        if image_pooling == "spatial_mean":
            print(
                "WARNING: spatial_mean pooling discards spatial structure. "
                "Trajectory steps cannot be decoded to images. "
                "Navigation, UMAP, and kNN still work."
            )

        if images is not None:
            image_tensor = images
            image_names = [f"batch_image_{i:06d}" for i in range(image_tensor.shape[0])]
            source_id = "comfyui_image_input"
            folder_encode_limit = encode_limit
        elif input_source == "huggingface" and hf_dataset_id.strip():
            image_tensor, image_names = load_images_from_source(
                hf_dataset_id.strip(),
                image_column=hf_image_column,
                limit=encode_limit,
                hf_split=hf_split,
            )
            source_id = hf_dataset_id.strip()
            folder_encode_limit = 0
        elif folder_path and folder_path.strip():
            image_tensor, image_names = load_images_from_folder(
                folder_path.strip(), limit=encode_limit
            )
            source_id = folder_path.strip()
            folder_encode_limit = 0
        else:
            raise ValueError(
                "NELS Image Encoder: connect an images node, provide a folder_path, "
                "or set input_source='huggingface' with a hf_dataset_id."
            )

        _iw = image_width if image_width > 0 else None
        _ih = image_height if image_height > 0 else None
        actual_w = _iw if _iw is not None else int(image_tensor.shape[2])
        actual_h = _ih if _ih is not None else int(image_tensor.shape[1])

        vectors, latent_shape = encode_image_tensor(
            vae,
            image_tensor,
            folder_encode_limit,
            image_pooling,
            _iw,
            _ih,
        )

        vae_latent_sf: float | None = None
        try:
            vae_latent_sf = float(vae.first_stage_model.config.scaling_factor)
        except AttributeError:
            pass

        processed_size: list[int] = [actual_w, actual_h]
        vae_scale_factor: int | None = None
        if latent_shape and latent_shape[2] > 0:
            vae_scale_factor = actual_w // latent_shape[2]

        n = vectors.shape[0]
        samples = [
            {
                "id": f"img_{i:06d}",
                "type": "image_latent",
                "image_path": image_names[i]
                if i < len(image_names)
                else f"img_{i:06d}",
                "source": source_id,
                "cluster": None,
            }
            for i in range(n)
        ]
        umap_params = {
            "n_neighbors": umap_n_neighbors,
            "min_dist": umap_min_dist,
            "metric": umap_metric,
            "random_state": umap_seed,
        }
        config = {
            "name": dataset_name,
            "type": "image_latent",
            "encoder": "comfyui_vae",
            "source_dataset": source_id,
            "latent_mode": "mean",
            "image_pooling": image_pooling,
            "latent_shape": latent_shape,
            "processed_size": processed_size,
            "vae_scale_factor": vae_scale_factor,
            "vae_latent_scaling_factor": vae_latent_sf,
            "latent_reproducible": True,
            "umap_params": umap_params,
        }
        return _run_finalize(
            vectors,
            samples,
            config,
            _resolve_save_path(save_path, dataset_name),
            compute_umap,
            umap_params,
            compute_knn_flag=compute_knn,
            knn_k=knn_k,
        )


NODE_CLASS_MAPPINGS = {
    "nels_PromptEncoder": NelsPromptEncoder,
    "nels_ImageEncoder": NelsImageEncoder,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "nels_PromptEncoder": "NELS Prompt Encoder",
    "nels_ImageEncoder": "NELS Image Encoder",
}
