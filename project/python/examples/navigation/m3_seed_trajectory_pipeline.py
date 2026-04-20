"""M3 validation example: seed trajectory navigation.

Pipeline coverage:
- Model loading
- Seed-anchored latent trajectory creation via ``seed_walks``
- A3 latent injection via ``generate_with_prompt(..., latents=...)``
- Image generation and output export
"""

import time
import torch
from pathlib import Path

from helpers.methods.access import infer_latent_shape
from helpers.methods.navigation import seed_walks
from helpers.runtime.pipeline import (
    default_torch_dtype_for_device,
    load_flux_pipeline,
    resolve_runtime_device,
)
from helpers.runtime.sampling import generate_with_prompt


output_dir = Path(__file__).resolve().parent / "outputs" / "m3_seed_trajectory"
output_dir.mkdir(parents=True, exist_ok=True)

device = resolve_runtime_device()
dtype = default_torch_dtype_for_device(dtype=torch.float16 ,device=device)
pipe = load_flux_pipeline(
    torch_dtype=dtype,
    device=device,
    offload_mode="group",
    group_use_stream=True,
    group_low_cpu_mem_usage=False,
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

latent_shape = infer_latent_shape(height=1024, width=1024)
trajectory = seed_walks(
    seed_a=5,
    seed_b=105,
    shape=latent_shape,
    steps=3,
    method="slerp",
    dtype=dtype,
    device="cpu",
)

for idx, latent in enumerate(trajectory):
    alpha = idx / max(len(trajectory) - 1, 1)
    
    t0 = time.perf_counter()
    with torch.inference_mode():
        result = generate_with_prompt(
            pipe=pipe,
            prompt="a forest trail after rain, natural lighting",
            seed=77,
            latents=latent,
            num_inference_steps=3,
            guidance_scale=0.0,
        )
    t1 = time.perf_counter()
    image = result.images[0]
    
    image_path = output_dir / f"m3_seedW_alpha_{alpha:.2f}_time_{t1-t0:.2f}.png"
    image.save(image_path)
    print(f"Saved: {image_path}")

print(f"M3 seed trajectory validation complete. Outputs in: {output_dir}")
