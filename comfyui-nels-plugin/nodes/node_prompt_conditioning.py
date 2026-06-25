"""NELS Prompt Conditioning Batch - packages NELS_TRAJECTORY conditioning for KSampler"""

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

    RETURN_TYPES = ("CONDITIONING", "INT")
    RETURN_NAMES = ("conditioning", "batch_size")
    FUNCTION = "execute"
    CATEGORY = "nels/visualization"

    def execute(self, trajectory: dict[str, Any]):
        points = trajectory.get("points", [])
        if not points:
            raise ValueError("trajectory contains no points.")
        if "cond" not in points[0]:
            raise ValueError(
                "Trajectory has no conditioning data. "
                "Connect a CLIP node to the NELS Graph Operation node."
            )

        step_conds = [pt["cond"].detach().float() for pt in points]
        cond_batch = torch.stack(step_conds)
        pooled_steps = [pt.get("pooled_output") for pt in points]

        if all(pooled is not None for pooled in pooled_steps):
            pooled_batch = torch.stack([pooled.detach().float() for pooled in pooled_steps])
        elif any(pooled is not None for pooled in pooled_steps):
            raise ValueError("Trajectory conditioning has inconsistent pooled_output coverage.")
        else:
            pooled_batch = None

        # pooled_output key always present, None when the encoder has no pooling head
        conditioning = [(cond_batch, {"pooled_output": pooled_batch})]
        return (conditioning, len(points))


NODE_CLASS_MAPPINGS = {"nels_PromptConditioningBatch": NelsPromptConditioningBatch}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_PromptConditioningBatch": "NELS Prompt Conditioning Batch"}
