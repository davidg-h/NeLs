import type { NelsPoint } from "../api/types.js";

type Mapper2D = {
  cx: number;
  cy: number;
  scale: number;
};

type Mapper3D = {
  cx: number;
  cy: number;
  cz: number;
  scale: number;
};

let mapper2d: Mapper2D = { cx: 0, cy: 0, scale: 1 };
let mapper3d: Mapper3D = { cx: 0, cy: 0, cz: 0, scale: 1 };

export function syncViewMappers(points: NelsPoint[]): void {
  const coords2d = points
    .map((point) => point.coords_2d)
    .filter((coords): coords is [number, number] => Array.isArray(coords) && coords.length >= 2);
  mapper2d = build2DMapper(coords2d);

  const coords3d = points
    .map((point) => point.coords_3d)
    .filter(
      (coords): coords is [number, number, number] =>
        Array.isArray(coords) && coords.length >= 3,
    );
  mapper3d = build3DMapper(coords3d);
}

export function rawToDisplay2D(
  coords: [number, number] | number[] | null | undefined,
): [number, number] | null {
  if (!coords || coords.length < 2) return null;
  return [
    (Number(coords[0]) - mapper2d.cx) * mapper2d.scale,
    -((Number(coords[1]) - mapper2d.cy) * mapper2d.scale),
  ];
}

export function displayToRaw2D(
  coords: [number, number] | number[] | null | undefined,
): [number, number] | null {
  if (!coords || coords.length < 2) return null;
  return [
    Number(coords[0]) / mapper2d.scale + mapper2d.cx,
    -(Number(coords[1]) / mapper2d.scale) + mapper2d.cy,
  ];
}

export function rawToDisplay3D(
  coords: [number, number, number] | number[] | null | undefined,
): [number, number, number] | null {
  if (!coords || coords.length < 3) return null;
  return [
    (Number(coords[0]) - mapper3d.cx) * mapper3d.scale,
    (Number(coords[1]) - mapper3d.cy) * mapper3d.scale,
    (Number(coords[2]) - mapper3d.cz) * mapper3d.scale,
  ];
}

export function displayToRaw3D(
  coords: [number, number, number] | number[] | null | undefined,
): [number, number, number] | null {
  if (!coords || coords.length < 3) return null;
  return [
    Number(coords[0]) / mapper3d.scale + mapper3d.cx,
    Number(coords[1]) / mapper3d.scale + mapper3d.cy,
    Number(coords[2]) / mapper3d.scale + mapper3d.cz,
  ];
}

function build2DMapper(coords: [number, number][]): Mapper2D {
  if (!coords.length) return { cx: 0, cy: 0, scale: 1 };
  const xs = coords.map((coord) => Number(coord[0]));
  const ys = coords.map((coord) => Number(coord[1]));
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const span = Math.max(maxX - minX, maxY - minY, 0.001);
  return {
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    scale: 2 / span,
  };
}

function build3DMapper(coords: [number, number, number][]): Mapper3D {
  if (!coords.length) return { cx: 0, cy: 0, cz: 0, scale: 1 };
  const xs = coords.map((coord) => Number(coord[0]));
  const ys = coords.map((coord) => Number(coord[1]));
  const zs = coords.map((coord) => Number(coord[2]));
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const minZ = Math.min(...zs);
  const maxZ = Math.max(...zs);
  const span = Math.max(maxX - minX, maxY - minY, maxZ - minZ, 0.001);
  return {
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    cz: (minZ + maxZ) / 2,
    scale: 2 / span,
  };
}
