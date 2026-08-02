import * as THREE from "three";
import { computed } from "@preact/signals";
import type { TrajectoryOverlayPoint } from "../../api/types.js";
import {
  operationResult,
  operationConfig,
  trajectoryOverlayVisible,
  trajectoryHighlightActive,
} from "../../state/operation.js";
import { selectedIds } from "../../state/selection.js";
import { activeClusterId } from "../../ui/ClusterLegend.js";
import { clusterColor, dimHex, NOISE_COLOR } from "../colors.js";
import {
  axisPairColorRGB,
  C_GHOST_NUM,
  C_GHOST_RGB,
  C_SELECTED_RGB,
  hexTo01,
  resolveSnapSourceId,
  hashString,
  ambientJitterXY,
} from "../rendering_common.js";
import {
  sharedCircleTexture,
  makeGhostTexture,
  makeRingTexture,
} from "./textures.js";
import {
  getScene,
  getCamera3D,
  getContainer3D,
  getBasePositions,
  getNodeIds,
  projectToScreen,
  createLabelDiv,
} from "./renderer3d.js";
import { rawToDisplay3D } from "../view_mapper.js";

const snap3d = computed(() => operationConfig.value.snap_endpoints);
const ghostTexture = makeGhostTexture();
const circleTexture = sharedCircleTexture;
const ringTexture = makeRingTexture();
const VARIANT_BODY_SIZE = 0.11; // matches real points sphere size
const VARIANT_RING_SIZE = VARIANT_BODY_SIZE * 1.7;
const NOISE_RGB: [number, number, number] = hexTo01(dimHex(NOISE_COLOR, 0.28));
const TRAJECTORY_LINE_OPACITY = 0.75;
const TRAJECTORY_LINE_OPACITY_PLAIN = 0.6;
const TRAJECTORY_LINE_OPACITY_HIGHLIGHT = 1.0;

let ghostCloud: THREE.Points | null = null;
let ghostRingCloud: THREE.Points | null = null;
let ghostTrajectoryLine: THREE.Line | null = null;
let ghostTrajectoryLine2: THREE.Line | null = null;
let ghostAxisLineStart2 = -1;
let ghostBasePositions: Float32Array = new Float32Array(0);
let ghostBaseColors: Float32Array = new Float32Array(0);
let ghostClusterIds: (number | null)[] = [];
let ghostIsVariant = false;
const ghostSnapLinks = new Map<number, number>();
let ghostValidPts: TrajectoryOverlayPoint[] = [];
let highlightedGhostId: string | null = null;
let highlightedGhostLabelDiv: HTMLDivElement | null = null;

export function getGhostCloud(): THREE.Points | null {
  return ghostCloud;
}
export function getGhostValidPts(): TrajectoryOverlayPoint[] {
  return ghostValidPts;
}
export function isGhostVariant(): boolean {
  return ghostIsVariant;
}
export function setHighlightedGhostId(id: string | null): void {
  highlightedGhostId = id;
}

