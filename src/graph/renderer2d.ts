import Sigma from "sigma";
import { MultiGraph } from "graphology";
import EdgeCurveProgram from "@sigma/edge-curve";
import { effect } from "@preact/signals";
import type { Settings as SigmaSettings } from "sigma/settings";
import { selectedIds, emphasizedIds, hoverNodeId } from "../state/selection.js";
import { graphData } from "../state/graph.js";
import { operationResult } from "../state/operation.js";
import { view, animationEnabled } from "../state/events.js";
import { hslToHex, dimHex, mixHex } from "./colors.js";
import { syncSigmaGraph, addOverlayEdgesImpl } from "./adapter.js";
import type { NelsOperationResult } from "../api/types.js";

let sigma: Sigma | null = null;
let sigmaGraph: MultiGraph | null = null;
const overlayEdgeKeys: string[] = [];
const pulses = new Map<string, number>();
const basePositions = new Map<string, { x: number; y: number }>();
let pulseRaf: number | null = null;
let ambientRaf: number | null = null;
let ambientTime = 0;
const effectDisposals: (() => void)[] = [];

// Mutable render state — written by signal effects, read by Sigma reducers (hot path)
const rs = {
  selectedIds: new Set<string>(),
  emphasizedIds: new Set<string>(),
  hoverNodeId: null as string | null,
};

export function initRenderer(container: HTMLElement): void {
  if (sigma) return;

  sigmaGraph = new MultiGraph({ multi: true, allowSelfLoops: false });

  sigma = new Sigma(sigmaGraph, container, {
    edgeProgramClasses: { curved: EdgeCurveProgram },
    defaultDrawNodeHover: drawSigmaHover,
    nodeReducer,
    edgeReducer,
    zIndex: true,
    renderEdgeLabels: false,
    allowInvalidContainer: true,
    defaultNodeColor: "#40a0ff",
    labelFont: "ui-monospace, SFMono-Regular, Consolas, monospace",
    labelSize: 11,
    labelColor: { color: "#9aaabb" },
    labelRenderedSizeThreshold: 12,
    minCameraRatio: 0.04,
    maxCameraRatio: 20,
    stagePadding: 50,
  } as Partial<SigmaSettings>);

  effectDisposals.push(
    effect(() => {
      const gd = graphData.value;
      const opResult = operationResult.value;
      if (!sigma || !sigmaGraph) return;
      syncSigmaGraph(sigmaGraph, gd, opResult, overlayEdgeKeys);
      // Snapshot after build — animation loop reads these as origin
      basePositions.clear();
      sigmaGraph.forEachNode((node) => {
        basePositions.set(node, {
          x: sigmaGraph!.getNodeAttribute(node, "x") as number,
          y: sigmaGraph!.getNodeAttribute(node, "y") as number,
        });
      });
      sigma.refresh();
    }),
  );

  effectDisposals.push(
    effect(() => {
      rs.selectedIds = selectedIds.value;
      rs.emphasizedIds = emphasizedIds.value;
      rs.hoverNodeId = hoverNodeId.value;
      sigma?.refresh();
    }),
  );

  effectDisposals.push(
    effect(() => {
      if (view.value === "graph") {
        setTimeout(() => sigma?.refresh(), 0);
      }
      if (
        view.value === "graph" &&
        graphData.value.points.length > 0 &&
        animationEnabled.value
      )
        startAmbientLoop();
      else stopAmbientLoop();
    }),
  );

}

export function destroyRenderer(): void {
  for (const dispose of effectDisposals) dispose();
  effectDisposals.length = 0;
  if (pulseRaf) {
    cancelAnimationFrame(pulseRaf);
    pulseRaf = null;
  }
  stopAmbientLoop();
  sigma?.kill();
  sigma = null;
  sigmaGraph = null;
  overlayEdgeKeys.length = 0;
  pulses.clear();
}

export function sigmaRefresh(): void {
  sigma?.refresh();
}

export function resizeRenderer(): void {
  (sigma as unknown as { resize?: () => void })?.resize?.();
  sigma?.refresh();
}

export function getCameraState(): { x: number; y: number; ratio: number } {
  const cam = sigma?.getCamera()?.getState();
  return { x: cam?.x ?? 0, y: cam?.y ?? 0, ratio: cam?.ratio ?? 1 };
}

export function applySigmaViewport(viewport: {
  x: number;
  y: number;
  ratio: number;
}): void {
  if (!sigma || !viewport) return;
  const ratio = viewport.ratio != null ? Number(viewport.ratio) : 1;
  sigma.getCamera().setState({
    x: Number(viewport.x ?? 0),
    y: Number(viewport.y ?? 0),
    ratio: Math.max(0.01, ratio),
  });
}

