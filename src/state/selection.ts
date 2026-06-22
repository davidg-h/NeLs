import { signal, computed } from "@preact/signals";
import type { NelsPoint } from "../api/types.js";
import { operationResult, extractResultPointIds } from "./operation.js";

export const selectedIds = signal<Set<string>>(new Set());
export const hoverNodeId = signal<string | null>(null);
export const hoverPoint = signal<NelsPoint | null>(null);

// Preserve temporary selection IDs that do not exist in graphData.byId
export function isTempSelectionId(id: string): boolean {
  return id.startsWith("__ghost__") || id === "probe";
}

// Derived from operationResult -> nodes to highlight in addition to selection
export const emphasizedIds = computed<Set<string>>(
  () => new Set(extractResultPointIds(operationResult.value)),
);

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

export function applySelectedPointIds(
  ids: string[],
  validIds?: Set<string>,
): void {
  const filtered = validIds
    ? ids.filter((id) => isTempSelectionId(id) || validIds.has(id))
    : ids;
  selectedIds.value = new Set(filtered);
}
