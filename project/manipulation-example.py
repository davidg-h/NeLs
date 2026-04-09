import torch
import numpy as np
from diffusers import FluxPipeline
from PIL import Image

pipe = FluxPipeline.from_pretrained(
    "black-forest-labs/FLUX.1-schnell", torch_dtype=torch.bfloat16
)
pipe.enable_model_cpu_offload()


def generate_with_custom_latents(pipe, prompt, latents=None, seed=0):
    """Generate an image, optionally injecting your own starting latents."""
    generator = torch.Generator("cpu").manual_seed(seed)

    output = pipe(
        prompt=prompt,
        height=1024,
        width=1024,
        num_inference_steps=4,
        guidance_scale=0.0,
        max_sequence_length=256,
        generator=generator,
        latents=latents,  # inject custom latents here!
    )
    return output.images[0], output


# --- Example: Latent Interpolation (blend two noise seeds) ---
def slerp(t, v0, v1, dot_threshold=0.9995):
    """Spherical linear interpolation between two latent vectors."""
    v0_f = v0.float()
    v1_f = v1.float()
    dot = (v0_f / v0_f.norm() * (v1_f / v1_f.norm())).sum()

    if abs(dot) > dot_threshold:
        return (1 - t) * v0 + t * v1  # fallback to linear

    theta = torch.acos(dot)
    return (torch.sin((1 - t) * theta) * v0 + torch.sin(t * theta) * v1) / torch.sin(
        theta
    )


# Generate two base latent seeds
height, width = 1024, 1024
latent_h = height // 8
latent_w = width // 8

latents_a = torch.randn(
    (1, 16, latent_h, latent_w),
    dtype=torch.bfloat16,
    generator=torch.Generator().manual_seed(0),
)
latents_b = torch.randn(
    (1, 16, latent_h, latent_w),
    dtype=torch.bfloat16,
    generator=torch.Generator().manual_seed(99),
)

# Interpolate and generate frames
frames = []
for t in np.linspace(0, 1, 5):
    blended = slerp(t, latents_a, latents_b)
    img, _ = generate_with_custom_latents(
        pipe, "a misty forest at dawn", latents=blended
    )
    frames.append(img)
    img.save(f"interp_{t:.2f}.png")

print("Saved 5 interpolated frames.")
