import { signal } from "@preact/signals";
import {
  sessions,
  activeSessionId,
  refreshSessions,
  loadPreview,
  loadSession,
} from "../state/session.js";
import { status, animationEnabled } from "../state/events.js";
import { viewMode, setViewMode, graphData } from "../state/graph.js";
import { exportSnapshot } from "../graph/export.js";
import { getLlmStatus, unloadLlm } from "../api/client.js";

const llmLoaded = signal<boolean>(false);
const llmModelId = signal<string | null>(null);

// Poll LLM status every 10s so it updates after a job loads the model
let pollInterval: ReturnType<typeof setInterval> | null = null;

export function Header() {
  startLlmPoll();
  const is3d = viewMode.value === "3d";
  const llm = llmLoaded.value;
  const modelName = llmModelId.value?.split("/").pop() ?? "LLM";

  return (
    <div class="nels-panel-header">
      <div>
        <strong>NELS Graph Panel</strong>
        <span>{status.value}</span>
      </div>
      <div class="nels-panel-actions">
        <div class="nels-session-ctrl">
          <select value={activeSessionId.value} onChange={onSessionChange}>
            {sessions.value.length === 0 ? (
              <option value="">no active sessions</option>
            ) : (
              sessions.value.map((s) => (
                <option key={s.session_id} value={s.session_id}>
                  {s.label || s.session_id}
                </option>
              ))
            )}
          </select>
          <button
            class="nels-icon-btn"
            onClick={() => void onRefresh()}
            title="Refresh sessions & graph"
          >
            ↺
          </button>
        </div>
        <div class="nels-tab-group">
          <button
            class={`nels-tab-btn${!is3d ? " active" : ""}`}
            onClick={() => setViewMode("2d")}
          >
            2D
          </button>
          <button
            class={`nels-tab-btn${is3d ? " active" : ""}`}
            onClick={() => setViewMode("3d")}
          >
            3D
          </button>
        </div>
        <div
          class="nels-switch"
          role="switch"
          aria-checked={animationEnabled.value}
          title="Node positions drift slightly when animated — disable for accurate reading"
          onClick={() => {
            animationEnabled.value = !animationEnabled.value;
          }}
        >
          <span
            class={`nels-switch-label${animationEnabled.value ? " active" : ""}`}
          >
            Animate
          </span>
          <div
            class={`nels-switch-track${animationEnabled.value ? " on" : ""}`}
          >
            <div class="nels-switch-thumb" />
          </div>
        </div>
        <button
          class={`nels-llm-chip${llm ? " loaded" : ""}`}
          title={
            llm
              ? `${llmModelId.value ?? "LLM"} loaded — click to unload and free memory`
              : "LLM not loaded — loads automatically when needed"
          }
          onClick={llm ? () => void handleUnloadLlm() : undefined}
        >
          {llm ? `${modelName} ✕` : "LLM"}
        </button>
        <button
          disabled={graphData.value.points.length === 0}
          onClick={exportSnapshot}
        >
          Export
        </button>
      </div>
    </div>
  );
}

function onSessionChange(e: Event): void {
  activeSessionId.value = (e.target as HTMLSelectElement).value;
  void loadSession();
}

async function onRefresh(): Promise<void> {
  await refreshSessions();
  void loadPreview();
}

async function refreshLlmStatus(): Promise<void> {
  try {
    const s = await getLlmStatus();
    llmLoaded.value = s.loaded;
    llmModelId.value = s.model_id;
  } catch {
    // server not ready yet -> ignore
  }
}

async function handleUnloadLlm(): Promise<void> {
  try {
    await unloadLlm();
    llmLoaded.value = false;
    llmModelId.value = null;
  } catch {
    // ignore
  }
}

function startLlmPoll(): void {
  if (pollInterval) return;
  void refreshLlmStatus();
  pollInterval = setInterval(() => void refreshLlmStatus(), 10_000);
}

export function stopLlmPoll(): void {
  if (!pollInterval) return;
  clearInterval(pollInterval);
  pollInterval = null;
}
