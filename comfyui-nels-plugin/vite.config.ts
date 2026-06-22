import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    dedupe: ["three"],
  },
  build: {
    outDir: "js",
    emptyOutDir: true,
    rollupOptions: {
      input: "src/index.ts",
      external: ["comfyui/app", "comfyui/api"],
      output: {
        entryFileNames: "nels_graph_panel.js",
        chunkFileNames: "[name].js",
        paths: {
          "comfyui/app": "../../scripts/app.js",
          "comfyui/api": "../../scripts/api.js",
        },
      },
    },
  },
});
