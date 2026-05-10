"""Session bundle contracts shared by NELS nodes and routes."""

from __future__ import annotations

import copy
import json
import time
import uuid
from typing import Any

from .embedding_ops import embedding_set_snapshot, validate_embedding_set


SESSION_BUNDLE_TYPE = "NELS_SESSION_BUNDLE"
SESSION_BUNDLE_VERSION = 1

DEFAULT_UI_STATE: dict[str, Any] = {
    "session_id": "default",
    "state_revision": 0,
    "selected_point_ids": [],
    "operation": "inspect",
    "alpha_schedule": "0,0.25,0.5,0.75,1",
    "neighbor_count": 4,
    "projection_mode": "2d_umap",
    "edge_mode": "knn_cosine",
    "metric_mode": "step_distance",
    "viewport": {"x": 0.0, "y": 0.0, "ratio": 1.0},
}


def now_ms() -> int:
    return int(time.time() * 1000)


def new_run_id(prefix: str = "run") -> str:
    return f"{prefix}_{now_ms()}_{uuid.uuid4().hex[:8]}"


def default_ui_state(session_id: str = "default") -> dict[str, Any]:
    state = copy.deepcopy(DEFAULT_UI_STATE)
    state["session_id"] = str(session_id or "default")
    return state


def normalize_ui_state(
    state: dict[str, Any] | None,
    *,
    session_id: str = "default",
    increment_revision: bool = False,
) -> dict[str, Any]:
    normalized = default_ui_state(session_id)
    if isinstance(state, dict):
        normalized.update(copy.deepcopy(state))

    normalized["session_id"] = str(normalized.get("session_id") or session_id or "default")
    selected = normalized.get("selected_point_ids", [])
    if isinstance(selected, str):
        selected = [selected]
    normalized["selected_point_ids"] = [str(item) for item in selected if str(item)]
    normalized["operation"] = str(normalized.get("operation") or "inspect")
    normalized["alpha_schedule"] = str(
        normalized.get("alpha_schedule") or "0,0.25,0.5,0.75,1"
    )
    normalized["neighbor_count"] = max(1, int(normalized.get("neighbor_count") or 4))
    normalized["projection_mode"] = str(normalized.get("projection_mode") or "2d_umap")
    normalized["edge_mode"] = str(normalized.get("edge_mode") or "knn_cosine")
    normalized["metric_mode"] = str(normalized.get("metric_mode") or "step_distance")
    try:
        revision = int(normalized.get("state_revision") or 0)
    except (TypeError, ValueError):
        revision = 0
    normalized["state_revision"] = revision + 1 if increment_revision else revision
    if not isinstance(normalized.get("viewport"), dict):
        normalized["viewport"] = {"x": 0.0, "y": 0.0, "ratio": 1.0}
    return normalized


def make_operation_request(ui_state: dict[str, Any], *, run_id: str) -> dict[str, Any]:
    return {
        "version": 1,
        "session_id": ui_state["session_id"],
        "run_id": run_id,
        "state_revision": int(ui_state.get("state_revision") or 0),
        "operation": str(ui_state.get("operation") or "inspect"),
        "selected_point_ids": list(ui_state.get("selected_point_ids") or []),
        "alpha_schedule": str(ui_state.get("alpha_schedule") or "0,0.25,0.5,0.75,1"),
        "neighbor_count": int(ui_state.get("neighbor_count") or 4),
    }


def make_selection(
    embedding_set: dict[str, Any],
    ui_state: dict[str, Any],
    *,
    run_id: str,
) -> dict[str, Any]:
    validate_embedding_set(embedding_set)
    existing = {point["id"] for point in embedding_set.get("points", [])}
    selected_ids = [
        point_id for point_id in ui_state.get("selected_point_ids", []) if point_id in existing
    ]
    return {
        "version": 1,
        "session_id": ui_state["session_id"],
        "run_id": run_id,
        "state_revision": int(ui_state.get("state_revision") or 0),
        "selected_point_ids": selected_ids,
    }


def make_session_bundle(
    *,
    embedding_set: dict[str, Any],
    ui_state: dict[str, Any],
    run_id: str | None = None,
    graph_snapshot: dict[str, Any] | None = None,
) -> dict[str, Any]:
    validate_embedding_set(embedding_set)
    actual_run_id = run_id or new_run_id()
    selection = make_selection(embedding_set, ui_state, run_id=actual_run_id)
    operation_request = make_operation_request(ui_state, run_id=actual_run_id)
    return {
        "version": SESSION_BUNDLE_VERSION,
        "type": SESSION_BUNDLE_TYPE,
        "session_id": ui_state["session_id"],
        "run_id": actual_run_id,
        "state_revision": int(ui_state.get("state_revision") or 0),
        "embedding_set": embedding_set,
        "embedding_snapshot": embedding_set_snapshot(embedding_set),
        "ui_state": copy.deepcopy(ui_state),
        "selection": selection,
        "operation_request": operation_request,
        "graph_snapshot": copy.deepcopy(graph_snapshot or {}),
        "operation_result": None,
        "trajectory": None,
        "metrics": None,
    }


def validate_session_bundle(bundle: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(bundle, dict):
        raise ValueError("NELS_SESSION_BUNDLE must be a dict")
    if bundle.get("type") != SESSION_BUNDLE_TYPE:
        raise ValueError("Invalid NELS_SESSION_BUNDLE type")
    validate_embedding_set(bundle.get("embedding_set"))
    return bundle


def json_dumps(value: Any) -> str:
    return json.dumps(value, indent=2, sort_keys=True, default=str)


__all__ = [
    "DEFAULT_UI_STATE",
    "SESSION_BUNDLE_TYPE",
    "SESSION_BUNDLE_VERSION",
    "default_ui_state",
    "json_dumps",
    "make_operation_request",
    "make_selection",
    "make_session_bundle",
    "new_run_id",
    "normalize_ui_state",
    "validate_session_bundle",
]
