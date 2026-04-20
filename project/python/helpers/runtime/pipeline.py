"""Pipeline-loading helpers used by notebooks and small experiments."""

from __future__ import annotations
import inspect
import os
from typing import Any, Callable, Literal
import torch
from diffusers import DiffusionPipeline, Flux2KleinPipeline

try:
    from diffusers.hooks import apply_group_offloading
except Exception:
    apply_group_offloading = None

OffloadMode = Literal["none", "cpu", "group"]


def _parse_torch_dtype(dtype: torch.dtype | str) -> torch.dtype:
    """Parse torch dtype values passed as dtype objects or common strings."""
    if isinstance(dtype, torch.dtype):
        return dtype

    key = dtype.strip().lower()
    mapping: dict[str, torch.dtype | None] = {
        "float16": torch.float16,
        "fp16": torch.float16,
        "half": torch.float16,
        "float32": torch.float32,
        "fp32": torch.float32,
        "float": torch.float32,
        "bfloat16": torch.bfloat16,
        "bf16": torch.bfloat16,
        "float8_e4m3fn": getattr(torch, "float8_e4m3fn", None),
        "fp8_e4m3fn": getattr(torch, "float8_e4m3fn", None),
        "float8_e5m2": getattr(torch, "float8_e5m2", None),
        "fp8_e5m2": getattr(torch, "float8_e5m2", None),
    }
    if key not in mapping:
        raise ValueError(f"Unsupported dtype string: {dtype!r}")

    parsed = mapping[key]
    if parsed is None:
        raise ValueError(
            f"dtype {dtype!r} is not available in this PyTorch build"
        )
    return parsed


def _filter_supported_kwargs(
    fn: Callable[..., Any],
    candidate_kwargs: dict[str, Any],
) -> dict[str, Any]:
    """Return kwargs accepted by fn to stay compatible across diffusers versions."""
    try:
        signature = inspect.signature(fn)
    except Exception:
        return candidate_kwargs

    return {
        key: value
        for key, value in candidate_kwargs.items()
        if key in signature.parameters
    }


def _maybe_apply_module_group_offload(
    module: Any,
    module_name: str,
    *,
    onload_device: str,
    offload_type: str,
    num_blocks_per_group: int,
    use_stream: bool,
    low_cpu_mem_usage: bool,
) -> None:
    """Apply module-level group offload with compatibility-safe fallbacks."""
    if module is None:
        print(f"Skipping group offload for {module_name}: module not found")
        return

    if apply_group_offloading is None:
        print(
            f"Skipping group offload for {module_name}: "
            "diffusers.hooks.apply_group_offloading unavailable"
        )
        return

    if not onload_device.startswith("cuda"):
        print(
            f"Skipping group offload for {module_name}: "
            f"onload_device={onload_device!r} is not CUDA"
        )
        return

    candidate_kwargs: dict[str, Any] = {
        "onload_device": torch.device(onload_device),
        "offload_device": torch.device("cpu"),
        "offload_type": offload_type,
        "use_stream": use_stream,
        "low_cpu_mem_usage": low_cpu_mem_usage,
    }
    if offload_type == "block_level":
        candidate_kwargs["num_blocks_per_group"] = max(1, int(num_blocks_per_group))

    try:
        supported_kwargs = _filter_supported_kwargs(
            apply_group_offloading,
            candidate_kwargs,
        )
        apply_group_offloading(module, **supported_kwargs)
        print(
            f"Enabled group offloading for {module_name} "
            f"(offload_type={offload_type})"
        )
    except Exception as exc:
        print(f"Skipping group offload for {module_name}: {exc}")


def _maybe_enable_vae_memory_optimizations(
    pipe: Flux2KleinPipeline,
    *,
    enable_vae_slicing: bool,
    enable_vae_tiling: bool,
) -> None:
    """Enable VAE memory helpers via pipeline wrappers or direct VAE methods."""
    vae = getattr(pipe, "vae", None)

    if enable_vae_slicing:
        if hasattr(pipe, "enable_vae_slicing"):
            try:
                pipe.enable_vae_slicing()
                print("Enabled VAE slicing via pipe.enable_vae_slicing()")
            except Exception as exc:
                print(f"Skipping VAE slicing: {exc}")
        elif vae is not None and hasattr(vae, "enable_slicing"):
            try:
                vae.enable_slicing()
                print("Enabled VAE slicing via vae.enable_slicing()")
            except Exception as exc:
                print(f"Skipping VAE slicing via vae.enable_slicing(): {exc}")
        else:
            print(
                "Skipping VAE slicing: pipeline has no enable_vae_slicing() "
                "and vae has no enable_slicing()"
            )

    if enable_vae_tiling:
        if hasattr(pipe, "enable_vae_tiling"):
            try:
                pipe.enable_vae_tiling()
                print("Enabled VAE tiling via pipe.enable_vae_tiling()")
            except Exception as exc:
                print(f"Skipping VAE tiling: {exc}")
        elif vae is not None and hasattr(vae, "enable_tiling"):
            try:
                vae.enable_tiling()
                print("Enabled VAE tiling via vae.enable_tiling()")
            except Exception as exc:
                print(f"Skipping VAE tiling via vae.enable_tiling(): {exc}")
        else:
            print(
                "Skipping VAE tiling: pipeline has no enable_vae_tiling() "
                "and vae has no enable_tiling()"
            )


