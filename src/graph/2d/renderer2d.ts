import Sigma from "sigma";
import { MultiGraph } from "graphology";
import EdgeCurveProgram from "@sigma/edge-curve";
import { computed, effect } from "@preact/signals";
import type { Settings as SigmaSettings } from "sigma/settings";
import {
  selectedIds,
  emphasizedIds,
  hoverNodeId,
} from "../../state/selection.js";
import { graphData, viewMode } from "../../state/graph.js";
import {
  operationConfig,
  operationResult,
  trajectoryOverlayVisible,
  extractResultPointIds,
} from "../../state/operation.js";
import { view, animationEnabled } from "../../state/events.js";
import { syncSigmaGraph, syncOperationOverlay } from "./sigma.js";
import type { NelsOperationResult } from "../../api/types.js";
import { showClusterHulls } from "../../ui/ClusterLegend.js";
import {
  type RenderState,
  fillPulseMap,
  hashString,
  ambientJitterXY,
} from "../rendering_common.js";
import {
  drawClusterHulls,
  initCanvasOverlay,
  destroyCanvasOverlay,
  setHullCanvas as setCanvasHullCanvas,
} from "./canvas_overlay.js";
import { createNodeReducer, drawSigmaHover } from "./node_style.js";
import {
  onDragMouseDown2D,
  onDragMouseMove2D,
  onDragMouseUp2D,
  resetDragSelect,
  unbindSigmaEvents,
} from "./interactions2d.js";

let sigma: Sigma | null = null;
let sigmaGraph: MultiGraph | null = null;
let sigmaContainer: HTMLElement | null = null;
const snapEndpoints = computed(() => operationConfig.value.snap_endpoints);
const overlayEdgeKeys: string[] = [];
const overlayNodeKeys: string[] = [];
const snapLinks = new Map<string, string>();
const pulses = new Map<string, number>();
const basePositions = new Map<string, { x: number; y: number }>();
let pulseRaf: number | null = null;
let ambientRaf: number | null = null;
let ambientTime = 0;
const effectDisposals: (() => void)[] = [];

// Mutable render state -> written by signal effects, read by Sigma reducers and canvas overlay
const rs: RenderState = {
  selectedIds: new Set<string>(),
  emphasizedIds: new Set<string>(),
  hoverNodeId: null as string | null,
};

export function setHullCanvas(canvas: HTMLCanvasElement): void {
  setCanvasHullCanvas(canvas);
}

export function getSigma(): Sigma | null {
  return sigma;
}

export function getSigmaGraph(): MultiGraph | null {
  return sigmaGraph;
}

export function getSigmaContainer(): HTMLElement | null {
  return sigmaContainer;
}

export function initRenderer(container: HTMLElement): void {
  if (sigma) return;

  sigmaContainer = container;
  container.addEventListener("mousedown", onDragMouseDown2D, { capture: true });
  window.addEventListener("mousemove", onDragMouseMove2D);
  window.addEventListener("mouseup", onDragMouseUp2D);

  sigmaGraph = new MultiGraph({ multi: true, allowSelfLoops: false });

  const nodeReducer = createNodeReducer(rs, pulses, ambientPhase);

  sigma = new Sigma(sigmaGraph, container, {
    edgeProgramClasses: { curved: EdgeCurveProgram },
    defaultDrawNodeHover: drawSigmaHover,
    nodeReducer,
    zIndex: true,
    renderEdgeLabels: false,
    allowInvalidContainer: true,
    defaultNodeColor: "#40a0ff",
    labelFont: "ui-monospace, SFMono-Regular, Consolas, monospace",
    labelSize: 11,
    labelColor: { color: "#9aaabb" },
    labelRenderedSizeThreshold: 12,
    minCameraRatio: 0.04,
    maxCameraRatio: 20,
    stagePadding: 50,
  } as Partial<SigmaSettings>);

  initCanvasOverlay(sigma, sigmaGraph, rs);

  effectDisposals.push(
    effect(() => {
      const gd = graphData.value;
      const opResult = operationResult.value;
      const showOverlay = trajectoryOverlayVisible.value;
      const snapEp = snapEndpoints.value;
      if (!sigma || !sigmaGraph) return;
      syncSigmaGraph(
        sigmaGraph,
        gd,
        opResult,
        overlayEdgeKeys,
        overlayNodeKeys,
        showOverlay,
        snapEp,
        snapLinks,
      );
      // Snapshot after build -> animation loop reads these as origin
      basePositions.clear();
      sigmaGraph.forEachNode((node) => {
        basePositions.set(node, {
          x: sigmaGraph!.getNodeAttribute(node, "x") as number,
          y: sigmaGraph!.getNodeAttribute(node, "y") as number,
        });
      });
      sigma.refresh();
    }),
  );

  effectDisposals.push(
    effect(() => {
      rs.selectedIds = selectedIds.value;
      rs.emphasizedIds = emphasizedIds.value;
      rs.hoverNodeId = hoverNodeId.value;
      sigma?.refresh();
    }),
  );

  effectDisposals.push(
    effect(() => {
      if (view.value === "graph") {
        setTimeout(() => sigma?.refresh(), 0);
      }
      if (
        view.value === "graph" &&
        graphData.value.points.length > 0 &&
        animationEnabled.value
      )
        startAmbientLoop();
      else stopAmbientLoop();
    }),
  );

  // Redraw cluster hulls whenever hull toggle, data, probe coords, or camera changes
  effectDisposals.push(
    effect(() => {
      void showClusterHulls.value;
      void graphData.value;
      void operationResult.value;
      void viewMode.value;
      void operationConfig.value;
      drawClusterHulls();
    }),
  );

  sigma.on("afterRender", drawClusterHulls);
}