export function rebuildGhostNodes(): void {
  const scene = getScene();
  if (!scene) return;
  disposeAndRemoveGhostNodes();

  const result = operationResult.value;
  const overlay = result?.trajectory_overlay;
  if (!trajectoryOverlayVisible.value || !overlay?.length) return;

  const validPts = overlay.filter((pt) => pt.coords_3d);
  if (!validPts.length) return;

  const snapEp = snap3d.value;
  const sourceIds = (result?.source_point_ids ?? []).map(String);
  const nodeIds = getNodeIds();
  const basePositions = getBasePositions();
  const idxMap = new Map(nodeIds.map((id, i) => [id, i]));

  ghostIsVariant = result?.operation === "consistency_check";
  ghostValidPts = validPts;
  ghostBasePositions = new Float32Array(validPts.length * 3);
  ghostBaseColors = new Float32Array(validPts.length * 3);
  ghostClusterIds = validPts.map((pt) => pt.cluster_id ?? null);

  for (let g = 0; g < validPts.length; g++) {
    const mapped = rawToDisplay3D(validPts[g].coords_3d);
    if (!mapped) continue;
    const [gx, gy, gz] = mapped;
    ghostBasePositions[g * 3] = gx;
    ghostBasePositions[g * 3 + 1] = gy;
    ghostBasePositions[g * 3 + 2] = gz;
    let rgb: [number, number, number];
    if (ghostIsVariant && validPts[g].cluster_id != null) {
      rgb = hexTo01(clusterColor(validPts[g].cluster_id!, 72)); // matches real 3D points lightness
    } else if (ghostIsVariant) {
      rgb = NOISE_RGB;
    } else {
      const pair = validPts[g].source_text_pair;
      rgb = axisPairColorRGB(validPts[g].alpha, pair) ?? C_GHOST_RGB;
    }
    ghostBaseColors[g * 3] = rgb[0];
    ghostBaseColors[g * 3 + 1] = rgb[1];
    ghostBaseColors[g * 3 + 2] = rgb[2];

    if (snapEp && result?.operation !== "axis_projection") {
      const snapId = resolveSnapSourceId(validPts[g].alpha, result?.operation, sourceIds);
      if (snapId) {
        const anchorIdx = idxMap.get(snapId);
        if (anchorIdx !== undefined) ghostSnapLinks.set(g, anchorIdx);
      }
    }
  }

  // Apply initial snap positions for static render
  const initPos = ghostBasePositions.slice();
  for (const [g, anchorIdx] of ghostSnapLinks) {
    initPos[g * 3] = basePositions[anchorIdx * 3];
    initPos[g * 3 + 1] = basePositions[anchorIdx * 3 + 1];
    initPos[g * 3 + 2] = basePositions[anchorIdx * 3 + 2];
  }

  const ptGeo = new THREE.BufferGeometry();
  const gPosAttr = new THREE.Float32BufferAttribute(initPos, 3);
  gPosAttr.setUsage(THREE.DynamicDrawUsage);
  ptGeo.setAttribute("position", gPosAttr);
  const gColAttr = new THREE.Float32BufferAttribute(ghostBaseColors.slice(), 3);
  gColAttr.setUsage(THREE.DynamicDrawUsage);
  ptGeo.setAttribute("color", gColAttr);
  ghostCloud = new THREE.Points(
    ptGeo,
    new THREE.PointsMaterial(
      ghostIsVariant
        ? {
            size: VARIANT_BODY_SIZE,
            sizeAttenuation: true,
            vertexColors: true,
            map: circleTexture,
            alphaTest: 0.08,
            transparent: false,
          }
        : {
            size: 0.12,
            sizeAttenuation: true,
            vertexColors: true,
            map: ghostTexture,
            alphaTest: 0.04,
            transparent: true,
            opacity: 1.0,
          },
    ),
  );
  scene.add(ghostCloud);

  if (ghostIsVariant) {
    const ringGeo = new THREE.BufferGeometry();
    const ringPosAttr = new THREE.Float32BufferAttribute(initPos.slice(), 3);
    ringPosAttr.setUsage(THREE.DynamicDrawUsage);
    ringGeo.setAttribute("position", ringPosAttr);
    ghostRingCloud = new THREE.Points(
      ringGeo,
      new THREE.PointsMaterial({
        size: VARIANT_RING_SIZE,
        sizeAttenuation: true,
        map: ringTexture,
        color: C_GHOST_NUM,
        alphaTest: 0.05,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      }),
    );
    scene.add(ghostRingCloud);
  }

  // Trajectory path line - skip for consistency_check and slerp/lerp (real arc drawn by overlay_lines)
  const hasRealArc =
    (result?.operation === "slerp" || result?.operation === "lerp") &&
    (result?.trajectory_overlay ?? []).some((pt) => pt.coords_3d);

  if (!ghostIsVariant && !hasRealArc) {
    const splitIdx = validPts.findIndex((pt) => pt.source_text_pair === 1);
    const makeVLine = (pos: Float32Array, col: Float32Array): THREE.Line => {
      const geo = new THREE.BufferGeometry();
      const pa = new THREE.Float32BufferAttribute(pos, 3);
      pa.setUsage(THREE.DynamicDrawUsage);
      geo.setAttribute("position", pa);
      geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
      const line = new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: TRAJECTORY_LINE_OPACITY,
        }),
      );
      scene!.add(line);
      return line;
    };

    if (splitIdx > 0) {
      // Axis projection: two gradient lines, one per axis
      ghostAxisLineStart2 = splitIdx;
      ghostTrajectoryLine = makeVLine(
        initPos.slice(0, splitIdx * 3),
        ghostBaseColors.slice(0, splitIdx * 3),
      );
      ghostTrajectoryLine2 = makeVLine(
        initPos.slice(splitIdx * 3),
        ghostBaseColors.slice(splitIdx * 3),
      );
    } else {
      ghostAxisLineStart2 = -1;
      const hasPairColors = validPts.some(
        (pt) => pt.source_text_pair !== undefined,
      );
      if (hasPairColors) {
        ghostTrajectoryLine = makeVLine(
          initPos.slice(),
          ghostBaseColors.slice(),
        );
      } else {
        const lineGeo = new THREE.BufferGeometry();
        const lPosAttr = new THREE.Float32BufferAttribute(initPos.slice(), 3);
        lPosAttr.setUsage(THREE.DynamicDrawUsage);
        lineGeo.setAttribute("position", lPosAttr);
        ghostTrajectoryLine = new THREE.Line(
          lineGeo,
          new THREE.LineBasicMaterial({
            color: C_GHOST_NUM,
            transparent: true,
            opacity: TRAJECTORY_LINE_OPACITY_PLAIN,
          }),
        );
        scene.add(ghostTrajectoryLine);
      }
    }
  }
}

