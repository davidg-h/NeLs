"""M6 validation example: embedding interpolation semantic navigation.

Pipeline coverage:
- Model loading
- A4 prompt embedding access and interpolation blending
- M6 embedding interpolation across alpha schedule
- Generation with blended semantic guidance via ``generate_with_embeddings``
- Image output export
"""

import gc
import torch
from pathlib import Path

from helpers.methods.access import encode_prompt_embeddings
from helpers.methods.navigation import blend_prompt_embeddings
from helpers.runtime.inference import (
    append_quick_log_entry,
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
    GEN_HEIGHT = int(resolve_run_config_value(run_config, "height", 512))
    GEN_WIDTH = int(resolve_run_config_value(run_config, "width", 512))
    GEN_STEPS = int(resolve_run_config_value(run_config, "num_inference_steps", 1))
    MAX_SEQ_LEN = int(resolve_run_config_value(run_config, "max_sequence_length", 128))

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

    # Encode each endpoint prompt once, then blend embeddings per alpha.
    emb_a = encode_prompt_embeddings(
        pipe=pipe,
        prompt=prompt_a,
        max_sequence_length=MAX_SEQ_LEN,
        device=device,
    )
    emb_b = encode_prompt_embeddings(
        pipe=pipe,
        prompt=prompt_b,
        max_sequence_length=MAX_SEQ_LEN,
        device=device,
    )

    baseline_a, baseline_a_elapsed, _ = timed_generate_with_embeddings(
        pipe=pipe,
        embeddings=emb_a,
        seed=seed,
        device=device,
        height=GEN_HEIGHT,
        width=GEN_WIDTH,
        num_inference_steps=GEN_STEPS,
        guidance_scale=guidance_scale,
        use_inference_mode=False,
    )
    baseline_a_image = baseline_a.images[0]
    baseline_a_path = output_dir / "m6_baseline_prompt_a.png"
    baseline_a_image.save(baseline_a_path)

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

    baseline_b, baseline_b_elapsed, _ = timed_generate_with_embeddings(
        pipe=pipe,
        embeddings=emb_b,
        seed=seed,
        device=device,
        height=GEN_HEIGHT,
        width=GEN_WIDTH,
        num_inference_steps=GEN_STEPS,
        guidance_scale=guidance_scale,
        use_inference_mode=False,
    )
    baseline_b_image = baseline_b.images[0]
    baseline_b_path = output_dir / "m6_baseline_prompt_b.png"
    baseline_b_image.save(baseline_b_path)

    if quick_log_enabled:
        append_quick_log_entry(
            quick_log_path,
            image_path=baseline_b_path,
            label="baseline_prompt_b",
            elapsed_seconds=baseline_b_elapsed,
            params={"seed": seed, "guidance_scale": guidance_scale},
        )
    if print_progress:
        print(f"Saved: {baseline_b_path}")

    del baseline_a
    del baseline_b
    del baseline_a_image
    del baseline_b_image
    gc.collect()
    _flush_cuda_between_runs()

    for alpha in alphas:
        blended = None
        result = None
        image = None
        try:
            blended = blend_prompt_embeddings(emb_a, emb_b, alpha)

            result, elapsed = timed_generate_with_embeddings(
                pipe=pipe,
                embeddings=blended,
                seed=seed,
                device=device,
                height=GEN_HEIGHT,
                width=GEN_WIDTH,
                num_inference_steps=GEN_STEPS,
                guidance_scale=guidance_scale,
                use_inference_mode=False,
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
                    params={
                        "seed": seed,
                        "alpha": round(alpha, 2),
                        "guidance_scale": guidance_scale,
                    },
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

    del emb_a
    del emb_b

    if print_progress:
        print(
            f"M6 embedding interpolation validation complete. Outputs in: {output_dir}"
        )


if __name__ == "__main__":
    main()
