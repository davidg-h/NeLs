"""Shared CLIP encoding pipeline for NELS - used by CLI and ComfyUI nodes"""

import gc
import time
from typing import Any

import numpy as np
import torch

from .defaults import ENCODE_BATCH_SIZE
from .tensor_ops import delta_cond, lerp_cond, mean_cond, slerp_cond


def stack_token_dicts(all_tokens: list[dict]) -> dict:
    """Merge per-prompt token dicts into one batched dict

    ComfyUI tokenize() returns {encoder: [chunk_dict, ...]}, each chunk_dict {field: tensor[1, seq_len]}
    Concat (torch.cat) along dim 0 to get tensor[B, seq_len]
    """
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


def encode_prompts_pooled(
    clip: Any,
    prompts: list[str],
    batch_size: int = ENCODE_BATCH_SIZE,
) -> np.ndarray:
    """Encode prompts with a ComfyUI CLIP object, returning pooled vectors [N, dim]"""
    import comfy.model_management  # only available in ComfyUI runtime

    comfy.model_management.load_models_gpu([clip.patcher])
    all_vectors: list[np.ndarray] = []
    n_batches = (len(prompts) + batch_size - 1) // batch_size
    t_start = time.perf_counter()

    with torch.inference_mode():
        for batch_idx, i in enumerate(range(0, len(prompts), batch_size), 1):
            batch = prompts[i : i + batch_size]
            n_in_batch = len(batch)
            print(
                f"  Encoding prompt batch {batch_idx}/{n_batches} ({n_in_batch} prompts)...",
                end=" ",
                flush=True,
            )
            t_batch = time.perf_counter()

            token_dicts = [clip.tokenize(p) for p in batch]
            batched = stack_token_dicts(token_dicts)
            del token_dicts

            cond, pooled = clip.encode_from_tokens(batched, return_pooled=True)
            del batched

            elapsed = time.perf_counter() - t_batch
            print(f"[{elapsed:.2f}s, {elapsed / n_in_batch * 1000:.1f}ms/prompt]", flush=True)

            if pooled is not None:
                vecs = pooled.detach().cpu().float().numpy().copy()
            else:
                vecs = cond.mean(dim=1).detach().cpu().float().numpy().copy()
            del cond, pooled

            if vecs.shape[0] != len(batch):
                # Fallback: encode one-at-a-time if batching collapsed the batch dim
                # Common with FLUX dual-encoder (T5+CLIP) - batch dim may be squeezed
                print(
                    f"  [warn] batch encode returned shape {vecs.shape} for {len(batch)} prompts - falling back to one-at-a-time",
                    flush=True,
                )
                del vecs
                for p in batch:
                    tok = clip.tokenize(p)
                    c, pl = clip.encode_from_tokens(tok, return_pooled=True)
                    v = (
                        pl.detach().squeeze(0)
                        if pl is not None
                        else c.detach().squeeze(0).mean(dim=0)
                    )
                    all_vectors.append(v.cpu().float().numpy().copy()[None])
                    del tok, c, pl, v
            else:
                all_vectors.append(vecs)
                del vecs

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
    return result


def attach_sequence_conditioning(trajectory: dict, clip: Any) -> None:
    """Compute and attach sequence cond tensors to each trajectory point in-place"""
    points = trajectory.get("points", [])
    source_texts = trajectory.get("source_texts", [])
    if not points or not source_texts:
        return

    cond_tensors = _encode_prompts_seq_cond(clip, source_texts)
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
        elif uses_pair:
            pair = int(pt.get("source_text_pair", 0))
            group_size = int(trajectory["seq_cond_group_size"])
            a_start = pair * 2 * group_size
            b_start = a_start + group_size
            a_conds = cond_tensors[a_start : a_start + group_size]
            b_conds = cond_tensors[b_start : b_start + group_size]
            if not a_conds or not b_conds:
                raise IndexError(
                    f"source_text_pair {pair} (group_size={group_size}) out of range for {len(cond_tensors)} source texts"
                )
            cond_a = mean_cond(a_conds) if len(a_conds) > 1 else a_conds[0]
            cond_b = mean_cond(b_conds) if len(b_conds) > 1 else b_conds[0]
            alpha = float(pt.get("alpha", 0.0))
            pt["cond"] = lerp_cond(cond_a, cond_b, alpha)
        elif is_delta_walk:
            alpha = float(pt.get("alpha", 0.0))
            pt["cond"] = delta_cond(cond_tensors[0], cond_tensors[1], cond_tensors[2], alpha)
        else:
            cond_a = cond_tensors[0]
            cond_b = cond_tensors[1] if len(cond_tensors) > 1 else cond_tensors[0]
            alpha = float(pt.get("alpha", 0.0))
            pt["cond"] = (
                slerp_cond(cond_a, cond_b, alpha)
                if operation == "slerp"
                else lerp_cond(cond_a, cond_b, alpha)
            )


def _encode_prompts_seq_cond(clip: Any, prompts: list[str]) -> list[Any]:
    """Encode prompts, returns [seq_len, hidden_dim] float32 tensors, one per prompt (Runtime only)"""
    import comfy.model_management  # only available in ComfyUI runtime

    comfy.model_management.load_models_gpu([clip.patcher])
    result = []
    for p in prompts:
        tok = clip.tokenize(p)
        cond, _ = clip.encode_from_tokens(tok, return_pooled=True)
        result.append(cond.squeeze(0).float())
    return result
