import { useEffect } from "preact/hooks";
import { signal, computed, effect } from "@preact/signals";
import { graphData, snapshot } from "../state/graph.js";
import { clusterColor, groupPointsByCluster } from "../graph/colors.js";
import { isTempSelectionId, selectedIds } from "../state/selection.js";
import { operationResult } from "../state/operation.js";

interface LegendEntry {
  id: string;
  name: string;
  color: string;
  count: number;
  variantCount: number;
  sample: string | null;
  pointIds: string[];
}

const collapsed = signal(false);
export const activeClusterId = signal<string | null>(null);
export const showClusterHulls = signal(false);

const legend = computed((): LegendEntry[] => {
  const points = graphData.value.points;
  const clusterLabels = snapshot.value?.source?.cluster_labels ?? {};
  const map = groupPointsByCluster(points);

  // Count variants from active consistency check result per cluster
  const variantMap = new Map<string, number>();
  const result = operationResult.value;
  if (result?.operation === "consistency_check") {
    for (const v of result.consistency_variants ?? []) {
      if (v.cluster_id != null && v.cluster_id >= 0) {
        const key = String(v.cluster_id);
        variantMap.set(key, (variantMap.get(key) ?? 0) + 1);
      }
    }
  }

  return [...map.entries()]
    .map(([id, { count, sample, ids }]) => ({
      id,
      name: clusterLabels[id] ?? id,
      color: clusterColor(id),
      count,
      variantCount: variantMap.get(id) ?? 0,
      sample,
      pointIds: ids,
    }))
    .sort((a, b) => Number(a.id) - Number(b.id));
});

export function ClusterLegend() {
  const entries = legend.value;

  // Drop selected ids that no longer exist when the point set changes (dataset reload)
  // Temporary ids (ghost nodes, latent probe) are never part of graphData, so they are kept
  // every view-mode toggle / snapshot refresh otherwise produces a new
  // points array and would silently wipe a just-made ghost/probe selection
  // Tied to this components mount lifecycle so it is disposed on panel close
  useEffect(() => {
    return effect(() => {
      const points = graphData.value.points;
      const validIds = new Set(points.map((p) => String(p.id)));
      // Keep the active cluster only if it still has members in the new point set
      // a view-mode toggle reprojects the same points (cluster survives), a dataset
      // reload does not
      if (
        activeClusterId.value !== null &&
        !points.some(
          (p) =>
            String(p.metadata?.cluster_global) === activeClusterId.value &&
            !p.metadata?.is_noise,
        )
      ) {
        activeClusterId.value = null;
      }
      const current = selectedIds.value;
      const kept = [...current].filter(
        (id) => isTempSelectionId(id) || validIds.has(id),
      );
      // Only write back when something was actually dropped
      if (kept.length !== current.size) {
        selectedIds.value = new Set(kept);
      }
    });
  }, []);

  if (!entries.length) return null;

  const isCollapsed = collapsed.value;
  const activeId = activeClusterId.value;
  // Guard: reset activeId if it no longer exists in current entries
  const activeExists =
    activeId !== null && entries.some((e) => e.id === activeId);

  return (
    <div class="nels-cluster-overlay">
      <div class="nels-cluster-toggle-row">
        <button
          class="nels-cluster-toggle"
          onClick={() => {
            collapsed.value = !collapsed.value;
          }}
        >
          <span>Clusters</span>
          <span class="nels-cluster-toggle-icon">
            {isCollapsed ? "▶" : "▼"}
          </span>
        </button>
        <button
          class={`nels-hull-chip${showClusterHulls.value ? " active" : ""}`}
          title="Toggle convex hulls around clusters"
          onClick={(e) => {
            e.stopPropagation();
            showClusterHulls.value = !showClusterHulls.value;
          }}
        >
          ⬡ Hulls
        </button>
      </div>
      {!isCollapsed && (
        <div class="nels-legend-list">
          {entries.map((e) => (
            <div
              key={e.id}
              class={`nels-legend-row${activeExists && activeId === e.id ? " active" : ""}`}
              onClick={() => toggleCluster(e)}
            >
              <span class="nels-legend-dot" style={`background:${e.color}`} />
              <div class="nels-legend-info">
                <span class="nels-legend-name">{e.name}</span>
                {e.sample && (
                  <span class="nels-legend-sample">"{e.sample}"</span>
                )}
              </div>
              <span class="nels-legend-meta">
                {e.count} pts{e.variantCount > 0 ? ` +${e.variantCount}v` : ""}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function toggleCluster(entry: LegendEntry): void {
  if (activeClusterId.value === entry.id) {
    activeClusterId.value = null;
    selectedIds.value = new Set();
  } else {
    activeClusterId.value = entry.id;
    selectedIds.value = new Set(entry.pointIds);
  }
}
