"""NELS Add to Dataset node - appends new prompts to an existing dataset"""

from typing import Any

from ..core.dataset_io import load_dataset, resolve_dataset_path
from ..core.dataset_ops import (
    append_records_to_dataset,
    collect_prompt_records,
    normalize_source_inputs,
)
from ..core.defaults import DEFAULT_DATASETS
from ._dataset_source_inputs import source_input_fields


class NelsAddToDataset:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dataset_path": (
                    "STRING",
                    {
                        "default": "",
                        "tooltip": "Absolute path or name of a dataset in the plugin datasets/ folder.",
                    },
                ),
            },
            "optional": {
                "clip": ("CLIP", {}),
                "prompt_text": (
                    "STRING",
                    {
                        "multiline": True,
                        "default": "",
                        "tooltip": "Extra prompts (one per line). Prepended to the source.",
                    },
                ),
                **source_input_fields(),
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
        prompt_text: str = "",
        input_source: str = "file",
        file_path: str = "",
        hf_dataset_id: str = "",
        hf_column: str = "Prompt",
        hf_split: str = "train",
        hf_config: str = "",
        text_template: str = "",
        metadata_columns: str = "",
        dedupe: bool = False,
        min_words: int = 0,
        max_words: int = 0,
        encode_limit: int = 0,
    ) -> tuple[str]:
        path_obj = resolve_dataset_path(dataset_path, datasets_root=DEFAULT_DATASETS)
        if not path_obj.is_dir():
            raise ValueError(f"Dataset folder not found: {dataset_path}")

        if clip is None:
            raise ValueError("NELS Add to Dataset: CLIP must be connected.")

        ds = load_dataset(path_obj)

        tmpl, meta_cols, cfg = normalize_source_inputs(text_template, metadata_columns, hf_config)
        records, source_id = collect_prompt_records(
            source_input=(
                hf_dataset_id.strip() if input_source == "huggingface" else file_path.strip()
            ),
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
            raise ValueError("NELS Add to Dataset: no prompts to encode.")

        append_records_to_dataset(
            path_obj,
            ds,
            clip,
            records,
            source_id,
        )
        return (str(path_obj),)


NODE_CLASS_MAPPINGS = {"nels_AddToDataset": NelsAddToDataset}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_AddToDataset": "NELS Add to Dataset"}
