"""M6 validation example: embedding interpolation semantic navigation.

Pipeline coverage:
- Model loading
- A4 prompt embedding access/blending via ``blend_prompt_pair``
- M6 embedding interpolation across alpha schedule
- Generation with blended semantic guidance via ``generate_with_embeddings``
- Image output export
"""

import gc
import torch
from pathlib import Path

from helpers.methods.navigation import blend_prompt_pair
from helpers.runtime.inference import (
    append_quick_log_entry,
    generate_prompt_baseline,
    start_quick_log,
    timed_generate_with_embeddings,
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


def _flush_cuda_between_runs() -> None:
    """Release as much temporary CUDA memory as possible between loop iterations."""
    if not torch.cuda.is_available():
        return

    try:
        torch.cuda.synchronize()
    except Exception:
        pass
    torch.cuda.empty_cache()
    try:
        torch.cuda.ipc_collect()
    except Exception:
        pass


def main() -> None:
    """Execute M6 embedding interpolation pipeline."""

    run_config = load_run_config_from_env()
    log_level = resolve_log_level(run_config)
    quick_log_enabled = should_write_quick_log(log_level)
    print_progress = should_print_progress(log_level)

    default_output_dir = (
        Path(__file__).resolve().parent / "outputs" / "m6_embedding_interp"
    )
    output_dir = Path(
        resolve_run_config_value(run_config, "output_dir", default_output_dir)
    ).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    # VRAM-safe defaults for iterative alpha sweeps on constrained GPUs.
    GEN_HEIGHT = int(resolve_run_config_value(run_config, "height", 768))
    GEN_WIDTH = int(resolve_run_config_value(run_config, "width", 768))
    GEN_STEPS = int(resolve_run_config_value(run_config, "num_inference_steps", 3))
    MAX_SEQ_LEN = int(resolve_run_config_value(run_config, "max_sequence_length", 192))

    device = resolve_runtime_device()
    dtype = resolve_dtype_for_device(device=device)
    pipe = load_flux_pipeline(
        **resolve_pipeline_kwargs(
            run_config,
            device=device,
            torch_dtype=dtype,
        )
    )

    prompt_a = str(
        resolve_run_config_value(
            run_config, "prompt_a", "a cozy wooden cabin in snowy mountains"
        )
    )
    prompt_b = str(
        resolve_run_config_value(
            run_config, "prompt_b", "a futuristic glass cabin on a tropical beach"
        )
    )
    seed = int(resolve_run_config_value(run_config, "seed", 808))
    guidance_scale = float(resolve_run_config_value(run_config, "guidance_scale", 0.0))
    alphas = [
        float(value)
        for value in resolve_run_config_value(run_config, "alphas", [0.0, 0.5, 1.0])
    ]

    quick_log_path = output_dir / "quick_log.md"
    if quick_log_enabled:
        start_quick_log(
            quick_log_path,
            run_name="m6_embedding_interp",
            config={
                "seed": seed,
                "prompt_a": prompt_a,
                "prompt_b": prompt_b,
                "alphas": alphas,
                "height": GEN_HEIGHT,
                "width": GEN_WIDTH,
                "num_inference_steps": GEN_STEPS,
                "max_sequence_length": MAX_SEQ_LEN,
                "log_level": log_level,
                "guidance_scale": guidance_scale,
            },
        )

    baseline_a, baseline_a_elapsed, _ = generate_prompt_baseline(
        pipe=pipe,
        prompt=prompt_a,
        seed=seed,
        device=device,
        height=GEN_HEIGHT,
        width=GEN_WIDTH,
        num_inference_steps=GEN_STEPS,
        guidance_scale=guidance_scale,
    )
    baseline_a_path = output_dir / "m6_baseline_prompt_a.png"
    baseline_a.save(baseline_a_path)

    if quick_log_enabled:
        append_quick_log_entry(
            quick_log_path,
            image_path=baseline_a_path,
            label="baseline_prompt_a",
            elapsed_seconds=baseline_a_elapsed,
            params={"seed": seed, "guidance_scale": guidance_scale},
        )
    if print_progress:
        print(f"Saved: {baseline_a_path}")

    baseline_b, baseline_b_elapsed, _ = generate_prompt_baseline(
        pipe=pipe,
        prompt=prompt_b,
        seed=seed,
        device=device,
        height=GEN_HEIGHT,
        width=GEN_WIDTH,
        num_inference_steps=GEN_STEPS,
        guidance_scale=guidance_scale,
    )
    baseline_b_path = output_dir / "m6_baseline_prompt_b.png"
    baseline_b.save(baseline_b_path)

    if quick_log_enabled:
        append_quick_log_entry(
            quick_log_path,
            image_path=baseline_b_path,
            label="baseline_prompt_b",
            elapsed_seconds=baseline_b_elapsed,
            params={"seed": seed},
        )
    if print_progress:
        print(f"Saved: {baseline_b_path}")

    for alpha in alphas:
        blended = None
        result = None
        image = None
        try:
            blended = blend_prompt_pair(
                pipe=pipe,
                prompt_a=prompt_a,
                prompt_b=prompt_b,
                alpha=alpha,
                max_sequence_length=MAX_SEQ_LEN,
                device=device,
            )

            result, elapsed = timed_generate_with_embeddings(
                pipe=pipe,
                embeddings=blended,
                seed=seed,
                device=device,
                height=GEN_HEIGHT,
                width=GEN_WIDTH,
                num_inference_steps=GEN_STEPS,
                guidance_scale=guidance_scale,
            )
            image = result.images[0]

            image_path = output_dir / f"m6_embed_alpha_{alpha:.2f}.png"
            image.save(image_path)

            if quick_log_enabled:
                append_quick_log_entry(
                    quick_log_path,
                    image_path=image_path,
                    label="embedding_interp",
                    elapsed_seconds=elapsed,
                    params={"seed": seed, "alpha": round(alpha, 2)},
                )
            if print_progress:
                print(
                    f"alpha={alpha:.2f} in {elapsed:.2f}s -> {image_path} "
                    f"| prompt_embeds_shape={tuple(blended.prompt_embeds.shape)}"
                )
        finally:
            if image is not None:
                del image
            if result is not None:
                del result
            if blended is not None:
                del blended
            gc.collect()
            _flush_cuda_between_runs()

    if print_progress:
        print(
            f"M6 embedding interpolation validation complete. Outputs in: {output_dir}"
        )


if __name__ == "__main__":
    main()
