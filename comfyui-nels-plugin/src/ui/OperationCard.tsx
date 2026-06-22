import { useState, useEffect } from "preact/hooks";
import {
  operationConfig,
  operationResult,
  setOperationConfig,
  setOperationResult,
  axisColorMode,
  type OperationConfig,
} from "../state/operation.js";
import { clearSelection, selectedIds } from "../state/selection.js";
import { schedulePushState } from "../state/rendererBridge.js";
import { fitCamera as fitCamera2D } from "../graph/2d/renderer2d.js";
import { fitCamera as fitCamera3D } from "../graph/3d/renderer3d.js";
import { snapshot, graphData, viewMode } from "../state/graph.js";

const OPERATION_LABELS: Record<string, string> = {
  inspect: "Inspect",
  nearest_neighbor: "Nearest Neighbor",
  lerp: "Linear Interpolation (LERP)",
  slerp: "Spherical Interpolation (SLERP)",
  delta_walk: "Direction Walk",
  axis_projection: "Semantic Axis Projection",
  consistency_check: "Semantic Consistency Check",
  latent_probe: "Latent Space Probe",
};

const OPERATION_DESCRIPTIONS: Record<string, string> = {
  inspect: "View details of selected points. No computation.",
  lerp: "Linearly interpolate between two selected points along the alpha schedule.",
  slerp:
    "Spherically interpolate between two points along the embedding hypersphere — preserves norm.",
  delta_walk:
    "Select A (direction from), B (direction to), C (walk start) — extracts A→B direction and walks from C. Supports extrapolation (alpha < 0 or > 1).",
  axis_projection:
    "Project all dataset points onto the semantic axis A→B. The axis direction is computed from the centroid of Group A vs Group B. Points are colored blue (A-side) to red (B-side).",
  consistency_check:
    "Select 1 seed point and run to test if text variants land close together in embedding space. Ghost nodes appear at variant positions. Lower SC score = tighter semantic cluster.",
  latent_probe:
    "Click anywhere in the graph to probe that position in latent space. The node finds the nearest real prompts and can optionally reconstruct text via iterative inversion (Vec2Text).",
};

const PRESETS: [string, number[]][] = [
  ["3 Steps", [0, 0.5, 1]],
  ["5 Steps", [0, 0.25, 0.5, 0.75, 1]],
  ["10 Steps", [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]],
];

const DELTA_WALK_PRESETS: [string, number[]][] = [
  ["Negative", [-2, -1.5, -1, -0.5, 0]],
  ["Forward", [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]],
  ["Full", [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]],
];

