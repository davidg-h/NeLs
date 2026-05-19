import { signal } from "@preact/signals";
import { operationConfig, operationResult, metrics, trajectoryOverlayVisible, setTrajectoryOverlayVisible, setOperationConfig } from "../state/operation.js";
import { selectNode, hoverNodeId, hoverPoint } from "../state/selection.js";
import { schedulePushState, highlightGhostStepOnCanvas } from "../state/session.js";
import type { NearestSample, TrajectoryStep } from "../api/types.js";

// Persists which sparkline step the user last clicked
const selectedStepIdx = signal<number | null>(null);

function onClickNearest(id: string): void {
  selectNode(id, false);
  schedulePushState();
}

function NearestCell({ topK }: { topK: NearestSample[] | undefined }) {
  if (!topK?.length) return <span>—</span>;
  return (
    <div class="nels-nearest-stack">
      {topK.map((n, i) => (
        <button key={n.id} class={`nels-nearest-sample${i === 0 ? " nels-nearest-top" : " nels-nearest-secondary"}`} onClick={() => onClickNearest(n.id)}>
          {n.label}
          <span class="nels-nearest-dist"> ({n.distance.toFixed(3)})</span>
        </button>
      ))}
    </div>
  );
}

function fmtVal(v: number): string {
  if (v === 0) return "0";
  if (Math.abs(v) >= 100) return v.toFixed(1);
  if (Math.abs(v) >= 1) return v.toFixed(2);
  return v.toFixed(3);
}

