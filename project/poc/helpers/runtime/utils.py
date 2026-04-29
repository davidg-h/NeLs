"""Shared runtime utilities for notebooks and runnable examples."""

from __future__ import annotations

import gc
import os
import sys
from pathlib import Path
from typing import Any

import torch
from diffusers import DiffusionPipeline
from datetime import datetime, timezone


def print_runtime_paths() -> None:
    """Print runtime path diagnostics used in notebooks."""
    print("CWD:", Path.cwd())
    print("PYTHONPATH env:", os.environ.get("PYTHONPATH"))
    print(sys.path[0] if sys.path else "")


def print_cuda_environment() -> None:
    """Print CUDA and PyTorch environment diagnostics."""
    print("Python:", sys.executable)
    print("Torch version:", torch.__version__)
    print("Torch CUDA runtime:", torch.version.cuda)
    print("CUDA build available:", torch.backends.cuda.is_built())
    print("CUDA useable:", torch.cuda.is_available())
    print("CUDA device count:", torch.cuda.device_count())
    print("DEVICE in .env (user specified):", os.getenv("DEVICE"))

    if torch.cuda.device_count() > 0:
        print("CUDA DEVICES:")
        for index in range(torch.cuda.device_count()):
            print(f"- GPU {index}: {torch.cuda.get_device_name(index)}")
    else:
        print("NO CUDA DEVICES FOUND")


def print_cuda_memory(label: str = "CUDA") -> None:
    """Print current and peak CUDA memory usage."""
    if not torch.cuda.is_available():
        print(f"{label}: CUDA not available")
        return

    allocated = torch.cuda.memory_allocated() / 1024**3
    reserved = torch.cuda.memory_reserved() / 1024**3
    max_allocated = torch.cuda.max_memory_allocated() / 1024**3

    print(
        f"{label}: "
        f"allocated={allocated:.2f} GB, "
        f"reserved={reserved:.2f} GB, "
        f"peak_allocated={max_allocated:.2f} GB"
    )


def timestamp_utc() -> str:
    """Return a UTC timestamp string with second precision."""
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def flush_pipeline(pipeline: DiffusionPipeline | None = None) -> None:
    """Best-effort cleanup of heavy pipeline components and hooks."""
    if pipeline is None:
        return

    if hasattr(pipeline, "remove_all_hooks"):
        try:
            pipeline.remove_all_hooks()
        except Exception as exc:
            print(f"Could not remove all hooks: {exc}")

    if hasattr(pipeline, "maybe_free_model_hooks"):
        try:
            pipeline.maybe_free_model_hooks()
        except Exception as exc:
            print(f"Could not free model hooks: {exc}")

    components_to_delete = [
        "transformer",
        "text_encoder",
        "text_encoder_2",
        "tokenizer",
        "tokenizer_2",
        "unet",
        "vae",
        "scheduler",
        "image_encoder",
        "feature_extractor",
    ]
    for component_name in components_to_delete:
        if hasattr(pipeline, component_name):
            try:
                delattr(pipeline, component_name)
            except Exception as exc:
                print(f"Could not delete pipeline.{component_name}: {exc}")


def flush_namespace(
    namespace: dict[str, Any],
    *names: str,
    hard_exit: bool = False,
    verbose: bool = True,
) -> None:
    """Delete named globals and release unused CUDA cache memory."""
    if verbose:
        print_cuda_memory("Before flush")

    for name in names:
        obj = namespace.get(name)
        if isinstance(obj, DiffusionPipeline):
            flush_pipeline(obj)

        if name in namespace:
            try:
                del namespace[name]
            except Exception as exc:
                print(f"Could not delete variable {name!r}: {exc}")

    gc.collect()

    if torch.cuda.is_available():
        try:
            torch.cuda.synchronize()
        except Exception:
            pass

        torch.cuda.empty_cache()
        try:
            torch.cuda.ipc_collect()
        except Exception:
            pass
        try:
            torch.cuda.reset_peak_memory_stats()
        except Exception:
            try:
                torch.cuda.reset_max_memory_allocated()
            except Exception:
                pass

    gc.collect()

    if verbose:
        print_cuda_memory("After flush")
    if hard_exit:
        os._exit(0)


def seed_latent(
    seed: int,
    shape: tuple[int, int, int, int] | torch.Size,
    dtype: torch.dtype,
    device: torch.device | str = "cpu",
) -> torch.Tensor:
    """Create deterministic random latent tensors with CPU-seeded RNG."""
    generator = torch.Generator(device="cpu").manual_seed(int(seed))
    return torch.randn(tuple(shape), generator=generator, dtype=dtype, device=device)


__all__ = [
    "flush_namespace",
    "flush_pipeline",
    "print_cuda_environment",
    "print_cuda_memory",
    "print_runtime_paths",
    "seed_latent",
    "timestamp_utc",
]