export function OperationCard() {
  const cfg = operationConfig.value;
  const selCount = selectedIds.value.size;
  const hint = selectionHint(cfg.operation, selCount);
  const isDeltaWalk = cfg.operation === "delta_walk";
  const alphaMin = isDeltaWalk ? -2 : 0;
  const alphaMax = isDeltaWalk ? 4 : 1;
  const alphas = ensureAlphas(cfg.alpha_schedule, alphaMin, alphaMax);
  const activePresets = isDeltaWalk ? DELTA_WALK_PRESETS : PRESETS;

  function applyPreset(vals: number[]): void {
    setOperationConfig({ alpha_schedule: vals });
    schedulePushState();
  }

  function updateAlpha(i: number, newVal: number): void {
    const cur = ensureAlphas(
      operationConfig.peek().alpha_schedule,
      alphaMin,
      alphaMax,
    );
    cur[i] = newVal;
    setOperationConfig({ alpha_schedule: cur });
    schedulePushState();
  }

  function sortAlphas(): void {
    const cur = ensureAlphas(
      operationConfig.peek().alpha_schedule,
      alphaMin,
      alphaMax,
    );
    cur.sort((a, b) => a - b);
    setOperationConfig({ alpha_schedule: cur });
    schedulePushState();
  }

  function removeAlpha(i: number): void {
    const cur = ensureAlphas(
      operationConfig.peek().alpha_schedule,
      alphaMin,
      alphaMax,
    );
    cur.splice(i, 1);
    setOperationConfig({ alpha_schedule: cur });
    schedulePushState();
  }

  function addAlpha(): void {
    const cur = ensureAlphas(
      operationConfig.peek().alpha_schedule,
      alphaMin,
      alphaMax,
    );
    const last = cur.length ? cur[cur.length - 1] : 0;
    const next = parseFloat(Math.min(alphaMax, last + 0.1).toFixed(2));
    cur.push(next);
    cur.sort((a, b) => a - b);
    setOperationConfig({ alpha_schedule: cur });
    schedulePushState();
  }

  return (
    <details class="nels-panel-card" open>
      <summary>Operation</summary>
      <div class="nels-panel-controls">
        <div class="nels-panel-row">
          <button
            onClick={() => {
              clearSelection();
              setOperationResult(null);
              setOperationConfig({
                axis_group_a: [],
                axis_group_b: [],
                probe_coords: null,
                probe_cross_coords: null,
                probe_place_mode: false,
              });
              schedulePushState();
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              if (viewMode.peek() === "3d") {
                fitCamera3D();
              } else {
                fitCamera2D();
              }
              schedulePushState();
            }}
          >
            Fit
          </button>
        </div>
        <label class="nels-op-select-label">
          <span>operation</span>
          <select
            value={cfg.operation}
            onChange={onChange("operation", String)}
          >
            {Object.entries(OPERATION_LABELS).map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </label>
        {cfg.operation === "nearest_neighbor" ? (
          <div class="nels-op-description">{nnDescription()}</div>
        ) : cfg.operation === "axis_projection" ? (
          <div class="nels-op-description">
            {axisColorMode.value === "b" &&
            operationResult.value?.axis_b_projection
              ? "Orthogonal axis (PCA of residuals). Points are colored green (C-side) to orange (D-side)."
              : OPERATION_DESCRIPTIONS["axis_projection"]}
          </div>
        ) : OPERATION_DESCRIPTIONS[cfg.operation] ? (
          <div class="nels-op-description">
            {OPERATION_DESCRIPTIONS[cfg.operation]}
          </div>
        ) : null}
        {isDeltaWalk &&
          selCount >= 3 &&
          (() => {
            const ids = [...selectedIds.value];
            const byId = graphData.value.byId;
            const label = (id: string) => byId.get(id)?.label ?? id;
            const roles = [
              ["A", "direction from"],
              ["B", "direction to"],
              ["C", "walk start"],
            ] as const;
            return (
              <div class="nels-delta-roles">
                {roles.map(([role, desc], i) => (
                  <div key={role} class="nels-delta-role-row">
                    <span class="nels-delta-role-badge">{role}</span>
                    <span class="nels-delta-role-label" title={label(ids[i])}>
                      {label(ids[i]).slice(0, 40)}
                      {label(ids[i]).length > 40 ? "…" : ""}
                    </span>
                    <span class="nels-delta-role-desc">{desc}</span>
                  </div>
                ))}
              </div>
            );
          })()}
        {cfg.operation === "nearest_neighbor" && (
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
        )}
        {(cfg.operation === "lerp" ||
          cfg.operation === "slerp" ||
          cfg.operation === "delta_walk" ||
          cfg.operation === "axis_projection") && (
          <div class="nels-alpha-section">
            <span class="nels-alpha-label">alpha schedule</span>
            <span class="nels-alpha-info">
              {cfg.operation === "axis_projection"
                ? "Interpolation steps along each axis. 0 = A/C-side centroid, 1 = B/D-side centroid. Each step produces one image per axis."
                : "Defines the interpolation steps (0 = start, 1 = end). Each value produces one output point along the operation path."}
            </span>
            <div class="nels-alpha-presets">
              {activePresets.map(([label, vals]) => (
                <button
                  key={label}
                  class="nels-alpha-preset-btn"
                  onClick={() => applyPreset(vals)}
                >
                  {label}
                </button>
              ))}
              <button
                class="nels-alpha-preset-btn nels-alpha-sort-btn"
                onClick={sortAlphas}
              >
                Sort ↑
              </button>
            </div>
            <div class="nels-alpha-list">
              {alphas.map((val, i) => (
                <div class="nels-alpha-row" key={i}>
                  <span class="nels-alpha-val">{val.toFixed(2)}</span>
                  <input
                    type="range"
                    class="nels-alpha-slider"
                    style={`--val: ${(((val - alphaMin) / (alphaMax - alphaMin)) * 100).toFixed(1)}%`}
                    min={alphaMin}
                    max={alphaMax}
                    step="0.05"
                    value={val}
                    onInput={(e) =>
                      updateAlpha(
                        i,
                        parseFloat((e.target as HTMLInputElement).value),
                      )
                    }
                  />
                  <button
                    class="nels-alpha-remove"
                    onClick={() => removeAlpha(i)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button class="nels-alpha-add" onClick={addAlpha}>
              + Add Alpha Value
            </button>
          </div>
        )}
        {(cfg.operation === "lerp" ||
          cfg.operation === "slerp" ||
          cfg.operation === "delta_walk") && (
          <label>
            <span>nearest prompts</span>
            <input
              type="checkbox"
              checked={cfg.nearest_sample}
              onChange={(e) => {
                setOperationConfig({
                  nearest_sample: (e.target as HTMLInputElement).checked,
                });
                schedulePushState();
              }}
            />
          </label>
        )}
        {cfg.operation === "consistency_check" && (
          <>
            <label>
              <span>variants (3–20)</span>
              <input
                type="number"
                min={3}
                max={20}
                step={1}
                value={cfg.variant_count}
                onChange={onChange("variant_count", Number)}
              />
            </label>
            <label>
              <span>variation strength</span>
              <div class="nels-strength-row">
                <input
                  type="range"
                  class="nels-alpha-slider"
                  style={`--val: ${(cfg.variation_strength * 100).toFixed(1)}%`}
                  min="0"
                  max="1"
                  step="0.05"
                  value={cfg.variation_strength}
                  onInput={(e) => {
                    setOperationConfig({
                      variation_strength: parseFloat(
                        (e.target as HTMLInputElement).value,
                      ),
                    });
                    schedulePushState();
                  }}
                />
                <span class="nels-alpha-val">
                  {cfg.variation_strength.toFixed(2)}
                </span>
              </div>
            </label>
            <span class="nels-alpha-info">
              How much each variant differs from the seed. Low (&lt;0.35) = word
              dropout only (safe, stays in same cluster). High (0.7–1.0) = LLM
              paraphrase, aggressive rewording.
            </span>
          </>
        )}
        {cfg.operation === "axis_projection" && (
          <>
            <div class="nels-axis-groups">
              <AxisGroupPanel
                label="A"
                groupKey="axis_group_a"
                otherKey="axis_group_b"
              />
              <AxisGroupPanel
                label="B"
                groupKey="axis_group_b"
                otherKey="axis_group_a"
              />
            </div>

            {(cfg.axis_group_a.length === 0 ||
              cfg.axis_group_b.length === 0) && (
              <div class="nels-sel-hint">
                Add at least 1 point to each group to run
              </div>
            )}

            {operationResult.value?.axis_b_projection ? (
              <div class="nels-axis-mode-toggle">
                <button
                  class={axisColorMode.value === "a" ? "active" : ""}
                  onClick={() => {
                    axisColorMode.value = "a";
                  }}
                >
                  Axis 1
                </button>
                <button
                  class={axisColorMode.value === "b" ? "active" : ""}
                  onClick={() => {
                    axisColorMode.value = "b";
                  }}
                >
                  Axis 2
                </button>
              </div>
            ) : (
              operationResult.value?.operation === "axis_projection" && (
                <div class="nels-axis-no-b">
                  No axis 2 available
                  {operationResult.value.axis_b_variance != null
                    ? ` — after subtracting each point's A→B projection (residuals), PCA on those residuals found no strong independent direction: the top component explains only ${(operationResult.value.axis_b_variance * 100).toFixed(1)}% of residual variance (min. 10%). The dataset's semantic structure is mostly one-dimensional along your A→B axis.`
                    : " — no independent orthogonal direction found in the residuals."}
                </div>
              )
            )}

            <div class="nels-alpha-info" style="margin-top:4px">
              {`Trajectory: ${alphas.length} step${alphas.length !== 1 ? "s" : ""} × `}
              {operationResult.value?.axis_b_projection ? "2 axes" : "1 axis"}
              {` = ${alphas.length * (operationResult.value?.axis_b_projection ? 2 : 1)} image${alphas.length * (operationResult.value?.axis_b_projection ? 2 : 1) !== 1 ? "s" : ""}`}
              {operationResult.value?.axis_b_projection
                ? " — Axis 1 then Axis 2"
                : ""}
            </div>
          </>
        )}
        {cfg.operation === "latent_probe" && <LatentProbeControls cfg={cfg} />}
        {hint && <div class="nels-sel-hint">{hint}</div>}
        <details class="nels-selection-help">
          <summary>Selection controls</summary>
          <div class="nels-alpha-info" style="margin-top:4px">
            <strong>click</strong> — select one point (clears previous)
            <br />
            <strong>ctrl+click</strong> — add / remove a point
            <br />
            <strong>shift+drag</strong> — area select (replaces selection)
            <br />
            <strong>click empty space</strong> — clear selection
          </div>
        </details>
      </div>
    </details>
  );
}

function AxisGroupPanel({
  label,
  groupKey,
  otherKey,
}: {
  label: string;
  groupKey: "axis_group_a" | "axis_group_b";
  otherKey: "axis_group_a" | "axis_group_b";
}) {
  const cfg = operationConfig.value;
  const selCount = selectedIds.value.size;
  const group = cfg[groupKey];

  function addSelected(): void {
    const adding = new Set(selectedIds.value);
    const newGroup = [...new Set([...group, ...selectedIds.value])];
    const newOther = cfg[otherKey].filter((id) => !adding.has(id));
    setOperationConfig({
      [groupKey]: newGroup,
      [otherKey]: newOther,
    } as Partial<OperationConfig>);
    schedulePushState();
  }

  function clearGroup(): void {
    setOperationConfig({ [groupKey]: [] } as Partial<OperationConfig>);
    schedulePushState();
  }

  return (
    <div class={`nels-axis-group nels-axis-group-${label.toLowerCase()}`}>
      <div class="nels-axis-group-header">
        <span class="nels-axis-group-label">Group {label}</span>
        <div class="nels-axis-group-actions">
          <button disabled={selCount === 0} onClick={addSelected}>
            + Add selected
          </button>
          <button
            class="nels-axis-group-clear"
            disabled={group.length === 0}
            onClick={clearGroup}
          >
            Clear
          </button>
        </div>
      </div>
      {group.length === 0 ? (
        <span class="nels-axis-group-empty">
          No points — select and click Add
        </span>
      ) : (
        <span class="nels-axis-group-count">
          {group.length} point{group.length !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

function LatentProbeControls({ cfg }: { cfg: OperationConfig }) {
  const hasProbe = cfg.probe_coords != null;
  const coords = cfg.probe_coords;

  return (
    <>
      <div class="nels-panel-row" style="gap:6px;flex-wrap:wrap">
        <button
          class={`nels-toggle-overlay${cfg.probe_place_mode ? " active" : ""}`}
          onClick={() => {
            setOperationConfig({ probe_place_mode: !cfg.probe_place_mode });
            schedulePushState();
          }}
        >
          {cfg.probe_place_mode ? "Placing probe…" : "Place probe"}
        </button>
        {hasProbe && (
          <button
            onClick={() => {
              setOperationConfig({
                probe_coords: null,
                probe_cross_coords: null,
              });
              setOperationResult(null);
              schedulePushState();
            }}
          >
            Clear probe
          </button>
        )}
      </div>

      {cfg.probe_place_mode && (
        <div class="nels-alpha-info">
          Click on empty space in the graph to set a probe point. Works in both
          2D and 3D view.
        </div>
      )}

      {hasProbe && coords && (
        <ProbeCoordEditor coords={coords} mode={cfg.probe_mode} />
      )}

      {!hasProbe && !cfg.probe_place_mode && (
        <div class="nels-sel-hint">
          No probe set — click "Place probe" then click the canvas
        </div>
      )}

      <label>
        <span>text reconstruction</span>
        <input
          type="checkbox"
          checked={cfg.probe_text_recon}
          onChange={(e) => {
            setOperationConfig({
              probe_text_recon: (e.target as HTMLInputElement).checked,
            });
            schedulePushState();
          }}
        />
      </label>
      {cfg.probe_text_recon && (
        <>
          <div class="nels-alpha-info">
            Requires CLIP connected to the node. Iteratively inverts the
            estimated embedding toward a text prompt (Vec2Text approach).
          </div>
          <label>
            <span>max time</span>
            <div class="nels-strength-row">
              <input
                type="range"
                class="nels-alpha-slider"
                style={`--val: ${(((cfg.probe_recon_max_minutes - 1) / 59) * 100).toFixed(1)}%`}
                min={1}
                max={60}
                step={1}
                value={cfg.probe_recon_max_minutes}
                onInput={(e) => {
                  setOperationConfig({
                    probe_recon_max_minutes: parseInt(
                      (e.target as HTMLInputElement).value,
                    ),
                  });
                  schedulePushState();
                }}
              />
              <span class="nels-alpha-val" style="width:42px">
                {cfg.probe_recon_max_minutes} min
              </span>
            </div>
          </label>
          <label>
            <span>max iterations</span>
            <input
              type="number"
              min={1}
              step={1}
              value={cfg.probe_recon_max_iter}
              onChange={onChange("probe_recon_max_iter", Number)}
            />
          </label>
          <label>
            <span>seed count</span>
            <input
              type="number"
              min={1}
              step={1}
              value={cfg.probe_seed_count}
              onChange={onChange("probe_seed_count", Number)}
            />
          </label>
          <label>
            <span>noise count</span>
            <input
              type="number"
              min={0}
              step={1}
              value={cfg.probe_noise_count}
              onChange={onChange("probe_noise_count", Number)}
            />
          </label>
          <label>
            <span>negative count</span>
            <input
              type="number"
              min={0}
              step={1}
              value={cfg.probe_negative_count}
              onChange={onChange("probe_negative_count", Number)}
            />
          </label>
          <div class="nels-alpha-info">
            Seeds: nearest real prompts fed to the LLM as positives. Noise:
            random mid-range prompts for diversity. Negatives: most dissimilar
            prompts to steer away from.
          </div>
        </>
      )}

      {hasProbe && (
        <div class="nels-sel-hint" style="color:#22c55e">
          Probe set — queue the node to run the lookup
        </div>
      )}
    </>
  );
}

function ProbeCoordEditor({
  coords,
  mode,
}: {
  coords: number[];
  mode: "2d" | "3d";
}) {
  const labels = mode === "3d" ? ["x", "y", "z"] : ["x", "y"];

  const [vals, setVals] = useState<string[]>(
    labels.map((_, i) => (coords[i] ?? 0).toFixed(3)),
  );

  // sync when probe is moved via canvas click
  useEffect(() => {
    setVals(labels.map((_, i) => (coords[i] ?? 0).toFixed(3)));
  }, [coords]);

  function commit(next: string[]): void {
    const parsed = next.map((s) => parseFloat(s));
    if (parsed.some((n) => !Number.isFinite(n))) return;
    setOperationConfig({ probe_coords: parsed });
    schedulePushState();
  }

  return (
    <div class="nels-probe-coord-editor">
      <span class="nels-alpha-label">probe ({mode})</span>
      {labels.map((lbl, i) => (
        <label key={lbl} class="nels-probe-coord-row">
          <span>{lbl}</span>
          <input
            type="number"
            step="0.001"
            value={vals[i]}
            onInput={(e) => {
              const next = [...vals];
              next[i] = (e.target as HTMLInputElement).value;
              setVals(next);
            }}
            onBlur={() => commit(vals)}
            onKeyDown={(e) => {
              if ((e as KeyboardEvent).key === "Enter") commit(vals);
            }}
          />
        </label>
      ))}
    </div>
  );
}

function onChange<K extends keyof ReturnType<typeof operationConfig.peek>>(
  key: K,
  cast: (v: string) => ReturnType<typeof operationConfig.peek>[K],
) {
  return (e: Event): void => {
    setOperationConfig({
      [key]: cast((e.target as HTMLInputElement | HTMLSelectElement).value),
    });
    schedulePushState();
  };
}

function selectionHint(op: string, selCount: number): string | null {
  if (op === "lerp" || op === "slerp") {
    if (selCount !== 2) return `Select exactly 2 points (${selCount} selected)`;
  } else if (op === "delta_walk") {
    if (selCount !== 3)
      return `Select exactly 3 points: A (direction from), B (direction to), C (walk start) — ${selCount} selected`;
  } else if (op === "consistency_check") {
    if (selCount !== 1)
      return `Select exactly 1 seed point (${selCount} selected)`;
  }
  return null;
}

function ensureAlphas(schedule: number[], min = 0, max = 1): number[] {
  return schedule
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n) && n >= min && n <= max);
}

function nnDescription(): string {
  const umapParams = snapshot.value?.source?.umap_params;
  const nNeighbors = umapParams?.n_neighbors as number | undefined;
  const base =
    "Find the k closest prompts to your selection in embedding space. Uses FAISS for exact kNN search.";
  if (nNeighbors == null) return base;
  return `${base} Dataset built with UMAP n_neighbors=${nNeighbors} — setting k higher may return points that appear distant in the layout.`;
}