def _maybe_enable_channels_last(pipe: Flux2KleinPipeline) -> None:
    """Try channels-last on image-like modules and continue on failure."""
    enabled_any = False
    for module_name in ("unet", "vae"):
        module = getattr(pipe, module_name, None)
        if module is None:
            continue

        try:
            module.to(memory_format=torch.channels_last)
            enabled_any = True
            print(f"Enabled channels-last memory format on {module_name}")
        except Exception as exc:
            print(f"Skipping channels-last on {module_name}: {exc}")

    if not enabled_any:
        print("Skipping channels-last: no compatible module found")


def _maybe_enable_xformers_attention(pipe: Flux2KleinPipeline) -> None:
    """Enable memory-efficient attention if supported by the pipeline."""
    if not hasattr(pipe, "enable_xformers_memory_efficient_attention"):
        print("Skipping xFormers attention: pipeline has no support method")
        return

    try:
        pipe.enable_xformers_memory_efficient_attention()
        print("Enabled xFormers memory-efficient attention")
    except Exception as exc:
        print(f"Skipping xFormers attention: {exc}")


def _maybe_enable_layerwise_casting(
    pipe: Flux2KleinPipeline,
    *,
    storage_dtype: torch.dtype,
    compute_dtype: torch.dtype,
) -> None:
    """Enable transformer layerwise weight casting if supported."""
    transformer = getattr(pipe, "transformer", None)
    if transformer is None:
        print("Skipping layerwise casting: pipeline has no transformer")
        return

    if not hasattr(transformer, "enable_layerwise_casting"):
        print("Skipping layerwise casting: transformer has no support method")
        return

    try:
        transformer.enable_layerwise_casting(
            storage_dtype=storage_dtype,
            compute_dtype=compute_dtype,
        )
        print(
            "Enabled layerwise casting on transformer "
            f"(storage={storage_dtype}, compute={compute_dtype})"
        )
    except Exception as exc:
        print(f"Skipping layerwise casting: {exc}")


def resolve_model_id(model_id: str | None = None) -> str:
    """Resolve model id from explicit argument or MODEL_ID env variable."""
    if model_id:
        return model_id

    env_model_id = os.getenv("MODEL_ID")
    if env_model_id:
        return env_model_id
    raise ValueError("Model ID must be provided via argument or MODEL_ID")


def resolve_runtime_device(device: torch.device | str | None = None) -> str:
    """Resolve target device from explicit argument or DEVICE environment variable."""
    raw_device = device if device is not None else os.getenv("DEVICE")
    if raw_device is None:
        raw_device = "cuda" if torch.cuda.is_available() else "cpu"

    resolved = str(raw_device)
    if resolved.startswith("cuda") and not torch.cuda.is_available():
        return "cpu"
    return resolved


def default_torch_dtype_for_device(
    dtype: torch.dtype | str | None = None,
    device: torch.device | str | None = None,
) -> torch.dtype:
    """
    Resolve an appropriate dtype.

    - If dtype is provided, parse and return it.
    - If running on CUDA, default to fp16.
    - Otherwise default to fp32.
    """
    if dtype is not None:
        return _parse_torch_dtype(dtype)

    resolved_device = resolve_runtime_device(device)
    return torch.float16 if resolved_device.startswith("cuda") else torch.float32


def configure_hf_home(hf_home: str | None = None) -> str | None:
    """Set HF cache root from explicit argument or HF_HOME env variable."""
    resolved_hf_home = hf_home if hf_home is not None else os.getenv("HF_HOME")
    if resolved_hf_home:
        os.environ["HF_HOME"] = resolved_hf_home
    return resolved_hf_home

def _apply_group_offload(
    pipe: Flux2KleinPipeline,
    device: str,
    *,
    offload_type: str = "leaf_level",
    use_stream: bool = True,
    low_cpu_mem_usage: bool = False,
) -> None:
    """
    Enable group offloading for the transformer.

    low_cpu_mem_usage=False is faster but uses more RAM.
    """
    pipe.transformer.enable_group_offload(
        onload_device=device,
        offload_device="cpu",
        offload_type=offload_type,
        use_stream=use_stream,
        low_cpu_mem_usage=low_cpu_mem_usage,
    )


