"""M6 validation example: embedding interpolation semantic navigation.

Pipeline coverage:
- Model loading
- A4 prompt embedding access/blending via ``blend_prompt_pair``
- M6 embedding interpolation across alpha schedule
- Generation with blended semantic guidance via ``generate_with_embeddings``
- Image output export
"""

import time
import gc
import torch
from pathlib import Path

from helpers.methods.navigation import blend_prompt_pair
from helpers.runtime.pipeline import (
    default_torch_dtype_for_device,
    load_flux_pipeline,
    resolve_runtime_device,
)
from helpers.runtime.sampling import generate_with_embeddings


output_dir = Path(__file__).resolve().parent / "outputs" / "m6_embedding_interp"
output_dir.mkdir(parents=True, exist_ok=True)

# VRAM-safe defaults for iterative alpha sweeps on constrained GPUs.
GEN_HEIGHT = 768
GEN_WIDTH = 768
GEN_STEPS = 3
MAX_SEQ_LEN = 192


def _flush_cuda_between_runs() -> None:
    """Release as much temporary CUDA memory as possible between loop iterations."""
    if not torch.cuda.is_available():
        return

    try:
        torch.cuda.synchronize()
    except Exception:
        pass
    torch.cuda.empty_cache()
    try:
        torch.cuda.ipc_collect()
    except Exception:
        pass

device = resolve_runtime_device()
dtype = default_torch_dtype_for_device(torch.float16, device)
pipe = load_flux_pipeline(
    torch_dtype=dtype,
    device=device,
    offload_mode="group",
    group_use_stream=True,
    group_low_cpu_mem_usage=True,
    enable_text_encoder_group_offload=True,
    text_encoder_group_offload_type="block_level",
    text_encoder_num_blocks_per_group=1,
    enable_vae_group_offload=True,
    vae_group_offload_type="leaf_level",
    vae_num_blocks_per_group=2,
    enable_vae_slicing=True,
    enable_vae_tiling=True,
    enable_layerwise_casting=True,
    layerwise_storage_dtype="float8_e4m3fn",
    layerwise_compute_dtype=dtype,
    enable_channels_last=True,
    enable_xformers_attention=True,
    enable_torch_compile=False,
)

prompt_a = "a cozy wooden cabin in snowy mountains"
prompt_b = "a futuristic glass cabin on a tropical beach"
alphas = [0.0, 0.5, 1.0]


for alpha in alphas:
    blended = None
    result = None
    image = None
    try:
        blended = blend_prompt_pair(
            pipe=pipe,
            prompt_a=prompt_a,
            prompt_b=prompt_b,
            alpha=alpha,
            max_sequence_length=MAX_SEQ_LEN,
            device=device,
        )

        t0 = time.perf_counter()
        with torch.inference_mode():
            result = generate_with_embeddings(
                pipe=pipe,
                embeddings=blended,
                seed=808,
                height=GEN_HEIGHT,
                width=GEN_WIDTH,
                num_inference_steps=GEN_STEPS,
                guidance_scale=0.0,
            )
        t1 = time.perf_counter()
        print(f"Alpha {alpha:.2f} generation completed in {t1 - t0:.2f} seconds.")
        image = result.images[0]

        image_path = output_dir / f"m6_embed_alpha_{alpha:.2f}_{t1 - t0:.2f}.png"
        image.save(image_path)
        print(f'alpha={alpha:.2f} in {(t1 - t0):.2f}s -> {image_path} | prompt_embeds_shape={tuple(blended.prompt_embeds.shape)}')
    finally:
        del image
        del result
        del blended
        gc.collect()
        _flush_cuda_between_runs()

print(f"M6 embedding interpolation validation complete. Outputs in: {output_dir}")
