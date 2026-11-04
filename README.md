# Yonas — A Home for a Mind That Builds

A personal portfolio for Yonas, an AI engineer, software builder, and technical trainer in Addis Ababa. The `feat/portfolio-home` redesign makes the homepage an interactive 3D courtyard home. Enter through the gate, move between rooms, and inspect objects to discover introductions, projects, work in progress, learning, credentials, and contact details.

Built with Astro, TypeScript, Three.js, locally served Space Grotesk and Space Mono fonts, semantic HTML, and CSS. The site produces static files for the existing GitHub Pages deployment.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:4321`. To inspect a production build:

```bash
npm run build
npm run preview
```

## Navigation and interactions

- `/` opens at the gate. **Come inside** moves the camera into the main room; the room navigation selects the workshop, kitchen, reading nook, garden, or veranda.
- Move the pointer to look around. The eye cursor highlights inspectable objects; click an object or its labeled hotspot to open its story. The **Objects in this room** list provides equivalent buttons.
- On touch devices, drag to look and tap an object to inspect it. With the canvas focused, use arrow keys to look around and **Home** to reset the view. Close stories with the close button or **Escape**.
- `/quick-view/` is the compact HTML overview. `/work/`, `/work/[slug]/`, `/about/`, and `/credentials/` remain direct routes to the detailed content.
- Daylight/evening and camera-motion controls persist preferences locally. Reduced motion disables animated camera movement.
- An SVG courtyard poster appears while the 3D view loads. An HTML overview remains available when JavaScript or WebGL is unavailable; essential information also lives on the direct routes.

## Editing the home

- `src/components/home/ImmersiveHome.astro` defines the scene interface, room links, object stories, and HTML fallback.
- `src/components/home/house-world.ts` constructs the Three.js house, garden, furnishings, textures, and inspectable objects.
- `src/components/home/house-experience.ts` handles rendering, camera transitions, raycasting, projected labels, input, history, and preferences.
- `src/styles/spatial.css` styles the immersive interface. `home.css` and `interiors.css` support the standard pages; `global.css` also supports retained technical exhibits and the credential viewer.
- `src/components/home/HouseScene.astro` supplies the SVG courtyard poster. `RoomIllustration.astro` retains the coordinated SVG room artwork.
- `src/data/profile.ts`, `projects.ts`, and `credentials.ts` hold shared public content. `CodingPractice.astro` renders the LeetCode snapshot from that data.
- `PORTFOLIO_HOME_AGENT_PROMPT.md` records the creative brief. `PORTFOLIO_PLAN.md` preserves the earlier design plan.

Keep room/object identifiers consistent between the interface, camera controller, and world. Keep essential text and actions in HTML, with equivalent buttons for canvas interactions. Reuse shared data so stories, case studies, and quick view remain consistent.

## Checks

```bash
npm run format:check
npm run check
npm run build
npm run validate
```

`npm run verify` runs formatting, Astro checks, the production build, and build validation. Validation checks local targets, required outputs, metadata landmarks, and unpublished contact patterns.

## Deployment paths

The default local build uses `/`. For the existing GitHub project page:

```bash
SITE_URL=https://yonayetol.github.io BASE_PATH=/my-portfolio npm run build
BASE_PATH=/my-portfolio npm run validate
```

The included GitHub Pages workflow applies the deployment values. Use `withBase` from `src/utils/paths.ts` for internal links and assets so both root and project-page builds work.

## Content and privacy

`PORTFOLIO_DATA.md` is the internal content source of truth. Keep private contact details out of public pages and assets. Preserve project status distinctions. The LeetCode totals reflect a shared screenshot, not a live feed; the earlier rank and badge metadata have a separate historical capture date. Do not infer a date for an undated snapshot or describe its totals as current activity.
