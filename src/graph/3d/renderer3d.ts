import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { computed, effect } from "@preact/signals";
import type { NelsOperationResult } from "../../api/types.js";
import { graphData } from "../../state/graph.js";
import {
  operationConfig,
  operationResult,
  trajectoryOverlayVisible,
  trajectoryHighlightActive,
  extractResultPointIds,
} from "../../state/operation.js";
import { showClusterHulls } from "../../ui/ClusterLegend.js";
import { view, animationEnabled } from "../../state/events.js";
import {
  selectedIds,
  emphasizedIds,
  hoverNodeId,
} from "../../state/selection.js";
import { schedulePushState } from "../../state/rendererBridge.js";
import { pointColor } from "../colors.js";
import {
  type RenderState,
  C_SELECTED_NUM,
  drawClusterHullsOnCanvas,
  fillPulseMap,
  hashString,
  hexTo01,
  ambientJitterXY,
} from "../rendering_common.js";
import { sharedCircleTexture } from "./textures.js";
import { nodeColor } from "./node_color.js";
import {
  rebuildOverlayLines,
  disposeAndRemoveLines,
  updateOverlayAnimation,
} from "./overlay_lines.js";
import { rebuildAxis3D, disposeAxis3D, updateAxisLabels } from "./axis3d.js";
import {
  rebuildGhostNodes,
  disposeAndRemoveGhostNodes,
  updateGhostAnimation,
  setHighlightedGhostId,
} from "./ghost_nodes.js";
import {
  onMouseDown,
  onMouseMove,
  onMouseUp3D,
  onClick,
  onContextMenu3D,
  resetInteractions3D,
} from "./interactions3d.js";

let threeRenderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let controls: OrbitControls | null = null;
let pointCloud: THREE.Points | null = null;
let gridHelper: THREE.GridHelper | null = null;
let hullCanvas: HTMLCanvasElement | null = null;
let probeSphere3D: THREE.Mesh | null = null;
let animRaf: number | null = null;
let container: HTMLElement | null = null;

let nodeIds: string[] = [];
let basePositions: Float32Array = new Float32Array(0);
let baseRGB: Float32Array = new Float32Array(0);
let zBounds = { min: -1, max: 1 };
let isoCenter = { x: 0, y: 0, z: 0 };
let isoSpan = 1;

const pulses = new Map<string, number>();
const effectDisposals: (() => void)[] = [];
const rs: RenderState = {
  selectedIds: new Set<string>(),
  emphasizedIds: new Set<string>(),
  hoverNodeId: null as string | null,
};

const selectedLabelDivs = new Map<string, HTMLDivElement>();
let probeLabelDiv: HTMLDivElement | null = null;
const projVec = new THREE.Vector3();
const circleTexture = sharedCircleTexture;

const snap3d = computed(() => operationConfig.value.snap_endpoints);

// ---- getters for sub-modules ----

export function getScene(): THREE.Scene | null {
  return scene;
}
export function getCamera3D(): THREE.PerspectiveCamera | null {
  return camera;
}
export function getThreeRenderer(): THREE.WebGLRenderer | null {
  return threeRenderer;
}
export function getControls(): OrbitControls | null {
  return controls;
}
export function getContainer3D(): HTMLElement | null {
  return container;
}
export function getNodeIds(): string[] {
  return nodeIds;
}
export function getBasePositions(): Float32Array {
  return basePositions;
}
export function getPointCloud(): THREE.Points | null {
  return pointCloud;
}
export function getProbeSphere3D(): THREE.Mesh | null {
  return probeSphere3D;
}
export function getSelectedLabelDivs(): Map<string, HTMLDivElement> {
  return selectedLabelDivs;
}

export function projectToScreen(
  wx: number,
  wy: number,
  wz: number,
): { x: number; y: number } | null {
  if (!camera || !container) return null;
  projVec.set(wx, wy, wz).project(camera);
  if (projVec.z > 1) return null;
  const w = container.clientWidth;
  const h = container.clientHeight;
  return { x: ((projVec.x + 1) / 2) * w, y: ((1 - projVec.y) / 2) * h };
}

// ---- public API ----

