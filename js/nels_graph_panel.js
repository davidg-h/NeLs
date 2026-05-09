import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

const SESSION_NODE = "nels_Session";
const LAUNCHER_NODE = "nels_GraphPanelLauncher";
const POINT_RADIUS = 5;
const HIT_RADIUS = 10;

function postJson(url, payload) {
  return api.fetchApi(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  }).then((response) => {
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  });
}

function getJson(url) {
  return api.fetchApi(url).then((response) => {
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  });
}

function openNelsGraphPanel() {
  const bottomPanel = app.extensionManager?.bottomPanel;
  if (bottomPanel?.toggleBottomPanelTab) {
    bottomPanel.toggleBottomPanelTab("nels-graph-panel");
    return true;
  }

  const command = app.extensionManager?.command;
  if (command?.execute) {
    command.execute("Workspace.ToggleBottomPanelTab.nels-graph-panel");
    return true;
  }

  const candidates = [
    "[data-tab-id='nels-graph-panel']",
    "[data-testid='nels-graph-panel']",
    "[aria-controls='nels-graph-panel']",
  ];
  for (const selector of candidates) {
    const element = document.querySelector(selector);
    if (element instanceof HTMLElement) {
      element.click();
      return true;
    }
  }

  const clickable = [...document.querySelectorAll("button, [role='tab'], .p-tab, .tab")]
    .filter((element) => element instanceof HTMLElement);
  const tab = clickable.find((element) => {
    const text = String(element.textContent || "").trim().toLowerCase();
    return text === "nels graph" || text === "nels graph panel";
  });
  if (tab instanceof HTMLElement) {
    tab.click();
    return true;
  }

  const appElement = document.querySelector(".comfyui-body, #app") || document.body;
  appElement.dispatchEvent(
    new CustomEvent("nels-open-graph-panel", { bubbles: true, composed: true }),
  );
  console.warn("NELS Graph Panel tab was not found in the current DOM.");
  return false;
}

class NelsGraphPanel {
  constructor(root) {
    this.root = root;
    this.sessions = [];
    this.sessionId = "";
    this.session = null;
    this.snapshot = null;
    this.graph = this.emptyGraph();
    this.logs = [];
    this.lastSequence = 0;
    this.view = "graph";
    this.selected = new Set();
    this.hoverPoint = null;
    this.camera = { x: 0, y: 0, zoom: 1 };
    this.drag = null;
    this.operationResult = null;
    this.metrics = null;
    this.pulses = new Map();
    this.coordinateCacheKey = "";
    this.coordinateCache = new Map();
    this.pushTimer = null;
    this.build();
    this.bind();
    this.refreshSessions();
  }

  destroy() {
    if (this.abortController) this.abortController.abort();
    window.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("mouseup", this.mouseUpHandler);
  }

  emptyGraph() {
    return {
      points: [],
      edges: [],
      byId: new Map(),
      adjacency: new Map(),
      bounds: { minX: -1, maxX: 1, minY: -1, maxY: 1 },
    };
  }

  build() {
    this.root.className = "nels-panel";
    this.root.innerHTML = `
      <div class="nels-panel-header">
        <div>
          <strong>NELS Graph Panel</strong>
          <span data-role="status">initializing</span>
        </div>
        <div class="nels-panel-actions">
          <select data-role="session"></select>
          <div class="nels-panel-toggle" role="tablist" aria-label="Panel view">
            <button data-role="view-graph" class="active">Graph</button>
            <button data-role="view-logs">Logs</button>
          </div>
          <button data-role="sessions">Sessions</button>
          <button data-role="preview">Refresh</button>
        </div>
      </div>
      <div class="nels-panel-body" data-role="graph-view">
        <section class="nels-panel-main">
          <canvas data-role="canvas"></canvas>
          <div class="nels-panel-hover hidden" data-role="hover"></div>
          <div class="nels-panel-empty" data-role="empty">
            Add NELS Data Source -> NELS Session, then press Sessions.
          </div>
        </section>
        <aside class="nels-panel-side">
          <details class="nels-panel-card" open>
            <summary>Session</summary>
            <dl data-role="session-meta"></dl>
          </details>
          <details class="nels-panel-card" open>
            <summary>Operation</summary>
            <div class="nels-panel-controls">
              <label>
                <span>operation</span>
                <select data-role="operation">
                  <option value="inspect">inspect</option>
                  <option value="nearest_neighbor">nearest neighbor</option>
                  <option value="lerp">lerp</option>
                  <option value="slerp">slerp</option>
                  <option value="delta_walk">delta walk</option>
                </select>
              </label>
              <label>
                <span>metric</span>
                <select data-role="metric">
                  <option value="step_distance">step distance</option>
                  <option value="similarity_matrix">similarity matrix</option>
                  <option value="distance_to_start">distance to start</option>
                  <option value="distance_to_target">distance to target</option>
                  <option value="norm_drift">norm drift</option>
                </select>
              </label>
              <label>
                <span>neighbors</span>
                <input data-role="neighbors" type="number" min="1" max="128" step="1" value="4" />
              </label>
              <label>
                <span>alpha</span>
                <input data-role="alpha" type="text" value="0,0.25,0.5,0.75,1" />
              </label>
              <div class="nels-panel-row">
                <button data-role="clear-selection">Clear</button>
                <button data-role="fit">Fit</button>
              </div>
            </div>
          </details>
          <details class="nels-panel-card" open>
            <summary>Result</summary>
            <dl data-role="result-meta"></dl>
          </details>
        </aside>
      </div>
      <div class="nels-panel-logs-view" data-role="logs-view">
        <div class="nels-panel-card">
          <h3>Event Log</h3>
          <div class="nels-panel-log" data-role="log"></div>
        </div>
      </div>
    `;
    this.canvas = this.root.querySelector("[data-role='canvas']");
    this.ctx = this.canvas.getContext("2d");
    this.statusEl = this.root.querySelector("[data-role='status']");
    this.sessionEl = this.root.querySelector("[data-role='session']");
    this.emptyEl = this.root.querySelector("[data-role='empty']");
    this.metaEl = this.root.querySelector("[data-role='session-meta']");
    this.resultEl = this.root.querySelector("[data-role='result-meta']");
    this.logEl = this.root.querySelector("[data-role='log']");
    this.graphViewEl = this.root.querySelector("[data-role='graph-view']");
    this.logsViewEl = this.root.querySelector("[data-role='logs-view']");
    this.graphButtonEl = this.root.querySelector("[data-role='view-graph']");
    this.logsButtonEl = this.root.querySelector("[data-role='view-logs']");
    this.hoverEl = this.root.querySelector("[data-role='hover']");
    this.operationEl = this.root.querySelector("[data-role='operation']");
    this.metricEl = this.root.querySelector("[data-role='metric']");
    this.neighborEl = this.root.querySelector("[data-role='neighbors']");
    this.alphaEl = this.root.querySelector("[data-role='alpha']");
    this.injectStyle();
    this.setView("graph");
    this.renderResult();
  }

