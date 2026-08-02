from pathlib import Path
from datasets import load_dataset

out_path = Path(__file__).resolve().parent.parent / "artifacts" / "data" / "imagenet1k_labels.txt"
out_path.parent.mkdir(parents=True, exist_ok=True)

ds = load_dataset("ILSVRC/imagenet-1k", split="train", streaming=True)

label_feature = ds.features["label"]
names = label_feature.names

with out_path.open("w", encoding="utf-8") as f:
    for name in names:
        # ImageNet labels are often like:
        # "plane, carpenter's plane, woodworking plane"
        # Keep synonyms because they add useful semantic context.
        clean = name.replace("_", " ")
        f.write(f"a photo of {clean}\n")

print(f"Wrote {len(names)} labels to {out_path}")