export function initRenderer(el: HTMLElement): void {
  if (threeRenderer) return;
  container = el;
  window.addEventListener("beforeunload", destroyRenderer, { once: true });

  threeRenderer = new THREE.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true,
  });
  threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  threeRenderer.setSize(el.clientWidth || 600, el.clientHeight || 400);
  threeRenderer.setClearColor(0x05090f, 1);
  el.appendChild(threeRenderer.domElement);

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05090f, 0.18);

  gridHelper = new THREE.GridHelper(8, 40, 0x2a5ca8, 0x1e3050);
  gridHelper.position.y = -1.2;
  const gridMats = Array.isArray(gridHelper.material)
    ? gridHelper.material
    : [gridHelper.material];
  for (const m of gridMats) {
    (m as THREE.LineBasicMaterial).transparent = true;
    (m as THREE.LineBasicMaterial).opacity = 0.7;
  }
  scene.add(gridHelper);

  const w = el.clientWidth || 600;
  const h = el.clientHeight || 400;
  camera = new THREE.PerspectiveCamera(55, w / h, 0.001, 100);
  camera.position.set(0.6, 0.5, 2.2);

  controls = new OrbitControls(camera, threeRenderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.addEventListener("end", () => schedulePushState());

  threeRenderer.domElement.addEventListener("mousedown", onMouseDown);
  threeRenderer.domElement.addEventListener("mousemove", onMouseMove);
  threeRenderer.domElement.addEventListener("mouseup", onMouseUp3D);
  threeRenderer.domElement.addEventListener("click", onClick);
  threeRenderer.domElement.addEventListener("contextmenu", onContextMenu3D);
  threeRenderer.domElement.addEventListener(
    "webglcontextlost",
    onWebglContextLost,
    false,
  );
  threeRenderer.domElement.addEventListener(
    "webglcontextrestored",
    onWebglContextRestored,
    false,
  );

  effectDisposals.push(
    effect(() => {
      rebuildScene(graphData.value);
    }),
  );

  effectDisposals.push(
    effect(() => {
      const nextIds = selectedIds.value;
      const justSelected = [...nextIds].filter((id) => !rs.selectedIds.has(id));
      rs.selectedIds = nextIds;
      rs.emphasizedIds = emphasizedIds.value;
      rs.hoverNodeId = hoverNodeId.value;
      if (justSelected.length > 0) pulseIds(justSelected);
      singleRender();
    }),
  );

  effectDisposals.push(
    effect(() => {
      if (view.value === "graph" && graphData.value.points.length > 0) {
        startLoop();
      } else {
        stopLoop();
        singleRender();
      }
    }),
  );

  effectDisposals.push(
    effect(() => {
      void trajectoryOverlayVisible.value;
      rebuildOverlayLines();
      rebuildGhostNodes();
      singleRender();
    }),
  );

  effectDisposals.push(
    effect(() => {
      void trajectoryHighlightActive.value;
      singleRender();
    }),
  );

  effectDisposals.push(
    effect(() => {
      void showClusterHulls.value;
      void graphData.value;
      singleRender();
    }),
  );

  effectDisposals.push(
    effect(() => {
      void snap3d.value;
      rebuildGhostNodes();
      singleRender();
    }),
  );

  effectDisposals.push(
    effect(() => {
      void operationResult.value;
      rebuildAxis3D();
      singleRender();
    }),
  );

  effectDisposals.push(
    effect(() => {
      const cfg = operationConfig.value;
      if (probeSphere3D) {
        scene?.remove(probeSphere3D);
        probeSphere3D.geometry.dispose();
        (probeSphere3D.material as THREE.Material).dispose();
        probeSphere3D = null;
      }
      if (cfg.operation === "latent_probe" && scene) {
        let px: number | null = null;
        let py: number | null = null;
        let pz: number | null = null;
        if (
          cfg.probe_mode === "3d" &&
          cfg.probe_coords &&
          cfg.probe_coords.length >= 3
        ) {
          [px, py, pz] = cfg.probe_coords;
        } else if (
          cfg.probe_mode === "2d" &&
          cfg.probe_cross_coords &&
          cfg.probe_cross_coords.length >= 3
        ) {
          const [gx, gy, gz] = cfg.probe_cross_coords;
          px = ((gx - isoCenter.x) / isoSpan) * 2;
          py = ((gy - isoCenter.y) / isoSpan) * 2;
          pz = ((gz - isoCenter.z) / isoSpan) * 2;
        }
        if (px !== null) {
          const geo = new THREE.SphereGeometry(0.04, 12, 8);
          probeSphere3D = new THREE.Mesh(
            geo,
            new THREE.MeshBasicMaterial({ color: C_SELECTED_NUM }),
          );
          probeSphere3D.position.set(px, py!, pz!);
          scene.add(probeSphere3D);
        }
      }
      singleRender();
    }),
  );
}

