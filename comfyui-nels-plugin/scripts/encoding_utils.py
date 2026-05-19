"""
Shared encoding pipeline for NELS:
imported by both CLI and ComfyUI nodes.

This module holds the encoding pipeline only: "tensor in, numpy vectors out":
  - stack_token_dicts   : batch ComfyUI tokenizer output
  - encode_prompts      : CLIP --> pooled float32 vectors (+ optional full cond tensors)
  - encode_image_tensor : VAE tensor --> pooled float32 vectors

Model objects (CLIP, VAE) are the same ComfyUI types in both contexts:
  - CLI loads them from .safetensors via comfy.sd
  - Nodes receive them as already-loaded ComfyUI graph inputs
"""

from __future__ import annotations

from typing import Any

import numpy as np


def stack_token_dicts(all_tokens: list[dict]) -> dict:
    """Merge per-prompt token dicts into one batched dict.

    ComfyUI tokenize() returns {encoder: [chunk_dict, ...]} where each
    chunk_dict has {field: tensor[1, seq_len]}.  We cat along dim 0 to get
    tensor[B, seq_len].
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
                        subkey: torch.cat(
                            [t[key][chunk_idx][subkey] for t in all_tokens], dim=0
                        )
                        for subkey in val[chunk_idx]
                    }
                )
        elif isinstance(val, dict):
            batched[key] = {
                subkey: torch.cat([t[key][subkey] for t in all_tokens], dim=0)
                for subkey in val
            }
        else:
            batched[key] = val
    return batched


def encode_prompts(
    clip: Any,
    prompts: list[str],
    batch_size: int = 32,
    save_full_cond: bool = False,
) -> tuple[np.ndarray, list[np.ndarray] | None]:
    """Encode prompts with a ComfyUI CLIP object.

    Returns (vectors [N, dim], cond_list_or_None).
    cond_list is a list of [seq_len, hidden_dim] float32 arrays when save_full_cond=True.
    Works identically for CLI (model loaded from file) and node (ComfyUI graph input).
    """
    import comfy.model_management

    comfy.model_management.load_models_gpu([clip.patcher])
    all_vectors: list[np.ndarray] = []
    all_cond: list[np.ndarray] | None = [] if save_full_cond else None
    n_batches = (len(prompts) + batch_size - 1) // batch_size

    for batch_idx, i in enumerate(range(0, len(prompts), batch_size), 1):
        print(
            f"  Encoding prompt batch {batch_idx}/{n_batches} ({min(i + batch_size, len(prompts)) - i} prompts)...",
            flush=True,
        )
        batch = prompts[i : i + batch_size]
        batched = stack_token_dicts([clip.tokenize(p) for p in batch])
        cond, pooled = clip.encode_from_tokens(batched, return_pooled=True)

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
                if all_cond is not None:
                    all_cond.append(c.squeeze(0).cpu().float().numpy())
            continue

        all_vectors.append(vecs)
        if all_cond is not None:
            for j in range(len(batch)):
                all_cond.append(cond[j].cpu().float().numpy())

    return np.concatenate(all_vectors, axis=0).astype(np.float32), all_cond


def encode_image_tensor(
    vae: Any,
    images,  # (B, H, W, C) float32 in [0, 1]
    encode_limit: int = 0,
    image_pooling: str = "flatten",
    image_width: int | None = None,
    image_height: int | None = None,
    batch_size: int = 8,
) -> tuple[np.ndarray, list[int]]:
    """Encode an image tensor with a ComfyUI VAE.

    Encodes in batches to avoid GPU OOM on large inputs.
    Returns (pooled_float32 [N, C*H*W] for flatten or [N, C] for spatial_mean, latent_shape [C,H,W]).
    Works identically for CLI (model loaded from file) and node (ComfyUI graph input).
    """
    import torch
    import comfy.model_management

    comfy.model_management.load_models_gpu([vae.patcher])
    if encode_limit > 0:
        images = images[:encode_limit]

    if image_width is not None or image_height is not None:
        imgs_nchw = images.permute(0, 3, 1, 2)
        h = image_height or imgs_nchw.shape[2]
        w = image_width or imgs_nchw.shape[3]
        imgs_nchw = torch.nn.functional.interpolate(
            imgs_nchw, size=(h, w), mode="bilinear", align_corners=False
        )
        images = imgs_nchw.permute(0, 2, 3, 1)

    all_pooled: list[np.ndarray] = []
    latent_shape: list[int] = []
    n_batches = (len(images) + batch_size - 1) // batch_size

    for batch_idx, start in enumerate(range(0, len(images), batch_size), 1):
        print(f"  Encoding image batch {batch_idx}/{n_batches}...", flush=True)
        batch = images[start : start + batch_size]
        with torch.inference_mode():
            latent = vae.encode(batch[:, :, :, :3])
        raw = latent["samples"] if isinstance(latent, dict) else latent

        if not latent_shape:
            latent_shape = list(raw.shape[1:])

        if image_pooling == "flatten":
            pooled = raw.detach().flatten(start_dim=1).cpu().float()
        else:
            pooled = raw.detach().mean(dim=[2, 3]).cpu().float()

        all_pooled.append(pooled.numpy().astype(np.float32))

    return np.concatenate(all_pooled, axis=0).astype(np.float32), latent_shape