export function disposeAndRemoveGhostNodes(): void {
  const scene = getScene();
  if (ghostCloud) {
    scene?.remove(ghostCloud);
    ghostCloud.geometry.dispose();
    (ghostCloud.material as THREE.Material).dispose();
    ghostCloud = null;
  }
  if (ghostRingCloud) {
    scene?.remove(ghostRingCloud);
    ghostRingCloud.geometry.dispose();
    (ghostRingCloud.material as THREE.Material).dispose();
    ghostRingCloud = null;
  }
  if (ghostTrajectoryLine) {
    scene?.remove(ghostTrajectoryLine);
    ghostTrajectoryLine.geometry.dispose();
    (ghostTrajectoryLine.material as THREE.Material).dispose();
    ghostTrajectoryLine = null;
  }
  if (ghostTrajectoryLine2) {
    scene?.remove(ghostTrajectoryLine2);
    ghostTrajectoryLine2.geometry.dispose();
    (ghostTrajectoryLine2.material as THREE.Material).dispose();
    ghostTrajectoryLine2 = null;
  }
  ghostAxisLineStart2 = -1;
  ghostSnapLinks.clear();
  ghostValidPts = [];
  highlightedGhostId = null;
  // Recreate from scratch rather than reuse
  if (highlightedGhostLabelDiv) {
    highlightedGhostLabelDiv.remove();
    highlightedGhostLabelDiv = null;
  }
}

