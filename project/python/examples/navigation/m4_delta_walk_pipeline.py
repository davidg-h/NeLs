"""M4 validation example: latent direction traversal (delta walks).

Pipeline coverage:
- Model loading
- A1 latent access via VAE encode/decode
- M4 traversal via ``delta_walks``
- A3 latent injection via ``generate_with_prompt(..., latents=...)``
- Image generation and output export
"""

import time
import torch
from pathlib import Path

from helpers.methods.access import (
    decode_latents_to_image,
    encode_image_to_latents,
    vae_latents_to_denoiser_latents,
)
from helpers.methods.navigation import delta_walks
from helpers.runtime.pipeline import (
    default_torch_dtype_for_device,
    load_flux_pipeline,
    resolve_runtime_device,
)
from helpers.runtime.sampling import generate_with_prompt


output_dir = Path(__file__).resolve().parent / "outputs" / "m4_delta_walk"
output_dir.mkdir(parents=True, exist_ok=True)

device = resolve_runtime_device()
dtype = default_torch_dtype_for_device(dtype=torch.float16, device=device)
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

# Build anchor images first, then map them into latent space (A1).
anchor_prompt = "a calm coastal village with detailed architecture"
with torch.inference_mode():
    anchor_a = generate_with_prompt(
        pipe=pipe,
        prompt=anchor_prompt,
        seed=12,
        num_inference_steps=3,
        guidance_scale=0.0,
    ).images[0]
    anchor_b = generate_with_prompt(
        pipe=pipe,
        prompt=anchor_prompt,
        seed=96,
        num_inference_steps=3,
        guidance_scale=0.0,
    ).images[0]
anchor_a.save(output_dir / "m4_anchor_a.png")
anchor_b.save(output_dir / "m4_anchor_b.png")

latent_a = encode_image_to_latents(
    pipe=pipe,
    image=anchor_a,
    size=None,
    sample_posterior=False,
    device="cpu",
    dtype=dtype,
)
latent_b = encode_image_to_latents(
    pipe=pipe,
    image=anchor_b,
    size=None,
    sample_posterior=False,
    device="cpu",
    dtype=dtype,
)

latent_a_denoiser = vae_latents_to_denoiser_latents(pipe, latent_a)
latent_b_denoiser = vae_latents_to_denoiser_latents(pipe, latent_b)

# Decode one latent back to image to verify A1 roundtrip behavior.
decoded_preview = decode_latents_to_image(pipe, latent_a)
decoded_preview.save(output_dir / "m4_decoded_preview.png")

scales = [0.0, 0.5, 1.0, 1.5]
walked_latents = delta_walks(latent_a_denoiser, latent_b_denoiser, scales=scales)

for scale, walked in zip(scales, walked_latents):
    
    t0 = time.perf_counter()
    with torch.inference_mode():
        result = generate_with_prompt(
            pipe=pipe,
            prompt=anchor_prompt,
            seed=321,
            latents=walked,
            num_inference_steps=3,
            guidance_scale=0.0,
        )
    t1 = time.perf_counter()
    image = result.images[0]
    
    image_path = output_dir / f"m4_delta_scale_{scale:+.2f}_time_{t1-t0:.2f}.png"
    image.save(image_path)

    print(f"Saved: {image_path}")

print(f"M4 delta walk validation complete. Outputs in: {output_dir}")
