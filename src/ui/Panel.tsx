import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { Header } from "./Header.js";
import { SessionCard } from "./SessionCard.js";
import { OperationCard } from "./OperationCard.js";
import { ResultCard } from "./ResultCard.js";
import { EventLog } from "./EventLog.js";
import { HoverTooltip, updateMousePos } from "./HoverTooltip.js";
import {
  initRenderer as init2D,
  destroyRenderer as destroy2D,
  resizeRenderer as resize2D,
} from "../graph/renderer2d.js";
import { bindSigmaEvents } from "../graph/interactions.js";
import { view, status } from "../state/events.js";
import { graphData, viewMode } from "../state/graph.js";
import { hoverPoint } from "../state/selection.js";

export function Panel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isGraph = view.value === "graph";
  const is3d = viewMode.value === "3d";
  const isLoading = /^(refreshing|loading|computing|syncing)/i.test(
    status.value,
  );

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

    // 3D path: lazy-load Three.js only when needed, due to its large size
    let cancelled = false;
    let mod: typeof import("../graph/renderer3d.js") | null = null;
    let ro: ResizeObserver | null = null;

    import("../graph/renderer3d.js")
      .then((m) => {
        if (cancelled || !containerRef.current) return;
        mod = m;
        mod.initRenderer(containerRef.current);
        setTimeout(() => mod?.resizeRenderer(), 0);
        ro = new ResizeObserver(() => mod?.resizeRenderer());
        ro.observe(containerRef.current);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
      ro?.disconnect();
      mod?.destroyRenderer();
    };
  }, [is3d]);

  function onMouseMove(e: MouseEvent): void {
    updateMousePos(e.clientX, e.clientY);
  }

  return (
    <div class="nels-panel">
      {isLoading && <div class="nels-loading-bar" />}
      <Header />
      <div class={`nels-panel-body${isGraph ? "" : " hidden"}`}>
        <section class="nels-panel-main">
          <div
            ref={containerRef}
            class="nels-sigma-container"
            onMouseMove={onMouseMove}
          />
          {hoverPoint.value && <HoverTooltip containerRef={containerRef} />}
          {graphData.value.points.length === 0 && (
            <div class="nels-panel-empty">
              {isLoading ? (
                <div class="nels-center-loading">
                  <div class="nels-spinner" />
                  <span class="nels-spinner-label">{status.value}</span>
                </div>
              ) : (
                <span>
                  Add NELS Data Source → NELS Session, then press Sessions.
                </span>
              )}
            </div>
          )}
        </section>
        <aside class="nels-panel-side">
          <SessionCard />
          <OperationCard />
          <ResultCard />
        </aside>
      </div>
      <div class={`nels-panel-logs-view${isGraph ? " hidden" : ""}`}>
        <EventLog />
      </div>
    </div>
  );
}
