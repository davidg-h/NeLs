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
import time
import torch

from helpers.methods.callbacks import StepLatentRecorder, TimeWindowLatentEditor
from helpers.runtime.pipeline import (
    default_torch_dtype_for_device,
    load_flux_pipeline,
    resolve_runtime_device,
)
from helpers.runtime.sampling import generate_with_prompt


output_dir = Path(__file__).resolve().parent / "outputs" / "m5_time_window"
output_dir.mkdir(parents=True, exist_ok=True)

device = resolve_runtime_device()
dtype = default_torch_dtype_for_device(torch.float16, device)
pipe = load_flux_pipeline(
    torch_dtype=dtype,
    device=device,
    offload_mode="group",
    group_use_stream=True,
    group_low_cpu_mem_usage=False,
    enable_text_encoder_group_offload=True,
    text_encoder_group_offload_type="block_level",
    text_encoder_num_blocks_per_group=1,
    enable_vae_group_offload=True,
    vae_group_offload_type="leaf_level",
    vae_num_blocks_per_group=2,
    enable_vae_slicing=True,
    enable_vae_tiling=True,
    enable_layerwise_casting=True,
    layerwise_storage_dtype="float8_e4m3fn",
    layerwise_compute_dtype=dtype,
    enable_channels_last=True,
    enable_xformers_attention=True,
    enable_torch_compile=False,
)

recorder = StepLatentRecorder(store_on_cpu=True, on_hook_error="warn")


def dampen_edit(
    latents: torch.Tensor,
    _step: int,
    _timestep: float,
    _callback_kwargs,
) -> torch.Tensor:
    """Apply a mild denoising-window latent attenuation."""
    return latents * 0.98


editor = TimeWindowLatentEditor(
    start_step=1,
    end_step=2,
    edit_fn=dampen_edit,
    on_hook_error="warn",
    clone_before_edit=True,
)


def combined_callback(pipe_obj, step_index, timestep, callback_kwargs):
    """Apply M5 edit first, then capture resulting latent for A2 trace."""
    callback_kwargs = editor.callback(pipe_obj, step_index, timestep, callback_kwargs)
    callback_kwargs = recorder.callback(pipe_obj, step_index, timestep, callback_kwargs)
    return callback_kwargs


t0 = time.perf_counter()
with torch.inference_mode():
    result = generate_with_prompt(
        pipe=pipe,
        prompt="a dramatic cliffside lighthouse during golden hour",
        seed=404,
        callback=combined_callback,
        callback_tensor_inputs=["latents"],
        num_inference_steps=4,
        guidance_scale=0.0,
    )
t1 = time.perf_counter()
print(f"Generation completed in {t1 - t0:.2f} seconds.")

image = result.images[0]
image_path = output_dir / f"m5_time_window_output_{t1 - t0:.2f}.png"
image.save(image_path)
print(f"Saved: {image_path}")

summary = {
    "captured_steps": recorder.steps(),
    "edited_steps": editor.applied_steps,
    "latent_norm_by_step": {
        str(step): float(lat.norm().item())
        for step, lat in recorder.latents_by_step.items()
    },
}
summary_path = output_dir / f"m5_time_window_summary_{t1 - t0:.2f}.json"
summary_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
print(f"Saved: {summary_path}")

print(f"M5 time-window validation complete. Outputs in: {output_dir}")