// GPU context can be lost/restored when re-mounting the 3D view (e.g. right after the
// previous session's forceContextLoss()); without this, Three.js may leave dynamically
// updated BufferAttributes (ghost/point colors) out of sync with the new GPU buffers
function onWebglContextLost(e: Event): void {
  e.preventDefault();
  stopLoop();
}

function onWebglContextRestored(): void {
  rebuildScene(graphData.value);
  rebuildOverlayLines();
  rebuildGhostNodes();
  rebuildAxis3D();
  if (view.value === "graph" && graphData.value.points.length > 0) startLoop();
  singleRender();
}

export function destroyRenderer(): void {
  for (const d of effectDisposals) d();
  effectDisposals.length = 0;
  stopLoop();
  threeRenderer?.domElement.removeEventListener("mousedown", onMouseDown);
  threeRenderer?.domElement.removeEventListener("mousemove", onMouseMove);
  threeRenderer?.domElement.removeEventListener("mouseup", onMouseUp3D);
  threeRenderer?.domElement.removeEventListener("click", onClick);
  threeRenderer?.domElement.removeEventListener("contextmenu", onContextMenu3D);
  threeRenderer?.domElement.removeEventListener(
    "webglcontextlost",
    onWebglContextLost,
  );
  threeRenderer?.domElement.removeEventListener(
    "webglcontextrestored",
    onWebglContextRestored,
  );
  resetInteractions3D();
  if (container && threeRenderer?.domElement.parentNode === container) {
    container.removeChild(threeRenderer.domElement);
  }
  controls?.dispose();
  disposeAndRemoveLines();
  disposeAndRemoveGhostNodes();
  if (probeSphere3D) {
    probeSphere3D.geometry.dispose();
    (probeSphere3D.material as THREE.Material).dispose();
    probeSphere3D = null;
  }
  if (pointCloud) {
    pointCloud.geometry.dispose();
    (pointCloud.material as THREE.Material).dispose();
  }
  if (gridHelper) {
    gridHelper.geometry.dispose();
    const gm = Array.isArray(gridHelper.material)
      ? gridHelper.material
      : [gridHelper.material];
    for (const m of gm) (m as THREE.LineBasicMaterial).dispose();
    gridHelper = null;
  }
  threeRenderer?.forceContextLoss();
  threeRenderer?.dispose();

  threeRenderer = null;
  scene = null;
  camera = null;
  controls = null;
  pointCloud = null;
  if (container) container.style.position = "";
  container = null;
  nodeIds = [];
  basePositions = new Float32Array(0);
  baseRGB = new Float32Array(0);
  pulses.clear();
  disposeAxis3D();
  for (const div of selectedLabelDivs.values()) div.remove();
  selectedLabelDivs.clear();
  if (probeLabelDiv) {
    probeLabelDiv.remove();
    probeLabelDiv = null;
  }
}

export function sigmaRefresh(): void {
  singleRender();
}

export function resizeRenderer(): void {
  if (!threeRenderer || !container || !camera) return;
  const w = container.clientWidth || 600;
  const h = container.clientHeight || 400;
  threeRenderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  singleRender();
}

export function getCameraState(): { x: number; y: number; ratio: number } {
  return { x: 0, y: 0, ratio: 1 };
}

export function applySigmaViewport(_vp: {
  x: number;
  y: number;
  ratio: number;
}): void {
  // noop - 3D camera not restored from 2D viewport state
}

