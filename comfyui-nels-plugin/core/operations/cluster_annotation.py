"""LLM-based cluster annotation for NELS datasets"""

import json
import math
import re
from collections import Counter
from pathlib import Path
from typing import Any

from ..defaults import DEFAULT_LLM_MODEL as DEFAULT_MODEL
from ..text_terms import STOP_WORDS, extract_bigrams, first_line, tokenize_words

ANNOTATION_MODEL = DEFAULT_MODEL
ANNOTATION_TOP_N = 20
ANNOTATION_REFINE_ROUNDS = 4


def generate_frequency_labels(samples: list[dict]) -> dict[str, str]:
    """Frequency-based cluster labels from sample texts

    Groups samples by cluster_global, tokenizes texts, stems words, picks most frequent term per cluster
    Stored in dataset.json under cluster_labels
    """
    cluster_texts: dict[str, list[str]] = {}
    for s in samples:
        cg = s.get("cluster_global")
        if cg is None or cg == -1 or s.get("is_noise", False):
            continue
        text = s.get("text") or s.get("raw_text", "")
        if not text:
            continue
        cluster_texts.setdefault(str(cg), []).append(text)

    labels: dict[str, str] = {}
    for cid, texts in cluster_texts.items():
        freq: Counter = Counter()
        for text in texts:
            for w in re.findall(r"[a-zA-Z]+", text.lower()):
                if len(w) > 3 and w not in STOP_WORDS:
                    freq[_stem_word(w)] += 1
        labels[cid] = freq.most_common(1)[0][0] if freq else cid
    return labels


