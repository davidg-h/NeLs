"""Semantic axis projection operation for NELS sessions"""

import re
import uuid
from collections import Counter
from typing import Any

import torch

from ..tensor_ops import (
    flatten_tensor,
    point_embedding,
    trajectory_payload,
    trajectory_point,
    validate_embedding_set,
)
from ..text_terms import clean_llm_line, extract_bigrams, first_line, tokenize_words

_MIN_CLAUSE_LEN = 3
_AXIS_SUPPORT_RATIO = 0.10
_AXIS_SUPPORT_MIN = 24
_AXIS_SUPPORT_MAX = 80
_AXIS_TRAJECTORY_EXAMPLES = 5
_AXIS_NEUTRAL_EXAMPLES = 10
_AXIS_KEYWORD_TERMS = 3
_AXIS_LABEL_SIDE_MAX_WORDS = 4
_AXIS_LABEL_SIDE_MAX_CHARS = 32
_AXIS_ANCHOR_POOL_MAX = 40
_AXIS_CLEAN_KEEP = 12


def build_axis_projection(
    embedding_set: dict[str, Any],
    *,
    axis_group_a: list[str] | None = None,
    axis_group_b: list[str] | None = None,
    request_id: str | None = None,
    state_revision: int | None = None,
    compute_labels: bool = False,
) -> dict[str, Any]:
    """Project all dataset points onto user-defined axis A->B; returns ranked scores"""
    validate_embedding_set(embedding_set)
    id_to_point = {str(p["id"]): p for p in embedding_set["points"]}

    if not axis_group_a or not axis_group_b:
        raise ValueError(
            "Semantic Axis Projection requires at least one point in Group A and one in Group B. "
            "Use 'Add selected' to assign points to each group."
        )
    group_a = [id_to_point[i] for i in axis_group_a if i in id_to_point]
    group_b = [id_to_point[i] for i in axis_group_b if i in id_to_point]
    if not group_a or not group_b:
        raise ValueError("axis_projection: both groups must have at least one valid point")

    all_raw = torch.stack([flatten_tensor(point_embedding(p)) for p in embedding_set["points"]])
    id_to_idx = {str(p["id"]): i for i, p in enumerate(embedding_set["points"])}
    raw_centroid_a = all_raw[[id_to_idx[str(p["id"])] for p in group_a]].mean(dim=0)
    raw_centroid_b = all_raw[[id_to_idx[str(p["id"])] for p in group_b]].mean(dim=0)
    raw_origin = (raw_centroid_a + raw_centroid_b) / 2

    all_norms = torch.linalg.vector_norm(all_raw, dim=1, keepdim=True).clamp_min(1e-12)
    x_norm = all_raw / all_norms

    a_centroid = x_norm[[id_to_idx[str(p["id"])] for p in group_a]].mean(dim=0)
    b_centroid = x_norm[[id_to_idx[str(p["id"])] for p in group_b]].mean(dim=0)

    direction = b_centroid - a_centroid
    centroid_dist = float(torch.linalg.vector_norm(direction))
    if centroid_dist < 1e-8:
        raise ValueError("axis_projection: group centroids are identical")
    axis_1 = direction / centroid_dist

    origin = (a_centroid + b_centroid) / 2
    scale = centroid_dist / 2

    results: list[dict[str, Any]] = []
    for i, point in enumerate(embedding_set["points"]):
        score = float(torch.dot(x_norm[i] - origin, axis_1).item()) / scale
        results.append({"id": point["id"], "label": point["label"], "projection_score": score})
    results.sort(key=lambda x: x["projection_score"], reverse=True)

    axis_1_support_n = _support_band_size(len(results))
    axis_1_support_b = results[:axis_1_support_n]
    axis_1_support_a = results[-axis_1_support_n:]
    axis_1_clean_b = _coherent_axis_subset(axis_1_support_b, x_norm, id_to_idx)
    axis_1_clean_a = _coherent_axis_subset(axis_1_support_a, x_norm, id_to_idx)
    axis_1_labels_b = _evenly_sample_labels(axis_1_clean_b, _AXIS_TRAJECTORY_EXAMPLES)
    axis_1_labels_a = _evenly_sample_labels(axis_1_clean_a, _AXIS_TRAJECTORY_EXAMPLES)
    mid = len(results) // 2
    axis_1_neutral = [
        r["label"]
        for r in results[max(0, mid - _AXIS_NEUTRAL_EXAMPLES) : mid + _AXIS_NEUTRAL_EXAMPLES]
    ]
    axis_1_keywords_a, axis_1_keywords_b = _extract_axis_keyword_sides(
        [r["label"] for r in axis_1_support_a],
        [r["label"] for r in axis_1_support_b],
        axis_1_neutral,
    )
    axis_1_llm_keywords_a, axis_1_llm_keywords_b = _extract_axis_keyword_sides(
        [r["label"] for r in axis_1_clean_a],
        [r["label"] for r in axis_1_clean_b],
        axis_1_neutral,
    )

    axis_1_label: str | None = None
    if compute_labels:
        try:
            axis_1_label = _label_axis_with_keywords(
                axis_1_llm_keywords_b,
                axis_1_llm_keywords_a,
                axis_1_labels_b,
                axis_1_labels_a,
                axis_1_neutral,
            )
        except Exception as exc:
            print(f"[nels] axis_1_label failed: {exc!r}")

    mean = x_norm.mean(dim=0)
    centered = x_norm - mean
    proj1 = torch.mv(centered, axis_1)
    residuals = centered - proj1.unsqueeze(1) * axis_1.unsqueeze(0)

    components, variances, _ = _svd_top_k_components(residuals, k=5)

    axis_2: torch.Tensor | None = None
    axis_2_variance: float = 0.0
    axis_2_label: str | None = None
    axis_2_results: list[dict[str, Any]] | None = None
    axis_2_labels_neg: list[str] = []
    axis_2_labels_pos: list[str] = []
    axis_2_distance: float = 1.0
    axis_2_keywords_neg: list[str] = []
    axis_2_keywords_pos: list[str] = []

    if components and variances[0] >= 0.05:
        best_component, best_variance = _select_axis_2_component(components, variances, axis_1)
        if best_component is not None:
            axis_2 = best_component
            axis_2_variance = best_variance

            raw_scores = [
                float(torch.dot(residuals[i], axis_2).item())
                for i in range(len(embedding_set["points"]))
            ]

            raw_abs = torch.tensor(raw_scores).abs()
            axis_2_distance = float(torch.quantile(raw_abs, 0.95).item())
            axis_2_display_scale = max(float(raw_abs.max().item()), 1e-8)

            axis_2_entries = [
                {
                    "id": embedding_set["points"][i]["id"],
                    "label": embedding_set["points"][i]["label"],
                    "projection_score": raw_scores[i] / axis_2_display_scale,
                }
                for i in range(len(embedding_set["points"]))
            ]
            axis_2_entries.sort(key=lambda x: x["projection_score"], reverse=True)
            axis_2_results = axis_2_entries

            axis_2_support_n = _support_band_size(len(axis_2_entries))
            axis_2_support_pos = axis_2_entries[:axis_2_support_n]
            axis_2_support_neg = axis_2_entries[-axis_2_support_n:]
            axis_2_clean_pos = _coherent_axis_subset(axis_2_support_pos, x_norm, id_to_idx)
            axis_2_clean_neg = _coherent_axis_subset(axis_2_support_neg, x_norm, id_to_idx)
            axis_2_labels_pos = _evenly_sample_labels(axis_2_clean_pos, _AXIS_TRAJECTORY_EXAMPLES)
            axis_2_labels_neg = _evenly_sample_labels(axis_2_clean_neg, _AXIS_TRAJECTORY_EXAMPLES)

            order = sorted(range(len(raw_scores)), key=lambda i: raw_scores[i])
            mid = len(order) // 2
            axis_2_neutral = [
                embedding_set["points"][i]["label"]
                for i in order[
                    max(0, mid - _AXIS_NEUTRAL_EXAMPLES) : mid + _AXIS_NEUTRAL_EXAMPLES
                ]
            ]
            axis_2_keywords_neg, axis_2_keywords_pos = _extract_axis_keyword_sides(
                [r["label"] for r in axis_2_support_neg],
                [r["label"] for r in axis_2_support_pos],
                axis_2_neutral,
            )
            axis_2_llm_keywords_neg, axis_2_llm_keywords_pos = _extract_axis_keyword_sides(
                [r["label"] for r in axis_2_clean_neg],
                [r["label"] for r in axis_2_clean_pos],
                axis_2_neutral,
            )

            if compute_labels:
                try:
                    axis_2_label = _label_axis_with_keywords(
                        axis_2_llm_keywords_pos,
                        axis_2_llm_keywords_neg,
                        axis_2_labels_pos,
                        axis_2_labels_neg,
                        axis_2_neutral,
                        exclude_label=axis_1_label,
                    )
                except Exception as exc:
                    print(f"[nels] axis_2_label failed: {exc!r}")

    return {
        "operation": "axis_projection",
        "request_id": request_id or uuid.uuid4().hex,
        "state_revision": int(state_revision or 0),
        "source_group_a": [str(p["id"]) for p in group_a],
        "source_group_b": [str(p["id"]) for p in group_b],
        "axis_projection": results,
        "axis_label": axis_1_label,
        "axis_keywords_a": " · ".join(axis_1_keywords_a) if axis_1_keywords_a else None,
        "axis_keywords_b": " · ".join(axis_1_keywords_b) if axis_1_keywords_b else None,
        "axis_b_projection": axis_2_results,
        "axis_b_label": axis_2_label,
        "axis_b_keywords_a": " · ".join(axis_2_keywords_neg) if axis_2_keywords_neg else None,
        "axis_b_keywords_b": " · ".join(axis_2_keywords_pos) if axis_2_keywords_pos else None,
        "axis_b_variance": axis_2_variance if axis_2 is not None else None,
        "_raw_centroid_a": raw_centroid_a,
        "_raw_centroid_b": raw_centroid_b,
        "_raw_origin": raw_origin,
        "_axis_1": axis_1,
        "_axis_2": axis_2,
        "_axis_2_distance": axis_2_distance,
        "_axis_1_labels_a": axis_1_labels_a,
        "_axis_1_labels_b": axis_1_labels_b,
        "_axis_2_labels_neg": axis_2_labels_neg,
        "_axis_2_labels_pos": axis_2_labels_pos,
    }


