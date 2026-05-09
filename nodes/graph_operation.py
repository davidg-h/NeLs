"""Queued graph operations for NELS sessions."""

from __future__ import annotations

from typing import Any

from ..core.navigation_ops import (
    build_delta_walk_trajectory,
    build_interpolation_trajectory,
    nearest_neighbor_result,
    trajectory_result_summary,
)
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
        session_id = bundle["session_id"]
        run_id = bundle["run_id"]
        state_revision = bundle["state_revision"]
        store = get_store()

        store.publish_event(
            session_id,
            {
                "event_type": "operation_started",
                "session_id": session_id,
                "run_id": run_id,
                "state_revision": state_revision,
                "node_name": "NELS Graph Operation",
                "message": f"NELS Graph Operation started {operation}",
                "status": "running",
                "payload": request,
            },
        )

        trajectory = None
        try:
            if operation in ("lerp", "slerp"):
                trajectory = build_interpolation_trajectory(
                    embedding_set,
                    selection,
                    method=operation,
                    alpha_schedule=request.get("alpha_schedule", "0,1"),
                    request_id=run_id,
                    state_revision=state_revision,
                )
                result = trajectory_result_summary(trajectory)
            elif operation == "delta_walk":
                trajectory = build_delta_walk_trajectory(
                    embedding_set,
                    selection,
                    alpha_schedule=request.get("alpha_schedule", "0,1"),
                    request_id=run_id,
                    state_revision=state_revision,
                )
                result = trajectory_result_summary(trajectory)
            elif operation in ("nearest_neighbor", "nearest", "neighbors"):
                result = nearest_neighbor_result(
                    embedding_set,
                    selection,
                    neighbor_count=int(request.get("neighbor_count") or 4),
                    request_id=run_id,
                    state_revision=state_revision,
                )
            else:
                result = {
                    "version": 1,
                    "operation": "inspect",
                    "request_id": run_id,
                    "state_revision": state_revision,
                    "selection": selection,
                }
        except Exception as exc:
            store.publish_event(
                session_id,
                {
                    "event_type": "operation_failed",
                    "session_id": session_id,
                    "run_id": run_id,
                    "state_revision": state_revision,
                    "node_name": "NELS Graph Operation",
                    "message": f"NELS Graph Operation failed {operation}: {exc}",
                    "status": "failed",
                    "payload": {
                        "operation": operation,
                        "error": str(exc),
                        "request": request,
                    },
                },
            )
            raise

        if trajectory is not None:
            result_count = len(trajectory.get("points", []))
        elif isinstance(result, dict) and "neighbors" in result:
            result_count = len(result.get("neighbors", []))
        else:
            result_count = len(selection.get("selected_point_ids", []))
        bundle["operation_result"] = result
        bundle["trajectory"] = trajectory
        store.publish_event(
            session_id,
            {
                "event_type": "operation_result",
                "session_id": session_id,
                "run_id": run_id,
                "state_revision": state_revision,
                "node_name": "NELS Graph Operation",
                "message": (
                    f"NELS Graph Operation completed {result.get('operation', operation)} "
                    f"with {result_count} result item(s)"
                ),
                "status": "completed",
                "payload": result,
            },
        )
        return (bundle, trajectory or {}, json_dumps(result))


NODE_CLASS_MAPPINGS = {"nels_GraphOperation": NelsGraphOperation}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_GraphOperation": "NELS Graph Operation"}