export function fitCamera(): void {
  if (!controls || !camera) return;
  const n = basePositions.length / 3;
  if (n === 0) {
    camera.position.set(0.6, 0.5, 2.2);
    controls.target.set(0, 0, 0);
  } else {
    let cx = 0;
    let cy = 0;
    let cz = 0;
    for (let i = 0; i < n; i++) {
      cx += basePositions[i * 3];
      cy += basePositions[i * 3 + 1];
      cz += basePositions[i * 3 + 2];
    }
    cx /= n;
    cy /= n;
    cz /= n;
    let maxR = 0;
    for (let i = 0; i < n; i++) {
      const dx = basePositions[i * 3] - cx;
      const dy = basePositions[i * 3 + 1] - cy;
      const dz = basePositions[i * 3 + 2] - cz;
      maxR = Math.max(maxR, Math.sqrt(dx * dx + dy * dy + dz * dz));
    }
    // FOV=55 -> tan(27.5deg) ~= 0.52; 30% margin; angled for depth perception
    const dist = (maxR / Math.tan(((55 / 2) * Math.PI) / 180)) * 1.3;
    controls.target.set(cx, cy, cz);
    camera.position.set(cx + dist * 0.28, cy + dist * 0.2, cz + dist);
  }
  camera.lookAt(controls.target);
  controls.update();
  singleRender();
}

export function addOverlayEdges(): void {
  rebuildOverlayLines();
  rebuildGhostNodes();
}

export function highlightGhostStep(stepId: string | null): void {
  setHighlightedGhostId(stepId);
  singleRender();
}

export function pulseIds(ids: string[]): void {
  fillPulseMap(ids, pulses);
}

export function pulseOperationResult(result: NelsOperationResult | null): void {
  fillPulseMap(extractResultPointIds(result), pulses);
}

export function setHullCanvas(canvas: HTMLCanvasElement): void {
  hullCanvas = canvas;
}

// ---- scene building ----

function rebuildScene(gd: typeof graphData.value): void {
  if (!scene) return;

  if (pointCloud) {
    scene.remove(pointCloud);
    pointCloud.geometry.dispose();
    (pointCloud.material as THREE.Material).dispose();
    pointCloud = null;
  }
  disposeAndRemoveLines();

  const points = gd.points;
  if (!points.length) {
    singleRender();
    return;
  }

  const bounds = gd.bounds;
  const zs = points.map((p) => Number((p.view_coords as number[])[2] ?? 0));
  const minZ = Math.min(...zs);
  const maxZ = Math.max(...zs);
  zBounds = {
    min: minZ === maxZ ? minZ - 1 : minZ,
    max: minZ === maxZ ? maxZ + 1 : maxZ,
  };

  nodeIds = points.map((p) => String(p.id));
  basePositions = new Float32Array(points.length * 3);
  baseRGB = new Float32Array(points.length * 3);

  // Isotropic normalization: same scale on all 3 axes so relative distances are preserved
  isoCenter.x = (bounds.minX + bounds.maxX) / 2;
  isoCenter.y = (bounds.minY + bounds.maxY) / 2;
  isoCenter.z = (zBounds.min + zBounds.max) / 2;
  isoSpan = Math.max(
    bounds.maxX - bounds.minX,
    bounds.maxY - bounds.minY,
    zBounds.max - zBounds.min,
    0.001,
  );

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const nx = ((Number(p.view_coords[0]) - isoCenter.x) / isoSpan) * 2;
    const ny = ((Number(p.view_coords[1]) - isoCenter.y) / isoSpan) * 2;
    const nz =
      ((Number((p.view_coords as number[])[2] ?? 0) - isoCenter.z) / isoSpan) *
      2;
    basePositions[i * 3] = nx;
    basePositions[i * 3 + 1] = ny;
    basePositions[i * 3 + 2] = nz;
    const [r, g, b] = hexTo01(pointColor(p, nx, ny, 72));
    baseRGB[i * 3] = r;
    baseRGB[i * 3 + 1] = g;
    baseRGB[i * 3 + 2] = b;
  }

  const geo = new THREE.BufferGeometry();
  const posAttr = new THREE.BufferAttribute(basePositions.slice(), 3);
  posAttr.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute("position", posAttr);
  const colAttr = new THREE.BufferAttribute(baseRGB.slice(), 3);
  colAttr.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute("color", colAttr);

  const mat = new THREE.PointsMaterial({
    size: 0.11,
    sizeAttenuation: true,
    vertexColors: true,
    map: circleTexture,
    alphaTest: 0.08,
    transparent: false,
  });
  pointCloud = new THREE.Points(geo, mat);
  scene.add(pointCloud);

  rebuildOverlayLines();
  rebuildGhostNodes();
  singleRender();
}

