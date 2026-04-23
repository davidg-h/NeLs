"""M4 validation example: latent direction traversal (delta walks).

Pipeline coverage:
- Model loading
- A1 latent access via VAE encode/decode
- M4 traversal via ``delta_walks``
- A3 latent injection via ``generate_with_prompt(..., latents=...)``
- Image generation and output export
"""

from pathlib import Path
import torch

from helpers.methods.access import (
    decode_latents_to_image,
    encode_image_to_latents,
    vae_latents_to_denoiser_latents,
)
from helpers.methods.navigation import delta_walks
from helpers.runtime.inference import (
    append_quick_log_entry,
    generate_prompt_baseline,
    start_quick_log,
    timed_generate_with_prompt,
)
from helpers.runtime.pipeline import (
    load_flux_pipeline,
    resolve_runtime_device,
)
from helpers.runtime.dtype_handler.parsing import resolve_dtype_for_device
from helpers.runtime.run_configs import (
    load_run_config_from_env,
    resolve_log_level,
    resolve_pipeline_kwargs,
    resolve_run_config_value,
    should_print_progress,
    should_write_quick_log,
)


def main() -> None:
    """Execute M4 delta walk pipeline."""

    run_config = load_run_config_from_env()
    log_level = resolve_log_level(run_config)
    quick_log_enabled = should_write_quick_log(log_level)
    print_progress = should_print_progress(log_level)

    default_output_dir = Path(__file__).resolve().parent / "outputs" / "m4_delta_walk"
    output_dir = Path(
        resolve_run_config_value(run_config, "output_dir", default_output_dir)
    ).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    device = resolve_runtime_device()
    dtype = resolve_dtype_for_device(device=device)
    pipe = load_flux_pipeline(
        **resolve_pipeline_kwargs(
            run_config,
            device=device,
            torch_dtype=dtype,
        )
    )

    # Build anchor images first, then map them into latent space (A1).
    anchor_prompt = str(
        resolve_run_config_value(
            run_config, "prompt", "a calm coastal village with detailed architecture"
        )
    )
    anchor_seed_a = int(resolve_run_config_value(run_config, "anchor_seed_a", 12))
    anchor_seed_b = int(resolve_run_config_value(run_config, "anchor_seed_b", 96))
    walk_seed = int(resolve_run_config_value(run_config, "walk_seed", 321))
    num_inference_steps = int(
        resolve_run_config_value(run_config, "num_inference_steps", 3)
    )
    guidance_scale = float(resolve_run_config_value(run_config, "guidance_scale", 0.0))
    scales = [
        float(value)
        for value in resolve_run_config_value(
            run_config, "scales", [0.0, 0.5, 1.0, 1.5]
        )
    ]
    quick_log_path = output_dir / "quick_log.md"
    if quick_log_enabled:
        start_quick_log(
            quick_log_path,
            run_name="m4_delta_walk",
            config={
                "prompt": anchor_prompt,
                "num_inference_steps": num_inference_steps,
                "guidance_scale": guidance_scale,
                "anchor_seeds": [anchor_seed_a, anchor_seed_b],
                "walk_seed": walk_seed,
                "scales": scales,
                "log_level": log_level,
            },
        )

    anchor_a_result, anchor_a_elapsed = timed_generate_with_prompt(
        pipe=pipe,
        prompt=anchor_prompt,
        seed=anchor_seed_a,
        device=device,
        num_inference_steps=num_inference_steps,
        guidance_scale=guidance_scale,
    )
    anchor_b_result, anchor_b_elapsed = timed_generate_with_prompt(
        pipe=pipe,
        prompt=anchor_prompt,
        seed=anchor_seed_b,
        device=device,
        num_inference_steps=num_inference_steps,
        guidance_scale=guidance_scale,
    )
    anchor_a = anchor_a_result.images[0]
    anchor_b = anchor_b_result.images[0]
    anchor_a.save(output_dir / "m4_anchor_a.png")
    anchor_b.save(output_dir / "m4_anchor_b.png")

    if quick_log_enabled:
        append_quick_log_entry(
            quick_log_path,
            image_path=output_dir / "m4_anchor_a.png",
            label="anchor_a",
            elapsed_seconds=anchor_a_elapsed,
            params={"seed": anchor_seed_a},
        )
        append_quick_log_entry(
            quick_log_path,
            image_path=output_dir / "m4_anchor_b.png",
            label="anchor_b",
            elapsed_seconds=anchor_b_elapsed,
            params={"seed": anchor_seed_b},
        )

    baseline_image, baseline_elapsed, _ = generate_prompt_baseline(
        pipe=pipe,
        prompt=anchor_prompt,
        seed=walk_seed,
        device=device,
        num_inference_steps=num_inference_steps,
        guidance_scale=guidance_scale,
    )
    baseline_path = output_dir / "m4_baseline.png"
    baseline_image.save(baseline_path)

    if quick_log_enabled:
        append_quick_log_entry(
            quick_log_path,
            image_path=baseline_path,
            label="baseline",
            elapsed_seconds=baseline_elapsed,
            params={"seed": walk_seed},
        )
    if print_progress:
        print(f"Saved: {baseline_path}")

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

    if quick_log_enabled:
        append_quick_log_entry(
            quick_log_path,
            image_path=output_dir / "m4_decoded_preview.png",
            label="decoded_preview",
            elapsed_seconds=0.0,
            params={"from": "anchor_a"},
        )

    walked_latents = delta_walks(latent_a_denoiser, latent_b_denoiser, scales=scales)

    for scale, walked in zip(scales, walked_latents):
        result, elapsed = timed_generate_with_prompt(
            pipe=pipe,
            prompt=anchor_prompt,
            seed=walk_seed,
            device=device,
            latents=walked,
            num_inference_steps=num_inference_steps,
            guidance_scale=guidance_scale,
        )
        image = result.images[0]

        image_path = output_dir / f"m4_delta_scale_{scale:+.2f}.png"
        image.save(image_path)

        if quick_log_enabled:
            append_quick_log_entry(
                quick_log_path,
                image_path=image_path,
                label="delta_walk",
                elapsed_seconds=elapsed,
                params={"seed": walk_seed, "scale": round(scale, 2)},
            )

        if print_progress:
            print(f"Saved: {image_path}")

    if print_progress:
        print(f"M4 delta walk validation complete. Outputs in: {output_dir}")


if __name__ == "__main__":
    main()
