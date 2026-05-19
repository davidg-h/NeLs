import { useRef, useEffect } from "preact/hooks";
import { eventLog } from "../state/events.js";

function esc(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function EventLog() {
  const logRef = useRef<HTMLDivElement>(null);
  const entries = eventLog.value;

  // Auto-scroll to bottom on new entries
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [entries.length]);

  const visible = entries.slice(-180);

  return (
    <div class="nels-panel-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <h3>Event Log</h3>
      <div class="nels-panel-log" ref={logRef}>
        {visible.map((entry, i) => {
          const time = new Date(entry.timestamp).toLocaleTimeString();
          const statusClass = entry.status === "failed" ? " nels-panel-log-status-failed" : "";
          return (
            <div key={i} class={`nels-panel-log-line${entry.stale ? " stale" : ""}`}>
              <span class="nels-panel-log-time">[{time}]</span>{" "}
              <span class="nels-panel-log-node">{esc(entry.node_name)}</span>{" "}
              <span class={`nels-panel-log-type${statusClass}`}>{esc(entry.event_type)}</span>{" "}
              {esc(entry.message)}{entry.stale ? " [stale]" : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