def _try_compile_flux_components(
    pipe: Flux2KleinPipeline,
    *,
    compile_mode: str,
    compile_fullgraph: bool,
) -> Flux2KleinPipeline:
    """
    Optionally compile hot components for repeated inference.

    Notes:
    - First run will usually be slower because of compilation/warmup.
    - This is most useful when you reuse the same pipeline many times.
    - We skip compile on CPU.
    """
    if not torch.cuda.is_available():
        print("torch.compile skipped because CUDA is not available.")
        return pipe

    if not hasattr(torch, "compile"):
        print("torch.compile skipped because this PyTorch build does not support it.")
        return pipe

    # Safer default for offloaded pipelines: still allow compile, but keep it opt-in.
    torch.set_float32_matmul_precision("high")

    # These flags are commonly used in diffusers compile examples.
    try:
        torch._inductor.config.conv_1x1_as_mm = True
        torch._inductor.config.coordinate_descent_tuning = True
        torch._inductor.config.epilogue_fusion = False
        torch._inductor.config.coordinate_descent_check_all_directions = True
    except Exception:
        pass

    # channels_last can help some compiled paths; harmless if unsupported.
    try:
        pipe.transformer.to(memory_format=torch.channels_last)
    except Exception:
        pass

    try:
        pipe.vae.to(memory_format=torch.channels_last)
    except Exception:
        pass

    try:
        pipe.transformer = torch.compile(
            pipe.transformer,
            mode=compile_mode,
            fullgraph=compile_fullgraph,
        )
        print("Compiled transformer with torch.compile")
    except Exception as exc:
        print(f"Skipping transformer compile: {exc}")

    try:
        pipe.vae.decode = torch.compile(
            pipe.vae.decode,
            mode=compile_mode,
            fullgraph=compile_fullgraph,
        )
        print("Compiled VAE decode with torch.compile")
    except Exception as exc:
        print(f"Skipping VAE decode compile: {exc}")

    return pipe

