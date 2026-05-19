import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { computed, effect } from "@preact/signals";
import type {
  NelsOperationResult,
  TrajectoryOverlayPoint,
} from "../api/types.js";
import { graphData } from "../state/graph.js";
import {
  operationConfig,
  operationResult,
  trajectoryOverlayVisible,
} from "../state/operation.js";
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
let ghostCloud: THREE.Points | null = null;
let ghostTrajectoryLine: THREE.Line | null = null;
let animRaf: number | null = null;
let container: HTMLElement | null = null;

let nodeIds: string[] = [];
let basePositions: Float32Array = new Float32Array(0);
// Pre-converted base colors as r,g,b 0-1 triples
let baseRGB: Float32Array = new Float32Array(0);
let zBounds = { min: -1, max: 1 };
// Canvas coordinate bounds used to normalise ghost node positions into the same space as real nodes
let xyBounds = { minX: -1, maxX: 1, minY: -1, maxY: 1 };
// [si, ti] index pairs for each edge -> used to recolor edges and animate positions
let edgeEndpoints: Array<[number, number]> = [];
let overlayEndpoints: Array<[number, number]> = [];

const pulses = new Map<string, number>();
const effectDisposals: (() => void)[] = [];

const _snap3d = computed(() => operationConfig.value.snap_endpoints);
let ghostBasePositions: Float32Array = new Float32Array(0);
const ghostSnapLinks = new Map<number, number>(); // ghost array index -> real nodeIds index
let ghostValidPts: TrajectoryOverlayPoint[] = [];
let highlightedGhostId: string | null = null;
let ghostTooltip: HTMLDivElement | null = null;
let nodeTooltip: HTMLDivElement | null = null; // label pill for real-node hover
let highlightedGhostLabelDiv: HTMLDivElement | null = null;
const selectedLabelDivs = new Map<string, HTMLDivElement>();

const _projVec = new THREE.Vector3();

const rs = {
  selectedIds: new Set<string>(),
  emphasizedIds: new Set<string>(),
  hoverNodeId: null as string | null,
};

// Circular disc texture -> created once, shared across all point cloud materials
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

// Reusable raycaster -> threshold set once, reused every frame
const _raycaster = new THREE.Raycaster();
_raycaster.params.Points = { threshold: 0.025 };
const _mouseNDC = new THREE.Vector2();

let _mouseDownX = 0;
let _mouseDownY = 0;
const DRAG_THRESHOLD_PX = 5;

// --- Public API ---

export function initRenderer(el: HTMLElement): void {
  if (threeRenderer) return;
  container = el;

  ghostTooltip = document.createElement("div");
  ghostTooltip.style.cssText =
    "position:absolute;pointer-events:none;display:none;background:#0f1a28;color:#e8f0f8;" +
    "border:1.5px solid rgba(251,146,60,0.7);border-radius:4px;padding:3px 8px;" +
    "font:11px ui-monospace,monospace;white-space:nowrap;box-shadow:0 0 8px rgba(251,146,60,0.35);z-index:10;";
  el.appendChild(ghostTooltip);

  nodeTooltip = document.createElement("div");
  nodeTooltip.style.cssText =
    "position:absolute;pointer-events:none;display:none;background:#0f1a28;color:#e8f0f8;" +
    "border:1.5px solid rgba(160,210,255,0.65);border-radius:4px;padding:3px 8px;" +
    "font:11px ui-monospace,monospace;white-space:nowrap;max-width:300px;overflow:hidden;" +
    "text-overflow:ellipsis;box-shadow:0 0 8px rgba(100,180,255,0.25);z-index:10;";
  el.appendChild(nodeTooltip);

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

  threeRenderer.domElement.addEventListener("mousedown", onMouseDown);
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
      const nextIds = selectedIds.value;
      // Pulse nodes that just became selected so they flash visibly
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

  // Rebuild ghost nodes whenever the overlay toggle or snap setting changes.
  effectDisposals.push(
    effect(() => {
      void trajectoryOverlayVisible.value; // explicit dependency
      rebuildGhostNodes();
      singleRender();
    }),
  );

  effectDisposals.push(
    effect(() => {
      void _snap3d.value; // explicit dependency -> only fires when snap_endpoints changes
      rebuildGhostNodes();
      singleRender();
    }),
  );
}

