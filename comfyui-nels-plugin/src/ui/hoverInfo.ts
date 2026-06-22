import type { NelsPoint } from "../api/types.js";

let mousePos = { x: 0, y: 0 };

export function updateMousePos(x: number, y: number): void {
  mousePos = { x, y };
}

export function getMousePos(): { x: number; y: number } {
  return mousePos;
}

export interface HoverRows {
  rows: [string, unknown][];
  reconText: string | null;
  reconSim: string | null;
}

// Rich point-info rows shared by the 2D and 3D hover tooltips
export function buildHoverRows(point: NelsPoint): HoverRows {
  const meta = point.metadata ?? {};
  const rawText = meta.text != null ? String(meta.text) : null;
  const displayText =
    rawText && rawText.length > 200 ? rawText.slice(0, 200) + "…" : rawText;

  const rows: [string, unknown][] = [["id", point.id]];
  if (displayText) rows.push(["text", displayText]);
  if (meta.ghost_cluster_id != null) {
    rows.push(["cluster", `#${meta.ghost_cluster_id}`]);
  }
  if (meta.cluster_global != null) {
    rows.push([
      "cluster",
      meta.is_noise ? "noise" : String(meta.cluster_global),
    ]);
    rows.push(["strength", Number(meta.membership_strength ?? 1).toFixed(2)]);
  }
  rows.push(["x", Number(point.view_coords?.[0] ?? 0).toFixed(3)]);
  rows.push(["y", Number(point.view_coords?.[1] ?? 0).toFixed(3)]);
  if (point.view_coords?.length === 3) {
    rows.push(["z", Number(point.view_coords[2]).toFixed(3)]);
  }

  const reconText = meta.recon_text != null ? String(meta.recon_text) : null;
  const reconSim =
    meta.recon_sim != null ? Number(meta.recon_sim).toFixed(3) : null;

  return { rows, reconText, reconSim };
}
