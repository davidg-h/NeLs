"""NELS Dataset Encoder node - prompt (CLIP) encoding"""

from typing import Any

from ..core.dataset_io import resolve_dataset_path
from ..core.dataset_ops import (
    build_inline_records,
    build_source_loader_meta,
    finalize_dataset,
    load_texts_from_source,
    make_sample_record,
    normalize_source_inputs,
)
from ..core.defaults import (
    CLUSTER_MIN_SAMPLES,
    CLUSTER_MIN_SIZE,
    CLUSTER_UMAP_DIMS,
    CLUSTER_UMAP_NEIGHBORS,
    DEFAULT_DATASETS,
    ENCODE_BATCH_SIZE,
    UMAP_MIN_DIST,
    UMAP_N_NEIGHBORS,
    UMAP_SEED,
    UMAP_SUBSET_FIT_SIZE,
    UMAP_SUBSET_THRESHOLD,
)
from ..core.encoding_ops import encode_prompts_pooled


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
                "batch_size": (
                    "INT",
                    {
                        "default": ENCODE_BATCH_SIZE,
                        "min": 1,
                        "max": 512,
                        "step": 1,
                        "tooltip": f"Prompts per CLIP encoding batch (default: {ENCODE_BATCH_SIZE}). Lower = less VRAM.",
                    },
                ),
                "input_source": (
                    ["file", "huggingface"],
                    {"tooltip": "Primary prompt source: a .txt file or a HuggingFace dataset."},
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
                "hf_config": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "HuggingFace dataset config/name (e.g. '2m_text_only' for DiffusionDB).",
                    },
                ),
                "text_template": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "Optional template. Use {text} for column value, or {column_name} for other columns. Example: 'A photo of a {text}'.",
                    },
                ),
                "metadata_columns": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "Comma-separated HF column names to store in each sample record.",
                    },
                ),
                "dedupe": (
                    "BOOLEAN",
                    {
                        "default": False,
                        "tooltip": "Remove duplicate texts before encoding.",
                    },
                ),
                "min_words": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 10000,
                        "tooltip": "Drop texts with fewer words. 0 = no minimum.",
                    },
                ),
                "max_words": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 10000,
                        "tooltip": "Drop texts with more words. 0 = no maximum.",
                    },
                ),
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
        batch_size: int = ENCODE_BATCH_SIZE,
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
        umap_subset_size: int = 0,
        cluster_umap_dims: int = CLUSTER_UMAP_DIMS,
        cluster_umap_neighbors: int = CLUSTER_UMAP_NEIGHBORS,
        cluster_min_size: int = CLUSTER_MIN_SIZE,
        cluster_min_samples: int = CLUSTER_MIN_SAMPLES,
    ):
        if clip is None:
            raise ValueError("NELS Prompt Encoder: a CLIP node must be connected.")

        tmpl, meta_cols, cfg = normalize_source_inputs(text_template, metadata_columns, hf_config)

        extra_records = build_inline_records(prompt_text, tmpl)
        source_limit = max(0, encode_limit - len(extra_records)) if encode_limit > 0 else 0

        if input_source == "file":
            source_records, source_id = load_texts_from_source(
                file_path,
                limit=source_limit,
                text_template=tmpl,
                dedupe=dedupe,
                min_words=min_words,
                max_words=max_words,
            )
        else:
            source_records, source_id = load_texts_from_source(
                hf_dataset_id,
                column=hf_column,
                limit=source_limit,
                hf_split=hf_split,
                hf_config=cfg,
                text_template=tmpl,
                metadata_columns=meta_cols,
                dedupe=dedupe,
                min_words=min_words,
                max_words=max_words,
            )

        records = extra_records + source_records
        if encode_limit > 0:
            records = records[:encode_limit]

        if not records:
            raise ValueError("NELS Prompt Encoder: no prompts to encode.")

        prompts = [r["text"] for r in records]
        vectors = encode_prompts_pooled(clip, prompts, batch_size=batch_size)
        samples = [make_sample_record(f"pt_{i:06d}", r, source_id) for i, r in enumerate(records)]
        umap_params = {
            "n_neighbors": umap_n_neighbors,
            "min_dist": umap_min_dist,
            "random_state": umap_seed,
            "subset_size": umap_subset_size if umap_subset_size > 0 else None,
        }
        cluster_params = {
            "umap_dims": cluster_umap_dims,
            "umap_neighbors": cluster_umap_neighbors,
            "min_size": cluster_min_size,
            "min_samples": cluster_min_samples,
        }
        config = {
            "name": dataset_name,
            "type": "prompt_embedding",
            "encoder": "comfyui_clip",
            "source_dataset": source_id,
            "batch_size": batch_size,
            "umap_params": umap_params,
            "source_loader": build_source_loader_meta(
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
        }

        root = save_path.strip() or str(DEFAULT_DATASETS)
        output_path = resolve_dataset_path(dataset_name.strip(), datasets_root=root)

        return (
            finalize_dataset(
                vectors,
                samples,
                config,
                output_path,
                umap_params=umap_params,
                cluster_params=cluster_params,
            ),
        )


NODE_CLASS_MAPPINGS = {"nels_PromptEncoder": NelsPromptEncoder}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_PromptEncoder": "NELS Prompt Encoder"}


# -- internals --

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
    "umap_subset_size": (
        "INT",
        {
            "default": 0,
            "min": 0,
            "max": 1_000_000,
            "step": 1000,
            "tooltip": f"Points to fit UMAP on when N > {UMAP_SUBSET_THRESHOLD:,}. 0 = use default ({UMAP_SUBSET_FIT_SIZE:,}).",
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
