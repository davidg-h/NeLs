"""Graph operations for NELS sessions"""

import random
from typing import Any

import numpy as np

from ..core.defaults import DEFAULT_LLM_MODEL
from ..core.encoding_ops import attach_sequence_conditioning
from ..core.operations.axis_projection import (
    build_axis_projection,
    build_axis_trajectory,
)
from ..core.operations.consistency_check import build_consistency_check_result
from ..core.operations.latent_probe import (
    build_latent_probe_recon_trajectory,
    build_text_reconstruction,
    inverse_project,
)
from ..core.operations.nearest_neighbor import nearest_neighbor_result
from ..core.operations.vector_walks import build_delta_walk_trajectory, build_interpolation_trajectory
from ..core.projection_ops import project_trajectory
from ..core.session_contracts import json_dumps, validate_session_bundle
from ..core.tensor_ops import normalize_tensor
from ..core.trajectory_summary import trajectory_result_summary
from ..server.session_store import get_store


class NelsGraphOperation:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "session_bundle": ("NELS_SESSION_BUNDLE",),
                "clip": ("CLIP", {}),
            },
            "optional": {
                "llm_model": (
                    "STRING",
                    {
                        "default": "",
                        "multiline": False,
                        "tooltip": f"HuggingFace model ID for LLM operations (paraphrase, axis labeling). Leave empty to use the default: {DEFAULT_LLM_MODEL}",
                    },
                ),
            },
        }

    RETURN_TYPES = ("NELS_SESSION_BUNDLE", "NELS_TRAJECTORY", "STRING")
    RETURN_NAMES = ("session_bundle", "trajectory", "operation_result_json")
    OUTPUT_NODE = True
    FUNCTION = "execute"
    CATEGORY = "nels/enhanced"

    def execute(self, session_bundle: dict[str, Any], clip: Any, llm_model: str = ""):
        bundle = validate_session_bundle(session_bundle)
        embedding_set = bundle["embedding_set"]
        selection = bundle["selection"]
        request = bundle["operation_request"]
        operation = str(request.get("operation") or "").lower()
        if not operation:
            raise ValueError("operation_request must include an 'operation' field")
        sid = bundle["session_id"]
        run_id = bundle["run_id"]
        rev = bundle["state_revision"]
        store = get_store()

        def emit(event_type: str, message: str, status: str, payload: Any = None) -> None:
            store.publish_node_event(
                sid,
                event_type,
                node_name="NELS Graph Operation",
                message=message,
                status=status,
                run_id=run_id,
                state_revision=rev,
                payload=payload or {},
            )

        emit("operation_started", f"NELS Graph Operation started {operation}", "running", request)

        random_seed = int(embedding_set.get("_source_config", {}).get("random_seed", 42))
        resolved_llm = (llm_model or "").strip() or DEFAULT_LLM_MODEL
        from ..core import llm_ops  # lazy - only loads when an operation actually calls query()

        llm_ops.set_preferred_model(resolved_llm)

        trajectory = None
        try:
            if operation in ("lerp", "slerp"):
                trajectory = build_interpolation_trajectory(
                    embedding_set,
                    selection,
                    method=operation,
                    alpha_schedule=request.get("alpha_schedule", [0, 1]),
                    request_id=run_id,
                    state_revision=rev,
                )
                result = trajectory_result_summary(
                    trajectory,
                    embedding_set if request.get("nearest_sample") else None,
                )
            elif operation == "delta_walk":
                trajectory = build_delta_walk_trajectory(
                    embedding_set,
                    selection,
                    alpha_schedule=request.get("alpha_schedule", [0, 1]),
                    request_id=run_id,
                    state_revision=rev,
                )
                result = trajectory_result_summary(
                    trajectory,
                    embedding_set if request.get("nearest_sample") else None,
                )
            elif operation == "axis_projection":
                compute_labels = bool(request.get("compute_axis_labels", False))
                result = build_axis_projection(
                    embedding_set,
                    axis_group_a=request.get("axis_group_a") or [],
                    axis_group_b=request.get("axis_group_b") or [],
                    request_id=run_id,
                    state_revision=rev,
                    compute_labels=compute_labels,
                )
                trajectory = build_axis_trajectory(
                    result,
                    alpha_schedule=request.get("alpha_schedule") or None,
                    request_id=run_id,
                    state_revision=rev,
                )
                # Strip internal tensor fields before JSON serialization
                result = {k: v for k, v in result.items() if not k.startswith("_")}
            elif operation == "nearest_neighbor":
                result = nearest_neighbor_result(
                    embedding_set,
                    selection,
                    neighbor_count=int(request.get("neighbor_count") or 4),
                    request_id=run_id,
                    state_revision=rev,
                )
            elif operation == "consistency_check":
                seed_ids = selection.get("selected_point_ids", [])
                if not seed_ids:
                    raise ValueError("consistency_check requires exactly 1 selected point")
                seed_id = str(seed_ids[0])
                id_to_point = {str(p["id"]): p for p in embedding_set.get("points", [])}
                seed_pt = id_to_point.get(seed_id)
                seed_prompt = str(seed_pt.get("label") or "") if seed_pt else ""
                if not seed_prompt:
                    raise ValueError(f"Seed point {seed_id!r} has no label")
                if clip is None:
                    raise ValueError(
                        "Semantic Consistency Check requires a CLIP model - "
                        "connect a Load CLIP node to the clip input"
                    )
                dataset_path = str(embedding_set.get("_source_config", {}).get("dataset_path", ""))
                if not dataset_path:
                    raise ValueError(
                        "Semantic Consistency Check requires a loaded dataset with a file path"
                    )
                result, trajectory = build_consistency_check_result(
                    seed_prompt=seed_prompt,
                    seed_point_id=seed_id,
                    variant_count=int(request.get("variant_count") or 5),
                    variation_strength=float(request.get("variation_strength") or 0.3),
                    clip_obj=clip,
                    embedding_set=embedding_set,
                    dataset_path=dataset_path,
                    request_id=run_id,
                    state_revision=rev,
                    random_seed=random_seed,
                )
            elif operation == "latent_probe":
                probe_coords = request.get("probe_coords")
                if not probe_coords:
                    raise ValueError(
                        "Latent Space Probe requires probe_coords - "
                        "enable 'Place probe' in the Operation card and click the canvas first"
                    )
                probe_mode = str(request.get("probe_mode") or "2d")
                probe_text_recon = bool(request.get("probe_text_recon", False))
                probe_seed_count = max(1, int(request.get("probe_seed_count") or 5))
                probe_noise_count = max(0, int(request.get("probe_noise_count") or 5))
                probe_negative_count = max(0, int(request.get("probe_negative_count") or 5))
                probe_recon_max_minutes = max(1, int(request.get("probe_recon_max_minutes") or 5))
                probe_recon_max_iter = max(1, int(request.get("probe_recon_max_iter") or 10))
                dataset_path = str(embedding_set.get("_source_config", {}).get("dataset_path", ""))
                if not dataset_path:
                    raise ValueError(
                        "Latent Space Probe requires a loaded dataset with a file path"
                    )
                hits, estimated = inverse_project(
                    probe_coords,
                    dataset_path,
                    mode=probe_mode,
                    neighbor_count=probe_seed_count,
                    loaded_points=embedding_set.get("points", []),
                )

                # Strip internal _embedding before serialization
                clean_hits = [{k: v for k, v in h.items() if k != "_embedding"} for h in hits]

                result = {
                    "operation": "latent_probe",
                    "request_id": run_id,
                    "state_revision": rev,
                    "inverse_project": clean_hits,
                }
                if probe_text_recon and hits:
                    seed_hits = [h for h in hits if h.get("full_text") or h.get("label")][
                        :probe_seed_count
                    ]
                    seed_texts = [h.get("full_text") or h["label"] for h in seed_hits]
                    seed_context = [
                        {"id": str(h["id"]), "label": (h.get("full_text") or h["label"])[:80]}
                        for h in seed_hits
                    ]

                    # Score all loaded points against estimated for negatives/noise - track (sim, id, label)
                    est_norm = estimated / (np.linalg.norm(estimated) + 1e-8)
                    all_scored: list[tuple[float, str, str]] = []
                    hit_ids = {h["id"] for h in hits}
                    rng = random.Random(random_seed)
                    all_pts = embedding_set.get("points", [])
                    for pt in all_pts:
                        if pt.get("id") in hit_ids:
                            continue
                        tv = pt.get("tensor")
                        if tv is None:
                            continue
                        tv = normalize_tensor(tv).detach().float().cpu().numpy()
                        sim = float(np.dot(tv, est_norm))
                        label = pt.get("metadata", {}).get("text") or pt.get("label", "")
                        if label:
                            all_scored.append((sim, str(pt.get("id", "")), label))

                    all_scored.sort()
                    negative_items = all_scored[:probe_negative_count]
                    noise_pool = (
                        all_scored[probe_negative_count:-probe_negative_count]
                        if len(all_scored) > probe_negative_count * 2
                        else []
                    )
                    noise_items = rng.sample(noise_pool, min(probe_noise_count, len(noise_pool)))
                    negative_texts = [t for _, _, t in negative_items]
                    noise_texts = [t for _, _, t in noise_items]

                    def on_recon_iteration(step: int, best_text: str, cosine_sim: float) -> None:
                        store.publish_node_event(
                            sid,
                            "recon_iteration",
                            node_name="NELS Graph Operation",
                            message=(
                                f"step {step}/{probe_recon_max_iter} - cosine_sim {cosine_sim:.4f} - "
                                f"{best_text[:60]}{'...' if len(best_text) > 60 else ''}"
                            ),
                            status="running",
                            run_id=run_id,
                            state_revision=rev,
                            payload={
                                "step": step,
                                "max_step": probe_recon_max_iter,
                                "best_text": best_text,
                                "cosine_sim": cosine_sim,
                            },
                        )

                    recon = build_text_reconstruction(
                        estimated,
                        seed_texts,
                        clip,
                        noise_texts=noise_texts,
                        negative_texts=negative_texts,
                        n_iter=probe_recon_max_iter,
                        max_minutes=probe_recon_max_minutes,
                        on_iteration=on_recon_iteration,
                    )
                    result["text_reconstruction"] = {
                        "text": recon["text"],
                        "cosine_sim": recon["cosine_sim"],
                        "initial_context": {
                            "seeds": seed_context,
                            "noise": [{"id": i, "label": t[:80]} for _, i, t in noise_items],
                            "negatives": [{"id": i, "label": t[:80]} for _, i, t in negative_items],
                        },
                    }

                    snapshots = recon.get("snapshots", [])
                    if snapshots:
                        trajectory = build_latent_probe_recon_trajectory(
                            snapshots,
                            estimated,
                            request_id=run_id,
                            state_revision=rev,
                        )

            else:
                result = {
                    "operation": "inspect",
                    "request_id": run_id,
                    "state_revision": rev,
                    "selection": selection,
                }
        except Exception as exc:
            emit(
                "operation_failed",
                f"NELS Graph Operation failed {operation}: {exc}",
                "failed",
                {"operation": operation, "error": str(exc), "request": request},
            )
            raise

        # Free GPU memory -> unload LLM after operation completes
        llm_ops.unload()

        if trajectory is not None and clip is not None:
            attach_sequence_conditioning(trajectory, clip)

        if trajectory is not None:
            result_count = len(trajectory.get("points", []))
            # consistency_check builds its own (correctly cv_NNNN-id'd + labeled) trajectory_overlay
            # inside build_consistency_check_result; its `trajectory` here only feeds the separate
            # NELS_TRAJECTORY output socket so skip rebuilding/overwriting the overlay for it
            if operation != "consistency_check":
                dataset_path = embedding_set.get("_source_config", {}).get("dataset_path")
                overlay, overlay_warning = project_trajectory(
                    trajectory.get("points", []),
                    dataset_path,
                )
                result["trajectory_overlay"] = overlay
                if overlay_warning:
                    result["trajectory_overlay_warning"] = overlay_warning
        elif isinstance(result, dict) and "neighbors" in result:
            result_count = len(result.get("neighbors", []))
        else:
            result_count = len(selection.get("selected_point_ids", []))
        emit(
            "operation_result",
            f"NELS Graph Operation completed {result.get('operation', operation)} with {result_count} result item(s)",
            "completed",
            result,
        )
        return (bundle, trajectory or {}, json_dumps(result))


NODE_CLASS_MAPPINGS = {"nels_GraphOperation": NelsGraphOperation}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_GraphOperation": "NELS Graph Operation"}