export function destroyRenderer(): void {
  for (const d of effectDisposals) d();
  effectDisposals.length = 0;
  stopLoop();
  threeRenderer?.domElement.removeEventListener("mousedown", onMouseDown);
  threeRenderer?.domElement.removeEventListener("mousemove", onMouseMove);
  threeRenderer?.domElement.removeEventListener("click", onClick);
  if (container && threeRenderer?.domElement.parentNode === container) {
    container.removeChild(threeRenderer.domElement);
  }
  controls?.dispose();
  disposeLines(edgeLines);
  disposeLines(overlayLines);
  disposeAndRemoveGhostNodes();
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
  ghostBasePositions = new Float32Array(0);
  ghostSnapLinks.clear();
  ghostValidPts = [];
  if (ghostTooltip) {
    ghostTooltip.remove();
    ghostTooltip = null;
  }
  if (nodeTooltip) {
    nodeTooltip.remove();
    nodeTooltip = null;
  }
  if (highlightedGhostLabelDiv) {
    highlightedGhostLabelDiv.remove();
    highlightedGhostLabelDiv = null;
  }
  for (const div of selectedLabelDivs.values()) div.remove();
  selectedLabelDivs.clear();
  highlightedGhostId = null;
  if (container) container.style.position = "";
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
  // noop -> 3D camera not restored from 2D viewport state
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
  rebuildGhostNodes();
}

