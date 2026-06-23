import { useEffect, useRef } from "preact/hooks";
import { signal } from "@preact/signals";
import { Header } from "./Header.js";
import { SessionCard } from "./SessionCard.js";
import { ClusterLegend } from "./ClusterLegend.js";
import { OperationCard } from "./OperationCard.js";
import { ResultCard } from "./ResultCard.js";
import { EventLog } from "./EventLog.js";
import { HoverTooltip } from "./HoverTooltip.js";
import { updateMousePos } from "./hoverInfo.js";
import {
  initRenderer as init2D,
  destroyRenderer as destroy2D,
  resizeRenderer as resize2D,
  setHullCanvas as setHullCanvas2D,
} from "../graph/2d/renderer2d.js";
import * as renderer3d from "../graph/3d/renderer3d.js";
import { bindSigmaEvents } from "../graph/2d/interactions2d.js";
import {
  view,
  status,
  animationEnabled,
  setView,
  operationRunning,
} from "../state/events.js";
import { graphData, viewMode } from "../state/graph.js";
import { hoverPoint } from "../state/selection.js";
import { dragSelectRect } from "../state/dragSelect.js";
import { operationResult } from "../state/operation.js";

const SIDEBAR_KEY = "nels-sidebar-width";
const DEFAULT_SIDEBAR_W = 360;
const sidebarWidth = signal(
  parseInt(localStorage.getItem(SIDEBAR_KEY) ?? "") || DEFAULT_SIDEBAR_W,
);

export function Panel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hullCanvasRef = useRef<HTMLCanvasElement>(null);
  const isGraph = view.value === "graph";
  const is3d = viewMode.value === "3d";
  const isLoading = operationRunning.value;
  const pointCount = graphData.value.points.length;

  useEffect(() => {
    if (hullCanvasRef.current) {
      setHullCanvas2D(hullCanvasRef.current);
      renderer3d.setHullCanvas(hullCanvasRef.current);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!is3d) {
      init2D(containerRef.current);
      bindSigmaEvents();
      setTimeout(() => resize2D(), 0);
      const ro = new ResizeObserver(() => resize2D());
      ro.observe(containerRef.current);
      return () => {
        ro.disconnect();
        destroy2D();
      };
    }

    // 3D path
    const ro3d = new ResizeObserver(() => renderer3d.resizeRenderer());
    renderer3d.initRenderer(containerRef.current);
    setTimeout(() => renderer3d.resizeRenderer(), 0);
    ro3d.observe(containerRef.current);

    return () => {
      ro3d.disconnect();
      renderer3d.destroyRenderer();
    };
  }, [is3d]);

  function onMouseMove(e: MouseEvent): void {
    updateMousePos(e.clientX, e.clientY);
  }

  return (
    <div class="nels-panel">
      {isLoading && <div class="nels-loading-bar" />}
      <Header />
      <div
        class={`nels-panel-body${isGraph ? "" : " hidden"}`}
        style={`grid-template-columns: 1fr 4px ${sidebarWidth.value}px`}
      >
        <section class="nels-panel-main">
          <div
            ref={containerRef}
            class="nels-sigma-container"
            onMouseMove={onMouseMove}
          />
          <canvas ref={hullCanvasRef} class="nels-hull-canvas" />
          <DragSelectOverlay />
          {hoverPoint.value && (
            <HoverTooltip
              containerRef={containerRef}
              yOffset={is3d ? -24 : 12}
            />
          )}
          {pointCount > 0 && (
            <div class="nels-point-badge">{pointCount} points</div>
          )}
          {pointCount > 0 && <ClusterLegend />}
          {animationEnabled.value && pointCount > 0 && (
            <div class="nels-anim-badge">animate ON · positions not exact</div>
          )}
          {pointCount === 0 && (
            <div class="nels-panel-empty">
              {isLoading ? (
                <div class="nels-center-loading">
                  <div class="nels-spinner" />
                  <span class="nels-spinner-label">{status.value}</span>
                </div>
              ) : (
                <span>
                  Add a NELS Dataset Loader - NELS Session, then click Refresh
                </span>
              )}
            </div>
          )}
          <AxisLegend />
          <button class="nels-view-logs-btn" onClick={() => setView("logs")}>
            View Logs
          </button>
        </section>
        <div class="nels-resize-handle" onMouseDown={startResize} />
        <aside class="nels-panel-side">
          <OperationCard />
          <ResultCard />
          <SessionCard />
        </aside>
      </div>
      <div class={`nels-panel-logs-view${isGraph ? " hidden" : ""}`}>
        <button class="nels-view-logs-btn" onClick={() => setView("graph")}>
          ← Graph
        </button>
        <EventLog />
      </div>
    </div>
  );
}

