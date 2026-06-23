import { Fragment } from "preact";
import {
  operationConfig,
  operationResult,
  axisColorMode,
  trajectoryOverlayVisible,
  trajectoryHighlightActive,
  setTrajectoryOverlayVisible,
  setTrajectoryHighlightActive,
  setOperationConfig,
  reconLiveState,
} from "../state/operation.js";
import { selectNode, selectedIds } from "../state/selection.js";
import {
  schedulePushState,
  highlightGhostStepOnCanvas,
} from "../state/rendererBridge.js";
import { graphData } from "../state/graph.js";
import type {
  AxisProjectionScore,
  ConsistencyVariant,
  NearestSample,
  NelsOperationResult,
  ProbeContextItem,
  TrajectoryStepTr,
} from "../api/types.js";

export function ResultCard() {
  const nr = (operationResult.value ?? {}) as NelsOperationResult;
  const trajectory = nr.trajectory;
  const warning = nr.trajectory_overlay_warning;
  const operation = nr.operation;
  const useAxisB =
    axisColorMode.value === "b" && !!nr.axis_b_projection?.length;
  const axisScores = useAxisB ? nr.axis_b_projection : nr.axis_projection;
  const rawLabel = useAxisB ? nr.axis_b_label : nr.axis_label;
  const axisLabel = rawLabel ? rawLabel.split("\n")[0].slice(0, 40) : undefined;
  const inverseHits = nr.inverse_project;
  const textRecon = nr.text_reconstruction;
  const consistencyVariants = nr.consistency_variants;
  const neighborCount = nr.neighbors?.length;
  const hasAxisTrajectoryOverlay =
    operation === "axis_projection" && (nr.trajectory_overlay?.length ?? 0) > 0;

  const rows: [string, string][] = [["operation", String(operation ?? "-")]];
  if (operation === "nearest_neighbor" && neighborCount != null) {
    rows.push(["neighbors", String(neighborCount)]);
  }

  return (
    <details class="nels-panel-card" open>
      <summary>Result</summary>
      <dl>
        {rows.map(([k, v]) => (
          <Fragment key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </Fragment>
        ))}
      </dl>
      {operation === "delta_walk" && <DeltaWalkSourceLane result={nr} />}
      {trajectory && trajectory.length > 0 && (
        <TrajectoryLane steps={trajectory} warning={warning} />
      )}
      {hasAxisTrajectoryOverlay && <AxisTrajectoryHighlightLane />}
      {axisScores && axisScores.length > 0 && (
        <AxisProjectionLane
          scores={axisScores}
          axisLabel={axisLabel}
          isB={useAxisB}
        />
      )}
      <ReconLiveLane />
      {inverseHits && inverseHits.length > 0 && (
        <div class="nels-axis-lane">
          <div class="nels-axis-header">Nearest prompts at probe position</div>
          {inverseHits.slice(0, 5).map((h) => (
            <button
              key={h.id}
              class="nels-nearest-sample nels-nearest-top"
              onClick={() => onClickNearest(h.id)}
            >
              {h.label.slice(0, 60)}
              {h.label.length > 60 ? "…" : ""}
              <span class="nels-nearest-dist"> ({h.score.toFixed(3)})</span>
            </button>
          ))}
          {textRecon && (
            <>
              <div class="nels-cc-metrics" style="margin-top:6px">
                <div class="nels-axis-side-label">Text reconstruction</div>
                <button
                  class="nels-nearest-sample nels-nearest-top"
                  style="margin-top:4px;font-style:italic"
                  title="Click to select probe position on canvas"
                  onClick={() => onClickNearest("probe")}
                >
                  {textRecon.text}
                </button>
                <span style="font-size:10px;color:#64849a">
                  cosine sim: {textRecon.cosine_sim.toFixed(4)}
                </span>
              </div>
              {textRecon.initial_context && (
                <InitialContextLane ctx={textRecon.initial_context} />
              )}
            </>
          )}
        </div>
      )}
      {consistencyVariants && consistencyVariants.length > 0 && (
        <ConsistencyLane result={nr} />
      )}
    </details>
  );
}

