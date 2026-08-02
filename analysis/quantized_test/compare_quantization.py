"""Compare qwen_3_4b compact embeddings between the full-precision and FP4-quantized encoder.

Encodes the same set of prompts with both checkpoints (one at a time, unloading in between) and reports:
  - per-prompt drift between the two encoders for the same text (cosine similarity, L2 distance)
  - whether relative structure between different prompts is preserved (pairwise similarity
    matrix correlation) - this is what actually matters for UMAP/HDBSCAN downstream, since they
    only depend on relative distances, not absolute embedding values

Run with ComfyUI's embedded Python
"""

import sys
from pathlib import Path

import numpy as np
import torch

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from analysis.paths import COMFYUI_ROOT, setup_plugin_imports  # noqa: E402

setup_plugin_imports(comfyui=True)

from core.encoding_ops import encode_prompts_dataset_embeddings  # noqa: E402

FULL_PRECISION_CLIP = (
    COMFYUI_ROOT / "models" / "text_encoders" / "qwen_3_4b.safetensors"
)
QUANTIZED_CLIP = (
    COMFYUI_ROOT / "models" / "text_encoders" / "qwen_3_4b_fp4_flux2.safetensors"
)
CLIP_TYPE = "FLUX2"

# Same prompts go through both encoders
# one, so we can also check whether relative structure survives
# quantization
TEST_PROMPTS = [
    "a golden retriever running through a park",
    "a red sports car parked on a city street",
    "a bowl of fresh fruit on a wooden table",
    "an astronaut floating in space near a space station",
    "a snow-covered mountain peak at sunrise",
    "a close-up portrait of an elderly fisherman",
    "a stack of pancakes with maple syrup",
    "a futuristic city skyline at night",
]


def _load_clip(path: Path):
    import comfy.sd as sd
    from comfy.sd import CLIPType

    type_map = {
        name.upper(): getattr(CLIPType, name)
        for name in dir(CLIPType)
        if not name.startswith("_")
    }
    clip_type = type_map[CLIP_TYPE.upper()]
    print(f"Loading CLIP: {path}")
    return sd.load_clip(ckpt_paths=[str(path)], clip_type=clip_type)


def _unload_all() -> None:
    import gc

    import comfy.model_management

    comfy.model_management.unload_all_models()
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()


def _encode(path: Path, prompts: list[str]) -> np.ndarray:
    clip = _load_clip(path)
    vectors, meta = encode_prompts_dataset_embeddings(clip, prompts)
    print(f"  embedding_strategy: {meta['embedding_strategy']}, shape: {vectors.shape}")
    del clip
    _unload_all()
    return vectors


def _cosine(a: np.ndarray, b: np.ndarray) -> float:
    a = a / (np.linalg.norm(a) + 1e-8)
    b = b / (np.linalg.norm(b) + 1e-8)
    return float(np.dot(a, b))


def main() -> None:
    print("=== Full precision (qwen_3_4b.safetensors) ===")
    full = _encode(FULL_PRECISION_CLIP, TEST_PROMPTS)

    print("\n=== Quantized (qwen_3_4b_fp4_flux2.safetensors) ===")
    quant = _encode(QUANTIZED_CLIP, TEST_PROMPTS)

    print("\n=== Per-prompt drift (full-precision vs. quantized, same text) ===")
    for i, prompt in enumerate(TEST_PROMPTS):
        sim = _cosine(full[i], quant[i])
        l2 = float(np.linalg.norm(full[i] - quant[i]))
        norm_full = float(np.linalg.norm(full[i]))
        norm_quant = float(np.linalg.norm(quant[i]))
        print(
            f"  [{i}] cos_sim={sim:.5f}  l2_dist={l2:.4f}  "
            f"norm_full={norm_full:.4f}  norm_quant={norm_quant:.4f}  text={prompt[:50]!r}"
        )

    print("\n=== Relative structure check: pairwise cosine similarity matrices ===")
    n = len(TEST_PROMPTS)
    sim_full = np.zeros((n, n))
    sim_quant = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            sim_full[i, j] = _cosine(full[i], full[j])
            sim_quant[i, j] = _cosine(quant[i], quant[j])

    iu = np.triu_indices(n, k=1)
    corr = float(np.corrcoef(sim_full[iu], sim_quant[iu])[0, 1])
    print(
        f"  Pearson correlation between full-precision and quantized pairwise-similarity matrices: {corr:.5f}"
    )
    print("  (close to 1.0 means quantization preserves relative semantic structure)")

    out_path = Path(__file__).parent / "quantization_comparison_results.npz"
    np.savez(
        out_path,
        prompts=np.array(TEST_PROMPTS),
        full=full,
        quant=quant,
        sim_full=sim_full,
        sim_quant=sim_quant,
    )
    print(f"\nSaved raw vectors + similarity matrices to: {out_path}")


if __name__ == "__main__":
    main()
