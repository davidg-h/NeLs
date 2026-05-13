import type { MultiGraph } from "graphology";
import type { GraphData, NelsOperationResult } from "../api/types.js";
import { clusterColor } from "./colors.js";

export type OverlayEdgeKeys = string[];

// Y axis flipped — screen coordinates run top-to-bottom.
function makeNormalizer(points: GraphData["points"]): {
  normX: (x: number) => number;
  normY: (y: number) => number;
} {
  const xs = points.map((p) => Number(p.coords?.[0] ?? 0));
  const ys = points.map((p) => Number(p.coords?.[1] ?? 0));
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const span = Math.max(maxX - minX, maxY - minY, 0.001);
  const scale = 1 / span;
  return {
    normX: (x) => (x - cx) * scale,
    normY: (y) => -((y - cy) * scale),
  };
}

export function syncSigmaGraph(
  sigmaGraph: MultiGraph,
  data: GraphData,
  operationResult: NelsOperationResult | null,
  overlayEdgeKeys: OverlayEdgeKeys,
): void {
  overlayEdgeKeys.length = 0;
  sigmaGraph.clear();

  const { points, edges, degrees } = data;
  if (!points.length) return;

  const { normX, normY } = makeNormalizer(points);

  for (const point of points) {
    const deg = degrees.get(String(point.id)) ?? 0;
    sigmaGraph.addNode(String(point.id), {
      x: normX(Number(point.coords?.[0] ?? 0)),
      y: normY(Number(point.coords?.[1] ?? 0)),
      size: 4 + Math.min(deg * 0.6, 6),
      color: clusterColor(
        point,
        normX(Number(point.coords?.[0] ?? 0)),
        normY(Number(point.coords?.[1] ?? 0)),
      ),
      label: point.label ?? String(point.id),
    });
  }

  for (const edge of edges) {
    const s = String(edge.source);
    const t = String(edge.target);
    if (sigmaGraph.hasNode(s) && sigmaGraph.hasNode(t)) {
      sigmaGraph.addEdge(s, t, {
        type: "curved",
        curvature: 0.08,
        color: "rgba(100,130,165,0.32)",
        size: 1.2,
      });
    }
  }

  addOverlayEdgesImpl(sigmaGraph, operationResult, overlayEdgeKeys);
}

export function addOverlayEdgesImpl(
  sigmaGraph: MultiGraph,
  operationResult: NelsOperationResult | null,
  overlayEdgeKeys: OverlayEdgeKeys,
): void {
  for (const ek of overlayEdgeKeys) {
    if (sigmaGraph.hasEdge(ek)) sigmaGraph.dropEdge(ek);
  }
  overlayEdgeKeys.length = 0;

  if (!operationResult || operationResult.operation !== "nearest_neighbor") return;

  const fallbackSourceId = firstPointId(
    operationResult.source_point_id ?? operationResult.source_point_ids,
  );

  for (const neighbor of operationResult.neighbors ?? []) {
    const targetId = firstPointId(neighbor.point_id ?? neighbor.id);
    // Use the per-neighbor query_id (multi-point NN) or fall back to first source
    const srcId = neighbor.query_id ? String(neighbor.query_id) : fallbackSourceId;
    if (!srcId || !sigmaGraph.hasNode(srcId) || !targetId || !sigmaGraph.hasNode(targetId)) continue;
    const ek = sigmaGraph.addEdge(srcId, targetId, {
      type: "curved",
      curvature: 0.2,
      color: "rgba(250,204,21,0.78)",
      size: 2.2,
      isOverlay: true,
      zIndex: 2,
    });
    overlayEdgeKeys.push(ek);
  }
}

function firstPointId(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return String(value[0] ?? "");
  return String(value ?? "");
}
