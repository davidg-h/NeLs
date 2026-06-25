"""In-memory state and event store for NELS graph UI sessions"""

import copy
import re
import threading
from typing import Any

from ..core.session_contracts import (
    default_ui_state,
    normalize_ui_state,
    now_ms,
    source_config_hash,
)


class NelsSessionStore:
    def __init__(self) -> None:
        self._lock = threading.RLock()
        self._sessions: dict[str, dict[str, Any]] = {}
        self._source_cache: dict[str, dict[str, Any]] = {}
        self._sequence = 0

    def get_session(self, session_id: str = "default") -> dict[str, Any]:
        """Return deep-copied session dict (creates if missing)"""
        session_key = str(session_id or "default")
        with self._lock:
            session = self._sessions.get(session_key)
            if session is None:
                session = self._new_session(session_key)
                self._sessions[session_key] = session
            return copy.deepcopy(session)

    def list_sessions(self) -> list[dict[str, Any]]:
        """Return summary list of active Session nodes"""
        with self._lock:
            return [
                {
                    "session_id": session["session_id"],
                    "label": session.get("label") or session["session_id"],
                    "session_node_id": session.get("session_node_id"),
                    "state_revision": session["ui_state"].get("state_revision", 0),
                }
                for session in self._sessions.values()
                if session.get("active_session_node") and session.get("session_node_id") is not None
            ]

    def sync_canvas_sessions(self, sessions: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Register or deactivate Session nodes from the frontend"""
        active_session_node_ids: set[str] = set()
        for session_info in sessions or []:
            session_node_id = session_info.get("session_node_id")
            if session_node_id is None or str(session_node_id).strip() == "":
                continue
            session_node_key = str(session_node_id)
            label = str(session_info.get("session_label") or session_info.get("label") or "default")
            session_id = self.register_session_node(
                label=label,
                session_node_id=session_node_key,
            )
            self.sync_source_config(session_id, session_info.get("source_config") or {})
            active_session_node_ids.add(session_node_key)

        with self._lock:
            for session in self._sessions.values():
                session_node_key = session.get("session_node_id")
                if (
                    session_node_key is not None
                    and str(session_node_key) not in active_session_node_ids
                ):
                    session["active_session_node"] = False

        return self.list_sessions()

    def make_session_id(self, label: str, session_node_id: str | int | None) -> str:
        base = self._slug(label or "default")
        if session_node_id is None or str(session_node_id).strip() == "":
            return base
        return f"{base}__node_{self._slug(str(session_node_id))}"

    def register_session_node(
        self,
        *,
        label: str,
        session_node_id: str | int | None,
    ) -> str:
        """Create or update a session entry for canvas"""
        session_id = self.make_session_id(label, session_node_id)
        with self._lock:
            if session_node_id is not None:
                session_node_key = str(session_node_id)
                for existing in self._sessions.values():
                    if existing.get("session_node_id") == session_node_key:
                        existing["active_session_node"] = False
            session = self._ensure_session(session_id)
            session["label"] = str(label or "default")
            session["session_node_id"] = None if session_node_id is None else str(session_node_id)
            session["active_session_node"] = session_node_id is not None
            session["ui_state"]["session_id"] = session_id
        return session_id

    def sync_source_config(self, session_id: str, config: dict[str, Any]) -> dict[str, Any]:
        """Store the DatasetLoader source config for a session and re-normalize the UI state"""
        session_key = str(session_id or "default")
        with self._lock:
            session = self._ensure_session(session_key)
            session["source_config"] = copy.deepcopy(config or {})
            merged = copy.deepcopy(session["ui_state"])
            merged["session_id"] = session_key
            session["ui_state"] = normalize_ui_state(merged, session_id=session_key)
            return copy.deepcopy(session["ui_state"])

    def get_cached_source(
        self, config: dict[str, Any]
    ) -> tuple[dict[str, Any], dict[str, Any]] | None:
        """Return cached (embedding_set, snapshot) for the given source config"""
        cache_key = source_config_hash(config)
        with self._lock:
            cached = self._source_cache.get(cache_key)
            if cached is None:
                return None
            return (
                copy.deepcopy(cached["embedding_set"]),
                copy.deepcopy(cached["snapshot"]),
            )

    def set_cached_source(
        self,
        config: dict[str, Any],
        embedding_set: dict[str, Any],
        snapshot: dict[str, Any],
    ) -> str:
        """Store (embedding_set, snapshot) in the source cache keyed by config hash"""
        cache_key = source_config_hash(config)
        with self._lock:
            self._source_cache[cache_key] = {
                "embedding_set": copy.deepcopy(embedding_set),
                "snapshot": copy.deepcopy(snapshot),
            }
        return cache_key

    def update_ui_state(self, session_id: str, patch: dict[str, Any]) -> dict[str, Any]:
        """Merge patch into the session's UI state, increment revision, and broadcast update event"""
        session_key = str(session_id or "default")
        with self._lock:
            session = self._ensure_session(session_key)
            merged = copy.deepcopy(session["ui_state"])
            merged.update(patch or {})
            merged["session_id"] = session_key
            session["ui_state"] = normalize_ui_state(
                merged,
                session_id=session_key,
                increment_revision=True,
            )
            stored = self._append_event_locked(
                session,
                {
                    "event_type": "ui_state_updated",
                    "session_id": session_key,
                    "state_revision": session["ui_state"]["state_revision"],
                    "node_name": "NELS Graph Panel",
                    "message": (
                        "NELS Graph Panel updated session state to revision "
                        f"{session['ui_state']['state_revision']}"
                    ),
                    "status": "completed",
                    "payload": session["ui_state"],
                },
            )
        self._broadcast(stored)
        return copy.deepcopy(self.get_session(session_key)["ui_state"])

    def get_ui_state(self, session_id: str) -> dict[str, Any]:
        return self.get_session(session_id)["ui_state"]

    def get_revision(self, session_id: str) -> int:
        return int(self.get_ui_state(session_id).get("state_revision") or 0)

    def publish_event(self, session_id: str, event: dict[str, Any]) -> dict[str, Any]:
        """Store event in the session's event list and broadcast it to clients"""
        session_key = str(session_id or "default")
        with self._lock:
            session = self._ensure_session(session_key)
            stored = self._append_event_locked(session, event)
            event_type = stored.get("event_type")
            payload = stored.get("payload")
            if event_type == "source_snapshot":
                session["graph_snapshot"] = copy.deepcopy(payload)
            elif event_type == "operation_result":
                session["operation_result"] = copy.deepcopy(payload)
        self._broadcast(stored)
        return stored

    def publish_node_event(
        self,
        session_id: str,
        event_type: str,
        *,
        node_name: str,
        message: str,
        status: str,
        run_id: str | None = None,
        state_revision: int | None = None,
        payload: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Wrapper for node events"""
        return self.publish_event(
            session_id,
            {
                "event_type": event_type,
                "session_id": session_id,
                "run_id": run_id,
                "state_revision": state_revision,
                "node_name": node_name,
                "message": message,
                "status": status,
                "payload": payload or {},
            },
        )

    def publish_source_snapshot(
        self,
        session_id: str,
        snapshot: dict[str, Any],
        *,
        run_id: str | None = None,
        state_revision: int | None = None,
        node_name: str,
        message: str | None = None,
    ) -> dict[str, Any]:
        """Wrapper for source/graph snapshot events"""
        point_count = len((snapshot or {}).get("points", []))
        return self.publish_event(
            session_id,
            {
                "event_type": "source_snapshot",
                "session_id": session_id,
                "run_id": run_id,
                "state_revision": state_revision,
                "node_name": node_name,
                "message": message or f"{node_name} sent graph data with {point_count} points",
                "status": "completed",
                "payload": snapshot,
            },
        )

    def _ensure_session(self, session_id: str) -> dict[str, Any]:
        if session_id not in self._sessions:
            self._sessions[session_id] = self._new_session(session_id)
        return self._sessions[session_id]

    def _append_event_locked(
        self,
        session: dict[str, Any],
        event: dict[str, Any],
    ) -> dict[str, Any]:
        """Append event to the session's event list with sequence and timestamp (call with lock held)"""
        self._sequence += 1
        stored = copy.deepcopy(event or {})
        stored.setdefault("event_type", "event")
        stored.setdefault("session_id", session["session_id"])
        stored.setdefault("status", "completed")
        stored["sequence"] = self._sequence
        stored["timestamp"] = now_ms()
        if stored.get("state_revision") is None:
            stored["state_revision"] = session["ui_state"].get("state_revision", 0)
        events = session.setdefault("events", [])
        events.append(stored)
        if len(events) > 400:
            del events[:-400]
        return copy.deepcopy(stored)

    def _broadcast(self, event: dict[str, Any]) -> None:
        """Push event to WebSocket clients"""
        try:
            from server import PromptServer

            PromptServer.instance.send_sync("nels.session_event", event)
        except Exception as exc:
            print(
                "[nels] session event broadcast failed "
                f"(session={event.get('session_id')!r}, event_type={event.get('event_type')!r}): {exc}"
            )

    @staticmethod
    def _slug(value: str) -> str:
        """Normalize a string to a slug suitable for use as a session ID"""
        slug = re.sub(r"[^a-zA-Z0-9_.-]+", "_", str(value).strip())
        slug = slug.strip("_")
        return slug or "default"

    @staticmethod
    def _new_session(session_id: str) -> dict[str, Any]:
        """Build the default session dict shape"""
        return {
            "session_id": session_id,
            "ui_state": default_ui_state(session_id),
            "graph_snapshot": None,
            "operation_result": None,
            "events": [],
        }


_STORE = NelsSessionStore()


def get_store() -> NelsSessionStore:
    """Return the global NelsSessionStore singleton"""
    return _STORE
