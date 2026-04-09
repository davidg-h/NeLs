import torch
from diffusers import FluxPipeline

pipe = FluxPipeline.from_pretrained(
    "black-forest-labs/FLUX.1-klein",  # or FLUX.1-dev
    torch_dtype=torch.bfloat16,
)
pipe.enable_model_cpu_offload()

captured_latents = {}


# Callback fires after each denoising step
def latent_callback(pipe, step_index, timestep, callback_kwargs):
    latents = callback_kwargs["latents"]
    captured_latents[step_index] = latents.clone().cpu()
    print(
        f"Step {step_index} | timestep {timestep:.1f} | latents shape: {latents.shape}"
    )
    return callback_kwargs


output = pipe(
    prompt="a photorealistic mountain landscape at sunset",
    height=1024,
    width=1024,
    num_inference_steps=4,  # schnell: 1-4 steps; dev: 20-50
    guidance_scale=0.0,  # schnell requires 0.0; dev uses ~3.5
    max_sequence_length=256,
    generator=torch.Generator("cpu").manual_seed(42),
    callback_on_step_end=latent_callback,
    callback_on_step_end_tensor_inputs=["latents"],
)

image = output.images[0]
image.save("output.png")

print(f"\nCaptured latents at {len(captured_latents)} steps")
for step, lat in captured_latents.items():
    print(f"  Step {step}: shape={lat.shape}, dtype={lat.dtype}")
    # Shape: [batch, 16, H//8, W//8] — 16 channels, spatially compressed
