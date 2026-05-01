"""Access-layer primitives for FLUX latent and conditioning spaces.

These helpers are designed for notebook-first experimentation and expose
stable operations that later map cleanly to ComfyUI node logic.
"""

from __future__ import annotations
import inspect
from dataclasses import dataclass
from typing import Any, Dict, Optional, Tuple

import numpy as np
import torch
from PIL import Image
from diffusers import Flux2KleinPipeline, DiffusionPipeline


@dataclass(frozen=True)
class PromptEmbeddingBundle:
    """Container for prompt-conditioning tensors expected by FLUX pipelines.

    FLUX prompt encoding may return multiple tensor groups depending on Diffusers version and pipeline variant. Bundling them keeps code explicit and avoids positional tuple handling.
    Type-safe container for interpolation (e.g., "cat" → "dog") and consistent access to conditioning components across Diffusers versions.
    """

    prompt_embeds: torch.Tensor
    pooled_prompt_embeds: Optional[torch.Tensor] = None
    text_ids: Optional[torch.Tensor] = None

    def to_pipeline_kwargs(self) -> Dict[str, torch.Tensor]:
        """Build dict containing keyword arguments accepted by ``pipe(...)`` generation calls."""
        kwargs: Dict[str, torch.Tensor] = {"prompt_embeds": self.prompt_embeds}
        if self.pooled_prompt_embeds is not None:
            kwargs["pooled_prompt_embeds"] = self.pooled_prompt_embeds
        if self.text_ids is not None:
            kwargs["text_ids"] = self.text_ids
        return kwargs


def _vae_config_value(vae: Any, key: str, default: float) -> float:
    """Read a scalar VAE config value across dict- and attribute-style configs."""
    config = getattr(vae, "config", None)
    if config is None:
        return float(default)

    value: Any = None
    if hasattr(config, key):
        value = getattr(config, key)

    if value is None:
        try:
            value = config.get(key)
        except Exception:
            value = None

    if value is None:
        return float(default)

    return float(value)


def _vae_latent_scaling(pipe: Flux2KleinPipeline | DiffusionPipeline) -> Tuple[float, float]:
    """Return (scaling_factor, shift_factor) with compatibility defaults."""
    if not hasattr(pipe, "vae") or pipe.vae is None:
        raise AttributeError("Pipeline has no VAE component.")

    scaling_factor = _vae_config_value(pipe.vae, "scaling_factor", 1.0)
    shift_factor = _vae_config_value(pipe.vae, "shift_factor", 0.0)
    return scaling_factor, shift_factor


def _filter_supported_kwargs(func: Any, kwargs: Dict[str, Any]) -> Dict[str, Any]:
    """Drop kwargs that are unsupported by a specific callable signature.

    Diffusers prompt-encoding signatures can differ across versions;
    filtering avoids passing unknown parameters.
    """
    signature = inspect.signature(func)
    # allow all keys if func declares **kwargs
    if any(
        p.kind == inspect.Parameter.VAR_KEYWORD for p in signature.parameters.values()
    ):
        return dict(kwargs)
    return {key: value for key, value in kwargs.items() if key in signature.parameters}


def infer_latent_shape(
    height: int,
    width: int,
    batch_size: int = 1,
    channels: int = 128,
    downsample_factor: int = 16,
) -> Tuple[int, int, int, int]:
    """Computes the expected shape of a VAE latent tensor from a desired image resolution. Image res -> FLUX latent res

    Pipeline:
    ```
        Input Image (H, W, 3)
                │
        VAE Encoder (H//16, W//16, 128)
                │
        Latent Tensor (batch, 128, H//16, W//16)
    ```

    Args:
        height: Input image height
        width: Input image width
        batch_size: Number of images
        channels: Latent channels (default: 128)
        downsample_factor: Spatial compression (default: 16)

    Defaults match FLUX.2 VAE assumptions: 128 channels and 16x spatial compression from image space to latent space.
    """
    return (
        batch_size,
        channels,
        height // downsample_factor,
        width // downsample_factor,
    )


def pil_to_vae_tensor(
    image: Image.Image,
    size: Optional[Tuple[int, int]] = None,
    device: Optional[torch.device | str] = None,
    dtype: Optional[torch.dtype] = None,
) -> torch.Tensor:
    """Convert a PIL image into a normalized VAE input tensor.

    The returned tensor is batched ``[1, C, H, W]`` and normalized to
    ``[-1, 1]`` as expected by FLUX VAE encoders.
    """
    image = image.convert("RGB")
    if size is not None:
        # ensure we have correct resolution
        image = image.resize(size)

    # pixel values in [0.0, 1.0]
    image_np = np.asarray(image).astype(np.float32) / 255.0
    # converts the HWC NumPy array to a CHW PyTorch tensor and adds a leading batch dimension, producing shape [1, C, H, W]
    tensor = torch.from_numpy(image_np).permute(2, 0, 1).unsqueeze(0)
    tensor = tensor * 2.0 - 1.0

    if device is not None or dtype is not None:
        tensor = tensor.to(device=device, dtype=dtype)
    return tensor


def encode_image_to_latents(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    image: Image.Image,
    size: Optional[Tuple[int, int]] = (1024, 1024),
    sample_posterior: bool = True,
    device: Optional[torch.device | str] = None,
    dtype: Optional[torch.dtype] = None,
) -> torch.Tensor:
    """Encode an image into into the VAE latent tensor the FLUX denoiser expects.

    When available, the VAE output is transformed using ``shift_factor`` and
    ``scaling_factor`` so the latent tensor is immediately compatible with
    FLUX denoising calls. Some VAE configs do not define these values; in
    that case identity defaults are used.
    """
    pixel_values = pil_to_vae_tensor(image=image, size=size, device=device, dtype=dtype)

    with torch.no_grad():
        encoded = pipe.vae.encode(pixel_values)
        latent_dist = encoded.latent_dist
        latents = latent_dist.sample() if sample_posterior else latent_dist.mean

    scaling_factor, shift_factor = _vae_latent_scaling(pipe)
    latents = (latents - shift_factor) * scaling_factor
    return latents