function NearestCell({ topK }: { topK: NearestSample[] | undefined }) {
  if (!topK?.length) return <span>-</span>;
  const top3 = topK.slice(0, 3);
  return (
    <div class="nels-nearest-stack">
      {top3.map((n, i) => (
        <button
          key={n.id}
          class={`nels-nearest-sample${i === 0 ? " nels-nearest-top" : " nels-nearest-secondary"}`}
          onClick={() => onClickNearest(n.id)}
          title={n.label}
        >
          <span class="nels-nearest-dist">({n.distance.toFixed(3)})</span>{" "}
          {n.label}
        </button>
      ))}
    </div>
  );
}

function TrajectoryLane({
  steps,
  warning,
}: {
  steps: TrajectoryStepTr[];
  warning?: string;
}) {
  const showOverlay = trajectoryOverlayVisible.value;
  const snapEp = operationConfig.value.snap_endpoints;
  const op = operationResult.value?.operation;
  const isDeltaWalk = op === "delta_walk";
  return (
    <div class="nels-trajectory-lane">
      <div class="nels-trajectory-header">
        <span>{steps.length} steps</span>
        {!isDeltaWalk && (
          <button
            class={`nels-toggle-overlay${snapEp ? " active" : ""}`}
            onClick={() => setOperationConfig({ snap_endpoints: !snapEp })}
          >
            {snapEp ? "Snap ON" : "Snap OFF"}
          </button>
        )}
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
              <th>nearest prompt</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s) => (
              <tr key={s.id}>
                <td>{s.index}</td>
                <td>
                  <button
                    class="nels-nearest-sample nels-nearest-top"
                    style="font-variant-numeric:tabular-nums"
                    title="Highlight on canvas"
                    onClick={() => highlightGhostStepOnCanvas(s.id)}
                  >
                    {s.alpha.toFixed(3)}
                  </button>
                </td>
                <td>
                  <NearestCell topK={s.nearest_top_k} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AxisTrajectoryHighlightLane() {
  const highlightActive = trajectoryHighlightActive.value;
  return (
    <div class="nels-trajectory-lane">
      <div class="nels-trajectory-header">
        <span>axis trajectory</span>
        <button
          class={`nels-toggle-overlay${highlightActive ? " active" : ""}`}
          onClick={() => setTrajectoryHighlightActive(!highlightActive)}
        >
          {highlightActive ? "Highlight ON" : "Highlight trajectory"}
        </button>
      </div>
    </div>
  );
}

function AxisProjectionLane({
  scores,
  axisLabel,
  isB,
}: {
  scores: AxisProjectionScore[];
  axisLabel?: string;
  isB?: boolean;
}) {
  const topN = scores.slice(0, 5);
  const botN = scores.slice(-5).reverse();
  const maxAbs = Math.max(
    ...scores.map((s) => Math.abs(s.projection_score)),
    1e-8,
  );
  const colorTop = isB ? "#fb923c" : "#ef4444";
  const colorBot = isB ? "#4ade80" : "#3b82f6";
  const labelTop = isB ? "D-side (top)" : "B-side (top)";
  const labelBot = isB ? "C-side (bottom)" : "A-side (bottom)";
  const axisParts = axisLabel?.split(" to ");
  const sideA = axisParts?.[0]?.trim();
  const sideB =
    axisParts && axisParts.length >= 2
      ? axisParts.slice(1).join(" to ").trim()
      : undefined;
  const subtitle = isB
    ? "Green -> orange shows alignment with the orthogonal PCA axis (residuals of axis 1)."
    : "Blue -> red shows alignment with the A->B direction in embedding space - not screen distance.";
  return (
    <div class="nels-axis-lane">
      <div class="nels-axis-header">
        {isB ? "Axis 2 (PCA)" : "Axis 1"}
        {axisLabel ? `: ${axisLabel}` : ""} - {scores.length} points ranked
      </div>
      <div style="font-size:10px;color:#64849a;padding:4px 0 6px;line-height:1.4">
        {subtitle}
      </div>
      <div class="nels-axis-col">
        <AxisProjectionSide
          label={labelTop}
          sideNote={sideB}
          color={colorTop}
          scores={topN}
          maxAbs={maxAbs}
          buttonClass="nels-nearest-sample nels-nearest-top"
        />
        <AxisProjectionSide
          label={labelBot}
          sideNote={sideA}
          color={colorBot}
          scores={botN}
          maxAbs={maxAbs}
          buttonClass="nels-nearest-sample nels-nearest-secondary"
        />
      </div>
    </div>
  );
}

function AxisProjectionSide({
  label,
  sideNote,
  color,
  scores,
  maxAbs,
  buttonClass,
}: {
  label: string;
  sideNote?: string;
  color: string;
  scores: AxisProjectionScore[];
  maxAbs: number;
  buttonClass: string;
}) {
  return (
    <>
      <div class="nels-axis-side-label" style={`color:${color}`}>
        {label}
        {sideNote && (
          <span style="color:#94a3b8;font-weight:400"> ({sideNote})</span>
        )}
      </div>
      {scores.map((s) => (
        <button
          key={s.id}
          class={buttonClass}
          onClick={() => onClickNearest(s.id)}
        >
          <span
            class="nels-axis-bar"
            style={`width:${((Math.abs(s.projection_score) / maxAbs) * 60).toFixed(1)}px;background:${color}`}
          />
          {s.label.slice(0, 50)}
          {s.label.length > 50 ? "…" : ""}
          <span class="nels-nearest-dist">
            {" "}
            ({s.projection_score.toFixed(3)})
          </span>
        </button>
      ))}
    </>
  );
}

function ReconLiveLane() {
  const live = reconLiveState.value;
  if (!live) return null;
  return (
    <div class="nels-axis-lane nels-recon-live">
      <div class="nels-axis-header">
        Reconstructing… step {live.step} / {live.maxStep}
      </div>
      <div class="nels-recon-live-score">
        <span>Score</span>
        <div class="nels-recon-live-bar">
          <div
            class="nels-recon-live-fill"
            style={`width:${Math.min(live.cosine_sim * 100, 100).toFixed(1)}%`}
          />
        </div>
        <span style="font-variant-numeric:tabular-nums">
          {live.cosine_sim.toFixed(4)}
        </span>
      </div>
      <div class="nels-recon-live-text">
        {live.bestText.slice(0, 120)}
        {live.bestText.length > 120 ? "…" : ""}
      </div>
    </div>
  );
}

function InitialContextGroup({
  title,
  items,
  color,
}: {
  title: string;
  items: ProbeContextItem[];
  color: string;
}) {
  if (!items.length) return null;
  return (
    <details class="nels-ctx-group">
      <summary>
        {title} ({items.length})
      </summary>
      <div class="nels-axis-col">
        {items.map((item) => (
          <button
            key={item.id}
            class="nels-nearest-sample nels-nearest-secondary"
            onClick={() => onClickNearest(item.id)}
          >
            <span class="nels-ctx-dot" style={`background:${color}`} />
            {item.label.slice(0, 60)}
            {item.label.length > 60 ? "…" : ""}
          </button>
        ))}
      </div>
    </details>
  );
}

function InitialContextLane({
  ctx,
}: {
  ctx: NonNullable<
    NonNullable<NelsOperationResult["text_reconstruction"]>["initial_context"]
  >;
}) {
  return (
    <details class="nels-axis-lane nels-ctx-lane">
      <summary class="nels-axis-header nels-ctx-summary">
        Initial Context
      </summary>
      <InitialContextGroup title="Seeds" items={ctx.seeds} color="#3b82f6" />
      <InitialContextGroup title="Noise" items={ctx.noise} color="#94a3b8" />
      <InitialContextGroup
        title="Negatives"
        items={ctx.negatives}
        color="#ef4444"
      />
    </details>
  );
}

function ConsistencyLane({ result }: { result: NelsOperationResult }) {
  const sc = result.consistency_score;
  const variants = result.consistency_variants ?? [];
  return (
    <div class="nels-axis-lane">
      <div class="nels-axis-header">
        Consistency Check - {variants.length} variants
      </div>
      {sc != null && (
        <div class="nels-cc-metrics">
          <span>
            SC score: <strong>{sc.toFixed(4)}</strong>
          </span>
          <span class="nels-cc-quality">{scQualityLabel(sc)}</span>
          {result.mean_intra != null && (
            <span>intra: {result.mean_intra.toFixed(4)}</span>
          )}
          {result.mean_inter != null && (
            <span>inter: {result.mean_inter.toFixed(4)}</span>
          )}
        </div>
      )}
      <div style="font-size:10px;color:#64849a;padding:2px 0 6px;line-height:1.5">
        <strong style="color:#93a4b8">SC score</strong> = intra / inter - lower
        means tighter cluster. <strong style="color:#93a4b8">Intra</strong>: avg
        cosine distance of variants from seed (low = variants stay close to
        seed). <strong style="color:#93a4b8">Inter</strong>: avg cosine distance
        of seed from random dataset points (high = seed is specific). SC &lt;
        0.2 = tight, 0.2-0.5 = moderate, &gt; 0.5 = loose.
      </div>
      <div style="font-size:10px;color:#64849a;padding:2px 0 6px;line-height:1.5">
        Variants are clustered against the{" "}
        <strong style="color:#93a4b8">full dataset</strong>, not just the
        currently loaded sample - a variant's cluster may have no points in
        the loaded view, so it won't always appear in the cluster legend.
      </div>
      {result.seed_prompt && (
        <button
          class="nels-nearest-sample nels-nearest-top nels-cc-seed"
          onClick={() => {
            if (result.seed_point_id) onClickNearest(result.seed_point_id);
          }}
        >
          seed: {result.seed_prompt.slice(0, 60)}
          {result.seed_prompt.length > 60 ? "…" : ""}
        </button>
      )}
      <div class="nels-axis-col">
        {variants.map((v: ConsistencyVariant) => (
          <button
            key={v.id}
            class={`nels-nearest-sample nels-nearest-secondary${selectedIds.value.has(`__ghost__${v.id}`) ? " active" : ""}`}
            title={v.text}
            onClick={() => onClickNearest(`__ghost__${v.id}`)}
          >
            <span
              class="nels-axis-bar"
              style={`width:${(v.cosine_sim * 60).toFixed(1)}px;background:#22c55e`}
            />
            {v.text.slice(0, 60)}
            {v.text.length > 60 ? "…" : ""}
            <span class="nels-nearest-dist"> ({v.cosine_sim.toFixed(3)})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DeltaWalkSourceLane({ result }: { result: NelsOperationResult }) {
  const ids = result.source_point_ids ?? [];
  if (!ids.length) return null;
  const byId = graphData.value.byId;
  const roles = [
    ["A", "(direction from)"],
    ["B", "(direction to)"],
    ["C", "(walk start)"],
  ] as const;
  return (
    <div class="nels-axis-lane">
      <div class="nels-axis-header">Selected points</div>
      <div class="nels-axis-col">
        {roles.map(([badge, desc], i) => {
          const id = ids[i];
          const label = byId.get(String(id))?.label ?? String(id);
          return (
            <button
              key={id}
              class="nels-nearest-sample nels-nearest-top"
              onClick={() => onClickNearest(String(id))}
            >
              <span class="nels-delta-role-badge" style="margin-right:4px">
                {badge}
              </span>
              {label.slice(0, 50)}
              {label.length > 50 ? "…" : ""}
              <span class="nels-nearest-dist" style="color:#64849a">
                {" "}
                {desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function onClickNearest(id: string): void {
  selectNode(id, false);
  schedulePushState();
}

function scQualityLabel(sc: number): string {
  if (sc < 0.2) return "tight";
  if (sc < 0.5) return "moderate";
  return "loose";
}
