import { h } from "preact";
import {
  sessions,
  activeSessionId,
  refreshSessions,
  loadPreview,
  loadSession,
} from "../state/session.js";
import { status, view, setView, animationEnabled } from "../state/events.js";
import { viewMode, setViewMode } from "../state/graph.js";

export function Header() {
  const isGraph = view.value === "graph";
  const is3d = viewMode.value === "3d";

  function onSessionChange(e: Event): void {
    activeSessionId.value = (e.target as HTMLSelectElement).value;
    void loadSession();
  }

  return (
    <div class="nels-panel-header">
      <div>
        <strong>NELS Graph Panel</strong>
        <span>{status.value}</span>
      </div>
      <div class="nels-panel-actions">
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
        <div
          class="nels-switch"
          role="switch"
          aria-checked={!isGraph}
          onClick={() => setView(isGraph ? "logs" : "graph")}
        >
          <span class={`nels-switch-label${isGraph ? " active" : ""}`}>Graph</span>
          <div class={`nels-switch-track${isGraph ? "" : " on"}`}>
            <div class="nels-switch-thumb" />
          </div>
          <span class={`nels-switch-label${isGraph ? "" : " active"}`}>Logs</span>
        </div>
        <div
          class="nels-switch"
          role="switch"
          aria-checked={is3d}
          onClick={() => setViewMode(is3d ? "2d" : "3d")}
        >
          <span class={`nels-switch-label${is3d ? "" : " active"}`}>2D</span>
          <div class={`nels-switch-track${is3d ? " on" : ""}`}>
            <div class="nels-switch-thumb" />
          </div>
          <span class={`nels-switch-label${is3d ? " active" : ""}`}>3D</span>
        </div>
        <button
          title={
            animationEnabled.value ? "Disable animation" : "Enable animation"
          }
          onClick={() => {
            animationEnabled.value = !animationEnabled.value;
          }}
        >
          {animationEnabled.value ? "🎬" : "⏸️"}
        </button>
        <button onClick={() => void refreshSessions()}>Sessions</button>
        <button onClick={() => void loadPreview()}>Refresh</button>
      </div>
    </div>
  );
}
