"""Shared LLM inference service"""

import contextlib
import threading
from typing import Any

import torch
from transformers import GenerationConfig, pipeline
from transformers import logging as hf_logging

from .defaults import DEFAULT_LLM_MODEL as DEFAULT_MODEL

hf_logging.set_verbosity_error()

_pipeline: Any = None
_loaded_model_id: str | None = None
_preferred_model_id: str | None = None
_lock = threading.Lock()


def is_loaded() -> bool:
    return _pipeline is not None


def loaded_model_id() -> str | None:
    return _loaded_model_id


def set_preferred_model(model_id: str) -> None:
    """Set which model to load on next query()"""
    global _preferred_model_id
    _preferred_model_id = model_id.strip() or DEFAULT_MODEL


def load(model_id: str | None = None) -> None:
    """Load - offloads ComfyUI models first, falls back to DEFAULT_MODEL on failure"""
    global _pipeline, _loaded_model_id
    target = model_id or _preferred_model_id or DEFAULT_MODEL
    with _lock:
        if _pipeline is not None and _loaded_model_id == target:
            return
        _unload_nolock()
        try:
            _pipeline = _load_pipeline(target)
            _loaded_model_id = target
        except Exception as exc:
            if target != DEFAULT_MODEL:
                print(f"Failed to load LLM {target!r}: {exc} - falling back to {DEFAULT_MODEL}")
                _pipeline = _load_pipeline(DEFAULT_MODEL)
                _loaded_model_id = DEFAULT_MODEL
            else:
                raise


def unload() -> None:
    """Release the pipeline and free GPU memory"""
    with _lock:
        _unload_nolock()


def query(
    messages: list[dict],
    *,
    max_new_tokens: int = 64,
    temperature: float | None = None,
) -> str:
    """Send a chat-format message list, return the assistant response string

    temperature=None -> deterministic greedy decoding (default for every caller)
    temperature>0 -> sampled decoding, used by axis label generation for variety
    """
    global _pipeline
    if _pipeline is None:
        load()

    gen_kwargs: dict[str, Any] = {"max_new_tokens": max_new_tokens, "do_sample": temperature is not None}
    if temperature is not None:
        gen_kwargs["temperature"] = temperature

    result = _pipeline(messages, generation_config=GenerationConfig(**gen_kwargs))
    raw = result[0]["generated_text"][-1]["content"]
    return raw.strip()


# ---- internals ----


def _unload_nolock() -> None:
    global _pipeline, _loaded_model_id
    if _pipeline is not None:
        with contextlib.suppress(Exception):
            del _pipeline
        _pipeline = None
        _loaded_model_id = None
        try:
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
        except Exception:
            # best-effort cache clear
            pass


def _load_pipeline(model_name: str) -> Any:
    try:
        import comfy.model_management as mm  # only available in ComfyUI runtime

        mm.unload_all_models()
        mm.soft_empty_cache()
        print("Offloaded ComfyUI models to free GPU memory for LLM")
    except Exception:
        pass

    if torch.cuda.is_available():
        print(
            f"Loading LLM: {model_name} on cuda with device_map=auto, torch_dtype=float16 "
            "(downloading on first use)"
        )
        pipe = pipeline(
            "text-generation",
            model=model_name,
            device_map="auto",
            model_kwargs={"torch_dtype": torch.float16},
        )
        return pipe

    print(f"Loading LLM: {model_name} on cpu (downloading on first use)")
    pipe = pipeline("text-generation", model=model_name, device="cpu")
    return pipe
