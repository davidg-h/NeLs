import { api } from "comfyui/api";
import type {
  CanvasSessionPayload,
  NelsSession,
  NelsUiState,
  NelsGraphSnapshot,
  NelsEmbeddingMeta,
} from "./types.js";

// POST /nels/api/canvas-sessions/sync
export function syncCanvasSessions(
  sessions: CanvasSessionPayload[],
): Promise<{ sessions: NelsSession[] }> {
  return postJson("/nels/api/canvas-sessions/sync", { sessions });
}

// GET /nels/api/session/{session_id}
export function getSession(sessionId: string): Promise<NelsSession> {
  return fetchJson(`/nels/api/session/${encodeURIComponent(sessionId)}`);
}

// POST /nels/api/session/{session_id}/ui-state
export function pushUiState(
  sessionId: string,
  state: Partial<NelsUiState>,
): Promise<{ session: NelsSession; ui_state: NelsUiState }> {
  return postJson(
    `/nels/api/session/${encodeURIComponent(sessionId)}/ui-state`,
    state,
  );
}

// POST /nels/api/session/{session_id}/source-preview
export function requestSourcePreview(sessionId: string): Promise<{
  session: NelsSession;
  graph_snapshot: NelsGraphSnapshot;
  embedding_meta: NelsEmbeddingMeta;
}> {
  return postJson(
    `/nels/api/session/${encodeURIComponent(sessionId)}/source-preview`,
    {},
  );
}

// GET /nels/api/llm/status
export function getLlmStatus(): Promise<{
  loaded: boolean;
  model_id: string | null;
}> {
  return fetchJson("/nels/api/llm/status");
}

// POST /nels/api/llm/unload
export function unloadLlm(): Promise<{ ok: boolean }> {
  return postJson("/nels/api/llm/unload", {});
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await api.fetchApi(url, options);
  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);
  return response.json() as Promise<T>;
}

function postJson<T>(url: string, payload: unknown): Promise<T> {
  return fetchJson<T>(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload ?? {}),
  });
}
