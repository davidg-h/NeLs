"""
NELS Prompt Conditioning Batch node:
converts a NELS_TRAJECTORY to a ComfyUI CONDITIONING batch.
"""

from __future__ import annotations

from typing import Any

import torch


class NelsPromptConditioningBatch:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "trajectory": ("NELS_TRAJECTORY", {}),
            }
        }

    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("conditioning",)
    FUNCTION = "execute"
    CATEGORY = "nels/visualization"

    def execute(self, trajectory: dict[str, Any]):
        if not trajectory.get("has_cond_tensors"):
            raise ValueError(
                "This trajectory has no cond tensors. "
                "Re-encode the dataset with save_full_cond=True. "
                "Note: T5/Flux T5 cond tensors are very large (~4GB/1k samples) — "
                "use CLIP-L or CLIP-G datasets for this node."
            )

        points = trajectory.get("points", [])
        if not points:
            raise ValueError("trajectory contains no points.")

        cond_tensors: list[torch.Tensor] = []
        pooled_tensors: list[torch.Tensor] = []

        for pt in points:
            cond = pt.get("cond_tensor")
            if cond is None:
                raise ValueError(
                    f"Trajectory point {pt.get('id')!r} is missing cond_tensor. "
                    "All trajectory steps must have cond tensors."
                )
            pooled = pt.get("tensor")
            if pooled is None:
                raise ValueError(
                    f"Trajectory point {pt.get('id')!r} is missing tensor."
                )
            cond_tensors.append(cond.float())
            pooled_tensors.append(pooled.detach().float())

        # Stack to [B, seq_len, hidden_dim] and [B, hidden_dim]
        cond_batch = torch.stack(cond_tensors)
        pooled_batch = torch.stack(pooled_tensors)

        # ComfyUI CONDITIONING format => list of (cond_tensor, extra_dict)
        # Each element is one batch. We pass the full batch as a single conditioning entry.
        conditioning = [(cond_batch, {"pooled_output": pooled_batch})]
        return (conditioning,)


NODE_CLASS_MAPPINGS = {"nels_PromptConditioningBatch": NelsPromptConditioningBatch}
NODE_DISPLAY_NAME_MAPPINGS = {
    "nels_PromptConditioningBatch": "NELS Prompt Conditioning Batch"
}
