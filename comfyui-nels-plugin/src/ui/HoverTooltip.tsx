import { h } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { hoverPoint } from "../state/selection.js";

// Positioned hover info panel — follows the cursor over the Sigma canvas.
// mousePos is updated imperatively in interactions.ts via the mousemove listener.
let mousePos = { x: 0, y: 0 };
export function updateMousePos(x: number, y: number): void {
  mousePos = { x, y };
}

export function HoverTooltip({ containerRef }: { containerRef: { current: HTMLElement | null } }) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const point = hoverPoint.value;

  useEffect(() => {
    if (!point || !tooltipRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    tooltipRef.current.style.left = `${mousePos.x - rect.left + 12}px`;
    tooltipRef.current.style.top = `${mousePos.y - rect.top + 12}px`;
  });

  if (!point) return null;

  const meta = point.metadata ?? {};
  const rows: [string, unknown][] = [
    ["id", point.id],
    ["label", point.label ?? "-"],
    ["cluster", meta.cluster ?? "-"],
    ["x", Number(point.coords?.[0] ?? 0).toFixed(3)],
    ["y", Number(point.coords?.[1] ?? 0).toFixed(3)],
  ];

  return (
    <div class="nels-panel-hover" ref={tooltipRef}>
      {rows.map(([k, v]) => (
        <div key={k}><strong>{String(k)}</strong>: {String(v)}</div>
      ))}
    </div>
  );
}
