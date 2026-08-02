import { signal, computed } from "@preact/signals";
import { app } from "comfyui/app";
import { api } from "comfyui/api";
import type { ComfyNode } from "../comfyui.js";
import type {
  NelsSession,
  NelsEvent,
  NelsGraphSnapshot,
  NelsOperationResult,
  NelsSourceConfig,
  CanvasSessionPayload,
} from "../api/types.js";
import {
  syncCanvasSessions,
  getSession,
  pushUiState,
  requestSourcePreview,
} from "../api/client.js";
import {
  setStatus,
  addLog,
  clearLog,
  lockStatus,
  unlockStatus,
  operationRunning,
} from "./events.js";
import { selectedIds, applySelectedPointIds } from "./selection.js";
import {
  snapshot as snapshotSignal,
  graphData,
  setSnapshot,
  viewMode,
  acceptRuntimeSnapshot,
} from "./graph.js";
import {
  operationConfig,
  setOperationConfig,
  setOperationResult,
  setReconLiveState,
} from "./operation.js";
import type { RendererModule } from "../graph/rendering_common.js";
import * as renderer2d from "../graph/2d/renderer2d.js";
import * as renderer3d from "../graph/3d/renderer3d.js";
import { registerPushCallback, registerGetRenderer } from "./rendererBridge.js";

export const sessions = signal<NelsSession[]>([]);
export const activeSessionId = signal<string>("");
export const activeSession = computed<NelsSession | null>(
  () =>
    sessions.value.find((s) => s.session_id === activeSessionId.value) ?? null,
);

let lastSequence = 0;

registerPushCallback(() => void pushState());
registerGetRenderer(getRenderer);

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
      setSnapshot(null);
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
    const snap = data.graph_snapshot ?? null;
    setSnapshot(snap);
    setOperationResult(data.operation_result ?? null);
    applyUiStateFields((data.ui_state ?? {}) as Record<string, unknown>, {
      skipViewport: false,
    });
    lastSequence = Math.max(
      0,
      ...(data.events ?? []).map((e) => e.sequence ?? 0),
    );

    clearLog();
    const revision = Number(data.ui_state?.state_revision ?? 0);
    for (const event of data.events ?? []) addLog(event, revision);

    setStatus(snap ? "ready" : "no snapshot loaded", { priority: false });
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
    setSnapshot(data.graph_snapshot, { forceCoordinates: true });
    applyUiStateFields(
      (data.session?.ui_state ?? {}) as Record<string, unknown>,
      { skipViewport: false },
    );
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

  if (event.event_type === "source_snapshot") {
    const incoming = event.payload as NelsGraphSnapshot | undefined;
    if (incoming) {
      const replace = acceptRuntimeSnapshot(
        incoming,
        snapshotSignal.value,
        graphData.value,
      );
      if (replace) {
        setSnapshot(incoming, { forceCoordinates: true });
        getRenderer().pulseIds(
          (incoming.points ?? []).map((p) => String(p.id)),
        );
      }
    }
  }

  if (event.event_type === "operation_started") {
    const op =
      (event.payload as { operation?: string } | null)?.operation ??
      "operation";
    setReconLiveState(null);
    operationRunning.value = true;
    lockStatus();
    setStatus(`running ${op}...`, { priority: true });
    return;
  }

  if (event.event_type === "recon_iteration") {
    const p =
      (event.payload as {
        step?: number;
        max_step?: number;
        best_text?: string;
        cosine_sim?: number;
      } | null) ?? {};
    setReconLiveState({
      step: Number(p.step ?? 0),
      maxStep: Number(p.max_step ?? 0),
      bestText: String(p.best_text ?? ""),
      cosine_sim: Number(p.cosine_sim ?? 0),
    });
    lockStatus();
    setStatus(`reconstructing step ${p.step ?? "?"}/${p.max_step ?? "?"}...`, {
      priority: true,
    });
    return;
  }

  if (event.event_type === "operation_result") {
    setReconLiveState(null);
    operationRunning.value = false;
    unlockStatus();
    setStatus(`event operation_result #${lastSequence}`, { priority: true });
    const result = (event.payload ?? null) as NelsOperationResult | null;
    setOperationResult(result);

    // Compute cross-mode probe coords from the hit points so the probe is visible in both views
    if (result?.operation === "latent_probe") {
      const hits = result.inverse_project ?? [];
      const cfg = operationConfig.value;
      const gd = graphData.value;
      if (hits.length > 0 && cfg.probe_coords) {
        const crossKey = cfg.probe_mode === "2d" ? "coords_3d" : "coords_2d";
        const dims = cfg.probe_mode === "2d" ? 3 : 2;
        const sumCoords = new Array(dims).fill(0) as number[];
        let totalWeight = 0;
        for (const h of hits) {
          const pt = gd.byId.get(String(h.id));
          const c = pt?.[crossKey];
          if (!c || c.length < dims) continue;
          const w = h.score ?? 1;
          for (let i = 0; i < dims; i++) sumCoords[i] += c[i] * w;
          totalWeight += w;
        }
        if (totalWeight > 0) {
          const crossCoords = sumCoords.map((v) => v / totalWeight);
          setOperationConfig({ probe_cross_coords: crossCoords });
        }
      }
    }

    const r = getRenderer();
    r.addOverlayEdges();
    r.pulseOperationResult(result);
    r.sigmaRefresh();
    return;
  }

  if (event.event_type === "operation_failed") {
    operationRunning.value = false;
    unlockStatus();
    setStatus(event.message ?? "operation failed", { priority: true });
    return;
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
  api.addEventListener(
    "execution_error",
    () => {
      operationRunning.value = false;
      unlockStatus();
      setReconLiveState(null);
      setStatus("execution error", { priority: true });
    },
    { signal: abortSignal },
  );
}

