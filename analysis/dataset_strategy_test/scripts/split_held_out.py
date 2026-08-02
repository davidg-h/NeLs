"""800/200 split of the ImageNet-1k label set for the held-out projection-accuracy test.

Decides prompt assignment only. Reads the 1000 labels from
data/imagenet1k_labels.txt (produced by prepare_imagenet_labels.py) as the starting
point and splits them deterministically

original_id is resolved by matching prompt text directly against the ground-truth
dataset's samples.jsonl (text -> id lookup).
"""

import json
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import dataset_path  # noqa: E402

GROUND_TRUTH_SAMPLES = dataset_path("imagenet1k_labels_classic") / "samples.jsonl"

ARTIFACTS_DIR = Path(__file__).resolve().parent.parent / "artifacts"
DATA_DIR = ARTIFACTS_DIR / "data"
SOURCE_LABELS = DATA_DIR / "imagenet1k_labels.txt"

TRAIN_FILE = DATA_DIR / "imagenet1k_800_train.txt"
HELDOUT_FILE = DATA_DIR / "imagenet1k_200_heldout.txt"
SPLIT_MANIFEST = DATA_DIR / "imagenet1k_split_manifest.jsonl"

HELDOUT_COUNT = 200
SPLIT_SEED = 42


def _resolve_ids_by_text(texts: list[str]) -> list[str]:
    """Look up each text's original_id in the ground-truth dataset -> fails loudly on any
    text that can't be resolved uniquely"""
    with GROUND_TRUTH_SAMPLES.open(encoding="utf-8") as f:
        gt_samples = [json.loads(line) for line in f]

    text_to_id: dict[str, str] = {}
    for sample in gt_samples:
        if sample["text"] in text_to_id:
            raise ValueError(
                f"Duplicate text in ground-truth dataset: {sample['text']!r}"
            )
        text_to_id[sample["text"]] = sample["id"]

    missing = [t for t in texts if t not in text_to_id]
    if missing:
        raise ValueError(
            f"{len(missing)} text(s) from {SOURCE_LABELS} not found in {GROUND_TRUTH_SAMPLES}: "
            f"{missing[:5]}{'...' if len(missing) > 5 else ''}"
        )

    return [text_to_id[t] for t in texts]


def make_split(force: bool = False) -> None:
    """Write the 800-train / 200-heldout split files, unless they already exist"""
    if (
        not force
        and TRAIN_FILE.exists()
        and HELDOUT_FILE.exists()
        and SPLIT_MANIFEST.exists()
    ):
        print(f"Split already exists, skipping: {DATA_DIR}")
        return

    if not SOURCE_LABELS.exists():
        raise FileNotFoundError(
            f"{SOURCE_LABELS} not found - run prepare_imagenet_labels.py first"
        )

    with SOURCE_LABELS.open(encoding="utf-8") as f:
        texts = [line.rstrip("\n") for line in f]

    total = len(texts)
    ids = _resolve_ids_by_text(texts)

    rng = random.Random(SPLIT_SEED)
    heldout_indices = set(rng.sample(range(total), HELDOUT_COUNT))
    train_indices = [i for i in range(total) if i not in heldout_indices]

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    with TRAIN_FILE.open("w", encoding="utf-8") as f:
        for idx in train_indices:
            f.write(texts[idx] + "\n")

    with HELDOUT_FILE.open("w", encoding="utf-8") as f:
        for idx in sorted(heldout_indices):
            f.write(texts[idx] + "\n")

    with SPLIT_MANIFEST.open("w", encoding="utf-8") as f:
        for new_index, idx in enumerate(train_indices):
            row = {
                "original_id": ids[idx],
                "text": texts[idx],
                "split": "train",
                "train_index": new_index,
            }
            f.write(json.dumps(row) + "\n")
        for idx in sorted(heldout_indices):
            row = {
                "original_id": ids[idx],
                "text": texts[idx],
                "split": "heldout",
                "train_index": None,
            }
            f.write(json.dumps(row) + "\n")

    print(f"Wrote {len(train_indices)} training prompts to {TRAIN_FILE}")
    print(f"Wrote {len(heldout_indices)} held-out prompts to {HELDOUT_FILE}")
    print(f"Wrote {total} split-manifest rows to {SPLIT_MANIFEST}")


if __name__ == "__main__":
    make_split()
