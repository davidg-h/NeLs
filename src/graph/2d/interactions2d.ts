import { getSigma, getSigmaContainer, getSigmaGraph } from "./renderer2d.js";
import { graphData } from "../../state/graph.js";
import {
  hoverNodeId,
  hoverPoint,
  selectNode,
  clearSelection,
  selectedIds,
} from "../../state/selection.js";
import { schedulePushState } from "../../state/rendererBridge.js";
import {
  operationConfig,
  operationResult,
  setOperationConfig,
} from "../../state/operation.js";
import { dragSelectRect } from "../../state/dragSelect.js";
import { showContextMenu } from "../context_menu.js";

// ---- drag select ----

let isDragSelect2D = false;
let dragStart2D: { x: number; y: number } | null = null;

export function resetDragSelect(): void {
  isDragSelect2D = false;
  dragStart2D = null;
  dragSelectRect.value = null;
}

function getDragPos(e: MouseEvent): { x: number; y: number } {
  const rect = getSigmaContainer()!.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

export function onDragMouseDown2D(e: MouseEvent): void {
  if (!e.shiftKey || !getSigmaContainer()) return;
  if (hoverNodeId.value) return;
  e.stopPropagation();
  e.preventDefault();
  const pos = getDragPos(e);
  isDragSelect2D = true;
  dragStart2D = pos;
  dragSelectRect.value = { x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y };
}

export function onDragMouseMove2D(e: MouseEvent): void {
  if (!isDragSelect2D || !dragStart2D || !getSigmaContainer()) return;
  const pos = getDragPos(e);
  dragSelectRect.value = {
    x1: dragStart2D.x,
    y1: dragStart2D.y,
    x2: pos.x,
    y2: pos.y,
  };
}

export function onDragMouseUp2D(_e: MouseEvent): void {
  if (!isDragSelect2D) return;
  isDragSelect2D = false;
  const rect = dragSelectRect.value;
  dragSelectRect.value = null;
  dragStart2D = null;
  const sigma = getSigma();
  const sigmaGraph = getSigmaGraph();
  if (!rect || !sigma || !sigmaGraph) return;

  const x1 = Math.min(rect.x1, rect.x2);
  const x2 = Math.max(rect.x1, rect.x2);
  const y1 = Math.min(rect.y1, rect.y2);
  const y2 = Math.max(rect.y1, rect.y2);
  if (x2 - x1 < 4 && y2 - y1 < 4) return;

  const hit = new Set<string>();
  sigmaGraph.forEachNode((node) => {
    const attrs = sigmaGraph!.getNodeAttributes(node);
    const screen = sigma!.graphToViewport({
      x: attrs.x as number,
      y: attrs.y as number,
    });
    if (screen.x >= x1 && screen.x <= x2 && screen.y >= y1 && screen.y <= y2) {
      hit.add(node);
    }
  });

  selectedIds.value = hit;
  schedulePushState();
}

// Container-level listeners bound by bindSigmaEvents tracked here
// so unbindSigmaEvents can remove them (sigma.on(...) listeners are cleaned up by sigma.kill())
let boundContainer: HTMLElement | null = null;
let probeMouseMoveListener: ((e: MouseEvent) => void) | null = null;
let probeClickListener: ((e: MouseEvent) => void) | null = null;
let probeContextMenuListener: ((e: MouseEvent) => void) | null = null;

export function bindSigmaEvents(): void {
  const sigma = getSigma();
  if (!sigma) return;

  sigma.on(
    "clickNode",
    ({
      node,
      event,
    }: {
      node: string;
      event: { original?: MouseEvent | TouchEvent };
    }) => {
      const e =
        (event?.original as MouseEvent | undefined) ?? ({} as MouseEvent);
      const additive = e.shiftKey || e.ctrlKey || e.metaKey;
      selectNode(node, additive);
      schedulePushState();
      sigma.refresh();
    },
  );

  sigma.on("clickStage", (payload: unknown) => {
    if (!getSigma()) return;

    const cfg = operationConfig.value;

    // Latent Space Probe: place probe at clicked graph position
    if (cfg.operation === "latent_probe" && cfg.probe_place_mode) {
      const ev = (payload as { event?: { x?: number; y?: number } }).event;
      if (ev) {
        const graphCoords = sigma.viewportToGraph({
          x: ev.x ?? 0,
          y: ev.y ?? 0,
        });
        setOperationConfig({
          probe_coords: [graphCoords.x, graphCoords.y],
          probe_mode: "2d",
          probe_place_mode: false,
        });
        schedulePushState();
      }
      sigma.refresh();
      return;
    }

    clearSelection();
    schedulePushState();
    sigma.refresh();
  });

  sigma.on("enterNode", ({ node }: { node: string }) => {
    hoverNodeId.value = node;
    const real = graphData.value.byId.get(node);
    if (real) {
      hoverPoint.value = real;
    } else {
      // Ghost node -> build synthetic hover data from Sigma node attributes
      const s = getSigma();
      const attrs = s ? s.getGraph().getNodeAttributes(node) : null;
      if (attrs?.isGhost && attrs.ghostCoords2d) {
        const c2 = attrs.ghostCoords2d as [number, number];
        const c3 = attrs.ghostCoords3d as [number, number, number] | undefined;
        const displayId = node.startsWith("__ghost__") ? node.slice(9) : node;
        const clusterId = attrs.ghostClusterId as number | null | undefined;
        // prefer full text from operationResult over sigma attribute
        const variant = operationResult.value?.consistency_variants?.find(
          (v) => v.id === displayId,
        );
        const text = variant?.text ?? (attrs.label as string | undefined) ?? "";
        hoverPoint.value = {
          id: displayId,
          view_coords: c3 ?? c2,
          label: text,
          metadata: {
            text: text || undefined,
            ...(clusterId != null && clusterId >= 0
              ? { ghost_cluster_id: clusterId }
              : {}),
          },
        };
      } else {
        hoverPoint.value = null;
      }
    }
    sigma.refresh();
  });

  sigma.on("leaveNode", () => {
    hoverNodeId.value = null;
    hoverPoint.value = null;
    sigma.refresh();
  });

  // Probe marker hover - canvas overlay
  const PROBE_HIT_RADIUS = 12; // px, matches probe sphere radius with small margin

  function getProbeCoords2d(): number[] | null {
    const cfg = operationConfig.value;
    if (cfg.operation !== "latent_probe") return null;
    const coords2d =
      cfg.probe_mode === "2d" ? cfg.probe_coords : cfg.probe_cross_coords;
    return coords2d && coords2d.length >= 2 ? coords2d : null;
  }

  function isProbeHit(viewportX: number, viewportY: number): boolean {
    const s = getSigma();
    const coords2d = getProbeCoords2d();
    if (!s || !coords2d) return false;
    const sc = s.graphToViewport({ x: coords2d[0], y: coords2d[1] });
    const dx = viewportX - sc.x;
    const dy = viewportY - sc.y;
    return Math.sqrt(dx * dx + dy * dy) <= PROBE_HIT_RADIUS;
  }

  function clearProbeHover(): void {
    if (hoverNodeId.value === "probe") {
      hoverNodeId.value = null;
      hoverPoint.value = null;
    }
  }

  function onProbeMouseMove(e: MouseEvent): void {
    const coords2d = getProbeCoords2d();
    const container = getSigmaContainer();
    if (!coords2d || !container) {
      clearProbeHover();
      return;
    }
    const { x: mx, y: my } = getDragPos(e);
    const hit = isProbeHit(mx, my);

    if (!hit) {
      clearProbeHover();
      return;
    }
    if (hoverNodeId.value === null || hoverNodeId.value === "probe") {
      const recon =
        operationResult.value?.operation === "latent_probe"
          ? operationResult.value?.text_reconstruction
          : undefined;
      hoverNodeId.value = "probe";
      hoverPoint.value = {
        id: "probe",
        view_coords: [coords2d[0], coords2d[1]],
        label: "Latent probe",
        metadata: {
          text: "Latent Space Probe",
          recon_text: recon?.text,
          recon_sim: recon?.cosine_sim,
        },
      };
    }
  }

  const container = getSigmaContainer();
  boundContainer = container;

  probeMouseMoveListener = onProbeMouseMove;
  container?.addEventListener("mousemove", probeMouseMoveListener);

  probeClickListener = (e: MouseEvent) => {
    const coords2d = getProbeCoords2d();
    if (!coords2d || operationConfig.value.probe_place_mode) return;
    const { x: mx, y: my } = getDragPos(e);
    if (!isProbeHit(mx, my)) return;
    const additive = e.shiftKey || e.ctrlKey || e.metaKey;
    selectNode("probe", additive);
    schedulePushState();
    sigma.refresh();
  };
  container?.addEventListener("click", probeClickListener);

  probeContextMenuListener = (e: MouseEvent) => {
    const id = hoverNodeId.value;
    if (!id) return;
    e.preventDefault();
    if (id === "probe") {
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
      return;
    }
    if (id.startsWith("__ghost__")) {
      const s = getSigma();
      const attrs = s ? s.getGraph().getNodeAttributes(id) : null;
      if (!attrs?.isGhost) return;
      const displayId = id.slice(9);
      const variant = operationResult.value?.consistency_variants?.find(
        (v) => v.id === displayId,
      );
      const text = variant?.text ?? (attrs.label as string | undefined) ?? "";
      if (text) showContextMenu(e.clientX, e.clientY, id, text);
      return;
    }
    if (!graphData.value.byId.has(id)) return;
    showContextMenu(e.clientX, e.clientY, id);
  };
  container?.addEventListener("contextmenu", probeContextMenuListener);

  let camTimer: ReturnType<typeof setTimeout> | null = null;
  sigma.getCamera().on("updated", () => {
    if (camTimer) clearTimeout(camTimer);
    camTimer = setTimeout(() => {
      camTimer = null;
      schedulePushState();
    }, 600);
  });
}

/** Remove the container-level listeners bound by bindSigmaEvents */
export function unbindSigmaEvents(): void {
  if (boundContainer) {
    if (probeMouseMoveListener)
      boundContainer.removeEventListener("mousemove", probeMouseMoveListener);
    if (probeClickListener)
      boundContainer.removeEventListener("click", probeClickListener);
    if (probeContextMenuListener)
      boundContainer.removeEventListener(
        "contextmenu",
        probeContextMenuListener,
      );
  }
  boundContainer = null;
  probeMouseMoveListener = null;
  probeClickListener = null;
  probeContextMenuListener = null;
}
