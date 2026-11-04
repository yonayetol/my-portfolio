import * as THREE from "three";
import { createHouseWorld } from "./house-world";

type Room = {
  name: string;
  title: string;
  description: string;
  position: number[];
  target: number[];
  objects: string[];
};
const rooms: Record<string, Room> = {
  "main-room": {
    name: "Main room",
    title: "Make yourself at home.",
    description: "The person behind the projects. A notebook full of questions.",
    position: [0.1, 2.4, 1.5],
    target: [-4, 1.15, -1],
    objects: ["about", "principles"],
  },
  workshop: {
    name: "Workshop",
    title: "Ideas with their sleeves rolled up.",
    description: "Real systems, careful decisions, and things made useful.",
    position: [5.3, 2.5, 1.4],
    target: [4, 1.2, -3],
    objects: ["nexora", "mm2", "dojo"],
  },
  kitchen: {
    name: "Kitchen",
    title: "A little something is cooking.",
    description: "Open the recipe to see the reasoning taking shape.",
    position: [2.4, 2.5, 2.5],
    target: [5, 1.2, 0],
    objects: ["recipe"],
  },
  "reading-nook": {
    name: "Reading nook",
    title: "One problem at a time.",
    description: "Practice, persistence, and a shelf of things learned.",
    position: [-1, 2.5, -1.7],
    target: [-5, 1.4, -5],
    objects: ["practice", "credentials"],
  },
  garden: {
    name: "Garden",
    title: "Good things take growing.",
    description: "Some ideas have roots. Others are reaching for the light.",
    position: [-1.8, 3.1, 8.8],
    target: [-5, 0.8, 7],
    objects: ["learning"],
  },
  contact: {
    name: "Veranda",
    title: "Pull up a chair.",
    description: "There’s always room for another good conversation.",
    position: [2.5, 2.8, 9.1],
    target: [4, 1, 7],
    objects: ["contact"],
  },
};
const objectTitles: Record<string, string> = {
  about: "Hey, I’m Yonas.",
  principles: "A few things I believe.",
  nexora: "Nexora IMS",
  mm2: "MM2 Pattern Miner",
  dojo: "ML Engineering Dojo",
  recipe: "What’s on the stove.",
  practice: "The practice notebook.",
  credentials: "A shelf of learning.",
  learning: "Ideas taking root.",
  contact: "Good things start here.",
};
const fallbackPoints: Record<string, number[]> = {
  about: [-4, 1.6, -1.8],
  principles: [-4, 0.9, 0.2],
  nexora: [4, 1.7, -3],
  mm2: [5.7, 1.4, -3],
  dojo: [2.4, 1, -3],
  recipe: [5, 1.5, 0],
  practice: [-4, 2.2, -6.5],
  credentials: [-6, 1.8, -6],
  learning: [-5, 1, 7],
  contact: [4, 1, 7],
};
const vector = (array: number[]) => new THREE.Vector3(array[0], array[1], array[2]);

