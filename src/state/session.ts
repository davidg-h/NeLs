import { signal, computed } from "@preact/signals";
import { app } from "comfyui/app";
import { api } from "comfyui/api";
import type {
  NelsSession,
  NelsEvent,
  NelsGraphSnapshot,
  NelsOperationResult,
  NelsMetricsResult,
  NelsSourceConfig,
  CanvasSessionPayload,
} from "../api/types.js";
import {
  syncCanvasSessions,
  getSession,
  pushUiState,
  requestSourcePreview,
} from "../api/client.js";
import { setStatus, addLog, clearLog } from "./events.js";
import { selectedIds, applySelectedPointIds } from "./selection.js";
import {
  snapshot as snapshotSignal,
  graphData,
  setSnapshot,
  setViewMode,
  viewMode,
  acceptRuntimeSnapshot,
} from "./graph.js";
import {
  operationConfig,
  setOperationConfig,
  setOperationResult,
  setMetrics,
} from "./operation.js";

// Renderer functions imported lazily to avoid circular module initialization
type RendererModule = typeof import("../graph/renderer2d.js");
let cached2d: RendererModule | null = null;
let cached3d: RendererModule | null = null;
function getRenderer(): Promise<RendererModule> {
  if (viewMode.value === "3d") {
    if (cached3d) return Promise.resolve(cached3d);
    return import("../graph/renderer3d.js").then((m) => {
      cached3d = m as unknown as RendererModule;
      return cached3d;
    });
  }
  if (cached2d) return Promise.resolve(cached2d);
  return import("../graph/renderer2d.js").then((m) => {
    cached2d = m;
    return m;
  });
}

export const sessions = signal<NelsSession[]>([]);
export const activeSessionId = signal<string>("");
export const activeSession = computed<NelsSession | null>(
  () =>
    sessions.value.find((s) => s.session_id === activeSessionId.value) ?? null,
);

let lastSequence = 0;
let pushTimer: ReturnType<typeof setTimeout> | null = null;

export async function syncSessions(
  options: { log?: boolean } = {},
): Promise<void> {
  const nodes = collectSessionNodes();
  const data = await syncCanvasSessions(nodes);
  sessions.value = data.sessions ?? [];
  const prev = activeSessionId.value;
  if (!sessions.value.length) {
    activeSessionId.value = "";
  } else if (!sessions.value.some((s) => s.session_id === prev)) {
    activeSessionId.value = sessions.value[0].session_id;
  }
  if (options.log !== false) {
    addLog({
      event_type: "ui_action",
      node_name: "NELS Graph Panel",
      message: `Synced ${nodes.length} NELS Session node(s)`,
      status: "completed",
    });
  }
}

export async function refreshSessions(): Promise<void> {
  setStatus("syncing sessions");
  try {
    await syncSessions();
    if (activeSessionId.value) await loadSession();
    else {
      setSnapshot(null, { acceptCoordinates: true });
      setStatus("no active sessions");
    }
  } catch (err) {
    setStatus(`session sync error: ${(err as Error).message}`);
  }
}

export async function loadSession(): Promise<void> {
  if (!activeSessionId.value) return;
  setStatus("loading session");
  try {
    const data = await getSession(activeSessionId.value);
    upsertSession(data);
    const snap = data.graph_snapshot ?? data.source_snapshot ?? null;
    setSnapshot(snap, { fit: true, fitAlways: true, acceptCoordinates: true });
    setOperationResult(data.operation_result ?? null);
    setMetrics(data.metrics ?? null);
    applyUiStateFields(data.ui_state ?? {}, { skipViewport: false });
    lastSequence = Math.max(
      0,
      ...(data.events ?? []).map((e) => e.sequence ?? 0),
    );

    clearLog();
    const revision = Number(data.ui_state?.state_revision ?? 0);
    for (const event of data.events ?? []) addLog(event, revision);

    setStatus(snap ? "ready" : "no snapshot loaded");
  } catch (err) {
    setStatus(`session load error: ${(err as Error).message}`);
  }
}

export async function loadPreview(): Promise<void> {
  setStatus("refreshing");
  try {
    await syncSessions({ log: false });
  } catch (err) {
    setStatus(`session sync error: ${(err as Error).message}`);
    return;
  }
  if (!activeSessionId.value) {
    setStatus("select a session first");
    return;
  }
  setStatus("refreshing preview");
  try {
    const data = await requestSourcePreview(activeSessionId.value);
    if (data.session) upsertSession(data.session);
    setSnapshot(data.graph_snapshot, {
      fit: true,
      acceptCoordinates: true,
      forceCoordinates: true,
    });
    applyUiStateFields(data.session?.ui_state ?? {}, { skipViewport: false });
    const count = data.graph_snapshot?.points?.length ?? 0;
    addLog({
      event_type: "ui_action",
      node_name: "NELS Graph Panel",
      message: `Refreshed graph preview with ${count} points`,
      status: "completed",
    });
    setStatus("preview refreshed");
  } catch (err) {
    setStatus(`preview error: ${(err as Error).message}`);
  }
}

