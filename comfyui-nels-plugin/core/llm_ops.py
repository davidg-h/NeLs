"""Shared LLM inference service"""

import contextlib
import re
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


def query(messages: list[dict], *, max_new_tokens: int = 64) -> str:
    """Send a chat-format message list, return the assistant response string"""
    global _pipeline
    if _pipeline is None:
        load()

    result = _pipeline(
        messages,
        generation_config=GenerationConfig(max_new_tokens=max_new_tokens, do_sample=False),
    )
    raw = result[0]["generated_text"][-1]["content"]
    return raw.strip()


def paraphrase(text: str, count: int, strength: float) -> list[str]:
    """Return exactly `count` paraphrases (one LLM call per variant)"""
    style = (
        "minor rewording, synonyms only"
        if strength < 0.4
        else "moderate rephrasing, vary structure"
        if strength < 0.7
        else "aggressive paraphrase, change phrasing substantially"
    )
    # Token budget for one complete image prompt
    tokens_per_variant = max(80, len(text.split()) * 6)
    seen: set[str] = {text}
    result: list[str] = []
    for _ in range(count):
        avoid_hint = (
            " Avoid these already used paraphrases: " + "; ".join(f'"{r}"' for r in result)
            if result
            else ""
        )
        messages = [
            {
                "role": "system",
                "content": (
                    "You paraphrase short image generation prompts. "
                    f"Style: {style}. "
                    "Output exactly ONE paraphrase: a single line, no numbering, no extra text."
                    + avoid_hint
                ),
            },
            {"role": "user", "content": text},
        ]
        raw = query(messages, max_new_tokens=tokens_per_variant)
        line = _first_line(raw).lstrip("-•·1234567890.) ").strip()
        if line and line not in seen:
            seen.add(line)
            result.append(line)
    return result


def label_cluster(
    prompts: list[str],
    *,
    profile: dict[str, list[str]] | None = None,
    size: int = 0,
    assigned: list[str] | None = None,
    context: str = "",
) -> str:
    """Generate a 2-5 word label for a semantic cluster given sample prompts and optional term profile"""
    ctx = f' from "{context}"' if context else ""
    size_hint = f" ({size} points total)" if size else ""
    prompt_block = "\n".join(f"- {p}" for p in prompts)
    profile_block = _format_profile(profile) if profile else ""
    user_content = f"Cluster{size_hint}:\n{prompt_block}"
    if profile_block:
        user_content += f"\n\n{profile_block}"
    if assigned:
        user_content += "\n\nAlready used labels (do not reuse): " + ", ".join(assigned[-40:])
    messages = [
        {
            "role": "system",
            "content": (
                f"You label semantic clusters of image generation prompts{ctx}. "
                "Output a single short label (2-5 words) capturing the shared theme.\n"
                "Example: 'a sports car racing', 'a blue sedan on a highway' -> Sports Cars\n"
                "Example: 'a medieval castle at dusk', 'stone fortress walls' -> Medieval Architecture\n"
                "Output ONLY the label. One line, no punctuation at the end."
            ),
        },
        {"role": "user", "content": user_content},
    ]
    return _first_line(query(messages, max_new_tokens=48))


def label_cluster_from_profile(
    profile: dict[str, list[str]],
    *,
    examples: list[str] | None = None,
    size: int = 0,
    assigned: list[str] | None = None,
    context: str = "",
) -> str:
    """Label a cluster from its TF-IDF term profile (common + distinctive + bigrams) and optional raw examples"""
    ctx = f' from "{context}"' if context else ""
    size_hint = f" ({size} points total)" if size else ""
    user_content = f"Cluster{size_hint}:\n{_format_profile(profile)}"
    if examples:
        user_content += "\n\nExamples:\n" + "\n".join(f"- {e}" for e in examples)
    if assigned:
        user_content += "\n\nAlready used labels (do not reuse): " + ", ".join(assigned[-40:])
    messages = [
        {
            "role": "system",
            "content": (
                f"You label semantic clusters{ctx}. "
                "You are given the most frequent terms, most distinctive terms, key phrases, and a few raw examples.\n"
                "Use all of them to infer the shared theme and output a single short label (2-5 words).\n"
                "Example - frequent: tench, goldfish, shark | distinctive: aquatic, marine | phrases: great white, tiger shark -> Aquatic Animals\n"
                "Example - frequent: tabby, persian, siamese | distinctive: feline, domestic | phrases: persian cat -> Domestic Cats\n"
                "Output ONLY the label. One line, no punctuation at the end."
            ),
        },
        {"role": "user", "content": user_content},
    ]
    return _first_line(query(messages, max_new_tokens=48))


