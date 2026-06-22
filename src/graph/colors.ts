import type { NelsPoint } from "../api/types.js";

// Background color components for dimHex mixing
const BG = [0x05, 0x09, 0x0f] as const; // #05090f
export const NOISE_COLOR = "#3a4a54";

// Opaque hex output
export function hslToHex(h: number, s: number, l: number): string {
  const sf = s / 100;
  const lf = l / 100;
  const a = sf * Math.min(lf, 1 - lf);
  const f = (n: number): number => {
    const k = (n + h / 30) % 12;
    return lf - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  const hex = (x: number): string =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${hex(f(0))}${hex(f(8))}${hex(f(4))}`;
}

// Parse a 6-digit hex color string like "#3a4a54" into [r, g, b] 0-255 ints
export function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16) || 0,
    parseInt(hex.slice(3, 5), 16) || 0,
    parseInt(hex.slice(5, 7), 16) || 0,
  ];
}

export function dimHex(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const mix = (c: number, i: number): string =>
    Math.round(BG[i] + (c - BG[i]) * amount)
      .toString(16)
      .padStart(2, "0");
  return `#${mix(r, 0)}${mix(g, 1)}${mix(b, 2)}`;
}

export function mixHex(hex: string, targetHex: string, amount: number): string {
  const [sr, sg, sb] = hexToRgb(hex);
  const [tr, tg, tb] = hexToRgb(targetHex);
  const mix = (c: number, t: number): string =>
    Math.round(c + (t - c) * amount)
      .toString(16)
      .padStart(2, "0");
  return `#${mix(sr, tr)}${mix(sg, tg)}${mix(sb, tb)}`;
}

export interface ClusterGroup {
  count: number;
  sample: string | null;
  ids: string[];
}

// Group points by metadata.cluster_global, skipping noise/unclustered points
export function groupPointsByCluster(
  points: NelsPoint[],
): Map<string, ClusterGroup> {
  const map = new Map<string, ClusterGroup>();
  for (const p of points) {
    const cg = p.metadata?.cluster_global;
    if (cg === undefined || cg === null || p.metadata?.is_noise) continue;
    const key = String(cg);
    const entry = map.get(key) ?? { count: 0, sample: null, ids: [] };
    entry.count++;
    entry.ids.push(String(p.id));
    if (!entry.sample && p.label) entry.sample = p.label;
    map.set(key, entry);
  }
  return map;
}

// Color for a bare cluster id, with no point context - gray fallback
export function clusterColor(raw: unknown, lightness = 58): string {
  const n = Number(raw);
  if (Number.isFinite(n)) {
    const hue = (Math.abs(n) * 137.508 + 30) % 360;
    return hslToHex(hue, 100, lightness);
  }
  return "#608090";
}

// Color for a rendered point: dims noise, defers to clusterColor when a cluster id
// exists, else maps its UMAP position to a hue so nearby unclustered points still match
export function pointColor(
  point: NelsPoint,
  normX = 0,
  normY = 0,
  lightness = 58,
): string {
  const meta = point?.metadata;
  if (meta?.is_noise) return dimHex(NOISE_COLOR, 0.28);

  const cg = meta?.cluster_global;
  if (cg !== undefined && cg !== null && Number.isFinite(Number(cg))) {
    return clusterColor(cg, lightness);
  }

  const angle = Math.atan2(normY, normX) * (180 / Math.PI);
  const hue = (angle + 180) % 360;
  return hslToHex(hue, 100, lightness);
}
