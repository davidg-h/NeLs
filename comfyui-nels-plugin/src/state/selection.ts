import { signal, computed } from "@preact/signals";
import type { NelsPoint } from "../api/types.js";
import { operationResult } from "./operation.js";

export const selectedIds = signal<Set<string>>(new Set());
export const hoverNodeId = signal<string | null>(null);
export const hoverPoint = signal<NelsPoint | null>(null);

// Derived from operationResult — nodes to highlight in addition to selection
export const emphasizedIds = computed<Set<string>>(() => {
  const result = operationResult.value;
  if (!result) return new Set();
  const ids = new Set<string>();
  if (result.source_point_id) ids.add(String(result.source_point_id));
  for (const id of result.source_point_ids ?? []) ids.add(String(id));
  for (const n of result.neighbors ?? []) {
    const pid = n.point_id ?? n.id;
    if (pid) ids.add(String(pid));
  }
  for (const id of result.selection?.selected_point_ids ?? []) ids.add(String(id));
  return ids;
});

export function selectNode(nodeId: string, additive: boolean): void {
  if (additive) {
    const next = new Set(selectedIds.value);
    if (next.has(nodeId)) next.delete(nodeId);
    else next.add(nodeId);
    selectedIds.value = next;
  } else {
    selectedIds.value = new Set([nodeId]);
  }
}

export function clearSelection(): void {
  selectedIds.value = new Set();
}

export function filterSelectionToIds(validIds: Set<string>): void {
  const filtered = new Set([...selectedIds.value].filter((id) => validIds.has(id)));
  if (filtered.size !== selectedIds.value.size) selectedIds.value = filtered;
}

export function applySelectedPointIds(ids: string[], validIds?: Set<string>): void {
  const filtered = validIds
    ? ids.filter((id) => validIds.has(id))
    : ids;
  selectedIds.value = new Set(filtered);
}
