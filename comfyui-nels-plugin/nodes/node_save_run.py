"""NELS Save Run Bundle node - saves trajectory images and metadata to disk"""

import json
from datetime import datetime
from pathlib import Path
from typing import Any

import numpy as np
import torch
from PIL import Image as PILImage

from ..core.tensor_ops import flatten_tensor


class NelsSaveRunBundle:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", {}),
                "trajectory": ("NELS_TRAJECTORY", {}),
            },
            "optional": {
                "run_id": (
                    "STRING",
                    {"default": "run_001", "tooltip": "Subfolder name for this run."},
                ),
                "output_dir": (
                    "STRING",
                    {
                        "default": "experiments/runs",
                        "tooltip": "Root output directory (absolute or relative to ComfyUI).",
                    },
                ),
                "operation_result_json": (
                    "STRING",
                    {
                        "default": "",
                        "multiline": True,
                        "tooltip": "Connect NELS Graph Operation's operation_result_json to save it as result.json alongside the images.",
                    },
                ),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("manifest_json",)
    OUTPUT_NODE = True
    FUNCTION = "execute"
    CATEGORY = "nels/visualization"

    def execute(
        self,
        images: torch.Tensor,
        trajectory: dict[str, Any],
        run_id: str = "run_001",
        output_dir: str = "experiments/runs",
        operation_result_json: str = "",
    ):
        out_path = Path(output_dir) / run_id.strip()
        out_path.mkdir(parents=True, exist_ok=True)

        points = trajectory.get("points", [])
        saved_files: list[str] = []

        for i, img_tensor in enumerate(images):
            alpha = float(points[i].get("alpha", 0)) if i < len(points) else 0.0
            fname = f"step_{i:03d}_alpha_{alpha:.3f}.png"
            fpath = out_path / fname
            arr = (img_tensor.cpu().float().clamp(0, 1).numpy() * 255).astype(np.uint8)
            PILImage.fromarray(arr).save(str(fpath))
            saved_files.append(str(fpath))

        meta = {
            "run_id": run_id,
            "timestamp": datetime.now().isoformat(),
            "operation": trajectory.get("operation"),
            "source_point_ids": trajectory.get("source_point_ids", []),
            "source_texts": trajectory.get("source_texts", []),
            "alpha_schedule": [float(pt.get("alpha", 0)) for pt in points],
            "steps": len(saved_files),
            "files": saved_files,
            "output_dir": str(out_path),
        }
        meta_path = out_path / "metadata.json"
        meta_path.write_text(json.dumps(meta, indent=2))

        # Compact embeddings, one row per trajectory step (same order as the saved images)
        step_tensors = [pt.get("tensor") for pt in points if pt.get("tensor") is not None]
        has_embeddings_npy = False
        if step_tensors:
            embeddings = np.stack([flatten_tensor(t).cpu().numpy() for t in step_tensors])
            np.save(str(out_path / "embeddings.npy"), embeddings.astype(np.float32))
            has_embeddings_npy = True

        if operation_result_json.strip():
            result_path = out_path / "result.json"
            result_text = operation_result_json
            if has_embeddings_npy:
                # Drop the per-step "embedding" field before writing embeddings.npy above
                try:
                    parsed = json.loads(operation_result_json)
                    for step in parsed.get("trajectory", []):
                        step.pop("embedding", None)
                    for step in parsed.get("text_reconstruction", {}).get("history", []):
                        step.pop("embedding", None)
                    result_text = json.dumps(parsed, indent=2)
                except (json.JSONDecodeError, AttributeError):
                    pass
            result_path.write_text(result_text)

        return (json.dumps(meta, indent=2),)


NODE_CLASS_MAPPINGS = {"nels_SaveRunBundle": NelsSaveRunBundle}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_SaveRunBundle": "NELS Save Run Bundle"}