export function destroyRenderer(): void {
  for (const dispose of effectDisposals) dispose();
  effectDisposals.length = 0;
  if (pulseRaf) {
    cancelAnimationFrame(pulseRaf);
    pulseRaf = null;
  }
  stopAmbientLoop();
  sigma?.removeListener("afterRender", drawClusterHulls);
  destroyCanvasOverlay();
  sigma?.kill();
  sigma = null;
  sigmaGraph = null;
  overlayEdgeKeys.length = 0;
  overlayNodeKeys.length = 0;
  snapLinks.clear();
  pulses.clear();
  sigmaContainer?.removeEventListener("mousedown", onDragMouseDown2D, {
    capture: true,
  });
  window.removeEventListener("mousemove", onDragMouseMove2D);
  window.removeEventListener("mouseup", onDragMouseUp2D);
  resetDragSelect();
  unbindSigmaEvents();
  sigmaContainer = null;
}

export function sigmaRefresh(): void {
  sigma?.refresh();
}

export function highlightGhostStep(stepId: string | null): void {
  void stepId;
  // hoverNodeId is set by the caller; sigma picks it up on next refresh
  sigma?.refresh();
}

export function resizeRenderer(): void {
  sigma?.resize();
  sigma?.refresh();
}

export function getCameraState(): { x: number; y: number; ratio: number } {
  const cam = sigma?.getCamera()?.getState();
  return { x: cam?.x ?? 0, y: cam?.y ?? 0, ratio: cam?.ratio ?? 1 };
}

export function applySigmaViewport(viewport: {
  x: number;
  y: number;
  ratio: number;
}): void {
  if (!sigma || !viewport) return;
  const ratio = viewport.ratio != null ? Number(viewport.ratio) : 1;
  sigma.getCamera().setState({
    x: Number(viewport.x ?? 0),
    y: Number(viewport.y ?? 0),
    ratio: Math.max(0.01, ratio),
  });
}

export function fitCamera(): void {
  if (!sigma || !sigmaGraph) return;
  const nodes = sigmaGraph.nodes();
  if (!nodes.length) {
    sigma
      .getCamera()
      .animate({ x: 0, y: 0, ratio: 1, angle: 0 }, { duration: 200 });
    return;
  }
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const n of nodes) {
    const x = sigmaGraph.getNodeAttribute(n, "x") as number;
    const y = sigmaGraph.getNodeAttribute(n, "y") as number;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  // ratio=1 is Sigmas "show full graph extent"; cx/cy are in graph attribute space
  sigma
    .getCamera()
    .animate({ x: cx, y: cy, ratio: 1, angle: 0 }, { duration: 200 });
}

export function addOverlayEdges(): void {
  if (!sigmaGraph) return;
  syncOperationOverlay(
    sigmaGraph,
    operationResult.value,
    overlayEdgeKeys,
    overlayNodeKeys,
    trajectoryOverlayVisible.value,
    snapEndpoints.value,
    snapLinks,
  );
}

export function pulseIds(ids: string[]): void {
  fillPulseMap(ids, pulses);
  startPulseLoop();
}

export function pulseOperationResult(result: NelsOperationResult | null): void {
  pulseIds(extractResultPointIds(result));
}

// ---- internals ----

function ambientPhase(node: string): number {
  return ambientTime / 900 + hashString(node) * 0.0007;
}

function startAmbientLoop(): void {
  if (ambientRaf) return;
  const loop = (): void => {
    if (
      !sigma ||
      !sigmaGraph ||
      view.value !== "graph" ||
      !animationEnabled.value
    ) {
      ambientRaf = null;
      restoreBasePositions();
      return;
    }
    ambientTime = performance.now();
    const t = ambientTime / 1000;
    basePositions.forEach(({ x, y }, node) => {
      if (sigmaGraph!.hasNode(node)) {
        const { dx, dy } = ambientJitterXY(hashString(node), t);
        sigmaGraph!.setNodeAttribute(node, "x", x + dx);
        sigmaGraph!.setNodeAttribute(node, "y", y + dy);
      }
    });
    // Snapped ghost endpoints follow their anchor nodes animated position
    snapLinks.forEach((realKey, ghostKey) => {
      if (sigmaGraph!.hasNode(ghostKey) && sigmaGraph!.hasNode(realKey)) {
        sigmaGraph!.setNodeAttribute(
          ghostKey,
          "x",
          sigmaGraph!.getNodeAttribute(realKey, "x") as number,
        );
        sigmaGraph!.setNodeAttribute(
          ghostKey,
          "y",
          sigmaGraph!.getNodeAttribute(realKey, "y") as number,
        );
      }
    });
    sigma.refresh();
    ambientRaf = requestAnimationFrame(loop);
  };
  ambientRaf = requestAnimationFrame(loop);
}

function stopAmbientLoop(): void {
  if (!ambientRaf) return;
  cancelAnimationFrame(ambientRaf);
  ambientRaf = null;
  restoreBasePositions();
}

function restoreBasePositions(): void {
  if (!sigmaGraph) return;
  basePositions.forEach(({ x, y }, node) => {
    if (sigmaGraph!.hasNode(node)) {
      sigmaGraph!.setNodeAttribute(node, "x", x);
      sigmaGraph!.setNodeAttribute(node, "y", y);
    }
  });
  sigma?.refresh();
}

function startPulseLoop(): void {
  if (pulseRaf) return;
  const loop = (): void => {
    if (!sigma) {
      pulseRaf = null;
      return;
    }
    sigma.refresh();
    if ([...pulses.values()].some((t) => t > Date.now())) {
      pulseRaf = requestAnimationFrame(loop);
    } else {
      pulseRaf = null;
    }
  };
  pulseRaf = requestAnimationFrame(loop);
}
