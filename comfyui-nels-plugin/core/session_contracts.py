"""Session bundle contracts shared by NELS nodes and routes"""

from __future__ import annotations

import copy
import hashlib
import json
import time
import uuid
from collections.abc import Iterable
from typing import Any

from .embedding_ops import embedding_set_snapshot, validate_embedding_set

SESSION_BUNDLE_TYPE = "NELS_SESSION_BUNDLE"

DEFAULT_UI_STATE: dict[str, Any] = {
    "session_id": "default",
    "state_revision": 0,
    "selected_point_ids": [],
    "operation": "inspect",
    "alpha_schedule": [0, 0.25, 0.5, 0.75, 1],
    "neighbor_count": 4,
    "viewport": {"x": 0.0, "y": 0.0, "ratio": 1.0},
}


def now_ms() -> int:
    """Return current time in milliseconds since epoch"""
    return int(time.time() * 1000)


def new_run_id() -> str:
    return f"run_{now_ms()}_{uuid.uuid4().hex[:8]}"


def default_ui_state(session_id: str = "default") -> dict[str, Any]:
    """Returns a fresh UI state dict with default values"""
    state = copy.deepcopy(DEFAULT_UI_STATE)
    state["session_id"] = str(session_id or "default")
    return state


def normalize_ui_state(
    state: dict[str, Any] | None,
    *,
    session_id: str = "default",
    increment_revision: bool = False,
) -> dict[str, Any]:
    """Normalize and validate a UI state dict filling in defaults and ensuring correct types"""
    normalized = default_ui_state(session_id)
    if isinstance(state, dict):
        normalized.update(copy.deepcopy(state))

    normalized["session_id"] = str(normalized.get("session_id") or session_id or "default")
    selected = normalized.get("selected_point_ids", [])
    if isinstance(selected, str):
        selected = [selected]
    normalized["selected_point_ids"] = [str(item) for item in selected if str(item)]
    normalized["operation"] = str(normalized.get("operation") or "inspect")
    raw_alpha = normalized.get("alpha_schedule")
    try:
        if isinstance(raw_alpha, str):
            parts = raw_alpha.replace(";", ",").replace(" ", ",").split(",")
            values = [float(p) for p in parts if p.strip()]
        elif isinstance(raw_alpha, Iterable):
            values = [float(v) for v in raw_alpha]
        else:
            values = DEFAULT_UI_STATE["alpha_schedule"]
    except Exception:
        values = DEFAULT_UI_STATE["alpha_schedule"]
    # clamp values to valid range
    normalized["alpha_schedule"] = [float(v) for v in values if float(v) >= 0 and float(v) <= 1]
    normalized["neighbor_count"] = max(1, int(normalized.get("neighbor_count") or 4))
    try:
        revision = int(normalized.get("state_revision") or 0)
    except (TypeError, ValueError):
        revision = 0
    normalized["state_revision"] = revision + 1 if increment_revision else revision
    if not isinstance(normalized.get("viewport"), dict):
        normalized["viewport"] = {"x": 0.0, "y": 0.0, "ratio": 1.0}
    return normalized


def make_operation_request(ui_state: dict[str, Any], *, run_id: str) -> dict[str, Any]:
    """Build a operation request dict from UI state fields"""
    return {
        "session_id": ui_state["session_id"],
        "run_id": run_id,
        "state_revision": int(ui_state.get("state_revision") or 0),
        "operation": str(ui_state.get("operation") or "inspect"),
        "selected_point_ids": list(ui_state.get("selected_point_ids") or []),
        "alpha_schedule": ui_state.get("alpha_schedule") or DEFAULT_UI_STATE["alpha_schedule"],
        "neighbor_count": int(ui_state.get("neighbor_count") or 4),
        "nearest_sample": bool(ui_state.get("nearest_sample", False)),
    }


def make_session_bundle(
    *,
    embedding_set: dict[str, Any],
    ui_state: dict[str, Any],
    run_id: str | None = None,
    graph_snapshot: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Build a session bundle dict containing embedding set, UI state, selection, and graph snapshot"""
    validate_embedding_set(embedding_set)
    actual_run_id = run_id or new_run_id()
    selection = {
        "session_id": ui_state["session_id"],
        "run_id": actual_run_id,
        "state_revision": int(ui_state.get("state_revision") or 0),
        "selected_point_ids": list(ui_state.get("selected_point_ids") or []),
    }
    operation_request = make_operation_request(ui_state, run_id=actual_run_id)
    return {
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


def merge_projected_points(
    points_2d: list[dict[str, Any]],
    points_3d: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Merge 2D and 3D projected points into snapshot dicts with both coordinate sets."""
    return [
        {
            **p2d,
            "coords": p2d["coords"],
            "coords_2d": p2d["coords"],
            "coords_3d": p3d["coords"],
        }
        for p2d, p3d in zip(points_2d, points_3d, strict=True)
    ]


def zip_point_coords(
    points: list[dict[str, Any]],
    coords_2d: list,
    coords_3d: list,
) -> list[dict[str, Any]]:
    """Build snapshot dicts from embedding_set points + separate coord arrays"""
    return [
        {
            "id": p["id"],
            "label": p["label"],
            "metadata": p.get("metadata", {}),
            "coords": c2,
            "coords_2d": c2,
            "coords_3d": c3,
        }
        for p, c2, c3 in zip(points, coords_2d, coords_3d, strict=True)
    ]


def assemble_snapshot(
    points: list[dict[str, Any]],
    edges: list[dict[str, Any]],
    *,
    session_id: str,
    config: dict[str, Any],
    config_hash: str,
    source_meta: dict[str, Any],
    state_revision: int,
    projection_method: str = "umap",
    warnings: list[str] | None = None,
) -> dict[str, Any]:
    """Build standard graph snapshot shared by all source nodes"""
    return {
        "session_id": str(session_id or "default"),
        "state_revision": state_revision,
        "source": source_meta,
        "source_config": config,
        "source_config_hash": config_hash,
        "points": points,
        "edges": edges,
        "projection_mode": "both",
        "projection_method": projection_method,
        "dimensions": 2,
        "warnings": warnings or [],
    }


def source_config_hash(config: dict[str, Any]) -> str:
    """Stable SHA-256 cache key for a source config dict (first 16 hex chars)"""
    stable = json.dumps(config or {}, sort_keys=True, separators=(",", ":"), default=str)
    return hashlib.sha256(stable.encode("utf-8")).hexdigest()[:16]


def json_dumps(value: Any) -> str:
    return json.dumps(value, indent=2, sort_keys=True, default=str)


__all__ = [
    "DEFAULT_UI_STATE",
    "SESSION_BUNDLE_TYPE",
    "assemble_snapshot",
    "default_ui_state",
    "json_dumps",
    "make_operation_request",
    "source_config_hash",
    "make_session_bundle",
    "merge_projected_points",
    "new_run_id",
    "normalize_ui_state",
    "now_ms",
    "validate_session_bundle",
    "zip_point_coords",
]
