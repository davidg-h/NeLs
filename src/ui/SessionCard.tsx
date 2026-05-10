import { h } from "preact";
import { activeSession } from "../state/session.js";
import { graphData } from "../state/graph.js";
import { selectedIds } from "../state/selection.js";
import { operationConfig } from "../state/operation.js";

export function SessionCard() {
  const sess = activeSession.value;
  const snap = sess?.graph_snapshot ?? sess?.source_snapshot ?? null;
  const source = sess?.source_config ?? snap?.source_config ?? {};
  const revision = sess?.ui_state?.state_revision ?? "-";

  const rows: [string, string][] = sess
    ? [
        ["session", sess.session_id],
        ["session node", sess.session_node_id ?? "-"],
        ["points", String(graphData.value.points.length)],
        ["projection", String(source.projection_mode ?? snap?.projection_mode ?? "-")],
        ["neighbors", String(source.neighbor_count ?? operationConfig.value.neighbor_count)],
        ["revision", String(revision)],
        ["selected", String(selectedIds.value.size)],
      ]
    : [["Status", "No active session"]];

  return (
    <details class="nels-panel-card" open>
      <summary>Session</summary>
      <dl>
        {rows.map(([k, v]) => (
          <>
            <dt key={`dt-${k}`}>{k}</dt>
            <dd key={`dd-${k}`}>{v}</dd>
          </>
        ))}
      </dl>
    </details>
  );
}
