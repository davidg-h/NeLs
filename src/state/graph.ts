import { signal } from "@preact/signals";
import type { NelsGraphSnapshot, NelsPoint, GraphData } from "../api/types.js";

export const snapshot = signal<NelsGraphSnapshot | null>(null);
export const graphData = signal<GraphData>(emptyGraph());
export const viewMode = signal<"2d" | "3d">("2d");

// Tracks coordinate layout across snapshot updates to prevent UMAP coords from
// being replaced by operation-result snapshots that omit coordinates.
let coordinateCacheKey = "";
let coordCache2d = new Map<string, [number, number]>();
let coordCache3d = new Map<string, [number, number, number]>();

export function setSnapshot(
  snap: NelsGraphSnapshot | null,
  options: { fit?: boolean; fitAlways?: boolean; acceptCoordinates?: boolean; forceCoordinates?: boolean } = {},
): boolean {
  const stabilized = stabilizeSnapshot(snap, options);
  snapshot.value = stabilized;
  graphData.value = buildGraph(stabilized);
  return !!(options.fitAlways || (options.fit && snap));
}

export function setViewMode(mode: "2d" | "3d"): void {
  viewMode.value = mode;
  graphData.value = buildGraph(snapshot.value);
}

export function buildGraph(snap: NelsGraphSnapshot | null): GraphData {
  const rawPoints = Array.isArray(snap?.points) ? snap!.points : [];
  const mode = viewMode.value;

  // Pick the correct coordinate set for the active view mode.
  const points: NelsPoint[] = rawPoints.map((p) => {
    if (mode === "3d" && p.coords_3d) return { ...p, coords: p.coords_3d };
    if (mode === "2d" && p.coords_2d) return { ...p, coords: p.coords_2d };
    return p;
  });

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
  const points = snap.points ?? [];
  const pointIds = new Set(points.map((p) => String(p.id)));
  const sameKey = key === coordinateCacheKey;
  const cacheMatches =
    sameKey && [...pointIds].every((id) => coordCache2d.has(id) || coordCache3d.has(id));
  const accept = options.acceptCoordinates !== false;
  const force = options.forceCoordinates === true || !sameKey;

  if (accept && (force || !cacheMatches)) {
    coordinateCacheKey = key;
    coordCache2d = new Map(
      points
        .filter((p) => p.coords_2d)
        .map((p) => [String(p.id), p.coords_2d!]),
    );
    coordCache3d = new Map(
      points
        .filter((p) => p.coords_3d)
        .map((p) => [String(p.id), p.coords_3d!]),
    );
    return snap;
  }

  if (cacheMatches) {
    return {
      ...snap,
      points: points.map((p) => {
        const id = String(p.id);
        return {
          ...p,
          ...(coordCache2d.has(id) ? { coords_2d: coordCache2d.get(id)! } : {}),
          ...(coordCache3d.has(id) ? { coords_3d: coordCache3d.get(id)! } : {}),
        };
      }),
    };
  }

  return snap;
}

export function coordinateConfig(snap: NelsGraphSnapshot | null): Record<string, unknown> {
  const src = snap?.source_config ?? {};
  return {
    dataset_path: src.dataset_path,
    load_mode: src.load_mode,
    count: src.count,
    window_start: src.window_start,
    random_seed: src.random_seed,
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
