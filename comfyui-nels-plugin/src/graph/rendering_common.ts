// Renderer-agnostic visual state: color constants, pulse helpers, node flag computation

import type { NelsOperationResult } from "../api/types.js";
import { clusterColor } from "./colors.js";

export interface RendererModule {
  initRenderer(el: HTMLElement): void;
  destroyRenderer(): void;
  sigmaRefresh(): void;
  highlightGhostStep(stepId: string | null): void;
  resizeRenderer(): void;
  getCameraState(): { x: number; y: number; ratio: number };
  applySigmaViewport(viewport: { x: number; y: number; ratio: number }): void;
  fitCamera(): void;
  addOverlayEdges(): void;
  pulseIds(ids: string[]): void;
  pulseOperationResult(result: NelsOperationResult | null): void;
  setHullCanvas(canvas: HTMLCanvasElement): void;
}

const PULSE_DURATION_MS = 1100;

// 2D hex colors (Sigma nodeReducer / edgeReducer)
export const C_SELECTED = "#facc15";
export const C_EMPHASIZED = "#7dd3fc";
export const C_GHOST_HEX = "#fb923c";
export const C_DELTA_WALK_HEX = "#2dd4bf";
export const C_AXIS_A_START_HEX = "#3b82f6";
export const C_AXIS_A_END_HEX = "#ef4444";
export const C_AXIS_B_START_HEX = "#22c55e";
export const C_AXIS_B_END_HEX = "#f97316";
// 3D RGB 0-1 triples (Three.js BufferAttribute setXYZ)
export const C_SELECTED_RGB: [number, number, number] = [0.98, 0.8, 0.082]; // #facc15
export const C_EMPHASIZED_RGB: [number, number, number] = [0.49, 0.827, 0.988]; // #7dd3fc
export const C_GHOST_RGB: [number, number, number] = [0.98, 0.57, 0.24]; // #fb923c
export const C_AXIS_A_START_RGB: [number, number, number] = [
  0.231, 0.51, 0.965,
]; // #3b82f6
export const C_AXIS_A_END_RGB: [number, number, number] = [0.937, 0.267, 0.267]; // #ef4444
export const C_AXIS_B_START_RGB: [number, number, number] = [
  0.133, 0.773, 0.369,
]; // #22c55e
export const C_AXIS_B_END_RGB: [number, number, number] = [0.976, 0.451, 0.086]; // #f97316
// Numeric hex (Three.js Material color property)
export const C_DELTA_WALK_NUM = 0x2dd4bf;
export const C_GHOST_NUM = 0xfb923c;
export const C_SELECTED_NUM = 0xfacc15;

/** RGB 0-1 gradient for an axis pair: pair 0 = blue->red, pair 1 = green->orange, else null */
export function axisPairColorRGB(
  t: number,
  pair: number | undefined,
): [number, number, number] | null {
  const tt = Math.max(0, Math.min(1, t));
  const mix = (
    a: [number, number, number],
    b: [number, number, number],
  ): [number, number, number] => [
    a[0] + (b[0] - a[0]) * tt,
    a[1] + (b[1] - a[1]) * tt,
    a[2] + (b[2] - a[2]) * tt,
  ];
  if (pair === 0) return mix(C_AXIS_A_START_RGB, C_AXIS_A_END_RGB);
  if (pair === 1) return mix(C_AXIS_B_START_RGB, C_AXIS_B_END_RGB);
  return null;
}

export interface RenderState {
  selectedIds: Set<string>;
  emphasizedIds: Set<string>;
  hoverNodeId: string | null;
}

/** FNV-1a string hash, used to derive a deterministic per-node animation phase */
export function hashString(value: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Per-node x/y idle-jitter offset for a given node hash and animation time shared by the 2D and 3D ambient loops */
export function ambientJitterXY(
  h: number,
  t: number,
): { dx: number; dy: number } {
  const px = (h & 0xffff) * ((Math.PI * 2) / 0xffff);
  const py = (h >>> 16) * ((Math.PI * 2) / 0xffff);
  const dx =
    Math.sin(t * 0.6 + px) * 0.035 + Math.sin(t * 0.35 + px + 1.2) * 0.02;
  const dy =
    Math.cos(t * 0.45 + py) * 0.03 + Math.cos(t * 0.25 + py + 2.1) * 0.015;
  return { dx, dy };
}

/** Parse a 6-digit hex color string into [r, g, b] in [0, 1] */
export function hexTo01(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ];
}

/** Write pulse entries into the module-local pulses map */
export function fillPulseMap(ids: string[], pulses: Map<string, number>): void {
  const until = Date.now() + PULSE_DURATION_MS;
  for (const id of ids) if (id) pulses.set(id, until);
}

interface NodeVisualFlags {
  selected: boolean;
  hover: boolean;
  emphasized: boolean;
  dim: boolean;
  pulsing: boolean;
  /** Pulse life in [0, 1]: 1 = just fired, 0 = expired; 0 when not pulsing */
  pulseLife: number;
}

