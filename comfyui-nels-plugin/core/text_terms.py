"""Shared text utilities for NELS operations: tokenization/stopwords + generic LLM-output cleanup

Used by cluster annotation, axis projection, and consistency check
"""

import re

STOP_WORDS = frozenset(
    {
        # English function words
        "a",
        "an",
        "the",
        "of",
        "in",
        "on",
        "at",
        "to",
        "for",
        "with",
        "by",
        "from",
        "and",
        "or",
        "but",
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "it",
        "its",
        "as",
        "no",
        "not",
        "so",
        "if",
        "very",
        "some",
        "two",
        "one",
        "three",
        "four",
        "that",
        "this",
        "these",
        "those",
        "my",
        "your",
        "his",
        "her",
        "our",
        "over",
        "into",
        "out",
        "up",
        "about",
        "than",
        "more",
        "also",
        "there",
        "their",
        # German
        "ein",
        "eine",
        "einer",
        "eines",
        "dem",
        "den",
        "der",
        "die",
        "das",
        "des",
        "und",
        "oder",
        "mit",
        "von",
        "aus",
        "auf",
        "bei",
        "im",
        "zur",
        "zum",
        "sich",
        "ist",
        "sind",
        "hat",
        "haben",
        "wird",
        "werden",
        # Image-generation boilerplate
        "photo",
        "image",
        "picture",
        "rendering",
        "drawing",
        "painting",
        "sketch",
        "photograph",
    }
)


def tokenize_words(text: str) -> list[str]:
    """Lowercase words, dropping stopwords and short tokens"""
    words = re.findall(r"[a-zA-Z]+", text.lower())
    return [w for w in words if w not in STOP_WORDS and len(w) > 2]


def extract_bigrams(text: str) -> list[str]:
    """Extract lowercase adjacent word pairs excluding one-letter tokens and pairs made only of stop words"""
    words = re.findall(r"[a-zA-Z]+", text.lower())
    return [
        f"{words[i]} {words[i + 1]}"
        for i in range(len(words) - 1)
        if (words[i] not in STOP_WORDS or words[i + 1] not in STOP_WORDS)
        and len(words[i]) > 1
        and len(words[i + 1]) > 1
    ]


def first_line(text: str) -> str:
    """First non-blank, quote-stripped line of raw LLM text output"""
    for line in text.splitlines():
        line = line.strip().strip('"').strip("'").strip()
        if line:
            return line
    return text.strip()


def clean_llm_line(line: str) -> str:
    """Strip leading bullet/number markers from one line of raw LLM text output"""
    return line.strip().lstrip("-•·1234567890.) ").strip()
