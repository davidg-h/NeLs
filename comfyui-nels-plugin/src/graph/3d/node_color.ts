import {
  axisColorMode,
  axisScoreMap,
  axisBScoreMap,
  trajectoryHighlightActive,
} from "../../state/operation.js";
import {
  C_EMPHASIZED_RGB,
  C_SELECTED_RGB,
  type RenderState,
  axisScoreColorRGB,
  axisBScoreColorRGB,
  computeNodeFlags,
  hashString,
  hexTo01,
  pulseHighlightHex,
} from "../rendering_common.js";

function blendToward(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function nodeColor(
  i: number,
  id: string,
  t: number,
  baseRGB: Float32Array,
  rs: RenderState,
  pulses: Map<string, number>,
): [number, number, number] {
  const { selected, hover, emphasized, dim, pulsing, pulseLife } =
    computeNodeFlags(id, rs, pulses);

  if (pulsing) {
    return hexTo01(pulseHighlightHex(pulseLife));
  }
  if (selected) return C_SELECTED_RGB;
  if (trajectoryHighlightActive.value) {
    return [
      baseRGB[i * 3] * 0.1,
      baseRGB[i * 3 + 1] * 0.1,
      baseRGB[i * 3 + 2] * 0.1,
    ];
  }
  if (hover) {
    const [r, g, b] = [baseRGB[i * 3], baseRGB[i * 3 + 1], baseRGB[i * 3 + 2]];
    return [
      blendToward(r, 1, 0.4),
      blendToward(g, 1, 0.4),
      blendToward(b, 1, 0.4),
    ];
  }
  if (emphasized) return C_EMPHASIZED_RGB;
  if (dim) {
    return [
      baseRGB[i * 3] * 0.25,
      baseRGB[i * 3 + 1] * 0.25,
      baseRGB[i * 3 + 2] * 0.25,
    ];
  }

  const colorMode = axisColorMode.value;
  const activeScoreMap =
    colorMode === "b" ? axisBScoreMap.value : axisScoreMap.value;
  const activeColorFn =
    colorMode === "b" ? axisBScoreColorRGB : axisScoreColorRGB;
  const axisScore = activeScoreMap.get(id);
  if (axisScore !== undefined) {
    return activeColorFn(axisScore);
  }

  const h = hashString(id);
  const sp = ((h ^ (h >>> 17)) & 0xffff) * ((Math.PI * 2) / 0xffff);
  const shimmer = 0.5 + 0.5 * Math.sin(t * 0.72 + sp);
  const f = 0.02 + shimmer * 0.04;
  const r = baseRGB[i * 3];
  const g = baseRGB[i * 3 + 1];
  const b = baseRGB[i * 3 + 2];
  return [r + (1 - r) * f, g + (1 - g) * f, b + (1 - b) * f];
}