def build_axis_trajectory(
    axis_projection_result: dict[str, Any],
    *,
    alpha_schedule: list[float] | None = None,
    request_id: str | None = None,
    state_revision: int | None = None,
) -> dict[str, Any]:
    """Build trajectory along Axis 1 (A->B) and optionally Axis 2 (orthogonal)"""
    raw_centroid_a: torch.Tensor = axis_projection_result["_raw_centroid_a"]
    raw_centroid_b: torch.Tensor = axis_projection_result["_raw_centroid_b"]
    raw_origin: torch.Tensor = axis_projection_result["_raw_origin"]
    axis_2: torch.Tensor | None = axis_projection_result.get("_axis_2")
    axis_2_distance: float = axis_projection_result.get("_axis_2_distance", 1.0)
    axis_1_labels_a: list[str] = axis_projection_result.get("_axis_1_labels_a", [])
    axis_1_labels_b: list[str] = axis_projection_result.get("_axis_1_labels_b", [])
    axis_2_labels_neg: list[str] = axis_projection_result.get("_axis_2_labels_neg", [])
    axis_2_labels_pos: list[str] = axis_projection_result.get("_axis_2_labels_pos", [])

    alphas = alpha_schedule if alpha_schedule is not None else [0.0, 0.25, 0.5, 0.75, 1.0]
    group_size = len(axis_1_labels_a)

    points = []
    for i, alpha in enumerate(alphas):
        tensor = torch.lerp(raw_centroid_a, raw_centroid_b, float(alpha))
        pt = trajectory_point(i, tensor, float(alpha), [], "axis_projection")
        pt["source_text_pair"] = 0
        points.append(pt)

    source_texts = axis_1_labels_a + axis_1_labels_b

    if axis_2 is not None:
        offset = len(points)
        for j, alpha in enumerate(alphas):
            scale = 2.0 * float(alpha) - 1.0
            tensor = raw_origin + scale * axis_2 * axis_2_distance
            pt = trajectory_point(offset + j, tensor, float(alpha), [], "axis_orth")
            pt["source_text_pair"] = 1
            points.append(pt)
        source_texts += axis_2_labels_neg + axis_2_labels_pos

    payload = trajectory_payload(
        operation="axis_projection",
        trajectory_points=points,
        source_point_ids=list(axis_projection_result.get("source_group_a", []))
        + list(axis_projection_result.get("source_group_b", [])),
        source_texts=source_texts,
        request_id=request_id,
        state_revision=state_revision,
    )
    payload["seq_cond_group_size"] = group_size
    return payload


