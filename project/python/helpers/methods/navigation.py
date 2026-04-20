"""Latent-space manipulation and navigation primitives (M1-M4)."""

from __future__ import annotations
from typing import Iterable, List, Optional, Sequence
import torch
from helpers.methods.access import PromptEmbeddingBundle, encode_prompt_embeddings
from diffusers import Flux2KleinPipeline, DiffusionPipeline


def _validate_same_shape(start: torch.Tensor, end: torch.Tensor) -> None:
    """Ensure operations are only applied to shape-compatible tensors."""
    if start.shape != end.shape:
        raise ValueError(f"Shape mismatch: {start.shape} != {end.shape}")


def _validate_alpha(alpha: float) -> None:
    """Validate interpolation factor bounds."""
    if not 0.0 <= alpha <= 1.0:
        raise ValueError("alpha must be in [0, 1]")


def lerp_latents(start: torch.Tensor, end: torch.Tensor, alpha: float) -> torch.Tensor:
    """Linear interpolation between two shape-compatible latent tensors."""
    _validate_same_shape(start, end)
    _validate_alpha(alpha)
    return torch.lerp(start, end, alpha)


def slerp_latents(
    start: torch.Tensor,
    end: torch.Tensor,
    alpha: float,
    dot_threshold: float = 0.9995,
    eps: float = 1e-7,
) -> torch.Tensor:
    """Spherical interpolation for latent tensors.

    When vectors are nearly collinear, the function falls back to linear
    interpolation for numerical stability.
    """
    _validate_same_shape(start, end)
    _validate_alpha(alpha)

    original_dtype = start.dtype
    v0 = start.float().reshape(-1)
    v1 = end.float().reshape(-1)

    v0_norm = v0 / (torch.norm(v0) + eps)
    v1_norm = v1 / (torch.norm(v1) + eps)

    dot = torch.dot(v0_norm, v1_norm).clamp(-1.0 + eps, 1.0 - eps)

    if torch.abs(dot) > dot_threshold:
        out = (1.0 - alpha) * v0 + alpha * v1
    else:
        theta = torch.acos(dot)
        sin_theta = torch.sin(theta)
        out = (
            torch.sin((1.0 - alpha) * theta) * v0 + torch.sin(alpha * theta) * v1
        ) / sin_theta

    return out.reshape_as(start).to(dtype=original_dtype)


def seed_walks(
    seed_a: int,
    seed_b: int,
    shape: Sequence[int],
    *,
    steps: int | None = None,
    alphas: Iterable[float] | None = None,
    method: str = "slerp",
    dtype: torch.dtype = torch.float32,
    device: torch.device | str = "cpu",
) -> List[torch.Tensor]:
    """Deterministic latent trajectories of seeds (Seed Trajectory Navigation).

    Provide exactly one of:
    - ``steps`` for evenly spaced alphas from 0 to 1
    - ``alphas`` for explicit interpolation positions
    """
    if (steps is None) == (alphas is None):
        raise ValueError("Provide exactly one of 'steps' or 'alphas'")

    if steps is not None:
        if int(steps) < 2:
            raise ValueError("steps must be >= 2")
        alpha_values = torch.linspace(
            0.0, 1.0, steps=int(steps), dtype=torch.float32
        ).tolist()
    else:
        alpha_values = [float(alpha) for alpha in alphas or []]
        if not alpha_values:
            raise ValueError("alphas must not be empty")

    generator_a = torch.Generator(device="cpu").manual_seed(int(seed_a))
    generator_b = torch.Generator(device="cpu").manual_seed(int(seed_b))
    start = torch.randn(shape, dtype=dtype, device=device, generator=generator_a)
    end = torch.randn(shape, dtype=dtype, device=device, generator=generator_b)

    trajectory: List[torch.Tensor] = []
    for alpha in alpha_values:
        if method == "lerp":
            trajectory.append(lerp_latents(start, end, float(alpha)))
        elif method == "slerp":
            trajectory.append(slerp_latents(start, end, float(alpha)))
        else:
            raise ValueError("method must be 'lerp' or 'slerp'")

    return trajectory


def delta_walks(
    start: torch.Tensor,
    end: torch.Tensor,
    scales: Iterable[float],
) -> List[torch.Tensor]:
    """High-level direction navigation from start/end endpoints.

    The function derives ``direction = end - start`` internally and returns
    ``start + scale * direction`` for each value in ``scales``.
    """
    _validate_same_shape(start, end)
    direction = end - start
    return [start + float(scale) * direction for scale in scales]


def blend_prompt_embeddings(
    start: PromptEmbeddingBundle,
    end: PromptEmbeddingBundle,
    alpha: float,
) -> PromptEmbeddingBundle:
    """Linearly blend two prompt-conditioning bundles.

    ``alpha=0`` returns ``start`` and ``alpha=1`` returns ``end``.
    """
    _validate_alpha(alpha)

    prompt_embeds = lerp_latents(start.prompt_embeds, end.prompt_embeds, alpha)

    pooled_prompt_embeds: Optional[torch.Tensor] = None
    if start.pooled_prompt_embeds is not None and end.pooled_prompt_embeds is not None:
        pooled_prompt_embeds = lerp_latents(
            start.pooled_prompt_embeds,
            end.pooled_prompt_embeds,
            alpha,
        )

    # Keep token id metadata if present in either source bundle.
    text_ids = start.text_ids if start.text_ids is not None else end.text_ids

    return PromptEmbeddingBundle(
        prompt_embeds=prompt_embeds,
        pooled_prompt_embeds=pooled_prompt_embeds,
        text_ids=text_ids,
    )


def blend_prompt_pair(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    prompt_a: str,
    prompt_b: str,
    alpha: float,
    max_sequence_length: int = 256,
    device: Optional[torch.device | str] = None,
) -> PromptEmbeddingBundle:
    """Encode two prompts and return blended conditioning embeddings.

    This convenience wrapper supports exploration of semantic
    transitions without exposing intermediate encoding boilerplate.
    """
    emb_a = encode_prompt_embeddings(
        pipe=pipe,
        prompt=prompt_a,
        max_sequence_length=max_sequence_length,
        device=device,
    )
    emb_b = encode_prompt_embeddings(
        pipe=pipe,
        prompt=prompt_b,
        max_sequence_length=max_sequence_length,
        device=device,
    )
    return blend_prompt_embeddings(emb_a, emb_b, alpha)
