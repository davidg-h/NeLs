import type { NelsPoint } from "../api/types.js";

// Background color components for dimHex mixing — must match .nels-sigma-container background
const BG = [0x05, 0x09, 0x0f] as const; // #05090f

// Opaque hex output — Sigma's WebGL premultiplied-alpha darkens semi-transparent colors.
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

export function dimHex(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  const mix = (c: number, i: number): string =>
    Math.round(BG[i] + (c - BG[i]) * amount)
      .toString(16)
      .padStart(2, "0");
  return `#${mix(r, 0)}${mix(g, 1)}${mix(b, 2)}`;
}

export function mixHex(hex: string, targetHex: string, amount: number): string {
  const sr = parseInt(hex.slice(1, 3), 16) || 0;
  const sg = parseInt(hex.slice(3, 5), 16) || 0;
  const sb = parseInt(hex.slice(5, 7), 16) || 0;
  const tr = parseInt(targetHex.slice(1, 3), 16) || 0;
  const tg = parseInt(targetHex.slice(3, 5), 16) || 0;
  const tb = parseInt(targetHex.slice(5, 7), 16) || 0;
  const mix = (c: number, t: number): string =>
    Math.round(c + (t - c) * amount)
      .toString(16)
      .padStart(2, "0");
  return `#${mix(sr, tr)}${mix(sg, tg)}${mix(sb, tb)}`;
}

export function clusterColor(
  point: NelsPoint,
  normX = 0,
  normY = 0,
): string {
  const raw = point?.metadata?.cluster;
  const n = Number(raw);
  const hasCluster =
    raw !== undefined && raw !== null && raw !== "" && Number.isFinite(n);

  if (hasCluster) {
    const hue = (Math.abs(n) * 137.508 + 30) % 360;
    return hslToHex(hue, 100, 58);
  }

  // No cluster label — map UMAP angle to hue so nearby points share similar colors.
  const angle = Math.atan2(normY, normX) * (180 / Math.PI);
  const hue = (angle + 180) % 360;
  const dist = Math.min(Math.hypot(normX, normY), 0.6);
  return hslToHex(hue, 100, 58);
}
