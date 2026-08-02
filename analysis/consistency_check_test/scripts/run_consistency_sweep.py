"""Consistency Check strength sweep

Calls build_consistency_check_result (core/operations/consistency_check.py) directly, the
same function the plugin uses live, across a range of variation_strength values for three
seed prompts of different length. CLIP is loaded standalone, and both the consistency score
and cluster prediction are text/embedding-only, no image generation.

Word-dropout variants (strength < 0.35) are exactly reproducible via random_seed. LLM
paraphrase variants (strength >= 0.35) are not: each run calls a local LLM pipeline
(core/llm_ops.py) with no fixed generation seed, so re-running this script will produce
different literal paraphrases and somewhat different scores above the 0.35 boundary.

Must run via ComfyUI's own python_embeded (needs comfy.sd for CLIP loading, umap/hdbscan/
faiss for cluster prediction, transformers for LLM paraphrasing)
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from analysis.paths import COMFYUI_ROOT, dataset_path, results_dir, setup_plugin_imports  # noqa: E402

CLIP_PATH = COMFYUI_ROOT / "models" / "text_encoders" / "qwen_3_4b.safetensors"
CLIP_TYPE = "FLUX2"

setup_plugin_imports(comfyui=True)

from core import llm_ops  # noqa: E402
from core.dataset_ops import predict_cluster_for_new  # noqa: E402
from core.encoding_ops import encode_prompts_real_conditioning  # noqa: E402
from core.operations.consistency_check import build_consistency_check_result  # noqa: E402

RESULTS_DIR = results_dir(__file__)

STRENGTHS = [0.05, 0.2, 0.3, 0.35, 0.5, 0.7, 0.9]
VARIANT_COUNT = 5
LLM_STRENGTH_THRESHOLD = 0.35
SWEEP_LLM_MODEL = "Qwen/Qwen2.5-3B-Instruct"

SEEDS = [
    {
        "label": "short",
        "seed_point_id": "pt_000001",
        "seed_prompt": "a photo of goldfish, Carassius auratus",
        "dataset_path": str(dataset_path("imagenet1k_labels_classic")),
    },
    {
        "label": "medium",
        "seed_point_id": "pt_000092",
        "seed_prompt": (
            "dwayne johnson holding a purple lightsaber wearing brown jedi robes, "
            "concept art, ultra realistic"
        ),
        "dataset_path": str(dataset_path("gustavosta_sd_prompts_v2_two_pass")),
    },
    {
        "label": "long",
        "seed_point_id": "pt_000043",
        "seed_prompt": (
            "portrait of a woman by greg rutkowski, a jedi commander, mara jade, wearing the "
            "tactical gear of the galactic alliance, star wars expanded universe, she is about "
            "4 0 years old, highly detailed portrait, digital painting, artstation, concept "
            "art, smooth, sharp foccus ilustration, artstation hq"
        ),
        "dataset_path": str(dataset_path("gustavosta_sd_prompts_v2_two_pass")),
    },
]


def load_clip():
    import comfy.sd as sd
    from comfy.sd import CLIPType

    type_map = {
        name.upper(): getattr(CLIPType, name)
        for name in dir(CLIPType)
        if not name.startswith("_")
    }
    clip_type = type_map[CLIP_TYPE.upper()]
    print(f"Loading CLIP: {CLIP_PATH}")
    return sd.load_clip(ckpt_paths=[str(CLIP_PATH)], clip_type=clip_type)


def main() -> None:
    llm_ops.set_preferred_model(SWEEP_LLM_MODEL)
    clip = load_clip()
    runs = []

    for seed in SEEDS:
        print(
            f"\n=== seed: {seed['label']} ({len(seed['seed_prompt'].split())} words) ==="
        )
        seed_encoded = encode_prompts_real_conditioning(clip, [seed["seed_prompt"]])
        seed_vec = (
            seed_encoded[0]["embedding"].detach().float().cpu().numpy().reshape(1, -1)
        )
        seed_cluster_result = predict_cluster_for_new(
            Path(seed["dataset_path"]), seed_vec
        )[0]
        seed_cluster_id = (
            None
            if seed_cluster_result.get("is_noise")
            else seed_cluster_result.get("cluster_global")
        )
        print(f"  seed cluster: {seed_cluster_id}")

        for strength in STRENGTHS:
            result, _trajectory = build_consistency_check_result(
                seed_prompt=seed["seed_prompt"],
                seed_point_id=seed["seed_point_id"],
                variant_count=VARIANT_COUNT,
                variation_strength=strength,
                clip_obj=clip,
                dataset_path=seed["dataset_path"],
                request_id=f"{seed['label']}_{strength}",
                state_revision=0,
            )
            variants = result["consistency_variants"]
            n_same = sum(
                1
                for v in variants
                if seed_cluster_id is not None and v["cluster_id"] == seed_cluster_id
            )
            cluster_stability = n_same / len(variants)

            run = {
                "seed_label": seed["label"],
                "seed_point_id": seed["seed_point_id"],
                "seed_word_count": len(seed["seed_prompt"].split()),
                "strength": strength,
                "generation_strategy": (
                    "word_dropout"
                    if strength < LLM_STRENGTH_THRESHOLD
                    else "llm_paraphrase"
                ),
                "consistency_score": result["consistency_score"],
                "mean_intra": result["mean_intra"],
                "mean_inter": result["mean_inter"],
                "seed_cluster_id": seed_cluster_id,
                "cluster_stability": cluster_stability,
                "variants": [
                    {
                        "text": v["text"],
                        "cosine_sim": v["cosine_sim"],
                        "cluster_id": v["cluster_id"],
                    }
                    for v in variants
                ],
            }
            runs.append(run)
            print(
                f"  strength={strength:.2f} [{run['generation_strategy']}]  "
                f"SC={run['consistency_score']:.4f}  mean_intra={run['mean_intra']:.4f}  "
                f"mean_inter={run['mean_inter']:.4f}  cluster_stability={cluster_stability:.2f}"
            )

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out_path = RESULTS_DIR / "consistency_sweep_summary.json"
    out_path.write_text(
        json.dumps(
            {
                "seeds": [{k: v for k, v in s.items()} for s in SEEDS],
                "strengths": STRENGTHS,
                "variant_count": VARIANT_COUNT,
                "llm_strength_threshold": LLM_STRENGTH_THRESHOLD,
                "llm_model_used": SWEEP_LLM_MODEL,
                "runs": runs,
            },
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"\nWrote {out_path}")


if __name__ == "__main__":
    main()
