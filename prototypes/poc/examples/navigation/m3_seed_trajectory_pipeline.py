"""M3 validation example: seed trajectory navigation.

Pipeline coverage:
- Model loading
- Seed-anchored latent trajectory creation via ``seed_walks``
- A3 latent injection via ``generate_with_prompt(..., latents=...)``
- Image generation and output export
"""

from pathlib import Path

from helpers.methods.access import infer_latent_shape
from helpers.methods.navigation import seed_walks
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
    """Execute M3 seed trajectory pipeline."""

    run_config = load_run_config_from_env()
    log_level = resolve_log_level(run_config)
    quick_log_enabled = should_write_quick_log(log_level)
    print_progress = should_print_progress(log_level)

    default_output_dir = (
        Path(__file__).resolve().parent / "outputs" / "m3_seed_trajectory"
    )
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
    seed_a = int(resolve_run_config_value(run_config, "seed_a", 5))
    seed_b = int(resolve_run_config_value(run_config, "seed_b", 105))
    trajectory_steps = int(resolve_run_config_value(run_config, "trajectory_steps", 3))
    trajectory_method = str(
        resolve_run_config_value(run_config, "trajectory_method", "slerp")
    )
    prompt = str(
        resolve_run_config_value(
            run_config, "prompt", "a forest trail after rain, natural lighting"
        )
    )
    seed = int(resolve_run_config_value(run_config, "seed", 77))
    num_inference_steps = int(
        resolve_run_config_value(run_config, "num_inference_steps", 3)
    )
    guidance_scale = float(resolve_run_config_value(run_config, "guidance_scale", 0.0))

    latent_shape = infer_latent_shape(height=height, width=width)
    trajectory = seed_walks(
        seed_a=seed_a,
        seed_b=seed_b,
        shape=latent_shape,
        steps=trajectory_steps,
        method=trajectory_method,
        dtype=dtype,
        device="cpu",
    )

    quick_log_path = output_dir / "quick_log.md"
    if quick_log_enabled:
        start_quick_log(
            quick_log_path,
            run_name="m3_seed_trajectory",
            config={
                "seed": seed,
                "seed_a": seed_a,
                "seed_b": seed_b,
                "prompt": prompt,
                "height": height,
                "width": width,
                "trajectory_method": trajectory_method,
                "num_inference_steps": num_inference_steps,
                "guidance_scale": guidance_scale,
                "steps": len(trajectory),
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
    baseline_path = output_dir / "m3_baseline.png"
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

    for idx, latent in enumerate(trajectory):
        alpha = idx / max(len(trajectory) - 1, 1)

        result, elapsed = timed_generate_with_prompt(
            pipe=pipe,
            prompt=prompt,
            seed=seed,
            device=device,
            latents=latent,
            num_inference_steps=num_inference_steps,
            guidance_scale=guidance_scale,
        )
        image = result.images[0]

        image_path = output_dir / f"m3_seedW_alpha_{alpha:.2f}.png"
        image.save(image_path)

        if quick_log_enabled:
            append_quick_log_entry(
                quick_log_path,
                image_path=image_path,
                label="seed_walk",
                elapsed_seconds=elapsed,
                params={"seed": seed, "alpha": round(alpha, 2), "index": idx},
            )
        if print_progress:
            print(f"Saved: {image_path}")

    if print_progress:
        print(f"M3 seed trajectory validation complete. Outputs in: {output_dir}")


if __name__ == "__main__":
    main()
