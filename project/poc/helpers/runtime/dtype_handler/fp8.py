"""FP8 detection and fallback selection helpers."""

from __future__ import annotations

from typing import Tuple

import torch

from .parsing import (
    FP8_NAME_ALIASES,
    get_torch_dtype,
    normalize_dtype_name,
    check_dtype_supported,
)


AUTO_FP8_PRIORITY: Tuple[str, str] = ("float8_e4m3fn", "float8_e5m2")


def _candidate_fp8_names(preferred_fp8: torch.dtype | str | None) -> list[str]:
    if preferred_fp8 is None:
        return list(AUTO_FP8_PRIORITY)

    if isinstance(preferred_fp8, torch.dtype):
        preferred_name = str(preferred_fp8).replace("torch.", "")
    else:
        preferred_name = normalize_dtype_name(preferred_fp8)

    canonical = FP8_NAME_ALIASES.get(preferred_name, preferred_name)
    if canonical not in FP8_NAME_ALIASES.values():
        raise ValueError(
            "preferred_fp8 must be one of: float8_e4m3fn, float8_e5m2 (or alias names)"
        )

    ordered = [canonical]
    for option in AUTO_FP8_PRIORITY:
        if option not in ordered:
            ordered.append(option)
    return ordered


def _is_fp8_dtype(dtype: torch.dtype | str) -> bool:
    if isinstance(dtype, torch.dtype):
        name = str(dtype).replace("torch.", "")
        return name in FP8_NAME_ALIASES.values()

    normalized = normalize_dtype_name(dtype)
    return normalized in FP8_NAME_ALIASES


def resolve_layerwise_storage_dtype(
    dtype: torch.dtype | str | None = None,
    *,
    device: str = "cuda",
    fallback_dtype: torch.dtype | str = torch.float16,
    verbose: bool = False,
) -> torch.dtype:
    """Resolve layerwise storage dtype with FP8 auto-selection and fallback.

    - ``None``: auto-select the best supported FP8 dtype.
    - FP8 dtype: validate support, fall back to ``fallback_dtype`` if unsupported.
    - Non-FP8 dtype: pass through unchanged, no probe needed.
    """
    resolved_fallback = get_torch_dtype(fallback_dtype)

    if dtype is not None and not _is_fp8_dtype(dtype):
        resolved = get_torch_dtype(dtype)
        print(
            f"Using explicit non-FP8 storage dtype {str(resolved).replace('torch.', '')}"
        )
        return resolved

    candidates = _candidate_fp8_names(preferred_fp8=dtype)
    for fp8_candidate in candidates:
        candidate_dtype = getattr(torch, fp8_candidate, None)
        if candidate_dtype is None:
            continue

        if check_dtype_supported(candidate_dtype, device) is not None:
            prefix = "Using requested" if dtype is not None else "Auto-selected"
            print(f"{prefix} FP8 dtype {fp8_candidate} on device={device}")
            return candidate_dtype

        if verbose:
            print(
                f"Candidate FP8 dtype {fp8_candidate} is not supported on device={device}"
            )

    candidate_list = ", ".join(candidates)
    print(
        f"Falling back from FP8 to {str(resolved_fallback)} on device={device}; "
        f"tested candidates=[{candidate_list}]"
    )
    return resolved_fallback
