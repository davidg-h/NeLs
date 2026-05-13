// Injects all NELS panel CSS once. Idempotent.
export function injectStyle(): void {
  if (document.getElementById("nels-graph-panel-style")) return;
  const style = document.createElement("style");
  style.id = "nels-graph-panel-style";
  style.textContent = `
    .nels-panel { position: relative; width: 100%; height: 100%; min-height: 0; display: flex; flex-direction: column; color: #d8dee9; background: #05090f; font: 12px sans-serif; overflow: hidden; }
    .nels-panel * { box-sizing: border-box; }
    .nels-panel-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 12px; border-bottom: 1px solid #1a2232; background: #080d14; }
    .nels-panel-header strong { display: block; font-size: 13px; color: #f8fafc; }
    .nels-panel-header span { color: #93a4b8; }
    .nels-panel-actions { display: flex; align-items: center; gap: 8px; }
    .nels-panel button, .nels-panel select, .nels-panel input { height: 28px; border: 1px solid #1e2d40; border-radius: 4px; background: #0d1520; color: #e6edf3; padding: 0 8px; }
    .nels-panel button { cursor: pointer; }
    .nels-panel button:hover { background: #162030; }
    .nels-panel select { min-width: 180px; }
    .nels-switch { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; user-select: none; }
    .nels-switch-track { position: relative; width: 38px; height: 20px; background: #0d1520; border: 1px solid #1e2d40; border-radius: 999px; flex-shrink: 0; transition: background 0.2s, border-color 0.2s; }
    .nels-switch-track.on { background: #3b82f6; border-color: #3b82f6; }
    .nels-switch-thumb { position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; background: #fff; border-radius: 50%; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.4); }
    .nels-switch-track.on .nels-switch-thumb { transform: translateX(18px); }
    .nels-switch-label { font-size: 11px; color: #8b98a8; transition: color 0.15s; }
    .nels-switch-label.active { color: #e6edf3; }
    .nels-panel-body { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: minmax(420px, 1fr) minmax(320px, 400px); overflow: hidden; }
    .nels-panel-body.hidden, .nels-panel-logs-view.hidden { display: none; }
    .nels-panel-main { position: relative; min-height: 0; border-right: 1px solid #1a2232; background: #05090f; background-image: linear-gradient(rgba(30,60,100,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(30,60,100,0.35) 1px, transparent 1px); background-size: 40px 40px; }
    .nels-sigma-container { position: absolute; inset: 0; overflow: hidden; }
    .nels-sigma-container canvas { position: absolute; top: 0; left: 0; }
    .nels-panel-empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #8b98a8; pointer-events: none; z-index: 1; }
    .nels-panel-hover { position: absolute; z-index: 2; max-width: 260px; padding: 7px 8px; border: 1px solid #1e2d40; border-radius: 5px; background: rgba(5,9,15,0.97); color: #e6edf3; box-shadow: 0 12px 32px rgba(0,0,0,0.5); pointer-events: none; font: 11px ui-monospace, SFMono-Regular, Consolas, monospace; }
    .nels-panel-hover.hidden { display: none; }
    .nels-panel-side { height: 100%; min-height: 0; max-height: 100%; padding: 10px 10px 48px; background: #070b10; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; overflow-x: hidden; scrollbar-gutter: stable; }
    .nels-panel-side .nels-panel-card { flex: 0 0 auto; }
    .nels-panel-logs-view { flex: 1; min-height: 0; padding: 10px; background: #070b10; }
    .nels-panel-logs-view .nels-panel-card { height: 100%; display: flex; flex-direction: column; }
    .nels-panel-card { min-height: 0; border: 1px solid #1a2232; border-radius: 6px; background: #090e16; overflow: visible; }
    .nels-panel-card summary { list-style: none; cursor: pointer; margin: 0; padding: 8px 10px; border-bottom: 1px solid #303946; font-size: 12px; font-weight: 700; color: #f8fafc; }
    .nels-panel-card summary::-webkit-details-marker { display: none; }
    .nels-panel-card summary::after { content: "collapse"; float: right; color: #93a4b8; font-weight: 400; font-size: 11px; }
    .nels-panel-card:not([open]) summary { border-bottom: 0; }
    .nels-panel-card:not([open]) summary::after { content: "expand"; }
    .nels-panel-card h3 { margin: 0; padding: 8px 10px; border-bottom: 1px solid #303946; font-size: 12px; color: #f8fafc; }
    .nels-panel-card dl { display: grid; grid-template-columns: 102px 1fr; gap: 6px 8px; margin: 0; padding: 10px; }
    .nels-panel-card dt { color: #93a4b8; }
    .nels-panel-card dd { margin: 0; color: #d8dee9; overflow-wrap: anywhere; }
    .nels-panel-controls { display: grid; gap: 8px; padding: 10px; }
    .nels-panel-controls label { display: grid; grid-template-columns: 80px minmax(0, 1fr); align-items: center; gap: 8px; }
    .nels-panel-controls label span { color: #93a4b8; }
    .nels-panel-controls input, .nels-panel-controls select { width: 100%; min-width: 0; }
    .nels-panel-row { display: flex; gap: 8px; }
    .nels-panel-row button { flex: 1; }
    .nels-panel-log { flex: 1; overflow: auto; padding: 9px 10px; font: 11px ui-monospace, SFMono-Regular, Consolas, monospace; color: #cbd5e1; }
    .nels-panel-log-line { padding: 3px 0 5px; border-bottom: 1px solid rgba(48,57,70,0.5); }
    .nels-panel-log-line.stale { opacity: 0.62; }
    .nels-panel-log-time { color: #8b98a8; }
    .nels-panel-log-node { color: #7dd3fc; }
    .nels-panel-log-type { color: #c084fc; }
    .nels-panel-log-status-failed { color: #fb7185; }
    .nels-center-loading { display: flex; flex-direction: column; align-items: center; gap: 14px; }
    .nels-spinner { width: 36px; height: 36px; border: 3px solid #1a2232; border-top-color: #3b82f6; border-radius: 50%; animation: nels-spin 0.9s linear infinite; }
    .nels-spinner-label { color: #93a4b8; font-size: 11px; letter-spacing: 0.03em; }
    @keyframes nels-spin { to { transform: rotate(360deg); } }
    .nels-loading-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; z-index: 10; overflow: hidden; background: #0d1520; }
    .nels-loading-bar::after { content: ''; display: block; width: 40%; height: 100%; background: #3b82f6; animation: nels-load 1.4s ease-in-out infinite; }
    @keyframes nels-load { 0% { margin-left: -40%; } 100% { margin-left: 140%; } }
    @media (max-width: 900px) {
      .nels-panel-body { grid-template-columns: 1fr; grid-template-rows: minmax(260px, 1fr) 320px; }
      .nels-panel-side { min-height: 0; }
      .nels-panel-main { border-right: 0; border-bottom: 1px solid #303946; }
    }
  `;
  document.head.appendChild(style);
}