// ---- render loop ----

function startLoop(): void {
  if (animRaf) return;
  const loop = (): void => {
    if (!threeRenderer || !scene || !camera || view.value !== "graph") {
      animRaf = null;
      return;
    }
    controls?.update();
    updatePointCloud(performance.now() / 1000, animationEnabled.value);
    threeRenderer.render(scene, camera);
    drawClusterHulls3D();
    animRaf = requestAnimationFrame(loop);
  };
  animRaf = requestAnimationFrame(loop);
}

function stopLoop(): void {
  if (!animRaf) return;
  cancelAnimationFrame(animRaf);
  animRaf = null;
  restoreBasePositions();
}

function singleRender(): void {
  if (animRaf || !threeRenderer || !scene || !camera) return;
  updatePointCloud(0, false);
  controls?.update();
  threeRenderer.render(scene, camera);
  drawClusterHulls3D();
}

function restoreBasePositions(): void {
  if (!pointCloud || !nodeIds.length) return;
  const posAttr = pointCloud.geometry.getAttribute(
    "position",
  ) as THREE.BufferAttribute;
  for (let i = 0; i < nodeIds.length; i++) {
    posAttr.setXYZ(
      i,
      basePositions[i * 3],
      basePositions[i * 3 + 1],
      basePositions[i * 3 + 2],
    );
  }
  posAttr.needsUpdate = true;
}

