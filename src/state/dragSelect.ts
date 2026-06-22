import { signal } from "@preact/signals";

export interface DragRect {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// Screen-space rectangle for the active drag selection, null when not dragging
export const dragSelectRect = signal<DragRect | null>(null);