function getRenderer(): RendererModule {
  return viewMode.value === "3d" ? renderer3d : renderer2d;
}

async function pushState(): Promise<void> {
  if (!activeSessionId.value) return;
  const cfg = operationConfig.value;
  const payload = {
    selected_point_ids: [...selectedIds.value],
    operation: cfg.operation,
    neighbor_count: Math.max(1, cfg.neighbor_count),
    alpha_schedule: cfg.alpha_schedule,
    nearest_sample: cfg.nearest_sample,
    variant_count: cfg.variant_count,
    variation_strength: cfg.variation_strength,
    axis_group_a: cfg.axis_group_a,
    axis_group_b: cfg.axis_group_b,
    compute_axis_labels: cfg.compute_axis_labels,
    probe_coords: cfg.probe_coords ?? null,
    probe_mode: cfg.probe_mode,
    probe_text_recon: cfg.probe_text_recon,
    probe_recon_max_minutes: cfg.probe_recon_max_minutes,
    probe_recon_max_iter: cfg.probe_recon_max_iter,
    probe_seed_count: cfg.probe_seed_count,
    probe_noise_count: cfg.probe_noise_count,
    probe_negative_count: cfg.probe_negative_count,
    // 3D has no equivalent viewport model -> omit so it doesnt take up the saved 2D camera state
    ...(viewMode.value === "2d"
      ? { viewport: getRenderer().getCameraState() }
      : {}),
  };
  try {
    const data = await pushUiState(activeSessionId.value, payload);
    if (data.session) upsertSession(data.session);
    setStatus(`state revision ${data.ui_state?.state_revision ?? "-"}`, {
      priority: false,
    });
  } catch (err) {
    setStatus(`state sync error: ${(err as Error).message}`);
  }
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
    neighbor_count: Number(
      uiState.neighbor_count ?? operationConfig.value.neighbor_count,
    ),
    alpha_schedule: Array.isArray(uiState.alpha_schedule)
      ? (uiState.alpha_schedule as number[]).map(Number)
      : operationConfig.value.alpha_schedule,
    nearest_sample: Boolean(
      uiState.nearest_sample ?? operationConfig.value.nearest_sample,
    ),
    variant_count:
      uiState.variant_count != null
        ? Math.max(1, Number(uiState.variant_count))
        : operationConfig.value.variant_count,
    variation_strength:
      uiState.variation_strength != null
        ? Math.max(0.05, Math.min(1, Number(uiState.variation_strength)))
        : operationConfig.value.variation_strength,
    axis_group_a: Array.isArray(uiState.axis_group_a)
      ? (uiState.axis_group_a as string[]).map(String)
      : operationConfig.value.axis_group_a,
    axis_group_b: Array.isArray(uiState.axis_group_b)
      ? (uiState.axis_group_b as string[]).map(String)
      : operationConfig.value.axis_group_b,
    compute_axis_labels: Boolean(
      uiState.compute_axis_labels ?? operationConfig.value.compute_axis_labels,
    ),
    probe_coords: Array.isArray(uiState.probe_coords)
      ? (uiState.probe_coords as number[]).map(Number)
      : uiState.probe_coords === null
        ? null
        : operationConfig.value.probe_coords,
    probe_mode:
      uiState.probe_mode === "3d" || uiState.probe_mode === "2d"
        ? uiState.probe_mode
        : operationConfig.value.probe_mode,
    probe_text_recon: Boolean(
      uiState.probe_text_recon ?? operationConfig.value.probe_text_recon,
    ),
    probe_recon_max_minutes:
      uiState.probe_recon_max_minutes != null
        ? Math.max(1, Number(uiState.probe_recon_max_minutes))
        : operationConfig.value.probe_recon_max_minutes,
    probe_recon_max_iter:
      uiState.probe_recon_max_iter != null
        ? Math.max(1, Number(uiState.probe_recon_max_iter))
        : operationConfig.value.probe_recon_max_iter,
    probe_seed_count:
      uiState.probe_seed_count != null
        ? Math.max(1, Number(uiState.probe_seed_count))
        : operationConfig.value.probe_seed_count,
    probe_noise_count:
      uiState.probe_noise_count != null
        ? Math.max(1, Number(uiState.probe_noise_count))
        : operationConfig.value.probe_noise_count,
    probe_negative_count:
      uiState.probe_negative_count != null
        ? Math.max(1, Number(uiState.probe_negative_count))
        : operationConfig.value.probe_negative_count,
  });

  if (!options.skipViewport && viewMode.value === "2d") {
    const vp = uiState.viewport as
      | { x: number; y: number; ratio: number }
      | undefined;
    if (vp && typeof vp === "object") {
      getRenderer().applySigmaViewport(vp);
    }
  }
}

