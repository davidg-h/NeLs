"""Candidate generation for LERP/SLERP prompt-pair selection.

Reproduces the deterministic candidate-generation step of the pair-selection
procedure: for a fixed random seed, draws anchor points from the dataset
and computes, for each anchor, a high-, medium-, and low-similarity candidate partner
(restricted to non-noise prompts of 40-140 characters).
"""

import argparse
import json
from pathlib import Path

import numpy as np


def load_dataset(dataset_dir: Path):
    samples = [
        json.loads(line)
        for line in open(dataset_dir / "samples.jsonl", encoding="utf-8")
    ]
    emb = np.asarray(np.load(dataset_dir / "compact_embeddings.npy"), dtype=np.float32)
    norm = emb / np.linalg.norm(emb, axis=1, keepdims=True)
    return samples, norm


def eligible_candidates(samples, min_len=40, max_len=140):
    return [
        i
        for i, s in enumerate(samples)
        if not s.get("is_noise") and min_len <= len(s["text"]) <= max_len
    ]


def candidate_partners(norm, candidates, anchor, exclude=frozenset()):
    sims = norm[candidates] @ norm[anchor]
    order = np.argsort(-sims)  # descending similarity
    non_self = [
        j for j in order if candidates[j] != anchor and candidates[j] not in exclude
    ]
    high_idx = candidates[
        non_self[2]
    ]  # skip the 2 closest (self, nearest neighbor), take next
    med_order = [j for j in order if candidates[j] not in exclude]
    low_order = med_order
    med_idx = candidates[med_order[len(med_order) // 2]]
    low_idx = candidates[low_order[-1]]
    sims_by_point = {candidates[j]: float(sims[j]) for j in order}
    return {
        "high": (high_idx, sims_by_point[high_idx]),
        "medium": (med_idx, sims_by_point[med_idx]),
        "low": (low_idx, sims_by_point[low_idx]),
    }


def main():
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("dataset_dir", type=Path)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--n-anchors", type=int, default=8)
    args = parser.parse_args()

    samples, norm = load_dataset(args.dataset_dir)
    candidates = eligible_candidates(samples)
    print(f"Dataset: {args.dataset_dir}")
    print(
        f"{len(samples)} total samples, {len(candidates)} eligible candidates "
        f"(non-noise, 40-140 chars), seed={args.seed}\n"
    )

    rng = np.random.default_rng(args.seed)
    anchors = rng.choice(candidates, size=args.n_anchors, replace=False)

    for a in anchors:
        partners = candidate_partners(norm, candidates, int(a))
        print(f"--- anchor {a}: {samples[a]['text'][:80]!r}")
        for tier, (idx, sim) in partners.items():
            print(f"  {tier:6s} sim={sim:.4f}: {samples[idx]['text'][:80]!r}")
        print()


if __name__ == "__main__":
    main()
