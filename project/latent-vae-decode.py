def decode_latents(pipe, latents: torch.Tensor) -> "PIL.Image":
    """Decode a latent tensor back to a PIL image."""
    # Undo the VAE scaling
    latents = latents / pipe.vae.config.scaling_factor + pipe.vae.config.shift_factor

    with torch.no_grad():
        image = pipe.vae.decode(latents, return_dict=False)[0]

    # Post-process: [-1,1] → [0,1] → uint8
    image = (image / 2 + 0.5).clamp(0, 1)
    image = image.cpu().permute(0, 2, 3, 1).float().numpy()
    image = (image * 255).round().astype("uint8")

    from PIL import Image

    return Image.fromarray(image[0])
