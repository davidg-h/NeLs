import type Sigma from "sigma";
import type { MultiGraph } from "graphology";
import { graphData, viewMode } from "../../state/graph.js";
import { operationResult, operationConfig } from "../../state/operation.js";
import { showClusterHulls } from "../../ui/ClusterLegend.js";
import { hexToRgb } from "../colors.js";
import {
  type RenderState,
  C_AXIS_A_END_HEX,
  C_AXIS_A_START_HEX,
  C_AXIS_B_END_HEX,
  C_AXIS_B_START_HEX,
  C_GHOST_HEX,
  C_SELECTED,
  getSourceIds,
  catmullRomSpline2D,
  drawClusterHullsOnCanvas,
  gradientFitSideIds,
} from "../rendering_common.js";

const [SELECTED_R, SELECTED_G, SELECTED_B] = hexToRgb(C_SELECTED);

let sigma: Sigma | null = null;
let sigmaGraph: MultiGraph | null = null;
let hullCanvas: HTMLCanvasElement | null = null;
let rs: RenderState = {
  selectedIds: new Set<string>(),
  emphasizedIds: new Set<string>(),
  hoverNodeId: null,
};

export function setHullCanvas(canvas: HTMLCanvasElement): void {
  hullCanvas = canvas;
}

export function initCanvasOverlay(
  s: Sigma,
  sg: MultiGraph,
  renderState: RenderState,
): void {
  sigma = s;
  sigmaGraph = sg;
  rs = renderState;
}

export function destroyCanvasOverlay(): void {
  sigma = null;
  sigmaGraph = null;
}

export function drawClusterHulls(): void {
  if (!hullCanvas) return;
  // In 3D mode the hull canvas is owned by renderer3d
  if (viewMode.value === "3d") return;
  if (!sigma || !sigmaGraph) return;
  const w = hullCanvas.offsetWidth;
  const h = hullCanvas.offsetHeight;
  hullCanvas.width = w;
  hullCanvas.height = h;
  const ctx = hullCanvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);

  if (showClusterHulls.value) {
    const byCluster = new Map<string, { x: number; y: number }[]>();
    for (const point of graphData.value.points) {
      const cg = point.metadata?.cluster_global;
      if (cg === undefined || cg === null || point.metadata?.is_noise) continue;
      const nodeKey = String(point.id);
      if (!sigmaGraph.hasNode(nodeKey)) continue;
      const attrs = sigmaGraph.getNodeAttributes(nodeKey);
      const screen = sigma!.graphToViewport({
        x: attrs.x as number,
        y: attrs.y as number,
      });
      const key = String(cg);
      const arr = byCluster.get(key) ?? [];
      arr.push(screen);
      byCluster.set(key, arr);
    }
    drawClusterHullsOnCanvas(ctx, byCluster);
  }

  drawNearestNeighborEdges(ctx);
  drawAxisOverlay(ctx, w, h);
  drawGhostRings(ctx);
  drawSlerpArc(ctx);
  drawProbeMarker2D(ctx);
}

function drawSlerpArc(ctx: CanvasRenderingContext2D): void {
  if (!sigma || !sigmaGraph) return;
  if (operationResult.value?.operation !== "slerp") return;

  const ghosts: { alpha: number; x: number; y: number }[] = [];
  sigmaGraph.forEachNode((node, attrs) => {
    if (!attrs.isGhost || attrs.isVariantGhost) return;
    const sc = sigma!.graphToViewport({
      x: attrs.x as number,
      y: attrs.y as number,
    });
    ghosts.push({ alpha: attrs.ghostAlpha as number, x: sc.x, y: sc.y });
  });
  if (ghosts.length < 3) return;
  ghosts.sort((a, b) => a.alpha - b.alpha);

  const curve = catmullRomSpline2D(ghosts);
  ctx.save();
  ctx.strokeStyle = C_GHOST_HEX;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.78;
  ctx.beginPath();
  ctx.moveTo(curve[0].x, curve[0].y);
  for (let i = 1; i < curve.length; i++) ctx.lineTo(curve[i].x, curve[i].y);
  ctx.stroke();
  ctx.restore();
}

