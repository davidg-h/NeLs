import type { RendererModule } from "../graph/rendering_common.js";
import { hoverNodeId } from "./selection.js";

let pushTimer: ReturnType<typeof setTimeout> | null = null;
let pushCallback: (() => void) | null = null;
let getRendererFn: (() => RendererModule) | null = null;

export function registerPushCallback(fn: () => void): void {
  pushCallback = fn;
}

export function registerGetRenderer(fn: () => RendererModule): void {
  getRendererFn = fn;
}

export function schedulePushState(): void {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => pushCallback?.(), 120);
}

export function highlightGhostStepOnCanvas(stepId: string | null): void {
  // 2D renderer uses hoverNodeId to drive Sigmas nodeReducer; 3D has its own highlightedGhostId
  hoverNodeId.value = stepId ? `__ghost__${stepId}` : null;
  const r = getRendererFn?.();
  r?.highlightGhostStep(stepId);
  r?.sigmaRefresh();
}
