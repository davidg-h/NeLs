"""NELS Dataset Annotator - generates LLM cluster labels for a pre-encoded dataset"""

from ..core.dataset_io import resolve_dataset_path
from ..core.defaults import DEFAULT_DATASETS, DEFAULT_LLM_MODEL
from ..core.operations.cluster_annotation import ANNOTATION_TOP_N, annotate_clusters


class NelsDatasetAnnotator:
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
                "model_name": (
                    "STRING",
                    {
                        "default": DEFAULT_LLM_MODEL,
                        "tooltip": "HuggingFace model ID for cluster annotation.",
                    },
                ),
                "top_n": (
                    "INT",
                    {
                        "default": ANNOTATION_TOP_N,
                        "min": 1,
                        "max": 50,
                        "step": 1,
                        "tooltip": "Number of top prompts per cluster sent to the LLM.",
                    },
                ),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("annotation_info",)
    OUTPUT_NODE = True
    FUNCTION = "execute"
    CATEGORY = "nels/data"

    def execute(self, dataset_path: str, model_name: str, top_n: int):
        resolved = resolve_dataset_path(dataset_path.strip(), datasets_root=DEFAULT_DATASETS)
        cluster_labels = annotate_clusters(resolved, model_name=model_name, top_n=top_n)
        info = f"Annotated {len(cluster_labels)} clusters in {resolved}\nModel: {model_name} top_n: {top_n}"
        return (info,)


NODE_CLASS_MAPPINGS = {"nels_DatasetAnnotator": NelsDatasetAnnotator}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_DatasetAnnotator": "NELS Dataset Annotator"}
