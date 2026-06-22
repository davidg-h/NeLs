"""NELS Comparison Grid node - arrange IMAGE batches as rows for side-by-side comparison"""

import torch
import torch.nn.functional as F


class NelsComparisonGrid:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", {}),
            },
            "optional": {
                "thumb_width": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 2048,
                        "step": 8,
                        "tooltip": "Resize each frame to this width. 0 = keep original.",
                    },
                ),
                "thumb_height": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 2048,
                        "step": 8,
                        "tooltip": "Resize each frame to this height. 0 = keep original.",
                    },
                ),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("grid",)
    INPUT_IS_LIST = True
    FUNCTION = "execute"
    CATEGORY = "nels/visualization"

    def execute(
        self,
        images: list[torch.Tensor],
        thumb_width: list[int] | None = None,
        thumb_height: list[int] | None = None,
    ):
        tw = (thumb_width[0] if thumb_width else 0) or 0
        th = (thumb_height[0] if thumb_height else 0) or 0

        if (tw > 0) != (th > 0):
            raise ValueError(
                "nels_ComparisonGrid: set both thumb_width and thumb_height, or neither."
            )

        rows = list(images)  # each is [B, H, W, C]
        if not rows:
            return (torch.zeros(1, 256, 512, 3),)

        if tw > 0 or th > 0:
            resized = []
            for row in rows:
                B, H, W, C = row.shape
                new_w = tw if tw > 0 else W
                new_h = th if th > 0 else H
                t = row.permute(0, 3, 1, 2).float()
                t = F.interpolate(t, size=(new_h, new_w), mode="bilinear", align_corners=False)
                resized.append(t.permute(0, 2, 3, 1))
            rows = resized

        max_steps = max(r.shape[0] for r in rows)
        _, fH, fW, fC = rows[0].shape

        total_w = max_steps * fW
        total_h = len(rows) * fH

        grid = torch.full((total_h, total_w, fC), 0.08)

        for row_idx, row_frames in enumerate(rows):
            B = row_frames.shape[0]
            y0 = row_idx * fH
            for col_idx in range(B):
                x0 = col_idx * fW
                grid[y0 : y0 + fH, x0 : x0 + fW] = row_frames[col_idx].float()

        return (grid.unsqueeze(0),)


NODE_CLASS_MAPPINGS = {"nels_ComparisonGrid": NelsComparisonGrid}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_ComparisonGrid": "NELS Comparison Grid"}
