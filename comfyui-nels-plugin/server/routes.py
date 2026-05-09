"""HTTP routes used by the NELS graph UI."""

from __future__ import annotations

from typing import Any

try:
    from aiohttp import web
except Exception:  # pragma: no cover
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
        return web.json_response({"ui_state": state, "session": store.get_session(session_id)})

    @routes.post("/nels/api/session/{session_id}/source-preview")
    async def post_source_preview(request):
        from ..nodes.data_source import preview_sample_source

        session_id = request.match_info.get("session_id", "default")
        payload = await _json_body(request)
        current = store.get_session(session_id)
        source = (
            current.get("source_config")
            or ((current.get("source_snapshot") or {}).get("source_config") or {})
        )
        embedding_set, snapshot = preview_sample_source(
            session_id=session_id,
            sample_count=int(payload.get("sample_count", source.get("sample_count", 32))),
            embedding_dim=int(payload.get("embedding_dim", source.get("embedding_dim", 64))),
            seed=int(payload.get("seed", source.get("seed", 42))),
            label_prefix=str(payload.get("label_prefix", source.get("label_prefix", "sample"))),
            metadata_mode=str(payload.get("metadata_mode", source.get("metadata_mode", "clustered"))),
            cluster_count=int(payload.get("cluster_count", source.get("cluster_count", 4))),
            projection_mode=str(payload.get("projection_mode", source.get("projection_mode", "2d_umap"))),
            edge_mode=str(payload.get("edge_mode", source.get("edge_mode", "knn_cosine"))),
            neighbor_count=int(payload.get("neighbor_count", source.get("neighbor_count", 4))),
        )
        store.sync_source_config(
            session_id,
            snapshot["source_config"],
        )
        store.publish_source_snapshot(
            session_id,
            snapshot,
            state_revision=store.get_revision(session_id),
            node_name="NELS Data Source Preview",
            message=(
                "NELS Data Source preview loaded graph data with "
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
