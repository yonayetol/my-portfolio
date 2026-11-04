import assert from "node:assert/strict";
import { canStand, safeStart, walk } from "../src/components/home/house-navigation.ts";

const wall = [{ minX: 1, maxX: 1.15, minZ: -3, maxZ: 3 }];
const stopped = walk({ x: 0, z: 0 }, 8, 0, wall);
assert(stopped.x < 0.77, "A large movement must not tunnel through a thin wall");
assert(canStand(stopped, wall), "The visitor's body must remain outside the wall");
const slid = walk({ x: 0.7, z: -1 }, 2, 2, wall);
assert(
  slid.x < 0.77 && slid.z > 0.9,
  "Walking diagonally along a wall must slide without sticking",
);
const doorway = [
  { minX: -9, maxX: -1.65, minZ: 2.8, maxZ: 3.2 },
  { minX: 1.65, maxX: 9, minZ: 2.8, maxZ: 3.2 },
];
assert(walk({ x: 0, z: 4 }, 0, -3, doorway).z < 1.1, "The front doorway must remain walkable");
assert(walk({ x: 2, z: 4 }, 0, -3, doorway).z > 3.4, "The doorway's side walls must remain solid");
const furniture = [{ minX: -1, maxX: 1, minZ: -1, maxZ: 1 }];
assert(
  canStand(safeStart({ x: 0, z: 0 }, furniture), furniture),
  "A room preset within furniture needs a safe nearby walking start",
);
assert.deepEqual(
  safeStart({ x: 4, z: 4 }, furniture),
  { x: 4, z: 4 },
  "A clear starting point must stay put",
);
for (const [dx, dz] of [
  [100, 100],
  [-100, -100],
]) {
  assert(
    canStand(walk({ x: 0, z: 0 }, dx, dz, []), []),
    "Property boundaries must contain movement in every direction",
  );
}
console.log("Walking geometry: 9 collision, doorway, spawn and property checks passed.");
