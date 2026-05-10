import { h } from "preact";
import { operationResult, metrics } from "../state/operation.js";

export function ResultCard() {
  const result = operationResult.value ?? {};
  const m = metrics.value ?? {};

  const rows: [string, string][] = [
    ["operation", String(result.operation ?? "-")],
    ["request", String(result.request_id ?? "-")],
    ["metric", String((m as Record<string, unknown>).metric_mode ?? "-")],
    ["neighbors", String(result.neighbors?.length ?? "-")],
    ["trajectory", String(result.points?.length ?? "-")],
    ["status", String(result.status ?? (m as Record<string, unknown>).status ?? "-")],
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
    </details>
  );
}
