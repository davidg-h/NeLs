type SeparatorNode = {
  comfyClass: string;
  widgets?: { name: string }[];
  addDOMWidget: (...args: unknown[]) => unknown;
  setSize: (s: unknown) => void;
  computeSize: () => unknown;
};

const ENCODER_NODE = "nels_PromptEncoder";
const APPENDER_NODE = "nels_AddToDataset";

const ENCODER_SECTIONS: [string, string][] = [
  ["input_source",        "Source"],
  ["umap_n_neighbors",    "UMAP"],
  ["cluster_umap_dims",   "Cluster"],
  ["runtime_subset_size", "Runtime"],
];

const APPENDER_SECTIONS: [string, string][] = [
  ["input_source", "Source"],
];

const NODE_SECTIONS: Record<string, [string, string][]> = {
  [ENCODER_NODE]: ENCODER_SECTIONS,
  [APPENDER_NODE]: APPENDER_SECTIONS,
};

function insertSectionLabel(node: SeparatorNode, beforeName: string, label: string): void {
  const widgets = node.widgets;
  if (!widgets) return;
  const targetIdx = widgets.findIndex((w) => w.name === beforeName);
  if (targetIdx === -1) return;

  const el = document.createElement("div");
  el.style.cssText =
    "width:100%;height:24px;display:flex;align-items:center;gap:6px;padding:0 4px;pointer-events:none;box-sizing:border-box;";

  const text = document.createElement("span");
  text.textContent = label;
  text.style.cssText =
    "font-size:9px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.3);white-space:nowrap;flex-shrink:0;";

  const line = document.createElement("div");
  line.style.cssText = "flex:1;height:1px;background:rgba(255,255,255,0.1);";

  el.appendChild(text);
  el.appendChild(line);

  const sep = node.addDOMWidget(`_sep_${beforeName}`, "nels_separator", el, {
    serialize: false,
  }) as { computedHeight: number };
  sep.computedHeight = 24;

  const sepIdx = (node.widgets as unknown[]).indexOf(sep);
  (node.widgets as unknown[]).splice(sepIdx, 1);
  (node.widgets as unknown[]).splice(targetIdx, 0, sep);
  node.setSize(node.computeSize());
}

export async function onNodeCreatedSections(node: SeparatorNode): Promise<void> {
  const sections = NODE_SECTIONS[node.comfyClass];
  if (!sections) return;
  for (const [beforeName, label] of sections)
    insertSectionLabel(node, beforeName, label);
}
