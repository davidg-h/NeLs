import * as THREE from "three";
import {
  hoverNodeId,
  hoverPoint,
  selectNode,
  clearSelection,
  selectedIds,
} from "../../state/selection.js";
import {
  operationResult,
  operationConfig,
  setOperationConfig,
} from "../../state/operation.js";
import { schedulePushState } from "../../state/rendererBridge.js";
import { dragSelectRect } from "../../state/dragSelect.js";
import { graphData } from "../../state/graph.js";
import {
  getThreeRenderer,
  getCamera3D,
  getControls,
  getPointCloud,
  getProbeSphere3D,
  getNodeIds,
  getBasePositions,
  getSelectedLabelDivs,
  projectToScreen,
} from "./renderer3d.js";
import {
  getGhostCloud,
  getGhostValidPts,
  isGhostVariant,
} from "./ghost_nodes.js";
import { showContextMenu } from "../context_menu.js";

const raycaster = new THREE.Raycaster();
raycaster.params.Points = { threshold: 0.025 };
const mouseNDC = new THREE.Vector2();

/** Convert a mouse event to NDC and point the shared raycaster at it; returns the canvas DOM rect */
function raycastFromMouse(
  e: MouseEvent,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
): DOMRect {
  const rect = renderer.domElement.getBoundingClientRect();
  mouseNDC.set(
    ((e.clientX - rect.left) / rect.width) * 2 - 1,
    -((e.clientY - rect.top) / rect.height) * 2 + 1,
  );
  raycaster.setFromCamera(mouseNDC, camera);
  return rect;
}

let mouseDownX = 0;
let mouseDownY = 0;
const DRAG_THRESHOLD_PX = 5;
let isDragSelect3D = false;
let dragStart3D: { x: number; y: number } | null = null;
let dragSelectConsumed3D = false;

export function resetInteractions3D(): void {
  isDragSelect3D = false;
  dragStart3D = null;
  dragSelectConsumed3D = false;
  dragSelectRect.value = null;
  const controls = getControls();
  if (controls) controls.enabled = true;
}

export function onMouseDown(e: MouseEvent): void {
  mouseDownX = e.clientX;
  mouseDownY = e.clientY;
  const threeRenderer = getThreeRenderer();
  const controls = getControls();
  if (e.shiftKey && threeRenderer && controls) {
    isDragSelect3D = true;
    dragSelectConsumed3D = false;
    controls.enabled = false;
    const domRect = threeRenderer.domElement.getBoundingClientRect();
    const x = e.clientX - domRect.left;
    const y = e.clientY - domRect.top;
    dragStart3D = { x, y };
    dragSelectRect.value = { x1: x, y1: y, x2: x, y2: y };
  }
}