def refine_labels(
    cluster_labels: dict[str, str],
    term_profiles: dict[str, dict[str, list[str]]],
    *,
    context: str = "",
) -> dict[str, str]:
    """Round-2 refinement: show all labels + full term profile so LLM can improve generic or overlapping ones"""
    ctx = f' from "{context}"' if context else ""
    cluster_summary = "\n".join(
        "- Cluster {cid} | frequent: {common} | distinctive: {distinctive} | label: {label}".format(
            cid=cid,
            common=", ".join(term_profiles.get(cid, {}).get("common", [])[:5]),
            distinctive=", ".join(term_profiles.get(cid, {}).get("distinctive", [])[:4]),
            label=label,
        )
        for cid, label in sorted(cluster_labels.items(), key=lambda x: int(x[0]))
    )
    messages = [
        {
            "role": "system",
            "content": (
                f"You refine semantic cluster labels{ctx}. "
                "Each line shows a cluster's current label, its most frequent terms, and its most distinctive terms. "
                "Improve labels that are too generic or overlap with another cluster - use the distinctive terms to differentiate. "
                "Reply with ONLY the revised labels, one per line, in the same order. "
                "Format: 'Cluster <id>: <label>'. Do not change labels that are already specific and unique."
            ),
        },
        {"role": "user", "content": cluster_summary},
    ]
    raw = query(messages, max_new_tokens=len(cluster_labels) * 20)
    return _parse_refined_labels(raw, cluster_labels)


def label_axis(
    top_prompts: list[str],
    bottom_prompts: list[str],
    neutral_labels: list[str] | None = None,
    exclude_label: str | None = None,
) -> str:
    """Name the semantic direction from A-side to B-side of a projection axis"""
    user_content = (
        "A-side (negative end):\n"
        + "\n".join(f"- {p}" for p in bottom_prompts)
        + "\n\nB-side (positive end):\n"
        + "\n".join(f"- {p}" for p in top_prompts)
    )
    if neutral_labels:
        user_content += (
            "\n\nNeither side (concepts common to both - do NOT use these when naming the axis):\n"
            + "\n".join(f"- {p}" for p in neutral_labels)
        )
    if exclude_label:
        user_content += f"\n\nAlready used for a different axis (do not reuse): {exclude_label}"
    messages = [
        {
            "role": "system",
            "content": (
                "You name semantic axes in an image prompt embedding space. "
                "Reply with exactly one short phrase in the format 'X to Y' describing the visual or thematic concept that changes along the axis. "
                "Be specific: name the actual subject matter, style, mood, or visual quality - not generic directions. "
                "NEVER use terms like 'negative to positive', 'low to high', 'less to more', 'A-side to B-side', or 'simple to complex' without grounding them in the actual content. "
                "Good examples: 'dark sci-fi to colorful anime', 'realistic portrait to fantasy creature', 'monochrome sketch to oil painting', 'space to nature'. "
                "Output only the phrase, nothing else."
            ),
        },
        {"role": "user", "content": user_content},
    ]
    raw = query(messages, max_new_tokens=32)
    label = _extract_axis_label(raw)
    if not _has_distinct_sides(label) or _label_reused(label, exclude_label):
        retry_messages = [
            *messages,
            {"role": "assistant", "content": raw.strip()},
            {"role": "user", "content": _DISTINCT_LABEL_NUDGE},
        ]
        label = _pick_valid_label(query(retry_messages, max_new_tokens=64), exclude_label)
    return label


