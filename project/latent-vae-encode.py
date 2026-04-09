import torch
from diffusers import FluxPipeline
from diffusers.utils import load_image
from torchvision import transforms

pipe = FluxPipeline.from_pretrained(
    "black-forest-labs/FLUX.1-schnell", torch_dtype=torch.bfloat16
)
pipe.enable_model_cpu_offload()

# Load and preprocess image
image = load_image("your_image.png").convert("RGB").resize((1024, 1024))

to_tensor = transforms.Compose(
    [
        transforms.ToTensor(),  # [0,1]
        transforms.Normalize([0.5], [0.5]),  # [-1,1] as VAE expects
    ]
)
pixel_values = to_tensor(image).unsqueeze(0).to(dtype=torch.bfloat16, device="cuda")

# Encode: image → latent
with torch.no_grad():
    latent_dist = pipe.vae.encode(pixel_values)
    # Sample from the distribution
    latents = latent_dist.latent_dist.sample()
    # Apply VAE scaling factor (important!)
    latents = (latents - pipe.vae.config.shift_factor) * pipe.vae.config.scaling_factor

print(f"Latent shape: {latents.shape}")  # [1, 16, 128, 128] for 1024x1024
print(
    f"Latent stats — min: {latents.min():.3f}, max: {latents.max():.3f}, mean: {latents.mean():.3f}"
)
