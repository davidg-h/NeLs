"""M2 validation example: spherical latent interpolation (SLERP).

Pipeline coverage:
- Model loading
- Input latent preparation
- M2 interpolation via ``slerp_latents``
- A3 latent injection via ``generate_with_prompt(..., latents=...)``
- Image generation and output export
"""

import time
from pathlib import Path

import torch

from helpers.methods.access import infer_latent_shape
from helpers.methods.navigation import slerp_latents
from helpers.runtime.pipeline import (
    default_torch_dtype_for_device,
    load_flux_pipeline,
    resolve_runtime_device,
)
from helpers.runtime.sampling import generate_with_prompt
from helpers.runtime.utility import seed_latent


output_dir = Path(__file__).resolve().parent / "outputs" / "m2_slerp"
output_dir.mkdir(parents=True, exist_ok=True)

device = resolve_runtime_device()
dtype = default_torch_dtype_for_device(torch.float16, device)
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
start = seed_latent(seed=3, shape=latent_shape, dtype=dtype)
end = seed_latent(seed=91, shape=latent_shape, dtype=dtype)

# alphas = [0.0, 0.25, 0.5, 0.75, 1.0]
alphas = [0.0, 1.0]
for alpha in alphas:
    blended = slerp_latents(start, end, alpha)

    t0 = time.perf_counter()
    with torch.inference_mode():
        result = generate_with_prompt(
            pipe=pipe,
            prompt="a high-detail mountain valley at sunrise",
            seed=222,
            latents=blended,
            num_inference_steps=3,
            guidance_scale=0.0,
        )
    t1 = time.perf_counter()
    image = result.images[0]

    image_path = output_dir / f"m2_slerp_alpha_{alpha:.2f}_time_{t1-t0:.2f}.png"
    image.save(image_path)
    print(f"Saved: {image_path}")

print(f"M2 SLERP validation complete. Outputs in: {output_dir}")