def load_flux_pipeline(
    model_id: str | None = None,
    torch_dtype: torch.dtype | str | None = None,
    device: torch.device | str | None = None,
    *,
    offload_mode: OffloadMode = "group",
    group_offload_type: str = "leaf_level",
    group_use_stream: bool = True,
    group_low_cpu_mem_usage: bool = False,
    enable_text_encoder_group_offload: bool = True,
    text_encoder_group_offload_type: str = "block_level",
    text_encoder_num_blocks_per_group: int = 2,
    enable_vae_group_offload: bool = True,
    vae_group_offload_type: str = "leaf_level",
    vae_num_blocks_per_group: int = 2,
    enable_vae_slicing: bool = True,
    enable_vae_tiling: bool = True,
    enable_layerwise_casting: bool = False,
    layerwise_storage_dtype: torch.dtype | str = "float8_e4m3fn",
    layerwise_compute_dtype: torch.dtype | str | None = None,
    enable_channels_last: bool = False,
    enable_xformers_attention: bool = False,
    enable_torch_compile: bool = False,
    compile_mode: str = "max-autotune",
    compile_fullgraph: bool = False,
    disable_progress_bar: bool = True,
) -> Flux2KleinPipeline:
    """
    Load a FLUX.2 Klein pipeline with speed-oriented defaults.

    Recommended presets:
    - Fastest if it fits in VRAM:
        offload_mode="none"
    - Best tradeoff for constrained GPUs:
        offload_mode="group"
    - Most conservative memory mode:
        offload_mode="cpu"

    Args:
        model_id:
            Hugging Face repo id.
        torch_dtype:
            torch dtype object or string like "float16", "bfloat16", "float32".
        device:
            Target device, usually "cuda" or "cpu".
        offload_mode:
            "none"  -> keep full pipeline on target device
            "cpu"   -> model CPU offload
            "group" -> transformer group offload
        group_offload_type:
            Typically "leaf_level".
        group_use_stream:
            Use CUDA streams for group offload transfers.
        group_low_cpu_mem_usage:
            Lower RAM usage, but slower.
        enable_text_encoder_group_offload:
            Apply module-level group offload to text encoder when available.
        text_encoder_group_offload_type:
            "block_level" or "leaf_level" for text encoder module-level offload.
        text_encoder_num_blocks_per_group:
            Number of blocks per group when text encoder uses block-level offload.
        enable_vae_group_offload:
            Apply module-level group offload to VAE when available.
        vae_group_offload_type:
            "block_level" or "leaf_level" for VAE module-level offload.
        vae_num_blocks_per_group:
            Number of blocks per group when VAE uses block-level offload.
        enable_vae_slicing:
            Enable VAE slicing for lower decode memory usage.
        enable_vae_tiling:
            Enable VAE tiling for lower decode memory usage on large outputs.
        enable_layerwise_casting:
            Enable transformer layerwise weight casting when supported.
        layerwise_storage_dtype:
            Storage dtype for layerwise casting, e.g. "float8_e4m3fn".
        layerwise_compute_dtype:
            Compute dtype for layerwise casting. Defaults to resolved torch_dtype.
        enable_channels_last:
            Enable channels-last memory format when supported.
        enable_xformers_attention:
            Opt-in xFormers memory-efficient attention.
        enable_torch_compile:
            Compile transformer / VAE decode for repeated runs.
        compile_mode:
            torch.compile mode.
        compile_fullgraph:
            Whether to request fullgraph compilation.
        disable_progress_bar:
            Disable diffusers progress bar overhead.

    Returns:
        Flux2KleinPipeline
    """
    configure_hf_home()

    resolved_device = resolve_runtime_device(device)
    resolved_model_id = resolve_model_id(model_id)
    resolved_dtype = default_torch_dtype_for_device(torch_dtype, resolved_device)

    pipe = Flux2KleinPipeline.from_pretrained(
        resolved_model_id,
        torch_dtype=resolved_dtype,
    )

    if disable_progress_bar:
        try:
            pipe.set_progress_bar_config(disable=True)
        except Exception as exc:
            print(f"Error occurred while disabling progress bar: {exc}. Skipping progress bar configuration.")

    if enable_layerwise_casting:
        try:
            storage_dtype = _parse_torch_dtype(layerwise_storage_dtype)
            compute_dtype = (
                _parse_torch_dtype(layerwise_compute_dtype)
                if layerwise_compute_dtype is not None
                else resolved_dtype
            )
            _maybe_enable_layerwise_casting(
                pipe,
                storage_dtype=storage_dtype,
                compute_dtype=compute_dtype,
            )
        except Exception as exc:
            print(f"Skipping layerwise casting: {exc}")

    if offload_mode == "none":
        pipe.to(resolved_device)
        print(f"Loaded pipeline on {resolved_device}")

    elif offload_mode == "cpu":
        pipe.enable_model_cpu_offload()
        print("Loaded pipeline with model CPU offload enabled")

    elif offload_mode == "group":
        if not resolved_device.startswith("cuda"):
            pipe.enable_model_cpu_offload()
            print(
                "Group offload requested on non-CUDA device; "
                "fell back to model CPU offload"
            )
        else:
            _apply_group_offload(
                pipe,
                resolved_device,
                offload_type=group_offload_type,
                use_stream=group_use_stream,
                low_cpu_mem_usage=group_low_cpu_mem_usage,
            )
            pipe.to(resolved_device)

            if enable_text_encoder_group_offload:
                _maybe_apply_module_group_offload(
                    getattr(pipe, "text_encoder", None),
                    "text_encoder",
                    onload_device=resolved_device,
                    offload_type=text_encoder_group_offload_type,
                    num_blocks_per_group=text_encoder_num_blocks_per_group,
                    use_stream=group_use_stream,
                    low_cpu_mem_usage=group_low_cpu_mem_usage,
                )

            if enable_vae_group_offload:
                _maybe_apply_module_group_offload(
                    getattr(pipe, "vae", None),
                    "vae",
                    onload_device=resolved_device,
                    offload_type=vae_group_offload_type,
                    num_blocks_per_group=vae_num_blocks_per_group,
                    use_stream=group_use_stream,
                    low_cpu_mem_usage=group_low_cpu_mem_usage,
                )

            print(
                "Loaded pipeline with transformer group offload enabled "
                f"(use_stream={group_use_stream}, "
                f"low_cpu_mem_usage={group_low_cpu_mem_usage})"
            )

    else:
        raise ValueError(
            f"Unsupported offload_mode={offload_mode!r}. "
            "Expected one of: 'none', 'cpu', 'group'."
        )

    _maybe_enable_vae_memory_optimizations(
        pipe,
        enable_vae_slicing=enable_vae_slicing,
        enable_vae_tiling=enable_vae_tiling,
    )

    if enable_channels_last:
        _maybe_enable_channels_last(pipe)

    if enable_xformers_attention:
        _maybe_enable_xformers_attention(pipe)

    if enable_torch_compile:
        pipe = _try_compile_flux_components(
            pipe,
            compile_mode=compile_mode,
            compile_fullgraph=compile_fullgraph,
        )

    return pipe