function updatePointCloud(t: number, animate: boolean): void {
  if (!pointCloud || !nodeIds.length) return;
  const posAttr = pointCloud.geometry.getAttribute(
    "position",
  ) as THREE.BufferAttribute;
  const colAttr = pointCloud.geometry.getAttribute(
    "color",
  ) as THREE.BufferAttribute;

  const wx = new Float32Array(nodeIds.length);
  const wy = new Float32Array(nodeIds.length);
  const wz = new Float32Array(nodeIds.length);

  for (let i = 0; i < nodeIds.length; i++) {
    const id = nodeIds[i];
    let ax = basePositions[i * 3];
    let ay = basePositions[i * 3 + 1];
    let az = basePositions[i * 3 + 2];
    if (animate) {
      const h = hashString(id);
      const { dx, dy } = ambientJitterXY(h, t);
      const pz =
        ((Math.imul(h, 0x9e3779b9) >>> 0) & 0xffff) * ((Math.PI * 2) / 0xffff);
      ax += dx;
      ay += dy;
      az +=
        Math.sin(t * 0.5 + pz) * 0.015 + Math.sin(t * 0.3 + pz + 0.8) * 0.01;
    }
    wx[i] = ax;
    wy[i] = ay;
    wz[i] = az;
    posAttr.setXYZ(i, ax, ay, az);
    const [r, g, b] = nodeColor(i, id, t, baseRGB, rs, pulses);
    colAttr.setXYZ(i, r, g, b);
  }
  posAttr.needsUpdate = true;
  colAttr.needsUpdate = true;

  updateOverlayAnimation(wx, wy, wz);
  updateGhostAnimation(wx, wy, wz, t, animate);

  // Selected node labels: one pill per selected node, projected to screen each frame
  if (camera && container) {
    for (const [id, div] of selectedLabelDivs) {
      if (!rs.selectedIds.has(id)) {
        div.remove();
        selectedLabelDivs.delete(id);
      }
    }
    for (const selId of rs.selectedIds) {
      const selIdx = nodeIds.indexOf(selId);
      if (selIdx < 0) continue;
      if (rs.hoverNodeId === selId) {
        const div = selectedLabelDivs.get(selId);
        if (div) div.style.display = "none";
        continue;
      }
      const proj = projectToScreen(wx[selIdx], wy[selIdx], wz[selIdx]);
      let div = selectedLabelDivs.get(selId);
      if (!div) {
        div = createSelectedLabelDiv();
        container.appendChild(div);
        selectedLabelDivs.set(selId, div);
      }
      if (proj) {
        if (div.dataset.id !== selId) {
          div.textContent = graphData.value.byId.get(selId)?.label ?? selId;
          div.dataset.id = selId;
        }
        div.style.left = `${proj.x + 8}px`;
        div.style.top = `${proj.y - 28}px`;
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    }
  }

  // Latent probe selected label - probe isnt part of nodeIds, handled separately
  if (camera && container) {
    if (
      probeSphere3D &&
      rs.selectedIds.has("probe") &&
      rs.hoverNodeId !== "probe"
    ) {
      if (!probeLabelDiv) {
        probeLabelDiv = createSelectedLabelDiv();
        container.appendChild(probeLabelDiv);
      }
      const p = probeSphere3D.position;
      const proj = projectToScreen(p.x, p.y, p.z);
      if (proj) {
        const recon =
          operationResult.value?.operation === "latent_probe"
            ? operationResult.value?.text_reconstruction
            : undefined;
        probeLabelDiv.textContent = recon?.text ?? "Latent Space Probe";
        probeLabelDiv.style.left = `${proj.x + 8}px`;
        probeLabelDiv.style.top = `${proj.y - 28}px`;
        probeLabelDiv.style.display = "block";
      } else {
        probeLabelDiv.style.display = "none";
      }
    } else if (probeLabelDiv) {
      probeLabelDiv.style.display = "none";
    }
  }

  updateAxisLabels();
}

function createSelectedLabelDiv(): HTMLDivElement {
  return createLabelDiv({
    textColor: "#facc15",
    borderColor: "rgba(250,204,21,0.6)",
    shadowColor: "rgba(250,204,21,0.2)",
    shadowBlur: 6,
    zIndex: 9,
    truncate: true,
  });
}

/** Create an absolutely-positioned, bordered "pill" div for 3D hover/selection tooltips */
export function createLabelDiv(options: {
  textColor?: string;
  borderColor: string;
  shadowColor: string;
  shadowBlur?: number;
  zIndex?: number;
  truncate?: boolean;
  initiallyHidden?: boolean;
}): HTMLDivElement {
  const div = document.createElement("div");
  const display = options.initiallyHidden === false ? "" : "display:none;";
  const truncateCss = options.truncate
    ? "max-width:300px;overflow:hidden;text-overflow:ellipsis;"
    : "";
  div.style.cssText =
    `position:absolute;pointer-events:none;${display}background:#0f1a28;color:${options.textColor ?? "#e8f0f8"};` +
    `border:1.5px solid ${options.borderColor};border-radius:4px;padding:3px 8px;` +
    `font:11px ui-monospace,monospace;white-space:nowrap;${truncateCss}` +
    `box-shadow:0 0 ${options.shadowBlur ?? 8}px ${options.shadowColor};z-index:${options.zIndex ?? 10};`;
  return div;
}

function drawClusterHulls3D(): void {
  if (!hullCanvas) return;
  const ctx = hullCanvas.getContext("2d");
  if (!ctx) return;
  const w = hullCanvas.offsetWidth;
  const h = hullCanvas.offsetHeight;
  hullCanvas.width = w;
  hullCanvas.height = h;
  ctx.clearRect(0, 0, w, h);
  if (!camera || !nodeIds.length) return;

  const tmp = new THREE.Vector3();
  const livePosAttr = pointCloud?.geometry.getAttribute("position") as
    | THREE.BufferAttribute
    | undefined;

  if (showClusterHulls.value) {
    const points = graphData.value.points;
    const byCluster = new Map<string, { x: number; y: number }[]>();
    for (const p of points) {
      const cg = p.metadata?.cluster_global;
      if (cg === undefined || cg === null || p.metadata?.is_noise) continue;
      const idx = nodeIds.indexOf(String(p.id));
      if (idx < 0) continue;
      if (livePosAttr) {
        tmp.set(
          livePosAttr.getX(idx),
          livePosAttr.getY(idx),
          livePosAttr.getZ(idx),
        );
      } else {
        tmp.set(
          basePositions[idx * 3],
          basePositions[idx * 3 + 1],
          basePositions[idx * 3 + 2],
        );
      }
      tmp.project(camera);
      const sx = ((tmp.x + 1) / 2) * w;
      const sy = ((1 - tmp.y) / 2) * h;
      const key = String(cg);
      const arr = byCluster.get(key) ?? [];
      arr.push({ x: sx, y: sy });
      byCluster.set(key, arr);
    }
    drawClusterHullsOnCanvas(ctx, byCluster);
  }
}
