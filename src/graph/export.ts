import { graphData, viewMode } from "../state/graph.js";
import { activeSession } from "../state/session.js";
import { operationResult } from "../state/operation.js";
import { clusterColor, groupPointsByCluster } from "./colors.js";
import { getSigma } from "./2d/renderer2d.js";
import type {
  NelsSession,
  NelsOperationResult,
  TrajectoryStepTr,
} from "../api/types.js";

interface ClusterEntry {
  cluster_id: string;
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
  return [...map.entries()]
    .map(([cluster_id, { count, sample, ids }]) => ({
      cluster_id,
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
      `<td><span class="dot" style="background:${esc(e.color_hex)}"></span> ${esc(e.cluster_id)}</td>` +
      `<td class="num">${e.point_count}</td>` +
      `<td class="sample">${e.sample_label ? esc(e.sample_label) : "-"}</td>` +
      `<td class="ids">${esc(e.point_ids.join(", "))}</td>` +
      `</tr>`,
  )
  .join("\n")}
</tbody></table>`
      : "";

  // ---- operation table ----
  let opSection = "";
  if (hasOp) {
    const rows: string[] = [tableRow("operation", opResult!.operation)];
    if (opResult!.source_point_ids?.length)
      rows.push(
        tableRow("source points", opResult!.source_point_ids.join(", ")),
      );
    if (trajectory?.length)
      rows.push(tableRow("steps", String(trajectory.length)));
    opSection = `\n<h2>Operation</h2>\n<table>\n${rows.join("\n")}\n</table>`;
  }

  // ---- nearest-dataset-distance per step ----
  let distSection = "";
  if (trajectory?.length) {
    const pairs = trajectory
      .map((s) => ({ alpha: s.alpha, dist: s.nearest_top_k?.[0]?.distance }))
      .filter(
        (p): p is { alpha: number; dist: number } => p.dist !== undefined,
      );
    if (pairs.length > 0) {
      const items = pairs
        .map((p) => `<li>α=${p.alpha.toFixed(3)} → ${p.dist.toFixed(4)}</li>`)
        .join("\n");
      distSection = `\n<h2>Nearest Dataset Distance per Step</h2>\n<ul class="dist">\n${items}\n</ul>`;
    }
  }

  const viewportRow = `<div class="viewport-row">${imgSection}<div>${legendSection}</div></div>`;

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
      grid-template-columns: auto 1fr;
      gap: 28px;
      align-items: start;
      margin-bottom: 4px;
    }
    .viewport-row img { max-width: 640px; }
    h1  { font-size: 1.1em; color: #e8f0f8; margin-bottom: 4px; }
    h2  { font-size: .78em; color: #7daacc; text-transform: uppercase; letter-spacing: .1em; margin: 22px 0 7px; }
    p.meta { color: #64849a; font-size: .85em; margin-bottom: 20px; }

    img { display: block; max-width: 100%; border-radius: 4px; border: 1px solid #1a2a3a; }

    table { border-collapse: collapse; width: 100%; max-width: 560px; margin-bottom: 4px; }
    td   { padding: 3px 8px 3px 0; vertical-align: top; color: #9aaabb; }
    td.k { color: #64849a; white-space: nowrap; width: 160px; }

    .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; vertical-align: middle; margin-right: 5px; }

    table.ctable { width: 100%; }
    table.ctable th {
      text-align: left; color: #64849a; font-weight: normal;
      padding: 4px 12px 4px 0; border-bottom: 1px solid #1a2a3a;
      font-size: .82em; text-transform: uppercase; letter-spacing: .06em; white-space: nowrap;
    }
    table.ctable th:nth-child(2) { text-align: right; width: 1px; }
    table.ctable td { padding: 4px 12px 4px 0; border-bottom: 1px solid #111d2a; vertical-align: top; word-break: break-word; }
    table.ctable td:first-child { white-space: nowrap; }
    table.ctable td.num    { text-align: right; white-space: nowrap; width: 1px; }
    table.ctable td.sample { width: 30%; color: #8aaabb; font-style: italic; }
    table.ctable td.ids    { font-size: .78em; color: #64849a; line-height: 1.7; }

    ul.dist    { list-style: none; padding: 0; columns: 3; column-gap: 20px; max-width: 560px; }
    ul.dist li { color: #9aaabb; font-size: .82em; padding: 1px 0; }
  </style>
</head>
<body>
  <h1>NELS Graph Snapshot</h1>
  <p class="meta">${esc(ts)} · ${esc(label)} · ${pointCount} points · ${esc(mode.toUpperCase())}</p>
  ${viewportRow}
  ${sessionSection}${opSection}${distSection}
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