def decode_latents_to_image(
    pipe: Flux2KleinPipeline | DiffusionPipeline, latents: torch.Tensor
) -> Image.Image:
    """Decode a FLUX latent tensor back to a displayable PIL image.

    This function applies the inverse latent scaling transform before VAE
    decode, then converts decoder output from model range ``[-1, 1]`` to
    uint8 RGB. If scale/shift metadata is unavailable, inverse transform
    defaults to identity.
    """
    scaling_factor, shift_factor = _vae_latent_scaling(pipe)
    scaled = latents / scaling_factor + shift_factor

    with torch.no_grad():
        decoded = pipe.vae.decode(scaled, return_dict=False)[0]

    # converts values from [-1, 1] to [0, 1]
    decoded = (decoded / 2 + 0.5).clamp(0, 1)
    decoded = decoded.detach().cpu().permute(0, 2, 3, 1).float().numpy()
    decoded = (decoded * 255).round().astype("uint8")
    return Image.fromarray(decoded[0])


def vae_latents_to_denoiser_latents(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    vae_latents: torch.Tensor,
) -> torch.Tensor:
    """Map VAE-space latents to Flux2 denoiser-space latents for ``latents=...``.

    Flux2Klein denoising expects patchified and batch-normalized latents.
    This helper keeps that conversion explicit for A3 latent injection paths.
    """
    if vae_latents.ndim != 4:
        raise ValueError(
            f"Expected VAE latents with shape [B, C, H, W], got {tuple(vae_latents.shape)}"
        )

    batch, channels, height, width = vae_latents.shape
    if height % 2 != 0 or width % 2 != 0:
        raise ValueError(
            f"VAE latent spatial dims must be divisible by 2, got H={height}, W={width}"
        )

    expected_denoiser_channels = int(pipe.transformer.config.in_channels)
    if channels * 4 == expected_denoiser_channels:
        patchified = vae_latents.view(batch, channels, height // 2, 2, width // 2, 2)
        patchified = patchified.permute(0, 1, 3, 5, 2, 4).reshape(
            batch, channels * 4, height // 2, width // 2
        )
    elif channels == expected_denoiser_channels:
        # Some variants may already expose patchified channels.
        patchified = vae_latents
    else:
        raise ValueError(
            "Channel mismatch for Flux2 latent injection: "
            f"vae_channels={channels}, expected denoiser in_channels={expected_denoiser_channels}"
        )

    if not hasattr(pipe.vae, "bn"):
        raise AttributeError("Pipeline VAE has no 'bn' normalization module required by Flux2.")

    bn_mean = pipe.vae.bn.running_mean.view(1, -1, 1, 1).to(
        patchified.device, patchified.dtype
    )
    bn_var = pipe.vae.bn.running_var.view(1, -1, 1, 1).to(
        patchified.device, patchified.dtype
    )
    bn_std = torch.sqrt(bn_var + pipe.vae.config.batch_norm_eps)
    return (patchified - bn_mean) / bn_std


def encode_prompt_embeddings(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    prompt: str,
    prompt_2: Optional[str] = None,
    negative_prompt: Optional[str] = None,
    max_sequence_length: int = 256,
    num_images_per_prompt: int = 1,
    device: Optional[torch.device | str] = None,
) -> PromptEmbeddingBundle:
    """Encode text prompts into a normalized embedding bundle.

    The helper accepts tuple/dict return variants from Diffusers and maps
    them into one consistent ``PromptEmbeddingBundle`` type.
    """
    kwargs: Dict[str, Any] = {
        "prompt": prompt,
        "prompt_2": prompt_2,
        "negative_prompt": negative_prompt,
        "max_sequence_length": max_sequence_length,
        "num_images_per_prompt": num_images_per_prompt,
        "device": device,
    }
    filtered = _filter_supported_kwargs(pipe.encode_prompt, kwargs)
    encoded = pipe.encode_prompt(
        **filtered
    )

    if isinstance(encoded, PromptEmbeddingBundle):
        return encoded

    if isinstance(encoded, tuple):
        prompt_embeds = encoded[0]

        pooled_prompt_embeds: Optional[torch.Tensor] = None
        text_ids: Optional[torch.Tensor] = None

        # Handle tuple variants robustly by tensor dtype:
        # - floating tensors are treated as pooled embeddings
        # - non-floating tensors are treated as token ids
        for item in encoded[1:]:
            if not isinstance(item, torch.Tensor):
                continue

            if torch.is_floating_point(item):
                if pooled_prompt_embeds is None:
                    pooled_prompt_embeds = item
            else:
                if text_ids is None:
                    text_ids = item

        return PromptEmbeddingBundle(
            prompt_embeds=prompt_embeds,
            pooled_prompt_embeds=pooled_prompt_embeds,
            text_ids=text_ids,
        )

    if isinstance(encoded, dict):
        prompt_embeds = encoded["prompt_embeds"]
        pooled_prompt_embeds = encoded.get("pooled_prompt_embeds")
        text_ids = encoded.get("text_ids")
        return PromptEmbeddingBundle(
            prompt_embeds=prompt_embeds,
            pooled_prompt_embeds=pooled_prompt_embeds,
            text_ids=text_ids,
        )

    raise TypeError(f"Unsupported encode_prompt return type: {type(encoded)!r}")