export function onMouseMove(e: MouseEvent): void {
  const threeRenderer = getThreeRenderer();
  if (isDragSelect3D && dragStart3D && threeRenderer) {
    const domRect = threeRenderer.domElement.getBoundingClientRect();
    const x = e.clientX - domRect.left;
    const y = e.clientY - domRect.top;
    dragSelectRect.value = {
      x1: dragStart3D.x,
      y1: dragStart3D.y,
      x2: x,
      y2: y,
    };
    return;
  }
  const camera = getCamera3D();
  if (!threeRenderer || !camera) return;
  raycastFromMouse(e, threeRenderer, camera);

  const pointCloud = getPointCloud();
  const nodeIds = getNodeIds();

  if (pointCloud && nodeIds.length) {
    const hits = raycaster.intersectObject(pointCloud);
    if (hits.length > 0 && hits[0].index !== undefined) {
      const id = nodeIds[hits[0].index];
      if (hoverNodeId.value !== id) {
        hoverNodeId.value = id;
        hoverPoint.value = graphData.value.byId.get(id) ?? null;
        threeRenderer.domElement.style.cursor = "pointer";
      }
      if (selectedIds.value.has(id)) {
        const d = getSelectedLabelDivs().get(id);
        if (d) d.style.display = "none";
      }
      return;
    }
  }

  const probeSphere3D = getProbeSphere3D();
  if (probeSphere3D) {
    const probeHits = raycaster.intersectObject(probeSphere3D);
    if (probeHits.length > 0) {
      if (hoverNodeId.value !== "probe") {
        hoverNodeId.value = "probe";
        const recon =
          operationResult.value?.operation === "latent_probe"
            ? operationResult.value?.text_reconstruction
            : undefined;
        const cfg = operationConfig.value;
        const pc =
          cfg.probe_mode === "3d" ? cfg.probe_coords : cfg.probe_cross_coords;
        hoverPoint.value = {
          id: "probe",
          view_coords: (pc?.length === 3
            ? [pc[0], pc[1], pc[2]]
            : pc?.length === 2
              ? [pc[0], pc[1]]
              : [0, 0]) as [number, number] | [number, number, number],
          label: "Latent probe",
          metadata: {
            text: "Latent Space Probe",
            recon_text: recon?.text,
            recon_sim: recon?.cosine_sim,
          },
        };
        threeRenderer.domElement.style.cursor = "pointer";
      }
      return;
    }
  }

  const ghostCloud = getGhostCloud();
  const ghostValidPts = getGhostValidPts();
  if (ghostCloud && ghostValidPts.length) {
    const ghostHits = raycaster.intersectObject(ghostCloud);
    if (ghostHits.length > 0 && ghostHits[0].index !== undefined) {
      const gpt = ghostValidPts[ghostHits[0].index];
      const ghostKey = `__ghost__${gpt.id}`;
      if (hoverNodeId.value !== ghostKey) {
        hoverNodeId.value = ghostKey;
        const isVariant = isGhostVariant();
        const variant = operationResult.value?.consistency_variants?.find(
          (v) => v.id === gpt.id,
        );
        // Variant ghosts show their resolved label; plain trajectory ghosts show interpolation progress
        const resolvedLabel = isVariant
          ? (variant?.text ?? gpt.label ?? `t=${gpt.alpha.toFixed(2)}`)
          : `t=${gpt.alpha.toFixed(2)}`;
        const clId = gpt.cluster_id ?? null;
        hoverPoint.value = {
          id: gpt.id,
          view_coords: gpt.coords_3d ??
            (gpt.coords_2d as [number, number] | undefined) ?? [0, 0],
          label: resolvedLabel,
          metadata: {
            text: resolvedLabel,
            ...(isVariant && clId != null && clId >= 0
              ? { ghost_cluster_id: clId }
              : {}),
          },
        };
        threeRenderer.domElement.style.cursor = "pointer";
      }
      return;
    }
  }

  if (hoverNodeId.value !== null) {
    hoverNodeId.value = null;
    hoverPoint.value = null;
  }
  threeRenderer.domElement.style.cursor = "";
}

export function onMouseUp3D(e: MouseEvent): void {
  if (!isDragSelect3D) return;
  isDragSelect3D = false;
  const controls = getControls();
  if (controls) controls.enabled = true;
  const rect = dragSelectRect.value;
  dragSelectRect.value = null;
  dragStart3D = null;
  if (!rect) return;
  const x1 = Math.min(rect.x1, rect.x2);
  const x2 = Math.max(rect.x1, rect.x2);
  const y1 = Math.min(rect.y1, rect.y2);
  const y2 = Math.max(rect.y1, rect.y2);
  if (x2 - x1 < 4 && y2 - y1 < 4) return;
  dragSelectConsumed3D = true;
  const nodeIds = getNodeIds();
  const basePositions = getBasePositions();
  const hit = new Set<string>();
  for (let i = 0; i < nodeIds.length; i++) {
    const proj = projectToScreen(
      basePositions[i * 3],
      basePositions[i * 3 + 1],
      basePositions[i * 3 + 2],
    );
    if (proj && proj.x >= x1 && proj.x <= x2 && proj.y >= y1 && proj.y <= y2) {
      hit.add(nodeIds[i]);
    }
  }
  if (hit.size > 0) {
    const base = e.ctrlKey || e.metaKey ? selectedIds.value : new Set<string>();
    selectedIds.value = new Set([...base, ...hit]);
    schedulePushState();
  }
}

