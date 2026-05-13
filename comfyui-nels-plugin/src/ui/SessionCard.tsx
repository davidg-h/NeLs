import { h } from "preact";
import { activeSession } from "../state/session.js";
import { graphData } from "../state/graph.js";
import { selectedIds } from "../state/selection.js";
import { operationConfig } from "../state/operation.js";

export function SessionCard() {
  const sess = activeSession.value;
  const snap = sess?.graph_snapshot ?? sess?.source_snapshot ?? null;
  const source = sess?.source_config ?? snap?.source_config ?? {};
  const snapSource = (snap as Record<string, unknown> | null)?.source as Record<string, unknown> | undefined;
  const revision = sess?.ui_state?.state_revision ?? "-";

  const datasetName = (source as Record<string, unknown>).dataset_name as string | undefined;
  const encParams = snapSource?.encoding_params as Record<string, unknown> | undefined;
  const textPooling = encParams?.text_pooling as string | undefined;
  const imagePooling = encParams?.image_pooling as string | undefined;
  const latentShape = encParams?.latent_shape as number[] | undefined;
  const processedSize = encParams?.processed_size as number[] | undefined;
  const latentMode = encParams?.latent_mode as string | undefined;
  const vaeScaling = encParams?.vae_latent_scaling_factor as number | undefined;
  const hasFullLatents = snapSource?.has_full_latents as boolean | undefined;

  const rows: [string, string][] = sess
    ? [
        ["session", sess.session_id],
        ["session node", sess.session_node_id ?? "-"],
        ...(datasetName ? [["dataset", datasetName] as [string, string]] : []),
        ["points", String(graphData.value.points.length)],
        ["projection", String(source.projection_mode ?? snap?.projection_mode ?? "-")],
        ["neighbors", String(source.neighbor_count ?? operationConfig.value.neighbor_count)],
        ...(textPooling ? [["txt_pool", textPooling] as [string, string]] : []),
        ...(imagePooling ? [["img_pool", imagePooling] as [string, string]] : []),
        ...(latentMode ? [["latent_mode", latentMode] as [string, string]] : []),
        ...(latentShape ? [["latent_shape", latentShape.join("×")] as [string, string]] : []),
        ...(processedSize ? [["proc_size", `${processedSize[0]}×${processedSize[1]}`] as [string, string]] : []),
        ...(vaeScaling != null ? [["vae_scale", String(vaeScaling)] as [string, string]] : []),
        ...(hasFullLatents != null ? [["full_lat", hasFullLatents ? "yes" : "no"] as [string, string]] : []),
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
