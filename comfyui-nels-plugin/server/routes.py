"""HTTP routes for the NELS graph UI"""

import asyncio
from typing import Any

from aiohttp import web

from server import PromptServer  # ComfyUIs server module

from ..core import llm_ops
from .session_store import get_store


def register_routes() -> None:
    """Attach all route handlers to PromptServer.instance.routes"""
    global _ROUTES_REGISTERED
    if _ROUTES_REGISTERED:
        return

    routes = PromptServer.instance.routes
    store = get_store()

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

    @routes.post("/nels/api/session/{session_id}/ui-state")
    async def post_ui_state(request):
        session_id = request.match_info.get("session_id", "default")
        payload = await _json_body(request)
        state = store.update_ui_state(session_id, payload)
        return web.json_response({"ui_state": state, "session": store.get_session(session_id)})

    @routes.post("/nels/api/session/{session_id}/source-preview")
    async def post_source_preview(request):
        session_id = request.match_info.get("session_id", "default")
        current = store.get_session(session_id)
        source = current.get("source_config") or {}

        loop = asyncio.get_running_loop()

        from ..nodes.node_dataset_loader import (
            preview_dataset_source,  # nodes imports session_store, top-level would be circular
        )

        kwargs = {
            "session_id": session_id,
            "dataset_path": str(source.get("dataset_path", "")),
            "load_mode": str(source.get("load_mode", "first_n")),
            "count": int(source.get("count", 1000)),
            "window_start": int(source.get("window_start", 0)),
            "random_seed": int(source.get("random_seed", 42)),
        }
        embedding_set, snapshot = await loop.run_in_executor(
            None, lambda: preview_dataset_source(**kwargs)
        )
        node_name = "NELS Dataset Loader Preview"

        store.sync_source_config(session_id, snapshot.get("source_config", source))
        store.publish_source_snapshot(
            session_id,
            snapshot,
            state_revision=store.get_revision(session_id),
            node_name=node_name,
            message=(
                f"{node_name} loaded graph data with {len(snapshot.get('points', []))} points"
            ),
        )
        return web.json_response(
            {
                "embedding_meta": embedding_set.get("metadata", {}),
                "graph_snapshot": snapshot,
                "session": store.get_session(session_id),
            }
        )

    @routes.get("/nels/api/llm/status")
    async def get_llm_status(_request):
        return web.json_response(
            {
                "loaded": llm_ops.is_loaded(),
                "model_id": llm_ops.loaded_model_id(),
            }
        )

    @routes.post("/nels/api/llm/unload")
    async def post_llm_unload(_request):
        llm_ops.unload()
        return web.json_response({"ok": True})

    _ROUTES_REGISTERED = True


# -- internals --

_ROUTES_REGISTERED = False


async def _json_body(request) -> dict[str, Any]:
    """Parse request body as JSON dict"""
    try:
        body = await request.json()
    except Exception as exc:
        raise web.HTTPBadRequest(reason="invalid JSON body") from exc
    return body if isinstance(body, dict) else {}