function drawGhostRings(ctx: CanvasRenderingContext2D): void {
  if (!sigma || !sigmaGraph) return;

  const t = performance.now() / 1000;
  const breath = 0.5 + 0.5 * Math.sin(t * 0.7);

  ctx.save();
  ctx.setLineDash([]);
  ctx.lineWidth = 2.5;
  ctx.globalAlpha = 0.55 + breath * 0.3;

  sigmaGraph.forEachNode((node, attrs) => {
    if (!attrs.isGhost) return;
    if (rs.hoverNodeId === node) return; // hovered ghost shows solid yellow fill
    const sc = sigma!.graphToViewport({
      x: attrs.x as number,
      y: attrs.y as number,
    });
    ctx.strokeStyle = (attrs.ghostRingColor as string | null) ?? C_GHOST_HEX;
    ctx.beginPath();
    ctx.arc(sc.x, sc.y, 8, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.restore();
}

function drawNearestNeighborEdges(ctx: CanvasRenderingContext2D): void {
  if (!sigma || !sigmaGraph) return;
  const result = operationResult.value;
  if (result?.operation !== "nearest_neighbor") return;

  const fallbackSourceIds = getSourceIds(result);

  ctx.save();
  ctx.strokeStyle = `rgba(${SELECTED_R},${SELECTED_G},${SELECTED_B},0.78)`;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.globalAlpha = 1;

  for (const neighbor of result.neighbors ?? []) {
    const pid = String(neighbor.id ?? "");
    if (!pid) continue;
    const querySids = neighbor.query_id
      ? [String(neighbor.query_id)]
      : fallbackSourceIds;
    for (const sid of querySids) {
      if (!sigmaGraph.hasNode(sid) || !sigmaGraph.hasNode(pid)) continue;
      const sAttrs = sigmaGraph.getNodeAttributes(sid);
      const tAttrs = sigmaGraph.getNodeAttributes(pid);
      const src = sigma.graphToViewport({
        x: sAttrs.x as number,
        y: sAttrs.y as number,
      });
      const tgt = sigma.graphToViewport({
        x: tAttrs.x as number,
        y: tAttrs.y as number,
      });
      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(tgt.x, tgt.y);
      ctx.stroke();
    }
  }

  ctx.setLineDash([]);
  ctx.restore();
}

function drawProbeMarker2D(ctx: CanvasRenderingContext2D): void {
  if (!sigma) return;
  const cfg = operationConfig.value;
  if (cfg.operation !== "latent_probe") return;
  const coords2d =
    cfg.probe_mode === "2d" ? cfg.probe_coords : cfg.probe_cross_coords;
  if (!coords2d || coords2d.length < 2) return;
  const sc = sigma.graphToViewport({ x: coords2d[0], y: coords2d[1] });
  const selected = rs.selectedIds.has("probe");
  const hovered = rs.hoverNodeId === "probe";

  ctx.save();
  ctx.shadowColor = `rgba(${SELECTED_R},${SELECTED_G},${SELECTED_B},0.6)`;
  ctx.shadowBlur = selected || hovered ? 18 : 12;
  ctx.beginPath();
  ctx.arc(sc.x, sc.y, selected || hovered ? 11 : 8, 0, Math.PI * 2);
  ctx.fillStyle = C_SELECTED;
  ctx.fill();
  ctx.restore();

  // Persistent pill label while selected
  if (selected && !hovered) {
    const recon =
      operationResult.value?.operation === "latent_probe"
        ? operationResult.value?.text_reconstruction
        : undefined;
    drawTextPill(
      ctx,
      sc.x,
      sc.y - 18,
      recon?.text ?? "Latent Space Probe",
      C_SELECTED,
    );
  }
}

/** Draw a rounded, bordered text pill bottom-anchored at (x, y), truncating long text */
export function drawTextPill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  color: string,
  fontSize = 11,
  fontFamily = "ui-monospace, monospace",
): void {
  ctx.save();
  const displayText = text.length > 50 ? text.slice(0, 50) + "…" : text;
  ctx.font = `${fontSize}px ${fontFamily}`;
  const textW = ctx.measureText(displayText).width;
  const padX = 8;
  const padY = 5;
  const pillW = textW + padX * 2;
  const pillH = fontSize + padY * 2;
  const pillX = x - pillW / 2;
  const pillY = y - pillH;

  ctx.fillStyle = "#0f1a28";
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(pillX, pillY, pillW, pillH, 4);
  else ctx.rect(pillX, pillY, pillW, pillH);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#e8f0f8";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(displayText, x, pillY + pillH / 2);
  ctx.restore();
}

// Parametric line-rect exit: returns [tMin, tMax] t-values where origin+(t*dir) crosses [0,w]x[0,h]
function lineRectExits(
  ox: number,
  oy: number,
  ux: number,
  uy: number,
  w: number,
  h: number,
): [number, number] {
  const ts: number[] = [];
  if (Math.abs(ux) > 1e-8) {
    ts.push(-ox / ux);
    ts.push((w - ox) / ux);
  }
  if (Math.abs(uy) > 1e-8) {
    ts.push(-oy / uy);
    ts.push((h - oy) / uy);
  }
  const valid = ts.filter((t) => {
    const x = ox + t * ux;
    const y = oy + t * uy;
    return x >= -1 && x <= w + 1 && y >= -1 && y <= h + 1;
  });
  valid.sort((a, b) => a - b);
  return [valid[0] ?? -1, valid[valid.length - 1] ?? 1];
}

function screenCentroid(ids: string[]): { x: number; y: number } | null {
  if (!sigma || !sigmaGraph) return null;
  let sx = 0;
  let sy = 0;
  let count = 0;
  for (const id of ids) {
    const key = String(id);
    if (!sigmaGraph.hasNode(key)) continue;
    const attrs = sigmaGraph.getNodeAttributes(key);
    const sc = sigma.graphToViewport({
      x: attrs.x as number,
      y: attrs.y as number,
    });
    sx += sc.x;
    sy += sc.y;
    count++;
  }
  if (!count) return null;
  return { x: sx / count, y: sy / count };
}

// Gradient-fit axis endpoints: extreme 10% of scores on each side
function gradientFitEndpoints(
  scores: { id: string }[],
): [{ x: number; y: number } | null, { x: number; y: number } | null] {
  if (!scores.length) return [null, null];
  const { sideA, sideB } = gradientFitSideIds(scores);
  return [screenCentroid(sideA), screenCentroid(sideB)];
}

function drawSingleAxis(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scores: { id: string }[],
  colors: { lineA: string; lineB: string },
): void {
  const [pA, pB] = gradientFitEndpoints(scores);
  if (!pA || !pB) return;

  const dx = pB.x - pA.x;
  const dy = pB.y - pA.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return;
  const ux = dx / len;
  const uy = dy / len;

  const [tMin, tMax] = lineRectExits(pA.x, pA.y, ux, uy, w, h);
  const edgeA = { x: pA.x + tMin * ux, y: pA.y + tMin * uy };
  const edgeB = { x: pA.x + tMax * ux, y: pA.y + tMax * uy };

  ctx.setLineDash([6, 4]);
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.beginPath();
  ctx.moveTo(edgeA.x, edgeA.y);
  ctx.lineTo(edgeB.x, edgeB.y);
  ctx.stroke();
  ctx.setLineDash([]);

  const arrLen = 10;
  const arrW = 5;
  ctx.strokeStyle = colors.lineB;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(
    edgeB.x - ux * arrLen - uy * arrW,
    edgeB.y - uy * arrLen + ux * arrW,
  );
  ctx.lineTo(edgeB.x, edgeB.y);
  ctx.lineTo(
    edgeB.x - ux * arrLen + uy * arrW,
    edgeB.y - uy * arrLen - ux * arrW,
  );
  ctx.stroke();

  ctx.strokeStyle = colors.lineA;
  ctx.beginPath();
  ctx.moveTo(
    edgeA.x + ux * arrLen - uy * arrW,
    edgeA.y + uy * arrLen + ux * arrW,
  );
  ctx.lineTo(edgeA.x, edgeA.y);
  ctx.lineTo(
    edgeA.x + ux * arrLen + uy * arrW,
    edgeA.y + uy * arrLen - ux * arrW,
  );
  ctx.stroke();
}

function drawAxisOverlay(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
): void {
  const result = operationResult.value;
  if (result?.operation !== "axis_projection") return;
  const scores = result.axis_projection ?? [];
  if (!scores.length || !sigma || !sigmaGraph) return;

  ctx.save();

  drawSingleAxis(ctx, w, h, scores, {
    lineA: C_AXIS_A_START_HEX,
    lineB: C_AXIS_A_END_HEX,
  });

  const bScores = result.axis_b_projection;
  if (bScores && bScores.length >= 2) {
    drawSingleAxis(ctx, w, h, bScores, {
      lineA: C_AXIS_B_START_HEX,
      lineB: C_AXIS_B_END_HEX,
    });
  }

  const drawGroupDots = (ids: string[], color: string): void => {
    if (!sigma || !sigmaGraph) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.75;
    for (const id of ids) {
      const key = String(id);
      if (!sigmaGraph.hasNode(key)) continue;
      const attrs = sigmaGraph.getNodeAttributes(key);
      const sc = sigma.graphToViewport({
        x: attrs.x as number,
        y: attrs.y as number,
      });
      ctx.beginPath();
      ctx.arc(sc.x, sc.y, 7, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };
  drawGroupDots(result.source_group_a ?? [], C_AXIS_A_START_HEX);
  drawGroupDots(result.source_group_b ?? [], C_AXIS_A_END_HEX);

  ctx.restore();
}
