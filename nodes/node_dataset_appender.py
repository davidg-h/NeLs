"""NELS Add to Dataset node - appends new prompts to an existing dataset"""

from typing import Any

from ..core.dataset_io import load_dataset, resolve_dataset_path
from ..core.dataset_ops import (
    append_to_dataset,
    build_inline_records,
    load_texts_from_source,
    make_sample_record,
    normalize_source_inputs,
)
from ..core.encoding_ops import encode_prompts_pooled


class NelsAddToDataset:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dataset_path": ("STRING", {"default": ""}),
            },
            "optional": {
                "clip": ("CLIP", {}),
                "input_source": (
                    ["file", "huggingface"],
                    {"tooltip": "Where to load new prompts from."},
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
                        "tooltip": "Column name for the prompt text in the HF dataset.",
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
                        "tooltip": "Optional template. Use {text} for column value. Example: 'A photo of a {text}'.",
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
                    {"default": False, "tooltip": "Remove duplicate texts before encoding."},
                ),
                "min_words": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 10000,
                        "tooltip": "Drop texts below this word count.",
                    },
                ),
                "max_words": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 10000,
                        "tooltip": "Drop texts above this word count.",
                    },
                ),
                "prompt_text": (
                    "STRING",
                    {
                        "multiline": True,
                        "default": "",
                        "tooltip": "Extra prompts (one per line). Prepended to the source.",
                    },
                ),
                "prompt_file_path": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "Path to a .txt file of prompts (input_source='file').",
                    },
                ),
                "encode_limit": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 1000000,
                        "step": 1,
                        "tooltip": "Max prompts to encode. 0 = no limit.",
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
        clip: Any = None,
        input_source: str = "file",
        hf_dataset_id: str = "",
        hf_column: str = "Prompt",
        hf_split: str = "train",
        hf_config: str = "",
        text_template: str = "",
        metadata_columns: str = "",
        dedupe: bool = False,
        min_words: int = 0,
        max_words: int = 0,
        prompt_text: str = "",
        prompt_file_path: str = "",
        encode_limit: int = 0,
    ) -> tuple[str]:
        path_obj = resolve_dataset_path(dataset_path)
        if not path_obj.is_dir():
            raise ValueError(f"Dataset folder not found: {dataset_path}")

        if clip is None:
            raise ValueError("NELS Add to Dataset: CLIP must be connected.")

        ds = load_dataset(path_obj)
        offset = len(ds["samples"])

        tmpl, meta_cols, cfg = normalize_source_inputs(text_template, metadata_columns, hf_config)

        extra_records = build_inline_records(prompt_text, tmpl)
        source_limit = max(0, encode_limit - len(extra_records)) if encode_limit > 0 else 0

        if input_source == "huggingface" and hf_dataset_id.strip():
            source_records, source_id = load_texts_from_source(
                hf_dataset_id.strip(),
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
        elif prompt_file_path.strip():
            source_records, source_id = load_texts_from_source(
                prompt_file_path.strip(),
                limit=source_limit,
                text_template=tmpl,
                dedupe=dedupe,
                min_words=min_words,
                max_words=max_words,
            )
        else:
            source_records, source_id = [], "inline"

        records = extra_records + source_records
        if encode_limit > 0:
            records = records[:encode_limit]

        if not records:
            raise ValueError("NELS Add to Dataset: no prompts to encode.")

        prompts = [r["text"] for r in records]
        new_vectors = encode_prompts_pooled(clip, prompts)
        new_samples = [
            make_sample_record(f"pt_{offset + i:06d}", r, source_id) for i, r in enumerate(records)
        ]

        append_to_dataset(path_obj, ds, new_vectors, new_samples)
        return (str(path_obj),)


NODE_CLASS_MAPPINGS = {"nels_AddToDataset": NelsAddToDataset}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_AddToDataset": "NELS Add to Dataset"}
