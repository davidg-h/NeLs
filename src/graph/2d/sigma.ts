import type { MultiGraph } from "graphology";
import type {
  ConsistencyVariant,
  GraphData,
  NelsOperationResult,
  TrajectoryOverlayPoint,
} from "../../api/types.js";
import {
  pointColor,
  clusterColor,
  dimHex,
  hexToRgb,
  NOISE_COLOR,
} from "../colors.js";
import {
  axisPairColorRGB,
  C_DELTA_WALK_HEX,
  C_GHOST_HEX,
  resolveSnapSourceId,
  rgbToHex,
} from "../rendering_common.js";
import { rawToDisplay2D } from "../view_mapper.js";

const [GHOST_R, GHOST_G, GHOST_B] = hexToRgb(C_GHOST_HEX);

type OverlayEdgeKeys = string[];
type OverlayNodeKeys = string[];

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

  const { points } = data;
  if (!points.length) return;

  for (const point of points) {
    const x = Number(point.view_coords?.[0] ?? 0);
    const y = Number(point.view_coords?.[1] ?? 0);
    sigmaGraph.addNode(String(point.id), {
      x,
      y,
      size: 4,
      color: pointColor(point, x, y),
      label: point.label ?? String(point.id),
    });
  }

  syncOperationOverlay(
    sigmaGraph,
    operationResult,
    overlayEdgeKeys,
    overlayNodeKeys,
    showTrajectoryOverlay,
    snapEndpoints,
    snapLinks,
  );
}

export function syncOperationOverlay(
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

  // Delta-walk direction arrow: src0->src1 shows direction vector A->B
  if (op === "delta_walk") {
    const sourceIds = (operationResult.source_point_ids ?? []).map(String);
    const [src0, src1] = sourceIds;
    if (src0 && src1 && sigmaGraph.hasNode(src0) && sigmaGraph.hasNode(src1)) {
      const [dwR, dwG, dwB] = hexToRgb(C_DELTA_WALK_HEX);
      const ek = sigmaGraph.addEdge(src0, src1, {
        color: `rgba(${dwR},${dwG},${dwB},0.85)`,
        size: 2.5,
        isOverlay: true,
        zIndex: 2,
      });
      overlayEdgeKeys.push(ek);
    }
  }

  // Ghost nodes - projected trajectory overlay
  if (showTrajectoryOverlay) {
    const sourceIds = (operationResult.source_point_ids ?? []).map(String);
    addGhostNodes(
      sigmaGraph,
      operationResult.trajectory_overlay ?? [],
      overlayEdgeKeys,
      overlayNodeKeys,
      snapEndpoints,
      sourceIds,
      snapLinks,
      op,
      operationResult.consistency_variants,
    );
  }
}

// Returns gradient hex for axis ghost nodes:
// pair=0 -> blue->red (axis 1 A->B), pair=1 -> green->orange (axis 2), else -> default orange
function axisGhostHex(alpha: number, pair: number | undefined): string {
  const rgb = axisPairColorRGB(alpha, pair);
  return rgb ? rgbToHex(...rgb) : C_GHOST_HEX;
}

function axisGhostRgba(
  alpha: number,
  pair: number | undefined,
  opacity: number,
): string {
  const [r, g, b] = hexToRgb(axisGhostHex(alpha, pair));
  return `rgba(${r},${g},${b},${opacity})`;
}

function addGhostNodes(
  sigmaGraph: MultiGraph,
  overlay: TrajectoryOverlayPoint[],
  overlayEdgeKeys: OverlayEdgeKeys,
  overlayNodeKeys: OverlayNodeKeys,
  snapEndpoints: boolean,
  sourcePointIds: string[],
  snapLinks?: Map<string, string>,
  op?: string,
  variants?: ConsistencyVariant[],
): void {
  const validPts = overlay.filter((pt) => pt.coords_2d);
  if (!validPts.length) return;

  const isVariant = op === "consistency_check";

  const ghostInfo: Array<{
    key: string;
    alpha: number;
    pair: number | undefined;
  }> = [];
  for (const ghostPt of validPts) {
    const nodeKey = `__ghost__${ghostPt.id}`;
    if (sigmaGraph.hasNode(nodeKey)) continue;

    const mapped = rawToDisplay2D(ghostPt.coords_2d);
    if (!mapped) continue;
    let [x, y] = mapped;

    if (snapEndpoints && !isVariant && op !== "axis_projection") {
      const snapId = resolveSnapSourceId(ghostPt.alpha, op, sourcePointIds);
      if (snapId && sigmaGraph.hasNode(snapId)) {
        x = sigmaGraph.getNodeAttribute(snapId, "x") as number;
        y = sigmaGraph.getNodeAttribute(snapId, "y") as number;
        snapLinks?.set(nodeKey, snapId);
      }
    }

    const pair = ghostPt.source_text_pair;
    const variantClusterColor = isVariant
      ? ghostPt.cluster_id != null
        ? clusterColor(ghostPt.cluster_id)
        : dimHex(NOISE_COLOR, 0.28)
      : null;
    const nodeColor = isVariant
      ? `rgba(${GHOST_R},${GHOST_G},${GHOST_B},0.5)`
      : axisGhostRgba(ghostPt.alpha, pair, 0.5);
    const ringColor = isVariant ? null : axisGhostHex(ghostPt.alpha, pair);

    const variantText = isVariant
      ? (variants?.find((v) => v.id === ghostPt.id)?.text ?? ghostPt.label)
      : undefined;

    sigmaGraph.addNode(nodeKey, {
      x,
      y,
      size: isVariant ? 4 : 3.5,
      color: nodeColor,
      label: isVariant ? (variantText ?? "") : `t=${ghostPt.alpha.toFixed(2)}`,
      isGhost: true,
      isVariantGhost: isVariant,
      ghostClusterColor: variantClusterColor,
      ghostClusterId: ghostPt.cluster_id ?? null,
      ghostRingColor: ringColor,
      ghostCoords2d: ghostPt.coords_2d,
      ghostCoords3d: ghostPt.coords_3d,
      ghostAlpha: ghostPt.alpha,
      zIndex: isVariant ? 2 : 1,
    });
    overlayNodeKeys.push(nodeKey);
    ghostInfo.push({ key: nodeKey, alpha: ghostPt.alpha, pair });
  }

  // Connect sequential ghost nodes - skip for consistency_check and slerp
  // (slerp draws a single Catmull-Rom spline through all points instead, see canvas_overlay.ts)
  // Also skip edges that would cross axis boundaries (pair mismatch)
  if (op !== "consistency_check" && op !== "slerp") {
    for (let i = 0; i < ghostInfo.length - 1; i++) {
      const { key: a, alpha: alphaA, pair: pairA } = ghostInfo[i];
      const { key: b, alpha: alphaB, pair: pairB } = ghostInfo[i + 1];
      if (pairA !== pairB) continue; // don't bridge across axes
      if (sigmaGraph.hasNode(a) && sigmaGraph.hasNode(b)) {
        const midAlpha = (alphaA + alphaB) / 2;
        const edgeColor = axisGhostRgba(midAlpha, pairA, 0.32);
        const edgeType = op === "lerp" ? undefined : "curved";
        const edgeCurvature = 0.05;
        const ek = sigmaGraph.addEdge(a, b, {
          ...(edgeType ? { type: edgeType, curvature: edgeCurvature } : {}),
          color: edgeColor,
          size: 1.0,
          isOverlay: true,
          zIndex: 1,
        });
        overlayEdgeKeys.push(ek);
      }
    }
  }
}
