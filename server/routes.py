"""HTTP routes used by the NELS graph UI."""

from __future__ import annotations

import asyncio
from typing import Any

try:
    from aiohttp import web
except Exception:
    web = None

from .session_store import get_store


_ROUTES_REGISTERED = False


def register_routes() -> None:
    global _ROUTES_REGISTERED
    if _ROUTES_REGISTERED:
        return
    try:
        from server import PromptServer
    except Exception:
        return
    if web is None:
        return

    routes = PromptServer.instance.routes
    store = get_store()

    @routes.get("/nels/api/sessions")
    async def get_sessions(request):
        return web.json_response({"sessions": store.list_sessions()})

    @routes.post("/nels/api/canvas-sessions/sync")
    async def post_canvas_sessions_sync(request):
        payload = await _json_body(request)
        sessions = payload.get("sessions", [])
        if not isinstance(sessions, list):
            sessions = []
        return web.json_response({"sessions": store.sync_canvas_sessions(sessions)})

    @routes.get("/nels/api/session/{session_id}")
    async def get_session(request):
        session_id = request.match_info.get("session_id", "default")
        return web.json_response(store.get_session(session_id))

    @routes.get("/nels/api/session/{session_id}/events")
    async def get_events(request):
        session_id = request.match_info.get("session_id", "default")
        since = int(request.query.get("since", "0") or 0)
        return web.json_response({"events": store.events_since(session_id, since)})

    @routes.post("/nels/api/session/{session_id}/ui-state")
    async def post_ui_state(request):
        session_id = request.match_info.get("session_id", "default")
        payload = await _json_body(request)
        state = store.update_ui_state(session_id, payload)
        return web.json_response(
            {"ui_state": state, "session": store.get_session(session_id)}
        )

    @routes.post("/nels/api/session/{session_id}/source-preview")
    async def post_source_preview(request):
        session_id = request.match_info.get("session_id", "default")
        payload = await _json_body(request)
        current = store.get_session(session_id)
        source = current.get("source_config") or (
            (current.get("source_snapshot") or {}).get("source_config") or {}
        )

        def on_progress(phase: str) -> None:
            store.publish_event(
                session_id,
                {
                    "event_type": "computing_projection",
                    "node_name": "NELS Preview",
                    "message": phase,
                    "status": "running",
                },
            )

        loop = asyncio.get_running_loop()

        from ..nodes.dataset_loader import preview_dataset_source

        kwargs = {
            "session_id": session_id,
            "dataset_path": str(
                payload.get("dataset_path", source.get("dataset_path", ""))
            ),
            "load_mode": str(
                payload.get("load_mode", source.get("load_mode", "first_n"))
            ),
            "count": int(payload.get("count", source.get("count", 1000))),
            "window_start": int(
                payload.get("window_start", source.get("window_start", 0))
            ),
            "random_seed": int(
                payload.get("random_seed", source.get("random_seed", 42))
            ),
            "edge_mode": str(
                payload.get("edge_mode", source.get("edge_mode", "knn_cosine"))
            ),
            "neighbor_count": int(
                payload.get("neighbor_count", source.get("neighbor_count", 4))
            ),
        }
        embedding_set, snapshot = await loop.run_in_executor(
            None, lambda: preview_dataset_source(**kwargs, on_progress=on_progress)
        )
        node_name = "NELS Dataset Loader Preview"

        store.sync_source_config(session_id, snapshot.get("source_config", source))
        store.publish_source_snapshot(
            session_id,
            snapshot,
            state_revision=store.get_revision(session_id),
            node_name=node_name,
            message=(
                f"{node_name} loaded graph data with "
                f"{len(snapshot.get('points', []))} points"
            ),
        )
        return web.json_response(
            {
                "embedding_meta": embedding_set.get("metadata", {}),
                "graph_snapshot": snapshot,
                "session": store.get_session(session_id),
            }
        )

    @routes.post("/nels/api/session/{session_id}/event")
    async def post_event(request):
        session_id = request.match_info.get("session_id", "default")
        payload = await _json_body(request)
        event = store.publish_event(session_id, payload)
        return web.json_response({"event": event})

    _ROUTES_REGISTERED = True


async def _json_body(request) -> dict[str, Any]:
    try:
        body = await request.json()
    except Exception:
        return {}
    return body if isinstance(body, dict) else {}


__all__ = ["register_routes"]
