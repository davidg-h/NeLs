import { h, render } from "preact";
import { app } from "comfyui/app";
import { injectStyle } from "./style.js";
import { Panel } from "./ui/Panel.js";
import { registerEventListener } from "./state/session.js";

const SESSION_NODE = "nels_Session";
const LAUNCHER_NODE = "nels_GraphPanelLauncher";
let cleanupNelsGraphPanel: (() => void) | null = null;

// Opens the NELS Graph Panel tab using available ComfyUI extension APIs
function openNelsGraphPanel(): void {
  const bottomPanel = app.extensionManager?.bottomPanel;
  if (bottomPanel?.toggleBottomPanelTab) {
    bottomPanel.toggleBottomPanelTab("nels-graph-panel");
    return;
  }
  const command = app.extensionManager?.command;
  if (command?.execute) {
    command.execute("Workspace.ToggleBottomPanelTab.nels-graph-panel");
    return;
  }
  // Fallback: click the tab button by text content
  const clickable = [
    ...document.querySelectorAll("button, [role='tab'], .p-tab, .tab"),
  ] as HTMLElement[];
  const tab = clickable.find((el) => {
    const text = (el.textContent ?? "").trim().toLowerCase();
    return text === "nels graph" || text === "nels graph panel";
  });
  tab?.click();
}

app.registerExtension({
  name: "nels.graph.panel",

  beforeRegisterNodeDef(
    nodeType: { prototype: Record<string, unknown> },
    nodeData: { name: string },
  ) {
    if (nodeData.name === LAUNCHER_NODE) {
      const onNodeCreated = nodeType.prototype.onNodeCreated as (() => void) | undefined;
      nodeType.prototype.onNodeCreated = function (this: { addWidget: Function; size: number[] }) {
        onNodeCreated?.apply(this, []);
        this.addWidget("button", "Open NELS Graph Panel", "open", () => openNelsGraphPanel());
        this.size = [260, 82];
      };
    }
  },

  bottomPanelTabs: [
    {
      id: "nels-graph-panel",
      title: "NELS Graph",
      type: "custom",
      render(el: HTMLElement) {
        cleanupNelsGraphPanel?.();
        cleanupNelsGraphPanel = null;

        el.style.width = "100%";
        el.style.height = "100%";
        el.style.minWidth = "0";
        el.style.minHeight = "0";
        el.style.position = "relative";
        el.style.overflow = "hidden";
        injectStyle();
        render(h(Panel, null), el);

        const abortController = new AbortController();
        registerEventListener(abortController.signal);

        cleanupNelsGraphPanel = () => {
          abortController.abort();
          render(null, el);
        };
      },
      destroy() {
        cleanupNelsGraphPanel?.();
        cleanupNelsGraphPanel = null;
      },
    },
  ],
});