export function updateGhostAnimation(
  wx: Float32Array,
  wy: Float32Array,
  wz: Float32Array,
  t: number,
  animate: boolean,
): void {
  if (!ghostCloud) return;
  const gCount = ghostBasePositions.length / 3;
  if (!gCount) return;

  if (animate && !ghostIsVariant) {
    const breath = 0.5 + 0.5 * Math.sin(t * 0.7);
    const shimmer = 0.5 + 0.5 * Math.sin(t * 0.5 + 1.3);
    const mat = ghostCloud.material as THREE.PointsMaterial;
    mat.size = 0.1 + breath * 0.04;
    mat.opacity = 0.85 + shimmer * 0.15;
  }

  const gPosAttr = ghostCloud.geometry.getAttribute(
    "position",
  ) as THREE.BufferAttribute;
  for (let g = 0; g < gCount; g++) {
    const anchorIdx = ghostSnapLinks.get(g);
    if (anchorIdx !== undefined) {
      gPosAttr.setXYZ(g, wx[anchorIdx], wy[anchorIdx], wz[anchorIdx]);
    } else {
      let gx = ghostBasePositions[g * 3];
      let gy = ghostBasePositions[g * 3 + 1];
      let gz = ghostBasePositions[g * 3 + 2];
      if (animate) {
        const h = hashString(`ghost-${g}`);
        const { dx, dy } = ambientJitterXY(h, t);
        const pz =
          ((Math.imul(h, 0x9e3779b9) >>> 0) & 0xffff) *
          ((Math.PI * 2) / 0xffff);
        gx += dx;
        gy += dy;
        gz += Math.sin(t * 0.5 + pz) * 0.015 + Math.sin(t * 0.3 + pz + 0.8) * 0.01;
      }
      gPosAttr.setXYZ(g, gx, gy, gz);
    }
  }
  gPosAttr.needsUpdate = true;

  if (ghostRingCloud) {
    const ringPosAttr = ghostRingCloud.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    for (let g = 0; g < gCount; g++) {
      ringPosAttr.setXYZ(
        g,
        gPosAttr.getX(g),
        gPosAttr.getY(g),
        gPosAttr.getZ(g),
      );
    }
    ringPosAttr.needsUpdate = true;
  }

  const highlightActive = trajectoryHighlightActive.value;
  if (ghostTrajectoryLine) {
    const splitCount = ghostAxisLineStart2 >= 0 ? ghostAxisLineStart2 : gCount;
    const lPosAttr = ghostTrajectoryLine.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    for (let g = 0; g < splitCount; g++) {
      lPosAttr.setXYZ(g, gPosAttr.getX(g), gPosAttr.getY(g), gPosAttr.getZ(g));
    }
    lPosAttr.needsUpdate = true;
    (ghostTrajectoryLine.material as THREE.LineBasicMaterial).opacity =
      highlightActive
        ? TRAJECTORY_LINE_OPACITY_HIGHLIGHT
        : TRAJECTORY_LINE_OPACITY;
  }
  if (ghostTrajectoryLine2 && ghostAxisLineStart2 >= 0) {
    const lPosAttr2 = ghostTrajectoryLine2.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    for (let g = ghostAxisLineStart2; g < gCount; g++) {
      lPosAttr2.setXYZ(
        g - ghostAxisLineStart2,
        gPosAttr.getX(g),
        gPosAttr.getY(g),
        gPosAttr.getZ(g),
      );
    }
    lPosAttr2.needsUpdate = true;
    (ghostTrajectoryLine2.material as THREE.LineBasicMaterial).opacity =
      highlightActive
        ? TRAJECTORY_LINE_OPACITY_HIGHLIGHT
        : TRAJECTORY_LINE_OPACITY;
  }

  // Per-ghost color: highlighted -> yellow, cluster filter -> dim, else -> base
  const gColAttr = ghostCloud.geometry.getAttribute(
    "color",
  ) as THREE.BufferAttribute;
  const activeCl = activeClusterId.value;
  let hIdx = -1;
  for (let g = 0; g < gCount; g++) {
    const isHighlighted =
      (highlightedGhostId !== null &&
        ghostValidPts[g]?.id === highlightedGhostId) ||
      selectedIds.value.has(`__ghost__${ghostValidPts[g]?.id}`);
    if (isHighlighted) {
      gColAttr.setXYZ(g, ...C_SELECTED_RGB);
      hIdx = g;
    } else {
      const br = ghostBaseColors[g * 3];
      const bg = ghostBaseColors[g * 3 + 1];
      const bb = ghostBaseColors[g * 3 + 2];
      const dimmed =
        activeCl !== null &&
        (ghostClusterIds[g] == null || String(ghostClusterIds[g]) !== activeCl);
      const factor = dimmed ? 0.15 : 1.0;
      gColAttr.setXYZ(g, br * factor, bg * factor, bb * factor);
    }
  }
  gColAttr.needsUpdate = true;

  // Floating label for highlighted ghost node
  const camera = getCamera3D();
  const container = getContainer3D();
  if (camera && container) {
    if (hIdx >= 0) {
      const proj = projectToScreen(
        gPosAttr.getX(hIdx),
        gPosAttr.getY(hIdx),
        gPosAttr.getZ(hIdx),
      );
      if (!highlightedGhostLabelDiv) {
        highlightedGhostLabelDiv = createLabelDiv({
          textColor: "#facc15",
          borderColor: "rgba(250,204,21,0.6)",
          shadowColor: "rgba(250,204,21,0.2)",
          shadowBlur: 6,
          initiallyHidden: false,
        });
        container.appendChild(highlightedGhostLabelDiv);
      }
      highlightedGhostLabelDiv.textContent = ghostIsVariant
        ? (operationResult.value?.consistency_variants?.find(
            (v) => v.id === ghostValidPts[hIdx].id,
          )?.text ??
          ghostValidPts[hIdx].label ??
          "")
        : `t=${ghostValidPts[hIdx].alpha.toFixed(2)}`;
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