def generate_axis_label_candidates(
    keyword_top: list[str],
    keyword_bottom: list[str],
    example_top: list[str],
    example_bottom: list[str],
    *,
    neutral_labels: list[str] | None = None,
    exclude_label: str | None = None,
    n: int = 3,
    temperature: float = 0.9,
) -> list[str]:
    """Generate n candidate 'X to Y' axis labels from one LLM call"""
    from .. import llm_ops

    user_content = (
        "Contrastive keywords measured from the support-band prompts:\n"
        f"A-side keywords: {', '.join(keyword_bottom)}\n"
        f"B-side keywords: {', '.join(keyword_top)}\n\n"
        "Example prompts at the A-side extreme:\n"
        + "\n".join(f"- {p}" for p in example_bottom)
        + "\n\nExample prompts at the B-side extreme:\n"
        + "\n".join(f"- {p}" for p in example_top)
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
                "The keywords summarize what is distinctive on each side of the axis; "
                "the example prompts give tone and context. "
                "Reply with short, vivid phrases in the format 'X to Y' describing the concrete "
                "visual or thematic concept that changes along the axis. "
                "Never use generic scales like 'low to high' or 'simple to complex' unless "
                "they are grounded in the actual content. "
                f"Return exactly {n} different candidate labels as a numbered list, one per line. "
                "Each line must contain only one 'X to Y' phrase."
            ),
        },
        {"role": "user", "content": user_content},
    ]

    raw = llm_ops.query(messages, max_new_tokens=max(40, n * 20), temperature=temperature)
    return _extract_axis_label_candidates(raw, n=n, exclude_label=exclude_label)


