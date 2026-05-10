import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "nels_graph_panel",
    },
    outDir: "js",
    // Don't wipe the js/ directory — the original nels_graph_panel.js stays
    // until we rename it to .bak after verifying the build
    emptyOutDir: false,
    rollupOptions: {
      // ComfyUI's app and api are served by ComfyUI at /scripts/*.js.
      // Using bare specifiers so Rollup doesn't try to resolve them as file paths.
      // output.paths maps them to the correct runtime relative path from js/nels_graph_panel.js.
      external: ["comfyui/app", "comfyui/api"],
      output: {
        paths: {
          "comfyui/app": "../../scripts/app.js",
          "comfyui/api": "../../scripts/api.js",
        },
      },
    },
  },
});
