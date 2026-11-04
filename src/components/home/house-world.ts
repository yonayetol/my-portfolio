import * as THREE from "three";
import { codingProfile } from "@/data/profile";
import { withBase } from "@/utils/paths";
import { courses, type Course } from "@/data/courses";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/** A small, entirely procedural home. Shared geometry keeps the scene inexpensive. */
export function createHouseWorld(onAssetReady?: () => void) {
  const group = new THREE.Group();
  group.name = "Yonas's home";
  const roof = new THREE.Group();
  roof.name = "Lift-away terracotta roof";
  group.add(roof);

  const palette = {
    plaster: "#e9ddc2",
    plasterLight: "#f5ead4",
    plasterShadow: "#cdbd9c",
    floor: "#d2b78f",
    wood: "#9c714e",
    darkWood: "#6d5039",
    paleWood: "#b9986a",
    roof: "#b9694d",
    roofLight: "#d18c65",
    roofDark: "#965039",
    blue: "#365c9a",
    blueLight: "#5b7db1",
    olive: "#647751",
    oliveLight: "#829364",
    oliveDark: "#465b3e",
    paper: "#fff1ce",
    brass: "#b88e4d",
    copper: "#bc7950",
    earth: "#6a5742",
    lawn: "#a7ad79",
    cream: "#f0e4c9",
    coral: "#c97a68",
    black: "#343a32",
    ink: "#26352e",
    glass: "#8ca7a0",
  };
  const materials = Object.fromEntries(
    Object.entries(palette).map(([name, color]) => [
      name,
      new THREE.MeshStandardMaterial({ color, roughness: 0.85 }),
    ]),
  ) as Record<keyof typeof palette, THREE.MeshStandardMaterial>;
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: "#f0ca7c",
    emissive: "#d29a43",
    emissiveIntensity: 0.28,
    roughness: 0.5,
  });
  const screenMaterial = new THREE.MeshStandardMaterial({
    color: "#233d3b",
    emissive: "#2f685f",
    emissiveIntensity: 0.2,
    roughness: 0.45,
  });
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(1, 10, 7);
  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 12);
  const potGeometry = new THREE.CylinderGeometry(1, 0.72, 1, 12);
  const coneGeometry = new THREE.ConeGeometry(1, 1, 12);
  type Material = keyof typeof palette | THREE.Material;
  const material = (value: Material) => (typeof value === "string" ? materials[value] : value);

  function box(
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    color: Material,
  ) {
    const mesh = new THREE.Mesh(cubeGeometry, material(color));
    mesh.position.set(x, y, z);
    mesh.scale.set(w, h, d);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function ball(
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    rx: number,
    ry: number,
    rz: number,
    color: Material,
  ) {
    const mesh = new THREE.Mesh(sphereGeometry, material(color));
    mesh.position.set(x, y, z);
    mesh.scale.set(rx, ry, rz);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function cylinder(
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    radius: number,
    height: number,
    color: Material,
  ) {
    const mesh = new THREE.Mesh(cylinderGeometry, material(color));
    mesh.position.set(x, y, z);
    mesh.scale.set(radius, height, radius);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function rod(
    parent: THREE.Object3D,
    start: number[],
    end: number[],
    radius: number,
    color: Material,
  ) {
    const a = new THREE.Vector3(start[0] ?? 0, start[1] ?? 0, start[2] ?? 0);
    const b = new THREE.Vector3(end[0] ?? 0, end[1] ?? 0, end[2] ?? 0);
    const mesh = cylinder(parent, 0, 0, 0, radius, a.distanceTo(b), color);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.sub(a).normalize());
    return mesh;
  }
  function local(name: string, x: number, y: number, z: number, rotation = 0) {
    const object = new THREE.Group();
    object.name = name;
    object.position.set(x, y, z);
    object.rotation.y = rotation;
    group.add(object);
    return object;
  }
  function label(
    parent: THREE.Object3D,
    text: string,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    background = "#f5ead4",
    foreground = "#344234",
  ) {
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = Math.round((768 * height) / width);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = foreground;
    ctx.lineWidth = 2;
    ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
    ctx.fillStyle = foreground;
    ctx.font = `500 ${Math.round(canvas.height * 0.32)}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width - 64);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const plaque = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.9 }),
    );
    plaque.position.set(x, y, z);
    parent.add(plaque);
    return plaque;
  }
  function plant(
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    size = 1,
    flower = false,
  ) {
    const pot = new THREE.Mesh(potGeometry, materials.roof);
    pot.position.set(x, y + size * 0.24, z);
    pot.scale.set(size * 0.27, size * 0.48, size * 0.27);
    pot.castShadow = true;
    parent.add(pot);
    cylinder(parent, x, y + size * 0.46, z, size * 0.29, size * 0.08, "roofLight");
    cylinder(parent, x, y + size * 0.51, z, size * 0.235, size * 0.025, "earth");
    rod(parent, [x, y + size * 0.5, z], [x, y + size * 1.2, z], size * 0.025, "oliveDark");
    for (let i = 0; i < 5; i++) {
      const angle = i * 2.4;
      const ly = y + size * (0.65 + i * 0.115);
      const leaf = ball(
        parent,
        x + Math.sin(angle) * size * 0.14,
        ly,
        z + Math.cos(angle) * size * 0.14,
        size * 0.23,
        size * 0.065,
        size * 0.1,
        i % 2 ? "olive" : "oliveLight",
      );
      leaf.rotation.set(0.25, -angle, 0.5);
      if (flower && i > 2)
        ball(
          parent,
          x + Math.sin(angle) * size * 0.23,
          ly + size * 0.08,
          z + Math.cos(angle) * size * 0.23,
          size * 0.075,
          size * 0.07,
          size * 0.075,
          "coral",
        );
    }
  }
  function book(
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    color: Material,
  ) {
    box(parent, x, y, z, w, h, d, color);
    box(parent, x, y + h * 0.5 + 0.005, z, w * 0.88, 0.018, d * 0.91, "paper");
  }
  function mug(parent: THREE.Object3D, x: number, y: number, z: number, color: Material = "blue") {
    cylinder(parent, x, y + 0.12, z, 0.1, 0.24, color);
    cylinder(parent, x, y + 0.245, z, 0.078, 0.007, "darkWood");
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.077, 0.022, 6, 12), material(color));
    handle.position.set(x + 0.11, y + 0.13, z);
    parent.add(handle);
  }
  function table(
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    height: number,
    color: Material = "wood",
  ) {
    box(parent, x, y + height, z, width, 0.12, depth, color);
    for (const dx of [-1, 1])
      for (const dz of [-1, 1]) {
        box(
          parent,
          x + dx * (width / 2 - 0.14),
          y + height / 2,
          z + dz * (depth / 2 - 0.14),
          0.095,
          height,
          0.095,
          "darkWood",
        );
      }
  }

  // A physical patch of ground, with raised plaster foundation and brick courtyard.
  box(group, 0, -0.35, 2, 25, 0.5, 25, "lawn");
  box(group, 0, -0.11, -2, 18.5, 0.35, 10.5, "plasterShadow");
  box(group, 0, 0.06, -2, 18, 0.16, 10, "floor");
  for (let i = 0; i < 24; i++)
    box(group, -8.8 + i * 0.76, 0.147, -2, 0.018, 0.008, 9.9, "paleWood");
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 8; col++)
      box(
        group,
        -7.9 + col * 2.2 + (row % 2 ? 0.7 : 0),
        0.152,
        -5.7 + row * 2.4,
        0.02,
        0.009,
        0.9,
        "wood",
      );
  }
  box(group, 0, 0, 7.1, 3.7, 0.12, 8.5, "cream");
  box(group, 0, -0.015, 4.65, 16, 0.14, 2.4, "roofLight");
  for (let i = -6; i <= 6; i++) box(group, i * 1.2, 0.062, 4.65, 0.025, 0.005, 2.4, "roof");
  for (const z of [3.85, 4.65, 5.45]) box(group, 0, 0.064, z, 16, 0.006, 0.023, "roof");
  for (let i = 0; i < 6; i++)
    box(group, 0, 0.075, 6.2 + i * 0.8, 3.6, 0.008, 0.018, "plasterShadow");

  // Tall back and side walls leave the whole interior open to the arrival view.
  box(group, 0, 2, -7, 18.3, 4, 0.28, "plaster");
  box(group, -9, 2, -2, 0.28, 4, 10, "plasterLight");
  box(group, 9, 2, -2, 0.28, 4, 10, "plasterShadow");
  box(group, 0, 0.25, -6.8, 18, 0.28, 0.12, "cream");
  box(group, -8.8, 0.25, -2, 0.12, 0.28, 10, "cream");
  box(group, 8.8, 0.25, -2, 0.12, 0.28, 10, "cream");
  for (const x of [-9, 9]) {
    box(group, x, 4.05, -2, 0.36, 0.16, 10.5, "wood");
    box(group, x, 1.92, 3, 0.38, 3.85, 0.38, "plasterLight");
  }
  box(group, 0, 4.05, -7, 18.5, 0.16, 0.4, "wood");
  // Lower front walls retain the feeling of a house without obscuring interior cameras.
  box(group, -5.4, 0.55, 3, 7.1, 1.1, 0.3, "plaster");
  box(group, 5.4, 0.55, 3, 7.1, 1.1, 0.3, "plaster");
  box(group, -5.4, 1.13, 3, 7.25, 0.1, 0.42, "cream");
  box(group, 5.4, 1.13, 3, 7.25, 0.1, 0.42, "cream");
  for (const x of [-1.8, 1.8]) box(group, x, 1.9, 3, 0.28, 3.8, 0.38, "paleWood");
  box(group, 0, 3.67, 3, 3.9, 0.3, 0.4, "paleWood");
  label(group, "MAKE YOURSELF AT HOME", 0, 3.65, 3.23, 2.9, 0.3, "#b9986a", "#f9edcf");
  box(group, 0, 0.18, 3.35, 3.8, 0.2, 0.6, "plasterShadow");
  box(group, 0, 0.08, 3.8, 4.3, 0.16, 0.5, "plasterLight");

  // Open gable roof: removable as soon as the visitor comes inside.
  for (const side of [-1, 1]) {
    const slope = box(roof, side * 4.7, 5.35, -2, 9.75, 0.18, 10.8, "roof");
    slope.rotation.z = side * -0.275;
    for (let row = 0; row < 10; row++) {
      const tileRow = box(
        roof,
        side * (0.45 + row * 0.94),
        6.55 - row * 0.26,
        -2,
        0.1,
        0.1,
        10.9,
        row % 2 ? "roofLight" : "roofDark",
      );
      tileRow.rotation.z = side * -0.275;
    }
    for (let col = 0; col < 20; col++) {
      const ridge = box(roof, side * 4.7, 5.47, -7.2 + col * 0.55, 9.75, 0.045, 0.035, "roofLight");
      ridge.rotation.z = side * -0.275;
    }
  }
  cylinder(roof, 0, 6.65, -2, 0.17, 10.9, "roofLight").rotation.x = Math.PI / 2;
  box(roof, 6.4, 5.45, -5.2, 0.8, 2.9, 0.9, "plaster");
  box(roof, 6.4, 6.94, -5.2, 1, 0.18, 1.1, "roofDark");

  // Windows contain warm light, solid frames, and casement divisions.
  function windowFrame(x: number, y: number, z: number, width: number, height: number) {
    box(group, x, y, z, width + 0.18, height + 0.18, 0.12, "wood");
    box(group, x, y, z + 0.08, width, height, 0.055, windowMaterial);
    box(group, x, y, z + 0.13, 0.065, height, 0.065, "cream");
    box(group, x, y, z + 0.13, width, 0.065, 0.065, "cream");
    box(group, x, y - height / 2 - 0.1, z + 0.16, width + 0.35, 0.12, 0.42, "paleWood");
  }
  windowFrame(4.5, 2.55, -6.82, 2.6, 1.75);
  windowFrame(-1.4, 2.55, -6.82, 1.7, 1.75);
  // Side kitchen window turns inward into the room.
  const sideWindow = local("Kitchen light", 8.78, 2.55, 0, -Math.PI / 2);
  box(sideWindow, 0, 0, 0, 2.3, 1.8, 0.08, "wood");
  box(sideWindow, 0, 0, 0.05, 2.1, 1.6, 0.03, windowMaterial);
  box(sideWindow, 0, 0, 0.09, 0.08, 1.6, 0.06, "cream");
  box(sideWindow, 0, 0, 0.09, 2.1, 0.06, 0.06, "cream");
  box(sideWindow, 0, -0.93, 0.15, 2.5, 0.1, 0.45, "paleWood");
  plant(sideWindow, -0.65, -0.89, 0.15, 0.33);
  plant(sideWindow, 0.65, -0.89, 0.15, 0.33);

  // MAIN ROOM — soft green sofa, woven rug, notebook, tea, and a standing lamp.
  const living = local("Main room", -4.8, 0.15, -0.1);
  living.userData.inspect = "about";
  box(living, 0, 0.02, 0.6, 4.9, 0.035, 3.8, "cream");
  for (const z of [-1.03, 2.22]) box(living, 0, 0.044, z, 4.6, 0.006, 0.12, "coral");
  for (const x of [-2.2, 2.2]) box(living, x, 0.044, 0.6, 0.12, 0.006, 3.2, "coral");
  for (let i = -6; i <= 6; i++) {
    box(living, i * 0.34, 0.05, -1.35, 0.035, 0.012, 0.23, "paper");
    box(living, i * 0.34, 0.05, 2.55, 0.035, 0.012, 0.23, "paper");
  }
  for (const x of [-1.35, 1.35])
    for (const z of [-1.45, -0.5]) cylinder(living, x, 0.2, z, 0.07, 0.4, "wood");
  box(living, 0, 0.47, -1, 3.3, 0.4, 1.3, "olive");
  box(living, 0, 0.94, -1.53, 3.3, 0.9, 0.32, "oliveDark");
  for (const x of [-1.55, 1.55]) box(living, x, 0.8, -1, 0.3, 0.64, 1.45, "olive");
  for (const x of [-0.75, 0.75]) box(living, x, 0.71, -0.94, 1.4, 0.17, 1.06, "oliveLight");
  const cushion = box(living, -1.04, 1.07, -1.1, 0.63, 0.6, 0.2, "cream");
  cushion.rotation.set(-0.2, 0.08, 0.12);
  const cushion2 = box(living, 1, 1.04, -1.08, 0.58, 0.57, 0.2, "coral");
  cushion2.rotation.set(-0.25, 0, -0.14);
  table(living, 0, 0, 0.85, 2.1, 1.15, 0.65, "paleWood");
  const notebook = new THREE.Group();
  notebook.name = "First principles notebook";
  notebook.userData.inspect = "principles";
  living.add(notebook);
  book(notebook, -0.2, 0.77, 0.85, 0.55, 0.09, 0.72, "blue");
  box(notebook, -0.2, 0.83, 0.85, 0.46, 0.012, 0.64, "paper");
  for (let i = 0; i < 4; i++)
    box(notebook, -0.2, 0.84, 0.65 + i * 0.1, 0.34, 0.005, 0.008, "paleWood");
  mug(living, 0.65, 0.72, 0.9, "cream");
  cylinder(living, -2.2, 0.08, -1.4, 0.34, 0.1, "darkWood");
  cylinder(living, -2.2, 1.15, -1.4, 0.035, 2.15, "brass");
  const shade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.52, 0.55, 16, 1, true),
    materials.paper,
  );
  shade.position.set(-2.2, 2.3, -1.4);
  living.add(shade);
  ball(living, -2.2, 2.15, -1.4, 0.12, 0.12, 0.12, windowMaterial);
  plant(living, 2.25, 0, -1.6, 0.85);

  // A real portrait gives the room its owner. The callback wakes an on-demand
  // renderer when the local photograph has decoded; navigation never waits on it.
  const portrait = local("Yonas's portrait", -7.1, 0.15, 0.8, 0.9);
  portrait.userData.inspect = "about";
  for (const x of [-0.51, 0.51]) {
    rod(portrait, [x, 0, 0.15], [x * 0.5, 2.7, -0.12], 0.045, "wood");
  }
  rod(portrait, [0, 0, -0.6], [0, 2.4, -0.12], 0.045, "wood");
  box(portrait, 0, 1.3, 0.04, 1.42, 0.09, 0.2, "wood");
  box(portrait, 0, 2.1, 0, 1.34, 1.75, 0.09, "darkWood");
  box(portrait, 0, 2.1, 0.055, 1.23, 1.64, 0.035, "paper");
  const portraitTexture = new THREE.TextureLoader().load(
    withBase("images/yonas-portrait-small.webp"),
    () => onAssetReady?.(),
    undefined,
    () => onAssetReady?.(),
  );
  portraitTexture.colorSpace = THREE.SRGBColorSpace;
  const portraitPhoto = new THREE.Mesh(
    new THREE.PlaneGeometry(1.08, 1.44),
    new THREE.MeshStandardMaterial({ map: portraitTexture, roughness: 1 }),
  );
  portraitPhoto.position.set(0, 2.1, 0.08);
  portrait.add(portraitPhoto);
  label(portrait, "Yonas · Addis Ababa", 0, 1.37, 0.085, 1.16, 0.12);

  // WORKSHOP — deep desk, glowing screen, keyboard, notes, lamp, tools.
  const workshop = local("Workshop", 4.6, 0.15, -4.6);
  workshop.userData.inspect = "nexora";
  table(workshop, 0, 0, 0, 4.6, 1.6, 1.23, "paleWood");
  box(workshop, -1.65, 0.62, 0, 0.8, 1.12, 1.25, "wood");
  for (const y of [0.34, 0.7, 1.05]) {
    box(workshop, -1.65, y, 0.64, 0.73, 0.28, 0.035, "paleWood");
    box(workshop, -1.65, y, 0.67, 0.16, 0.035, 0.04, "brass");
  }
  box(workshop, 0, 1.34, -0.23, 0.65, 0.05, 0.45, "black");
  cylinder(workshop, 0, 1.65, -0.35, 0.065, 0.6, "black");
  box(workshop, 0, 2.01, -0.4, 1.8, 1.03, 0.09, "black");
  box(workshop, 0, 2.02, -0.34, 1.64, 0.87, 0.02, screenMaterial);
  for (let i = 0; i < 7; i++) {
    box(
      workshop,
      -0.49 + (i % 3) * 0.08,
      2.3 - i * 0.095,
      -0.323,
      0.46 + (i % 2) * 0.35,
      0.022,
      0.008,
      i % 3 ? "oliveLight" : "paper",
    );
  }
  box(workshop, -0.05, 1.33, 0.39, 1.2, 0.055, 0.38, "cream");
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 10; col++)
      box(
        workshop,
        -0.53 + col * 0.105,
        1.364,
        0.28 + row * 0.1,
        0.075,
        0.012,
        0.065,
        "plasterShadow",
      );
  ball(workshop, 0.85, 1.35, 0.41, 0.09, 0.045, 0.14, "black");
  const zikuala = new THREE.Group();
  zikuala.name = "Zikuala campus model";
  zikuala.userData.inspect = "zikuala";
  workshop.add(zikuala);
  box(zikuala, 1.65, 1.36, 0.1, 1.03, 0.1, 0.94, "oliveLight");
  box(zikuala, 1.65, 1.425, 0.1, 0.1, 0.025, 0.85, "cream");
  for (const [x, z, h] of [
    [1.39, -0.09, 0.33],
    [1.92, -0.1, 0.45],
    [1.4, 0.35, 0.24],
  ]) {
    box(zikuala, x!, 1.42 + h! / 2, z!, 0.3, h!, 0.28, "plasterLight");
    box(zikuala, x!, 1.45 + h!, z!, 0.34, 0.045, 0.32, "blue");
    box(zikuala, x!, 1.5 + h! / 2, z! + 0.147, 0.16, 0.08, 0.012, "blueLight");
  }
  label(zikuala, "ZIKUALA", 1.65, 1.38, 0.58, 0.85, 0.11, "#647751", "#fff1ce");
  mug(workshop, 1.08, 1.3, -0.35, "olive");
  cylinder(workshop, -1.7, 1.34, -0.34, 0.23, 0.08, "blue");
  rod(workshop, [-1.7, 1.34, -0.34], [-1.72, 2.1, -0.34], 0.035, "brass");
  rod(workshop, [-1.72, 2.1, -0.34], [-1.36, 2.4, -0.34], 0.035, "brass");
  const taskShade = new THREE.Mesh(coneGeometry, materials.blue);
  taskShade.position.set(-1.24, 2.29, -0.34);
  taskShade.scale.set(0.26, 0.26, 0.26);
  workshop.add(taskShade);
  // Chair, facing the workbench.
  box(workshop, 0, 0.65, 1.42, 0.8, 0.16, 0.78, "blue");
  box(workshop, 0, 1.14, 1.75, 0.82, 0.85, 0.12, "blue");
  for (const x of [-0.3, 0.3])
    for (const z of [1.13, 1.71]) box(workshop, x, 0.32, z, 0.055, 0.64, 0.055, "darkWood");
  label(workshop, "THE WORKSHOP", 0, 3.4, -2.16, 2.5, 0.38);
  plant(workshop, 2.5, 0, -0.7, 0.9);
  const graph = local("Pattern-mining graph", 7.35, 2.45, -6.65);
  graph.userData.inspect = "mm2";
  box(graph, 0, 0, 0, 1.75, 1.35, 0.12, "paleWood");
  box(graph, 0, 0, 0.08, 1.58, 1.18, 0.03, "oliveDark");
  const graphNodes: [number, number][] = [
    [-0.5, 0.3],
    [0.15, 0.4],
    [0.54, -0.07],
    [-0.2, -0.3],
    [-0.58, -0.12],
  ];
  for (let i = 0; i < graphNodes.length; i++) {
    const [x, y] = graphNodes[i]!;
    const [nextX, nextY] = graphNodes[(i + 1) % graphNodes.length]!;
    rod(graph, [x, y, 0.13], [nextX, nextY, 0.13], 0.012, "paleWood");
    ball(graph, x, y, 0.14, 0.075, 0.075, 0.035, i % 2 ? "paper" : "roofLight");
  }
  rod(graph, [-0.5, 0.3, 0.13], [-0.2, -0.3, 0.13], 0.012, "paleWood");

  // KITCHEN — olive cabinetry along the right wall, copper pans and a recipe island.
  const kitchen = local("Kitchen", 6.9, 0.15, 0, -Math.PI / 2);
  kitchen.userData.inspect = "recipe";
  for (let i = 0; i < 3; i++) {
    const x = -1.25 + i * 1.25;
    box(kitchen, x, 0.6, 0, 1.2, 1.2, 1.25, "olive");
    box(kitchen, x, 0.62, 0.64, 1.04, 1.02, 0.045, "oliveLight");
    box(kitchen, x, 1.0, 0.68, 0.33, 0.04, 0.06, "brass");
  }
  box(kitchen, 0, 1.26, 0, 3.95, 0.14, 1.45, "cream");
  box(kitchen, -1.2, 1.34, 0, 0.8, 0.025, 0.85, "black");
  for (const x of [-1.4, -1])
    for (const z of [-0.22, 0.22]) cylinder(kitchen, x, 1.36, z, 0.13, 0.02, "brass");
  cylinder(kitchen, -1.16, 1.54, -0.15, 0.25, 0.34, "copper");
  cylinder(kitchen, -1.16, 1.73, -0.15, 0.28, 0.05, "copper");
  ball(kitchen, -1.16, 1.79, -0.15, 0.065, 0.05, 0.065, "darkWood");
  rod(kitchen, [-0.92, 1.62, -0.15], [-0.66, 1.62, -0.15], 0.04, "darkWood");
  box(kitchen, 0.1, 1.34, 0, 0.85, 0.025, 0.68, "glass");
  rod(kitchen, [0.1, 1.34, -0.4], [0.1, 1.73, -0.4], 0.035, "brass");
  rod(kitchen, [0.1, 1.73, -0.4], [0.1, 1.73, -0.12], 0.035, "brass");
  plant(kitchen, 1.35, 1.34, -0.25, 0.32);
  mug(kitchen, 1.05, 1.34, 0.25, "paper");
  // Narrow freestanding preparation island leaves the center route open.
  table(kitchen, 0, 0, 2.1, 2.6, 0.9, 1.2, "wood");
  box(kitchen, 0.12, 1.28, 2.13, 0.8, 0.035, 0.6, "paper");
  const examTitle = label(kitchen, "EXAMINATION", 0.12, 1.302, 2.05, 0.68, 0.16);
  if (examTitle) examTitle.rotation.x = -Math.PI / 2;
  for (let i = 0; i < 3; i++) {
    box(kitchen, 0.12, 1.305, 2.14 + i * 0.075, 0.45, 0.006, 0.009, "paleWood");
    cylinder(kitchen, -0.15, 1.308, 2.14 + i * 0.075, 0.016, 0.006, "olive");
  }
  const examTablet = new THREE.Group();
  examTablet.position.set(0.75, 1.3, 2.15);
  examTablet.rotation.set(-0.28, -0.2, 0);
  kitchen.add(examTablet);
  box(examTablet, 0, 0.45, 0, 0.62, 0.86, 0.065, "blue");
  box(examTablet, 0, 0.46, 0.04, 0.54, 0.72, 0.012, "paper");
  label(examTablet, "POST EXAM", 0, 0.72, 0.052, 0.49, 0.11);
  for (let i = 0; i < 4; i++)
    box(
      examTablet,
      -0.17 + i * 0.11,
      0.28 + i * 0.035,
      0.053,
      0.06,
      0.12 + i * 0.07,
      0.012,
      i % 2 ? "olive" : "blueLight",
    );
  label(examTablet, "ANALYSIS", 0, 0.18, 0.052, 0.49, 0.1);
  cylinder(kitchen, -0.8, 1.35, 2.12, 0.24, 0.18, "cream");
  for (const [x, z] of [
    [-0.9, 2.06],
    [-0.7, 2.08],
    [-0.8, 2.22],
  ])
    ball(kitchen, x!, 1.48, z!, 0.095, 0.1, 0.095, "coral");
  // Hanging copper utensils anchored to the rear-facing end of the kitchen.
  rod(group, [6.8, 2.85, -1.8], [8.5, 2.85, -1.8], 0.035, "brass");
  for (const x of [7.1, 7.7, 8.3]) {
    rod(group, [x, 2.84, -1.8], [x, 2.5, -1.8], 0.025, "darkWood");
    const pan = cylinder(group, x, 2.28, -1.8, 0.23, 0.08, "copper");
    pan.rotation.x = Math.PI / 2;
  }

  // READING NOOK — seven authored volumes, each a readable physical object.
  const courseHotspots: Record<string, THREE.Vector3> = {};
  const display = local("The learning collection", -5.5, 0.15, -6.3);
  // Open walnut ledges leave the room light and the independent score visible.
  for (const x of [-2.55, 2.55]) box(display, x, 0.5, 0, 0.12, 1, 0.7, "wood");
  box(display, 0, 0.8, 0, 5.9, 0.12, 1.15, "paleWood");
  box(display, -0.2, 2.4, -0.22, 5.3, 0.1, 0.8, "wood");
  for (const x of [-2.4, 2]) {
    rod(display, [x, 1.95, -0.45], [x, 2.36, 0.05], 0.035, "brass");
  }

  function courseCover(course: Course, index: number) {
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = course.color;
    ctx.fillRect(0, 0, 768, 1024);
    // Subtle woven cloth and a gold tooling rule: this is a book, not a UI card.
    ctx.strokeStyle = "#ffffff08";
    ctx.lineWidth = 1;
    for (let x = 0; x < 768; x += 5) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y < 1024; y += 5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(768, y);
      ctx.stroke();
    }
    ctx.strokeStyle = "#e4c991";
    ctx.lineWidth = 3;
    ctx.strokeRect(42, 42, 684, 940);
    ctx.fillStyle = "#e4c991";
    ctx.font = "24px monospace";
    ctx.fillText(`YONAS / STUDY NOTES 0${index + 1}`, 76, 105);
    ctx.fillStyle = "#fff4db";
    ctx.font = "bold 58px Georgia";
    let line = "";
    let ty = 205;
    for (const word of course.shortTitle.split(" ")) {
      if (ctx.measureText(`${line} ${word}`).width > 610 && line) {
        ctx.fillText(line, 76, ty);
        ty += 70;
        line = word;
      } else line = line ? `${line} ${word}` : word;
    }
    ctx.fillText(line, 76, ty);
    ctx.strokeStyle = "#e4c991";
    ctx.fillStyle = "#e4c991";
    ctx.lineWidth = 4;
    const dot = (x: number, y: number, r = 8) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };
    const lineTo = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };
    if (index === 0) {
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < 6; i++) {
        lineTo(130 + i * 90, 490, 130 + i * 90, 850);
        lineTo(130, 490 + i * 72, 580, 490 + i * 72);
      }
      ctx.globalAlpha = 1;
      lineTo(210, 790, 575, 610);
      lineTo(210, 790, 380, 480);
      lineTo(575, 610, 538, 610);
      lineTo(575, 610, 554, 647);
      lineTo(380, 480, 345, 512);
      lineTo(380, 480, 384, 525);
      ctx.font = "italic 38px Georgia";
      ctx.fillText("v", 590, 615);
      ctx.fillText("u", 386, 477);
    } else if (index === 1) {
      const nodes = [
        [175, 570],
        [175, 710],
        [175, 850],
        [380, 510],
        [380, 650],
        [380, 790],
        [585, 610],
        [585, 750],
      ];
      ctx.globalAlpha = 0.5;
      for (const a of nodes.slice(0, 3))
        for (const b of nodes.slice(3, 6)) lineTo(a[0]!, a[1]!, b[0]!, b[1]!);
      for (const a of nodes.slice(3, 6))
        for (const b of nodes.slice(6)) lineTo(a[0]!, a[1]!, b[0]!, b[1]!);
      ctx.globalAlpha = 1;
      nodes.forEach(([x, y]) => dot(x!, y!, 19));
    } else if (index === 2) {
      ctx.font = "36px Georgia";
      ctx.fillText("language", 118, 562);
      ctx.fillText("meaning", 400, 682);
      ctx.fillText("context", 200, 812);
      lineTo(180, 590, 450, 634);
      lineTo(450, 709, 290, 764);
      lineTo(300, 774, 180, 590);
      dot(180, 590);
      dot(450, 709);
      dot(300, 774);
      ctx.font = "italic 28px Georgia";
      ctx.fillText("words → representations", 120, 906);
    } else if (index === 3) {
      lineTo(110, 827, 640, 827);
      lineTo(110, 827, 110, 490);
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const x = 120 + i * 5;
        const y = 824 - 300 * Math.exp(-Math.pow((i - 50) / 22, 2) / 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.font = "italic 35px Georgia";
      ctx.fillText("μ", 365, 887);
      ctx.fillText("σ", 485, 700);
    } else if (index === 4) {
      lineTo(130, 850, 630, 850);
      lineTo(130, 850, 130, 480);
      lineTo(150, 810, 610, 525);
      for (let i = 0; i < 13; i++) dot(165 + i * 33, 810 - i * 20 + Math.sin(i * 2.4) * 48, 8);
      ctx.font = "italic 32px Georgia";
      ctx.fillText("learn from examples", 150, 920);
    } else if (index === 5) {
      for (let i = 0; i < 6; i++) {
        const h = 65 + ((i * 7) % 5) * 41;
        ctx.fillRect(130 + i * 80, 810 - h, 48, h);
      }
      lineTo(120, 830, 635, 830);
      ctx.font = "italic 31px Georgia";
      ctx.fillText("look closer at the data", 132, 905);
    } else {
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.ellipse(385, 690, 55 + i * 45, 35 + i * 30, -0.4, 0, Math.PI * 2);
        ctx.stroke();
      }
      lineTo(170, 540, 270, 740);
      lineTo(270, 740, 340, 640);
      lineTo(340, 640, 380, 685);
      dot(170, 540);
      dot(270, 740);
      dot(340, 640);
      dot(380, 685, 12);
      ctx.font = "italic 32px Georgia";
      ctx.fillText("follow the gradient", 180, 922);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.84 });
  }

  const roundedBook = new RoundedBoxGeometry(1, 1, 1, 3, 0.035);
  courses.forEach((course, index) => {
    const upper = index >= 4;
    const x = upper ? -7.15 + (index - 4) * 1.5 : -7.65 + index * 1.43;
    const y = upper ? 2.62 : 1.02;
    const z = upper ? -6.52 : -6.22;
    const volume = local(
      course.title,
      x,
      y,
      z,
      [-0.12, 0.08, -0.08, 0.14, 0.08, -0.06, 0.12][index] ?? 0,
    );
    volume.userData.inspect = course.id;
    volume.rotation.z = index === 1 ? -0.045 : index === 5 ? 0.035 : 0;
    const cloth = new THREE.MeshStandardMaterial({ color: course.color, roughness: 0.95 });
    const pageBlock = new THREE.Mesh(roundedBook, materials.paper);
    pageBlock.position.set(0.025, 0.64, 0);
    pageBlock.scale.set(0.91, 1.25, 0.25);
    pageBlock.castShadow = true;
    volume.add(pageBlock);
    for (const side of [-1, 1]) {
      const cover = new THREE.Mesh(roundedBook, cloth);
      cover.position.set(0, 0.64, side * 0.16);
      cover.scale.set(1.02, 1.36, 0.065);
      cover.castShadow = true;
      volume.add(cover);
    }
    const spine = cylinder(volume, -0.48, 0.64, 0, 0.17, 1.35, cloth);
    spine.scale.x = 0.13;
    spine.scale.z = 0.17;
    // Rounded binding, gold headbands and fine individual page edges.
    for (const yy of [0.045, 1.235]) box(volume, -0.45, yy, 0.005, 0.13, 0.025, 0.28, "brass");
    for (let edge = 0; edge < 10; edge++)
      box(volume, 0.487, 0.12 + edge * 0.11, 0, 0.008, 0.005, 0.24, "plasterShadow");
    const coverArt = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 1.3), courseCover(course, index));
    coverArt.position.set(0, 0.64, 0.196);
    volume.add(coverArt);
    box(volume, 0.27, -0.065, -0.02, 0.055, 0.22, 0.01, index % 2 ? "roof" : "blue");
    // An angled brass stand presents the volume as something visitors can pick up.
    rod(volume, [-0.4, 0, 0.29], [0.4, 0, 0.29], 0.025, "brass");
    rod(volume, [0, 0, -0.3], [0, 0.65, -0.2], 0.025, "brass");
    courseHotspots[course.id] = new THREE.Vector3(x, y + 0.7, z + 0.23);
  });
  label(display, "A FEW THINGS I'VE STUDIED", -0.2, 3.96, -0.1, 4.1, 0.3);

  // Meaningful sculptural companions on the ledge: a vector frame and tiny network.
  const vectors = local("Basis vectors", -8.08, 1.03, -5.98);
  vectors.userData.inspect = "course-linear-algebra";
  rod(vectors, [0, 0, 0], [0, 0.63, 0], 0.018, "brass");
  rod(vectors, [0, 0, 0], [0.42, 0.18, 0], 0.018, "blue");
  rod(vectors, [0, 0, 0], [0, 0.1, 0.35], 0.018, "roof");
  const certificate = local("Certificate folio", -7.5, 1.1, -4.6, 0.3);
  certificate.userData.inspect = "credentials";
  table(certificate, 0, -1.1, 0, 1.4, 0.8, 1, "wood");
  box(certificate, 0, 0, 0, 1.04, 0.055, 0.67, "blue");
  const certificatePage = label(certificate, "COURSE CERTIFICATES", 0, 0.04, 0, 0.94, 0.59);
  if (certificatePage) certificatePage.rotation.x = -Math.PI / 2;
  cylinder(certificate, 0.29, 0.05, 0.16, 0.075, 0.012, "brass");
  plant(group, -8, 0.15, 1, 1.2);

  // LeetCode is a freestanding illuminated record, never buried behind a shelf.
  const practice = local("LeetCode problem-solving record", -0.9, 0.15, -5.7, 0.14);
  practice.userData.inspect = "practice";
  box(practice, 0, 0.06, 0, 1.55, 0.12, 0.8, "darkWood");
  cylinder(practice, 0, 0.79, 0, 0.065, 1.5, "brass");
  box(practice, 0, 2.02, 0, 2.65, 2.0, 0.12, "darkWood");
  box(practice, 0, 2.02, 0.065, 2.5, 1.85, 0.045, "brass");
  const scoreCanvas = document.createElement("canvas");
  scoreCanvas.width = 1200;
  scoreCanvas.height = 880;
  const score = scoreCanvas.getContext("2d")!;
  score.fillStyle = "#203b35";
  score.fillRect(0, 0, 1200, 880);
  score.strokeStyle = "#ccb582";
  score.lineWidth = 3;
  score.strokeRect(25, 25, 1150, 830);
  score.fillStyle = "#edc779";
  score.font = "600 74px Georgia";
  score.fillText("LeetCode", 70, 130);
  score.fillStyle = "#fff2ce";
  score.font = "bold 232px Georgia";
  score.fillText(String(codingProfile.totalSolved), 65, 390);
  score.font = "38px sans-serif";
  score.fillText(`/ ${codingProfile.totalAvailable.toLocaleString()} solved`, 490, 340);
  score.fillStyle = "#b7c8a9";
  score.font = "28px sans-serif";
  score.fillText("A practice in clear thinking", 75, 450);
  const statColors = ["#a6d6b5", "#ebc276", "#e6a58e"];
  codingProfile.difficulty.forEach((item, index) => {
    const x = 75 + index * 365;
    score.fillStyle = statColors[index]!;
    score.font = "bold 71px Georgia";
    score.fillText(String(item.solved), x, 587);
    score.font = "32px sans-serif";
    score.fillText(item.label, x, 640);
    score.fillStyle = "#c9d1bf";
    score.font = "25px sans-serif";
    score.fillText(`of ${item.available.toLocaleString()}`, x, 683);
  });
  score.fillStyle = "#edc779";
  score.font = "29px sans-serif";
  score.fillText(`${codingProfile.attempting} attempting`, 75, 775);
  score.fillStyle = "#c9d1bf";
  score.font = "25px sans-serif";
  score.fillText(codingProfile.capturedAt, 700, 775);
  const scoreTexture = new THREE.CanvasTexture(scoreCanvas);
  scoreTexture.colorSpace = THREE.SRGBColorSpace;
  const scoreFace = new THREE.Mesh(
    new THREE.PlaneGeometry(2.38, 1.745),
    new THREE.MeshStandardMaterial({
      map: scoreTexture,
      emissiveMap: scoreTexture,
      emissive: 0xffffff,
      emissiveIntensity: 0.32,
      roughness: 0.6,
    }),
  );
  scoreFace.position.set(0, 2.02, 0.095);
  practice.add(scoreFace);

  // LEARNING GARDEN — beds, stepping stones, trellis and flowers.
  const garden = local("Garden", -5.5, 0, 7.1);
  garden.userData.inspect = "learning";
  box(garden, 0, 0.18, 0, 4.7, 0.34, 2.7, "wood");
  box(garden, 0, 0.36, 0, 4.45, 0.03, 2.45, "earth");
  for (const x of [-1.7, -0.6, 0.6, 1.7])
    for (const z of [-0.65, 0.55]) {
      for (let i = 0; i < 3; i++) {
        const s = 0.13 + i * 0.09;
        ball(
          garden,
          x + Math.cos(i * 2.5) * 0.16,
          0.48 + i * 0.13,
          z + Math.sin(i * 2.5) * 0.13,
          s,
          0.14,
          s,
          i % 2 ? "oliveLight" : "olive",
        );
      }
      rod(garden, [x, 0.45, z], [x, 1.08, z], 0.025, "oliveDark");
      ball(garden, x, 1.06, z, 0.12, 0.1, 0.12, x < 0 ? "coral" : "paper");
      cylinder(garden, x, 1.14, z, 0.045, 0.025, "brass");
    }
  for (const x of [-2.2, 2.2]) box(garden, x, 1.35, -1.45, 0.1, 2.7, 0.1, "paleWood");
  for (let i = 0; i < 5; i++) box(garden, -1.8 + i * 0.9, 1.35, -1.45, 0.05, 2.6, 0.06, "paleWood");
  for (let i = 0; i < 6; i++) box(garden, 0, 0.3 + i * 0.45, -1.45, 4.6, 0.065, 0.08, "paleWood");
  for (let i = 0; i < 8; i++) {
    const x = Math.sin(i * 0.9) * 0.6 + 1.2;
    const y = 0.45 + i * 0.28;
    ball(garden, x, y, -1.36, 0.27, 0.13, 0.1, i % 2 ? "oliveLight" : "olive").rotation.z =
      i % 2 ? 0.5 : -0.5;
  }
  for (let i = 0; i < 4; i++) {
    const stone = cylinder(group, -2.4 - i * 1.15, 0.035, 8.8, 0.4, 0.07, "cream");
    stone.scale.z *= 0.68;
  }
  plant(garden, -2.7, 0, 1.25, 0.7, true);
  plant(garden, 2.7, 0, 1.25, 0.8, true);
  label(garden, "ALWAYS GROWING", 0, 2.72, -1.4, 2.1, 0.33, "#b9986a", "#344234");

  // VERANDA — striped rug, woven chairs, table and a blue coffee mug.
  const veranda = local("Veranda", 4.9, 0.04, 6.8);
  veranda.userData.inspect = "contact";
  box(veranda, 0, 0.01, 0, 4.8, 0.04, 3.2, "cream");
  for (let i = 0; i < 8; i++)
    box(veranda, -2.05 + i * 0.59, 0.035, 0, 0.12, 0.005, 3.1, "oliveLight");
  table(veranda, 0, 0, 0, 1.3, 1.1, 0.74, "paleWood");
  mug(veranda, -0.2, 0.81, -0.1);
  book(veranda, 0.23, 0.84, 0.15, 0.42, 0.04, 0.53, "paper");
  for (const side of [-1, 1]) {
    const chair = new THREE.Group();
    chair.position.set(side * 1.5, 0, 0);
    chair.rotation.y = (side * -Math.PI) / 2;
    veranda.add(chair);
    for (const x of [-0.42, 0.42])
      for (const z of [-0.4, 0.4]) box(chair, x, 0.35, z, 0.07, 0.7, 0.07, "wood");
    box(chair, 0, 0.69, 0, 0.94, 0.1, 0.9, "paleWood");
    box(chair, 0, 0.79, 0, 0.85, 0.14, 0.82, "paper");
    for (const x of [-0.43, 0.43]) box(chair, x, 1.07, -0.38, 0.07, 0.88, 0.07, "wood");
    for (let i = 0; i < 5; i++) box(chair, 0, 0.88 + i * 0.13, -0.4, 0.9, 0.06, 0.06, "paleWood");
  }
  plant(veranda, 2.6, 0, -1.1, 0.85, true);
  plant(veranda, -2.6, 0, -1.1, 0.75);

  // The blue gate rotates from its left hinge, independently of the garden wall.
  for (const side of [-1, 1]) {
    box(group, side * 5.9, 0.65, 10, 8.1, 1.3, 0.33, "plaster");
    box(group, side * 5.9, 1.32, 10, 8.2, 0.13, 0.46, "cream");
    box(group, side * 1.85, 1.05, 10, 0.48, 2.1, 0.52, "plasterShadow");
    box(group, side * 1.85, 2.13, 10, 0.64, 0.16, 0.67, "cream");
    box(group, side * 1.85, 2.42, 10, 0.25, 0.43, 0.25, windowMaterial);
    const cap = new THREE.Mesh(coneGeometry, materials.oliveDark);
    cap.position.set(side * 1.85, 2.7, 10);
    cap.scale.set(0.24, 0.2, 0.24);
    group.add(cap);
    plant(group, side * 2.6, 0, 10.65, 0.65, true);
  }
  const gate = new THREE.Group();
  gate.name = "Cobalt gate hinge";
  gate.position.set(-1.57, 0, 10);
  group.add(gate);
  for (const y of [0.25, 0.75, 1.65]) box(gate, 1.57, y, 0, 3.14, 0.075, 0.075, "blue");
  for (let i = 0; i < 12; i++) {
    const x = (i * 3.14) / 11;
    const height = 1.8 + Math.sin((i / 11) * Math.PI) * 0.23;
    box(gate, x, height / 2 + 0.12, 0, 0.045, height, 0.045, "blue");
    ball(gate, x, height + 0.15, 0, 0.065, 0.08, 0.065, "blueLight");
  }
  box(gate, 2.8, 1.05, 0.08, 0.25, 0.06, 0.1, "brass");
  label(gate, "YONAS", 1.57, 1.25, 0.06, 1.05, 0.34, "#365c9a", "#f7e8c8");

  // Two trees and soft bushes frame the house with a memorable silhouette.
  function tree(x: number, z: number, scale: number) {
    const trunk = local("Courtyard tree", x, 0, z);
    cylinder(trunk, 0, 1.5 * scale, 0, 0.15 * scale, 3 * scale, "wood");
    rod(trunk, [0, 1.5 * scale, 0], [-0.6 * scale, 2.8 * scale, 0.2], 0.08 * scale, "wood");
    rod(trunk, [0, 1.9 * scale, 0], [0.65 * scale, 3 * scale, -0.2], 0.08 * scale, "wood");
    for (let i = 0; i < 7; i++) {
      const angle = i * 2.4;
      ball(
        trunk,
        Math.sin(angle) * 0.65 * scale,
        (3.1 + (i % 3) * 0.43) * scale,
        Math.cos(angle) * 0.6 * scale,
        (0.8 + (i % 2) * 0.2) * scale,
        0.85 * scale,
        0.85 * scale,
        i % 3 === 0 ? "oliveLight" : "olive",
      );
    }
    cylinder(trunk, 0, 0.04, 0, 0.85 * scale, 0.07, "earth");
  }
  tree(-10.7, 0.5, 1.2);
  tree(10.8, -4.5, 1.3);
  for (const x of [-10.7, 10.7])
    for (let i = 0; i < 3; i++)
      ball(
        group,
        x + Math.sin(i * 2) * 0.35,
        0.45,
        7 + i * 0.6,
        0.65,
        0.6,
        0.7,
        i % 2 ? "oliveLight" : "olive",
      );
  // A mailbox beside the threshold, a welcome mat just inside.
  cylinder(group, -3.4, 0.75, 10.7, 0.055, 1.5, "wood");
  box(group, -3.4, 1.55, 10.7, 0.55, 0.38, 0.75, "blue");
  box(group, -3.4, 1.59, 11.08, 0.32, 0.035, 0.018, "black");
  box(group, 0, 0.17, 2.4, 2.15, 0.035, 0.75, "olive");

  // Local pools of warm light make the house inhabitable after sunset. These
  // lamps never cast additional shadow maps; the controller owns day/evening.
  const eveningLights: THREE.PointLight[] = [];
  const bulbMaterial = new THREE.MeshStandardMaterial({
    color: "#ffe3a6",
    emissive: "#ffc976",
    emissiveIntensity: 1.5,
    roughness: 0.5,
  });
  for (const fixture of [
    { x: -5.2, z: -4.7, y: 3.65, power: 22, reach: 8 },
    { x: 4.6, z: -3.5, y: 3.35, power: 20, reach: 8 },
    { x: 5.7, z: 0.2, y: 3.35, power: 18, reach: 7 },
  ]) {
    rod(
      group,
      [fixture.x, 4.0, fixture.z],
      [fixture.x, fixture.y + 0.15, fixture.z],
      0.015,
      "darkWood",
    );
    const shade = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.4, 0.35, 16, 1, true),
      materials.brass,
    );
    shade.position.set(fixture.x, fixture.y + 0.12, fixture.z);
    group.add(shade);
    ball(group, fixture.x, fixture.y - 0.03, fixture.z, 0.13, 0.13, 0.13, bulbMaterial);
    const light = new THREE.PointLight("#ffd294", fixture.power, fixture.reach, 2);
    light.position.set(fixture.x, fixture.y - 0.12, fixture.z);
    light.castShadow = false;
    light.userData.eveningIntensity = fixture.power;
    group.add(light);
    eveningLights.push(light);
  }
  for (const fixture of [
    { x: -7, z: -1.5, y: 2.25, power: 12, reach: 6 },
    { x: 0, z: 9.4, y: 2.4, power: 14, reach: 7 },
    { x: 4.9, z: 6.8, y: 2.6, power: 10, reach: 6 },
  ]) {
    const light = new THREE.PointLight("#ffce92", fixture.power, fixture.reach, 2);
    light.position.set(fixture.x, fixture.y, fixture.z);
    light.castShadow = false;
    light.userData.eveningIntensity = fixture.power;
    group.add(light);
    eveningLights.push(light);
  }

  const targets = {
    welcome: new THREE.Vector3(0, 1, 2),
    main: new THREE.Vector3(-4, 1.1, -1),
    workshop: new THREE.Vector3(4, 1.2, -3),
    kitchen: new THREE.Vector3(5, 1.2, 0),
    reading: new THREE.Vector3(-5, 1.4, -5),
    garden: new THREE.Vector3(-5, 0.8, 7),
    veranda: new THREE.Vector3(4, 1, 7),
  };

  const hotspots = {
    about: new THREE.Vector3(-7.1, 2.3, 0.87),
    principles: new THREE.Vector3(-5, 1.05, 0.75),
    nexora: new THREE.Vector3(4.6, 2.2, -4.92),
    mm2: new THREE.Vector3(7.35, 2.45, -6.48),
    zikuala: new THREE.Vector3(6.25, 1.95, -4.5),
    recipe: new THREE.Vector3(4.8, 1.65, 0),
    credentials: new THREE.Vector3(-7.5, 1.35, -4.6),
    practice: new THREE.Vector3(-0.9, 2.25, -5.55),
    learning: new THREE.Vector3(-5.5, 1.2, 7.1),
    contact: new THREE.Vector3(4.9, 1.2, 6.8),
    ...courseHotspots,
  };

  // Physical footprints before the controller adds the visitor's body radius.
  const collisions: Array<{ minX: number; maxX: number; minZ: number; maxZ: number }> = [
    { minX: -9.2, maxX: -8.7, minZ: -7.2, maxZ: 3.2 },
    { minX: 8.7, maxX: 9.2, minZ: -7.2, maxZ: 3.2 },
    { minX: -9.2, maxX: 9.2, minZ: -7.2, maxZ: -6.8 },
    { minX: -9.2, maxX: -1.65, minZ: 2.8, maxZ: 3.2 },
    { minX: 1.65, maxX: 9.2, minZ: 2.8, maxZ: 3.2 },
    { minX: -7.8, maxX: -6.4, minZ: 0.1, maxZ: 1.3 },
    { minX: -6.5, maxX: -3.1, minZ: -1.8, maxZ: -0.35 },
    { minX: -5.85, maxX: -3.75, minZ: 0.17, maxZ: 1.33 },
    { minX: -6.7, maxX: -5.1, minZ: -2.95, maxZ: -2.05 },
    { minX: 2.25, maxX: 6.95, minZ: -5.45, maxZ: -3.75 },
    { minX: 4.15, maxX: 5.05, minZ: -3.55, maxZ: -2.75 },
    { minX: 6.15, maxX: 7.65, minZ: -2.0, maxZ: 2.0 },
    { minX: 4.3, maxX: 5.3, minZ: -1.35, maxZ: 1.35 },
    { minX: -8.5, maxX: -2.5, minZ: -6.9, maxZ: -5.72 },
    { minX: -2.26, maxX: 0.46, minZ: -6, maxZ: -5.4 },
    { minX: -8.2, maxX: -6.8, minZ: -5.05, maxZ: -4.15 },
    { minX: -7.9, maxX: -3.1, minZ: 5.7, maxZ: 8.5 },
    { minX: 4.2, maxX: 5.6, minZ: 6.2, maxZ: 7.4 },
    { minX: 2.85, maxX: 3.95, minZ: 6.2, maxZ: 7.4 },
    { minX: 5.85, maxX: 6.95, minZ: 6.2, maxZ: 7.4 },
    { minX: -10.9, maxX: -10.5, minZ: 0.25, maxZ: 0.75 },
    { minX: 10.5, maxX: 11.1, minZ: -4.8, maxZ: -4.2 },
    { minX: -10, maxX: -1.6, minZ: 9.75, maxZ: 10.25 },
    { minX: 1.6, maxX: 10, minZ: 9.75, maxZ: 10.25 },
  ];

  // Repeated furniture pieces share one draw call per geometry, material and
  // inspection target. The moving gate and lift-away roof retain local transforms.
  function batchPrimitives(anchor: THREE.Group) {
    group.updateMatrixWorld(true);
    const batches = new Map<
      string,
      {
        geometry: THREE.BufferGeometry;
        material: THREE.Material;
        inspect: string;
        meshes: THREE.Mesh[];
      }
    >();
    const inverseAnchor = anchor.matrixWorld.clone().invert();
    const visit = (node: THREE.Object3D) => {
      if (node !== anchor && (node === gate || node === roof)) return;
      if (node instanceof THREE.Mesh && !Array.isArray(node.material)) {
        let ancestor: THREE.Object3D | null = node;
        let inspect = "";
        while (ancestor) {
          if (typeof ancestor.userData.inspect === "string") {
            inspect = ancestor.userData.inspect;
            break;
          }
          if (ancestor === anchor) break;
          ancestor = ancestor.parent;
        }
        const key = `${node.geometry.uuid}:${node.material.uuid}:${inspect}`;
        if (!batches.has(key))
          batches.set(key, {
            geometry: node.geometry,
            material: node.material,
            inspect,
            meshes: [],
          });
        batches.get(key)!.meshes.push(node);
      }
      node.children.forEach(visit);
    };
    visit(anchor);
    batches.forEach(({ geometry, material: meshMaterial, inspect, meshes }) => {
      if (meshes.length < 2) return;
      const instances = new THREE.InstancedMesh(geometry, meshMaterial, meshes.length);
      instances.name = inspect ? `${inspect} details` : "Architectural details";
      if (inspect) instances.userData.inspect = inspect;
      instances.castShadow = true;
      instances.receiveShadow = true;
      meshes.forEach((mesh, index) => {
        instances.setMatrixAt(
          index,
          new THREE.Matrix4().multiplyMatrices(inverseAnchor, mesh.matrixWorld),
        );
        mesh.removeFromParent();
      });
      instances.instanceMatrix.needsUpdate = true;
      instances.computeBoundingSphere();
      anchor.add(instances);
    });
  }
  batchPrimitives(group);
  batchPrimitives(roof);
  batchPrimitives(gate);

  return { group, gate, roof, targets, hotspots, collisions, eveningLights };
}
