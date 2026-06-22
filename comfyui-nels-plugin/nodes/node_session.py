"""Session sync node for queued NELS execution"""

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
        store.sync_source_config(session_id, embedding_set.get("_source_config") or {})
        ui_state = store.get_ui_state(session_id)
        bundle = make_session_bundle(
            embedding_set=embedding_set,
            ui_state=ui_state,
        )
        store.publish_node_event(
            session_id,
            "run_started",
            node_name="NELS Session",
            message=(
                "NELS Session synced UI state revision "
                f"{bundle['state_revision']} for operation "
                f"{bundle['operation_request']['operation']}"
            ),
            status="running",
            run_id=bundle["run_id"],
            state_revision=bundle["state_revision"],
        )
        return (
            bundle,
            json_dumps(bundle["operation_request"]),
            json_dumps(bundle["selection"]),
        )


NODE_CLASS_MAPPINGS = {"nels_Session": NelsSession}
NODE_DISPLAY_NAME_MAPPINGS = {"nels_Session": "NELS Session"}
