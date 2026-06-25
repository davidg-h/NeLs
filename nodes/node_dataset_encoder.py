"""NELS Dataset Encoder node - prompt (CLIP) encoding"""

from typing import Any

from ..core.dataset_io import resolve_dataset_path
from ..core.dataset_ops import (
    build_dataset_config,
    build_source_loader_meta,
    collect_prompt_records,
    create_dataset_from_records,
    normalize_source_inputs,
)
from ..core.defaults import (
    CLUSTER_MIN_SAMPLES,
    CLUSTER_MIN_SIZE,
    CLUSTER_UMAP_DIMS,
    CLUSTER_UMAP_NEIGHBORS,
    DEFAULT_DATASETS,
    UMAP_MIN_DIST,
    UMAP_N_NEIGHBORS,
    UMAP_SEED,
)
from ._dataset_source_inputs import source_input_fields


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
                "prompt_text": (
                    "STRING",
                    {
                        "multiline": True,
                        "default": "",
                        "tooltip": "Additional prompts (one per line). Prepended to the source above.",
                    },
                ),
                **source_input_fields(hf_dataset_id_default="Gustavosta/Stable-Diffusion-Prompts"),
                "save_path": _SAVE_PATH_INPUT,
                **_UMAP_INPUTS,
                **_CLUSTER_INPUTS,
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
        hf_config: str = "",
        text_template: str = "",
        metadata_columns: str = "",
        dedupe: bool = False,
        min_words: int = 0,
        max_words: int = 0,
        save_path: str = "",
        umap_n_neighbors: int = UMAP_N_NEIGHBORS,
        umap_min_dist: float = UMAP_MIN_DIST,
        umap_seed: int = UMAP_SEED,
        cluster_umap_dims: int = CLUSTER_UMAP_DIMS,
        cluster_umap_neighbors: int = CLUSTER_UMAP_NEIGHBORS,
        cluster_min_size: int = CLUSTER_MIN_SIZE,
        cluster_min_samples: int = CLUSTER_MIN_SAMPLES,
    ):
        if clip is None:
            raise ValueError("NELS Prompt Encoder: a CLIP node must be connected.")

        tmpl, meta_cols, cfg = normalize_source_inputs(text_template, metadata_columns, hf_config)
        records, source_id = collect_prompt_records(
            source_input=file_path if input_source == "file" else hf_dataset_id,
            input_source=input_source,
            prompt_text=prompt_text,
            encode_limit=encode_limit,
            hf_column=hf_column,
            hf_split=hf_split,
            hf_config=cfg,
            text_template=tmpl,
            metadata_columns=meta_cols,
            dedupe=dedupe,
            min_words=min_words,
            max_words=max_words,
        )

        if not records:
            raise ValueError("NELS Prompt Encoder: no prompts to encode.")

        umap_params = {
            "n_neighbors": umap_n_neighbors,
            "min_dist": umap_min_dist,
            "random_state": umap_seed,
        }
        cluster_params = {
            "umap_dims": cluster_umap_dims,
            "umap_neighbors": cluster_umap_neighbors,
            "min_size": cluster_min_size,
            "min_samples": cluster_min_samples,
        }
        config = build_dataset_config(
            name=dataset_name,
            encoder="comfyui_clip",
            source_id=source_id,
            umap_params=umap_params,
            source_loader=build_source_loader_meta(
                source_input=file_path if input_source == "file" else hf_dataset_id,
                hf_config=cfg,
                hf_split=hf_split,
                hf_column=hf_column,
                text_template=tmpl,
                encode_limit=encode_limit,
                dedupe=dedupe,
                min_words=min_words,
                max_words=max_words,
            ),
        )

        root = save_path.strip() or str(DEFAULT_DATASETS)
        output_path = resolve_dataset_path(dataset_name.strip(), datasets_root=root)

        saved_path, _vectors = create_dataset_from_records(
            clip,
            records,
            source_id,
            config=config,
            output_path=output_path,
            umap_params=umap_params,
            cluster_params=cluster_params,
        )
        return (saved_path,)


NODE_CLASS_MAPPINGS = {"nels_PromptEncoder": NelsPromptEncoder}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_PromptEncoder": "NELS Prompt Encoder"}


# ---- internals ----

_UMAP_INPUTS = {
    "umap_n_neighbors": (
        "INT",
        {
            "default": UMAP_N_NEIGHBORS,
            "min": 2,
            "max": 200,
            "step": 1,
            "tooltip": "UMAP n_neighbors - lower = more local structure.",
        },
    ),
    "umap_min_dist": (
        "FLOAT",
        {
            "default": UMAP_MIN_DIST,
            "min": 0.0,
            "max": 1.0,
            "step": 0.01,
            "tooltip": "UMAP min_dist - lower = tighter clusters.",
        },
    ),
    "umap_seed": (
        "INT",
        {
            "default": UMAP_SEED,
            "min": 0,
            "max": 2147483647,
            "step": 1,
            "tooltip": "Random seed for reproducible UMAP layout.",
        },
    ),
}

_CLUSTER_INPUTS = {
    "cluster_umap_dims": (
        "INT",
        {
            "default": CLUSTER_UMAP_DIMS,
            "min": 2,
            "max": 50,
            "step": 1,
            "tooltip": f"Dimensions for the cluster UMAP (default: {CLUSTER_UMAP_DIMS}).",
        },
    ),
    "cluster_umap_neighbors": (
        "INT",
        {
            "default": CLUSTER_UMAP_NEIGHBORS,
            "min": 2,
            "max": 200,
            "step": 1,
            "tooltip": f"n_neighbors for the cluster UMAP (default: {CLUSTER_UMAP_NEIGHBORS}).",
        },
    ),
    "cluster_min_size": (
        "INT",
        {
            "default": CLUSTER_MIN_SIZE,
            "min": 2,
            "max": 10000,
            "step": 1,
            "tooltip": f"HDBSCAN min_cluster_size (default: {CLUSTER_MIN_SIZE}).",
        },
    ),
    "cluster_min_samples": (
        "INT",
        {
            "default": CLUSTER_MIN_SAMPLES,
            "min": 1,
            "max": 1000,
            "step": 1,
            "tooltip": f"HDBSCAN min_samples (default: {CLUSTER_MIN_SAMPLES}).",
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
