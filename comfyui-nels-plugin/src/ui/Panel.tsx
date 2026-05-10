import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { Header } from "./Header.js";
import { SessionCard } from "./SessionCard.js";
import { OperationCard } from "./OperationCard.js";
import { ResultCard } from "./ResultCard.js";
import { EventLog } from "./EventLog.js";
import { HoverTooltip, updateMousePos } from "./HoverTooltip.js";
import {
  initRenderer,
  destroyRenderer,
  resizeRenderer,
} from "../graph/renderer2d.js";
import { bindSigmaEvents } from "../graph/interactions.js";
import { view } from "../state/events.js";
import { graphData } from "../state/graph.js";
import { hoverPoint } from "../state/selection.js";

export function Panel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isGraph = view.value === "graph";

  useEffect(() => {
    if (!containerRef.current) return;
    initRenderer(containerRef.current);
    bindSigmaEvents();

    // Deferred resize handles the case where ComfyUI renders the tab before making it visible
    setTimeout(() => resizeRenderer(), 0);

    // ResizeObserver ensures Sigma re-measures after panel resize or tab reveal
    const ro = new ResizeObserver(() => resizeRenderer());
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      destroyRenderer();
    };
  }, []);

  // Mouse position tracking for HoverTooltip positioning
  function onMouseMove(e: MouseEvent): void {
    updateMousePos(e.clientX, e.clientY);
    if (hoverPoint.value) {
      // Force tooltip re-position — tooltip reads mousePos imperatively in its effect
    }
  }

  return (
    <div class="nels-panel">
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
              Add NELS Data Source → NELS Session, then press Sessions.
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
