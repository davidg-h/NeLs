import { signal } from "@preact/signals";
import type { NelsGraphSnapshot, NelsPoint, GraphData } from "../api/types.js";

export const snapshot = signal<NelsGraphSnapshot | null>(null);
export const graphData = signal<GraphData>(emptyGraph());

// Tracks coordinate layout across snapshot updates to prevent UMAP coords from
// being replaced by operation-result snapshots that omit coordinates.
let coordinateCacheKey = "";
let coordinateCache = new Map<string, [number, number]>();

export function setSnapshot(
  snap: NelsGraphSnapshot | null,
  options: { fit?: boolean; fitAlways?: boolean; acceptCoordinates?: boolean; forceCoordinates?: boolean } = {},
): boolean {
  const stabilized = stabilizeSnapshot(snap, options);
  snapshot.value = stabilized;
  graphData.value = buildGraph(stabilized);
  return !!(options.fitAlways || (options.fit && snap));
}

export function buildGraph(snap: NelsGraphSnapshot | null): GraphData {
  const points = Array.isArray(snap?.points) ? snap!.points : [];
  const edges = Array.isArray(snap?.edges) ? snap!.edges : [];
  const byId = new Map<string, NelsPoint>(points.map((p) => [String(p.id), p]));
  const adjacency = new Map<string, Set<string>>();
  const degrees = new Map<string, number>();
  for (const p of points) {
    adjacency.set(String(p.id), new Set());
    degrees.set(String(p.id), 0);
  }
  for (const edge of edges) {
    const s = String(edge.source);
    const t = String(edge.target);
    if (!adjacency.has(s) || !adjacency.has(t)) continue;
    adjacency.get(s)!.add(t);
    adjacency.get(t)!.add(s);
    degrees.set(s, (degrees.get(s) ?? 0) + 1);
    degrees.set(t, (degrees.get(t) ?? 0) + 1);
  }
  return { points, edges, byId, adjacency, degrees, bounds: bounds(points) };
}

export function acceptRuntimeSnapshot(
  incoming: NelsGraphSnapshot,
  currentSnap: NelsGraphSnapshot | null,
  currentData: GraphData,
): boolean {
  if (!currentSnap || !currentData.points.length) return true;

  const incomingIds = new Set((incoming.points ?? []).map((p) => String(p.id)));
  const currentIds = new Set(currentData.points.map((p) => String(p.id)));
  const samePointSet =
    incomingIds.size === currentIds.size &&
    [...incomingIds].every((id) => currentIds.has(id));
  const sameCoordConfig =
    JSON.stringify(coordinateConfig(incoming)) ===
    JSON.stringify(coordinateConfig(currentSnap));

  return !samePointSet || !sameCoordConfig;
}

function stabilizeSnapshot(
  snap: NelsGraphSnapshot | null,
  options: { acceptCoordinates?: boolean; forceCoordinates?: boolean } = {},
): NelsGraphSnapshot | null {
  if (!snap) return null;
  const key = JSON.stringify(coordinateConfig(snap));
  const pointIds = new Set((snap.points ?? []).map((p) => String(p.id)));
  const sameKey = key === coordinateCacheKey;
  const cacheMatches = sameKey && [...pointIds].every((id) => coordinateCache.has(id));
  const accept = options.acceptCoordinates !== false;
  const force = options.forceCoordinates === true || !sameKey;

  if (accept && (force || !cacheMatches)) {
    coordinateCacheKey = key;
    coordinateCache = new Map(
      (snap.points ?? []).map((p) => [String(p.id), p.coords ?? [0, 0]]),
    );
    return snap;
  }

  if (cacheMatches) {
    return {
      ...snap,
      points: (snap.points ?? []).map((p) => ({
        ...p,
        coords: coordinateCache.get(String(p.id)) ?? p.coords,
      })),
    };
  }

  return snap;
}

export function coordinateConfig(snap: NelsGraphSnapshot | null): Record<string, unknown> {
  const src = snap?.source_config ?? {};
  return {
    sample_count: src.sample_count,
    embedding_dim: src.embedding_dim,
    seed: src.seed,
    label_prefix: src.label_prefix,
    metadata_mode: src.metadata_mode,
    cluster_count: src.cluster_count,
    projection_mode: src.projection_mode,
  };
}

function bounds(points: NelsPoint[]): GraphData["bounds"] {
  if (!points.length) return { minX: -1, maxX: 1, minY: -1, maxY: 1 };
  const xs = points.map((p) => Number(p.coords?.[0] ?? 0));
  const ys = points.map((p) => Number(p.coords?.[1] ?? 0));
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  return {
    minX: minX === maxX ? minX - 1 : minX,
    maxX: minX === maxX ? maxX + 1 : maxX,
    minY: minY === maxY ? minY - 1 : minY,
    maxY: minY === maxY ? maxY + 1 : maxY,
  };
}

function emptyGraph(): GraphData {
  return {
    points: [],
    edges: [],
    byId: new Map(),
    adjacency: new Map(),
    degrees: new Map(),
    bounds: { minX: -1, maxX: 1, minY: -1, maxY: 1 },
  };
}
