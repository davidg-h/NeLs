"""M5 validation example: time-windowed latent editing during denoising.

Pipeline coverage:
- Model loading
- A2 callback capture via ``StepLatentRecorder``
- M5 windowed editing via ``TimeWindowLatentEditor``
- Prompt generation with callback-driven latent edits
- Output image + captured tensor summary export
"""

from __future__ import annotations
from pathlib import Path
import json
import torch

from helpers.methods.callbacks import StepLatentRecorder, TimeWindowLatentEditor
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
    """Execute M5 time-window edit pipeline."""
    run_config = load_run_config_from_env()
    log_level = resolve_log_level(run_config)
    quick_log_enabled = should_write_quick_log(log_level)
    print_progress = should_print_progress(log_level)

    default_output_dir = Path(__file__).resolve().parent / "outputs" / "m5_time_window"
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

    recorder = StepLatentRecorder(store_on_cpu=True, on_hook_error="warn")
    window_start = int(resolve_run_config_value(run_config, "window_start", 1))
    window_end = int(resolve_run_config_value(run_config, "window_end", 2))
    edit_scale = float(resolve_run_config_value(run_config, "edit_scale", 0.98))

    def dampen_edit(
        latents: torch.Tensor,
        _step: int,
        _timestep: float,
        _callback_kwargs,
    ) -> torch.Tensor:
        """Apply a mild denoising-window latent attenuation."""
        return latents * edit_scale

    editor = TimeWindowLatentEditor(
        start_step=window_start,
        end_step=window_end,
        edit_fn=dampen_edit,
        on_hook_error="warn",
        clone_before_edit=True,
    )

    def combined_callback(pipe_obj, step_index, timestep, callback_kwargs):
        """Apply M5 edit first, then capture resulting latent for A2 trace."""
        callback_kwargs = editor.callback(
            pipe_obj, step_index, timestep, callback_kwargs
        )
        callback_kwargs = recorder.callback(
            pipe_obj, step_index, timestep, callback_kwargs
        )
        return callback_kwargs

    prompt = str(
        resolve_run_config_value(
            run_config, "prompt", "a dramatic cliffside lighthouse during golden hour"
        )
    )
    seed = int(resolve_run_config_value(run_config, "seed", 404))
    num_inference_steps = int(
        resolve_run_config_value(run_config, "num_inference_steps", 4)
    )
    guidance_scale = float(resolve_run_config_value(run_config, "guidance_scale", 0.0))

    quick_log_path = output_dir / "quick_log.md"
    if quick_log_enabled:
        start_quick_log(
            quick_log_path,
            run_name="m5_time_window",
            config={
                "seed": seed,
                "prompt": prompt,
                "num_inference_steps": num_inference_steps,
                "guidance_scale": guidance_scale,
                "window": [editor.start_step, editor.end_step],
                "edit_scale": edit_scale,
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
    baseline_path = output_dir / "m5_baseline.png"
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

    result, elapsed = timed_generate_with_prompt(
        pipe=pipe,
        prompt=prompt,
        seed=seed,
        device=device,
        callback=combined_callback,
        callback_tensor_inputs=["latents"],
        num_inference_steps=num_inference_steps,
        guidance_scale=guidance_scale,
    )
    if print_progress:
        print(f"Generation completed in {elapsed:.2f} seconds.")

    image = result.images[0]
    image_path = output_dir / "m5_time_window_output.png"
    image.save(image_path)

    if quick_log_enabled:
        append_quick_log_entry(
            quick_log_path,
            image_path=image_path,
            label="time_window_edit",
            elapsed_seconds=elapsed,
            params={
                "seed": seed,
                "window_start": editor.start_step,
                "window_end": editor.end_step,
            },
        )
    if print_progress:
        print(f"Saved: {image_path}")

    summary = {
        "elapsed_seconds": round(float(elapsed), 4),
        "baseline_elapsed_seconds": round(float(baseline_elapsed), 4),
        "edit_scale": edit_scale,
        "captured_steps": recorder.steps(),
        "edited_steps": editor.applied_steps,
        "latent_norm_by_step": {
            str(step): float(lat.norm().item())
            for step, lat in recorder.latents_by_step.items()
        },
    }
    summary_path = output_dir / "m5_time_window_summary.json"
    summary_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    if print_progress:
        print(f"Saved: {summary_path}")
        print(f"M5 time-window validation complete. Outputs in: {output_dir}")


if __name__ == "__main__":
    main()
