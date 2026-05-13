import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { effect } from "@preact/signals";
import type { NelsOperationResult } from "../api/types.js";
import { graphData } from "../state/graph.js";
import { operationResult } from "../state/operation.js";
import { view, animationEnabled } from "../state/events.js";
import {
  selectedIds,
  emphasizedIds,
  hoverNodeId,
  hoverPoint,
  selectNode,
  clearSelection,
} from "../state/selection.js";
import { schedulePushState } from "../state/session.js";
import { hslToHex, clusterColor } from "./colors.js";

let threeRenderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let controls: OrbitControls | null = null;
let pointCloud: THREE.Points | null = null;
let edgeLines: THREE.LineSegments | null = null;
let overlayLines: THREE.LineSegments | null = null;
let animRaf: number | null = null;
let container: HTMLElement | null = null;

let nodeIds: string[] = [];
let basePositions: Float32Array = new Float32Array(0);
// Pre-converted base colors as r,g,b 0-1 triples
let baseRGB: Float32Array = new Float32Array(0);
let zBounds = { min: -1, max: 1 };
// [si, ti] index pairs for each edge — used to recolor edges and animate positions
let edgeEndpoints: Array<[number, number]> = [];
let overlayEndpoints: Array<[number, number]> = [];

const pulses = new Map<string, number>();
const effectDisposals: (() => void)[] = [];

const rs = {
  selectedIds: new Set<string>(),
  emphasizedIds: new Set<string>(),
  hoverNodeId: null as string | null,
};

// Circular disc texture — created once, shared across all point cloud materials
function makeCircleTexture(): THREE.Texture {
  const sz = 128;
  const canvas = document.createElement("canvas");
  canvas.width = sz;
  canvas.height = sz;
  const ctx = canvas.getContext("2d")!;
  const r = sz / 2;
  const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.65, "rgba(255,255,255,0.97)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, sz, sz);
  return new THREE.CanvasTexture(canvas);
}
const circleTexture = makeCircleTexture();

// Reusable raycaster — threshold set once, reused every frame
const _raycaster = new THREE.Raycaster();
_raycaster.params.Points = { threshold: 0.025 };
const _mouseNDC = new THREE.Vector2();

// --- Public API (same as renderer2d.ts) ---