  injectStyle() {
    if (document.getElementById("nels-graph-panel-style")) return;
    const style = document.createElement("style");
    style.id = "nels-graph-panel-style";
    style.textContent = `
      .nels-panel { height: 100%; width: 100%; min-height: 0; display: flex; flex-direction: column; color: #d8dee9; background: #101419; font: 12px sans-serif; overflow: hidden; }
      .nels-panel * { box-sizing: border-box; }
      .nels-panel-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 12px; border-bottom: 1px solid #303946; background: #171d24; }
      .nels-panel-header strong { display: block; font-size: 13px; color: #f8fafc; }
      .nels-panel-header span { color: #93a4b8; }
      .nels-panel-actions { display: flex; align-items: center; gap: 8px; }
      .nels-panel button, .nels-panel select, .nels-panel input { height: 28px; border: 1px solid #3c4654; border-radius: 4px; background: #202834; color: #e6edf3; padding: 0 8px; }
      .nels-panel button { cursor: pointer; }
      .nels-panel button:hover { background: #2a3544; }
      .nels-panel select { min-width: 180px; }
      .nels-panel-toggle { display: flex; border: 1px solid #3c4654; border-radius: 4px; overflow: hidden; }
      .nels-panel-toggle button { border: 0; border-radius: 0; min-width: 58px; }
      .nels-panel-toggle button.active { background: #3b82f6; color: #ffffff; }
      .nels-panel-body { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: minmax(420px, 1fr) minmax(320px, 400px); overflow: hidden; }
      .nels-panel-body.hidden, .nels-panel-logs-view.hidden { display: none; }
      .nels-panel-main { position: relative; min-height: 0; border-right: 1px solid #303946; background: radial-gradient(circle at 50% 45%, #162131 0%, #101419 58%, #0b0f14 100%); }
      .nels-panel canvas { width: 100%; height: 100%; display: block; cursor: grab; }
      .nels-panel canvas.dragging { cursor: grabbing; }
      .nels-panel-empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #8b98a8; pointer-events: none; }
      .nels-panel-hover { position: absolute; z-index: 2; max-width: 260px; padding: 7px 8px; border: 1px solid #3c4654; border-radius: 5px; background: rgba(15, 23, 42, 0.96); color: #e6edf3; box-shadow: 0 12px 32px rgba(0,0,0,0.32); pointer-events: none; font: 11px ui-monospace, SFMono-Regular, Consolas, monospace; }
      .nels-panel-hover.hidden { display: none; }
      .nels-panel-side { height: 100%; min-height: 0; max-height: 100%; padding: 10px 10px 48px; background: #11161c; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; overflow-x: hidden; scrollbar-gutter: stable; }
      .nels-panel-side .nels-panel-card { flex: 0 0 auto; }
      .nels-panel-logs-view { flex: 1; min-height: 0; padding: 10px; background: #11161c; }
      .nels-panel-logs-view .nels-panel-card { height: 100%; display: flex; flex-direction: column; }
      .nels-panel-card { min-height: 0; border: 1px solid #303946; border-radius: 6px; background: #151b22; overflow: visible; }
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
      @media (max-width: 900px) {
        .nels-panel-body { grid-template-columns: 1fr; grid-template-rows: minmax(260px, 1fr) 320px; }
        .nels-panel-side { min-height: 0; }
        .nels-panel-main { border-right: 0; border-bottom: 1px solid #303946; }
      }
    `;
    document.head.appendChild(style);
  }

