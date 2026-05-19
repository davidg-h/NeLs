"""
NELS trajectory decode nodes:
convert NELS_TRAJECTORY to ComfyUI IMAGE.
"""

from __future__ import annotations

import json
from typing import Any

import torch


class NelsSequenceDecode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "trajectory": ("NELS_TRAJECTORY", {}),
                "vae": ("VAE", {}),
            }
        }

    RETURN_TYPES = ("IMAGE", "STRING")
    RETURN_NAMES = ("images", "metadata_json")
    FUNCTION = "execute"
    CATEGORY = "nels/visualization"

    def execute(self, trajectory: dict[str, Any], vae: Any):
        embedding_type = trajectory.get("embedding_type")
        if embedding_type == "prompt_embedding":
            raise ValueError(
                "nels_SequenceDecode only works with image_latent datasets. "
                "For prompt datasets use nels_PromptConditioningBatch -> KSampler -> VAE Decode."
            )

        image_pooling = trajectory.get("image_pooling")
        if image_pooling == "spatial_mean":
            raise ValueError(
                "This dataset was encoded with spatial_mean pooling, which discards spatial "
                "structure. Re-encode with image_pooling=flatten (the default) to decode trajectory steps."
            )

        latent_shape = trajectory.get("latent_shape")
        if not latent_shape or len(latent_shape) != 3:
            raise ValueError(
                f"trajectory is missing a valid latent_shape [C, H, W]. Got: {latent_shape!r}. "
                "Re-encode the dataset to populate this field."
            )

        C, H, W = latent_shape
        points = trajectory.get("points", [])
        if not points:
            raise ValueError("trajectory contains no points.")

        latents = []
        for pt in points:
            t = pt.get("tensor")
            if t is None:
                raise ValueError(f"Trajectory point {pt.get('id')!r} has no tensor.")
            try:
                latents.append(t.detach().float().reshape(C, H, W))
            except RuntimeError as e:
                raise ValueError(
                    f"Cannot reshape tensor of shape {list(t.shape)} to [{C}, {H}, {W}]. "
                    f"Check that the dataset was encoded with consistent image dimensions. ({e})"
                ) from e

        stacked = torch.stack(latents)  # [B, C, H, W]
        decoded = vae.decode(stacked)  # [B, H, W, C]

        meta = {
            "operation": trajectory.get("operation"),
            "source_point_ids": trajectory.get("source_point_ids", []),
            "steps": len(points),
            "latent_shape": latent_shape,
            "alpha_values": [float(pt.get("alpha", 0)) for pt in points],
            "step_ids": [str(pt.get("id", "")) for pt in points],
        }
        return (decoded, json.dumps(meta, indent=2))


NODE_CLASS_MAPPINGS = {"nels_SequenceDecode": NelsSequenceDecode}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_SequenceDecode": "NELS Sequence Decode"}