def label_axis_candidate(
    top_prompts: list[str],
    bottom_prompts: list[str],
    neutral_labels: list[str] | None = None,
    exclude_label: str | None = None,
) -> tuple[str, float]:
    """Name one SVD axis candidate and return (label, confidence 0-1) in a single LLM call"""
    user_content = (
        "Negative side:\n"
        + "\n".join(f"- {p}" for p in bottom_prompts)
        + "\n\nPositive side:\n"
        + "\n".join(f"- {p}" for p in top_prompts)
    )
    if neutral_labels:
        user_content += "\n\nNeither side (common to both - do NOT use when naming):\n" + "\n".join(
            f"- {p}" for p in neutral_labels
        )
    if exclude_label:
        user_content += f"\n\nAlready used axis (do not reuse): {exclude_label}"
    messages = [
        {
            "role": "system",
            "content": (
                "You name semantic axes in an image prompt embedding space. "
                "Reply in exactly two lines:\n"
                "Line 1: A short phrase 'X to Y' describing what visual or thematic concept changes along this axis. "
                "Be specific - name the actual subject, style, mood, or visual quality. "
                "NEVER use terms like 'negative to positive', 'low to high', or 'A-side to B-side'.\n"
                "Line 2: A confidence score from 0.0 to 1.0 (how clearly this axis captures a distinct semantic concept; 0.0 if no clear theme is visible).\n"
                "Good examples:\n"
                "dark sci-fi to colorful anime\n"
                "0.85\n\n"
                "realistic portrait to fantasy creature\n"
                "0.9\n\n"
                "unclear mixed content\n"
                "0.1\n"
                "Output only these two lines, nothing else."
            ),
        },
        {"role": "user", "content": user_content},
    ]
    raw = query(messages, max_new_tokens=48)
    label, confidence = _parse_axis_candidate_response(raw)
    if not _has_distinct_sides(label) or _label_reused(label, exclude_label):
        retry_messages = [
            *messages,
            {"role": "assistant", "content": raw.strip()},
            {"role": "user", "content": _DISTINCT_LABEL_NUDGE},
        ]
        label = _pick_valid_label(query(retry_messages, max_new_tokens=96), exclude_label)
    return label, confidence


def probe_synthesize(seed_texts: list[str], negative_texts: list[str], count: int = 3) -> list[str]:
    """Synthesize novel prompts near seed_texts -> negative_texts steers LLM away from those concepts"""
    user_content = "Prompts near the target concept (write something like these):\n" + "\n".join(
        f"- {t}" for t in seed_texts
    )
    if negative_texts:
        user_content += (
            "\n\nPrompts far from the target concept (do not write anything like these):\n"
            + "\n".join(f"- {t}" for t in negative_texts)
        )
    messages = [
        {
            "role": "system",
            "content": (
                "You synthesize image generation prompts. "
                "Given reference prompts near a target concept and prompts far from it, "
                "write new prompts that match the target concept. "
                f"Output exactly {count} prompts, one per line, no numbering, no explanations. "
                "Do not copy phrases from the references. "
                "Each prompt must be 5-20 words and a complete self-contained image description."
            ),
        },
        {"role": "user", "content": user_content},
    ]
    raw = query(messages, max_new_tokens=count * 40)
    seen: set[str] = set(seed_texts)
    result: list[str] = []
    for line in raw.splitlines():
        line = _clean_llm_line(line)
        if line and line not in seen:
            seen.add(line)
            result.append(line)
        if len(result) >= count:
            break
    return result


def probe_suggest_iter(
    beam: list[tuple[float, str]],
    negative_texts: list[str],
    *,
    count: int = 5,
) -> list[str]:
    """Generate candidate prompts from the full ranked beam with CLIP score feedback

    beam: (cosine_sim, text) pairs sorted best-first - shown to LLM with scores
    negative_texts: LLM is told to avoid these themes
    """
    ranked_block = "\n".join(
        f"{i + 1}. (score={sim:.4f}) {txt}" for i, (sim, txt) in enumerate(beam)
    )
    neg_block = (
        "\n\nPrompts far from the target concept (avoid these themes entirely):\n"
        + "\n".join(f"- {t}" for t in negative_texts)
        if negative_texts
        else ""
    )
    user_content = (
        "Candidates ranked by similarity to the target concept (higher score = closer):\n"
        + ranked_block
        + neg_block
        + f"\n\nWrite {count} new image prompts that push further in the direction of the "
        "top-scoring candidates and avoid the themes of the negatives. "
        "Use different vocabulary and phrasing - do not copy from the ranked list above."
    )
    messages = [
        {
            "role": "system",
            "content": (
                "You write short image generation prompts. "
                "Output only the prompts themselves - one per line, no numbering, no explanations, no analysis. "
                "Every line must be a self-contained image prompt of 5-20 words."
            ),
        },
        {"role": "user", "content": user_content},
    ]
    raw = query(messages, max_new_tokens=count * 30)
    seen: set[str] = {txt for _, txt in beam}
    result: list[str] = []
    for line in raw.splitlines():
        line = _clean_llm_line(line)
        if line and line not in seen:
            seen.add(line)
            result.append(line)
        if len(result) >= count:
            break
    return result


