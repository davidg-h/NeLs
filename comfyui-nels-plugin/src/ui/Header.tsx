import { h } from "preact";
import {
  sessions,
  activeSessionId,
  refreshSessions,
  loadPreview,
  loadSession,
} from "../state/session.js";
import { status, view, setView, animationEnabled } from "../state/events.js";

export function Header() {
  const isGraph = view.value === "graph";

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
        <div class="nels-panel-toggle" role="tablist" aria-label="Panel view">
          <button
            class={isGraph ? "active" : ""}
            onClick={() => setView("graph")}
          >
            Graph
          </button>
          <button
            class={isGraph ? "" : "active"}
            onClick={() => setView("logs")}
          >
            Logs
          </button>
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
