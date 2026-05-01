"""M1 validation example: linear latent interpolation (LERP).

Pipeline coverage:
- Model loading
- Input latent preparation
- M1 interpolation via ``lerp_latents``
- A3 latent injection via ``generate_with_prompt(..., latents=...)``
- Image generation and output export
"""

from pathlib import Path

from helpers.methods.access import infer_latent_shape
from helpers.methods.navigation import lerp_latents
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
from helpers.runtime.utils import seed_latent


def main() -> None:
    """Execute M1 LERP pipeline."""

    # configs and settings for pipeline loading
    run_config = load_run_config_from_env()
    log_level = resolve_log_level(run_config)
    quick_log_enabled = should_write_quick_log(log_level)
    print_progress = should_print_progress(log_level)

    default_output_dir = Path(__file__).resolve().parent / "outputs" / "m1_lerp"
    output_dir = Path(
        resolve_run_config_value(run_config, "output_dir", default_output_dir)
    ).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    device = resolve_runtime_device()
    dtype = resolve_dtype_for_device(
        device=device
    )  # specify targeted dtype if desired, or let it be inferred (None) based on device capabilities
    pipe = load_flux_pipeline(
        **resolve_pipeline_kwargs(
            run_config,
            device=device,
            torch_dtype=dtype,
        )
    )

    # Generate params
    height = int(resolve_run_config_value(run_config, "height", 1024))
    width = int(resolve_run_config_value(run_config, "width", 1024))
    start_seed = int(resolve_run_config_value(run_config, "start_seed", 11))
    end_seed = int(resolve_run_config_value(run_config, "end_seed", 77))
    prompt = str(
        resolve_run_config_value(
            run_config, "prompt", "a high-detail mountain valley at sunrise"
        )
    )
    seed = int(resolve_run_config_value(run_config, "seed", 123))
    num_inference_steps = int(
        resolve_run_config_value(run_config, "num_inference_steps", 4)
    )
    guidance_scale = float(resolve_run_config_value(run_config, "guidance_scale", 0.0))
    alphas = [
        float(value)
        for value in resolve_run_config_value(run_config, "alphas", [0.0, 1.0])
    ]

    # Prepare latents for LERP
    latent_shape = infer_latent_shape(height=height, width=width)
    start = seed_latent(seed=start_seed, shape=latent_shape, dtype=dtype)
    end = seed_latent(seed=end_seed, shape=latent_shape, dtype=dtype)

    quick_log_path = output_dir / "quick_log.md"
    if quick_log_enabled:
        start_quick_log(
            quick_log_path,
            run_name="m1_lerp",
            config={
                "seed": seed,
                "start_seed": start_seed,
                "end_seed": end_seed,
                "prompt": prompt,
                "height": height,
                "width": width,
                "num_inference_steps": num_inference_steps,
                "guidance_scale": guidance_scale,
                "alphas": alphas,
                "log_level": log_level,
            },
        )

    baseline_image, baseline_elapsed, _ = generate_prompt_baseline(
        pipe=pipe,
        prompt=prompt,
        seed=seed,
        device=device,
        num_inference_steps=num_inference_steps,
        guidance_scale=guidance_scale,
    )
    baseline_path = output_dir / "m1_baseline.png"
    baseline_image.save(baseline_path)

    if quick_log_enabled:
        append_quick_log_entry(
            quick_log_path,
            image_path=baseline_path,
            label="baseline",
            elapsed_seconds=baseline_elapsed,
            params={"seed": seed},
        )
    if print_progress:
        print(f"Saved: {baseline_path}")

    for alpha in alphas:
        blended = lerp_latents(start, end, alpha)

        result, elapsed = timed_generate_with_prompt(
            pipe=pipe,
            prompt=prompt,
            device=device,
            seed=seed,
            latents=blended,
            use_inference_mode=True,
            synchronize_cuda=True,
            # gen kwargs
            num_inference_steps=num_inference_steps,
            guidance_scale=guidance_scale,
        )
        image = result.images[0]

        image_path = output_dir / f"m1_lerp_alpha_{alpha:.2f}.png"
        image.save(image_path)

        if quick_log_enabled:
            append_quick_log_entry(
                quick_log_path,
                image_path=image_path,
                label="lerp",
                elapsed_seconds=elapsed,
                params={"seed": seed, "alpha": round(alpha, 2)},
            )
        if print_progress:
            print(f"Saved: {image_path}")

    if print_progress:
        print(f"M1 LERP validation complete. Outputs in: {output_dir}")


if __name__ == "__main__":
    main()
