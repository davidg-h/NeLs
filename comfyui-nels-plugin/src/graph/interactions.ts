import { getSigma } from "./renderer2d.js";
import { graphData } from "../state/graph.js";
import { hoverNodeId, hoverPoint, selectNode, clearSelection } from "../state/selection.js";
import { schedulePushState } from "../state/session.js";

export function bindSigmaEvents(): void {
  const sigma = getSigma();
  if (!sigma) return;

  sigma.on("clickNode", ({ node, event }: { node: string; event: { original?: MouseEvent } }) => {
    const e = event?.original ?? ({} as MouseEvent);
    const additive = e.shiftKey || e.ctrlKey || e.metaKey;
    selectNode(node, additive);
    schedulePushState();
    sigma.refresh();
  });

  sigma.on("clickStage", () => {
    if (!getSigma()) return;
    clearSelection();
    schedulePushState();
    sigma.refresh();
  });

  sigma.on("enterNode", ({ node }: { node: string }) => {
    hoverNodeId.value = node;
    hoverPoint.value = graphData.value.byId.get(node) ?? null;
    sigma.refresh();
  });

  sigma.on("leaveNode", () => {
    hoverNodeId.value = null;
    hoverPoint.value = null;
    sigma.refresh();
  });

  let camTimer: ReturnType<typeof setTimeout> | null = null;
  sigma.getCamera().on("updated", () => {
    if (camTimer) clearTimeout(camTimer);
    camTimer = setTimeout(() => { camTimer = null; schedulePushState(); }, 600);
  });
}
