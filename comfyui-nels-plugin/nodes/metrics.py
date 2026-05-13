"""Queued metrics for NELS graph sessions."""

from __future__ import annotations

from typing import Any

from ..core.metrics_ops import compute_metrics, metrics_to_json
from ..core.session_contracts import validate_session_bundle
from ..server.session_store import get_store


class NelsMetrics:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"session_bundle": ("NELS_SESSION_BUNDLE",)}}

    RETURN_TYPES = ("NELS_SESSION_BUNDLE", "NELS_METRICS", "STRING")
    RETURN_NAMES = ("session_bundle", "metrics", "metrics_json")
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

        store.publish_node_event(
            sid, "metrics_started",
            node_name="NELS Metrics",
            message=f"NELS Metrics started {mode}",
            status="running",
            run_id=run_id, state_revision=rev,
            payload={"metric_mode": mode},
        )
        try:
            metrics = compute_metrics(
                metric_mode=mode,
                embedding_set=bundle.get("embedding_set"),
                trajectory=trajectory,
                selection=bundle.get("selection"),
            )
        except Exception as exc:
            failed_payload = {"metric_mode": mode, "error": str(exc)}
            store.publish_node_event(
                sid, "metrics_failed",
                node_name="NELS Metrics",
                message=f"NELS Metrics failed {mode}: {exc}",
                status="failed",
                run_id=run_id, state_revision=rev,
                payload=failed_payload,
            )
            store.publish_node_event(
                sid, "run_failed",
                node_name="NELS Metrics",
                message="NELS pipeline run failed",
                status="failed",
                run_id=run_id, state_revision=rev,
                payload=failed_payload,
            )
            raise
        bundle["metrics"] = metrics
        store.publish_node_event(
            sid, "metrics_result",
            node_name="NELS Metrics",
            message=f"NELS Metrics computed {metrics.get('metric_mode', mode)}",
            status="completed",
            run_id=run_id, state_revision=rev,
            payload=metrics,
        )
        store.publish_node_event(
            sid, "run_completed",
            node_name="NELS Metrics",
            message="NELS pipeline run completed",
            status="completed",
            run_id=run_id, state_revision=rev,
            payload={"metric_mode": mode},
        )
        return (bundle, metrics, metrics_to_json(metrics))


NODE_CLASS_MAPPINGS = {"nels_Metrics": NelsMetrics}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_Metrics": "NELS Metrics"}
