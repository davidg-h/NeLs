"""Shared INPUT_TYPES fields for HF/file prompt source selection (encoder + appender)"""


def source_input_fields(*, hf_dataset_id_default: str = "") -> dict:
    """Optional-input field defs shared by the dataset encoder and appender nodes

    The encoder ships a working example dataset
    The appender defaults to empty because it must match the target dataset source
    """
    return {
        "input_source": (
            ["file", "huggingface"],
            {"tooltip": "Where to load prompts from: a .txt file or a HuggingFace dataset."},
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
                "default": hf_dataset_id_default,
                "tooltip": "HuggingFace dataset ID (input_source='huggingface'), e.g. 'Gustavosta/Stable-Diffusion-Prompts'.",
            },
        ),
        "hf_column": (
            "STRING",
            {
                "default": "Prompt",
                "tooltip": "Column name for the prompt text in the HuggingFace dataset.",
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
            {"default": False, "tooltip": "Remove duplicate texts before encoding."},
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
    }
