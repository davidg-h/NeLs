"""Sampling wrappers for prompt- and embedding-driven FLUX generation."""

from __future__ import annotations
import json
import inspect
from pathlib import Path
import time
from typing import Any, Dict, Optional
import torch
from helpers.methods.access import PromptEmbeddingBundle
from helpers.runtime.utils import timestamp_utc
from diffusers import Flux2KleinPipeline, DiffusionPipeline


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

    return {key: value for key, value in kwargs.items() if key in signature.parameters}


def _attach_runtime_controls(
    kwargs: Dict[str, Any],
    execution_device: torch.device | str,
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


def _maybe_sync_cuda(enabled: bool) -> None:
    if not enabled or not torch.cuda.is_available():
        return

    try:
        torch.cuda.synchronize()
    except Exception:
        pass


def timed_inference(
    fn,
    *args,
    use_inference_mode: bool = True,
    synchronize_cuda: bool = True,
    **kwargs,
):
    """Run an inference call and return ``(result, elapsed_seconds)``."""
    _maybe_sync_cuda(synchronize_cuda)
    t0 = time.perf_counter()

    if use_inference_mode:
        with torch.inference_mode():
            result = fn(*args, **kwargs)
    else:
        result = fn(*args, **kwargs)

    _maybe_sync_cuda(synchronize_cuda)
    return result, (time.perf_counter() - t0)


def generate_prompt_baseline(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    prompt: str,
    seed: int,
    device: torch.device | str,
    **generation_kwargs,
):
    """Generate a baseline image (no latent edits/manipulations) with timing."""
    result, elapsed = timed_generate_with_prompt(
        pipe=pipe,
        prompt=prompt,
        seed=seed,
        device=device,
        **generation_kwargs,
    )
    return result.images[0], elapsed, result


def timed_generate_with_prompt(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    prompt: str,
    device: torch.device | str,
    seed: int = 0,
    latents: Optional[torch.Tensor] = None,
    callback: Optional[Any] = None,
    callback_tensor_inputs: Optional[list[str]] = None,
    use_inference_mode: bool = True,
    synchronize_cuda: bool = True,
    **generation_kwargs,
):
    """Timed wrapper around ``generate_with_prompt``."""
    return timed_inference(
        generate_with_prompt,
        pipe=pipe,
        prompt=prompt,
        device=device,
        seed=seed,
        latents=latents,
        callback=callback,
        callback_tensor_inputs=callback_tensor_inputs,
        use_inference_mode=use_inference_mode,
        synchronize_cuda=synchronize_cuda,
        **generation_kwargs,
    )


def timed_generate_with_embeddings(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    embeddings: PromptEmbeddingBundle,
    device: torch.device | str,
    seed: int = 0,
    latents: Optional[torch.Tensor] = None,
    callback: Optional[Any] = None,
    callback_tensor_inputs: Optional[list[str]] = None,
    use_inference_mode: bool = True,
    synchronize_cuda: bool = True,
    **generation_kwargs,
):
    """Timed wrapper around ``generate_with_embeddings``."""
    return timed_inference(
        generate_with_embeddings,
        pipe=pipe,
        embeddings=embeddings,
        device=device,
        seed=seed,
        latents=latents,
        callback=callback,
        callback_tensor_inputs=callback_tensor_inputs,
        use_inference_mode=use_inference_mode,
        synchronize_cuda=synchronize_cuda,
        **generation_kwargs,
    )


def _quick_log_header(run_name: str, config: dict[str, Any] | None) -> str:
    return "\n".join(
        [
            "# NELS quick log",
            f"run_name: {run_name}",
            f"timestamp_utc: {timestamp_utc()}",
            "config:",
            json.dumps(config or {}, indent=2, sort_keys=True),
            "",
        ]
    )


def _quick_log_sample_block(
    *,
    timestamp_utc: str,
    label: str,
    image_name: str,
    elapsed_seconds: float,
    params: dict[str, Any] | None,
) -> str:
    return "\n".join(
        [
            "## sample",
            f"timestamp_utc: {timestamp_utc}",
            f"label: {label}",
            f"image: {image_name}",
            f"elapsed_seconds: {elapsed_seconds:.4f}",
            "params:",
            json.dumps(params or {}, indent=2, sort_keys=True),
            "",
        ]
    )


def start_quick_log(
    log_path: str | Path,
    *,
    run_name: str,
    config: dict[str, Any] | None = None,
) -> None:
    """Initialize a human-readable quick log file."""
    resolved = Path(log_path)
    resolved.parent.mkdir(parents=True, exist_ok=True)
    resolved.write_text(_quick_log_header(run_name, config), encoding="utf-8")


def append_quick_log_entry(
    log_path: str | Path,
    *,
    image_path: str | Path,
    label: str,
    elapsed_seconds: float,
    params: dict[str, Any] | None = None,
) -> None:
    """Append one image-linked quick log record."""
    resolved = Path(log_path)
    entry = _quick_log_sample_block(
        timestamp_utc=timestamp_utc(),
        label=label,
        image_name=Path(image_path).name,
        elapsed_seconds=float(elapsed_seconds),
        params=params,
    )
    with resolved.open("a", encoding="utf-8") as handle:
        handle.write(entry)


def dump_json(path: str | Path, payload: dict[str, Any]) -> None:
    """Write JSON payload to disk with stable formatting."""
    resolved = Path(path)
    resolved.parent.mkdir(parents=True, exist_ok=True)
    resolved.write_text(json.dumps(payload, indent=2, sort_keys=True), encoding="utf-8")


def append_jsonl(path: str | Path, payload: dict[str, Any]) -> None:
    """Append a JSON object as one line in a JSONL file."""
    resolved = Path(path)
    resolved.parent.mkdir(parents=True, exist_ok=True)
    with resolved.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload, sort_keys=True) + "\n")


def generate_with_prompt(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    prompt: str,
    device: torch.device | str,
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
    generation_kwargs["prompt"] = prompt
    _attach_runtime_controls(
        kwargs=generation_kwargs,
        execution_device=device,
        seed=seed,
        latents=latents,
        callback=callback,
        callback_tensor_inputs=callback_tensor_inputs,
    )
    return pipe(**_filter_supported_call_kwargs(pipe, generation_kwargs))


def generate_with_embeddings(
    pipe: Flux2KleinPipeline | DiffusionPipeline,
    embeddings: PromptEmbeddingBundle,
    device: torch.device | str,
    seed: int = 0,
    latents: Optional[torch.Tensor] = None,
    callback: Optional[Any] = None,
    callback_tensor_inputs: Optional[list[str]] = None,
    **generation_kwargs,
):
    """Generate from precomputed prompt embeddings (A4 pathway)."""
    generation_kwargs.update(embeddings.to_pipeline_kwargs())
    _move_tensor_kwargs_to_device(
        generation_kwargs,
        device,
        [
            "prompt_embeds",
            "pooled_prompt_embeds",
            "negative_prompt_embeds",
            "text_ids",
        ],
    )
    _attach_runtime_controls(
        kwargs=generation_kwargs,
        execution_device=device,
        seed=seed,
        latents=latents,
        callback=callback,
        callback_tensor_inputs=callback_tensor_inputs,
    )
    return pipe(**_filter_supported_call_kwargs(pipe, generation_kwargs))
