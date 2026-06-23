import * as THREE from "three";
import type { AxisProjectionScore } from "../../api/types.js";
import { operationResult } from "../../state/operation.js";
import {
  C_AXIS_A_END_RGB,
  C_AXIS_A_START_RGB,
  C_AXIS_B_END_RGB,
  C_AXIS_B_START_RGB,
  gradientFitSideIds,
} from "../rendering_common.js";
import {
  getScene,
  getContainer3D,
  getBasePositions,
  getNodeIds,
  projectToScreen,
} from "./renderer3d.js";

interface AxisColors {
  lineStart: [number, number, number];
  lineEnd: [number, number, number];
  labelStartColor: string;
  labelEndColor: string;
}

interface AxisVisual {
  line: THREE.Line;
  divA: HTMLDivElement;
  divB: HTMLDivElement;
  worldA: THREE.Vector3;
  worldB: THREE.Vector3;
}

let axisVisualA: AxisVisual | null = null;
let axisVisualB: AxisVisual | null = null;

export function disposeAxis3D(): void {
  disposeAxisVisual(axisVisualA);
  disposeAxisVisual(axisVisualB);
  axisVisualA = null;
  axisVisualB = null;
}

function disposeAxisVisual(visual: AxisVisual | null): void {
  if (!visual) return;
  getScene()?.remove(visual.line);
  visual.line.geometry.dispose();
  (visual.line.material as THREE.Material).dispose();
  visual.divA.remove();
  visual.divB.remove();
}

function idsCentroid3D(
  ids: string[],
): { x: number; y: number; z: number } | null {
  const nodeIds = getNodeIds();
  const basePositions = getBasePositions();
  let sx = 0;
  let sy = 0;
  let sz = 0;
  let count = 0;
  for (const id of ids) {
    const idx = nodeIds.indexOf(String(id));
    if (idx < 0) continue;
    sx += basePositions[idx * 3];
    sy += basePositions[idx * 3 + 1];
    sz += basePositions[idx * 3 + 2];
    count++;
  }
  if (!count) return null;
  return { x: sx / count, y: sy / count, z: sz / count };
}

// Build one axis: a gradient line between the two extreme-score centroids, extended
// past both ends, plus a floating text label at each extended end
function buildAxisVisual(
  scene: THREE.Scene,
  container: HTMLElement,
  scores: AxisProjectionScore[],
  labelA: string,
  labelB: string,
  colors: AxisColors,
): AxisVisual | null {
  if (!scores.length) return null;
  const { sideA, sideB } = gradientFitSideIds(scores);
  const cA = idsCentroid3D(sideA);
  const cB = idsCentroid3D(sideB);
  if (!cA || !cB) return null;

  const dx = cB.x - cA.x;
  const dy = cB.y - cA.y;
  const dz = cB.z - cA.z;
  const dlen = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (dlen < 1e-6) return null;
  const ux = dx / dlen;
  const uy = dy / dlen;
  const uz = dz / dlen;

  const ext = 1.5;
  const sx = cA.x - ux * ext;
  const sy = cA.y - uy * ext;
  const sz = cA.z - uz * ext;
  const ex = cB.x + ux * ext;
  const ey = cB.y + uy * ext;
  const ez = cB.z + uz * ext;
  const worldA = new THREE.Vector3(sx, sy, sz);
  const worldB = new THREE.Vector3(ex, ey, ez);

  const [r0, g0, b0] = colors.lineStart;
  const [r1, g1, b1] = colors.lineEnd;
  const pts = [
    sx,
    sy,
    sz,
    cA.x,
    cA.y,
    cA.z,
    (cA.x + cB.x) / 2,
    (cA.y + cB.y) / 2,
    (cA.z + cB.z) / 2,
    cB.x,
    cB.y,
    cB.z,
    ex,
    ey,
    ez,
  ];
  const cols = [r0, g0, b0, r0, g0, b0, 1.0, 1.0, 1.0, r1, g1, b1, r1, g1, b1];
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
  const line = new THREE.Line(
    geo,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      linewidth: 2,
    }),
  );
  scene.add(line);

  const divA = document.createElement("div");
  divA.style.cssText =
    `position:absolute;pointer-events:none;display:none;color:${colors.labelStartColor};` +
    "font:10px ui-monospace,monospace;white-space:nowrap;text-shadow:0 0 4px #000;z-index:8;";
  divA.textContent = "← " + labelA;
  container.appendChild(divA);

  const divB = document.createElement("div");
  divB.style.cssText =
    `position:absolute;pointer-events:none;display:none;color:${colors.labelEndColor};` +
    "font:10px ui-monospace,monospace;white-space:nowrap;text-shadow:0 0 4px #000;z-index:8;";
  divB.textContent = labelB + " ->";
  container.appendChild(divB);

  return { line, divA, divB, worldA, worldB };
}

export function rebuildAxis3D(): void {
  disposeAxis3D();
  const scene = getScene();
  const nodeIds = getNodeIds();
  const container = getContainer3D();

  const result = operationResult.value;
  if (
    result?.operation !== "axis_projection" ||
    !scene ||
    !nodeIds.length ||
    !container
  )
    return;

  axisVisualA = buildAxisVisual(
    scene,
    container,
    result.axis_projection ?? [],
    result.axis_keywords_a ?? "A-side",
    result.axis_keywords_b ?? "B-side",
    {
      lineStart: C_AXIS_A_START_RGB,
      lineEnd: C_AXIS_A_END_RGB,
      labelStartColor: "#60a5fa",
      labelEndColor: "#f87171",
    },
  );

  axisVisualB = buildAxisVisual(
    scene,
    container,
    result.axis_b_projection ?? [],
    result.axis_b_keywords_a ?? "C-side",
    result.axis_b_keywords_b ?? "D-side",
    {
      lineStart: C_AXIS_B_START_RGB,
      lineEnd: C_AXIS_B_END_RGB,
      labelStartColor: "#4ade80",
      labelEndColor: "#fb923c",
    },
  );
}

export function updateAxisLabels(): void {
  updateAxisVisualLabels(axisVisualA);
  updateAxisVisualLabels(axisVisualB);
}

function updateAxisVisualLabels(visual: AxisVisual | null): void {
  if (!visual) return;
  const projA = projectToScreen(
    visual.worldA.x,
    visual.worldA.y,
    visual.worldA.z,
  );
  if (projA) {
    visual.divA.style.left = `${projA.x + 6}px`;
    visual.divA.style.top = `${projA.y - 8}px`;
    visual.divA.style.display = "block";
  } else {
    visual.divA.style.display = "none";
  }

  const projB = projectToScreen(
    visual.worldB.x,
    visual.worldB.y,
    visual.worldB.z,
  );
  if (projB) {
    visual.divB.style.left = `${projB.x - (visual.divB.offsetWidth || 80) - 6}px`;
    visual.divB.style.top = `${projB.y - 8}px`;
    visual.divB.style.display = "block";
  } else {
    visual.divB.style.display = "none";
  }
}