def critique_and_refine_axis_label(
    candidates: list[str],
    keyword_top: list[str],
    keyword_bottom: list[str],
    *,
    exclude_label: str | None = None,
) -> str:
    """Pick/rewrite the most vivid, precise candidate label using the keywords as yardstick"""
    if not candidates:
        return "unclear to unclear"
    if len(candidates) == 1:
        return candidates[0]

    from .. import llm_ops

    candidate_block = "\n".join(f"{i + 1}. {c}" for i, c in enumerate(candidates))
    exclude_hint = (
        f"\n\nAlready used for a different axis (do not reuse): {exclude_label}" if exclude_label else ""
    )
    messages = [
        {
            "role": "system",
            "content": (
                "You pick the best of several candidate axis labels for an image prompt embedding space. "
                "Judge by: (1) precision to the keywords, (2) vividness, (3) distinctness of both sides. "
                "You may lightly rewrite the winning candidate to sharpen it, but keep the 'X to Y' format "
                "and keep it grounded in the keywords. Output ONLY the final phrase, nothing else."
                + exclude_hint
            ),
        },
        {
            "role": "user",
            "content": (
                f"Keywords - A-side: {', '.join(keyword_bottom)}\n"
                f"Keywords - B-side: {', '.join(keyword_top)}\n\n"
                f"Candidates:\n{candidate_block}"
            ),
        },
    ]
    raw = llm_ops.query(messages, max_new_tokens=40)
    refined = _extract_axis_label(raw)
    if refined and _has_distinct_sides(refined) and not _label_reused(refined, exclude_label):
        return refined
    return candidates[0]


