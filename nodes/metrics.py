"""
Queued metrics for NELS graph sessions.
"""

from __future__ import annotations

from typing import Any

from ..core.metrics_ops import compute_metrics, metrics_to_json
from ..core.session_contracts import validate_session_bundle
from ..server.session_store import get_store


class NelsMetrics:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"session_bundle": ("NELS_SESSION_BUNDLE",)}}

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("metrics_json",)
    FUNCTION = "execute"
    CATEGORY = "nels/enhanced"
    OUTPUT_NODE = True

    def execute(self, session_bundle: dict[str, Any]):
        bundle = validate_session_bundle(session_bundle)
        ui_state = bundle.get("ui_state", {})
        mode = str(ui_state.get("metric_mode") or "step_distance")
        trajectory = bundle.get("trajectory")
        if not trajectory and mode != "similarity_matrix":
            mode = "similarity_matrix"
        store = get_store()
        sid = bundle["session_id"]
        run_id = bundle["run_id"]
        rev = bundle["state_revision"]

        def emit(event_type: str, message: str, status: str, payload: Any = None) -> None:
            store.publish_node_event(
                sid, event_type,
                node_name="NELS Metrics",
                message=message, status=status,
                run_id=run_id, state_revision=rev,
                payload=payload or {},
            )

        emit("metrics_started", f"NELS Metrics started {mode}", "running", {"metric_mode": mode})
        try:
            metrics = compute_metrics(
                metric_mode=mode,
                embedding_set=bundle.get("embedding_set"),
                trajectory=trajectory,
                selection=bundle.get("selection"),
            )
        except Exception as exc:
            failed_payload = {"metric_mode": mode, "error": str(exc)}
            emit("metrics_failed", f"NELS Metrics failed {mode}: {exc}", "failed", failed_payload)
            emit("run_failed", "NELS pipeline run failed", "failed", failed_payload)
            raise
        bundle["metrics"] = metrics
        emit("metrics_result", f"NELS Metrics computed {metrics.get('metric_mode', mode)}", "completed", metrics)
        emit("run_completed", "NELS pipeline run completed", "completed", {"metric_mode": mode})
        return (metrics_to_json(metrics),)


NODE_CLASS_MAPPINGS = {"nels_Metrics": NelsMetrics}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_Metrics": "NELS Metrics"}