export function fitCamera(): void {
  sigma
    ?.getCamera()
    .animate({ x: 0, y: 0, ratio: 1, angle: 0 }, { duration: 200 });
}

export function addOverlayEdges(): void {
  if (!sigmaGraph) return;
  addOverlayEdgesImpl(sigmaGraph, operationResult.value, overlayEdgeKeys);
}

export function pulseIds(ids: string[]): void {
  const until = Date.now() + 1100;
  for (const id of ids) {
    if (id) pulses.set(id, until);
  }
  startPulseLoop();
}

export function pulseOperationResult(result: NelsOperationResult | null): void {
  const ids: string[] = [];
  if (result?.source_point_id) ids.push(String(result.source_point_id));
  for (const id of result?.source_point_ids ?? []) ids.push(String(id));
  for (const n of result?.neighbors ?? []) {
    const pid = n.point_id ?? n.id;
    if (pid) ids.push(String(pid));
  }
  for (const id of result?.selection?.selected_point_ids ?? [])
    ids.push(String(id));
  pulseIds(ids);
}

export function getSigma(): Sigma | null {
  return sigma;
}

function nodeReducer(
  node: string,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const phase = ambientPhase(node);
  const breath = 0.5 + 0.5 * Math.sin(phase);
  const shimmer = 0.5 + 0.5 * Math.sin(phase * 0.72 + 1.7);
  const selected = rs.selectedIds.has(node);
  const hover = rs.hoverNodeId === node;
  const hasCtx =
    rs.selectedIds.size > 0 || rs.emphasizedIds.size > 0 || !!rs.hoverNodeId;
  const emphasized = hasCtx && rs.emphasizedIds.has(node);
  const dim = hasCtx && !selected && !hover && !emphasized;
  const pulseUntil = pulses.get(node) ?? 0;
  const pulsing = pulseUntil > Date.now();

  // Fast path: no interaction and no pulse — only ambient visual changes needed
  if (!selected && !hover && !emphasized && !dim && !pulsing) {
    const res = { ...data } as Record<string, unknown>;
    res.color = mixHex((data.color as string) || "#40a0ff", "#ffffff", 0.02 + shimmer * 0.04);
    res.size = ((data.size as number) || 6) * (0.94 + breath * 0.08);
    return res;
  }

  const res = { ...data } as Record<string, unknown>;
  const baseSize = (data.size as number) || 6;
  const baseColor = (data.color as string) || "#607890";

  if (selected) {
    res.color = mixHex("#facc15", "#fff7a8", shimmer * 0.14);
    res.size = baseSize * (1.5 + breath * 0.04);
    res.zIndex = 3;
    res.highlighted = true;
  } else if (hover) {
    res.color = mixHex(baseColor, "#ffffff", 0.08 + shimmer * 0.08);
    res.size = baseSize * (1.4 + breath * 0.05);
    res.zIndex = 2;
    res.highlighted = true;
  } else if (emphasized) {
    res.color = mixHex("#7dd3fc", "#dff4ff", shimmer * 0.16);
    res.size = baseSize * (1.25 + breath * 0.03);
    res.zIndex = 1;
  } else if (dim) {
    res.color = dimHex(baseColor, 0.22 + breath * 0.03);
    res.size = baseSize * (0.72 + breath * 0.04);
    res.zIndex = 0;
  }

  if (pulsing) {
    const life = (pulseUntil - Date.now()) / 1100;
    res.size = ((res.size as number) || baseSize) * (1 + life * 0.65);
    res.color = hslToHex(217, 91, Math.round(45 + life * 20));
    res.zIndex = 4;
  }
  return res;
}

function edgeReducer(
  edge: string,
  data: Record<string, unknown>,
): Record<string, unknown> {
  if (data.isOverlay) return data;
  const hasCtx = rs.selectedIds.size > 0 || rs.emphasizedIds.size > 0;
  if (!hasCtx) return data;

  const s = sigmaGraph!.source(edge);
  const t = sigmaGraph!.target(edge);
  const active =
    rs.selectedIds.has(s) ||
    rs.selectedIds.has(t) ||
    rs.emphasizedIds.has(s) ||
    rs.emphasizedIds.has(t);

  const res = { ...data } as Record<string, unknown>;
  if (active) {
    res.color = "rgba(125,211,252,0.65)";
    res.size = 2;
  } else {
    res.color = "rgba(100,120,145,0.08)";
    res.size = 0.7;
  }
  return res;
}

