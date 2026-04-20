"""Sampling wrappers for prompt- and embedding-driven FLUX generation."""

from __future__ import annotations
import inspect
from typing import Any, Dict, Optional
import torch
from helpers.methods.access import PromptEmbeddingBundle
from diffusers import Flux2KleinPipeline, DiffusionPipeline


def _default_generation_kwargs(
    prompt: Optional[str] = None,
    height: int = 1024,
    width: int = 1024,
    num_inference_steps: int = 4,
    guidance_scale: float = 0.0,
    max_sequence_length: int = 256,
) -> Dict[str, Any]:
    """Return baseline generation kwargs for quick notebook iteration."""

    kwargs: Dict[str, Any] = {
        "height": height,
        "width": width,
        "num_inference_steps": num_inference_steps,
        "guidance_scale": guidance_scale,
        "max_sequence_length": max_sequence_length,
    }
    if prompt is not None:
        kwargs["prompt"] = prompt
    return kwargs


def _pipeline_execution_device(pipe: Flux2KleinPipeline | DiffusionPipeline) -> torch.device:
    """Best-effort pipeline execution device resolution."""
    for attr_name in ("_execution_device", "device"):
        value = getattr(pipe, attr_name, None)
        if value is not None:
            try:
                return torch.device(value)
            except Exception:
                pass

    for module_name in ("transformer", "unet", "vae", "text_encoder"):
        module = getattr(pipe, module_name, None)
        if module is None:
            continue
        try:
            return next(module.parameters()).device
        except Exception:
            continue

    return torch.device("cpu")


def _seeded_generator(seed: int, device: torch.device) -> torch.Generator:
    """Create a deterministic generator, preferring the pipeline execution device."""
    try:
        return torch.Generator(device=str(device)).manual_seed(int(seed))
    except Exception:
        return torch.Generator(device="cpu").manual_seed(int(seed))


def _move_tensor_kwargs_to_device(
    kwargs: Dict[str, Any],
    device: torch.device,
    keys: list[str],
) -> None:
    """Move selected tensor kwargs to the target device when present."""
    for key in keys:
        value = kwargs.get(key)
        if isinstance(value, torch.Tensor):
            kwargs[key] = value.to(device)


def _filter_supported_call_kwargs(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    kwargs: Dict[str, Any],
) -> Dict[str, Any]:
    """Drop kwargs unsupported by the active pipeline call signature."""
    try:
        signature = inspect.signature(pipe.__call__)
    except Exception:
        return dict(kwargs)

    if any(
        param.kind == inspect.Parameter.VAR_KEYWORD
        for param in signature.parameters.values()
    ):
        return dict(kwargs)

    return {
        key: value
        for key, value in kwargs.items()
        if key in signature.parameters
    }


def _attach_runtime_controls(
    kwargs: Dict[str, Any],
    execution_device: torch.device,
    seed: int,
    latents: Optional[torch.Tensor],
    callback: Optional[Any],
    callback_tensor_inputs: Optional[list[str]],
) -> None:
    """Attach optional runtime controls shared by all generation pathways."""
    kwargs["generator"] = _seeded_generator(seed, execution_device)

    if latents is not None:
        kwargs["latents"] = latents.to(execution_device)

    if callback is not None:
        kwargs["callback_on_step_end"] = callback
        kwargs["callback_on_step_end_tensor_inputs"] = callback_tensor_inputs or [
            "latents"
        ]


def generate_with_prompt(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    prompt: str,
    seed: int = 0,
    latents: Optional[torch.Tensor] = None,
    callback: Optional[Any] = None,
    callback_tensor_inputs: Optional[list[str]] = None,
    **generation_kwargs,
):
    """Generate from a text prompt with optional latent injection (A3).

    ``callback`` and ``callback_tensor_inputs`` are passed through to
    Diffusers so denoising internals can be captured in notebooks.
    """
    execution_device = _pipeline_execution_device(pipe)
    kwargs = _default_generation_kwargs(prompt=prompt)
    kwargs.update(generation_kwargs)
    _attach_runtime_controls(
        kwargs=kwargs,
        execution_device=execution_device,
        seed=seed,
        latents=latents,
        callback=callback,
        callback_tensor_inputs=callback_tensor_inputs,
    )
    return pipe(**_filter_supported_call_kwargs(pipe, kwargs))


def generate_with_embeddings(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    embeddings: PromptEmbeddingBundle,
    seed: int = 0,
    latents: Optional[torch.Tensor] = None,
    callback: Optional[Any] = None,
    callback_tensor_inputs: Optional[list[str]] = None,
    **generation_kwargs,
):
    """Generate from precomputed prompt embeddings (A4 pathway)."""
    execution_device = _pipeline_execution_device(pipe)
    kwargs = _default_generation_kwargs(prompt=None)
    kwargs.update(generation_kwargs)
    kwargs.update(embeddings.to_pipeline_kwargs())
    _move_tensor_kwargs_to_device(
        kwargs,
        execution_device,
        [
            "prompt_embeds",
            "negative_prompt_embeds",
            "text_ids",
        ],
    )
    _attach_runtime_controls(
        kwargs=kwargs,
        execution_device=execution_device,
        seed=seed,
        latents=latents,
        callback=callback,
        callback_tensor_inputs=callback_tensor_inputs,
    )
    return pipe(**_filter_supported_call_kwargs(pipe, kwargs))