def _evenly_sample_labels(items: list[dict[str, Any]], n: int) -> list[str]:
    if len(items) <= n:
        return [r["label"] for r in items]
    indices = [round(i * (len(items) - 1) / (n - 1)) for i in range(n)]
    return [items[idx]["label"] for idx in indices]


def _support_band_size(total: int) -> int:
    if total <= 0:
        return _AXIS_TRAJECTORY_EXAMPLES
    return max(_AXIS_SUPPORT_MIN, min(_AXIS_SUPPORT_MAX, round(total * _AXIS_SUPPORT_RATIO)))


def _coherent_axis_subset(
    entries: list[dict[str, Any]],
    embeddings: torch.Tensor,
    id_to_idx: dict[str, int],
) -> list[dict[str, Any]]:
    if len(entries) <= _AXIS_CLEAN_KEEP:
        return entries

    pool = entries[: min(len(entries), _AXIS_ANCHOR_POOL_MAX)]
    vectors: list[torch.Tensor] = []
    valid_entries: list[dict[str, Any]] = []
    for entry in pool:
        idx = id_to_idx.get(str(entry["id"]))
        if idx is None:
            continue
        valid_entries.append(entry)
        vectors.append(embeddings[idx])

    if len(valid_entries) <= _AXIS_CLEAN_KEEP:
        return valid_entries or entries

    mat = torch.stack(vectors)
    prototype = mat.mean(dim=0)
    prototype = prototype / torch.linalg.vector_norm(prototype).clamp_min(1e-12)
    scored = []
    for entry, vec in zip(valid_entries, mat, strict=True):
        similarity = float(torch.dot(vec, prototype).item())
        scored.append((similarity, entry))

    scored.sort(key=lambda item: item[0], reverse=True)
    kept = {str(entry["id"]) for _, entry in scored[: min(_AXIS_CLEAN_KEEP, len(scored))]}
    filtered = [entry for entry in pool if str(entry["id"]) in kept]
    return filtered or pool


def _svd_top_k_components(
    matrix: torch.Tensor,
    k: int = 3,
) -> tuple[list[torch.Tensor], list[float], float]:
    if matrix.shape[0] < 2:
        return [], [], 0.0
    try:
        _, s, vh = torch.linalg.svd(matrix, full_matrices=False)
        total = float((s**2).sum())
        if total < 1e-12:
            return [], [], 0.0
        n = min(k, len(s))
        stability = float(s[0] / s[1]) if len(s) > 1 else float("inf")
        components = [vh[i] for i in range(n)]
        variances = [float(s[i] ** 2) / total for i in range(n)]
        return components, variances, stability
    except Exception:
        return [], [], 0.0


def _select_axis_2_component(
    components: list[torch.Tensor],
    variances: list[float],
    axis_1: torch.Tensor,
) -> tuple[torch.Tensor | None, float]:
    for comp, var in zip(components, variances, strict=True):
        comp = comp - float(torch.dot(comp, axis_1)) * axis_1
        comp_norm = float(torch.linalg.vector_norm(comp))
        if comp_norm < 1e-8:
            continue
        return comp / comp_norm, var
    return None, 0.0


