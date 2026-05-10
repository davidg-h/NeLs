// Ambient type declarations for ComfyUI runtime globals.
// These modules are NOT bundled — they are served by ComfyUI itself at runtime.

export interface ComfyNode {
  id: number;
  type?: string;
  comfyClass?: string;
  title?: string;
  properties?: Record<string, unknown>;
  inputs?: Array<{ name: string; link?: number | null }>;
  widgets?: Array<{ name: string; value: unknown; callback?: (v: unknown) => void }>;
}

declare module "comfyui/app" {
  const app: {
    registerExtension(ext: Record<string, unknown>): void;
    graph?: {
      _nodes?: ComfyNode[];
      links?: Record<string | number, { origin_id: number; target_id: number }>;
    };
    extensionManager?: {
      bottomPanel?: { toggleBottomPanelTab(id: string): void };
      command?: { execute(cmd: string): void };
    };
  };
  export { app };
}

declare module "comfyui/api" {
  const api: {
    fetchApi(url: string, options?: RequestInit): Promise<Response>;
    addEventListener(
      event: string,
      handler: (e: CustomEvent) => void,
      options?: AddEventListenerOptions,
    ): void;
    removeEventListener(
      event: string,
      handler: (e: CustomEvent) => void,
    ): void;
  };
  export { api };
}
