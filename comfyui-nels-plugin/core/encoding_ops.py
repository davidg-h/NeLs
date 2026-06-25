"""Shared CLIP encoding pipeline for NELS - used by CLI and ComfyUI nodes"""

import gc
import time
from typing import Any

import numpy as np
import torch

from .tensor_ops import (
    delta_cond,
    delta_walk_step,
    lerp_cond,
    mean_cond,
    slerp,
    slerp_cond,
    tensor_summary,
)

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


def attach_sequence_conditioning(trajectory: dict, clip: Any) -> None:
    """Compute and attach sequence cond tensors to each trajectory point in-place"""
    points = trajectory.get("points", [])
    source_texts = trajectory.get("source_texts", [])
    if not points or not source_texts:
        return
    if all("cond" in pt for pt in points):
        return

    encoded = encode_prompts_real_conditioning(clip, source_texts)
    cond_tensors = [item["cond"] for item in encoded]
    operation = trajectory.get("operation", "")
    uses_index = any("source_text_index" in pt for pt in points)
    uses_pair = any("source_text_pair" in pt for pt in points)
    is_delta_walk = operation == "delta_walk" and not uses_index and not uses_pair

    for pt in points:
        if uses_index:
            idx = int(pt.get("source_text_index", 0))
            if idx >= len(cond_tensors):
                raise IndexError(
                    f"source_text_index {idx} out of range for {len(cond_tensors)} source texts"
                )
            pt["cond"] = cond_tensors[idx]
            _set_optional_pooled_output(pt, encoded[idx]["pooled_output"])
        elif uses_pair:
            pair = int(pt.get("source_text_pair", 0))
            pair_sizes = trajectory.get("seq_cond_group_sizes") or []
            if pair_sizes:
                if pair >= len(pair_sizes):
                    raise IndexError(
                        f"source_text_pair {pair} out of range for {len(pair_sizes)} pair group sizes"
                    )
                group_size = int(pair_sizes[pair])
                a_start = sum(2 * int(size) for size in pair_sizes[:pair])
            else:
                group_size = int(trajectory["seq_cond_group_size"])
                a_start = pair * 2 * group_size
            b_start = a_start + group_size
            a_conds = cond_tensors[a_start : a_start + group_size]
            b_conds = cond_tensors[b_start : b_start + group_size]
            a_pooled = _mean_optional_vectors(
                [item["pooled_output"] for item in encoded[a_start : a_start + group_size]]
            )
            b_pooled = _mean_optional_vectors(
                [item["pooled_output"] for item in encoded[b_start : b_start + group_size]]
            )
            if not a_conds or not b_conds:
                raise IndexError(
                    f"source_text_pair {pair} (group_size={group_size}) out of range for {len(cond_tensors)} source texts"
                )
            cond_a = mean_cond(a_conds) if len(a_conds) > 1 else a_conds[0]
            cond_b = mean_cond(b_conds) if len(b_conds) > 1 else b_conds[0]
            alpha = float(pt.get("alpha", 0.0))
            pt["cond"] = lerp_cond(cond_a, cond_b, alpha)
            pooled_step = _interpolate_optional_pooled(a_pooled, b_pooled, alpha)
            _set_optional_pooled_output(pt, pooled_step)
            display_tensor = compact_embedding_from_real_conditioning(pt["cond"], pooled_step)
            _replace_point_tensor(pt, display_tensor)
        elif is_delta_walk:
            alpha = float(pt.get("alpha", 0.0))
            pt["cond"] = delta_cond(cond_tensors[0], cond_tensors[1], cond_tensors[2], alpha)
            pooled_step = _delta_optional_pooled(
                encoded[0]["pooled_output"],
                encoded[1]["pooled_output"],
                encoded[2]["pooled_output"],
                alpha,
            )
            _set_optional_pooled_output(pt, pooled_step)
            display_tensor = compact_embedding_from_real_conditioning(pt["cond"], pooled_step)
            _replace_point_tensor(pt, display_tensor)
        else:
            cond_a = cond_tensors[0]
            cond_b = cond_tensors[1] if len(cond_tensors) > 1 else cond_tensors[0]
            pooled_a = encoded[0]["pooled_output"]
            pooled_b = encoded[1]["pooled_output"] if len(encoded) > 1 else pooled_a
            alpha = float(pt.get("alpha", 0.0))
            pt["cond"] = (
                slerp_cond(cond_a, cond_b, alpha)
                if operation == "slerp"
                else lerp_cond(cond_a, cond_b, alpha)
            )
            pooled_step = _interpolate_optional_pooled(
                pooled_a,
                pooled_b,
                alpha,
                spherical=operation == "slerp",
            )
            _set_optional_pooled_output(pt, pooled_step)
            display_tensor = compact_embedding_from_real_conditioning(pt["cond"], pooled_step)
            _replace_point_tensor(pt, display_tensor)


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


def _mean_optional_vectors(vectors: list[torch.Tensor | None]) -> torch.Tensor | None:
    present = [vec for vec in vectors if vec is not None]
    if not present or len(present) != len(vectors):
        return None
    return torch.stack([vec.detach().float() for vec in present]).mean(dim=0)


def _interpolate_optional_pooled(
    pooled_a: torch.Tensor | None,
    pooled_b: torch.Tensor | None,
    alpha: float,
    *,
    spherical: bool = False,
) -> torch.Tensor | None:
    if pooled_a is None or pooled_b is None:
        return None
    if spherical:
        return slerp(pooled_a, pooled_b, alpha).detach().float()
    return torch.lerp(pooled_a, pooled_b, alpha).detach().float()


def _delta_optional_pooled(
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


def _set_optional_pooled_output(
    point: dict[str, Any],
    pooled_output: torch.Tensor | None,
) -> None:
    """Always keep the pooled_output key, None when unavailable - matches ComfyUI's own
    encode_from_tokens_scheduled convention so downstream kwargs["pooled_output"] never KeyErrors"""
    point["pooled_output"] = pooled_output.detach().float() if pooled_output is not None else None


def _replace_point_tensor(
    point: dict[str, Any],
    tensor: torch.Tensor,
) -> None:
    point["tensor"] = tensor.detach().float()
    point["norm"] = float(point["tensor"].norm().item())
    point.update(tensor_summary(point["tensor"]))
