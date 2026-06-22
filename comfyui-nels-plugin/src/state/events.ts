import { signal } from "@preact/signals";
import type { NelsEvent } from "../api/types.js";

export interface LogEntry {
  timestamp: number;
  event_type: string;
  node_name: string;
  message: string;
  status: string;
  stale: boolean;
}

export const eventLog = signal<LogEntry[]>([]);
export const status = signal("initializing");
export const view = signal<"graph" | "logs">("graph");
export const animationEnabled = signal(true);
export const operationRunning = signal(false);

// While true, low-priority status updates (state revision, ready) are suppressed
const statusLocked = signal(false);

export function setStatus(
  text: string,
  { priority = false }: { priority?: boolean } = {},
): void {
  if (!priority && statusLocked.value) return;
  status.value = text;
}

export function lockStatus(): void {
  statusLocked.value = true;
}
export function unlockStatus(): void {
  statusLocked.value = false;
}

export function setView(v: "graph" | "logs"): void {
  view.value = v;
}

export function addLog(
  event: Partial<NelsEvent & { stale?: boolean }>,
  currentRevision = 0,
): void {
  const eventRevision = Number(event.state_revision ?? 0);
  const entry: LogEntry = {
    timestamp: event.timestamp ?? Date.now(),
    event_type: event.event_type ?? "event",
    node_name: event.node_name ?? "NELS",
    message: event.message ?? event.status ?? "",
    status: event.status ?? "",
    stale:
      currentRevision > 0 &&
      eventRevision > 0 &&
      eventRevision < currentRevision,
  };
  const prev = eventLog.value;
  const next =
    prev.length >= 300
      ? [...prev.slice(prev.length - 299), entry]
      : [...prev, entry];
  eventLog.value = next;
}

export function clearLog(): void {
  eventLog.value = [];
}
