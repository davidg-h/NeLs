import * as THREE from "three";
import type { NelsOperationResult } from "../../api/types.js";
import {
  operationResult,
  operationConfig,
  trajectoryOverlayVisible,
} from "../../state/operation.js";
import {
  C_DELTA_WALK_NUM,
  C_GHOST_NUM,
  C_SELECTED_NUM,
  getSourceIds,
} from "../rendering_common.js";
import { getScene, getNodeIds, getBasePositions } from "./renderer3d.js";

let extraOverlayLines: Array<THREE.Line | THREE.LineSegments> = [];
let nnOverlaySegments: THREE.LineSegments | null = null;
let nnEndpoints: Array<[number, number]> = [];

export function rebuildOverlayLines(): void {
  const scene = getScene();
  if (!scene) return;
  disposeAndRemoveLines();

  const result = operationResult.value;
  if (!result) return;

  const nodeIds = getNodeIds();
  const basePositions = getBasePositions();
  const op = result.operation;
  const idxMap = new Map(nodeIds.map((id, i) => [id, i]));

  if (op === "nearest_neighbor") {
    const fallbackSourceIds = getSourceIds(result);
    const nnPos: number[] = [];
    const nnEp: Array<[number, number]> = [];
    for (const neighbor of result.neighbors ?? []) {
      const pid = String(neighbor.id ?? "");
      if (!pid) continue;
      const querySids = neighbor.query_id
        ? [String(neighbor.query_id)]
        : fallbackSourceIds;
      for (const sid of querySids) {
        const si = idxMap.get(sid);
        const ti = idxMap.get(pid);
        if (si === undefined || ti === undefined) continue;
        nnEp.push([si, ti]);
        nnPos.push(
          basePositions[si * 3],
          basePositions[si * 3 + 1],
          basePositions[si * 3 + 2],
          basePositions[ti * 3],
          basePositions[ti * 3 + 1],
          basePositions[ti * 3 + 2],
        );
      }
    }
    if (nnPos.length) {
      const nnGeo = new THREE.BufferGeometry();
      const nnPosAttr = new THREE.Float32BufferAttribute(nnPos, 3);
      nnPosAttr.setUsage(THREE.DynamicDrawUsage);
      nnGeo.setAttribute("position", nnPosAttr);
      const nnMat = new THREE.LineDashedMaterial({
        color: C_SELECTED_NUM,
        dashSize: 0.035,
        gapSize: 0.02,
        transparent: true,
        opacity: 0.78,
      });
      nnOverlaySegments = new THREE.LineSegments(nnGeo, nnMat);
      nnOverlaySegments.computeLineDistances();
      nnEndpoints = nnEp;
      scene.add(nnOverlaySegments);
    }
  }

  if (op === "lerp" && trajectoryOverlayVisible.value) {
    const curvePts = buildGhostCurvePoints(result, idxMap, basePositions);
    if (curvePts) {
      const lGeo = new THREE.BufferGeometry().setFromPoints(curvePts);
      const lLine = new THREE.Line(
        lGeo,
        new THREE.LineBasicMaterial({
          color: C_GHOST_NUM,
          transparent: true,
          opacity: 0.85,
        }),
      );
      scene.add(lLine);
      extraOverlayLines.push(lLine);
    }
  }

  if (op === "slerp" && trajectoryOverlayVisible.value) {
    const curvePts = buildGhostCurvePoints(result, idxMap, basePositions);
    if (curvePts) {
      const smooth = new THREE.CatmullRomCurve3(
        curvePts,
        false,
        "catmullrom",
        0.15,
      ).getPoints(Math.max(curvePts.length * 12, 96));
      const arcGeo = new THREE.BufferGeometry().setFromPoints(smooth);
      const arcLine = new THREE.Line(
        arcGeo,
        new THREE.LineBasicMaterial({
          color: C_GHOST_NUM,
          transparent: true,
          opacity: 0.78,
        }),
      );
      scene.add(arcLine);
      extraOverlayLines.push(arcLine);
    }
  }

  if (op === "delta_walk") {
    const sourceIds = (result.source_point_ids ?? []).map(String);
    const [src0, src1] = sourceIds;
    const si = idxMap.get(src0);
    const ti = src1 ? idxMap.get(src1) : undefined;
    if (si !== undefined && ti !== undefined) {
      const p0 = new THREE.Vector3(
        basePositions[si * 3],
        basePositions[si * 3 + 1],
        basePositions[si * 3 + 2],
      );
      const p1 = new THREE.Vector3(
        basePositions[ti * 3],
        basePositions[ti * 3 + 1],
        basePositions[ti * 3 + 2],
      );
      const lineGeo = new THREE.BufferGeometry().setFromPoints([p0, p1]);
      const line = new THREE.Line(
        lineGeo,
        new THREE.LineBasicMaterial({
          color: C_DELTA_WALK_NUM,
          transparent: true,
          opacity: 0.78,
        }),
      );
      scene.add(line);
      extraOverlayLines.push(line);
    }
  }
}

export function updateOverlayAnimation(
  wx: Float32Array,
  wy: Float32Array,
  wz: Float32Array,
): void {
  if (nnOverlaySegments && nnEndpoints.length) {
    const nnPosAttr = nnOverlaySegments.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    for (let e = 0; e < nnEndpoints.length; e++) {
      const [si, ti] = nnEndpoints[e];
      nnPosAttr.setXYZ(e * 2, wx[si], wy[si], wz[si]);
      nnPosAttr.setXYZ(e * 2 + 1, wx[ti], wy[ti], wz[ti]);
    }
    nnPosAttr.needsUpdate = true;
    nnOverlaySegments.computeLineDistances();
  }
}

export function disposeAndRemoveLines(): void {
  const scene = getScene();
  if (nnOverlaySegments) {
    scene?.remove(nnOverlaySegments);
    nnOverlaySegments.geometry.dispose();
    (nnOverlaySegments.material as THREE.Material).dispose();
    nnOverlaySegments = null;
  }
  nnEndpoints = [];
  for (const obj of extraOverlayLines) {
    scene?.remove(obj);
    obj.geometry.dispose();
    (obj.material as THREE.Material).dispose();
  }
  extraOverlayLines = [];
}

// Ghost overlay points for lerp/slerp, snapped to the source/target nodes live position at
// alpha 0/1 when snapEp is on, else null if there arent enough points to draw a curve
function buildGhostCurvePoints(
  result: NelsOperationResult,
  idxMap: Map<string, number>,
  basePositions: Float32Array,
): THREE.Vector3[] | null {
  const [src0, src1] = (result.source_point_ids ?? []).map(String);
  const si = idxMap.get(src0);
  const ti = src1 ? idxMap.get(src1) : undefined;
  const ghosts3d = (result.trajectory_overlay ?? []).filter(
    (pt) => pt.coords_3d,
  );
  if (ghosts3d.length < 2) return null;
  const snapEp = operationConfig.value.snap_endpoints;
  return ghosts3d.map((pt) => {
    let [x, y, z] = pt.coords_3d!;
    if (snapEp) {
      if (pt.alpha === 0.0 && si !== undefined)
        [x, y, z] = [
          basePositions[si * 3],
          basePositions[si * 3 + 1],
          basePositions[si * 3 + 2],
        ];
      else if (pt.alpha === 1.0 && ti !== undefined)
        [x, y, z] = [
          basePositions[ti * 3],
          basePositions[ti * 3 + 1],
          basePositions[ti * 3 + 2],
        ];
    }
    return new THREE.Vector3(x, y, z);
  });
}
