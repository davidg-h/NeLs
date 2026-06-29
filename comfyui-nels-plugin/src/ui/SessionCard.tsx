import { Fragment } from "preact";
import { activeSession } from "../state/session.js";
import { graphData } from "../state/graph.js";
import { selectedIds } from "../state/selection.js";

export function SessionCard() {
  const sess = activeSession.value;
  const meta = sess?.graph_snapshot?.source ?? null;
  const revision = sess?.ui_state?.state_revision ?? "-";

  const rows: [string, string][] = [];
  if (sess) {
    rows.push(["session", sess.session_id]);
    rows.push(["session node", sess.session_node_id ?? "-"]);
    if (meta?.dataset_name) rows.push(["dataset", meta.dataset_name]);
    if (meta?.source_dataset) rows.push(["source", meta.source_dataset]);
    if (meta?.encoder) rows.push(["encoder", meta.encoder]);
    if (meta?.clip_type) rows.push(["clip type", meta.clip_type]);
    if (meta?.embedding_strategy) {
      rows.push(["embedding strategy", meta.embedding_strategy]);
    }
    if (meta?.embedding_shape?.length) {
      rows.push(["compact shape", meta.embedding_shape.join(" x ")]);
    }
    if (meta?.full_dim?.length) {
      rows.push(["full shape", meta.full_dim.join(" x ")]);
    }
    if (meta?.total_sample_count != null) {
      rows.push(["dataset total", String(meta.total_sample_count)]);
    }
    if (meta?.loaded_sample_count != null) {
      rows.push(["loaded", String(meta.loaded_sample_count)]);
    }
    if (meta?.embedding_dim != null) {
      rows.push(["dim", String(meta.embedding_dim)]);
    }
    rows.push(["points", String(graphData.value.points.length)]);
    rows.push(["revision", String(revision)]);
    rows.push(["selected", String(selectedIds.value.size)]);
  } else {
    rows.push(["Status", "No active session"]);
  }

  return (
    <details class="nels-panel-card">
      <summary>Session</summary>
      <dl>
        {rows.map(([k, v]) => (
          <Fragment key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </Fragment>
        ))}
      </dl>
    </details>
  );
}
