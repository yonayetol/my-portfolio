import * as THREE from "three";
import { codingProfile } from "@/data/profile";
import { withBase } from "@/utils/paths";

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
  const portrait = local("Yonas's portrait", -5.9, 0.15, -2.35, 0.55);
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
  const dojo = new THREE.Group();
  dojo.name = "Machine learning practice books";
  dojo.userData.inspect = "dojo";
  workshop.add(dojo);
  book(dojo, 1.65, 1.35, 0.1, 0.63, 0.12, 0.8, "roof");
  book(dojo, 1.62, 1.49, 0.06, 0.57, 0.12, 0.72, "blue");
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
  box(kitchen, 0.15, 1.28, 2.1, 0.9, 0.03, 0.58, "paper");
  box(kitchen, 0.15, 1.3, 2.1, 0.018, 0.008, 0.55, "plasterShadow");
  for (let i = 0; i < 4; i++)
    box(kitchen, -0.1, 1.303, 1.94 + i * 0.09, 0.28, 0.006, 0.012, "wood");
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

  // READING NOOK — library shelves, certificates, a reading chair and dated score.
  const library = local("Reading nook", -5.5, 0.15, -6.5);
  library.userData.inspect = "credentials";
  for (const x of [-2.3, 2.3]) box(library, x, 1.55, 0, 0.16, 3.1, 0.55, "wood");
  box(library, 0, 1.55, -0.2, 4.6, 3.1, 0.08, "darkWood");
  const bookColors: Material[] = ["olive", "blue", "roof", "paper", "paleWood", "coral"];
  for (let shelf = 0; shelf < 4; shelf++) {
    const y = 0.22 + shelf * 0.76;
    box(library, 0, y, 0, 4.8, 0.12, 0.65, "wood");
    for (let i = 0; i < 11; i++) {
      const x = -2.05 + i * 0.38;
      const h = 0.36 + ((i * 7 + shelf * 3) % 5) * 0.045;
      book(
        library,
        x,
        y + h / 2 + 0.06,
        0.05,
        0.2 + (i % 2) * 0.08,
        h,
        0.38,
        bookColors[(i + shelf) % bookColors.length]!,
      );
      box(library, x, y + h * 0.4, 0.248, 0.13, 0.025, 0.008, "brass");
    }
  }
  box(library, 0, 3.15, 0, 4.8, 0.13, 0.7, "paleWood");
  label(library, "THE READING NOOK", 0, 3.48, -0.12, 2.8, 0.38);
  // A small diploma frame is deliberately decorative, without invented issuer text.
  box(group, -8.78, 2.6, -3.3, 0.08, 1.05, 0.85, "brass");
  box(group, -8.72, 2.6, -3.3, 0.02, 0.89, 0.69, "paper");
  const reading = local("Library chair", -6.1, 0.15, -3.8, 0.25);
  reading.userData.inspect = "credentials";
  box(reading, 0, 0.53, 0, 1.25, 0.28, 1.1, "coral");
  box(reading, 0, 1.03, -0.48, 1.25, 0.85, 0.23, "roof");
  for (const x of [-0.59, 0.59]) box(reading, x, 0.78, 0, 0.16, 0.4, 1.15, "roof");
  for (const x of [-0.48, 0.48])
    for (const z of [-0.4, 0.4]) box(reading, x, 0.21, z, 0.07, 0.42, 0.07, "wood");
  table(reading, 1.2, 0, 0.1, 0.65, 0.65, 0.6, "paleWood");
  book(reading, 1.2, 0.72, 0.1, 0.4, 0.11, 0.5, "blue");
  plant(group, -8, 0.15, 1, 1.2);
  const practice = local("Algorithm practice snapshot", -2.6, 1.65, -6.74);
  practice.userData.inspect = "practice";
  box(practice, 0, 0, 0, 1.5, 1.03, 0.12, "brass");
  label(practice, `${codingProfile.totalSolved} problems solved`, 0, 0.15, 0.075, 1.38, 0.52);
  label(practice, codingProfile.capturedAt, 0, -0.25, 0.075, 1.38, 0.25);

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
    about: new THREE.Vector3(-5.9, 2.3, -2.28),
    principles: new THREE.Vector3(-5, 1.05, 0.75),
    nexora: new THREE.Vector3(4.6, 2.2, -4.92),
    mm2: new THREE.Vector3(7.35, 2.45, -6.48),
    dojo: new THREE.Vector3(6.25, 1.8, -4.5),
    recipe: new THREE.Vector3(4.8, 1.65, 0),
    credentials: new THREE.Vector3(-5.5, 2.4, -6.1),
    practice: new THREE.Vector3(-2.6, 1.8, -6.6),
    learning: new THREE.Vector3(-5.5, 1.2, 7.1),
    contact: new THREE.Vector3(4.9, 1.2, 6.8),
  };

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

  return { group, gate, roof, targets, hotspots };
}
