import { graphData } from "../state/graph.js";

let menuEl: HTMLDivElement | null = null;
let activeNodeId: string | null = null;
let activeGhostText: string | null = null;

function buildMenu(): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cssText =
    "position:fixed;z-index:9999;background:#0f1a28;color:#e8f0f8;" +
    "border:1px solid rgba(160,210,255,0.35);border-radius:4px;" +
    "font:12px ui-monospace,monospace;box-shadow:0 4px 14px rgba(0,0,0,0.55);" +
    "padding:4px 0;min-width:130px;display:none;";

  const item = document.createElement("div");
  item.textContent = "Copy Prompt";
  item.style.cssText = "padding:6px 14px;cursor:pointer;user-select:none;";
  item.addEventListener("mouseover", () => {
    item.style.background = "rgba(160,210,255,0.1)";
  });
  item.addEventListener("mouseout", () => {
    item.style.background = "";
  });
  item.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    const node = activeNodeId
      ? graphData.value.byId.get(activeNodeId)
      : undefined;
    const text =
      activeGhostText ??
      (node?.metadata?.["text"] as string | undefined) ??
      node?.label ??
      "";
    if (text) navigator.clipboard.writeText(text).catch(() => {});
    hide();
  });
  el.appendChild(item);

  document.addEventListener(
    "mousedown",
    (e) => {
      if (el.style.display !== "none" && !el.contains(e.target as Node)) hide();
    },
    true,
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hide();
  });

  document.body.appendChild(el);
  return el;
}

function hide(): void {
  if (menuEl) menuEl.style.display = "none";
  activeNodeId = null;
  activeGhostText = null;
}

export function showContextMenu(
  clientX: number,
  clientY: number,
  nodeId: string,
  text?: string,
): void {
  if (!menuEl) menuEl = buildMenu();
  activeNodeId = nodeId;
  activeGhostText = text ?? null;
  menuEl.style.display = "block";
  menuEl.style.left = `${clientX}px`;
  menuEl.style.top = `${clientY}px`;
  // nudge inside viewport if overflowing
  const r = menuEl.getBoundingClientRect();
  if (r.right > window.innerWidth) menuEl.style.left = `${clientX - r.width}px`;
  if (r.bottom > window.innerHeight)
    menuEl.style.top = `${clientY - r.height}px`;
}
