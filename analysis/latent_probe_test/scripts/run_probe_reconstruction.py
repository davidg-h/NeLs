"""Latent Probe text-reconstruction test

For a 6-point sample of the held-out points already probed in run_probe_recovery.py (3 with
the highest recovery cosine similarity, 3 with the lowest), runs the real, unmodified
`build_text_reconstruction()` against the same target vector q that Test A already computed
for that point.
Measures how close the reconstructed prompt's own embedding gets to q and to the held-out
point's true original embedding.

Needs ComfyUI's python_embeded.
"""

import json
import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import (
    COMFYUI_ROOT,
    dataset_path,
    results_dir,
    setup_plugin_imports,
    test_root,
)  # noqa: E402

CLIP_PATH = COMFYUI_ROOT / "models" / "text_encoders" / "qwen_3_4b.safetensors"
CLIP_TYPE = "FLUX2"

setup_plugin_imports(comfyui=True)

from core import llm_ops  # noqa: E402
from core.operations.latent_probe import build_text_reconstruction, inverse_project  # noqa: E402

SOURCE_DATASET = dataset_path("imagenet1k_labels_classic")
ROOT = test_root(__file__)
VISIBLE_POOL = ROOT / "visible_pool_dataset"
RESULTS_DIR = results_dir(__file__)

SWEEP_LLM_MODEL = "Qwen/Qwen2.5-3B-Instruct"
SEED_COUNT = 15
NEGATIVE_COUNT = 5
NOISE_COUNT = 5
N_ITER = 10
MAX_MINUTES = 5.0
RANDOM_SEED = 42


def load_jsonl(path: Path) -> list[dict]:
    with path.open(encoding="utf-8") as f:
        return [json.loads(line) for line in f]


def cosine(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8))


def load_clip():
    import comfy.sd as sd
    from comfy.sd import CLIPType

    type_map = {
        name.upper(): getattr(CLIPType, name)
        for name in dir(CLIPType)
        if not name.startswith("_")
    }
    print(f"Loading CLIP: {CLIP_PATH}")
    return sd.load_clip(
        ckpt_paths=[str(CLIP_PATH)], clip_type=type_map[CLIP_TYPE.upper()]
    )


def select_sample() -> list[dict]:
    recovery = json.loads(
        (RESULTS_DIR / "probe_recovery_summary.json").read_text(encoding="utf-8")
    )
    pts = sorted(recovery["per_point"], key=lambda p: p["recovery_cosine_2d"])
    return pts[:3] + pts[-3:]


def main() -> None:
    llm_ops.set_preferred_model(SWEEP_LLM_MODEL)
    clip = load_clip()

    samples = load_jsonl(SOURCE_DATASET / "samples.jsonl")
    id_to_index = {s["id"]: i for i, s in enumerate(samples)}
    umap_2d = np.load(SOURCE_DATASET / "umap_2d.npy")
    compact = np.load(SOURCE_DATASET / "compact_embeddings.npy", mmap_mode="r")
    visible_compact = np.load(VISIBLE_POOL / "compact_embeddings.npy")
    visible_samples = load_jsonl(VISIBLE_POOL / "samples.jsonl")

    rng = random.Random(RANDOM_SEED)
    sample_points = select_sample()
    runs = []

    for sp in sample_points:
        hid = sp["id"]
        idx = id_to_index[hid]
        true_embedding = np.asarray(compact[idx], dtype=np.float32)
        true_text = samples[idx].get("text", "")
        print(
            f"\n=== {hid} (recovery_cosine_2d={sp['recovery_cosine_2d']:.4f}): {true_text}"
        )

        hits, q, cluster_info = inverse_project(
            umap_2d[idx].tolist(),
            str(VISIBLE_POOL),
            mode="2d",
            neighbor_count=SEED_COUNT,
        )
        seed_hits = hits[:SEED_COUNT]
        seed_texts = [h.get("full_text") or h["label"] for h in seed_hits]

        q_norm = q / (np.linalg.norm(q) + 1e-8)
        all_scored = []
        for i in range(len(visible_samples)):
            vec = np.asarray(visible_compact[i], dtype=np.float32)
            sim = cosine(vec, q_norm)
            text = visible_samples[i].get("text", "")
            if text:
                all_scored.append((sim, text))
        all_scored.sort()
        negative_texts = [t for _, t in all_scored[:NEGATIVE_COUNT]]
        noise_pool = (
            all_scored[NEGATIVE_COUNT:-NEGATIVE_COUNT]
            if len(all_scored) > NEGATIVE_COUNT * 2
            else []
        )
        noise_texts = [
            t for _, t in rng.sample(noise_pool, min(NOISE_COUNT, len(noise_pool)))
        ]

        recon = build_text_reconstruction(
            q,
            seed_texts,
            clip,
            noise_texts=noise_texts,
            negative_texts=negative_texts,
            n_iter=N_ITER,
            max_minutes=MAX_MINUTES,
        )

        final_snapshot = recon["snapshots"][-1] if recon["snapshots"] else None
        recon_embedding = (
            final_snapshot["embedding"] if final_snapshot is not None else None
        )
        cosine_to_true = (
            cosine(np.asarray(recon_embedding, dtype=np.float32), true_embedding)
            if recon_embedding is not None
            else None
        )

        history = [
            {
                "step": snap.get("step"),
                "text": snap.get("text"),
                "cosine_sim": snap.get("cosine_sim"),
            }
            for snap in recon["snapshots"]
        ]

        run = {
            "id": hid,
            "true_text": true_text,
            "recovery_cosine_2d": sp["recovery_cosine_2d"],
            "seed_texts": seed_texts,
            "negative_texts": negative_texts,
            "noise_texts": noise_texts,
            "reconstructed_text": recon["text"],
            "cosine_to_q": recon["cosine_sim"],
            "cosine_to_true_original": cosine_to_true,
            "n_snapshots": len(recon["snapshots"]),
            "history": history,
        }
        runs.append(run)
        print(
            f"  reconstructed: {recon['text']!r}\n"
            f"  cosine_to_q={recon['cosine_sim']:.4f}  cosine_to_true_original={cosine_to_true}"
        )

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out_path = RESULTS_DIR / "probe_reconstruction_summary.json"
    out_path.write_text(json.dumps({"runs": runs}, indent=2), encoding="utf-8")
    print(f"\nWrote {out_path}")


if __name__ == "__main__":
    main()
