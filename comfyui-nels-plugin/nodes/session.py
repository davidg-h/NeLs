"""Session sync node for queued NELS execution."""

from __future__ import annotations

from ..core.session_contracts import json_dumps, make_session_bundle
from ..server.session_store import get_store


class NelsSession:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "embedding_set": ("NELS_EMBEDDING_SET",),
                "session_label": ("STRING", {"default": "default"}),
            },
            "hidden": {"unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("NELS_SESSION_BUNDLE", "STRING", "STRING")
    RETURN_NAMES = ("session_bundle", "run_config_json", "selection_json")
    FUNCTION = "execute"
    CATEGORY = "nels/enhanced"

    @classmethod
    def IS_CHANGED(cls, embedding_set, session_label, unique_id=None):
        session_id = get_store().make_session_id(session_label, unique_id)
        return get_store().get_revision(session_id)

    def execute(self, embedding_set, session_label: str, unique_id=None):
        store = get_store()
        session_id = store.register_session_node(
            label=session_label,
            session_node_id=unique_id,
        )
        injected_config = embedding_set.get("_source_config")
        if injected_config:
            # Dataset loader (or any future source) injects its full config directly.
            store.sync_source_config(session_id, injected_config)
        else:
            # Legacy sample-source path.
            source_meta = embedding_set.get("metadata", {})
            store.sync_source_config(
                session_id,
                {
                    key: value
                    for key, value in {
                        "sample_count": source_meta.get("sample_count"),
                        "embedding_dim": source_meta.get("embedding_dim"),
                        "seed": source_meta.get("seed"),
                        "label_prefix": source_meta.get("label_prefix"),
                        "metadata_mode": source_meta.get("metadata_mode"),
                        "cluster_count": source_meta.get("cluster_count"),
                        "projection_mode": source_meta.get("projection_mode"),
                        "edge_mode": source_meta.get("edge_mode"),
                        "neighbor_count": source_meta.get("neighbor_count"),
                        "source_config_hash": source_meta.get("source_config_hash"),
                    }.items()
                    if value is not None
                },
            )
        ui_state = store.get_ui_state(session_id)
        snapshot = store.get_session(session_id).get("graph_snapshot") or {}
        bundle = make_session_bundle(
            embedding_set=embedding_set,
            ui_state=ui_state,
            graph_snapshot=snapshot,
        )
        store.publish_event(
            session_id,
            {
                "event_type": "run_started",
                "session_id": session_id,
                "run_id": bundle["run_id"],
                "state_revision": bundle["state_revision"],
                "node_name": "NELS Session",
                "message": (
                    "NELS Session synced UI state revision "
                    f"{bundle['state_revision']} for operation "
                    f"{bundle['operation_request']['operation']}"
                ),
                "status": "running",
                "payload": {
                    "operation_request": bundle["operation_request"],
                    "selection": bundle["selection"],
                },
            },
        )
        return (
            bundle,
            json_dumps(bundle["operation_request"]),
            json_dumps(bundle["selection"]),
        )


NODE_CLASS_MAPPINGS = {"nels_Session": NelsSession}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_Session": "NELS Session"}