def _label_axis_with_keywords(
    keyword_top: list[str],
    keyword_bottom: list[str],
    example_top: list[str],
    example_bottom: list[str],
    neutral_labels: list[str],
    *,
    exclude_label: str | None = None,
) -> str:
    fallback = _fallback_axis_label(keyword_top, keyword_bottom)
    candidates = generate_axis_label_candidates(
        keyword_top,
        keyword_bottom,
        example_top,
        example_bottom,
        neutral_labels=neutral_labels,
        exclude_label=exclude_label,
    )
    if not candidates:
        return fallback
    label = critique_and_refine_axis_label(
        candidates, keyword_top, keyword_bottom, exclude_label=exclude_label
    )
    return label if _is_valid_axis_label(label) else fallback


def _extract_axis_label(text: str) -> str:
    line = first_line(text)
    line = re.sub(r"[*_`#>\[\]\"]", " ", line)
    line = re.sub(r"^\d+[.)]\s*", "", line).strip()
    line = re.sub(r"^(candidate|label|axis)\s*[:\-]\s*", "", line, flags=re.IGNORECASE)
    line = re.sub(r"^[AB]-side[^:]*:\s*", "", line, flags=re.IGNORECASE).strip()
    line = re.sub(r"^the\s+axis\s+\w+\s*(?:from)?\s*", "", line, flags=re.IGNORECASE).strip()
    line = line.replace("->", " to ").replace("→", " to ").replace("↔", " to ")
    line = re.split(r"\s[\-\u2013\u2014]\s|[;|()]", line, maxsplit=1)[0].strip()
    line = re.sub(r"\s+", " ", line).strip(" .,:;!?-")

    if len(re.findall(r"\bto\b", line, flags=re.IGNORECASE)) != 1:
        return ""

    match = re.fullmatch(r"(.+?)\s+to\s+(.+)", line, flags=re.IGNORECASE)
    if not match:
        return ""

    side_a = _normalize_axis_side(match.group(1))
    side_b = _normalize_axis_side(match.group(2))
    if not side_a or not side_b:
        return ""
    return f"{side_a} to {side_b}"


def _extract_axis_label_candidates(
    text: str,
    *,
    n: int,
    exclude_label: str | None = None,
) -> list[str]:
    seen: set[str] = set()
    candidates: list[str] = []

    for raw_line in text.splitlines():
        line = clean_llm_line(raw_line)
        if not line:
            continue
        label = _extract_axis_label(line)
        if (
            label
            and _has_distinct_sides(label)
            and not _label_reused(label, exclude_label)
            and label.lower() not in seen
        ):
            seen.add(label.lower())
            candidates.append(label)
            if len(candidates) >= n:
                break

    if not candidates:
        label = _extract_axis_label(text)
        if (
            label
            and _is_valid_axis_label(label)
            and not _label_reused(label, exclude_label)
        ):
            candidates.append(label)

    return candidates


def _has_distinct_sides(label: str) -> bool:
    match = re.search(r"(.+?)\s+to\s+(.+)", label, flags=re.IGNORECASE)
    if not match:
        return False
    return match.group(1).strip().lower() != match.group(2).strip().lower()


def _label_reused(label: str, exclude_label: str | None) -> bool:
    if not exclude_label:
        return False
    return label.strip().lower() == exclude_label.strip().lower()


def _normalize_axis_side(side: str) -> str:
    side = re.sub(r"[*_`#>\[\]\"]", " ", side)
    side = re.sub(
        r"^(?:a|an|the|side|from|toward|towards|into|label|candidate)\s+",
        "",
        side,
        flags=re.IGNORECASE,
    )
    side = re.sub(r"\s+", " ", side).strip(" .,:;!?-")
    words = side.split()
    if not words or len(words) > _AXIS_LABEL_SIDE_MAX_WORDS:
        return ""
    if len(side) > _AXIS_LABEL_SIDE_MAX_CHARS:
        return ""
    if any(w.lower() in {"because", "while", "with", "featuring"} for w in words):
        return ""
    if not re.fullmatch(r"[A-Za-z][A-Za-z0-9 /'&-]*", side):
        return ""
    return " ".join(words)


