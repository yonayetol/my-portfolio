export function initHome() {
  const root = document.documentElement;
  const evening = document.querySelector<HTMLButtonElement>("[data-evening]");
  const motion = document.querySelector<HTMLButtonElement>("[data-motion-toggle]");
  const save = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  };
  const sync = () => {
    const dark = root.dataset.theme === "dark";
    evening?.setAttribute("aria-pressed", String(dark));
    evening?.setAttribute("aria-label", dark ? "Switch to daylight" : "Switch to evening");
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#182522" : "#f6f2e9");
    const paused = root.dataset.motion === "off";
    motion?.setAttribute("aria-pressed", String(paused));
    if (motion) motion.textContent = paused ? "Motion paused" : "Pause motion";
  };
  sync();
  evening?.addEventListener("click", () => {
    const dark = root.dataset.theme !== "dark";
    root.dataset.theme = dark ? "dark" : "light";
    root.style.colorScheme = dark ? "dark" : "light";
    save("home-evening-v2", String(dark));
    sync();
  });
  motion?.addEventListener("click", () => {
    root.dataset.motion = root.dataset.motion === "off" ? "on" : "off";
    save("home-motion", root.dataset.motion);
    sync();
  });
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (event) => {
    if (event.matches) {
      root.dataset.motion = "off";
      sync();
    }
  });
  const map = document.querySelector<HTMLDialogElement>("[data-house-map]");
  let opener: HTMLElement | null = null;
  document.querySelectorAll<HTMLElement>("[data-map-open]").forEach((button) =>
    button.addEventListener("click", () => {
      opener = button;
      map?.showModal();
    }),
  );
  document.querySelector("[data-map-close]")?.addEventListener("click", () => map?.close());
  map?.addEventListener("click", (event) => {
    if (event.target === map) {
      const r = map.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        map.close();
    }
  });
  map?.addEventListener("close", () => opener?.focus());
  map?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => map.close()));
  document.querySelectorAll<HTMLButtonElement>("[data-copy-email]").forEach((button) =>
    button.addEventListener("click", async () => {
      const status = document.querySelector<HTMLElement>("[data-copy-status]");
      try {
        await navigator.clipboard.writeText(button.dataset.copyEmail || "");
        if (status) status.textContent = "Email address copied. See you in the inbox!";
      } catch {
        if (status) status.textContent = "Please select and copy the email address shown above.";
      }
    }),
  );
  const gardenButtons = document.querySelectorAll<HTMLButtonElement>("[data-garden-topic]");
  const gardenPanels = document.querySelectorAll<HTMLElement>("[data-garden-panel]");
  gardenButtons.forEach((button) =>
    button.addEventListener("click", () => {
      gardenButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      gardenPanels.forEach(
        (panel) => (panel.hidden = panel.dataset.gardenPanel !== button.dataset.gardenTopic),
      );
    }),
  );
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        el.dataset.inView = String(entry.isIntersecting);
        if (entry.isIntersecting && !el.dataset.seen) {
          el.dataset.seen = "true";
          if (root.dataset.motion !== "off")
            el.animate(
              [
                { opacity: 0.35, transform: "translateY(20px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" },
            );
        }
      }),
    { threshold: 0.12 },
  );
  document
    .querySelectorAll<HTMLElement>("[data-home-reveal]")
    .forEach((el) => observer.observe(el));
  document.addEventListener(
    "visibilitychange",
    () => (root.dataset.pageHidden = String(document.hidden)),
  );
}