export async function startHouse() {
  const root = document.documentElement;
  const host = document.querySelector<HTMLElement>(".spatial-home");
  const canvas = document.querySelector<HTMLCanvasElement>("[data-house-canvas]");
  const stage = document.querySelector<HTMLElement>("[data-spatial-stage]");
  if (!host || !canvas || !stage) return;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#eee8da");
  scene.fog = new THREE.Fog("#eee8da", 45, 105);
  const camera = new THREE.PerspectiveCamera(43, 1, 0.08, 140);
  const hemisphere = new THREE.HemisphereLight("#fff3dc", "#7c876b", 2.5);
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight("#ffedce", 3.7);
  sun.position.set(-12, 22, 13);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -22;
  sun.shadow.camera.right = 22;
  sun.shadow.camera.top = 22;
  sun.shadow.camera.bottom = -22;
  sun.shadow.normalBias = 0.04;
  scene.add(sun);
  const fill = new THREE.DirectionalLight("#dce8ed", 1.1);
  fill.position.set(15, 9, -5);
  scene.add(fill);
  const lamp = new THREE.PointLight("#ffd193", 0, 17, 2);
  lamp.position.set(0, 3, -1);
  scene.add(lamp);
  const world = createHouseWorld(() => {
    dirty = true;
  });
  scene.add(world.group);
  const points: Record<string, THREE.Vector3> = {};
  for (const [id, pos] of Object.entries(fallbackPoints)) points[id] = vector(pos);
  if ("hotspots" in world) Object.assign(points, world.hotspots);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const eye = document.querySelector<HTMLElement>(".digital-eye");
  const dialog = document.querySelector<HTMLDialogElement>("[data-story-dialog]")!;
  const currentPosition = new THREE.Vector3(22, 18, 28),
    currentTarget = new THREE.Vector3(0, 0, 1);
  const look = new THREE.Vector2(),
    wantedLook = new THREE.Vector2();
  let currentRoom = "",
    focused = "",
    transition: {
      start: number;
      duration: number;
      from: THREE.Vector3;
      to: THREE.Vector3;
      fromTarget: THREE.Vector3;
      toTarget: THREE.Vector3;
      entry: boolean;
    } | null = null;
  let dirty = true,
    rendered = false,
    dragging = false,
    dragMoved = false,
    dragStart = { x: 0, y: 0 },
    dragLook = { x: 0, y: 0 },
    opener: HTMLElement | null = null;
  const reduce = () =>
    root.dataset.motion === "off" || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = matchMedia("(pointer:coarse)").matches;
  if (touch) {
    const hint = document.querySelector("[data-look-hint]");
    if (hint) hint.innerHTML = "Drag to look.<br>Tap to discover.";
  }
  const setText = (selector: string, value: string) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  };
  const motionButton = document.querySelector<HTMLButtonElement>("[data-house-motion]");
  const lightButton = document.querySelector<HTMLButtonElement>("[data-house-light]");
  const syncPreferences = () => {
    const systemReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motionButton) {
      motionButton.disabled = systemReduced;
      motionButton.title = systemReduced ? "Your system requests reduced motion." : "";
    }
    const night = root.dataset.theme === "dark";
    root.style.colorScheme = night ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", night ? "#182823" : "#eee8da");
    scene.background = new THREE.Color(night ? "#182823" : "#eee8da");
    scene.fog = new THREE.Fog(night ? "#182823" : "#eee8da", 45, 105);
    hemisphere.intensity = night ? 1.2 : 2.5;
    sun.intensity = night ? 0.45 : 3.7;
    fill.intensity = night ? 0.4 : 1.1;
    lamp.intensity = night ? 35 : 0;
    sun.color.set(night ? "#a8beed" : "#ffedce");
    renderer.shadowMap.needsUpdate = true;
    renderer.toneMappingExposure = night ? 1.15 : 1.2;
    lightButton?.setAttribute("aria-pressed", String(night));
    lightButton?.setAttribute("aria-label", night ? "Switch to daylight" : "Switch to evening");
    setText("[data-light-label]", night ? "Evening" : "Daylight");
    motionButton?.setAttribute("aria-pressed", String(reduce()));
    motionButton?.setAttribute(
      "aria-label",
      reduce() ? "Enable camera motion" : "Pause camera motion",
    );
    setText(
      "[data-motion-label]",
      systemReduced ? "Reduced motion" : reduce() ? "Motion off" : "Motion on",
    );
    if (reduce()) {
      wantedLook.set(0, 0);
      look.set(0, 0);
      if (transition) {
        currentPosition.copy(transition.to);
        currentTarget.copy(transition.toTarget);
        transition = null;
        world.roof.visible = !currentRoom;
      }
    }
    dirty = true;
  };
  const persist = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  };
  motionButton?.addEventListener("click", () => {
    root.dataset.motion = root.dataset.motion === "off" ? "on" : "off";
    persist("home-motion", root.dataset.motion);
    syncPreferences();
  });
  lightButton?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    persist("home-evening", String(root.dataset.theme === "dark"));
    syncPreferences();
  });
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", syncPreferences);
  syncPreferences();
  function resize() {
    const rect = stage!.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.fov = currentRoom ? (rect.width < 700 ? 62 : 55) : 43;
    if (focused && innerWidth > 800)
      camera.setViewOffset(rect.width, rect.height, rect.width * 0.19, 0, rect.width, rect.height);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    dirty = true;
  }
  new ResizeObserver(resize).observe(stage);
  resize();
  function moveTo(position: THREE.Vector3, target: THREE.Vector3, entry = false) {
    wantedLook.set(0, 0);
    look.set(0, 0);
    if (reduce()) {
      currentPosition.copy(position);
      currentTarget.copy(target);
      transition = null;
      world.roof.visible = !currentRoom;
    } else
      transition = {
        start: performance.now(),
        duration: entry ? 1900 : focused ? 650 : 950,
        from: currentPosition.clone(),
        to: position,
        fromTarget: currentTarget.clone(),
        toTarget: target,
        entry,
      };
    dirty = true;
  }
  function navigate(id: string, push = true) {
    if (id && !rooms[id]) return;
    if (dialog.open) {
      focused = "";
      dialog.close();
    }
    const entry = !currentRoom && !!id;
    currentRoom = id;
    focused = "";
    host!.dataset.houseState = id ? "inside" : "outside";
    host!.dataset.room = id || "outside";
    world.roof.visible = entry && !reduce() ? true : !id;
    renderer.shadowMap.needsUpdate = true;
    if (push) {
      const hash = id ? `#${id}` : location.pathname;
      history.pushState({ room: id }, "", hash);
    }
    document
      .querySelectorAll<HTMLElement>("[data-room-object]")
      .forEach((el) => (el.hidden = el.dataset.roomObject !== id));
    document.querySelectorAll<HTMLAnchorElement>("[data-go-room]").forEach((a) => {
      if (a.dataset.goRoom === id) {
        a.setAttribute("aria-current", "location");
        const nav = a.parentElement;
        if (nav && nav.scrollWidth > nav.clientWidth)
          nav.scrollTo({
            left: a.offsetLeft - nav.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2,
            behavior: reduce() ? "instant" : "smooth",
          });
      } else a.removeAttribute("aria-current");
    });
    const room = rooms[id];
    setText("[data-current-room]", room ? `Inside / ${room.name}` : "At the garden gate");
    if (room) {
      setText("[data-room-title]", room.title);
      setText("[data-room-description]", room.description);
      setText(
        "[data-room-number]",
        `${String(Object.keys(rooms).indexOf(id) + 1).padStart(2, "0")} / ${room.name.toUpperCase()}`,
      );
      setText("[data-spatial-announcement]", `${room.name}. ${room.description}`);
      moveTo(vector(room.position), vector(room.target), entry);
    } else moveTo(new THREE.Vector3(22, 18, 28), new THREE.Vector3(0, 0, 1));
    document.querySelector<HTMLDetailsElement>(".spatial-object-list")?.removeAttribute("open");
    if (push) {
      if (id)
        document.querySelector<HTMLElement>("[data-room-title]")?.focus({ preventScroll: true });
      else
        document.querySelector<HTMLElement>("[data-enter-house]")?.focus({ preventScroll: true });
    }
    resize();
  }
  function inspect(id: string, source?: HTMLElement) {
    if (!currentRoom || !rooms[currentRoom]?.objects.includes(id)) return;
    opener = source || document.querySelector<HTMLElement>(`[data-hotspot="${id}"]`);
    focused = id;
    document
      .querySelectorAll<HTMLElement>("[data-story]")
      .forEach((el) => (el.hidden = el.dataset.story !== id));
    setText("[data-story-title]", objectTitles[id] || "Look a little closer.");
    setText("[data-story-location]", rooms[currentRoom]!.name.toUpperCase());
    const point = points[id];
    if (point) {
      const direction = currentPosition.clone().sub(point).normalize();
      const pos = point.clone().add(direction.multiplyScalar(innerWidth < 700 ? 4 : 3.4));
      pos.y = Math.max(1.7, pos.y);
      moveTo(pos, point);
    }
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    resize();
    host!.dataset.focused = id;
    host!.dataset.eye = "hidden";
  }
  dialog.addEventListener("close", () => {
    const wasFocused = !!focused;
    focused = "";
    delete host!.dataset.focused;
    if (wasFocused && rooms[currentRoom]) {
      moveTo(vector(rooms[currentRoom]!.position), vector(rooms[currentRoom]!.target));
      opener?.focus({ preventScroll: true });
    }
    resize();
  });
  document.querySelector("[data-story-close]")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
        dialog.close();
    }
  });
  document
    .querySelectorAll<HTMLElement>("[data-inspect]")
    .forEach((el) => el.addEventListener("click", () => inspect(el.dataset.inspect!, el)));
  document.querySelector("[data-enter-house]")?.addEventListener("click", (e) => {
    if (root.dataset.world !== "ready") return;
    e.preventDefault();
    navigate("main-room");
  });
  document.querySelector("[data-return-outside]")?.addEventListener("click", () => navigate(""));
  document.querySelectorAll<HTMLAnchorElement>("[data-go-room]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(a.dataset.goRoom!);
    }),
  );
  const readRoomHash = () => {
    try {
      return decodeURIComponent(location.hash.slice(1));
    } catch {
      return "";
    }
  };
  window.addEventListener("popstate", () => navigate(readRoomHash(), false));
  const emailLink = document.querySelector<HTMLAnchorElement>(".story-email");
  document.querySelector("[data-spatial-copy]")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailLink?.textContent || "");
      setText("[data-copy-result]", "Email copied. See you in the inbox!");
    } catch {
      setText("[data-copy-result]", "Select and copy the email address above.");
    }
  });
  function pickedObject(event: PointerEvent | MouseEvent) {
    const rect = canvas!.getBoundingClientRect();
    mouse.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      (-(event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(mouse, camera);
    const intersections = raycaster.intersectObject(world.group, true);
    for (const hit of intersections.slice(0, 1)) {
      let obj: THREE.Object3D | null = hit.object;
      while (obj) {
        if (
          typeof obj.userData.inspect === "string" &&
          rooms[currentRoom]?.objects.includes(obj.userData.inspect)
        )
          return obj.userData.inspect as string;
        obj = obj.parent;
      }
    }
    return "";
  }
  canvas.addEventListener("pointermove", (event) => {
    if (!currentRoom || focused) return;
    const rect = canvas.getBoundingClientRect();
    if (eye) {
      eye.style.left = `${event.clientX}px`;
      eye.style.top = `${event.clientY}px`;
    }
    host.dataset.eye = touch ? "hidden" : pickedObject(event) ? "focus" : "look";
    if (reduce()) return;
    if (event.pointerType === "touch") {
      if (!dragging) return;
      const dx = (event.clientX - dragStart.x) / rect.width,
        dy = (event.clientY - dragStart.y) / rect.height;
      if (Math.abs(dx) + Math.abs(dy) > 0.025) dragMoved = true;
      wantedLook.set(
        THREE.MathUtils.clamp(dragLook.x - dx * 2, -2, 2),
        THREE.MathUtils.clamp(dragLook.y + dy * 1.5, -0.6, 0.6),
      );
    } else
      wantedLook.set(
        (event.clientX / innerWidth - 0.5) * 1.5,
        (0.5 - event.clientY / innerHeight) * 0.7,
      );
    dirty = true;
  });
  canvas.addEventListener("pointerdown", (event) => {
    dragging = true;
    dragMoved = false;
    dragStart = { x: event.clientX, y: event.clientY };
    dragLook = { x: wantedLook.x, y: wantedLook.y };
    if (event.pointerType === "touch") canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointerup", () => {
    dragging = false;
  });
  canvas.addEventListener("pointercancel", () => {
    dragging = false;
  });
  canvas.addEventListener("pointerleave", () => {
    host.dataset.eye = "hidden";
    if (!touch) {
      wantedLook.set(0, 0);
      dirty = true;
    }
  });
  canvas.addEventListener("click", (event) => {
    if (dragMoved) return;
    const id = pickedObject(event);
    if (id) inspect(id, canvas);
  });
  canvas.addEventListener("keydown", (event) => {
    if (!currentRoom || reduce()) return;
    const delta = 0.18;
    if (event.key === "ArrowLeft") wantedLook.x -= delta;
    else if (event.key === "ArrowRight") wantedLook.x += delta;
    else if (event.key === "ArrowUp") wantedLook.y += delta;
    else if (event.key === "ArrowDown") wantedLook.y -= delta;
    else if (event.key === "Home") wantedLook.set(0, 0);
    else return;
    event.preventDefault();
    wantedLook.clamp(new THREE.Vector2(-1, -0.6), new THREE.Vector2(1, 0.6));
    dirty = true;
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) dirty = true;
  });
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    root.dataset.world = "unavailable";
    host!.dataset.houseState = "outside";
    canvas!.tabIndex = -1;
    if (dialog.open) dialog.close();
    document.querySelector("[data-enter-house]")?.setAttribute("href", "#inside");
    setText(
      "[data-house-loading]",
      "Your browser paused the 3D view. Explore the home in words below.",
    );
  });
  canvas.addEventListener("webglcontextrestored", () => location.reload());
  const labels = [...document.querySelectorAll<HTMLElement>("[data-hotspot]")];
  const projected = new THREE.Vector3();
  let gateAngle = 0,
    animationFrame = 0;
  function frame(time: number) {
    animationFrame = requestAnimationFrame(frame);
    if (document.hidden || root.dataset.world === "unavailable") return;
    if (transition) {
      const t = Math.min(1, (time - transition.start) / transition.duration);
      const eased = t * t * (3 - 2 * t);
      currentPosition.lerpVectors(transition.from, transition.to, eased);
      currentTarget.lerpVectors(transition.fromTarget, transition.toTarget, eased);
      if (transition.entry) {
        const path = new THREE.CatmullRomCurve3([
          transition.from,
          new THREE.Vector3(1, 4, 15),
          new THREE.Vector3(0, 2.5, 6),
          transition.to,
        ]);
        currentPosition.copy(path.getPoint(eased));
        if (world.roof.visible && t >= 0.35) renderer.shadowMap.needsUpdate = true;
        world.roof.visible = t < 0.35;
      }
      if (t === 1) transition = null;
      dirty = true;
    }
    const targetGate = currentRoom ? -Math.PI * 0.52 : 0;
    if (Math.abs(gateAngle - targetGate) > 0.005) {
      gateAngle = reduce() ? targetGate : THREE.MathUtils.lerp(gateAngle, targetGate, 0.08);
      world.gate.rotation.y = gateAngle;
      renderer.shadowMap.needsUpdate = true;
      dirty = true;
    }
    if (look.distanceTo(wantedLook) > 0.001) {
      look.lerp(wantedLook, 0.07);
      dirty = true;
    }
    if (!dirty) return;
    dirty = false;
    camera.position.copy(currentPosition);
    const target = currentTarget.clone();
    if (currentRoom && !focused && !transition) {
      const forward = target.clone().sub(currentPosition).normalize();
      const right = new THREE.Vector3()
        .crossVectors(forward, new THREE.Vector3(0, 1, 0))
        .normalize();
      target.addScaledVector(right, look.x * 1.3);
      target.y += look.y;
    }
    camera.lookAt(target);
    camera.updateMatrixWorld();
    renderer.render(scene, camera);
    if (!rendered) {
      rendered = true;
      root.dataset.world = "ready";
      canvas!.tabIndex = 0;
      setText("[data-house-loading]", "The door is open.");
    }
    const rect = canvas!.getBoundingClientRect();
    labels.forEach((label) => {
      if (focused) return;
      const id = label.dataset.hotspot!;
      const point = points[id];
      if (!point || !rooms[currentRoom]?.objects.includes(id)) {
        label.hidden = true;
        return;
      }
      projected.copy(point).project(camera);
      const x = (projected.x * 0.5 + 0.5) * rect.width + rect.left,
        y = (-projected.y * 0.5 + 0.5) * rect.height + rect.top;
      label.hidden =
        projected.z > 1 ||
        projected.z < -1 ||
        x < 30 ||
        x > innerWidth - 30 ||
        y < 95 ||
        y > innerHeight - 110;
      label.style.left = `${Math.min(innerWidth - 105, Math.max(65, x))}px`;
      label.style.top = `${y}px`;
    });
  }
  frame(performance.now());
  const initial = readRoomHash();
  if (rooms[initial]) navigate(initial, false);
  window.addEventListener("pageshow", () => {
    dirty = true;
  });
  window.addEventListener("pagehide", (event: PageTransitionEvent) => {
    if (event.persisted) return;
    cancelAnimationFrame(animationFrame);
    renderer.dispose();
  });
}
