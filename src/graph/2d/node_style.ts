import type { Settings as SigmaSettings } from "sigma/settings";
import {
  operationResult,
  axisColorMode,
  axisScoreMap,
  axisBScoreMap,
  trajectoryHighlightActive,
} from "../../state/operation.js";
import { activeClusterId } from "../../ui/ClusterLegend.js";
import { hslToHex, dimHex, hexToRgb, mixHex } from "../colors.js";
import {
  C_SELECTED,
  C_EMPHASIZED,
  C_GHOST_HEX,
  type RenderState,
  axisScoreColorRGB,
  axisBScoreColorRGB,
  computeNodeFlags,
  rgbToHex,
} from "../rendering_common.js";
import { drawTextPill } from "./canvas_overlay.js";

const [GHOST_R, GHOST_G, GHOST_B] = hexToRgb(C_GHOST_HEX);

function axisScoreColor(t: number): string {
  return rgbToHex(...axisScoreColorRGB(t));
}

function axisBScoreColor(t: number): string {
  return rgbToHex(...axisBScoreColorRGB(t));
}

export function createNodeReducer(
  rs: RenderState,
  pulses: Map<string, number>,
  ambientPhase: (node: string) => number,
): (node: string, data: Record<string, unknown>) => Record<string, unknown> {
  return function (node, data) {
    if (data.isGhost) {
      const hover = rs.hoverNodeId === node;
      const ghostSelected = rs.selectedIds.has(node);
      if (ghostSelected) {
        return {
          ...data,
          size: ((data.size as number) || 5) * 1.9,
          color: C_SELECTED,
          highlighted: true,
          zIndex: 6,
        };
      }
      if (hover) {
        return {
          ...data,
          size: ((data.size as number) || 3.5) * 2.2,
          color: C_SELECTED,
          highlighted: true,
          zIndex: 5,
        };
      }
      const phase = ambientPhase(node);
      const breath = 0.5 + 0.5 * Math.sin(phase);

      // Variant ghost nodes: blend in like an ordinary unselected point
      if (data.isVariantGhost) {
        const fillColor =
          (data.ghostClusterColor as string | null) ?? C_GHOST_HEX;
        const activeCluster = activeClusterId.value;
        const ghostClId = data.ghostClusterId as number | null | undefined;
        const dimmed =
          activeCluster !== null &&
          (ghostClId == null || String(ghostClId) !== activeCluster);
        return {
          ...data,
          size: ((data.size as number) || 4) * (0.94 + breath * 0.08),
          color: dimmed
            ? fillColor + "28"
            : mixHex(fillColor, "#ffffff", 0.02 + breath * 0.04),
        };
      }

      return {
        ...data,
        size: ((data.size as number) || 3.5) * (0.82 + breath * 0.18),
        color: `rgba(${GHOST_R},${GHOST_G},${GHOST_B},0)`, // transparent fill - ring drawn by drawGhostRings canvas pass
      };
    }

    const phase = ambientPhase(node);
    const breath = 0.5 + 0.5 * Math.sin(phase);
    const shimmer = 0.5 + 0.5 * Math.sin(phase * 0.72 + 1.7);
    const { selected, hover, emphasized, dim, pulsing, pulseLife } =
      computeNodeFlags(node, rs, pulses);

    if (trajectoryHighlightActive.value && !selected && !hover) {
      return {
        ...data,
        color: dimHex((data.color as string) || "#607890", 0.08),
        size: ((data.size as number) || 6) * 0.55,
        zIndex: 0,
      };
    }

    // Axis projection: color all non-ghost nodes by their normalized score
    const axisOp = operationResult.value?.operation === "axis_projection";
    const colorMode = axisColorMode.value;
    const scoreMap =
      colorMode === "b" ? axisBScoreMap.value : axisScoreMap.value;
    const colorFn = colorMode === "b" ? axisBScoreColor : axisScoreColor;

    if (!selected && !hover && !emphasized && !dim && !pulsing) {
      const res = { ...data } as Record<string, unknown>;
      if (axisOp && scoreMap.has(node)) {
        res.color = colorFn(scoreMap.get(node)!);
        res.size = ((data.size as number) || 6) * (0.94 + breath * 0.08);
      } else {
        res.color = mixHex(
          (data.color as string) || "#40a0ff",
          "#ffffff",
          0.02 + shimmer * 0.04,
        );
        res.size = ((data.size as number) || 6) * (0.94 + breath * 0.08);
      }
      return res;
    }

    const res = { ...data } as Record<string, unknown>;
    const baseSize = (data.size as number) || 6;
    const baseColor = (data.color as string) || "#607890";

    if (selected) {
      res.color = mixHex(C_SELECTED, "#fff7a8", shimmer * 0.14);
      res.size = baseSize * (1.5 + breath * 0.04);
      res.zIndex = 3;
      res.highlighted = true;
    } else if (hover) {
      res.color = mixHex(baseColor, "#ffffff", 0.08 + shimmer * 0.08);
      res.size = baseSize * (1.4 + breath * 0.05);
      res.zIndex = 2;
      res.highlighted = true;
    } else if (emphasized) {
      res.color = mixHex(C_EMPHASIZED, "#dff4ff", shimmer * 0.16);
      res.size = baseSize * (1.25 + breath * 0.03);
      res.zIndex = 1;
    } else if (dim) {
      res.color = dimHex(baseColor, 0.22 + breath * 0.03);
      res.size = baseSize * (0.72 + breath * 0.04);
      res.zIndex = 0;
    }

    if (pulsing) {
      res.size = ((res.size as number) || baseSize) * (1 + pulseLife * 0.65);
      res.color = hslToHex(217, 91, Math.round(45 + pulseLife * 20));
      res.zIndex = 4;
    }
    return res;
  };
}

export function drawSigmaHover(
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
  const fontSize = settings.labelSize || 11;
  const font = settings.labelFont || "ui-monospace, monospace";
  drawTextPill(context, x, y - nodeR - 10, label, color, fontSize, font);
}