function AxisLegend() {
  const result = operationResult.value;
  if (result?.operation !== "axis_projection") return null;
  const scores = result.axis_projection ?? [];
  if (scores.length < 2) return null;
  const labelA = result.axis_keywords_a ?? "A-side";
  const labelB = result.axis_keywords_b ?? "B-side";
  const bScores = result.axis_b_projection;
  const bLabelA =
    bScores && bScores.length >= 2
      ? (result.axis_b_keywords_a ?? "C-side")
      : null;
  const bLabelB =
    bScores && bScores.length >= 2
      ? (result.axis_b_keywords_b ?? "D-side")
      : null;
  const llmLabel = result.axis_label
    ? result.axis_label.split("\n")[0].slice(0, 60)
    : null;
  const llmLabelB = result.axis_b_label
    ? result.axis_b_label.split("\n")[0].slice(0, 60)
    : null;
  return (
    <div class="nels-axis-legend-wrap">
      <AxisLegendRow
        className="nels-axis-legend"
        labelA={labelA}
        labelB={labelB}
        llmLabel={llmLabel}
      />
      {bLabelA && bLabelB && (
        <AxisLegendRow
          className="nels-axis-legend-b2"
          labelA={bLabelA}
          labelB={bLabelB}
          llmLabel={llmLabelB}
        />
      )}
    </div>
  );
}

function AxisLegendRow({
  className,
  labelA,
  labelB,
  llmLabel,
}: {
  className: string;
  labelA: string;
  labelB: string;
  llmLabel: string | null;
}) {
  return (
    <div class={className}>
      <div class="nels-axis-legend-row">
        <span class="nels-axis-legend-side nels-axis-legend-a">← {labelA}</span>
        <div class="nels-axis-legend-bar" />
        <span class="nels-axis-legend-side nels-axis-legend-b">{labelB} →</span>
      </div>
      {llmLabel && <div class="nels-axis-legend-llm">({llmLabel})</div>}
    </div>
  );
}

function DragSelectOverlay() {
  const r = dragSelectRect.value;
  if (!r) return null;
  const left = Math.min(r.x1, r.x2);
  const top = Math.min(r.y1, r.y2);
  const width = Math.abs(r.x2 - r.x1);
  const height = Math.abs(r.y2 - r.y1);
  return (
    <div
      class="nels-drag-select-rect"
      style={`left:${left}px;top:${top}px;width:${width}px;height:${height}px`}
    />
  );
}

function startResize(e: MouseEvent): void {
  e.preventDefault();
  const startX = e.clientX;
  const startW = sidebarWidth.value;
  const handle = e.currentTarget as HTMLElement;
  handle.classList.add("dragging");

  function onMove(ev: MouseEvent): void {
    const newW = Math.max(240, Math.min(600, startW - (ev.clientX - startX)));
    sidebarWidth.value = newW;
  }

  function onUp(): void {
    handle.classList.remove("dragging");
    localStorage.setItem(SIDEBAR_KEY, String(sidebarWidth.value));
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  }

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
}