def annotate_clusters(
    dataset_path: str | Path,
    *,
    model_name: str = DEFAULT_MODEL,
    top_n: int = ANNOTATION_TOP_N,
    refine_rounds: int = ANNOTATION_REFINE_ROUNDS,
) -> dict[str, str]:
    """Generate LLM cluster labels and write them into dataset.json"""
    from .. import llm_ops  # heavy transformers dependency - only load when annotation runs

    path = Path(dataset_path)
    if not path.is_dir():
        raise ValueError(f"Dataset folder not found: {path}")

    meta_file = path / "dataset.json"
    if not meta_file.exists():
        raise FileNotFoundError(f"dataset.json missing in {path}")

    metadata = json.loads(meta_file.read_text(encoding="utf-8"))

    samples_file = path / "samples.jsonl"
    if not samples_file.exists():
        raise FileNotFoundError(f"samples.jsonl missing in {path}")
    samples = _load_samples(samples_file)

    cluster_map = _group_by_cluster(samples, top_n)
    if not cluster_map:
        raise ValueError("No clusters found - run HDBSCAN before annotating")

    cluster_all_texts = _group_all_texts(samples)

    llm_ops.load(model_name)

    context = (metadata.get("source_dataset") or "").strip()

    # detect shared prefix: metadata template -> known list -> statistical
    template = (metadata.get("source_loader") or {}).get("text_template") or ""
    all_prompts = [p for prompts in cluster_map.values() for p in prompts]
    prefix = _prefix_from_template(template) or _detect_prefix(all_prompts)
    if prefix:
        print(f"Detected structured prefix: {prefix!r} - using frequency-based extraction")

    # compute TF-IDF term profiles across all clusters (once, uses all points)
    term_profiles = _build_term_profiles(cluster_all_texts, prefix)

    # label each cluster passing already-assigned labels so the LLM avoids duplicates
    cluster_labels: dict[str, str] = {}
    ordered_ids = sorted(cluster_map.keys(), key=lambda x: int(x))
    total = len(ordered_ids)

    for i, cid in enumerate(ordered_ids, 1):
        print(f"Annotating cluster {i}/{total} (id={cid})...", end=" ", flush=True)
        profile = term_profiles.get(cid, {"common": [], "distinctive": []})
        size = len(cluster_all_texts.get(cid, []))
        assigned = list(cluster_labels.values()) if cluster_labels else None

        examples = cluster_map.get(cid, [])[:3]
        if prefix:
            label = label_cluster_from_profile(
                profile, examples=examples, size=size, assigned=assigned, context=context
            )
        else:
            label = label_cluster(
                cluster_map[cid], profile=profile, size=size, assigned=assigned, context=context
            )

        cluster_labels[cid] = label
        print(label)

    # refinement rounds
    for round_i in range(1, refine_rounds):
        print(f"\nRefinement round {round_i}/{refine_rounds - 1}...")
        cluster_labels = refine_labels(
            cluster_labels,
            term_profiles,
            context=context,
        )
        for cid, label in sorted(cluster_labels.items(), key=lambda x: int(x[0])):
            print(f"  cluster {cid}: {label}")

    cluster_labels = _fix_duplicates(term_profiles, cluster_labels, context)

    metadata["cluster_labels"] = cluster_labels
    meta_file.write_text(json.dumps(metadata, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nAnnotated {len(cluster_labels)} clusters -> {meta_file}")
    return cluster_labels


def label_cluster(
    prompts: list[str],
    *,
    profile: dict[str, list[str]] | None = None,
    size: int = 0,
    assigned: list[str] | None = None,
    context: str = "",
) -> str:
    """Generate a 2-5 word label for a semantic cluster given sample prompts and optional term profile"""
    from .. import llm_ops  # heavy transformers dependency - only load when annotation runs

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
    return first_line(llm_ops.query(messages, max_new_tokens=48))


def label_cluster_from_profile(
    profile: dict[str, list[str]],
    *,
    examples: list[str] | None = None,
    size: int = 0,
    assigned: list[str] | None = None,
    context: str = "",
) -> str:
    """Label a cluster from its TF-IDF term profile (common + distinctive + bigrams) and optional raw examples"""
    from .. import llm_ops  # heavy transformers dependency - only load when annotation runs

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
    return first_line(llm_ops.query(messages, max_new_tokens=48))


def refine_labels(
    cluster_labels: dict[str, str],
    term_profiles: dict[str, dict[str, list[str]]],
    *,
    context: str = "",
) -> dict[str, str]:
    """Round-2 refinement: show all labels + full term profile so LLM can improve generic or overlapping ones"""
    from .. import llm_ops  # heavy transformers dependency - only load when annotation runs

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
    raw = llm_ops.query(messages, max_new_tokens=len(cluster_labels) * 20)
    return _parse_refined_labels(raw, cluster_labels)


# ---- internals ----

_KNOWN_PREFIXES = [
    "a photo of ",
    "an image of ",
    "a picture of ",
    "a rendering of ",
    "a drawing of ",
    "a painting of ",
    "a sketch of ",
    "a photograph of ",
]
_PREFIX_THRESHOLD = 0.8

_MAX_DEDUP_PASSES = 4
_DEDUP_BATCH_SIZE = 8


def _stem_word(word: str) -> str:
    if word.endswith("ing") and len(word) > 6:
        return word[:-3]
    if word.endswith("tion") and len(word) > 7:
        return word[:-4]
    if word.endswith("ness") and len(word) > 7:
        return word[:-4]
    if word.endswith("ies") and len(word) > 5:
        return word[:-3] + "y"
    if word.endswith("ed") and len(word) > 5:
        return word[:-2]
    if word.endswith("s") and len(word) > 4:
        return word[:-1]
    return word


def _load_samples(samples_file: Path) -> list[dict[str, Any]]:
    samples = []
    for line in samples_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line:
            samples.append(json.loads(line))
    return samples


def _group_all_texts(samples: list[dict[str, Any]]) -> dict[str, list[str]]:
    result: dict[str, list[str]] = {}
    for s in samples:
        cg = s.get("cluster_global")
        if cg is None or cg == -1 or s.get("is_noise", False):
            continue
        text = s.get("text") or s.get("raw_text", "")
        if not text:
            continue
        result.setdefault(str(cg), []).append(text)
    return result


def _group_by_cluster(
    samples: list[dict[str, Any]],
    top_n: int,
) -> dict[str, list[str]]:
    """Diverse top-N sample per cluster for free-form LLM use"""
    cluster_map: dict[str, list[tuple[float, str]]] = {}
    for s in samples:
        cg = s.get("cluster_global")
        if cg is None or cg == -1 or s.get("is_noise", False):
            continue
        text = s.get("text") or s.get("raw_text", "")
        if not text:
            continue
        key = str(cg)
        strength = float(s.get("membership_strength") or 0.0)
        cluster_map.setdefault(key, []).append((strength, text))

    result = {}
    for cid, prompts in cluster_map.items():
        sorted_prompts = sorted(prompts, key=lambda x: -x[0])
        if len(sorted_prompts) <= top_n:
            result[cid] = [text for _, text in sorted_prompts]
        else:
            stride = len(sorted_prompts) // top_n
            result[cid] = [sorted_prompts[i * stride][1] for i in range(top_n)]
    return result


def _build_term_profiles(
    cluster_all_texts: dict[str, list[str]],
    prefix: str | None,
    *,
    n_common: int = 6,
    n_distinctive: int = 5,
) -> dict[str, dict[str, list[str]]]:
    """Compute per-cluster TF-IDF term profiles - common (high TF) + distinctive (high TF-IDF)"""
    n_clusters = len(cluster_all_texts)

    # collect phrase counts (class names), word counts, and bigram counts per cluster
    cluster_phrases: dict[str, Counter] = {}
    cluster_words: dict[str, Counter] = {}
    cluster_bigrams: dict[str, Counter] = {}

    for cid, texts in cluster_all_texts.items():
        phrases: Counter = Counter()
        words: Counter = Counter()
        bigrams: Counter = Counter()
        for text in texts:
            if prefix:
                plen = len(prefix)
                stripped = text[plen:] if text.lower().startswith(prefix) else text
                primary = re.split(r"[,(]", stripped)[0].strip().lower()
                if primary:
                    phrases[primary] += 1
                for word in tokenize_words(primary):
                    words[word] += 1
                for bg in extract_bigrams(primary):
                    bigrams[bg] += 1
            else:
                for word in tokenize_words(text):
                    words[word] += 1
                for bg in extract_bigrams(text):
                    bigrams[bg] += 1
        cluster_phrases[cid] = phrases
        cluster_words[cid] = words
        cluster_bigrams[cid] = bigrams

    # document frequency across clusters for words
    word_df: dict[str, int] = Counter()
    for counts in cluster_words.values():
        for word in counts:
            word_df[word] += 1

    profiles: dict[str, dict[str, list[str]]] = {}
    for cid in cluster_all_texts:
        phrases = cluster_phrases[cid]
        words = cluster_words[cid]
        bigrams = cluster_bigrams[cid]

        # common: top phrases (structured data) or top words (unstructured data)
        if prefix and phrases:
            common = [t for t, _ in phrases.most_common(n_common)]
        else:
            common = [t for t, _ in words.most_common(n_common)]

        # distinctive: highest TF-IDF words excluding those already in common
        tfidf: list[tuple[str, float]] = []
        for word, tf in words.items():
            idf = math.log((n_clusters + 1) / (word_df.get(word, 1) + 1)) + 1
            tfidf.append((word, tf * idf))
        tfidf.sort(key=lambda x: -x[1])

        seen = set(common)
        distinctive: list[str] = []
        for word, _ in tfidf:
            if word not in seen:
                seen.add(word)
                distinctive.append(word)
            if len(distinctive) >= n_distinctive:
                break

        top_bigrams = [bg for bg, _ in bigrams.most_common(4)]

        profiles[cid] = {"common": common, "distinctive": distinctive, "bigrams": top_bigrams}

    return profiles


def _prefix_from_template(template: str) -> str | None:
    """Detect prefix from dataset metadata if set"""
    if not template or "{text}" not in template:
        return None
    prefix = template.split("{text}")[0]
    return prefix if prefix.strip() else None


def _detect_prefix(prompts: list[str]) -> str | None:
    """Detect shared prefix from prompts using known lists and statistical heuristics"""
    if not prompts:
        return None
    for prefix in _KNOWN_PREFIXES:
        count = sum(1 for p in prompts if p.lower().startswith(prefix))
        if count / len(prompts) >= _PREFIX_THRESHOLD:
            return prefix
    candidate = prompts[0]
    for length in range(len(candidate), 0, -1):
        sub = candidate[:length]
        count = sum(1 for p in prompts if p.startswith(sub))
        if count / len(prompts) >= _PREFIX_THRESHOLD:
            sub = sub.rstrip()
            if len(sub) >= 3 and sub.endswith((" ", ",", ":")):
                return sub
            break
    return None


def _fix_duplicates(
    term_profiles: dict[str, dict[str, list[str]]],
    cluster_labels: dict[str, str],
    context: str,
) -> dict[str, str]:
    """Group-based dedup: clusters sharing a label are shown together so LLM can differentiate them

    Falls back to the cluster top distinctive term (guaranteed unique by TF-IDF) if LLM fails"""
    ctx = f' from "{context}"' if context else ""

    for pass_i in range(_MAX_DEDUP_PASSES):
        groups = _find_duplicate_groups(cluster_labels)
        if not groups:
            break

        n_dupes = sum(len(v) - 1 for v in groups.values())
        print(
            f"\nRe-annotating {n_dupes} duplicate(s) in {len(groups)} group(s) (pass {pass_i + 1})..."
        )

        for shared_label, cids in groups.items():
            # split large groups into batches so LLM output stays manageable
            for batch_start in range(0, len(cids), _DEDUP_BATCH_SIZE):
                batch = cids[batch_start : batch_start + _DEDUP_BATCH_SIZE]
                _relabel_group(batch, shared_label, term_profiles, cluster_labels, ctx)

    return cluster_labels


def _find_duplicate_groups(cluster_labels: dict[str, str]) -> dict[str, list[str]]:
    """Return {shared_norm_label: [all cids with that label]} for groups of size >= 2"""
    buckets: dict[str, list[str]] = {}
    for cid in sorted(cluster_labels, key=lambda x: int(x)):
        norm = _normalize_label(cluster_labels[cid])
        buckets.setdefault(norm, []).append(cid)
    return {norm: cids for norm, cids in buckets.items() if len(cids) > 1}


def _relabel_group(
    cids: list[str],
    shared_label: str,
    term_profiles: dict[str, dict[str, list[str]]],
    cluster_labels: dict[str, str],
    ctx: str,
) -> None:
    """Ask LLM to give each cluster in the group a distinct label

    Fall back to top distinctive term"""
    from .. import llm_ops  # heavy transformers dependency - only load when annotation runs

    # all labels outside this group, updated live as we assign within the group
    forbidden_norms = {_normalize_label(v) for k, v in cluster_labels.items() if k not in cids}

    # build per-cluster summaries
    group_block = "\n\n".join(
        f"Cluster {cid}:\n"
        f"  Most frequent: {', '.join(term_profiles.get(cid, {}).get('common', []))}\n"
        f"  Most distinctive: {', '.join(term_profiles.get(cid, {}).get('distinctive', []))}"
        for cid in cids
    )

    messages = [
        {
            "role": "system",
            "content": (
                f"You label semantic clusters of image generation prompts{ctx}. "
                f"The following {len(cids)} clusters all share the label '{shared_label}'. "
                "Give each one a DIFFERENT specific 2-5 word label that captures its unique theme. "
                f"Output exactly {len(cids)} lines - one label per line, in the same order, nothing else."
            ),
        },
        {"role": "user", "content": group_block},
    ]
    raw = llm_ops.query(messages, max_new_tokens=len(cids) * 15)
    lines = [
        line.strip().strip('"').strip("'")
        for line in raw.splitlines()
        if line.strip() and not line.strip().lower().startswith("cluster")
    ]

    for i, cid in enumerate(cids):
        old = cluster_labels[cid]
        if i < len(lines) and _normalize_label(lines[i]) not in forbidden_norms:
            new_label = lines[i]
        else:
            # fallback: top distinctive term for this cluster (unique by TF-IDF definition)
            distinctive = term_profiles.get(cid, {}).get("distinctive", [])
            common = term_profiles.get(cid, {}).get("common", [])
            new_label = (distinctive[0] if distinctive else common[0] if common else old).title()

        cluster_labels[cid] = new_label
        forbidden_norms.add(_normalize_label(new_label))
        if new_label != old:
            print(f"  cluster {cid}: '{old}' -> '{new_label}'")


def _normalize_label(label: str) -> str:
    """Lowercase + strip filler words for fuzzy duplicate detection"""
    _FILLERS = {
        "art",
        "style",
        "design",
        "techniques",
        "analysis",
        "trends",
        "and",
        "or",
        "the",
        "a",
    }
    words = [w for w in re.sub(r"[^a-z0-9 ]", "", label.lower()).split() if w not in _FILLERS]
    return " ".join(words)


def _format_profile(profile: dict[str, list[str]]) -> str:
    parts = []
    if profile.get("common"):
        parts.append("Most frequent: " + ", ".join(profile["common"]))
    if profile.get("distinctive"):
        parts.append("Most distinctive: " + ", ".join(profile["distinctive"]))
    if profile.get("bigrams"):
        parts.append("Key phrases: " + ", ".join(profile["bigrams"]))
    return "\n".join(parts)


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
