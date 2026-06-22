import * as THREE from "three";

function createTextureCanvas(sz: number): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = document.createElement("canvas");
  canvas.width = sz;
  canvas.height = sz;
  return { canvas, ctx: canvas.getContext("2d")! };
}

function makeCircleTexture(): THREE.Texture {
  const sz = 128;
  const { canvas, ctx } = createTextureCanvas(sz);
  const r = sz / 2;
  const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.65, "rgba(255,255,255,0.97)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, sz, sz);
  return new THREE.CanvasTexture(canvas);
}

export function makeRingTexture(): THREE.Texture {
  const sz = 128;
  const { canvas, ctx } = createTextureCanvas(sz);
  const cx = sz / 2;
  const cy = sz / 2;

  const ringR = sz * 0.42;
  const ringW = sz * 0.1;
  ctx.strokeStyle = "rgba(255,255,255,0.95)";
  ctx.lineWidth = ringW;
  ctx.beginPath();
  ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

export function makeGhostTexture(): THREE.Texture {
  const sz = 128;
  const { canvas, ctx } = createTextureCanvas(sz);
  const cx = sz / 2;
  const cy = sz / 2;

  const dotR = sz * 0.16;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, dotR);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.65, "rgba(255,255,255,0.95)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
  ctx.fill();

  const ringR = sz * 0.36;
  const ringW = sz * 0.13;
  ctx.strokeStyle = "rgba(255,255,255,0.95)";
  ctx.lineWidth = ringW;
  ctx.beginPath();
  ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

// Shared singleton -> renderer3d.ts and ghost_nodes.ts both use the same circle sprite
export const sharedCircleTexture = makeCircleTexture();
