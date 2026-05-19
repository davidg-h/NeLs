"""
NELS Stability Heatmap:
per-pixel variance across trajectory frames, colormapped.
"""

from __future__ import annotations

import numpy as np
import torch

# Turbo-style 7-stop colormap: deep navy -> blue -> cyan -> green -> yellow -> orange -> crimson
# Each row is (R, G, B) in [0, 1]
_STOPS = np.array(
    [
        [0.102, 0.039, 0.290],  # 0.000  deep navy
        [0.125, 0.251, 0.816],  # 0.167  blue
        [0.000, 0.706, 0.784],  # 0.333  cyan
        [0.000, 0.753, 0.376],  # 0.500  green
        [0.910, 0.816, 0.000],  # 0.667  yellow
        [0.941, 0.439, 0.000],  # 0.833  orange
        [0.800, 0.063, 0.125],  # 1.000  crimson
    ],
    dtype=np.float32,
)

_STOP_POS = np.array([0.0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1.0], dtype=np.float32)


def _apply_colormap(values: np.ndarray) -> np.ndarray:
    """Map float array [0, 1] -> RGB [0, 1] via the turbo colormap (blue=stable, red=high variance)."""
    v = np.clip(values, 0.0, 1.0).ravel()
    rgb = np.zeros((len(v), 3), dtype=np.float32)
    for c in range(3):
        rgb[:, c] = np.interp(v, _STOP_POS, _STOPS[:, c])
    return rgb.reshape(values.shape + (3,))


class NelsStabilityHeatmap:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", {}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("heatmap",)
    FUNCTION = "execute"
    CATEGORY = "nels/visualization"

    def execute(self, images: torch.Tensor):
        # images: [B, H, W, C]
        if images.shape[0] < 2:
            raise ValueError(
                "nels_StabilityHeatmap needs at least 2 frames. "
                "Connect the IMAGE output of nels_SequenceDecode with alpha_schedule containing ≥2 steps."
            )

        frames = images.float()  # [B, H, W, C]

        # Per pixel variance across frames, averaged over channels -> [H, W]
        variance = torch.var(frames, dim=0).mean(dim=-1).cpu().numpy()

        # Normalize to [0, 1]
        lo, hi = float(variance.min()), float(variance.max())
        if hi > lo:
            norm = (variance - lo) / (hi - lo)
        else:
            norm = np.zeros_like(variance)

        rgb = _apply_colormap(norm)  # [H, W, 3]
        out = torch.from_numpy(rgb).unsqueeze(0)  # [1, H, W, 3]
        return (out,)


NODE_CLASS_MAPPINGS = {"nels_StabilityHeatmap": NelsStabilityHeatmap}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_StabilityHeatmap": "NELS Stability Heatmap"}
