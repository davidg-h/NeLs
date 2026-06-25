// Injects all NELS panel CSS once - bundled in JS so Vite produces a single artifact (static .css still needs programmatic injection)
export function injectStyle(): void {
  if (document.getElementById("nels-graph-panel-style")) return;
  const style = document.createElement("style");
  style.id = "nels-graph-panel-style";
  style.textContent = `
    .nels-panel {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      color: #d8dee9;
      background: #05090f;
      font: 12px sans-serif;
      overflow: hidden;
    }
    .nels-panel * { box-sizing: border-box; }
    .nels-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 12px;
      border-bottom: 1px solid #1a2232;
      background: #080d14;
    }
    .nels-panel-header strong { display: block; font-size: 13px; color: #f8fafc; }
    .nels-panel-header span { color: #93a4b8; }
    .nels-panel-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .nels-panel button,
    .nels-panel select,
    .nels-panel input {
      height: 28px;
      border: 1px solid #1e2d40;
      border-radius: 4px;
      background: #0d1520;
      color: #e6edf3;
      padding: 0 8px;
    }
    .nels-panel button { cursor: pointer; }
    .nels-panel button:hover { background: #162030; }
    .nels-panel select { min-width: 180px; }
    .nels-switch {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      user-select: none;
    }
    .nels-switch-track {
      position: relative;
      width: 38px;
      height: 20px;
      background: #0d1520;
      border: 1px solid #1e2d40;
      border-radius: 999px;
      flex-shrink: 0;
      transition: background 0.2s, border-color 0.2s;
    }
    .nels-switch-track.on { background: #3b82f6; border-color: #3b82f6; }
    .nels-switch-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 14px;
      height: 14px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
    .nels-switch-track.on .nels-switch-thumb { transform: translateX(18px); }
    .nels-switch-label { font-size: 11px; color: #8b98a8; transition: color 0.15s; }
    .nels-switch-label.active { color: #e6edf3; }
    .nels-panel-body {
      flex: 1 1 0;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(420px, 1fr) minmax(320px, 400px);
      overflow: hidden;
    }
    .nels-panel-body.hidden,
    .nels-panel-logs-view.hidden {
      display: none;
    }
    .nels-panel-main {
      position: relative;
      min-height: 0;
      border-right: 1px solid #1a2232;
      background: #05090f;
      background-image:
        linear-gradient(rgba(30, 60, 100, 0.35) 1px, transparent 1px),
        linear-gradient(90deg, rgba(30, 60, 100, 0.35) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .nels-sigma-container { position: absolute; inset: 0; overflow: hidden; }
    .nels-sigma-container canvas { position: absolute; top: 0; left: 0; }
    .nels-panel-empty {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8b98a8;
      pointer-events: none;
      z-index: 1;
    }
    .nels-panel-hover {
      position: absolute;
      z-index: 2;
      max-width: 260px;
      padding: 7px 8px;
      border: 1px solid #1e2d40;
      border-radius: 5px;
      background: rgba(5, 9, 15, 0.97);
      color: #e6edf3;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
      pointer-events: none;
      font: 11px ui-monospace, SFMono-Regular, Consolas, monospace;
    }
    .nels-hover-recon { margin-top: 4px; padding-top: 4px; border-top: 1px solid #1e2d40; white-space: normal; word-break: break-word; }
    .nels-hover-recon-sim { color: #64849a; }
    .nels-panel-side {
      height: 100%;
      min-height: 0;
      max-height: 100%;
      padding: 10px 10px 48px;
      background: #070b10;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-gutter: stable;
    }
    .nels-panel-side .nels-panel-card { flex: 0 0 auto; }
    .nels-panel-logs-view {
      flex: 1;
      min-height: 0;
      padding: 10px;
      background: #070b10;
      position: relative;
    }
    .nels-panel-logs-view .nels-panel-card { height: 100%; display: flex; flex-direction: column; }
    .nels-panel-card {
      min-height: 0;
      border: 1px solid #1a2232;
      border-radius: 6px;
      background: #090e16;
      overflow: visible;
    }
    .nels-panel-card summary {
      list-style: none;
      cursor: pointer;
      margin: 0;
      padding: 8px 10px;
      border-bottom: 1px solid #303946;
      font-size: 12px;
      font-weight: 700;
      color: #f8fafc;
    }
    .nels-panel-card summary::-webkit-details-marker { display: none; }
    .nels-panel-card summary::after {
      content: "collapse";
      float: right;
      color: #93a4b8;
      font-weight: 400;
      font-size: 11px;
    }
    .nels-panel-card:not([open]) summary { border-bottom: 0; }
    .nels-panel-card:not([open]) summary::after { content: "expand"; }
    .nels-panel-card h3 {
      margin: 0;
      padding: 8px 10px;
      border-bottom: 1px solid #303946;
      font-size: 12px;
      color: #f8fafc;
    }
    .nels-panel-card dl {
      display: grid;
      grid-template-columns: 102px 1fr;
      gap: 6px 8px;
      margin: 0;
      padding: 10px;
    }
    .nels-panel-card dt { color: #93a4b8; }
    .nels-panel-card dd { margin: 0; color: #d8dee9; overflow-wrap: anywhere; }
    .nels-panel-controls { display: grid; gap: 8px; padding: 10px; }
    .nels-panel-controls label {
      display: grid;
      grid-template-columns: 80px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
    }
    .nels-panel-controls label span { color: #93a4b8; }
    .nels-panel-controls input,
    .nels-panel-controls select {
      width: 100%;
      min-width: 0;
    }
    .nels-op-select-label {
      background: rgba(59,130,246,0.06);
      border-left: 3px solid #3b82f6;
      border-top: none;
      border-right: none;
      border-bottom: none;
      border-radius: 0 3px 3px 0;
      padding: 5px 6px 5px 8px;
      margin: 0 -10px 0 -10px;
    }
    .nels-op-select-label span { color: #93c5fd !important; font-weight: 600; letter-spacing: 0.03em; }
    .nels-op-select-label select { border-color: rgba(59,130,246,0.35) !important; }
    .nels-axis-mode-toggle {
      display: flex;
      gap: 0;
      border: 1px solid #1e2d40;
      border-radius: 4px;
      overflow: hidden;
    }
    .nels-axis-mode-toggle button {
      flex: 1;
      height: 26px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      border: none;
      border-radius: 0;
      color: #64849a;
      background: transparent;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    .nels-axis-mode-toggle button:hover { background: #162030; color: #c0d4e8; }
    .nels-axis-mode-toggle button.active:first-child { background: rgba(59,130,246,0.18); color: #60a5fa; }
    .nels-axis-mode-toggle button.active:last-child  { background: rgba(249,115,22,0.15); color: #fb923c; }
    .nels-axis-mode-toggle button:first-child { border-right: 1px solid #1e2d40; }
    .nels-axis-no-b {
      font-size:10px; color:#fbbf24; line-height:1.4;
      background: rgba(251,191,36,0.08);
      border: 1px solid rgba(251,191,36,0.25);
      border-radius: 4px;
      padding: 6px 8px;
      margin-top: 4px;
    }
    .nels-panel-row { display: flex; gap: 8px; }
    .nels-panel-row button { flex: 1; }
    .nels-panel-log {
      flex: 1;
      overflow: auto;
      padding: 9px 10px;
      font: 11px ui-monospace, SFMono-Regular, Consolas, monospace;
      color: #cbd5e1;
    }
    .nels-panel-log-line { padding: 3px 0 5px; border-bottom: 1px solid rgba(48, 57, 70, 0.5); }
    .nels-panel-log-line.stale { opacity: 0.62; }
    .nels-panel-log-time { color: #8b98a8; }
    .nels-panel-log-node { color: #7dd3fc; }
    .nels-panel-log-type { color: #c084fc; }
    .nels-panel-log-status-failed { color: #fb7185; }
    .nels-center-loading { display: flex; flex-direction: column; align-items: center; gap: 14px; }
    .nels-spinner {
      width: 36px;
      height: 36px;
      border: 3px solid #1a2232;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: nels-spin 0.9s linear infinite;
    }
    .nels-spinner-label { color: #93a4b8; font-size: 11px; letter-spacing: 0.03em; }
    @keyframes nels-spin { to { transform: rotate(360deg); } }
    .nels-loading-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      z-index: 10;
      overflow: hidden;
      background: #0d1520;
    }
    .nels-loading-bar::after {
      content: "";
      display: block;
      width: 40%;
      height: 100%;
      background: #3b82f6;
      animation: nels-load 1.4s ease-in-out infinite;
    }
    @keyframes nels-load {
      0% { margin-left: -40%; }
      100% { margin-left: 140%; }
    }
    .nels-axis-legend-wrap {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      pointer-events: none;
      z-index: 4;
    }
    .nels-axis-legend-row { display: flex; align-items: center; gap: 8px; }
    .nels-axis-legend-b2 .nels-axis-legend-row { gap: 6px; }
    .nels-axis-legend-llm { font-size: 9px; color: #94a3b8; margin-top: 1px; }
    .nels-axis-legend-b2 {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 3px 8px;
      background: rgba(5,9,15,0.82);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 4px;
      backdrop-filter: blur(4px);
      font: 9px ui-monospace, monospace;
      white-space: nowrap;
    }
    .nels-axis-legend-b2 .nels-axis-legend-side { max-width: 240px; overflow: hidden; text-overflow: ellipsis; }
    .nels-axis-legend-b2 .nels-axis-legend-a { color: #4ade80; }
    .nels-axis-legend-b2 .nels-axis-legend-b { color: #fb923c; }
    .nels-axis-legend-b2 .nels-axis-legend-bar {
      flex-shrink: 0;
      width: 40px;
      height: 4px;
      border-radius: 2px;
      background: linear-gradient(to right, #22c55e, #ffffff 50%, #f97316);
      opacity: 0.8;
    }
    .nels-axis-legend {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 4px 10px;
      background: rgba(5,9,15,0.82);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 4px;
      backdrop-filter: blur(4px);
      font: 10px ui-monospace, monospace;
      white-space: nowrap;
    }
    .nels-axis-legend-side { max-width: 240px; overflow: hidden; text-overflow: ellipsis; }
    .nels-axis-legend-a { color: #60a5fa; }
    .nels-axis-legend-b { color: #f87171; }
    .nels-axis-legend-bar {
      flex-shrink: 0;
      width: 56px;
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(to right, #3b82f6, #ffffff 50%, #ef4444);
      opacity: 0.85;
    }
    .nels-anim-badge {
      position: absolute;
      bottom: 10px;
      left: 10px;
      z-index: 2;
      padding: 3px 8px;
      font-size: 10px;
      color: #fbbf24;
      background: rgba(251, 191, 36, 0.08);
      border: 1px solid rgba(251, 191, 36, 0.25);
      border-radius: 3px;
      pointer-events: none;
      letter-spacing: 0.04em;
    }
    .nels-selection-help {
      margin-top: 6px;
      border: none;
    }
    .nels-selection-help > summary {
      font-size: 10px;
      color: #4a7090;
      cursor: pointer;
      user-select: none;
      list-style: none;
      padding: 2px 0;
    }
    .nels-selection-help > summary::before {
      content: "> ";
    }
    .nels-selection-help[open] > summary::before {
      content: "v ";
    }
    .nels-sel-hint {
      padding: 4px 8px;
      font-size: 11px;
      color: #fbbf24;
      background: rgba(251, 191, 36, 0.08);
      border: 1px solid rgba(251, 191, 36, 0.25);
      border-radius: 4px;
    }
    .nels-axis-groups {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .nels-axis-group {
      border-radius: 4px;
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .nels-axis-group-a {
      background: rgba(59, 130, 246, 0.08);
      border: 1px solid rgba(59, 130, 246, 0.3);
    }
    .nels-axis-group-b {
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.3);
    }
    .nels-axis-group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .nels-axis-group-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .nels-axis-group-a .nels-axis-group-label { color: #60a5fa; }
    .nels-axis-group-b .nels-axis-group-label { color: #f87171; }
    .nels-axis-group-actions {
      display: flex;
      gap: 4px;
    }
    .nels-axis-group-actions button {
      height: 22px;
      font-size: 11px;
      padding: 0 7px;
    }
    .nels-axis-group-clear {
      background: rgba(255,255,255,0.04) !important;
      color: #8a9ab0 !important;
    }
    .nels-axis-group-clear:hover { background: rgba(255,255,255,0.09) !important; }
    .nels-axis-group-empty {
      font-size: 10px;
      color: #4a5a6a;
      font-style: italic;
    }
    .nels-axis-group-count {
      font-size: 11px;
      color: #8a9ab0;
    }
    .nels-trajectory-lane {
      border-top: 1px solid #1a2232;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .nels-trajectory-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 11px;
      color: #93a4b8;
    }
    .nels-toggle-overlay {
      height: 24px;
      padding: 0 8px;
      font-size: 11px;
      border: 1px solid #1e2d40;
      border-radius: 4px;
      background: #0d1520;
      color: #93a4b8;
      cursor: pointer;
    }
    .nels-toggle-overlay.active {
      border-color: rgba(251, 146, 60, 0.6);
      color: #fb923c;
      background: rgba(251, 146, 60, 0.08);
    }
    .nels-trajectory-scroll { max-height: 180px; overflow-y: auto; scrollbar-gutter: stable; }
    .nels-trajectory-table {
      width: 100%;
      border-collapse: collapse;
      font: 11px ui-monospace, SFMono-Regular, Consolas, monospace;
      table-layout: auto;
    }
    .nels-trajectory-table th {
      color: #93a4b8;
      text-align: left;
      padding: 2px 6px;
      font-weight: 400;
      border-bottom: 1px solid #1a2232;
    }
    .nels-trajectory-table th:nth-child(1),
    .nels-trajectory-table td:nth-child(1) { width: 1%; white-space: nowrap; }
    .nels-trajectory-table th:nth-child(2),
    .nels-trajectory-table td:nth-child(2) { width: 1%; white-space: nowrap; }
    .nels-trajectory-table th:nth-child(3),
    .nels-trajectory-table td:nth-child(3) { width: 100%; min-width: 0; }
    .nels-trajectory-table td {
      color: #d8dee9;
      padding: 3px 6px;
      border-bottom: 1px solid rgba(26, 34, 50, 0.5);
      vertical-align: middle;
      max-width: 0;
    }
    .nels-trajectory-table td:nth-child(1),
    .nels-trajectory-table td:nth-child(2) { max-width: none; }
    .nels-trajectory-table tr:last-child td { border-bottom: 0; }
    .nels-nearest-stack { display: flex; flex-direction: column; gap: 2px; min-width: 0; overflow: hidden; }
    .nels-delta-roles { display: flex; flex-direction: column; gap: 4px; margin: 6px 0 2px; }
    .nels-delta-role-row { display: flex; align-items: baseline; gap: 6px; min-width: 0; }
    .nels-delta-role-badge { font-size: 10px; font-weight: 700; color: #2dd4bf; background: rgba(45,212,191,0.12); border-radius: 3px; padding: 1px 5px; flex-shrink: 0; }
    .nels-delta-role-label { font-size: 11px; color: #cbd5e1; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
    .nels-delta-role-desc { font-size: 10px; color: #4a7090; flex-shrink: 0; }
    .nels-nearest-sample {
      all: unset;
      cursor: pointer;
      font: inherit;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .nels-nearest-sample:hover { text-decoration: underline; }
    .nels-nearest-top { color: #7dd3fc; }
    .nels-nearest-secondary { color: #64849a; font-size: 10px; }
    .nels-nearest-dist { color: #93a4b8; }
    @media (max-width: 900px) {
      .nels-panel-body {
        grid-template-columns: 1fr;
        grid-template-rows: minmax(260px, 1fr) 320px;
      }
      .nels-panel-side { min-height: 0; }
      .nels-panel-main { border-right: 0; border-bottom: 1px solid #303946; }
    }
    .nels-panel select { color-scheme: dark; }
    .nels-session-ctrl { display: flex; align-items: center; gap: 4px; }
    .nels-panel .nels-icon-btn { width: 28px; padding: 0; font-size: 15px; }
    .nels-llm-chip {
      height: 24px;
      padding: 0 8px;
      font-size: 11px;
      border-radius: 4px;
      border: 1px solid #1e2d40;
      background: #0d1520;
      color: #4a6480;
      cursor: default;
    }
    .nels-llm-chip.loaded {
      border-color: #166534;
      background: #052e16;
      color: #4ade80;
      cursor: pointer;
    }
    .nels-llm-chip.loaded:hover { background: #14532d; }
    .nels-tab-group {
      display: inline-flex;
      background: #0d1520;
      border: 1px solid #1e2d40;
      border-radius: 6px;
      overflow: hidden;
    }
    .nels-panel .nels-tab-btn {
      border: none;
      background: transparent;
      color: #8b98a8;
      font-size: 12px;
      height: 26px;
      padding: 0 14px;
    }
    .nels-panel .nels-tab-btn.active { background: #1e3a5f; color: #e6edf3; }
    .nels-panel .nels-tab-btn:hover:not(.active) { background: rgba(30, 60, 100, 0.25); }
    .nels-alpha-section {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }
    .nels-alpha-label { color: #93a4b8; font-size: 11px; }
    .nels-probe-coord-editor { display: flex; flex-direction: column; gap: 4px; }
    .nels-probe-coord-row { display: flex; align-items: center; gap: 6px; }
    .nels-probe-coord-row span { color: #93a4b8; font-size: 11px; width: 14px; flex-shrink: 0; }
    .nels-probe-coord-row input { flex: 1; font-family: monospace; font-size: 11px; }
    .nels-alpha-presets { display: flex; gap: 4px; flex-wrap: wrap; }
    .nels-panel .nels-alpha-preset-btn { height: 24px; font-size: 11px; color: #93a4b8; }
    .nels-panel .nels-alpha-preset-btn:hover { color: #e6edf3; }
    .nels-panel .nels-alpha-sort-btn { margin-left: auto; color: #fb923c; }
    .nels-panel .nels-alpha-sort-btn:hover { color: #fdba74; }
    .nels-alpha-list { display: flex; flex-direction: column; gap: 4px; }
    .nels-alpha-row { display: flex; align-items: center; gap: 6px; }
    .nels-alpha-val {
      width: 34px;
      font: 11px ui-monospace, SFMono-Regular, Consolas, monospace;
      color: #e6edf3;
      text-align: right;
      flex-shrink: 0;
    }
    .nels-panel .nels-alpha-slider {
      flex: 1;
      min-width: 0;
      height: auto;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
    }
    .nels-panel .nels-alpha-slider::-webkit-slider-runnable-track {
      height: 3px;
      border-radius: 2px;
      background: linear-gradient(to right, #fb923c var(--val, 0%), #1e2d40 var(--val, 0%));
    }
    .nels-panel .nels-alpha-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #fb923c;
      border: none;
      margin-top: -5px;
      cursor: pointer;
    }
    .nels-panel .nels-alpha-slider::-moz-range-track {
      height: 3px;
      border-radius: 2px;
      background: linear-gradient(to right, #fb923c var(--val, 0%), #1e2d40 var(--val, 0%));
      border: none;
    }
    .nels-panel .nels-alpha-slider::-moz-range-thumb {
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #fb923c;
      border: none;
      cursor: pointer;
    }
    .nels-alpha-info {
      font-size: 10px;
      color: #64849a;
      line-height: 1.5;
    }
    .nels-op-description {
      font-size: 10px;
      color: #64849a;
      line-height: 1.5;
      padding: 2px 0;
    }
    .nels-resize-handle {
      width: 4px;
      cursor: col-resize;
      background: transparent;
      transition: background 0.15s;
      flex-shrink: 0;
      border-right: 1px solid #1a2232;
    }
    .nels-resize-handle:hover,
    .nels-resize-handle.dragging { background: #3b82f6; border-color: #3b82f6; }
    .nels-panel .nels-alpha-remove {
      width: 18px;
      height: 18px;
      padding: 0;
      border: none;
      background: transparent;
      color: #64849a;
      font-size: 14px;
    }
    .nels-panel .nels-alpha-remove:hover { color: #fb7185; background: transparent; }
    .nels-panel .nels-alpha-add {
      height: 24px;
      font-size: 11px;
      border: 1px dashed #1e2d40;
      background: transparent;
      color: #64849a;
      width: 100%;
      padding: 0;
    }
    .nels-panel .nels-alpha-add:hover {
      border-color: #3b82f6;
      color: #7dd3fc;
      background: transparent;
    }
    .nels-point-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 2;
      padding: 3px 8px;
      font-size: 10px;
      color: #7dd3fc;
      background: rgba(5, 9, 15, 0.85);
      border: 1px solid #1e2d40;
      border-radius: 3px;
      pointer-events: none;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      letter-spacing: 0.04em;
    }
    .nels-view-logs-btn {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 10;
      height: 26px;
      padding: 0 10px;
      font-size: 11px;
      border: 1px solid #1e2d40;
      border-radius: 4px;
      background: rgba(7, 11, 16, 0.9);
      color: #93a4b8;
      cursor: pointer;
    }
    .nels-view-logs-btn:hover { color: #e6edf3; border-color: #3b82f6; }
    .nels-cluster-overlay {
      position: absolute;
      top: 42px;
      left: 10px;
      z-index: 3;
      background: rgba(5, 9, 15, 0.88);
      border: 1px solid #1e2d40;
      border-radius: 6px;
      min-width: 210px;
      max-width: 300px;
      max-height: 360px;
      overflow-y: auto;
      backdrop-filter: blur(4px);
    }
    .nels-cluster-toggle-row {
      position: sticky;
      top: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      background: rgba(5, 9, 15, 0.95);
      border-bottom: 1px solid #1e2d40;
    }
    .nels-cluster-toggle {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
      background: none;
      border: none;
      cursor: pointer;
      color: #7daacc;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      font-family: inherit;
    }
    .nels-cluster-toggle:hover { color: #b0d0e8; }
    .nels-cluster-toggle-icon { font-size: 8px; }
    .nels-hull-chip {
      flex-shrink: 0;
      margin-right: 6px;
      padding: 2px 7px;
      font-size: 10px;
      font-family: inherit;
      background: #0d1520;
      border: 1px solid #1e2d40;
      border-radius: 4px;
      color: #9aaabb;
      cursor: pointer;
      white-space: nowrap;
    }
    .nels-hull-chip:hover { border-color: #3b82f6; color: #b0d0e8; }
    .nels-hull-chip.active {
      background: rgba(59,130,246,0.18);
      border-color: #3b82f6;
      color: #7dd3fc;
    }
    .nels-legend-list { display: flex; flex-direction: column; gap: 1px; padding: 4px 0 6px; }
    .nels-legend-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 10px;
      cursor: pointer;
      border-left: 2px solid transparent;
      transition: background 0.1s;
    }
    .nels-legend-row:hover { background: rgba(255, 255, 255, 0.05); }
    .nels-legend-row.active {
      background: rgba(59, 130, 246, 0.12);
      border-left-color: #3b82f6;
    }
    .nels-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .nels-legend-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
      overflow: hidden;
    }
    .nels-legend-name {
      font-size: 11px;
      color: #d8dee9;
      font-weight: 600;
      text-transform: capitalize;
    }
    .nels-legend-sample {
      font-size: 10px;
      color: #64849a;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-style: italic;
    }
    .nels-legend-meta {
      font-size: 10px;
      color: #64849a;
      flex-shrink: 0;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    }
    .nels-legend-outside {
      padding: 4px 10px;
      font-size: 10px;
      font-style: italic;
      color: #64849a;
    }

    .nels-hull-canvas {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 5;
    }
    .nels-drag-select-rect {
      position: absolute;
      border: 1.5px dashed rgba(255,255,255,0.65);
      background: rgba(96,160,255,0.07);
      pointer-events: none;
      box-shadow: inset 0 0 0 1px rgba(96,160,255,0.15);
    }
    .nels-axis-lane {
      border-top: 1px solid #1a2232;
      padding: 8px 10px;
    }
    .nels-axis-header {
      font-size: 10px;
      color: #64849a;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .nels-axis-side-label {
      font-size: 10px;
      font-weight: 600;
      margin-bottom: 3px;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    }
    .nels-axis-col { display: flex; flex-direction: column; gap: 2px; }
    .nels-axis-bar {
      display: inline-block;
      height: 6px;
      border-radius: 2px;
      margin-right: 4px;
      vertical-align: middle;
      min-width: 2px;
    }
    .nels-cc-metrics {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 10px;
      color: #64849a;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      margin-bottom: 6px;
    }
    .nels-cc-metrics strong { color: #e2e8f0; }
    .nels-cc-quality {
      padding: 1px 5px;
      border-radius: 3px;
      background: #1a2232;
      color: #22c55e;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .nels-cc-seed {
      font-size: 10px;
      color: #64849a;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      margin-bottom: 4px;
      font-style: italic;
    }
    .nels-strength-row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1;
    }
    .nels-strength-row .nels-alpha-slider { flex: 1; }
    .nels-recon-live {
      border-left: 2px solid #2563eb;
    }
    .nels-recon-live-score {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 0;
      font-size: 10px;
      color: #93a4b8;
    }
    .nels-recon-live-bar {
      flex: 1;
      height: 4px;
      background: #1a2232;
      border-radius: 2px;
      overflow: hidden;
    }
    .nels-recon-live-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 2px;
      transition: width 0.3s ease;
    }
    .nels-recon-live-text {
      font-size: 10px;
      color: #e2e8f0;
      font-style: italic;
      padding: 2px 0 4px;
      line-height: 1.4;
    }
    .nels-ctx-lane { margin-top: 6px; }
    .nels-ctx-summary { cursor: pointer; user-select: none; }
    .nels-ctx-group {
      margin: 4px 0 0;
    }
    .nels-ctx-group > summary {
      font-size: 10px;
      color: #64849a;
      cursor: pointer;
      padding: 2px 0;
      user-select: none;
    }
    .nels-ctx-group > summary:hover { color: #93a4b8; }
    .nels-ctx-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 5px;
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);
}