export function refreshActiveRenderer(): void {
  void getRenderer().then((r) => r.sigmaRefresh());
}

export function highlightGhostStepOnCanvas(stepId: string | null): void {
  void getRenderer().then((r) => {
    (
      r as unknown as { highlightGhostStep?: (id: string | null) => void }
    ).highlightGhostStep?.(stepId);
    r.sigmaRefresh();
  });
}

export function schedulePushState(): void {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => void pushState(), 120);
}

async function pushState(): Promise<void> {
  if (!activeSessionId.value) return;
  const r = await getRenderer();
  const cam = r.getCameraState();
  const cfg = operationConfig.value;
  const snap = snapshotSignal.value;
  const sess = activeSession.value;
  const payload = {
    selected_point_ids: [...selectedIds.value],
    operation: cfg.operation,
    metric_mode: cfg.metric_mode,
    neighbor_count: Math.max(1, cfg.neighbor_count),
    alpha_schedule: cfg.alpha_schedule,
    projection_mode: viewMode.value === "3d" ? "3d_umap" : "2d_umap",
    edge_mode: operationConfig.value.edge_mode,
    nearest_sample: cfg.nearest_sample,
    viewport: cam,
  };
  try {
    const data = await pushUiState(activeSessionId.value, payload);
    if (data.session) upsertSession(data.session);
    setStatus(`state revision ${data.ui_state?.state_revision ?? "-"}`);
  } catch (err) {
    setStatus(`state sync error: ${(err as Error).message}`);
  }
}

export function onSessionEvent(event: NelsEvent): void {
  if (!event?.session_id) return;
  if (event.session_id !== activeSessionId.value) {
    void refreshSessions();
    return;
  }
  lastSequence = Math.max(lastSequence, Number(event.sequence ?? 0));
  const currentRevision = Number(
    activeSession.value?.ui_state?.state_revision ?? 0,
  );
  addLog(event, currentRevision);

  if (event.event_type === "ui_state_updated") {
    const eventRevision = Number(event.state_revision ?? 0);
    const stale =
      currentRevision > 0 &&
      eventRevision > 0 &&
      eventRevision < currentRevision;
    if (!stale) {
      const payload = (event.payload ?? {}) as Record<string, unknown>;
      applyUiStateFields(payload, { skipViewport: true });
    }
  }

  if (
    event.event_type === "source_snapshot" ||
    event.event_type === "graph_snapshot"
  ) {
    const incoming = event.payload as NelsGraphSnapshot | undefined;
    if (incoming) {
      const replace = acceptRuntimeSnapshot(
        incoming,
        snapshotSignal.value,
        graphData.value,
      );
      if (replace) {
        setSnapshot(incoming, {
          fit: true,
          acceptCoordinates: true,
          forceCoordinates: true,
        });
        void getRenderer().then((r) =>
          r.pulseIds((incoming.points ?? []).map((p) => String(p.id))),
        );
      }
    }
  }

  if (event.event_type === "operation_result") {
    const result = (event.payload ?? null) as NelsOperationResult | null;
    setOperationResult(result);
    void getRenderer().then((r) => {
      r.addOverlayEdges();
      r.pulseOperationResult(result);
      r.sigmaRefresh();
    });
  }

  if (event.event_type === "metrics_result") {
    setMetrics((event.payload ?? null) as NelsMetricsResult | null);
    void getRenderer().then((r) => r.sigmaRefresh());
  }

  if (event.event_type === "computing_projection") {
    setStatus(event.message ?? "computing projections...");
    return;
  }

  setStatus(`event ${event.event_type ?? "event"} #${lastSequence}`);
}

export function registerEventListener(abortSignal: AbortSignal): void {
  api.addEventListener(
    "nels.session_event",
    (e: CustomEvent) => onSessionEvent((e.detail as NelsEvent) ?? {}),
    { signal: abortSignal },
  );
}

function upsertSession(data: NelsSession): void {
  const existing = sessions.value.some((s) => s.session_id === data.session_id);
  sessions.value = existing
    ? sessions.value.map((s) => (s.session_id === data.session_id ? data : s))
    : [...sessions.value, data];
}

