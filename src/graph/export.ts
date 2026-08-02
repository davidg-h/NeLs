import { graphData, snapshot, viewMode } from "../state/graph.js";
import { activeSession } from "../state/session.js";
import { operationResult } from "../state/operation.js";
import { clusterColor, groupPointsByCluster } from "./colors.js";
import { getSigma } from "./2d/renderer2d.js";
import type {
  NelsSession,
  NelsOperationResult,
  NelsNeighbor,
  AxisProjectionScore,
  ProbeContextItem,
  TrajectoryStepTr,
} from "../api/types.js";

interface ClusterEntry {
  cluster_id: string;
  cluster_name: string | null;
  color_hex: string;
  point_count: number;
  sample_label: string | null;
  point_ids: string[];
}

export async function exportSnapshot(): Promise<void> {
  const mode = viewMode.value;
  const png = mode === "3d" ? captureCanvas3d() : await captureCanvas2d();
  const legend = buildClusterLegend();
  const html = buildHtml(
    png,
    legend,
    activeSession.value,
    operationResult.value,
    mode,
  );
  const ts = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
  download(`nels-snapshot-${ts}.html`, html);
}

function captureCanvas2d(): Promise<string | null> {
  const sig = getSigma();
  if (sig) sig.refresh();
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      const container = document.querySelector(
        ".nels-sigma-container",
      ) as HTMLElement | null;
      if (!container) {
        resolve(null);
        return;
      }
      const canvases = Array.from(
        container.querySelectorAll("canvas"),
      ) as HTMLCanvasElement[];
      if (!canvases.length) {
        resolve(null);
        return;
      }

      const first = canvases[0];
      const w = first.width || container.clientWidth;
      const h = first.height || container.clientHeight;
      if (!w || !h) {
        resolve(null);
        return;
      }

      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const ctx = off.getContext("2d")!;
      ctx.fillStyle = "#05090f";
      ctx.fillRect(0, 0, w, h);
      const layers = canvases.slice(0, -1);
      for (const c of layers) {
        try {
          ctx.drawImage(c, 0, 0);
        } catch {
          /* skip tainted layer */
        }
      }
      resolve(off.toDataURL("image/png"));
    });
  });
}