/** Compute the renderer-agnostic visual state flags for a real (non-ghost) node */
export function computeNodeFlags(
  id: string,
  rs: RenderState,
  pulses: Map<string, number>,
): NodeVisualFlags {
  const selected = rs.selectedIds.has(id);
  const hover = rs.hoverNodeId === id;
  const hasCtx =
    rs.selectedIds.size > 0 || rs.emphasizedIds.size > 0 || !!rs.hoverNodeId;
  const emphasized = hasCtx && rs.emphasizedIds.has(id);
  const dim = hasCtx && !selected && !hover && !emphasized;
  const pulseUntil = pulses.get(id) ?? 0;
  const pulsing = pulseUntil > Date.now();
  const pulseLife = pulsing ? (pulseUntil - Date.now()) / PULSE_DURATION_MS : 0;
  return { selected, hover, emphasized, dim, pulsing, pulseLife };
}

/** Smooth curve through all given points (clamped uniform Catmull-Rom, duplicates the endpoints as virtual control points) */
export function catmullRomSpline2D(
  points: { x: number; y: number }[],
  samplesPerSegment = 12,
): { x: number; y: number }[] {
  if (points.length < 3) return points.slice();
  const pts = [points[0], ...points, points[points.length - 1]];
  const result: { x: number; y: number }[] = [];
  const segments = points.length - 1;
  for (let seg = 0; seg < segments; seg++) {
    const p0 = pts[seg];
    const p1 = pts[seg + 1];
    const p2 = pts[seg + 2];
    const p3 = pts[seg + 3];
    const steps =
      seg === segments - 1 ? samplesPerSegment + 1 : samplesPerSegment;
    for (let s = 0; s < steps; s++) {
      const t = s / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      result.push({
        x:
          0.5 *
          (2 * p1.x +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y:
          0.5 *
          (2 * p1.y +
            (-p0.y + p2.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  return result;
}

/** Draw a filled convex-hull outline per cluster onto a 2D canvas context */
export function drawClusterHullsOnCanvas(
  ctx: CanvasRenderingContext2D,
  byCluster: Map<string, { x: number; y: number }[]>,
): void {
  ctx.save();
  for (const [clusterId, pts] of byCluster) {
    if (pts.length < 2) continue;
    const hullIdx = convexHull(pts);
    if (hullIdx.length < 2) continue;
    const color = clusterColor(clusterId);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.85;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(pts[hullIdx[0]].x, pts[hullIdx[0]].y);
    for (let i = 1; i < hullIdx.length; i++)
      ctx.lineTo(pts[hullIdx[i]].x, pts[hullIdx[i]].y);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.restore();
}

/** Convert a [0, 1] RGB triple to a hex color string */
export function rgbToHex(r: number, g: number, b: number): string {
  const h = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

/** Map a normalized score in [0, 1] to a blue-white-red RGB gradient (axis A) */
export function axisScoreColorRGB(t: number): [number, number, number] {
  // blue (0) -> white (0.5) -> red (1)
  const r = t < 0.5 ? t * 2 : 1;
  const g = t < 0.5 ? t * 2 : (1 - t) * 2;
  const b = t < 0.5 ? 1 : (1 - t) * 2;
  return [r, g, b];
}

/** Map a normalized score in [0, 1] to a green-white-orange RGB gradient (axis B) */
export function axisBScoreColorRGB(t: number): [number, number, number] {
  // green (0) -> white (0.5) -> orange (1)
  const r = t < 0.5 ? 34 / 255 + (1 - 34 / 255) * t * 2 : 1;
  const g =
    t < 0.5
      ? 197 / 255 + (1 - 197 / 255) * t * 2
      : 1 - (1 - 115 / 255) * (t - 0.5) * 2;
  const b =
    t < 0.5
      ? 94 / 255 + (1 - 94 / 255) * t * 2
      : 1 - (1 - 22 / 255) * (t - 0.5) * 2;
  return [r, g, b];
}

/** Resolve the source point id(s) of an operation result */
export function getSourceIds(result: NelsOperationResult): string[] {
  return result.source_point_ids?.map(String) ?? [];
}

/** Split scores sorted by value into the bottom/top 10% as side A / side B ids */
export function gradientFitSideIds(scores: { id: string }[]): {
  sideA: string[];
  sideB: string[];
} {
  const k = Math.max(1, Math.round(scores.length * 0.1));
  return {
    sideA: scores.slice(-k).map((s) => s.id), // lowest scores = A-side
    sideB: scores.slice(0, k).map((s) => s.id), // highest scores = B-side
  };
}

function convexHull(pts: { x: number; y: number }[]): number[] {
  if (pts.length < 3) return pts.map((_, i) => i);
  let start = 0;
  for (let i = 1; i < pts.length; i++) {
    if (
      pts[i].x < pts[start].x ||
      (pts[i].x === pts[start].x && pts[i].y < pts[start].y)
    )
      start = i;
  }
  const hull: number[] = [];
  let cur = start;
  do {
    hull.push(cur);
    let next = (cur + 1) % pts.length;
    for (let i = 0; i < pts.length; i++) {
      const cross =
        (pts[next].x - pts[cur].x) * (pts[i].y - pts[cur].y) -
        (pts[next].y - pts[cur].y) * (pts[i].x - pts[cur].x);
      if (cross < 0) next = i;
    }
    cur = next;
  } while (cur !== start && hull.length <= pts.length);
  return hull;
}