function collectSessionNodes(): CanvasSessionPayload[] {
  const nodes: ComfyNode[] = app.graph?._nodes ?? [];
  return nodes.filter(isSessionNode).map((node) => ({
    session_node_id: String(node.id),
    session_label: String(
      nodeWidgetValue(node, "session_label", "default") ?? "default",
    ),
    source_config: sourceConfigForSession(node),
  }));
}

function sourceConfigForSession(sessionNode: ComfyNode): NelsSourceConfig {
  const src = linkedSourceNode(sessionNode);
  const nodeClass = nodeClassName(src);

  if (nodeClass === "nels_DatasetLoader") {
    return {
      dataset_path: String(nodeWidgetValue(src, "dataset_path", "") ?? ""),
      load_mode: String(
        nodeWidgetValue(src, "load_mode", "first_n") ?? "first_n",
      ),
      count: Number(nodeWidgetValue(src, "count", 1000) ?? 1000),
      window_start: Number(nodeWidgetValue(src, "window_start", 0) ?? 0),
      random_seed: Number(nodeWidgetValue(src, "random_seed", 42) ?? 42),
    };
  }

  return {};
}

function linkedSourceNode(node: ComfyNode | null): ComfyNode | null {
  const linkId = node?.inputs?.find((i) => i.name === "embedding_set")?.link;
  if (linkId === undefined || linkId === null || !app.graph?.links) return null;
  const link = app.graph.links[linkId] ?? app.graph.links[String(linkId)];
  const originId = link?.origin_id;
  const nodes: ComfyNode[] = app.graph?._nodes ?? [];
  return nodes.find((n) => String(n.id) === String(originId)) ?? null;
}

function isSessionNode(node: ComfyNode): boolean {
  const cls = nodeClassName(node);
  return cls === "nels_Session" || node.title === "NELS Session";
}

function nodeClassName(node: ComfyNode | null): string | undefined {
  if (!node) return undefined;
  return (
    node.comfyClass ??
    node.type ??
    (node.properties?.["Node name for S&R"] as string | undefined)
  );
}

function nodeWidgetValue(
  node: ComfyNode | null,
  name: string,
  fallback: unknown,
): unknown {
  return node?.widgets?.find((w) => w.name === name)?.value ?? fallback;
}
