"""
Shared encoding pipeline for NELS:
imported by both CLI (scripts/encode_cli.py) and NELS ComfyUI nodes.
"""

from __future__ import annotations

import time
from typing import Any

import numpy as np

from .defaults import ENCODE_BATCH_SIZE


def stack_token_dicts(all_tokens: list[dict]) -> dict:
    """Merge per-prompt token dicts into one batched dict

    ComfyUI tokenize() returns {encoder: [chunk_dict, ...]} where each
    chunk_dict has {field: tensor[1, seq_len]}.  We concat (torch.cat) along dim 0 to get tensor[B, seq_len]
    """
    import torch

    batched: dict = {}
    for key in all_tokens[0]:
        val = all_tokens[0][key]
        if isinstance(val, list) and val and isinstance(val[0], dict):
            n_chunks = len(val)
            batched[key] = []
            for chunk_idx in range(n_chunks):
                batched[key].append(
                    {
                        subkey: torch.cat([t[key][chunk_idx][subkey] for t in all_tokens], dim=0)
                        for subkey in val[chunk_idx]
                    }
                )
        elif isinstance(val, dict):
            batched[key] = {
                subkey: torch.cat([t[key][subkey] for t in all_tokens], dim=0) for subkey in val
            }
        else:
            batched[key] = val
    return batched


def encode_prompts(
    clip: Any,
    prompts: list[str],
    batch_size: int = ENCODE_BATCH_SIZE,
) -> np.ndarray:
    """
    Encode prompts with a ComfyUI CLIP object, returning pooled vectors [N, dim]
    """
    import comfy.model_management

    comfy.model_management.load_models_gpu([clip.patcher])
    all_vectors: list[np.ndarray] = []
    n_batches = (len(prompts) + batch_size - 1) // batch_size
    t_start = time.perf_counter()

    for batch_idx, i in enumerate(range(0, len(prompts), batch_size), 1):
        batch = prompts[i : i + batch_size]
        n_in_batch = len(batch)
        print(
            f"  Encoding prompt batch {batch_idx}/{n_batches} ({n_in_batch} prompts)...",
            end=" ",
            flush=True,
        )
        t_batch = time.perf_counter()
        batched = stack_token_dicts([clip.tokenize(p) for p in batch])
        cond, pooled = clip.encode_from_tokens(batched, return_pooled=True)
        elapsed = time.perf_counter() - t_batch
        print(f"[{elapsed:.2f}s, {elapsed / n_in_batch * 1000:.1f}ms/prompt]", flush=True)

        if pooled is not None:
            vecs = pooled.cpu().float().numpy()
        else:
            vecs = cond.mean(dim=1).cpu().float().numpy()

        if vecs.shape[0] != len(batch):
            # Fallback: encode one-at-a-time if batching collapsed the batch dim
            for p in batch:
                tok = clip.tokenize(p)
                c, pl = clip.encode_from_tokens(tok, return_pooled=True)
                v = pl.squeeze(0) if pl is not None else c.squeeze(0).mean(dim=0)
                all_vectors.append(v.cpu().float().numpy()[None])
            continue

        all_vectors.append(vecs)

    t_total = time.perf_counter() - t_start
    n_total = len(prompts)
    print(
        f"  Done — {n_total} prompts in {t_total:.2f}s ({n_total / t_total:.1f} prompts/sec)",
        flush=True,
    )
    return np.concatenate(all_vectors, axis=0).astype(np.float32)


def encode_cond(clip: Any, prompts: list[str]) -> list[Any]:
    """Encode prompts and return full sequence conditioning tensors

    Returns a list of [seq_len, hidden_dim] float32 torch tensors (one per prompt)
    Used for trajectory ops in sequence space during runtime
    """
    import comfy.model_management

    comfy.model_management.load_models_gpu([clip.patcher])
    result = []
    for p in prompts:
        tok = clip.tokenize(p)
        cond, _ = clip.encode_from_tokens(tok, return_pooled=True)
        result.append(cond.squeeze(0).float())
    return result
