"""Shared CLIP encoding pipeline for NELS - used by CLI and ComfyUI nodes"""

import gc
import time
from typing import Any

import numpy as np
import torch

from .tensor_ops import delta_walk_step, slerp

# Progress/cleanup cadence only;
# encoding itself is sequential (one prompt per clip.encode_from_tokens call ->  return_pooled=True needs a per-prompt forward pass)
_PROGRESS_CHUNK_SIZE = 32


def compact_embedding_from_real_conditioning(
    cond: torch.Tensor,
    pooled_output: torch.Tensor | None,
) -> torch.Tensor:
    """Convert real conditioning into the dataset-compatible compact embedding"""
    pooled = _compact_pooled_output(pooled_output)
    if pooled is not None:
        return pooled.detach().float()

    seq = cond.detach().float()
    if seq.ndim == 3 and seq.shape[0] == 1:
        seq = seq.squeeze(0)
    if seq.ndim == 2:
        return seq.mean(dim=0).detach().float()
    if seq.ndim == 1:
        return seq.detach().float()
    raise ValueError(f"Unsupported conditioning shape for compact conversion: {tuple(seq.shape)}")


def encode_prompts_dataset_embeddings(
    clip: Any,
    prompts: list[str],
) -> tuple[np.ndarray, dict[str, Any]]:
    """Encode prompts into compact dataset embeddings

    Prefers native pooled output, falls back to mean-pooled sequence conditioning
    """
    import comfy.model_management  # only available in ComfyUI runtime

    comfy.model_management.load_models_gpu([clip.patcher])
    all_vectors: list[np.ndarray] = []
    strategy_counts: dict[str, int] = {}
    full_embedding_shape: list[int] | None = None
    n_chunks = (len(prompts) + _PROGRESS_CHUNK_SIZE - 1) // _PROGRESS_CHUNK_SIZE
    t_start = time.perf_counter()

    with torch.inference_mode():
        for chunk_idx, i in enumerate(range(0, len(prompts), _PROGRESS_CHUNK_SIZE), 1):
            chunk = prompts[i : i + _PROGRESS_CHUNK_SIZE]
            n_in_chunk = len(chunk)
            print(
                f"  Encoding prompts {chunk_idx}/{n_chunks} ({n_in_chunk} prompts)...",
                end=" ",
                flush=True,
            )
            t_chunk = time.perf_counter()

            for prompt in chunk:
                tokens = clip.tokenize(prompt)
                cond, pooled = clip.encode_from_tokens(tokens, return_pooled=True)
                if full_embedding_shape is None:
                    full_embedding_shape = list(cond.shape)
                compact_embedding = compact_embedding_from_real_conditioning(cond, pooled)
                strategy = "native_pooled" if pooled is not None else "mean_seq_fallback"
                vec = compact_embedding.cpu().numpy().reshape(1, -1).copy()
                strategy_counts[strategy] = strategy_counts.get(strategy, 0) + 1
                all_vectors.append(vec)
                del tokens, cond, pooled, compact_embedding, vec

            elapsed = time.perf_counter() - t_chunk
            print(f"[{elapsed:.2f}s, {elapsed / n_in_chunk * 1000:.1f}ms/prompt]", flush=True)

            gc.collect()
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
                torch.cuda.ipc_collect()

    t_total = time.perf_counter() - t_start
    n_total = len(prompts)
    print(
        f"  Done - {n_total} prompts in {t_total:.2f}s ({n_total / t_total:.1f} prompts/sec)",
        flush=True,
    )
    result = np.concatenate(all_vectors, axis=0).astype(np.float32)
    all_vectors.clear()
    gc.collect()

    if len(strategy_counts) != 1:
        raise ValueError(
            "Dataset embedding strategy must be consistent for the whole dataset, got "
            + ", ".join(f"{name}={count}" for name, count in sorted(strategy_counts.items()))
        )
    embedding_strategy = next(iter(strategy_counts))
    strategy_summary = ", ".join(
        f"{name}={count}" for name, count in sorted(strategy_counts.items())
    )
    print(
        f"  Dataset embedding strategy: {embedding_strategy} ({strategy_summary})",
        flush=True,
    )
    return result, {
        "embedding_strategy": embedding_strategy,
        "full_embedding_shape": full_embedding_shape or [],
    }


def encode_prompts_real_conditioning(
    clip: Any,
    prompts: list[str],
) -> list[dict[str, torch.Tensor | None]]:
    """Encode prompts into real seq cond, optional pooled output, and compact embeddings"""
    import comfy.model_management  # only available in ComfyUI runtime

    comfy.model_management.load_models_gpu([clip.patcher])
    result: list[dict[str, torch.Tensor | None]] = []
    for prompt in prompts:
        tokens = clip.tokenize(prompt)
        cond, pooled = clip.encode_from_tokens(tokens, return_pooled=True)
        seq_cond = cond.squeeze(0).float()
        pooled_output = _compact_pooled_output(pooled)
        compact_embedding = compact_embedding_from_real_conditioning(cond, pooled)
        result.append(
            {
                "cond": seq_cond,
                "pooled_output": pooled_output,
                "embedding": compact_embedding,
            }
        )
    return result


def mean_optional_pooled(vectors: list[torch.Tensor | None]) -> torch.Tensor | None:
    present = [vec for vec in vectors if vec is not None]
    if not present or len(present) != len(vectors):
        return None
    return torch.stack([vec.detach().float() for vec in present]).mean(dim=0)


def interpolate_optional_pooled(
    pooled_a: torch.Tensor | None,
    pooled_b: torch.Tensor | None,
    alpha: float,
    *,
    spherical: bool = False,
) -> torch.Tensor | None:
    if pooled_a is None or pooled_b is None:
        return None
    if spherical:
        tensor, _ = slerp(pooled_a, pooled_b, alpha)
        return tensor.detach().float()
    return torch.lerp(pooled_a, pooled_b, alpha).detach().float()


def delta_optional_pooled(
    pooled_a: torch.Tensor | None,
    pooled_b: torch.Tensor | None,
    pooled_c: torch.Tensor | None,
    alpha: float,
) -> torch.Tensor | None:
    if pooled_a is None or pooled_b is None or pooled_c is None:
        return None

    eps = 1e-8
    a_norm = pooled_a / pooled_a.norm().clamp_min(eps)
    b_norm = pooled_b / pooled_b.norm().clamp_min(eps)
    c_mag = pooled_c.norm().clamp_min(eps)
    c_norm = pooled_c / c_mag
    return (delta_walk_step(a_norm, b_norm, c_norm, alpha, eps) * c_mag).detach().float()


def set_optional_pooled_output(
    point: dict[str, Any],
    pooled_output: torch.Tensor | None,
) -> None:
    """Always keep the pooled_output key, None when unavailable - matches ComfyUI's own
    encode_from_tokens_scheduled convention so downstream kwargs["pooled_output"] never KeyErrors"""
    point["pooled_output"] = pooled_output.detach().float() if pooled_output is not None else None


# ---- internals ----


def _compact_pooled_output(pooled: torch.Tensor | None) -> torch.Tensor | None:
    if pooled is None:
        return None
    pooled = pooled.detach().float()
    if pooled.ndim == 0:
        return pooled.reshape(1)
    if pooled.ndim == 1:
        return pooled
    if pooled.shape[0] == 1:
        return pooled.squeeze(0)
    return pooled.reshape(-1)
