import { operationConfig, setOperationConfig, setOperationResult } from "../state/operation.js";
import { clearSelection, selectedIds } from "../state/selection.js";
import { activeSession, schedulePushState } from "../state/session.js";
import { fitCamera } from "../graph/renderer2d.js";
import { graphData } from "../state/graph.js";

function onChange<K extends keyof ReturnType<typeof operationConfig.peek>>(
  key: K,
  cast: (v: string) => ReturnType<typeof operationConfig.peek>[K],
) {
  return (e: Event): void => {
    setOperationConfig({ [key]: cast((e.target as HTMLInputElement | HTMLSelectElement).value) });
    schedulePushState();
  };
}

function onNeighborCountChange(e: Event): void {
  const input = e.target as HTMLInputElement;
  const raw = Number(input.value);
  const knnK = activeSession.value?.source_config?.knn_k;

  if (knnK !== undefined && raw > knnK) {
    const ok = window.confirm(
      `Neighbor count ${raw} exceeds the dataset's precomputed k=${knnK}.\n\n` +
      `Values above ${knnK} require live brute-force search and will be slower.\n\n` +
      `Continue?`,
    );
    if (!ok) {
      input.value = String(operationConfig.peek().neighbor_count);
      return;
    }
  }
  setOperationConfig({ neighbor_count: raw });
  schedulePushState();
}

function selectionHint(op: string, selCount: number): string | null {
  if (op === "lerp" || op === "slerp") {
    if (selCount !== 2) return `Select exactly 2 points (${selCount} selected)`;
  } else if (op === "delta_walk") {
    if (selCount < 1 || selCount > 2) return `Select 1 or 2 points (${selCount} selected)`;
  }
  return null;
}

export function OperationCard() {
  const cfg = operationConfig.value;
  const pointCount = graphData.value.points.length;
  const selCount = selectedIds.value.size;
  const hint = selectionHint(cfg.operation, selCount);

  return (
    <details class="nels-panel-card" open>
      <summary>Operation</summary>
      <div class="nels-panel-controls">
        <label>
          <span>operation</span>
          <select value={cfg.operation} onChange={onChange("operation", String)}>
            <option value="inspect">inspect</option>
            <option value="nearest_neighbor">nearest neighbor</option>
            <option value="lerp">lerp</option>
            <option value="slerp">slerp</option>
            <option value="delta_walk">delta walk</option>
          </select>
        </label>
        <label>
          <span>metric</span>
          <select value={cfg.metric_mode} onChange={onChange("metric_mode", String)}>
            <option value="step_distance">step distance</option>
            <option value="similarity_matrix">similarity matrix</option>
            <option value="distance_to_start">distance to start</option>
            <option value="distance_to_target">distance to target</option>
            <option value="norm_drift">norm drift</option>
          </select>
        </label>
        <label>
          <span>edge mode</span>
          <select value={cfg.edge_mode} onChange={onChange("edge_mode", String)}>
            <option value="none">none</option>
            <option value="knn_cosine">kNN cosine</option>
            <option value="knn_euclidean">kNN euclidean</option>
            <option value="threshold_cosine">threshold cosine</option>
            {pointCount <= 300 && <option value="fully_connected">fully connected</option>}
          </select>
        </label>
        <label>
          <span>neighbors</span>
          <input
            type="number"
            min={1}
            max={128}
            step={1}
            value={cfg.neighbor_count}
            onChange={onNeighborCountChange}
          />
        </label>
        <label>
          <span>alpha</span>
          <input
            type="text"
            value={cfg.alpha_schedule}
            onChange={onChange("alpha_schedule", String)}
          />
        </label>
        {(cfg.operation === "lerp" || cfg.operation === "slerp" || cfg.operation === "delta_walk") && (
          <label>
            <span>nearest sample</span>
            <input
              type="checkbox"
              checked={cfg.nearest_sample}
              onChange={(e) => {
                setOperationConfig({ nearest_sample: (e.target as HTMLInputElement).checked });
                schedulePushState();
              }}
            />
          </label>
        )}
        {hint && <div class="nels-sel-hint">{hint}</div>}
        <div class="nels-panel-row">
          <button onClick={() => { clearSelection(); setOperationResult(null); schedulePushState(); }}>Clear</button>
          <button onClick={() => { fitCamera(); schedulePushState(); }}>Fit</button>
        </div>
      </div>
    </details>
  );
}