export function onContextMenu3D(e: MouseEvent): void {
  e.preventDefault();
  const threeRenderer = getThreeRenderer();
  const camera = getCamera3D();
  const pointCloud = getPointCloud();
  const nodeIds = getNodeIds();
  if (!threeRenderer || !camera || !pointCloud || !nodeIds.length) return;
  raycastFromMouse(e, threeRenderer, camera);
  const hits = raycaster.intersectObject(pointCloud);
  if (hits.length > 0 && hits[0].index !== undefined) {
    showContextMenu(e.clientX, e.clientY, nodeIds[hits[0].index]);
    return;
  }
  const ghostCloud = getGhostCloud();
  const ghostValidPts = getGhostValidPts();
  if (ghostCloud && ghostValidPts.length) {
    const ghostHits = raycaster.intersectObject(ghostCloud);
    if (ghostHits.length > 0 && ghostHits[0].index !== undefined) {
      const gpt = ghostValidPts[ghostHits[0].index];
      const variant = operationResult.value?.consistency_variants?.find(
        (v) => v.id === gpt.id,
      );
      const text = variant?.text ?? gpt.label ?? `t=${gpt.alpha.toFixed(2)}`;
      showContextMenu(e.clientX, e.clientY, `__ghost__${gpt.id}`, text);
      return;
    }
  }

  const probeSphere3D = getProbeSphere3D();
  if (probeSphere3D) {
    const probeHits = raycaster.intersectObject(probeSphere3D);
    if (probeHits.length > 0) {
      const recon =
        operationResult.value?.operation === "latent_probe"
          ? operationResult.value?.text_reconstruction
          : undefined;
      showContextMenu(
        e.clientX,
        e.clientY,
        "probe",
        recon?.text ?? "Latent Space Probe",
      );
    }
  }
}

export function onClick(e: MouseEvent): void {
  if (dragSelectConsumed3D) {
    dragSelectConsumed3D = false;
    return;
  }
  const dx = e.clientX - mouseDownX;
  const dy = e.clientY - mouseDownY;
  if (dx * dx + dy * dy > DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX) return;

  const threeRenderer = getThreeRenderer();
  const camera = getCamera3D();
  const pointCloud = getPointCloud();
  const nodeIds = getNodeIds();
  if (!threeRenderer || !camera || !pointCloud || !nodeIds.length) return;
  raycastFromMouse(e, threeRenderer, camera);
  const hits = raycaster.intersectObject(pointCloud);
  if (hits.length > 0 && hits[0].index !== undefined) {
    const additive = e.shiftKey || e.ctrlKey || e.metaKey;
    selectNode(nodeIds[hits[0].index], additive);
    schedulePushState();
    return;
  }

  const ghostCloud = getGhostCloud();
  const ghostValidPts = getGhostValidPts();
  if (ghostCloud && ghostValidPts.length) {
    const ghostHits = raycaster.intersectObject(ghostCloud);
    if (ghostHits.length > 0 && ghostHits[0].index !== undefined) {
      const gpt = ghostValidPts[ghostHits[0].index];
      const additive = e.shiftKey || e.ctrlKey || e.metaKey;
      selectNode(`__ghost__${gpt.id}`, additive);
      schedulePushState();
      return;
    }
  }

  const cfg = operationConfig.value;

  if (cfg.operation === "latent_probe" && !cfg.probe_place_mode) {
    const probeSphere3D = getProbeSphere3D();
    if (probeSphere3D) {
      const probeHits = raycaster.intersectObject(probeSphere3D);
      if (probeHits.length > 0) {
        const additive = e.shiftKey || e.ctrlKey || e.metaKey;
        selectNode("probe", additive);
        schedulePushState();
        return;
      }
    }
  }

  if (cfg.operation === "latent_probe" && cfg.probe_place_mode) {
    const basePositions = getBasePositions();
    const centroid = new THREE.Vector3();
    const n = basePositions.length / 3;
    if (n > 0) {
      for (let i = 0; i < basePositions.length; i += 3) {
        centroid.x += basePositions[i];
        centroid.y += basePositions[i + 1];
        centroid.z += basePositions[i + 2];
      }
      centroid.divideScalar(n);
    }
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      camDir,
      centroid,
    );
    const hit3d = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, hit3d);
    setOperationConfig({
      probe_coords: [hit3d.x, hit3d.y, hit3d.z],
      probe_mode: "3d",
      probe_place_mode: false,
    });
    schedulePushState();
  } else {
    clearSelection();
    hoverNodeId.value = null;
    hoverPoint.value = null;
    schedulePushState();
  }
}
