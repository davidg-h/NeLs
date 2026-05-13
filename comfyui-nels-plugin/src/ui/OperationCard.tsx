import { h } from "preact";
import { operationConfig, setOperationConfig, setOperationResult } from "../state/operation.js";
import { clearSelection } from "../state/selection.js";
import { schedulePushState } from "../state/session.js";
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

export function OperationCard() {
  const cfg = operationConfig.value;
  const pointCount = graphData.value.points.length;

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
            onChange={onChange("neighbor_count", Number)}
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
        <div class="nels-panel-row">
          <button onClick={() => { clearSelection(); setOperationResult(null); schedulePushState(); }}>Clear</button>
          <button onClick={() => { fitCamera(); schedulePushState(); }}>Fit</button>
        </div>
      </div>
    </details>
  );
}
