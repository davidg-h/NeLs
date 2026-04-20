"""Callback utilities for observing denoising trajectories.

The helpers in this module support both read-only latent capture and
targeted latent edits during selected denoising steps.
"""

from __future__ import annotations
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Literal, TypeVar

import warnings
import torch
from helpers.methods.access import DiffusionPipeline, Flux2KleinPipeline


PipelineType = Flux2KleinPipeline | DiffusionPipeline
HookErrorMode = Literal["raise", "warn", "ignore"]
RecorderStepHook = Callable[
    [
        PipelineType,
        int,
        float,
        Dict[str, Any],
        torch.Tensor,
    ],
    None,
]
LatentEditFunction = Callable[
    [torch.Tensor, int, float, Dict[str, Any]],
    torch.Tensor,
]
_HookReturnT = TypeVar("_HookReturnT")


class _LatentStepCallbackBase:
    """Shared utilities for Diffusers ``callback_on_step_end`` handlers."""

    @staticmethod
    def _require_latents(callback_kwargs: Dict[str, Any]) -> Any:
        """Return callback latents and fail with a consistent error if missing."""
        if "latents" not in callback_kwargs:
            raise KeyError("Expected 'latents' in callback_kwargs")
        return callback_kwargs["latents"]

    @staticmethod
    def _parse_step(step_index: int) -> int:
        """Normalize the scheduler step index to ``int``."""
        return int(step_index)

    @staticmethod
    def _parse_timestep(timestep: float) -> float:
        """Normalize the scheduler timestep to ``float``."""
        return float(timestep)

    def _step_context(
        self,
        step_index: int,
        timestep: float,
        callback_kwargs: Dict[str, Any],
    ) -> tuple[int, float, Any]:
        """Normalize step/timestep and fetch callback latents once."""
        step = self._parse_step(step_index)
        timestep_value = self._parse_timestep(timestep)
        latents = self._require_latents(callback_kwargs)
        return step, timestep_value, latents

    @staticmethod
    def _handle_hook_error(
        *,
        hook_name: str,
        step: int,
        error: Exception,
        on_error: HookErrorMode,
    ) -> None:
        """Apply hook error policy with consistent warning formatting."""
        if on_error == "ignore":
            return
        if on_error == "warn":
            warnings.warn(
                f"{hook_name} failed at step {step}: {error}",
                RuntimeWarning,
                stacklevel=3,
            )
            return
        raise error

    def _invoke_hook_with_policy(
        self,
        hook: Callable[..., _HookReturnT],
        *hook_args: Any,
        hook_name: str,
        step: int,
        on_error: HookErrorMode,
        fallback: _HookReturnT,
    ) -> tuple[_HookReturnT, bool]:
        """Invoke a hook and return (result, success) under an error policy."""
        try:
            return hook(*hook_args), True
        except Exception as exc:
            self._handle_hook_error(
                hook_name=hook_name,
                step=step,
                error=exc,
                on_error=on_error,
            )
            return fallback, False

    def as_callback(self):
        """Return a callable that can be passed to ``callback_on_step_end``."""
        return self.callback


