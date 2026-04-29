"""Dtype parsing helpers shared by runtime modules."""

from __future__ import annotations

import torch

_DTYPE_FALLBACK_CHAIN: list[torch.dtype] = [
    torch.bfloat16,
    torch.float16,
    torch.float32,
]

FP8_NAME_ALIASES: dict[str, str] = {
    "float8_e4m3fn": "float8_e4m3fn",
    "fp8_e4m3fn": "float8_e4m3fn",
    "e4m3fn": "float8_e4m3fn",
    "float8_e5m2": "float8_e5m2",
    "fp8_e5m2": "float8_e5m2",
    "e5m2": "float8_e5m2",
}

COMMON_DTYPE_ALIASES: dict[str, torch.dtype | None] = {
    "float16": torch.float16,
    "fp16": torch.float16,
    "half": torch.float16,
    "float32": torch.float32,
    "fp32": torch.float32,
    "float": torch.float32,
    "bfloat16": torch.bfloat16,
    "bf16": torch.bfloat16,
}


def normalize_dtype_name(name: str) -> str:
    return name.strip().lower()


def get_torch_dtype(dtype: torch.dtype | str) -> torch.dtype:
    """Convert a dtype alias to a torch.dtype, raising an error if not recognized."""
    if isinstance(dtype, torch.dtype):
        return dtype

    normalized = normalize_dtype_name(dtype)
    if normalized in COMMON_DTYPE_ALIASES:
        return COMMON_DTYPE_ALIASES[normalized]

    canonical_fp8 = FP8_NAME_ALIASES.get(normalized)
    if canonical_fp8 is not None:
        return getattr(torch, canonical_fp8, None)

    raise ValueError(f"Unsupported dtype string: {dtype!r}")


def check_dtype_supported(
    dtype: torch.dtype | str,
    device: torch.device | str = "cuda",
) -> torch.dtype | None:
    """Probe whether a dtype is supported on the given device.

    Returns the dtype if supported, None otherwise.
    """
    resolved_device = str(device)
    candidate = get_torch_dtype(dtype)

    try:
        with torch.no_grad():
            t = torch.ones((16,), device=resolved_device, dtype=candidate)
            _ = t + t
        return candidate
    except Exception as exc:
        print(
            f"Error occurred while checking dtype {candidate} on device {resolved_device}: {exc}"
        )
        return None


def resolve_dtype_for_device(
    dtype: torch.dtype | str | None = None,
    device: torch.device | str | None = None,
    verbose: bool = False,
) -> torch.dtype:
    """Resolve a supported dtype for the given device.

    - If ``dtype`` is given, try it first and fall back through the chain if unsupported.
    - If ``dtype`` is None, auto-detect the best dtype for the device.
    - If ``fallback`` is False, raises if the requested dtype is unsupported.
    """
    if device is not None:
        resolved_device = str(device)
    else:
        resolved_device = "cuda" if torch.cuda.is_available() else "cpu"
        if verbose:
            print(f"No device specified; auto-detected device={resolved_device}")

    if dtype is None:
        if not resolved_device.startswith("cuda"):
            return torch.float32
        return torch.bfloat16 if torch.cuda.is_bf16_supported() else torch.float16

    requested = get_torch_dtype(dtype)
    candidates = [requested] + ([d for d in _DTYPE_FALLBACK_CHAIN if d != requested])

    for candidate in candidates:
        result = check_dtype_supported(candidate, resolved_device)
        if result is not None:
            return result
        if verbose:
            print(f"dtype {candidate} not supported on device={resolved_device}")

    raise RuntimeError(
        f"No supported dtype found on device={resolved_device}; "
        f"tested {[str(d) for d in candidates]}. "
        "Check device compatibility and PyTorch installation."
    )