def _is_valid_axis_label(label: str) -> bool:
    if not label or len(label) > (_AXIS_LABEL_SIDE_MAX_CHARS * 2 + 4):
        return False
    match = re.fullmatch(r"(.+?)\s+to\s+(.+)", label, flags=re.IGNORECASE)
    if not match:
        return False
    side_a = _normalize_axis_side(match.group(1))
    side_b = _normalize_axis_side(match.group(2))
    return bool(side_a and side_b and side_a.lower() != side_b.lower())


def _fallback_axis_label(keyword_top: list[str], keyword_bottom: list[str]) -> str:
    side_a = _fallback_axis_side(keyword_bottom)
    side_b = _fallback_axis_side(keyword_top)
    if side_a.lower() == side_b.lower():
        return "A-side to B-side"
    return f"{side_a} to {side_b}"


def _fallback_axis_side(keywords: list[str]) -> str:
    for keyword in keywords:
        side = _normalize_axis_side(keyword.title())
        if side:
            return side
    return "Side"


def _split_clauses(text: str) -> list[str]:
    chunks = [c.strip().lower() for c in text.replace("(", ",").replace(")", ",").split(",")]
    result: list[str] = []
    for chunk in chunks:
        words = tokenize_words(chunk)
        if 1 <= len(words) <= 3:
            cleaned = " ".join(words)
            if len(cleaned) >= _MIN_CLAUSE_LEN:
                result.append(cleaned)
    return result


def _dedupe_similar(terms: list[str]) -> list[str]:
    result: list[str] = []
    for term in terms:
        if not any(term in kept or kept in term for kept in result):
            result.append(term)
    return result


def _extract_axis_keyword_sides(
    side_a_texts: list[str],
    side_b_texts: list[str],
    neutral_texts: list[str],
) -> tuple[list[str], list[str]]:
    return (
        _contrastive_keywords(side_a_texts, side_b_texts, neutral_texts),
        _contrastive_keywords(side_b_texts, side_a_texts, neutral_texts),
    )


def _contrastive_keywords(
    focus_texts: list[str],
    other_texts: list[str],
    neutral_texts: list[str],
    *,
    k: int = _AXIS_KEYWORD_TERMS,
) -> list[str]:
    focus = _term_document_counts(focus_texts)
    other = _term_document_counts(other_texts)
    neutral = _term_document_counts(neutral_texts)

    scored: list[tuple[float, str]] = []
    for term, f_count in focus.items():
        if f_count < 2 and " " not in term:
            continue
        score = (
            float(f_count)
            - 0.8 * float(other.get(term, 0))
            - 0.5 * float(neutral.get(term, 0))
            + (0.2 if " " in term else 0.0)
        )
        if score > 0:
            scored.append((score, term))

    scored.sort(key=lambda item: (-item[0], -focus[item[1]], item[1]))
    return [_pretty_keyword(term) for term in _dedupe_similar([term for _, term in scored])[:k]]


def _pretty_keyword(term: str) -> str:
    words = tokenize_words(term)
    if words:
        return " ".join(words[:3])
    return term.strip().lower()


def _term_document_counts(texts: list[str]) -> Counter[str]:
    counts: Counter[str] = Counter()
    for text in texts:
        if not text:
            continue
        terms = set(tokenize_words(text))
        terms.update(extract_bigrams(text))
        for clause in _split_clauses(text):
            if len(clause.split()) <= 4:
                terms.add(clause)
        for term in terms:
            counts[term] += 1
    return counts