function applyUiStateFields(
  uiState: Record<string, unknown>,
  options: { skipViewport?: boolean },
): void {
  const ids = ((uiState.selected_point_ids as string[] | undefined) ?? []).map(
    String,
  );
  const validIds =
    graphData.value.byId.size > 0
      ? new Set(graphData.value.byId.keys())
      : undefined;
  applySelectedPointIds(ids, validIds);

  setOperationConfig({
    operation: String(uiState.operation ?? operationConfig.value.operation),
    metric_mode: String(
      uiState.metric_mode ?? operationConfig.value.metric_mode,
    ),
    neighbor_count: Number(
      uiState.neighbor_count ?? operationConfig.value.neighbor_count,
    ),
    alpha_schedule: String(
      uiState.alpha_schedule ?? operationConfig.value.alpha_schedule,
    ),
    edge_mode: String(uiState.edge_mode ?? operationConfig.value.edge_mode),
    nearest_sample: Boolean(
      uiState.nearest_sample ?? operationConfig.value.nearest_sample,
    ),
  });

  const projMode = String(uiState.projection_mode ?? "2d_umap");
  setViewMode(projMode.startsWith("3d") ? "3d" : "2d");

  if (!options.skipViewport) {
    const vp = uiState.viewport as
      | { x: number; y: number; ratio: number }
      | undefined;
    if (vp && typeof vp === "object") {
      void getRenderer().then((r) => r.applySigmaViewport(vp));
    }
  }
}

interface ComfyWidgetNode {
  id: number;
  type?: string;
  comfyClass?: string;
  title?: string;
  properties?: Record<string, unknown>;
  inputs?: Array<{ name: string; link?: number | null }>;
  widgets?: Array<{
    name: string;
    value: unknown;
    callback?: (v: unknown) => void;
  }>;
}

function collectSessionNodes(): CanvasSessionPayload[] {
  const nodes = (app.graph?._nodes ?? []) as ComfyWidgetNode[];
  return nodes.filter(isSessionNode).map((node) => ({
    session_node_id: String(node.id),
    session_label: String(
      nodeWidgetValue(node, "session_label", "default") ?? "default",
    ),
    source_config: sourceConfigForSession(node),
  }));
}

function sourceConfigForSession(
  sessionNode: ComfyWidgetNode,
): NelsSourceConfig {
  const src = linkedSourceNode(sessionNode);
  const nodeClass =
    src &&
    (((src as Record<string, unknown>).comfyClass as string | undefined) ??
      src.type ??
      (src.properties?.["Node name for S&R"] as string | undefined));

  if (nodeClass === "nels_DatasetLoader") {
    return {
      dataset_path: String(nodeWidgetValue(src, "dataset_path", "") ?? ""),
      load_mode: String(
        nodeWidgetValue(src, "load_mode", "first_n") ?? "first_n",
      ),
      count: Number(nodeWidgetValue(src, "count", 1000) ?? 1000),
      window_start: Number(nodeWidgetValue(src, "window_start", 0) ?? 0),
      random_seed: Number(nodeWidgetValue(src, "random_seed", 42) ?? 42),
      edge_mode: operationConfig.value.edge_mode,
      neighbor_count: Math.max(1, operationConfig.value.neighbor_count),
    };
  }

  return {
    edge_mode: operationConfig.value.edge_mode,
    neighbor_count: Math.max(1, operationConfig.value.neighbor_count),
  };
}

function linkedSourceNode(
  node: ComfyWidgetNode | null,
): ComfyWidgetNode | null {
  const linkId = node?.inputs?.find((i) => i.name === "embedding_set")?.link;
  if (linkId === undefined || linkId === null || !app.graph?.links) return null;
  const link = app.graph.links[linkId] ?? app.graph.links[String(linkId)];
  const originId = link?.origin_id;
  return (
    ((app.graph?._nodes ?? []) as ComfyWidgetNode[]).find(
      (n) => String(n.id) === String(originId),
    ) ?? null
  );
}

function isSessionNode(node: ComfyWidgetNode): boolean {
  const cls =
    ((node as Record<string, unknown>).comfyClass as string | undefined) ??
    node.type ??
    (node.properties?.["Node name for S&R"] as string | undefined);
  return cls === "nels_Session" || node.title === "NELS Session";
}

function nodeWidgetValue(
  node: ComfyWidgetNode | null,
  name: string,
  fallback: unknown,
): unknown {
  return node?.widgets?.find((w) => w.name === name)?.value ?? fallback;
}