  bind() {
    this.root.querySelector("[data-role='sessions']").addEventListener("click", () => this.refreshSessions());
    this.root.querySelector("[data-role='preview']").addEventListener("click", () => this.loadPreview());
    this.graphButtonEl.addEventListener("click", () => this.setView("graph"));
    this.logsButtonEl.addEventListener("click", () => this.setView("logs"));
    this.sessionEl.addEventListener("change", () => {
      this.sessionId = this.sessionEl.value;
      this.loadSession();
    });
    this.operationEl.addEventListener("change", () => this.schedulePushState());
    this.metricEl.addEventListener("change", () => this.schedulePushState());
    this.neighborEl.addEventListener("change", () => this.schedulePushState());
    this.alphaEl.addEventListener("change", () => this.schedulePushState());
    this.root.querySelector("[data-role='clear-selection']").addEventListener("click", () => {
      this.selected.clear();
      this.schedulePushState();
      this.draw();
    });
    this.root.querySelector("[data-role='fit']").addEventListener("click", () => this.fitCamera({ push: true }));
    this.canvas.addEventListener("mousedown", (event) => this.onCanvasDown(event));
    this.canvas.addEventListener("mousemove", (event) => this.onCanvasMove(event));
    this.canvas.addEventListener("mouseleave", () => this.clearHover());
    this.canvas.addEventListener("wheel", (event) => this.onCanvasWheel(event), { passive: false });
    this.resizeHandler = () => this.draw();
    this.mouseUpHandler = () => this.stopDrag();
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("mouseup", this.mouseUpHandler);
    this.abortController = new AbortController();
    api.addEventListener(
      "nels.session_event",
      (event) => this.onSessionEvent(event.detail || {}),
      { signal: this.abortController.signal },
    );
  }

  setView(view) {
    this.view = view === "logs" ? "logs" : "graph";
    this.graphViewEl.classList.toggle("hidden", this.view !== "graph");
    this.logsViewEl.classList.toggle("hidden", this.view !== "logs");
    this.graphButtonEl.classList.toggle("active", this.view === "graph");
    this.logsButtonEl.classList.toggle("active", this.view === "logs");
    if (this.view === "graph") this.draw();
  }

  async syncSessions(options = {}) {
    const sessions = this.collectSessionNodes();
    const data = await postJson("/nels/api/canvas-sessions/sync", { sessions });
    this.sessions = data.sessions || [];
    this.renderSessionOptions();
    if (options.log !== false) {
      this.addLog({
        event_type: "ui_action",
        node_name: "NELS Graph Panel",
        message: `Synced ${sessions.length} NELS Session node(s)`,
        status: "completed",
      });
    }
    return sessions;
  }

  async refreshSessions() {
    this.setStatus("syncing sessions");
    try {
      await this.syncSessions();
      if (this.sessionId) await this.loadSession();
      else {
        this.setSnapshot(null, { acceptCoordinates: true });
        this.setStatus("no active sessions");
      }
    } catch (error) {
      this.setStatus(`session sync error: ${error.message}`);
    }
  }

  collectSessionNodes() {
    const nodes = app.graph?._nodes || [];
    return nodes
      .filter((node) => this.isSessionNode(node))
      .map((node) => ({
        session_node_id: String(node.id),
        session_label: String(this.nodeWidgetValue(node, "session_label", "default") || "default"),
        source_config: this.sourceConfigForSession(node),
      }));
  }

  sourceConfigForSession(sessionNode) {
    const sourceNode = this.linkedSourceNode(sessionNode);
    return {
      sample_count: Number(this.nodeWidgetValue(sourceNode, "sample_count", 32) || 32),
      embedding_dim: Number(this.nodeWidgetValue(sourceNode, "embedding_dim", 64) || 64),
      seed: Number(this.nodeWidgetValue(sourceNode, "seed", 42) || 42),
      label_prefix: String(this.nodeWidgetValue(sourceNode, "label_prefix", "sample") || "sample"),
      metadata_mode: String(this.nodeWidgetValue(sourceNode, "metadata_mode", "clustered") || "clustered"),
      cluster_count: Number(this.nodeWidgetValue(sourceNode, "cluster_count", 4) || 4),
      projection_mode: String(this.nodeWidgetValue(sourceNode, "projection_mode", "2d_umap") || "2d_umap"),
      edge_mode: String(this.nodeWidgetValue(sourceNode, "edge_mode", "knn_cosine") || "knn_cosine"),
      neighbor_count: Number(this.nodeWidgetValue(sourceNode, "neighbor_count", 4) || 4),
    };
  }

  linkedSourceNode(sessionNode) {
    const embeddingInput = sessionNode?.inputs?.find((input) => input.name === "embedding_set");
    const linkId = embeddingInput?.link;
    if (linkId === undefined || linkId === null || !app.graph?.links) return null;
    const link = app.graph.links[linkId] || app.graph.links[String(linkId)];
    const originId = link?.origin_id ?? link?.origin_id;
    return (app.graph?._nodes || []).find((node) => String(node.id) === String(originId)) || null;
  }

