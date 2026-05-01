"""Helpers for optional run-time config overrides injected by experiment runners."""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Mapping
from pprint import pprint

import torch


_PIPELINE_DEFAULTS: dict[str, Any] = {
    "offload_mode": "group",
    "group_offload_type": "leaf_level",
    "group_use_stream": True,
    "group_low_cpu_mem_usage": False,
    "enable_text_encoder_group_offload": True,
    "text_encoder_group_offload_type": "block_level",
    "text_encoder_num_blocks_per_group": 1,
    "enable_vae_group_offload": True,
    "vae_group_offload_type": "leaf_level",
    "vae_num_blocks_per_group": 2,
    "enable_vae_slicing": True,
    "enable_vae_tiling": True,
    "enable_layerwise_casting": True,
    "layerwise_storage_dtype": "float8_e4m3fn",
    "layerwise_fallback_storage_dtype": "float16",
    "layerwise_compute_dtype": "float16",
    "enable_channels_last": True,
    "enable_xformers_attention": True,
    "enable_torch_compile": False,
    "compile_mode": "max-autotune",
    "compile_fullgraph": False,
    "disable_progress_bar": True,
}

_PIPELINE_BOOL_KEYS = {
    "group_use_stream",
    "group_low_cpu_mem_usage",
    "enable_text_encoder_group_offload",
    "enable_vae_group_offload",
    "enable_vae_slicing",
    "enable_vae_tiling",
    "enable_layerwise_casting",
    "enable_channels_last",
    "enable_xformers_attention",
    "enable_torch_compile",
    "compile_fullgraph",
    "disable_progress_bar",
}

_PIPELINE_INT_KEYS = {
    "text_encoder_num_blocks_per_group",
    "vae_num_blocks_per_group",
}

_LOG_LEVELS = {"silent", "minimal", "full"}


def _convert_safe_bool(value: Any, *, default: bool) -> bool:
    """Convert boolean values safely from various common string and numeric representations."""
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        normalized = value.strip().lower()
        if normalized in {"1", "true", "yes", "on"}:
            return True
        if normalized in {"0", "false", "no", "off"}:
            return False
        return default
    if isinstance(value, (int, float)):
        return bool(value)
    return default


def _convert_safe_int(value: Any, *, default: int) -> int:
    try:
        return int(value)
    except Exception:
        return default


def load_run_config_from_env(env_var: str = "NELS_RUN_CONFIG") -> dict[str, Any]:
    """Load optional JSON config file path from env and return a dict.

    Returns an empty dict when no config is configured or if loading fails.
    """
    config_path = os.getenv(env_var)
    if not config_path:
        return {}

    path = Path(config_path)
    if not path.exists() or not path.is_file():
        print(f"Run config not found at {path}; proceeding with script defaults.")
        pprint(_PIPELINE_DEFAULTS)
        return {}

    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        print(f"Failed to parse run config at {path}: {exc}; using defaults.")
        pprint(_PIPELINE_DEFAULTS)
        return {}

    if not isinstance(raw, dict):
        print(f"Run config at {path} is not an object; using defaults.")
        pprint(_PIPELINE_DEFAULTS)
        return {}

    return raw


def resolve_log_level(
    run_config: Mapping[str, Any],
    *,
    default: str = "minimal",
) -> str:
    """Resolve log level from run config with validation and fallback."""
    raw_level = str(run_config.get("log_level", default)).strip().lower()
    if raw_level in _LOG_LEVELS:
        return raw_level

    print(f"Unknown log_level={raw_level!r}; using {default!r}.")
    return default


def should_write_quick_log(log_level: str) -> bool:
    """Return True when quick-log output should be written."""
    return log_level in {"minimal", "full"}


def should_print_progress(log_level: str) -> bool:
    """Return True when console progress prints should be emitted."""
    return log_level in {"minimal", "full"}


def resolve_pipeline_kwargs(
    run_config: Mapping[str, Any],
    *,
    device: str,
    torch_dtype: torch.dtype,
) -> dict[str, Any]:
    """Resolve ``load_flux_pipeline`` kwargs from defaults + optional overrides.

    Override sources (highest to lowest priority):
    1) top-level keys in ``run_config`` matching pipeline option names
    2) nested ``run_config["pipeline"]`` object
    3) internal defaults in this module
    """
    resolved = dict(_PIPELINE_DEFAULTS)

    nested = run_config.get("pipeline")
    if isinstance(nested, dict):
        resolved.update(nested)

    for key in _PIPELINE_DEFAULTS:
        if key in run_config:
            resolved[key] = run_config[key]

    for key in _PIPELINE_BOOL_KEYS:
        resolved[key] = _convert_safe_bool(
            resolved.get(key),
            default=bool(_PIPELINE_DEFAULTS[key]),
        )

    for key in _PIPELINE_INT_KEYS:
        resolved[key] = _convert_safe_int(
            resolved.get(key),
            default=int(_PIPELINE_DEFAULTS[key]),
        )

    return {
        "torch_dtype": torch_dtype,
        "device": device,
        **resolved,
    }


def resolve_run_config_value(
    run_config: Mapping[str, Any],
    key: str,
    default: Any,
) -> Any:
    """Resolve a config value with safe fallback to default.
    
    If run_config is empty or doesn't contain the key, returns default.
    """
    if not run_config:
        return default
    return run_config.get(key, default)