function captureCanvas3d(): string | null {
  const container = document.querySelector(
    ".nels-sigma-container",
  ) as HTMLElement | null;
  if (!container) return null;
  const canvas = container.querySelector("canvas") as HTMLCanvasElement | null;
  if (!canvas) return null;
  try {
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

function buildClusterLegend(): ClusterEntry[] {
  const map = groupPointsByCluster(graphData.value.points);
  const clusterLabels = snapshot.value?.source?.cluster_labels ?? {};
  return [...map.entries()]
    .map(([cluster_id, { count, sample, ids }]) => ({
      cluster_id,
      cluster_name: clusterLabels[cluster_id] ?? null,
      color_hex: clusterColor(cluster_id),
      point_count: count,
      sample_label: sample,
      point_ids: ids,
    }))
    .sort((a, b) => Number(a.cluster_id) - Number(b.cluster_id));
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tableRow(k: string, v: string): string {
  return `<tr><td class="k">${esc(k)}</td><td>${esc(v)}</td></tr>`;
}

function labelFor(id: string): string {
  return graphData.value.byId.get(id)?.label ?? id;
}

function pairSourceSection(ids: string[]): string {
  if (!ids.length) return "";
  const rows = ids
    .map((id) => `<tr><td>${esc(id)}</td><td>${esc(labelFor(id))}</td></tr>`)
    .join("\n");
  return `<h2>Source Points</h2>
<table class="ptable">
<thead><tr><th>ID</th><th>Prompt</th></tr></thead>
<tbody>${rows}</tbody></table>`;
}

function deltaWalkSourceSection(ids: string[]): string {
  if (!ids.length) return "";
  const roles = [
    ["A", "direction from"],
    ["B", "direction to"],
    ["C", "walk start"],
  ] as const;
  const rows = roles
    .map(([badge, desc], i) => {
      const id = ids[i];
      if (!id) return "";
      return `<tr><td class="num">${badge}</td><td>${esc(id)}</td><td>${esc(labelFor(id))}</td><td class="sample">${esc(desc)}</td></tr>`;
    })
    .filter(Boolean)
    .join("\n");
  return `<h2>Source Points</h2>
<table class="ptable">
<thead><tr><th>Role</th><th>ID</th><th>Prompt</th><th></th></tr></thead>
<tbody>${rows}</tbody></table>`;
}

function trajectorySection(trajectory: TrajectoryStepTr[]): string {
  if (!trajectory.length) return "";
  const rows = trajectory
    .map((s) => {
      const top = (s.nearest_top_k ?? [])
        .slice(0, 3)
        .map((n) => `${esc(n.label)} (${n.distance.toFixed(3)})`)
        .join("<br>");
      return `<tr><td class="num">${s.index}</td><td class="num">${s.alpha.toFixed(3)}</td><td>${top || "-"}</td></tr>`;
    })
    .join("\n");
  return `<h2>Trajectory</h2>
<table class="ptable">
<thead><tr><th>#</th><th>alpha</th><th>nearest prompt</th></tr></thead>
<tbody>${rows}</tbody></table>`;
}

function nearestNeighborSection(opResult: NelsOperationResult): string {
  const neighbors = opResult.neighbors ?? [];
  if (!neighbors.length) return "";
  const byQuery = new Map<string, NelsNeighbor[]>();
  for (const n of neighbors) {
    const q = n.query_id ?? "-";
    if (!byQuery.has(q)) byQuery.set(q, []);
    byQuery.get(q)!.push(n);
  }
  const groups = [...byQuery.entries()]
    .map(([queryId, ns]) => {
      const rows = ns
        .filter((n): n is NelsNeighbor & { id: string } => !!n.id)
        .map(
          (n) =>
            `<tr><td>${esc(n.id)}</td><td>${esc(labelFor(n.id))}</td><td class="num">${n.score.toFixed(3)}</td></tr>`,
        )
        .join("\n");
      const queryLabel =
        queryId !== "-" ? `${esc(queryId)} - ${esc(labelFor(queryId))}` : "-";
      return `<p class="meta">Query: ${queryLabel}</p>
<table class="ptable">
<thead><tr><th>ID</th><th>Prompt</th><th>score</th></tr></thead>
<tbody>${rows}</tbody></table>`;
    })
    .join("\n");
  return `<h2>Nearest Neighbors</h2>\n${groups}`;
}

function axisProjectionSection(opResult: NelsOperationResult): string {
  const axisParts = opResult.axis_label?.split(" to ");
  const sideA = axisParts?.[0]?.trim();
  const sideB =
    axisParts && axisParts.length >= 2
      ? axisParts.slice(1).join(" to ").trim()
      : undefined;

  const row = (s: AxisProjectionScore) =>
    `<tr><td>${esc(s.id)}</td><td>${esc(s.label)}</td><td class="num">${s.projection_score.toFixed(3)}</td></tr>`;

  const rankedTable = (
    scores: AxisProjectionScore[],
    topLabel: string,
    botLabel: string,
  ): string => {
    const top = scores.slice(0, 5);
    const bot = scores.slice(-5).reverse();
    return `<table class="ptable">
<thead><tr><th>ID</th><th>Prompt</th><th>score</th></tr></thead>
<tbody>
<tr><td colspan="3" class="sample">${esc(topLabel)}</td></tr>
${top.map(row).join("\n")}
<tr><td colspan="3" class="sample">${esc(botLabel)}</td></tr>
${bot.map(row).join("\n")}
</tbody></table>`;
  };

  let out = "";
  const groupA = opResult.source_group_a ?? [];
  const groupB = opResult.source_group_b ?? [];
  if (groupA.length || groupB.length) {
    out += `<h2>Axis Groups</h2>
<table>
${groupA.length ? tableRow("group A", groupA.map(labelFor).join(", ")) : ""}
${groupB.length ? tableRow("group B", groupB.map(labelFor).join(", ")) : ""}
</table>`;
  }
  if (opResult.axis_projection?.length) {
    out += `\n<h2>Axis 1${opResult.axis_label ? `: ${esc(opResult.axis_label)}` : ""}</h2>\n${rankedTable(
      opResult.axis_projection,
      sideB ?? "top",
      sideA ?? "bottom",
    )}`;
  }
  if (opResult.axis_b_projection?.length) {
    out += `\n<h2>Axis 2 (PCA)${opResult.axis_b_label ? `: ${esc(opResult.axis_b_label)}` : ""}</h2>\n${rankedTable(
      opResult.axis_b_projection,
      "top",
      "bottom",
    )}`;
  }
  return out;
}

function consistencySection(opResult: NelsOperationResult): string {
  const variants = opResult.consistency_variants ?? [];
  if (!variants.length) return "";
  const metricRows: string[] = [];
  if (opResult.consistency_score != null)
    metricRows.push(tableRow("SC score", opResult.consistency_score.toFixed(4)));
  if (opResult.mean_intra != null)
    metricRows.push(tableRow("intra", opResult.mean_intra.toFixed(4)));
  if (opResult.mean_inter != null)
    metricRows.push(tableRow("inter", opResult.mean_inter.toFixed(4)));
  const metricsTable = metricRows.length
    ? `<table>\n${metricRows.join("\n")}\n</table>`
    : "";
  const seed = opResult.seed_point_id
    ? `<p class="meta">Seed: ${esc(opResult.seed_point_id)} - ${esc(opResult.seed_prompt ?? labelFor(opResult.seed_point_id))}</p>`
    : "";
  const rows = variants
    .map(
      (v) =>
        `<tr><td>${esc(v.id)}</td><td>${esc(v.text)}</td><td class="num">${v.cosine_sim.toFixed(4)}</td></tr>`,
    )
    .join("\n");
  return `<h2>Consistency Check</h2>
${metricsTable}
${seed}
<table class="ptable">
<thead><tr><th>ID</th><th>Prompt</th><th>cosine sim</th></tr></thead>
<tbody>${rows}</tbody></table>`;
}

function latentProbeSection(
  opResult: NelsOperationResult,
  clusterLabels: Record<string, string>,
): string {
  let out = "";
  const pc = opResult.probe_cluster;
  if (pc) {
    const clusterDesc = pc.is_noise
      ? "noise"
      : `${clusterLabels[String(pc.cluster_id)] ?? pc.cluster_id} (strength ${pc.membership_strength.toFixed(2)})`;
    out += `<h2>Probe</h2>\n<table>\n${tableRow("cluster", clusterDesc)}\n</table>`;
  }
  const hits = opResult.inverse_project ?? [];
  if (hits.length) {
    const rows = hits
      .slice(0, 5)
      .map(
        (h) =>
          `<tr><td>${esc(h.id)}</td><td>${esc(h.label)}</td><td class="num">${h.score.toFixed(3)}</td></tr>`,
      )
      .join("\n");
    out += `\n<h2>Nearest Prompts at Probe Position</h2>\n<table class="ptable">\n<thead><tr><th>ID</th><th>Prompt</th><th>score</th></tr></thead>\n<tbody>${rows}</tbody></table>`;
  }
  const recon = opResult.text_reconstruction;
  if (recon) {
    out += `\n<h2>Text Reconstruction</h2>\n<table>\n${tableRow("text", recon.text)}\n${tableRow("cosine sim", recon.cosine_sim.toFixed(4))}\n</table>`;
    const ctx = recon.initial_context;
    if (ctx) {
      const group = (title: string, items: ProbeContextItem[]): string =>
        items.length
          ? `<p class="meta">${esc(title)} (${items.length}): ${items.map((i) => esc(i.label)).join(", ")}</p>`
          : "";
      out +=
        group("Seeds", ctx.seeds) +
        group("Noise", ctx.noise) +
        group("Negatives", ctx.negatives);
    }
  }
  return out;
}

function buildHtml(
  png: string | null,
  legend: ClusterEntry[],
  sess: NelsSession | null,
  opResult: NelsOperationResult | null,
  mode: "2d" | "3d",
): string {
  const ts = new Date().toLocaleString();
  const label = sess?.label ?? sess?.session_id ?? "-";
  const src = sess?.source_config ?? {};
  const pointCount = graphData.value.points.length;
  const projection = mode === "3d" ? "3d_umap" : "2d_umap";

  const trajectory = opResult?.trajectory as TrajectoryStepTr[] | undefined;
  const hasOp = !!opResult?.operation && opResult.operation !== "inspect";

  // ---- graph image ----
  const imgSection = png ? `<img src="${png}" alt="NELS Graph"/>` : "";

  // ---- session table ----
  const sessionSection = `<h2>Session</h2>
<table>
${tableRow("session", label)}
${tableRow("dataset", String(src.dataset_path ?? "-"))}
${tableRow("points", String(pointCount))}
${tableRow("projection", projection)}
${tableRow("view", mode.toUpperCase())}
</table>`;

  // ---- cluster legend ----
  const legendSection =
    legend.length > 0
      ? `<h2>Cluster Legend</h2>
<table class="ctable">
<thead><tr><th>Cluster</th><th>Points</th><th>Example</th><th>Point IDs</th></tr></thead>
<tbody>
${legend
  .map(
    (e) =>
      `<tr>` +
      `<td><span class="dot" style="background:${esc(e.color_hex)}"></span> ${esc(e.cluster_name ? `${e.cluster_name} (${e.cluster_id})` : e.cluster_id)}</td>` +
      `<td class="num">${e.point_count}</td>` +
      `<td class="sample">${e.sample_label ? esc(e.sample_label) : "-"}</td>` +
      `<td class="ids">${esc(e.point_ids.join(", "))}</td>` +
      `</tr>`,
  )
  .join("\n")}
</tbody></table>`
      : "";

  // ---- operation-specific result ----
  let opSection = "";
  if (hasOp) {
    const op = opResult!.operation;
    const clusterLabels = snapshot.value?.source?.cluster_labels ?? {};
    let specific = "";
    if (op === "nearest_neighbor") specific = nearestNeighborSection(opResult!);
    else if (op === "lerp" || op === "slerp")
      specific =
        pairSourceSection(opResult!.source_point_ids ?? []) +
        trajectorySection(trajectory ?? []);
    else if (op === "delta_walk")
      specific =
        deltaWalkSourceSection(opResult!.source_point_ids ?? []) +
        trajectorySection(trajectory ?? []);
    else if (op === "axis_projection") specific = axisProjectionSection(opResult!);
    else if (op === "consistency_check") specific = consistencySection(opResult!);
    else if (op === "latent_probe")
      specific = latentProbeSection(opResult!, clusterLabels);
    opSection = `\n<h2>Operation</h2>\n<table>\n${tableRow("operation", op)}\n</table>\n${specific}`;
  }

  const viewportRow = `<div class="viewport-row"><div class="img-col">${imgSection}</div><div class="legend-col">${legendSection}</div></div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NELS Snapshot - ${esc(ts)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #05090f; color: #c8dae8;
      font: 13px/1.6 ui-monospace, SFMono-Regular, Consolas, monospace;
      padding: 28px; max-width: 1100px;
    }
    .viewport-row {
      display: grid;
      grid-template-columns: minmax(320px, 45%) 1fr;
      gap: 28px;
      align-items: start;
      margin-bottom: 4px;
    }
    .img-col { position: sticky; top: 20px; align-self: start; }
    .img-col img { width: 100%; height: auto; object-fit: contain; }
    h1  { font-size: 1.1em; color: #e8f0f8; margin-bottom: 4px; }
    h2  { font-size: .78em; color: #7daacc; text-transform: uppercase; letter-spacing: .1em; margin: 22px 0 7px; }
    p.meta { color: #64849a; font-size: .85em; margin-bottom: 20px; }

    img { display: block; max-width: 100%; border-radius: 4px; border: 1px solid #1a2a3a; }

    table { border-collapse: collapse; width: 100%; max-width: 560px; margin-bottom: 4px; }
    td   { padding: 3px 8px 3px 0; vertical-align: top; color: #9aaabb; }
    td.k { color: #64849a; white-space: nowrap; width: 160px; }

    .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; vertical-align: middle; margin-right: 5px; }

    table.ctable, table.ptable { width: 100%; }
    table.ctable th, table.ptable th {
      text-align: left; color: #64849a; font-weight: normal;
      padding: 4px 12px 4px 0; border-bottom: 1px solid #1a2a3a;
      font-size: .82em; text-transform: uppercase; letter-spacing: .06em; white-space: nowrap;
    }
    table.ctable th:nth-child(2) { text-align: right; width: 1px; }
    table.ctable td, table.ptable td { padding: 4px 12px 4px 0; border-bottom: 1px solid #111d2a; vertical-align: top; word-break: break-word; }
    table.ctable td:first-child, table.ptable td:first-child { white-space: nowrap; }
    table.ctable td.num, table.ptable td.num       { text-align: right; white-space: nowrap; width: 1px; }
    table.ctable td.sample, table.ptable td.sample { width: 30%; color: #8aaabb; font-style: italic; }
    table.ctable td.ids    { font-size: .78em; color: #64849a; line-height: 1.7; }

    @media print {
      body { max-width: none; padding: 12px; }
      .viewport-row { display: block; }
      .img-col { position: static; margin-bottom: 16px; }
      .img-col img { width: 100%; max-width: 100%; }
      h2, table { page-break-inside: avoid; }
      h2 { page-break-after: avoid; }
    }
  </style>
</head>
<body>
  <h1>NELS Graph Snapshot</h1>
  <p class="meta">${esc(ts)} | ${esc(label)} | ${pointCount} points | ${esc(mode.toUpperCase())}</p>
  ${viewportRow}
  ${sessionSection}${opSection}
</body>
</html>`;
}

function download(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