# ---- internals ----


def _parse_axis_candidate_response(text: str) -> tuple[str, float]:
    """Parse (label, confidence) from two-line LLM response"""
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    label = _extract_axis_label(lines[0]) if lines else "unknown to unknown"
    confidence = 0.0
    for line in lines[1:]:
        try:
            val = float(re.sub(r"[^\d.]", "", line))
            if 0.0 <= val <= 1.0:
                confidence = val
                break
        except (ValueError, TypeError):
            continue
    return label, confidence


def _extract_axis_label(text: str) -> str:
    """Extract 'X to Y' from LLM axis label output, stripping any echoed preamble"""
    line = _first_line(text)
    # strip leading "1. " / "2) " candidate-list numbering
    line = re.sub(r"^\d+[.)]\s*", "", line).strip()
    # strip "A-side (...):" or "B-side (...):" prefix the LLM may echo from user content
    line = re.sub(r"^[AB]-side[^:]*:\s*", "", line, flags=re.IGNORECASE).strip()
    # strip "The axis goes/ranges/runs from ..." preamble
    line = re.sub(r"^the\s+axis\s+\w+\s*(?:from)?\s*", "", line, flags=re.IGNORECASE).strip()
    m = re.search(r"(.+?)\s+to\s+(.+)", line)
    if m:
        side_a = m.group(1).strip().rstrip(".,:;!?")
        side_b = m.group(2).strip().rstrip(".,:;!?")
        return f"{side_a} to {side_b}"
    return line.rstrip(".,:;!?")


def _has_distinct_sides(label: str) -> bool:
    """True if label has the 'X to Y' shape with two non-empty, non-identical sides"""
    m = re.search(r"(.+?)\s+to\s+(.+)", label, flags=re.IGNORECASE)
    if not m:
        return False
    return m.group(1).strip().lower() != m.group(2).strip().lower()


_DISTINCT_LABEL_NUDGE = (
    "That phrase is invalid: either both sides are the same, or it duplicates "
    "the axis already used for a different axis. Give 3 candidate phrases, "
    "one per line, each naming a different concept not already used, in the "
    "same 'X to Y' format."
)


def _label_reused(label: str, exclude_label: str | None) -> bool:
    """True if label matches a previously used axis label (case/whitespace-insensitive)"""
    if not exclude_label:
        return False
    return label.strip().lower() == exclude_label.strip().lower()


def _pick_valid_label(text: str, exclude_label: str | None) -> str:
    """Parse up to 3 'X to Y' candidates, return the first with distinct sides that isn't reused"""
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    for line in lines[:3]:
        candidate = _extract_axis_label(line)
        if _has_distinct_sides(candidate) and not _label_reused(candidate, exclude_label):
            return candidate
    return ""


def _clean_llm_line(line: str) -> str:
    return line.strip().lstrip("-•·1234567890.) ").strip()


def _format_profile(profile: dict[str, list[str]]) -> str:
    parts = []
    if profile.get("common"):
        parts.append("Most frequent: " + ", ".join(profile["common"]))
    if profile.get("distinctive"):
        parts.append("Most distinctive: " + ", ".join(profile["distinctive"]))
    if profile.get("bigrams"):
        parts.append("Key phrases: " + ", ".join(profile["bigrams"]))
    return "\n".join(parts)


def _first_line(text: str) -> str:
    for line in text.splitlines():
        line = line.strip().strip('"').strip("'").strip()
        if line:
            return line
    return text.strip()


def _parse_refined_labels(raw: str, fallback: dict[str, str]) -> dict[str, str]:
    """Parse 'Cluster <id>: <label>' lines from LLM refinement output"""
    result = dict(fallback)
    for line in raw.splitlines():
        m = re.match(r"cluster\s+(\d+)\s*:\s*(.+)", line.strip(), re.IGNORECASE)
        if m:
            cid, label = m.group(1), m.group(2).strip().strip('"').strip("'")
            if cid in result and label:
                result[cid] = label
    return result


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

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Loading LLM: {model_name} on {device} (downloading on first use)")
    pipe = pipeline("text-generation", model=model_name, device=device)
    return pipe