  isSessionNode(node) {
    const comfyClass = node?.comfyClass || node?.type || node?.constructor?.comfyClass || node?.properties?.["Node name for S&R"];
    return comfyClass === SESSION_NODE || node?.title === "NELS Session";
  }

  nodeWidgetValue(node, name, fallback) {
    const widget = node?.widgets?.find((item) => item.name === name);
    return widget?.value ?? fallback;
  }

  setNodeWidgetValue(node, name, value) {
    const widget = node?.widgets?.find((item) => item.name === name);
    if (!widget) return;
    widget.value = value;
    if (typeof widget.callback === "function") widget.callback(value);
  }

  renderSessionOptions() {
    const previous = this.sessionId;
    this.sessionEl.innerHTML = "";
    if (!this.sessions.length) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "no active sessions";
      this.sessionEl.appendChild(option);
      this.sessionId = "";
      this.session = null;
      this.renderMeta(null);
      return;
    }
    for (const session of this.sessions) {
      const option = document.createElement("option");
      option.value = session.session_id;
      option.textContent = session.label || session.session_id;
      this.sessionEl.appendChild(option);
    }
    this.sessionId = this.sessions.some((item) => item.session_id === previous)
      ? previous
      : this.sessions[0].session_id;
    this.sessionEl.value = this.sessionId;
  }

  async loadSession() {
    if (!this.sessionId) return;
    this.setStatus("loading session");
    try {
      const data = await getJson(`/nels/api/session/${encodeURIComponent(this.sessionId)}`);
      this.session = data;
      this.setSnapshot(data.graph_snapshot || data.source_snapshot || null, { fit: true, acceptCoordinates: true });
      this.operationResult = data.operation_result || null;
      this.metrics = data.metrics || null;
      this.applyUiState(data.ui_state || {});
      this.lastSequence = Math.max(0, ...((data.events || []).map((item) => item.sequence || 0)));
      this.renderMeta(data);
      this.renderResult();
      this.logs = [];
      for (const event of data.events || []) this.addLog(event, { render: false });
      this.renderLog();
      this.draw();
      this.setStatus(this.snapshot ? "ready" : "no snapshot loaded");
    } catch (error) {
      this.setStatus(`session load error: ${error.message}`);
    }
  }

  async loadPreview() {
    this.setStatus("refreshing");
    try {
      await this.syncSessions({ log: false });
    } catch (error) {
      this.setStatus(`session sync error: ${error.message}`);
      return;
    }
    if (!this.sessionId) {
      this.setStatus("select a session first");
      return;
    }
    this.setStatus("refreshing preview");
    try {
      const data = await postJson(`/nels/api/session/${encodeURIComponent(this.sessionId)}/source-preview`, {});
      this.session = data.session;
      this.setSnapshot(data.graph_snapshot, { fit: true, acceptCoordinates: true, forceCoordinates: true });
      this.applyUiState(data.session?.ui_state || {});
      this.renderMeta(data.session);
      this.renderResult();
      this.addLog({
        event_type: "ui_action",
        node_name: "NELS Graph Panel",
        message: `Refreshed graph preview with ${(this.snapshot?.points || []).length} points`,
        status: "completed",
      });
      this.setStatus("preview refreshed");
    } catch (error) {
      this.setStatus(`preview error: ${error.message}`);
    }
  }

  onSessionEvent(event) {
    if (!event?.session_id) return;
    if (event.session_id !== this.sessionId) {
      this.refreshSessions();
      return;
    }
    this.lastSequence = Math.max(this.lastSequence, Number(event.sequence || 0));
    this.addLog(event);
    if (event.event_type === "ui_state_updated" && !this.isStaleEvent(event)) {
      this.applyUiState(event.payload || {});
    }
    if (event.event_type === "source_snapshot" || event.event_type === "graph_snapshot") {
      const acceptedNewGraph = this.acceptRuntimeSnapshot(event.payload);
      if (acceptedNewGraph) this.pulseIds((event.payload?.points || []).map((point) => point.id));
    }
    if (event.event_type === "operation_result") {
      this.operationResult = event.payload || null;
      this.pulseOperationResult(this.operationResult);
      this.renderResult();
      this.draw();
    }
    if (event.event_type === "metrics_result") {
      this.metrics = event.payload || null;
      this.renderResult();
      this.draw();
    }
    if (event.event_type === "operation_failed" || event.event_type === "metrics_failed" || event.event_type === "run_failed") {
      this.renderResult();
    }
    this.setStatus(`event ${event.event_type || "event"} #${this.lastSequence}`);
  }

  setSnapshot(snapshot, options = {}) {
    this.snapshot = this.stabilizeSnapshot(snapshot || null, options);
    this.graph = this.buildGraph(this.snapshot);
    this.selected = new Set([...this.selected].filter((id) => this.graph.byId.has(id)));
    if (options.fit) this.fitCamera({ push: false });
    this.draw();
  }

  acceptRuntimeSnapshot(snapshot) {
    if (!snapshot) return false;
    if (!this.snapshot || !this.graph.points.length) {
      this.setSnapshot(snapshot, { fit: true, acceptCoordinates: true, forceCoordinates: true });
      return true;
    }

    const incomingIds = new Set((snapshot.points || []).map((point) => String(point.id)));
    const currentIds = new Set(this.graph.points.map((point) => String(point.id)));
    const samePointSet =
      incomingIds.size === currentIds.size && [...incomingIds].every((pointId) => currentIds.has(pointId));
    const sameCoordinateConfig =
      JSON.stringify(this.coordinateConfig(snapshot)) === JSON.stringify(this.coordinateConfig(this.snapshot));

    if (!samePointSet || !sameCoordinateConfig) {
      this.setSnapshot(snapshot, { fit: true, acceptCoordinates: true, forceCoordinates: true });
      return true;
    }

    this.session = {
      ...(this.session || {}),
      source_snapshot: this.snapshot,
      graph_snapshot: this.snapshot,
      source_config: snapshot.source_config || this.session?.source_config,
    };
    this.renderMeta({
      ...(this.session || {}),
      source_snapshot: this.snapshot,
      graph_snapshot: this.snapshot,
    });
    return false;
  }

  buildGraph(snapshot) {
    const points = Array.isArray(snapshot?.points) ? snapshot.points : [];
    const edges = Array.isArray(snapshot?.edges) ? snapshot.edges : [];
    const byId = new Map(points.map((point) => [String(point.id), point]));
    const adjacency = new Map();
    for (const point of points) adjacency.set(String(point.id), new Set());
    for (const edge of edges) {
      const source = String(edge.source);
      const target = String(edge.target);
      if (!adjacency.has(source) || !adjacency.has(target)) continue;
      adjacency.get(source).add(target);
      adjacency.get(target).add(source);
    }
    return { points, edges, byId, adjacency, bounds: this.bounds(points) };
  }

  stabilizeSnapshot(snapshot, options = {}) {
    if (!snapshot) return snapshot;
    const key = JSON.stringify(this.coordinateConfig(snapshot));
    const pointIds = new Set((snapshot.points || []).map((point) => String(point.id)));
    const sameCoordinateKey = key === this.coordinateCacheKey;
    const cacheMatches = sameCoordinateKey && [...pointIds].every((pointId) => this.coordinateCache.has(pointId));
    const acceptCoordinates = options.acceptCoordinates !== false;
    const forceCoordinates = options.forceCoordinates === true || !sameCoordinateKey;

    if (acceptCoordinates && (forceCoordinates || !cacheMatches)) {
      this.coordinateCacheKey = key;
      this.coordinateCache = new Map(
        (snapshot.points || []).map((point) => [String(point.id), point.coords || [0, 0]]),
      );
      return snapshot;
    }

    if (cacheMatches) {
      return {
        ...snapshot,
        points: (snapshot.points || []).map((point) => ({
          ...point,
          coords: this.coordinateCache.get(String(point.id)) || point.coords,
        })),
      };
    }

    if (!this.snapshot?.points?.length) return snapshot;
    const incoming = Array.isArray(snapshot.points) ? snapshot.points : [];
    const current = Array.isArray(this.snapshot.points) ? this.snapshot.points : [];
    if (!incoming.length || incoming.length !== current.length) return snapshot;
    const currentById = new Map(current.map((point) => [String(point.id), point]));
    const samePointSet = incoming.every((point) => currentById.has(String(point.id)));
    if (!samePointSet) return snapshot;

    const currentConfig = JSON.stringify(this.coordinateConfig(this.snapshot));
    const incomingConfig = JSON.stringify(this.coordinateConfig(snapshot));
    if (currentConfig !== incomingConfig) return snapshot;

    const stabilized = {
      ...snapshot,
      points: incoming.map((point) => ({
        ...point,
        coords: currentById.get(String(point.id))?.coords || point.coords,
      })),
    };
    this.coordinateCacheKey = key;
    this.coordinateCache = new Map(
      (stabilized.points || []).map((point) => [String(point.id), point.coords || [0, 0]]),
    );
    return stabilized;
  }

  coordinateConfig(snapshot) {
    const source = snapshot?.source_config || {};
    return {
      sample_count: source.sample_count,
      embedding_dim: source.embedding_dim,
      seed: source.seed,
      label_prefix: source.label_prefix,
      metadata_mode: source.metadata_mode,
      cluster_count: source.cluster_count,
      projection_mode: source.projection_mode,
    };
  }

  applyUiState(uiState) {
    if (!uiState || typeof uiState !== "object") return;
    this.session = this.session ? { ...this.session, ui_state: uiState } : { ui_state: uiState };
    this.selected = new Set(
      (uiState.selected_point_ids || [])
        .map(String)
        .filter((pointId) => !this.graph.points.length || this.graph.byId.has(pointId)),
    );
    this.operationEl.value = uiState.operation || "inspect";
    this.metricEl.value = uiState.metric_mode || "step_distance";
    this.neighborEl.value = Number(uiState.neighbor_count || 4);
    this.alphaEl.value = uiState.alpha_schedule || "0,0.25,0.5,0.75,1";
    const viewport = uiState.viewport;
    if (viewport && typeof viewport === "object") {
      this.camera = {
        x: Number(viewport.x || 0),
        y: Number(viewport.y || 0),
        zoom: this.clampZoom(Number(viewport.zoom || 1)),
      };
    }
  }

  schedulePushState() {
    window.clearTimeout(this.pushTimer);
    this.pushTimer = window.setTimeout(() => this.pushState(), 120);
  }

  async pushState() {
    if (!this.sessionId) return;
    const payload = {
      selected_point_ids: [...this.selected],
      operation: this.operationEl.value || "inspect",
      metric_mode: this.metricEl.value || "step_distance",
      neighbor_count: Math.max(1, Number(this.neighborEl.value || 4)),
      alpha_schedule: this.alphaEl.value || "0,0.25,0.5,0.75,1",
      projection_mode: this.session?.ui_state?.projection_mode || this.snapshot?.projection_mode || "2d_umap",
      edge_mode: this.session?.ui_state?.edge_mode || this.snapshot?.edge_mode || "knn_cosine",
      viewport: { ...this.camera },
    };
    try {
      const data = await postJson(`/nels/api/session/${encodeURIComponent(this.sessionId)}/ui-state`, payload);
      this.session = data.session || this.session;
      this.syncDataNodeWidgets(payload);
      this.renderMeta(this.session);
      this.draw();
      this.setStatus(`state revision ${data.ui_state?.state_revision ?? "-"}`);
    } catch (error) {
      this.setStatus(`state sync error: ${error.message}`);
    }
  }

  syncDataNodeWidgets(payload) {
    const sessionNodeId = this.session?.session_node_id || this.sessions.find((item) => item.session_id === this.sessionId)?.session_node_id;
    if (!sessionNodeId) return;
    const sessionNode = (app.graph?._nodes || []).find((item) => String(item.id) === String(sessionNodeId));
    const sourceNode = this.linkedSourceNode(sessionNode);
    if (!sourceNode) return;
    this.setNodeWidgetValue(sourceNode, "neighbor_count", payload.neighbor_count);
  }

  fitCamera(options = {}) {
    this.camera = { x: 0, y: 0, zoom: 1 };
    if (options.push) this.schedulePushState();
    this.draw();
  }

  onCanvasDown(event) {
    const point = this.hitPoint(event);
    if (point) {
      const pointId = String(point.id);
      if (event.shiftKey || event.ctrlKey || event.metaKey) {
        if (this.selected.has(pointId)) this.selected.delete(pointId);
        else this.selected.add(pointId);
      } else {
        this.selected = new Set([pointId]);
      }
      this.schedulePushState();
      this.draw();
      return;
    }
    this.drag = {
      x: event.clientX,
      y: event.clientY,
      cameraX: this.camera.x,
      cameraY: this.camera.y,
    };
    this.canvas.classList.add("dragging");
  }

  onCanvasMove(event) {
    if (this.drag) {
      this.camera.x = this.drag.cameraX + (event.clientX - this.drag.x);
      this.camera.y = this.drag.cameraY + (event.clientY - this.drag.y);
      this.draw();
      return;
    }
    const point = this.hitPoint(event);
    if (point?.id !== this.hoverPoint?.id) {
      this.hoverPoint = point || null;
      this.renderHover(event);
      this.draw();
    } else if (point) {
      this.renderHover(event);
    }
  }

  onCanvasWheel(event) {
    event.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    const before = this.unprojectScreen(mx, my);
    const factor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
    this.camera.zoom = this.clampZoom(this.camera.zoom * factor);
    const after = this.toScreen(before);
    this.camera.x += mx - after.x;
    this.camera.y += my - after.y;
    this.schedulePushState();
    this.draw();
  }

  stopDrag() {
    if (!this.drag) return;
    this.drag = null;
    this.canvas.classList.remove("dragging");
    this.schedulePushState();
  }

  clearHover() {
    this.hoverPoint = null;
    this.hoverEl.classList.add("hidden");
    this.draw();
  }

  hitPoint(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let best = null;
    let bestDistance = HIT_RADIUS;
    for (const point of this.graph.points) {
      const pos = this.pointScreen(point);
      const dist = Math.hypot(pos.x - x, pos.y - y);
      if (dist <= bestDistance) {
        best = point;
        bestDistance = dist;
      }
    }
    return best;
  }

  renderHover(event) {
    if (!this.hoverPoint) {
      this.hoverEl.classList.add("hidden");
      return;
    }
    const meta = this.hoverPoint.metadata || {};
    const rows = [
      ["id", this.hoverPoint.id],
      ["label", this.hoverPoint.label || "-"],
      ["cluster", meta.cluster ?? "-"],
      ["x", Number((this.hoverPoint.coords || [0])[0] || 0).toFixed(3)],
      ["y", Number((this.hoverPoint.coords || [0, 0])[1] || 0).toFixed(3)],
    ];
    this.hoverEl.innerHTML = rows
      .map(([key, value]) => `<div><strong>${this.escape(key)}</strong>: ${this.escape(value)}</div>`)
      .join("");
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.hoverEl.style.left = `${event.clientX - rect.left + 12}px`;
    this.hoverEl.style.top = `${event.clientY - rect.top + 12}px`;
    this.hoverEl.classList.remove("hidden");
  }

  pointScreen(point) {
    const coords = point.coords || [0, 0];
    return this.toScreen({
      x: Number(coords[0] || 0),
      y: Number(coords[1] || 0),
    });
  }

  toScreen(world) {
    const rect = this.canvas.getBoundingClientRect();
    const bounds = this.graph.bounds;
    const pad = 42;
    const spanX = Math.max(0.0001, bounds.maxX - bounds.minX);
    const spanY = Math.max(0.0001, bounds.maxY - bounds.minY);
    const fitScale = Math.min((rect.width - pad * 2) / spanX, (rect.height - pad * 2) / spanY);
    const scale = fitScale * this.camera.zoom;
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    return {
      x: rect.width / 2 + this.camera.x + (world.x - centerX) * scale,
      y: rect.height / 2 + this.camera.y - (world.y - centerY) * scale,
    };
  }

  unprojectScreen(x, y) {
    const rect = this.canvas.getBoundingClientRect();
    const bounds = this.graph.bounds;
    const pad = 42;
    const spanX = Math.max(0.0001, bounds.maxX - bounds.minX);
    const spanY = Math.max(0.0001, bounds.maxY - bounds.minY);
    const fitScale = Math.min((rect.width - pad * 2) / spanX, (rect.height - pad * 2) / spanY);
    const scale = fitScale * this.camera.zoom;
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    return {
      x: centerX + (x - rect.width / 2 - this.camera.x) / scale,
      y: centerY - (y - rect.height / 2 - this.camera.y) / scale,
    };
  }

  clampZoom(value) {
    return Math.min(12, Math.max(0.15, Number(value) || 1));
  }

  draw() {
    const rect = this.canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(rect.width * scale));
    const height = Math.max(1, Math.floor(rect.height * scale));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    const ctx = this.ctx;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "#101419";
    ctx.fillRect(0, 0, rect.width, rect.height);
    this.emptyEl.style.display = this.graph.points.length ? "none" : "flex";
    if (!this.graph.points.length) return;

    const emphasized = this.emphasizedIds();
    const hasEmphasis = emphasized.size || this.selected.size || this.hoverPoint;
    ctx.lineWidth = 1;
    for (const edge of this.graph.edges) {
      const source = this.graph.byId.get(String(edge.source));
      const target = this.graph.byId.get(String(edge.target));
      if (!source || !target) continue;
      const a = this.pointScreen(source);
      const b = this.pointScreen(target);
      const active = this.selected.has(String(edge.source)) || this.selected.has(String(edge.target)) || emphasized.has(String(edge.source)) || emphasized.has(String(edge.target));
      ctx.strokeStyle = active ? "rgba(125, 211, 252, 0.58)" : "rgba(116, 137, 161, 0.20)";
      ctx.lineWidth = active ? 1.8 : 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    this.drawOperationOverlay(ctx);

    const now = Date.now();
    for (const point of this.graph.points) {
      const pointId = String(point.id);
      const pos = this.pointScreen(point);
      const cluster = point.metadata?.cluster ?? 0;
      const hue = (Number(cluster) * 67 + 205) % 360;
      const selected = this.selected.has(pointId);
      const hover = this.hoverPoint && String(this.hoverPoint.id) === pointId;
      const emphasizedPoint = emphasized.has(pointId);
      const dim = hasEmphasis && !selected && !hover && !emphasizedPoint;
      const pulseUntil = this.pulses.get(pointId) || 0;
      if (pulseUntil > now) {
        const life = (pulseUntil - now) / 1000;
        ctx.strokeStyle = `rgba(96, 165, 250, ${Math.max(0, Math.min(0.7, life))})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, POINT_RADIUS + 9 - life * 3, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = dim ? 0.35 : 1;
      ctx.fillStyle = selected ? "#facc15" : emphasizedPoint ? "#7dd3fc" : `hsl(${hue} 72% 63%)`;
      ctx.strokeStyle = hover ? "#ffffff" : selected ? "#fef3c7" : "rgba(255,255,255,0.72)";
      ctx.lineWidth = hover || selected ? 2 : 1;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, selected || hover ? POINT_RADIUS + 2 : POINT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    if ([...this.pulses.values()].some((until) => until > now)) {
      window.requestAnimationFrame(() => this.draw());
    }
  }

  drawOperationOverlay(ctx) {
    const result = this.operationResult;
    if (!result || result.operation !== "nearest_neighbor") return;
    const sourceId = this.firstPointId(result.source_point_id || result.source_point_ids);
    const source = this.graph.byId.get(sourceId);
    if (!source) return;
    const a = this.pointScreen(source);
    for (const neighbor of result.neighbors || []) {
      const target = this.graph.byId.get(this.firstPointId(neighbor.point_id || neighbor.id));
      if (!target) continue;
      const b = this.pointScreen(target);
      ctx.strokeStyle = "rgba(250, 204, 21, 0.78)";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  emphasizedIds() {
    const ids = new Set();
    const result = this.operationResult || {};
    if (result.source_point_id) ids.add(String(result.source_point_id));
    for (const id of result.source_point_ids || []) ids.add(String(id));
    for (const neighbor of result.neighbors || []) ids.add(this.firstPointId(neighbor.point_id || neighbor.id));
    for (const id of result.selection?.selected_point_ids || []) ids.add(String(id));
    return ids;
  }

  firstPointId(value) {
    if (Array.isArray(value)) return String(value[0] || "");
    return String(value || "");
  }

  pulseOperationResult(result) {
    const ids = [...this.emphasizedIds()];
    if (result?.selection?.selected_point_ids) ids.push(...result.selection.selected_point_ids);
    this.pulseIds(ids);
  }

  pulseIds(ids) {
    const until = Date.now() + 1100;
    for (const id of ids || []) {
      if (id !== undefined && id !== null) this.pulses.set(String(id), until);
    }
    this.draw();
  }

  bounds(points) {
    if (!points.length) return { minX: -1, maxX: 1, minY: -1, maxY: 1 };
    const xs = points.map((point) => Number((point.coords || [0])[0] || 0));
    const ys = points.map((point) => Number((point.coords || [0, 0])[1] || 0));
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return {
      minX: minX === maxX ? minX - 1 : minX,
      maxX: minX === maxX ? maxX + 1 : maxX,
      minY: minY === maxY ? minY - 1 : minY,
      maxY: minY === maxY ? maxY + 1 : maxY,
    };
  }

  renderMeta(session) {
    if (!session) {
      this.metaEl.innerHTML = "<dt>Status</dt><dd>No active session</dd>";
      return;
    }
    const snapshot = session.graph_snapshot || session.source_snapshot || this.snapshot || {};
    const source = session.source_config || snapshot.source_config || {};
    const rows = [
      ["session", session.session_id || this.sessionId || ""],
      ["session node", session.session_node_id || "-"],
      ["points", String((snapshot.points || []).length || 0)],
      ["projection", source.projection_mode || snapshot.projection_mode || "-"],
      ["neighbors", String(source.neighbor_count ?? this.neighborEl?.value ?? "-")],
      ["revision", String(session.ui_state?.state_revision ?? "-")],
      ["selected", String(this.selected.size)],
    ];
    this.metaEl.innerHTML = rows
      .map(([key, value]) => `<dt>${this.escape(key)}</dt><dd>${this.escape(value)}</dd>`)
      .join("");
  }

  renderResult() {
    const result = this.operationResult || {};
    const metrics = this.metrics || {};
    const rows = [
      ["operation", result.operation || "-"],
      ["request", result.request_id || "-"],
      ["metric", metrics.metric_mode || "-"],
      ["neighbors", String((result.neighbors || []).length || "-")],
      ["trajectory", String((result.points || []).length || "-")],
      ["status", result.status || metrics.status || "-"],
    ];
    this.resultEl.innerHTML = rows
      .map(([key, value]) => `<dt>${this.escape(key)}</dt><dd>${this.escape(value)}</dd>`)
      .join("");
  }

  addLog(event, options = {}) {
    const eventRevision = Number(event.state_revision || 0);
    const currentRevision = Number(this.session?.ui_state?.state_revision || 0);
    this.logs.push({
      timestamp: event.timestamp || Date.now(),
      event_type: event.event_type || "event",
      node_name: event.node_name || "NELS",
      message: event.message || event.status || "",
      status: event.status || "",
      stale: currentRevision > 0 && eventRevision > 0 && eventRevision < currentRevision,
    });
    if (this.logs.length > 300) this.logs.splice(0, this.logs.length - 300);
    if (options.render !== false) this.renderLog();
  }

  isStaleEvent(event) {
    const eventRevision = Number(event?.state_revision || 0);
    const currentRevision = Number(this.session?.ui_state?.state_revision || 0);
    return currentRevision > 0 && eventRevision > 0 && eventRevision < currentRevision;
  }

  renderLog() {
    this.logEl.innerHTML = this.logs
      .slice(-180)
      .map((entry) => {
        const time = new Date(entry.timestamp).toLocaleTimeString();
        const stale = entry.stale ? " stale" : "";
        const statusClass = entry.status === "failed" ? " nels-panel-log-status-failed" : "";
        const suffix = entry.stale ? " [stale]" : "";
        return `
          <div class="nels-panel-log-line${stale}">
            <span class="nels-panel-log-time">[${this.escape(time)}]</span>
            <span class="nels-panel-log-node">${this.escape(entry.node_name)}</span>
            <span class="nels-panel-log-type${statusClass}">${this.escape(entry.event_type)}</span>
            ${this.escape(entry.message)}${suffix}
          </div>
        `;
      })
      .join("");
    this.logEl.scrollTop = this.logEl.scrollHeight;
  }

  setStatus(text) {
    this.statusEl.textContent = text;
  }

  escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }
}

app.registerExtension({
  name: "nels.graph.panel",
  beforeRegisterNodeDef(nodeType, nodeData) {
    if (nodeData.name !== LAUNCHER_NODE) return;
    const onNodeCreated = nodeType.prototype.onNodeCreated;
    nodeType.prototype.onNodeCreated = function () {
      onNodeCreated?.apply(this, arguments);
      this.addWidget("button", "Open NELS Graph Panel", "open", () => {
        openNelsGraphPanel();
      });
      this.size = [260, 82];
    };
  },
  bottomPanelTabs: [
    {
      id: "nels-graph-panel",
      title: "NELS Graph",
      type: "custom",
      render: (el) => {
        const panel = new NelsGraphPanel(el);
        return () => panel.destroy();
      },
    },
  ],
});
