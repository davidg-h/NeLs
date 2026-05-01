"""M2 validation example: spherical latent interpolation (SLERP).

Pipeline coverage:
- Model loading
- Input latent preparation
- M2 interpolation via ``slerp_latents``
- A3 latent injection via ``generate_with_prompt(..., latents=...)``
- Image generation and output export
"""

from pathlib import Path

from helpers.methods.access import infer_latent_shape
from helpers.methods.navigation import slerp_latents
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
    """Execute M2 SLERP pipeline."""

    run_config = load_run_config_from_env()
    log_level = resolve_log_level(run_config)
    quick_log_enabled = should_write_quick_log(log_level)
    print_progress = should_print_progress(log_level)

    default_output_dir = Path(__file__).resolve().parent / "outputs" / "m2_slerp"
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

    height = int(resolve_run_config_value(run_config, "height", 1024))
    width = int(resolve_run_config_value(run_config, "width", 1024))
    start_seed = int(resolve_run_config_value(run_config, "start_seed", 3))
    end_seed = int(resolve_run_config_value(run_config, "end_seed", 91))
    prompt = str(
        resolve_run_config_value(
            run_config, "prompt", "a high-detail mountain valley at sunrise"
        )
    )
    seed = int(resolve_run_config_value(run_config, "seed", 222))
    num_inference_steps = int(
        resolve_run_config_value(run_config, "num_inference_steps", 3)
    )
    guidance_scale = float(resolve_run_config_value(run_config, "guidance_scale", 0.0))
    alphas = [
        float(value)
        for value in resolve_run_config_value(run_config, "alphas", [0.0, 1.0])
    ]

    # prep latents for slerp
    latent_shape = infer_latent_shape(height=height, width=width)
    start = seed_latent(seed=start_seed, shape=latent_shape, dtype=dtype)
    end = seed_latent(seed=end_seed, shape=latent_shape, dtype=dtype)

    quick_log_path = output_dir / "quick_log.md"
    if quick_log_enabled:
        start_quick_log(
            quick_log_path,
            run_name="m2_slerp",
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
    baseline_path = output_dir / "m2_baseline.png"
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
        blended = slerp_latents(start, end, alpha)

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

        image_path = output_dir / f"m2_slerp_alpha_{alpha:.2f}.png"
        image.save(image_path)

        if quick_log_enabled:
            append_quick_log_entry(
                quick_log_path,
                image_path=image_path,
                label="slerp",
                elapsed_seconds=elapsed,
                params={"seed": seed, "alpha": round(alpha, 2)},
            )
        if print_progress:
            print(f"Saved: {image_path}")

    if print_progress:
        print(f"M2 SLERP validation complete. Outputs in: {output_dir}")


if __name__ == "__main__":
    main()
