import { signal } from "@preact/signals";
import type { NelsOperationResult, NelsMetricsResult } from "../api/types.js";

export interface OperationConfig {
  operation: string;
  metric_mode: string;
  neighbor_count: number;
  alpha_schedule: string;
}

export const operationConfig = signal<OperationConfig>({
  operation: "inspect",
  metric_mode: "step_distance",
  neighbor_count: 4,
  alpha_schedule: "0,0.25,0.5,0.75,1",
});

export const operationResult = signal<NelsOperationResult | null>(null);
export const metrics = signal<NelsMetricsResult | null>(null);

export function setOperationConfig(patch: Partial<OperationConfig>): void {
  operationConfig.value = { ...operationConfig.value, ...patch };
}

export function setOperationResult(result: NelsOperationResult | null): void {
  operationResult.value = result;
}

export function setMetrics(m: NelsMetricsResult | null): void {
  metrics.value = m;
}
