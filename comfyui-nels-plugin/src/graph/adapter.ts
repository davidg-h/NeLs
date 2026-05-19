import type { MultiGraph } from "graphology";
import type {
  GraphData,
  NelsOperationResult,
  TrajectoryOverlayPoint,
} from "../api/types.js";
import { clusterColor } from "./colors.js";

export type OverlayEdgeKeys = string[];
export type OverlayNodeKeys = string[];

// Stored after each syncSigmaGraph call so ghost nodes can reuse the same
// normalisation that was applied to the real dataset points.
let lastNormX: (x: number) => number = (x) => x;
let lastNormY: (y: number) => number = (y) => -y;

// Y axis flipped — screen coordinates run top-to-bottom.
function makeNormalizer(points: GraphData["points"]): {
  normX: (x: number) => number;
  normY: (y: number) => number;
} {
  const xs = points.map((p) => Number(p.coords?.[0] ?? 0));
  const ys = points.map((p) => Number(p.coords?.[1] ?? 0));
  const minX = Math.min(...xs),
    maxX = Math.max(...xs);
  const minY = Math.min(...ys),
    maxY = Math.max(...ys);
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
  overlayNodeKeys: OverlayNodeKeys,
  showTrajectoryOverlay: boolean,
  snapEndpoints: boolean = true,
  snapLinks?: Map<string, string>,
): void {
  overlayEdgeKeys.length = 0;
  overlayNodeKeys.length = 0;
  sigmaGraph.clear();

  const { points, edges, degrees } = data;
  if (!points.length) return;

  const { normX, normY } = makeNormalizer(points);
  lastNormX = normX;
  lastNormY = normY;

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

  addOverlayEdgesImpl(
    sigmaGraph,
    operationResult,
    overlayEdgeKeys,
    overlayNodeKeys,
    showTrajectoryOverlay,
    snapEndpoints,
    snapLinks,
  );
}

export function addOverlayEdgesImpl(
  sigmaGraph: MultiGraph,
  operationResult: NelsOperationResult | null,
  overlayEdgeKeys: OverlayEdgeKeys,
  overlayNodeKeys: OverlayNodeKeys,
  showTrajectoryOverlay: boolean,
  snapEndpoints: boolean = true,
  snapLinks?: Map<string, string>,
): void {
  // Remove existing overlay edges
  for (const ek of overlayEdgeKeys) {
    if (sigmaGraph.hasEdge(ek)) sigmaGraph.dropEdge(ek);
  }
  overlayEdgeKeys.length = 0;

  // Remove existing ghost nodes (dropping a node also drops its edges)
  for (const nk of overlayNodeKeys) {
    if (sigmaGraph.hasNode(nk)) sigmaGraph.dropNode(nk);
  }
  overlayNodeKeys.length = 0;
  snapLinks?.clear();

  if (!operationResult) return;

  const op = operationResult.operation;

  // Nearest-neighbor -> yellow edges
  if (op === "nearest_neighbor") {
    const fallbackSourceId = firstPointId(
      operationResult.source_point_id ?? operationResult.source_point_ids,
    );

    for (const neighbor of operationResult.neighbors ?? []) {
      const targetId = firstPointId(neighbor.point_id ?? neighbor.id);
      const srcId = neighbor.query_id
        ? String(neighbor.query_id)
        : fallbackSourceId;
      if (
        !srcId ||
        !sigmaGraph.hasNode(srcId) ||
        !targetId ||
        !sigmaGraph.hasNode(targetId)
      )
        continue;
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

  // LERP / SLERP arc
  if (op === "lerp" || op === "slerp") {
    const [src0, src1] = (operationResult.source_point_ids ?? []).map(String);
    if (src0 && src1 && sigmaGraph.hasNode(src0) && sigmaGraph.hasNode(src1)) {
      const ek = sigmaGraph.addEdge(src0, src1, {
        type: "curved",
        curvature: 0.4,
        color: "rgba(251,146,60,0.85)",
        size: 2.5,
        isOverlay: true,
        zIndex: 2,
      });
      overlayEdgeKeys.push(ek);
    }
  }

  // Delta-walk direction arrow
  if (op === "delta_walk") {
    const [src0, src1] = (operationResult.source_point_ids ?? []).map(String);
    if (src0 && src1 && sigmaGraph.hasNode(src0) && sigmaGraph.hasNode(src1)) {
      const ek = sigmaGraph.addEdge(src0, src1, {
        type: "curved",
        curvature: 0.15,
        color: "rgba(45,212,191,0.85)",
        size: 2.5,
        isOverlay: true,
        zIndex: 2,
      });
      overlayEdgeKeys.push(ek);
    }
  }

  // Ghost nodes — projected trajectory overlay
  if (showTrajectoryOverlay) {
    const sourceIds = (operationResult.source_point_ids ?? []).map(String);
    _addGhostNodes(
      sigmaGraph,
      operationResult.trajectory_overlay ?? [],
      overlayEdgeKeys,
      overlayNodeKeys,
      snapEndpoints,
      sourceIds,
      snapLinks,
    );
  }
}

function _addGhostNodes(
  sigmaGraph: MultiGraph,
  overlay: TrajectoryOverlayPoint[],
  overlayEdgeKeys: OverlayEdgeKeys,
  overlayNodeKeys: OverlayNodeKeys,
  snapEndpoints: boolean,
  sourcePointIds: string[],
  snapLinks?: Map<string, string>,
): void {
  const validPts = overlay.filter((pt) => pt.coords_2d);
  if (!validPts.length) return;

  const ghostKeys: string[] = [];
  for (const ghostPt of validPts) {
    const nodeKey = `__ghost__${ghostPt.id}`;
    if (sigmaGraph.hasNode(nodeKey)) continue;

    let x = lastNormX(ghostPt.coords_2d![0]);
    let y = lastNormY(ghostPt.coords_2d![1]);

    if (snapEndpoints) {
      const alpha = ghostPt.alpha;
      let snapId: string | null = null;
      if (alpha === 0.0 && sourcePointIds.length >= 1)
        snapId = sourcePointIds[0];
      else if (alpha === 1.0 && sourcePointIds.length >= 2)
        snapId = sourcePointIds[1];
      if (snapId && sigmaGraph.hasNode(snapId)) {
        x = sigmaGraph.getNodeAttribute(snapId, "x") as number;
        y = sigmaGraph.getNodeAttribute(snapId, "y") as number;
        snapLinks?.set(nodeKey, snapId);
      }
    }

    sigmaGraph.addNode(nodeKey, {
      x,
      y,
      size: 3.5,
      color: "rgba(251,146,60,0.5)",
      label: `t=${ghostPt.alpha.toFixed(2)}`,
      isGhost: true,
      zIndex: 1,
    });
    overlayNodeKeys.push(nodeKey);
    ghostKeys.push(nodeKey);
  }

  // Connect sequential ghost nodes with a thin path
  for (let i = 0; i < ghostKeys.length - 1; i++) {
    const a = ghostKeys[i],
      b = ghostKeys[i + 1];
    if (sigmaGraph.hasNode(a) && sigmaGraph.hasNode(b)) {
      const ek = sigmaGraph.addEdge(a, b, {
        type: "curved",
        curvature: 0.05,
        color: "rgba(251,146,60,0.32)",
        size: 1.0,
        isOverlay: true,
        zIndex: 1,
      });
      overlayEdgeKeys.push(ek);
    }
  }
}

function firstPointId(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return String(value[0] ?? "");
  return String(value ?? "");
}
