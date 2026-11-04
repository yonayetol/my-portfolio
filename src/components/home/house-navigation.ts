/** Horizontal walking collision. Small steps prevent tunnelling through thin walls. */
export type Obstacle = { minX: number; maxX: number; minZ: number; maxZ: number };
export type WalkPoint = { x: number; z: number };
export const walkingBounds: Obstacle = { minX: -11.7, maxX: 11.7, minZ: -9.5, maxZ: 13.5 };
const radius = 0.24;
export function canStand(point: WalkPoint, obstacles: Obstacle[]) {
  if (
    point.x < walkingBounds.minX ||
    point.x > walkingBounds.maxX ||
    point.z < walkingBounds.minZ ||
    point.z > walkingBounds.maxZ
  )
    return false;
  return !obstacles.some((box) => {
    const x = Math.max(box.minX, Math.min(box.maxX, point.x));
    const z = Math.max(box.minZ, Math.min(box.maxZ, point.z));
    return (point.x - x) ** 2 + (point.z - z) ** 2 < radius ** 2;
  });
}
export function walk(point: WalkPoint, dx: number, dz: number, obstacles: Obstacle[]): WalkPoint {
  const next = { ...point };
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.1));
  for (let step = 0; step < steps; step++) {
    if (canStand({ x: next.x + dx / steps, z: next.z }, obstacles)) next.x += dx / steps;
    if (canStand({ x: next.x, z: next.z + dz / steps }, obstacles)) next.z += dz / steps;
  }
  return next;
}
export function safeStart(point: WalkPoint, obstacles: Obstacle[]): WalkPoint {
  if (canStand(point, obstacles)) return { ...point };
  for (let distance = 0.3; distance < 5; distance += 0.3) {
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
      const candidate = {
        x: point.x + Math.sin(angle) * distance,
        z: point.z + Math.cos(angle) * distance,
      };
      if (canStand(candidate, obstacles)) return candidate;
    }
  }
  return { x: 0, z: 5 };
}
