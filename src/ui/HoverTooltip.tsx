import { useRef, useEffect } from "preact/hooks";
import { hoverPoint } from "../state/selection.js";
import { getMousePos, buildHoverRows } from "./hoverInfo.js";

export function HoverTooltip({
  containerRef,
  yOffset,
}: {
  containerRef: { current: HTMLElement | null };
  yOffset: number;
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const point = hoverPoint.value;

  useEffect(() => {
    if (!point || !tooltipRef.current || !containerRef.current) return;
    const tooltip = tooltipRef.current;
    const container = containerRef.current;
    const reposition = (): void => {
      const rect = container.getBoundingClientRect();
      const pos = getMousePos();
      tooltip.style.left = `${pos.x - rect.left + 12}px`;
      tooltip.style.top = `${pos.y - rect.top + yOffset}px`;
    };
    reposition();
    window.addEventListener("mousemove", reposition);
    return () => window.removeEventListener("mousemove", reposition);
  });

  if (!point) return null;

  const { rows, reconText, reconSim } = buildHoverRows(point);

  return (
    <div class="nels-panel-hover" ref={tooltipRef}>
      {rows.map(([k, v]) => (
        <div key={k}>
          <strong>{String(k)}</strong>: {String(v)}
        </div>
      ))}
      {reconText && (
        <div class="nels-hover-recon">
          <strong>recon</strong>: {reconText}
          {reconSim && <span class="nels-hover-recon-sim"> ({reconSim})</span>}
        </div>
      )}
    </div>
  );
}