@dataclass
class StepLatentRecorder(_LatentStepCallbackBase):
    """Capture denoising latents at each sampling step.

    The recorder is intended for analysis workflows and does not alter
    the generation path; it only copies values from callback payloads.
    Register ``as_callback()`` with a Diffusers pipeline and it snapshots
    received latents so we can inspect, decode, or visualize intermediate
    states later.
    """

    store_on_cpu: bool = True
    latents_by_step: Dict[int, torch.Tensor] = field(default_factory=dict)
    timestep_by_step: Dict[int, float] = field(default_factory=dict)
    on_step_hook: RecorderStepHook | None = None
    on_hook_error: HookErrorMode = "raise"

    def clear(self) -> None:
        """Reset all captured step data."""
        self.latents_by_step.clear()
        self.timestep_by_step.clear()

    def register_hook(
        self,
        hook: RecorderStepHook | None,
        *,
        on_error: HookErrorMode | None = None,
    ) -> None:
        """Register or clear a custom per-step hook.

        The hook receives ``(pipe, step, timestep, callback_kwargs, latents_snapshot)``.
        """
        self.on_step_hook = hook
        if on_error is not None:
            self.on_hook_error = on_error

    def callback(
        self,
        _pipe: PipelineType,
        step_index: int,
        timestep: float,
        callback_kwargs: Dict[str, Any],
    ) -> Dict[str, Any]:
        """Handle ``callback_on_step_end`` payloads from Diffusers pipelines."""
        step, timestep_value, raw_latents = self._step_context(
            step_index, timestep, callback_kwargs
        )

        # Copy tensors so later denoising updates do not mutate stored states.
        latents = raw_latents.detach().clone()
        if self.store_on_cpu:
            # CPU snapshots reduce VRAM pressure during long captures.
            latents = latents.cpu()

        self.latents_by_step[step] = latents
        self.timestep_by_step[step] = timestep_value

        if self.on_step_hook is not None:
            self._invoke_hook_with_policy(
                self.on_step_hook,
                _pipe,
                step,
                timestep_value,
                callback_kwargs,
                latents,
                hook_name="Step hook",
                step=step,
                on_error=self.on_hook_error,
                fallback=None,
            )

        return callback_kwargs

    def steps(self):
        """Return captured step indices in ascending order."""
        return sorted(self.latents_by_step.keys())


@dataclass
class TimeWindowLatentEditor(_LatentStepCallbackBase):
    """Apply latent edits only within a denoising step window (M5).

    Register ``as_callback()`` in ``callback_on_step_end`` to selectively
    transform ``callback_kwargs['latents']`` for steps in
    ``[start_step, end_step]``.
    """

    start_step: int
    end_step: int
    edit_fn: LatentEditFunction
    on_hook_error: HookErrorMode = "raise"
    clone_before_edit: bool = False
    applied_steps: List[int] = field(default_factory=list)

    def __post_init__(self) -> None:
        """Validate step-window bounds and callback edit function."""
        if int(self.start_step) < 0 or int(self.end_step) < 0:
            raise ValueError("start_step and end_step must be >= 0")
        if int(self.start_step) > int(self.end_step):
            raise ValueError("start_step must be <= end_step")
        if not callable(self.edit_fn):
            raise TypeError("edit_fn must be callable")

    def clear(self) -> None:
        """Reset tracked application steps."""
        self.applied_steps.clear()

    def _in_window(self, step: int) -> bool:
        """Check whether a denoising step is inside the configured window."""
        return int(self.start_step) <= step <= int(self.end_step)

    def callback(
        self,
        _pipe: PipelineType,
        step_index: int,
        timestep: float,
        callback_kwargs: Dict[str, Any],
    ) -> Dict[str, Any]:
        """Conditionally edit latents for in-window denoising steps."""
        step, timestep_value, latents = self._step_context(
            step_index, timestep, callback_kwargs
        )
        if not self._in_window(step):
            return callback_kwargs

        if not isinstance(latents, torch.Tensor):
            raise TypeError("callback_kwargs['latents'] must be a torch.Tensor")

        source = latents.clone() if self.clone_before_edit else latents
        edited, edit_applied = self._invoke_hook_with_policy(
            self._apply_edit,
            source,
            step,
            timestep_value,
            callback_kwargs,
            latents,
            hook_name="Latent edit hook",
            step=step,
            on_error=self.on_hook_error,
            fallback=latents,
        )
        if not edit_applied:
            return callback_kwargs

        callback_kwargs["latents"] = edited
        self.applied_steps.append(step)
        return callback_kwargs

    def _apply_edit(
        self,
        source: torch.Tensor,
        step: int,
        timestep_value: float,
        callback_kwargs: Dict[str, Any],
        original_latents: torch.Tensor,
    ) -> torch.Tensor:
        """Run ``edit_fn`` and validate that output remains latent-compatible."""
        edited = self.edit_fn(source, step, timestep_value, callback_kwargs)
        if not isinstance(edited, torch.Tensor):
            raise TypeError("edit_fn must return a torch.Tensor")
        if edited.shape != original_latents.shape:
            raise ValueError(
                f"Edited latent shape mismatch: {edited.shape} != {original_latents.shape}"
            )
        return edited
