import { signal, computed } from "@preact/signals";
import type { NelsOperationResult } from "../api/types.js";

export interface OperationConfig {
  operation: string;
  neighbor_count: number;
  alpha_schedule: number[];
  nearest_sample: boolean;
  snap_endpoints: boolean;
  variant_count: number;
  variation_strength: number;
  axis_group_a: string[];
  axis_group_b: string[];
  compute_axis_labels: boolean;
  probe_place_mode: boolean;
  probe_coords: number[] | null;
  probe_cross_coords: number[] | null;
  probe_mode: "2d" | "3d";
  probe_text_recon: boolean;
  probe_recon_max_minutes: number;
  probe_recon_max_iter: number;
  probe_seed_count: number;
  probe_noise_count: number;
  probe_negative_count: number;
}

export const operationConfig = signal<OperationConfig>({
  operation: "inspect",
  neighbor_count: 4,
  alpha_schedule: [0, 0.25, 0.5, 0.75, 1],
  nearest_sample: false,
  snap_endpoints: true,
  variant_count: 5,
  variation_strength: 0.3,
  axis_group_a: [],
  axis_group_b: [],
  compute_axis_labels: false,
  probe_place_mode: false,
  probe_coords: null,
  probe_cross_coords: null,
  probe_mode: "2d",
  probe_text_recon: false,
  probe_recon_max_minutes: 5,
  probe_recon_max_iter: 10,
  probe_seed_count: 15,
  probe_noise_count: 5,
  probe_negative_count: 5,
});

export const operationResult = signal<NelsOperationResult | null>(null);
export const trajectoryOverlayVisible = signal<boolean>(false);
export const trajectoryHighlightActive = signal<boolean>(false);
export const axisColorMode = signal<"a" | "b">("a");

/** Collect all point IDs referenced by an operation result (source, neighbors, selection) */
export function extractResultPointIds(
  result: NelsOperationResult | null,
): string[] {
  const ids: string[] = [];
  for (const id of result?.source_point_ids ?? []) ids.push(String(id));
  for (const n of result?.neighbors ?? []) {
    if (n.id) ids.push(String(n.id));
  }
  for (const id of result?.selection?.selected_point_ids ?? [])
    ids.push(String(id));
  return ids;
}

export interface ReconLiveState {
  step: number;
  maxStep: number;
  bestText: string;
  cosine_sim: number;
}
export const reconLiveState = signal<ReconLiveState | null>(null);

export function setReconLiveState(s: ReconLiveState | null): void {
  reconLiveState.value = s;
}

// Normalized [0,1] scores for secondary (orthogonal) axis -> populated only when backend returns axis_b_projection
export const axisBScoreMap = computed<Map<string, number>>(() =>
  normalizeProjectionScores(operationResult.value?.axis_b_projection),
);

// Normalized [0,1] projection scores by point id -> populated only for axis_projection
export const axisScoreMap = computed<Map<string, number>>(() =>
  normalizeProjectionScores(operationResult.value?.axis_projection),
);

export function setOperationConfig(patch: Partial<OperationConfig>): void {
  operationConfig.value = { ...operationConfig.value, ...patch };
}

export function setOperationResult(result: NelsOperationResult | null): void {
  operationResult.value = result;
  trajectoryOverlayVisible.value =
    (result?.trajectory_overlay?.length ?? 0) > 0;
  trajectoryHighlightActive.value = false;
  axisColorMode.value = "a";
}

export function setTrajectoryOverlayVisible(v: boolean): void {
  trajectoryOverlayVisible.value = v;
}

export function setTrajectoryHighlightActive(v: boolean): void {
  trajectoryHighlightActive.value = v;
  if (v) trajectoryOverlayVisible.value = true;
}

function normalizeProjectionScores(
  scores: { id: string; projection_score: number }[] | null | undefined,
): Map<string, number> {
  if (!scores?.length) return new Map();
  let min = Infinity;
  let max = -Infinity;
  for (const s of scores) {
    if (s.projection_score < min) min = s.projection_score;
    if (s.projection_score > max) max = s.projection_score;
  }
  const range = Math.max(max - min, 1e-8);
  const map = new Map<string, number>();
  for (const s of scores) map.set(s.id, (s.projection_score - min) / range);
  return map;
}