function drawSigmaHover(
  context: CanvasRenderingContext2D,
  data: Record<string, unknown>,
  settings: SigmaSettings,
): void {
  const x = data.x as number;
  const y = data.y as number;
  const nodeR = (data.size as number) || 6;
  const color = (data.color as string) || "#6080a0";
  const label = data.label as string | undefined;

  // Glow ring
  context.beginPath();
  context.arc(x, y, nodeR + 4, 0, Math.PI * 2);
  context.strokeStyle = color;
  context.lineWidth = 2;
  context.globalAlpha = 0.5;
  context.shadowColor = color;
  context.shadowBlur = 12;
  context.stroke();
  context.globalAlpha = 1;
  context.shadowBlur = 0;

  if (!label) return;

  // Dark pill label above node
  const fontSize =
    ((settings as unknown as Record<string, unknown>).labelSize as number) ||
    11;
  const font =
    ((settings as unknown as Record<string, unknown>).labelFont as string) ||
    "ui-monospace, monospace";
  context.font = `${fontSize}px ${font}`;
  const textW = context.measureText(label).width;
  const padX = 8,
    padY = 5;
  const pillW = textW + padX * 2;
  const pillH = fontSize + padY * 2;
  const pillX = x - pillW / 2;
  const pillY = y - nodeR - 10 - pillH;

  context.fillStyle = "#0f1a28";
  context.beginPath();
  if (context.roundRect) context.roundRect(pillX, pillY, pillW, pillH, 4);
  else context.rect(pillX, pillY, pillW, pillH);
  context.fill();
  context.strokeStyle = color;
  context.lineWidth = 1.5;
  context.shadowColor = color;
  context.shadowBlur = 8;
  context.stroke();
  context.shadowBlur = 0;

  context.fillStyle = "#e8f0f8";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(label, x, pillY + pillH / 2);
}

function ambientPhase(node: string): number {
  return ambientTime / 900 + hashString(node) * 0.0007;
}

// FNV-1a 32-bit: good avalanche even for single-char inputs (sequential IDs).
function hashString(value: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function startAmbientLoop(): void {
  if (ambientRaf) return;
  const loop = (): void => {
    if (!sigma || !sigmaGraph || view.value !== "graph" || !animationEnabled.value) {
      ambientRaf = null;
      restoreBasePositions();
      return;
    }
    ambientTime = performance.now();
    const t = ambientTime / 1000;
    // Per-node phase offsets: each node oscillates independently so the centroid
    // stays approximately fixed — Sigma recomputes its normalization bounding box
    // on every refresh(), and a collective (same-delta) wave would be canceled out.
    basePositions.forEach(({ x, y }, node) => {
      if (sigmaGraph!.hasNode(node)) {
        const h = hashString(node);
        const px = (h & 0xffff) * (Math.PI * 2 / 0xffff);
        const py = (h >>> 16) * (Math.PI * 2 / 0xffff);
        const dx = Math.sin(t * 0.6 + px) * 0.035 + Math.sin(t * 0.35 + px + 1.2) * 0.02;
        const dy = Math.cos(t * 0.45 + py) * 0.03 + Math.cos(t * 0.25 + py + 2.1) * 0.015;
        sigmaGraph!.setNodeAttribute(node, "x", x + dx);
        sigmaGraph!.setNodeAttribute(node, "y", y + dy);
      }
    });
    sigma.refresh();
    ambientRaf = requestAnimationFrame(loop);
  };
  ambientRaf = requestAnimationFrame(loop);
}

function stopAmbientLoop(): void {
  if (!ambientRaf) return;
  cancelAnimationFrame(ambientRaf);
  ambientRaf = null;
  restoreBasePositions();
}

function restoreBasePositions(): void {
  if (!sigmaGraph) return;
  basePositions.forEach(({ x, y }, node) => {
    if (sigmaGraph!.hasNode(node)) {
      sigmaGraph!.setNodeAttribute(node, "x", x);
      sigmaGraph!.setNodeAttribute(node, "y", y);
    }
  });
  sigma?.refresh();
}

function startPulseLoop(): void {
  if (pulseRaf) return;
  const loop = (): void => {
    if (!sigma) {
      pulseRaf = null;
      return;
    }
    sigma.refresh();
    if ([...pulses.values()].some((t) => t > Date.now())) {
      pulseRaf = requestAnimationFrame(loop);
    } else {
      pulseRaf = null;
    }
  };
  pulseRaf = requestAnimationFrame(loop);
}