export function highlightGhostStep(stepId: string | null): void {
  highlightedGhostId = stepId;
  singleRender();
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

  xyBounds = {
    minX: bounds.minX,
    maxX: bounds.maxX,
    minY: bounds.minY,
    maxY: bounds.maxY,
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
  rebuildGhostNodes();
  singleRender();
}

function rebuildOverlayLines(): void {
  if (!scene) return;
  disposeAndRemoveLines("overlay");
  overlayEndpoints = [];

  const result = operationResult.value;
  if (!result) return;

  const op = result.operation;
  const idxMap = new Map(nodeIds.map((id, i) => [id, i]));
  const positions: number[] = [];
  const colors: number[] = [];

  // Nearest-neighbor yellow edges
  if (op === "nearest_neighbor") {
    const fallbackSourceIds: string[] =
      result.source_point_ids?.map(String) ??
      (result.source_point_id ? [String(result.source_point_id)] : []);

    for (const neighbor of result.neighbors ?? []) {
      const pid = String(neighbor.point_id ?? neighbor.id ?? "");
      if (!pid) continue;
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
        colors.push(0.98, 0.8, 0.082, 0.98, 0.8, 0.082); // yellow #facc15
      }
    }
  }

  // LERP / SLERP arc (orange)
  if (op === "lerp" || op === "slerp") {
    const [src0, src1] = (result.source_point_ids ?? []).map(String);
    const si = idxMap.get(src0);
    const ti = src1 ? idxMap.get(src1) : undefined;
    if (si !== undefined && ti !== undefined) {
      overlayEndpoints.push([si, ti]);
      positions.push(
        basePositions[si * 3],
        basePositions[si * 3 + 1],
        basePositions[si * 3 + 2],
        basePositions[ti * 3],
        basePositions[ti * 3 + 1],
        basePositions[ti * 3 + 2],
      );
      colors.push(0.98, 0.57, 0.24, 0.98, 0.57, 0.24); // orange #fb923c
    }
  }

  // Delta-walk direction arrow (teal)
  if (op === "delta_walk") {
    const [src0, src1] = (result.source_point_ids ?? []).map(String);
    const si = idxMap.get(src0);
    const ti = src1 ? idxMap.get(src1) : undefined;
    if (si !== undefined && ti !== undefined) {
      overlayEndpoints.push([si, ti]);
      positions.push(
        basePositions[si * 3],
        basePositions[si * 3 + 1],
        basePositions[si * 3 + 2],
        basePositions[ti * 3],
        basePositions[ti * 3 + 1],
        basePositions[ti * 3 + 2],
      );
      colors.push(0.18, 0.83, 0.75, 0.18, 0.83, 0.75); // teal #2dd4bf
    }
  }

  if (!positions.length) return;
  const geo = new THREE.BufferGeometry();
  const oPosAttr = new THREE.Float32BufferAttribute(positions, 3);
  oPosAttr.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute("position", oPosAttr);
  const oColAttr = new THREE.Float32BufferAttribute(colors, 3);
  geo.setAttribute("color", oColAttr);
  overlayLines = new THREE.LineSegments(
    geo,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
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

  // Animated world positions per node -> reused for edge endpoint updates
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

  // Ghost nodes: breathing animation + snap-following
  if (ghostCloud) {
    const gCount = ghostBasePositions.length / 3;
    if (gCount > 0) {
      if (animate) {
        const breath = 0.5 + 0.5 * Math.sin(t * 0.7);
        const shimmer = 0.5 + 0.5 * Math.sin(t * 0.5 + 1.3);
        const mat = ghostCloud.material as THREE.PointsMaterial;
        mat.size = 0.05 + breath * 0.035;
        mat.opacity = 0.28 + shimmer * 0.38;
      }
      const gPosAttr = ghostCloud.geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      for (let g = 0; g < gCount; g++) {
        const anchorIdx = ghostSnapLinks.get(g);
        if (anchorIdx !== undefined) {
          gPosAttr.setXYZ(g, wx[anchorIdx], wy[anchorIdx], wz[anchorIdx]);
        } else {
          gPosAttr.setXYZ(
            g,
            ghostBasePositions[g * 3],
            ghostBasePositions[g * 3 + 1],
            ghostBasePositions[g * 3 + 2],
          );
        }
      }
      gPosAttr.needsUpdate = true;
      if (ghostTrajectoryLine) {
        const lPosAttr = ghostTrajectoryLine.geometry.getAttribute(
          "position",
        ) as THREE.BufferAttribute;
        for (let g = 0; g < gCount; g++) {
          lPosAttr.setXYZ(
            g,
            gPosAttr.getX(g),
            gPosAttr.getY(g),
            gPosAttr.getZ(g),
          );
        }
        lPosAttr.needsUpdate = true;
      }

      // Per-node ghost color: highlighted step -> yellow, rest -> orange
      const gColAttr = ghostCloud.geometry.getAttribute(
        "color",
      ) as THREE.BufferAttribute;
      let hIdx = -1;
      for (let g = 0; g < gCount; g++) {
        const isHighlighted =
          highlightedGhostId !== null &&
          ghostValidPts[g]?.id === highlightedGhostId;
        if (isHighlighted) {
          gColAttr.setXYZ(g, 0.98, 0.8, 0.082); // #facc15 yellow
          hIdx = g;
        } else {
          gColAttr.setXYZ(g, 0.98, 0.57, 0.24); // #fb923c orange
        }
      }
      gColAttr.needsUpdate = true;

      // Floating label for highlighted ghost node -> projected to screen each frame
      if (camera && container) {
        if (hIdx >= 0) {
          const proj = _projectToScreen(
            gPosAttr.getX(hIdx),
            gPosAttr.getY(hIdx),
            gPosAttr.getZ(hIdx),
          );
          if (!highlightedGhostLabelDiv) {
            highlightedGhostLabelDiv = document.createElement("div");
            highlightedGhostLabelDiv.style.cssText =
              "position:absolute;pointer-events:none;background:#0f1a28;color:#facc15;" +
              "border:1.5px solid rgba(250,204,21,0.6);border-radius:4px;padding:3px 8px;" +
              "font:11px ui-monospace,monospace;white-space:nowrap;box-shadow:0 0 6px rgba(250,204,21,0.2);z-index:10;";
            container.appendChild(highlightedGhostLabelDiv);
          }
          highlightedGhostLabelDiv.textContent = `t=${ghostValidPts[hIdx].alpha.toFixed(2)}`;
          if (proj) {
            highlightedGhostLabelDiv.style.left = `${proj.x + 8}px`;
            highlightedGhostLabelDiv.style.top = `${proj.y - 28}px`;
            highlightedGhostLabelDiv.style.display = "block";
          } else {
            highlightedGhostLabelDiv.style.display = "none";
          }
        } else if (highlightedGhostLabelDiv) {
          highlightedGhostLabelDiv.style.display = "none";
        }
      }
    }
  } else if (highlightedGhostLabelDiv) {
    highlightedGhostLabelDiv.style.display = "none";
  }

  // Selected node labels: one yellow pill per selected node, projected to screen each frame
  if (camera && container) {
    // Remove divs for nodes that are no longer selected
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
      const proj = _projectToScreen(wx[selIdx], wy[selIdx], wz[selIdx]);
      let div = selectedLabelDivs.get(selId);
      if (!div) {
        div = _createSelectedLabelDiv();
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

  updateEdgeColors();
}

function _createSelectedLabelDiv(): HTMLDivElement {
  const div = document.createElement("div");
  div.style.cssText =
    "position:absolute;pointer-events:none;display:none;background:#0f1a28;color:#facc15;" +
    "border:1.5px solid rgba(250,204,21,0.6);border-radius:4px;padding:3px 8px;" +
    "font:11px ui-monospace,monospace;white-space:nowrap;max-width:300px;overflow:hidden;" +
    "text-overflow:ellipsis;box-shadow:0 0 6px rgba(250,204,21,0.2);z-index:9;";
  return div;
}

function _projectToScreen(
  wx: number,
  wy: number,
  wz: number,
): { x: number; y: number } | null {
  if (!camera || !container) return null;
  _projVec.set(wx, wy, wz).project(camera);
  if (_projVec.z > 1) return null; // behind or beyond far plane
  const w = container.clientWidth;
  const h = container.clientHeight;
  return { x: ((_projVec.x + 1) / 2) * w, y: ((1 - _projVec.y) / 2) * h };
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
    return [blendToward(r, 1, 0.4), blendToward(g, 1, 0.4), blendToward(b, 1, 0.4)];
  }
  if (emphasized) return [0.49, 0.827, 0.988]; // #7dd3fc
  if (dim) {
    return [
      baseRGB[i * 3] * 0.25,
      baseRGB[i * 3 + 1] * 0.25,
      baseRGB[i * 3 + 2] * 0.25,
    ];
  }

  // Ambient shimmer
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
  if (!threeRenderer || !camera) return;
  const rect = threeRenderer.domElement.getBoundingClientRect();
  _mouseNDC.set(
    ((e.clientX - rect.left) / rect.width) * 2 - 1,
    -((e.clientY - rect.top) / rect.height) * 2 + 1,
  );
  _raycaster.setFromCamera(_mouseNDC, camera);

  // Check real nodes first
  if (pointCloud && nodeIds.length) {
    const hits = _raycaster.intersectObject(pointCloud);
    if (hits.length > 0 && hits[0].index !== undefined) {
      const id = nodeIds[hits[0].index];
      if (hoverNodeId.value !== id) {
        hoverNodeId.value = id;
        hoverPoint.value = graphData.value.byId.get(id) ?? null;
        threeRenderer.domElement.style.cursor = "pointer";
      }
      // Show label pill above cursor
      if (nodeTooltip) {
        const label = graphData.value.byId.get(id)?.label ?? id;
        nodeTooltip.textContent = label;
        nodeTooltip.style.left = `${e.clientX - rect.left + 12}px`;
        nodeTooltip.style.top = `${e.clientY - rect.top - 24}px`;
        nodeTooltip.style.display = "block";
      }
      if (ghostTooltip) ghostTooltip.style.display = "none";
      // updatePointCloud manages selectedLabelDivs each frame; suppress only the hovered nodes pill
      if (rs.selectedIds.has(id)) {
        const d = selectedLabelDivs.get(id);
        if (d) d.style.display = "none";
      }
      return;
    }
  }

  if (nodeTooltip) nodeTooltip.style.display = "none";

  // Check ghost nodes
  if (ghostCloud && ghostValidPts.length) {
    const ghostHits = _raycaster.intersectObject(ghostCloud);
    if (ghostHits.length > 0 && ghostHits[0].index !== undefined) {
      const gpt = ghostValidPts[ghostHits[0].index];
      const ghostKey = `__ghost__${gpt.id}`;
      if (hoverNodeId.value !== ghostKey) {
        hoverNodeId.value = ghostKey;
        hoverPoint.value = null;
        threeRenderer.domElement.style.cursor = "pointer";
      }
      if (ghostTooltip) {
        ghostTooltip.style.display = "block";
        ghostTooltip.style.left = `${e.clientX - rect.left + 12}px`;
        ghostTooltip.style.top = `${e.clientY - rect.top - 24}px`;
        ghostTooltip.textContent = `t=${gpt.alpha.toFixed(2)}`;
      }
      return;
    }
  }

  // Nothing hit
  if (hoverNodeId.value !== null) {
    hoverNodeId.value = null;
    hoverPoint.value = null;
    threeRenderer.domElement.style.cursor = "";
  }
  if (ghostTooltip) ghostTooltip.style.display = "none";
}

function onMouseDown(e: MouseEvent): void {
  _mouseDownX = e.clientX;
  _mouseDownY = e.clientY;
}

function onClick(e: MouseEvent): void {
  const dx = e.clientX - _mouseDownX;
  const dy = e.clientY - _mouseDownY;
  if (dx * dx + dy * dy > DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX) return;

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

// --- Ghost nodes ---

function rebuildGhostNodes(): void {
  if (!scene) return;
  disposeAndRemoveGhostNodes();

  const result = operationResult.value;
  const overlay = result?.trajectory_overlay;
  if (!trajectoryOverlayVisible.value || !overlay?.length) return;

  const validPts = overlay.filter((pt) => pt.coords_3d);
  if (!validPts.length) return;

  const { minX, maxX, minY, maxY } = xyBounds;
  const xSpan = Math.max(maxX - minX, 0.001);
  const ySpan = Math.max(maxY - minY, 0.001);
  const zSpan = Math.max(zBounds.max - zBounds.min, 0.001);

  const snapEp = _snap3d.value;
  const sourceIds = (result.source_point_ids ?? []).map(String);
  const idxMap = new Map(nodeIds.map((id, i) => [id, i]));

  ghostValidPts = validPts;
  ghostBasePositions = new Float32Array(validPts.length * 3);
  for (let g = 0; g < validPts.length; g++) {
    const [gx, gy, gz] = validPts[g].coords_3d!;
    ghostBasePositions[g * 3 + 0] = (gx - minX) / xSpan - 0.5;
    ghostBasePositions[g * 3 + 1] = (gy - minY) / ySpan - 0.5;
    ghostBasePositions[g * 3 + 2] = (gz - zBounds.min) / zSpan - 0.5;

    if (snapEp) {
      const alpha = validPts[g].alpha;
      let snapId: string | null = null;
      if (alpha === 0.0 && sourceIds.length >= 1) snapId = sourceIds[0];
      else if (alpha === 1.0 && sourceIds.length >= 2) snapId = sourceIds[1];
      if (snapId) {
        const anchorIdx = idxMap.get(snapId);
        if (anchorIdx !== undefined) ghostSnapLinks.set(g, anchorIdx);
      }
    }
  }

  // Apply initial snap positions for static render
  const initPos = ghostBasePositions.slice();
  for (const [g, anchorIdx] of ghostSnapLinks) {
    initPos[g * 3 + 0] = basePositions[anchorIdx * 3 + 0];
    initPos[g * 3 + 1] = basePositions[anchorIdx * 3 + 1];
    initPos[g * 3 + 2] = basePositions[anchorIdx * 3 + 2];
  }

  // Ghost point cloud
  const ptGeo = new THREE.BufferGeometry();
  const gPosAttr = new THREE.Float32BufferAttribute(initPos, 3);
  gPosAttr.setUsage(THREE.DynamicDrawUsage);
  ptGeo.setAttribute("position", gPosAttr);
  const gColArr = new Float32Array(validPts.length * 3);
  for (let g = 0; g < validPts.length; g++) {
    gColArr[g * 3] = 0.98;
    gColArr[g * 3 + 1] = 0.57;
    gColArr[g * 3 + 2] = 0.24; // #fb923c
  }
  const gColAttrInit = new THREE.Float32BufferAttribute(gColArr, 3);
  gColAttrInit.setUsage(THREE.DynamicDrawUsage);
  ptGeo.setAttribute("color", gColAttrInit);
  ghostCloud = new THREE.Points(
    ptGeo,
    new THREE.PointsMaterial({
      size: 0.065,
      sizeAttenuation: true,
      vertexColors: true,
      map: circleTexture,
      alphaTest: 0.08,
      transparent: true,
      opacity: 0.55,
    }),
  );
  scene.add(ghostCloud);

  // Trajectory path line connecting ghost nodes in sequence
  const lineGeo = new THREE.BufferGeometry();
  const lPosAttr = new THREE.Float32BufferAttribute(initPos.slice(), 3);
  lPosAttr.setUsage(THREE.DynamicDrawUsage);
  lineGeo.setAttribute("position", lPosAttr);
  ghostTrajectoryLine = new THREE.Line(
    lineGeo,
    new THREE.LineBasicMaterial({
      color: 0xfb923c,
      transparent: true,
      opacity: 0.35,
    }),
  );
  scene.add(ghostTrajectoryLine);
}

function disposeAndRemoveGhostNodes(): void {
  if (ghostCloud) {
    scene?.remove(ghostCloud);
    ghostCloud.geometry.dispose();
    (ghostCloud.material as THREE.Material).dispose();
    ghostCloud = null;
  }
  if (ghostTrajectoryLine) {
    scene?.remove(ghostTrajectoryLine);
    ghostTrajectoryLine.geometry.dispose();
    (ghostTrajectoryLine.material as THREE.Material).dispose();
    ghostTrajectoryLine = null;
  }
  ghostSnapLinks.clear();
  ghostValidPts = [];
  highlightedGhostId = null;
  if (ghostTooltip) ghostTooltip.style.display = "none";
  if (nodeTooltip) nodeTooltip.style.display = "none";
  if (highlightedGhostLabelDiv) highlightedGhostLabelDiv.style.display = "none";
}

// --- Helpers ---

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

function blendToward(a: number, b: number, t: number): number {
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
