"""Nearest neighbor operation for NELS sessions"""

import uuid
from typing import Any

from ..tensor_ops import nearest_neighbors, point_embedding, selected_points, validate_embedding_set


def nearest_neighbor_result(
    embedding_set: dict[str, Any],
    selection: dict[str, Any],
    *,
    neighbor_count: int,
    request_id: str | None = None,
    state_revision: int | None = None,
) -> dict[str, Any]:
    """Rank nearest neighbors for all selected points, one query per point"""
    validate_embedding_set(embedding_set)
    query_points = selected_points(embedding_set, selection)
    if not query_points:
        raise ValueError("nearest_neighbor requires at least one selected point")

    candidates = embedding_set["points"]
    selected_id_set = {str(p["id"]) for p in query_points}
    # Fetch extra candidates per query to account for selected points being skipped
    limit = max(1, int(neighbor_count) + len(query_points))

    all_neighbors: list[dict[str, Any]] = []
    for query in query_points:
        query_id = str(query["id"])
        ranked = nearest_neighbors(
            point_embedding(query),
            [point_embedding(point) for point in candidates],
            limit=limit,
        )
        count = 0
        for index, score in ranked:
            candidate = candidates[index]
            cid = str(candidate["id"])
            if cid in selected_id_set:
                continue
            all_neighbors.append(
                {
                    "id": candidate["id"],
                    "label": candidate["label"],
                    "score": float(score),
                    "query_id": query_id,
                }
            )
            count += 1
            if count >= int(neighbor_count):
                break

    return {
        "operation": "nearest_neighbor",
        "request_id": request_id or uuid.uuid4().hex,
        "state_revision": int(state_revision or 0),
        "source_point_ids": [str(p["id"]) for p in query_points],
        "neighbors": all_neighbors,
    }