export function initRenderer(el: HTMLElement): void {
  if (threeRenderer) return;
  container = el;

  threeRenderer = new THREE.WebGLRenderer({ antialias: true });
  threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  threeRenderer.setSize(el.clientWidth || 600, el.clientHeight || 400);
  threeRenderer.setClearColor(0x05090f, 1);
  el.appendChild(threeRenderer.domElement);

  scene = new THREE.Scene();

  const w = el.clientWidth || 600;
  const h = el.clientHeight || 400;
  camera = new THREE.PerspectiveCamera(60, w / h, 0.001, 100);
  camera.position.set(0, 0, 1.5);

  controls = new OrbitControls(camera, threeRenderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.addEventListener("end", () => schedulePushState());

  threeRenderer.domElement.addEventListener("mousemove", onMouseMove);
  threeRenderer.domElement.addEventListener("click", onClick);

  effectDisposals.push(
    effect(() => {
      const gd = graphData.value;
      rebuildScene(gd);
    }),
  );

  effectDisposals.push(
    effect(() => {
      rs.selectedIds = selectedIds.value;
      rs.emphasizedIds = emphasizedIds.value;
      rs.hoverNodeId = hoverNodeId.value;
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
}

export function destroyRenderer(): void {
  for (const d of effectDisposals) d();
  effectDisposals.length = 0;
  stopLoop();
  threeRenderer?.domElement.removeEventListener("mousemove", onMouseMove);
  threeRenderer?.domElement.removeEventListener("click", onClick);
  if (container && threeRenderer?.domElement.parentNode === container) {
    container.removeChild(threeRenderer.domElement);
  }
  controls?.dispose();
  disposeLines(edgeLines);
  disposeLines(overlayLines);
  if (pointCloud) {
    pointCloud.geometry.dispose();
    (pointCloud.material as THREE.Material).dispose();
  }
  threeRenderer?.dispose();

  threeRenderer = null;
  scene = null;
  camera = null;
  controls = null;
  pointCloud = null;
  edgeLines = null;
  overlayLines = null;
  container = null;
  nodeIds = [];
  basePositions = new Float32Array(0);
  baseRGB = new Float32Array(0);
  edgeEndpoints = [];
  overlayEndpoints = [];
  pulses.clear();
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
  // noop — 3D camera not restored from 2D viewport state
}

export function fitCamera(): void {
  if (!controls || !camera) return;
  controls.reset();
  camera.position.set(0, 0, 1.5);
  camera.lookAt(0, 0, 0);
  controls.update();
  singleRender();
}

export function addOverlayEdges(): void {
  rebuildOverlayLines();
}

export function pulseIds(ids: string[]): void {
  const until = Date.now() + 1100;
  for (const id of ids) if (id) pulses.set(id, until);
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

export function getSigma(): null {
  return null;
}

// --- Scene building ---

function rebuildScene(gd: typeof graphData.value): void {
  if (!scene) return;

  if (pointCloud) {
    scene.remove(pointCloud);
    pointCloud.geometry.dispose();
    (pointCloud.material as THREE.Material).dispose();
    pointCloud = null;
  }
  disposeAndRemoveLines("edge");
  disposeAndRemoveLines("overlay");

  const points = gd.points;
  if (!points.length) {
    singleRender();
    return;
  }

  const bounds = gd.bounds;
  const zs = points.map((p) => Number((p.coords as number[])[2] ?? 0));
  const minZ = Math.min(...zs);
  const maxZ = Math.max(...zs);
  zBounds = {
    min: minZ === maxZ ? minZ - 1 : minZ,
    max: minZ === maxZ ? maxZ + 1 : maxZ,
  };

  nodeIds = points.map((p) => String(p.id));
  basePositions = new Float32Array(points.length * 3);
  baseRGB = new Float32Array(points.length * 3);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const nx =
      (Number(p.coords[0]) - bounds.minX) / (bounds.maxX - bounds.minX) - 0.5;
    const ny =
      (Number(p.coords[1]) - bounds.minY) / (bounds.maxY - bounds.minY) - 0.5;
    const nz =
      (Number((p.coords as number[])[2] ?? 0) - zBounds.min) /
        (zBounds.max - zBounds.min) -
      0.5;
    basePositions[i * 3 + 0] = nx;
    basePositions[i * 3 + 1] = ny;
    basePositions[i * 3 + 2] = nz;
    const [r, g, b] = hexTo01(clusterColor(p, nx, ny));
    baseRGB[i * 3 + 0] = r;
    baseRGB[i * 3 + 1] = g;
    baseRGB[i * 3 + 2] = b;
  }

  // Point cloud geometry
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

  // KNN edges
  const edgePos: number[] = [];
  const edgeCol: number[] = [];
  edgeEndpoints = [];
  overlayEndpoints = [];
  const idxMap = new Map(nodeIds.map((id, i) => [id, i]));
  for (const edge of gd.edges) {
    const si = idxMap.get(String(edge.source));
    const ti = idxMap.get(String(edge.target));
    if (si === undefined || ti === undefined) continue;
    edgeEndpoints.push([si, ti]);
    edgePos.push(
      basePositions[si * 3],
      basePositions[si * 3 + 1],
      basePositions[si * 3 + 2],
      basePositions[ti * 3],
      basePositions[ti * 3 + 1],
      basePositions[ti * 3 + 2],
    );
    // Default color
    edgeCol.push(0.22, 0.29, 0.38, 0.22, 0.29, 0.38);
  }
  if (edgePos.length) {
    const egeo = new THREE.BufferGeometry();
    const ePosAttr = new THREE.Float32BufferAttribute(edgePos, 3);
    ePosAttr.setUsage(THREE.DynamicDrawUsage);
    egeo.setAttribute("position", ePosAttr);
    const eColAttr = new THREE.Float32BufferAttribute(edgeCol, 3);
    eColAttr.setUsage(THREE.DynamicDrawUsage);
    egeo.setAttribute("color", eColAttr);
    edgeLines = new THREE.LineSegments(
      egeo,
      new THREE.LineBasicMaterial({ vertexColors: true }),
    );
    scene.add(edgeLines);
  }

  rebuildOverlayLines();
  singleRender();
}

function rebuildOverlayLines(): void {
  if (!scene) return;
  disposeAndRemoveLines("overlay");
  overlayEndpoints = [];

  const result = operationResult.value;
  if (!result || result.operation !== "nearest_neighbor") return;

  const idxMap = new Map(nodeIds.map((id, i) => [id, i]));
  const fallbackSourceIds: string[] =
    result.source_point_ids?.map(String) ??
    (result.source_point_id ? [String(result.source_point_id)] : []);
  const positions: number[] = [];

  for (const neighbor of result.neighbors ?? []) {
    const pid = String(neighbor.point_id ?? neighbor.id ?? "");
    if (!pid) continue;
    // Per-neighbor query_id (multi-point NN) or fall back to all source IDs
    const querySids = neighbor.query_id
      ? [String(neighbor.query_id)]
      : fallbackSourceIds;
    for (const sid of querySids) {
      const si = idxMap.get(sid);
      const ti = idxMap.get(pid);
      if (si === undefined || ti === undefined) continue;
      overlayEndpoints.push([si, ti]);
      positions.push(
        basePositions[si * 3],
        basePositions[si * 3 + 1],
        basePositions[si * 3 + 2],
        basePositions[ti * 3],
        basePositions[ti * 3 + 1],
        basePositions[ti * 3 + 2],
      );
    }
  }

  if (!positions.length) return;
  const geo = new THREE.BufferGeometry();
  const oPosAttr = new THREE.Float32BufferAttribute(positions, 3);
  oPosAttr.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute("position", oPosAttr);
  overlayLines = new THREE.LineSegments(
    geo,
    new THREE.LineBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0.75,
    }),
  );
  scene.add(overlayLines);
}

// --- Render loop ---

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

  // Animated world positions per node — reused for edge endpoint updates
  const wx = new Float32Array(nodeIds.length);
  const wy = new Float32Array(nodeIds.length);
  const wz = new Float32Array(nodeIds.length);

  for (let i = 0; i < nodeIds.length; i++) {
    const id = nodeIds[i];
    const bx = basePositions[i * 3];
    const by = basePositions[i * 3 + 1];
    const bz = basePositions[i * 3 + 2];

    let ax = bx,
      ay = by,
      az = bz;
    if (animate) {
      const h = hashString(id);
      const px = (h & 0xffff) * ((Math.PI * 2) / 0xffff);
      const py = (h >>> 16) * ((Math.PI * 2) / 0xffff);
      const pz =
        ((Math.imul(h, 0x9e3779b9) >>> 0) & 0xffff) * ((Math.PI * 2) / 0xffff);
      ax +=
        Math.sin(t * 0.6 + px) * 0.035 + Math.sin(t * 0.35 + px + 1.2) * 0.02;
      ay +=
        Math.cos(t * 0.45 + py) * 0.03 + Math.cos(t * 0.25 + py + 2.1) * 0.015;
      az +=
        Math.sin(t * 0.5 + pz) * 0.015 + Math.sin(t * 0.3 + pz + 0.8) * 0.01;
    }
    wx[i] = ax;
    wy[i] = ay;
    wz[i] = az;
    posAttr.setXYZ(i, ax, ay, az);

    const [r, g, b] = nodeColor(i, id, t);
    colAttr.setXYZ(i, r, g, b);
  }

  posAttr.needsUpdate = true;
  colAttr.needsUpdate = true;

  // Move edge endpoints to follow their nodes animated position
  if (edgeLines && edgeEndpoints.length) {
    const ePosAttr = edgeLines.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    for (let e = 0; e < edgeEndpoints.length; e++) {
      const [si, ti] = edgeEndpoints[e];
      ePosAttr.setXYZ(e * 2, wx[si], wy[si], wz[si]);
      ePosAttr.setXYZ(e * 2 + 1, wx[ti], wy[ti], wz[ti]);
    }
    ePosAttr.needsUpdate = true;
  }

  // Move overlay (nearest-neighbor) edges the same way
  if (overlayLines && overlayEndpoints.length) {
    const oPosAttr = overlayLines.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    for (let e = 0; e < overlayEndpoints.length; e++) {
      const [si, ti] = overlayEndpoints[e];
      oPosAttr.setXYZ(e * 2, wx[si], wy[si], wz[si]);
      oPosAttr.setXYZ(e * 2 + 1, wx[ti], wy[ti], wz[ti]);
    }
    oPosAttr.needsUpdate = true;
  }

  updateEdgeColors();
}

function updateEdgeColors(): void {
  if (!edgeLines || !edgeEndpoints.length) return;
  const colAttr = edgeLines.geometry.getAttribute(
    "color",
  ) as THREE.BufferAttribute;
  const hasCtx = rs.selectedIds.size > 0 || rs.emphasizedIds.size > 0;

  for (let e = 0; e < edgeEndpoints.length; e++) {
    const [si, ti] = edgeEndpoints[e];
    const sId = nodeIds[si];
    const tId = nodeIds[ti];
    let r: number, g: number, b: number;
    if (!hasCtx) {
      r = 0.22;
      g = 0.29;
      b = 0.38;
    } else {
      const active =
        rs.selectedIds.has(sId) ||
        rs.selectedIds.has(tId) ||
        rs.emphasizedIds.has(sId) ||
        rs.emphasizedIds.has(tId);
      if (active) {
        r = 0.37;
        g = 0.62;
        b = 0.74;
      } else {
        r = 0.05;
        g = 0.07;
        b = 0.09;
      }
    }
    colAttr.setXYZ(e * 2, r, g, b);
    colAttr.setXYZ(e * 2 + 1, r, g, b);
  }
  colAttr.needsUpdate = true;
}

// --- Color ---

function nodeColor(i: number, id: string, t: number): [number, number, number] {
  const selected = rs.selectedIds.has(id);
  const hover = rs.hoverNodeId === id;
  const hasCtx =
    rs.selectedIds.size > 0 || rs.emphasizedIds.size > 0 || !!rs.hoverNodeId;
  const emphasized = hasCtx && rs.emphasizedIds.has(id);
  const dim = hasCtx && !selected && !hover && !emphasized;
  const pulseUntil = pulses.get(id) ?? 0;
  const pulsing = pulseUntil > Date.now();

  if (pulsing) {
    const life = (pulseUntil - Date.now()) / 1100;
    return hexTo01(hslToHex(217, 91, Math.round(45 + life * 20)));
  }
  if (selected) return [0.98, 0.8, 0.082]; // #facc15
  if (hover) {
    const [r, g, b] = [baseRGB[i * 3], baseRGB[i * 3 + 1], baseRGB[i * 3 + 2]];
    return [lerp(r, 1, 0.4), lerp(g, 1, 0.4), lerp(b, 1, 0.4)];
  }
  if (emphasized) return [0.49, 0.827, 0.988]; // #7dd3fc
  if (dim) {
    return [
      baseRGB[i * 3] * 0.25,
      baseRGB[i * 3 + 1] * 0.25,
      baseRGB[i * 3 + 2] * 0.25,
    ];
  }

  // Ambient shimmer: per-node phase mixes base color slightly toward white,
  const h = hashString(id);
  const sp = ((h ^ (h >>> 17)) & 0xffff) * ((Math.PI * 2) / 0xffff);
  const shimmer = 0.5 + 0.5 * Math.sin(t * 0.72 + sp);
  const f = 0.02 + shimmer * 0.04;
  const r = baseRGB[i * 3],
    g = baseRGB[i * 3 + 1],
    b = baseRGB[i * 3 + 2];
  return [r + (1 - r) * f, g + (1 - g) * f, b + (1 - b) * f];
}

// --- Interaction ---

function onMouseMove(e: MouseEvent): void {
  if (!threeRenderer || !camera || !pointCloud || !nodeIds.length) return;
  const rect = threeRenderer.domElement.getBoundingClientRect();
  _mouseNDC.set(
    ((e.clientX - rect.left) / rect.width) * 2 - 1,
    -((e.clientY - rect.top) / rect.height) * 2 + 1,
  );
  _raycaster.setFromCamera(_mouseNDC, camera);
  const hits = _raycaster.intersectObject(pointCloud);
  if (hits.length > 0 && hits[0].index !== undefined) {
    const id = nodeIds[hits[0].index];
    if (hoverNodeId.value !== id) {
      hoverNodeId.value = id;
      hoverPoint.value = graphData.value.byId.get(id) ?? null;
      threeRenderer.domElement.style.cursor = "pointer";
    }
  } else if (hoverNodeId.value !== null) {
    hoverNodeId.value = null;
    hoverPoint.value = null;
    threeRenderer.domElement.style.cursor = "";
  }
}

function onClick(e: MouseEvent): void {
  if (!threeRenderer || !camera || !pointCloud || !nodeIds.length) return;
  const rect = threeRenderer.domElement.getBoundingClientRect();
  _mouseNDC.set(
    ((e.clientX - rect.left) / rect.width) * 2 - 1,
    -((e.clientY - rect.top) / rect.height) * 2 + 1,
  );
  _raycaster.setFromCamera(_mouseNDC, camera);
  const hits = _raycaster.intersectObject(pointCloud);
  if (hits.length > 0 && hits[0].index !== undefined) {
    const additive = e.shiftKey || e.ctrlKey || e.metaKey;
    selectNode(nodeIds[hits[0].index], additive);
    schedulePushState();
  } else {
    clearSelection();
    schedulePushState();
  }
}

// --- Helpers ---

// FNV-1a 32-bit — good avalanche for short strings
function hashString(value: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function hexTo01(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function disposeLines(lines: THREE.LineSegments | null): void {
  if (!lines) return;
  lines.geometry.dispose();
  (lines.material as THREE.Material).dispose();
}

function disposeAndRemoveLines(which: "edge" | "overlay"): void {
  if (which === "edge" && edgeLines) {
    scene?.remove(edgeLines);
    disposeLines(edgeLines);
    edgeLines = null;
  }
  if (which === "overlay" && overlayLines) {
    scene?.remove(overlayLines);
    disposeLines(overlayLines);
    overlayLines = null;
  }
}
