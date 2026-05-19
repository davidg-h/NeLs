"""
Queued graph operations for NELS sessions.
"""

from __future__ import annotations

from typing import Any

from ..core.navigation_ops import (
    build_delta_walk_trajectory,
    build_interpolation_trajectory,
    compute_trajectory_metrics,
    nearest_neighbor_result,
    trajectory_result_summary,
)
from ..core.projection_ops import project_trajectory
from ..core.session_contracts import json_dumps, validate_session_bundle
from ..server.session_store import get_store


class NelsGraphOperation:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"session_bundle": ("NELS_SESSION_BUNDLE",)}}

    RETURN_TYPES = ("NELS_SESSION_BUNDLE", "NELS_TRAJECTORY", "STRING")
    RETURN_NAMES = ("session_bundle", "trajectory", "operation_result_json")
    FUNCTION = "execute"
    CATEGORY = "nels/enhanced"

    def execute(self, session_bundle: dict[str, Any]):
        bundle = validate_session_bundle(session_bundle)
        embedding_set = bundle["embedding_set"]
        selection = bundle["selection"]
        request = bundle["operation_request"]
        operation = str(request.get("operation") or "inspect").lower()
        sid = bundle["session_id"]
        run_id = bundle["run_id"]
        rev = bundle["state_revision"]
        store = get_store()

        def emit(event_type: str, message: str, status: str, payload: Any = None) -> None:
            store.publish_node_event(
                sid, event_type,
                node_name="NELS Graph Operation",
                message=message, status=status,
                run_id=run_id, state_revision=rev,
                payload=payload or {},
            )

        emit("operation_started", f"NELS Graph Operation started {operation}", "running", request)

        trajectory = None
        try:
            if operation in ("lerp", "slerp"):
                trajectory = build_interpolation_trajectory(
                    embedding_set,
                    selection,
                    method=operation,
                    alpha_schedule=request.get("alpha_schedule", "0,1"),
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
                    alpha_schedule=request.get("alpha_schedule", "0,1"),
                    request_id=run_id,
                    state_revision=rev,
                )
                result = trajectory_result_summary(
                    trajectory,
                    embedding_set if request.get("nearest_sample") else None,
                )
            elif operation in ("nearest_neighbor", "nearest", "neighbors"):
                result = nearest_neighbor_result(
                    embedding_set,
                    selection,
                    neighbor_count=int(request.get("neighbor_count") or 4),
                    request_id=run_id,
                    state_revision=rev,
                )
            else:
                result = {
                    "version": 1,
                    "operation": "inspect",
                    "request_id": run_id,
                    "state_revision": rev,
                    "selection": selection,
                }
        except Exception as exc:
            emit("operation_failed", f"NELS Graph Operation failed {operation}: {exc}", "failed",
                 {"operation": operation, "error": str(exc), "request": request})
            raise

        metric_mode = str(request.get("metric_mode") or "step_distance")

        if trajectory is not None:
            result_count = len(trajectory.get("points", []))
            dataset_path = embedding_set.get("_source_config", {}).get("dataset_path")
            overlay, overlay_warning = project_trajectory(
                trajectory.get("points", []), dataset_path,
            )
            result["trajectory_overlay"] = overlay
            if overlay_warning:
                result["trajectory_overlay_warning"] = overlay_warning
            metric_values = compute_trajectory_metrics(trajectory.get("points", []), metric_mode)
            for step, mv in zip(result.get("trajectory", []), metric_values):
                step["metric_value"] = mv
            metrics_payload: dict[str, Any] = {"metric_mode": metric_mode, "status": "computed"}
            bundle["metrics"] = metrics_payload
            emit("metrics_result", f"Metrics computed: {metric_mode}", "completed", metrics_payload)
        elif isinstance(result, dict) and "neighbors" in result:
            result_count = len(result.get("neighbors", []))
        else:
            result_count = len(selection.get("selected_point_ids", []))
        bundle["operation_result"] = result
        bundle["trajectory"] = trajectory
        emit("operation_result",
             f"NELS Graph Operation completed {result.get('operation', operation)} with {result_count} result item(s)",
             "completed", result)
        return (bundle, trajectory or {}, json_dumps(result))


NODE_CLASS_MAPPINGS = {"nels_GraphOperation": NelsGraphOperation}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_GraphOperation": "NELS Graph Operation"}