function MetricCurve({ steps }: { steps: TrajectoryStep[] }) {
  const metricMode = operationConfig.value.metric_mode;
  const selIdx = selectedStepIdx.value;

  // Keep only steps that have a computed metric_value
  const pairs = steps
    .map((s) => ({ step: s, value: s.metric_value }))
    .filter((p): p is { step: TrajectoryStep; value: number } => p.value !== undefined);
  if (pairs.length < 2) return null;

  const vals = pairs.map((p) => p.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = Math.max(max - min, 1e-8);

  // SVG layout constants
  const W = 210, H = 72;
  const ML = 44, MR = 6, MT = 6, MB = 14;
  const IW = W - ML - MR;
  const IH = H - MT - MB;

  const toX = (i: number): number => ML + (pairs.length > 1 ? (i / (pairs.length - 1)) * IW : IW / 2);
  const toY = (v: number): number => MT + IH - ((v - min) / range) * IH;
  const linePts = vals.map((v, i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");

  // Y-axis: three ticks (max, mid, min)
  const yTicks = [
    { v: max, y: toY(max) },
    { v: (min + max) / 2, y: toY((min + max) / 2) },
    { v: min, y: toY(min) },
  ];

  // X-axis: alpha values at first, middle, last step
  const xTickIdxs = [...new Set([0, Math.floor((pairs.length - 1) / 2), pairs.length - 1])];
  const xTicks = xTickIdxs.map((i) => ({ x: toX(i), alpha: pairs[i].step.alpha }));

  const hasZeroCross = min < 0 && max > 0;
  const zeroY = hasZeroCross ? toY(0) : null;

  const label = metricMode.replace(/_/g, " ");

  function onSvgClick(e: MouseEvent): void {
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
    const vbX = ((e.clientX - rect.left) / rect.width) * W;
    const rawIdx = ((vbX - ML) / IW) * (pairs.length - 1);
    const clamped = Math.max(0, Math.min(pairs.length - 1, Math.round(rawIdx)));
    selectedStepIdx.value = clamped;
    const ghostStepId = pairs[clamped].step.id;
    hoverNodeId.value = `__ghost__${ghostStepId}`;
    hoverPoint.value = null;
    highlightGhostStepOnCanvas(ghostStepId);
  }

  return (
    <div class="nels-metric-curve">
      <div class="nels-metric-curve-label">{label}</div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        class="nels-metric-svg"
        onClick={onSvgClick}
        style="cursor:crosshair"
      >
        <rect x="0" y="0" width={W} height={H} fill="#060b12" />

        {/* Y gridlines + tick values */}
        {yTicks.map(({ v, y }) => (
          <>
            <line x1={ML} y1={y.toFixed(1)} x2={W - MR} y2={y.toFixed(1)} style="stroke:rgba(255,255,255,0.06);stroke-width:1" />
            <text x={ML - 3} y={(y + 3.5).toFixed(1)} style="fill:#64849a;font:8.5px ui-monospace,monospace;text-anchor:end">{fmtVal(v)}</text>
          </>
        ))}

        {/* Zero line when values straddle zero */}
        {zeroY !== null && (
          <line x1={ML} y1={zeroY.toFixed(1)} x2={W - MR} y2={zeroY.toFixed(1)} style="stroke:rgba(255,255,255,0.18);stroke-width:1;stroke-dasharray:3,3" />
        )}

        {/* Y and X axis lines */}
        <line x1={ML} y1={MT} x2={ML} y2={MT + IH} style="stroke:rgba(255,255,255,0.2);stroke-width:1" />
        <line x1={ML} y1={MT + IH} x2={W - MR} y2={MT + IH} style="stroke:rgba(255,255,255,0.2);stroke-width:1" />

        {/* X-axis alpha tick marks and labels */}
        {xTicks.map(({ x, alpha }) => (
          <>
            <line x1={x.toFixed(1)} y1={(MT + IH).toFixed(1)} x2={x.toFixed(1)} y2={(MT + IH + 3).toFixed(1)} style="stroke:rgba(255,255,255,0.2);stroke-width:1" />
            <text x={x.toFixed(1)} y={(MT + IH + 13).toFixed(1)} style="fill:#64849a;font:8.5px ui-monospace,monospace;text-anchor:middle">{alpha.toFixed(2)}</text>
          </>
        ))}

        {/* Data line */}
        <polyline points={linePts} style="fill:none;stroke:#3b82f6;stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round" />

        {/* Selected step: vertical guide + dot */}
        {selIdx !== null && selIdx >= 0 && selIdx < pairs.length && (
          <>
            <line
              x1={toX(selIdx).toFixed(1)} y1={MT}
              x2={toX(selIdx).toFixed(1)} y2={MT + IH}
              style="stroke:rgba(250,204,21,0.55);stroke-width:1;stroke-dasharray:3,3"
            />
            <circle
              cx={toX(selIdx).toFixed(1)}
              cy={toY(vals[selIdx]).toFixed(1)}
              r="3.5"
              style="fill:#facc15;stroke:#060b12;stroke-width:1.5"
            />
          </>
        )}
      </svg>
      <div class="nels-metric-xaxis-label">α (step)</div>
    </div>
  );
}

function TrajectoryLane({ steps, warning }: { steps: TrajectoryStep[]; warning?: string }) {
  const showOverlay = trajectoryOverlayVisible.value;
  const snapEp = operationConfig.value.snap_endpoints;
  return (
    <div class="nels-trajectory-lane">
      <div class="nels-trajectory-header">
        <span>{steps.length} steps</span>
        <button
          class={`nels-toggle-overlay${snapEp ? " active" : ""}`}
          onClick={() => setOperationConfig({ snap_endpoints: !snapEp })}
        >
          {snapEp ? "Snap ON" : "Snap OFF"}
        </button>
        <button
          class={`nels-toggle-overlay${showOverlay ? " active" : ""}`}
          onClick={() => setTrajectoryOverlayVisible(!showOverlay)}
        >
          {showOverlay ? "Hide on canvas" : "Show on canvas"}
        </button>
      </div>
      {warning && <div class="nels-overlay-warning">{warning}</div>}
      <div class="nels-trajectory-scroll">
        <table class="nels-trajectory-table">
          <thead>
            <tr>
              <th>#</th>
              <th>t</th>
              <th>norm</th>
              <th>nearest</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s) => (
              <tr key={s.id}>
                <td>{s.index}</td>
                <td>{s.alpha.toFixed(3)}</td>
                <td>{s.norm != null ? s.norm.toFixed(4) : "—"}</td>
                <td><NearestCell topK={s.nearest_top_k} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MetricCurve steps={steps} />
    </div>
  );
}

export function ResultCard() {
  const result = operationResult.value ?? {};
  const m = metrics.value ?? {};
  const trajectory = (result as { trajectory?: TrajectoryStep[] }).trajectory;
  const warning = (result as { trajectory_overlay_warning?: string }).trajectory_overlay_warning;

  const rows: [string, string][] = [
    ["operation", String((result as { operation?: string }).operation ?? "-")],
    ["request", String((result as { request_id?: string }).request_id ?? "-")],
    ["metric", String((m as Record<string, unknown>).metric_mode ?? "-")],
    ["neighbors", String((result as { neighbors?: unknown[] }).neighbors?.length ?? "-")],
    ["status", String((result as { status?: string }).status ?? (m as Record<string, unknown>).status ?? "-")],
  ];

  return (
    <details class="nels-panel-card" open>
      <summary>Result</summary>
      <dl>
        {rows.map(([k, v]) => (
          <>
            <dt key={`dt-${k}`}>{k}</dt>
            <dd key={`dd-${k}`}>{v}</dd>
          </>
        ))}
      </dl>
      {trajectory && trajectory.length > 0 && (
        <TrajectoryLane steps={trajectory} warning={warning} />
      )}
    </details>
  );
}
