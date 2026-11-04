# Yonas — A Home for a Mind That Builds

A personal portfolio for Yonas, an AI engineer, software builder, technical trainer, and fourth-year Computer Science student at Addis Ababa University (AAU). The homepage presents the essentials first. Visitors can choose the interactive 3D courtyard at `/explore/`, enter through the gate, move between rooms, and inspect objects for projects, work in progress, learning, and personal stories. A visible Portfolio link returns to the overview.

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

- `/` opens the standard portfolio overview: introduction, projects, experience, and contact. The prominent **Explore in 3D** action enters the optional home experience at `/explore/`.
- `/quick-view/` remains an alias of the same overview with a canonical URL pointing to `/`. `/work/`, `/work/[slug]/`, `/about/`, and `/credentials/` remain direct routes to detailed content.
- `/explore/` opens at the gate. **Come inside** moves the camera into the main room; room navigation selects the workshop, kitchen, reading nook, garden, or veranda. Room links use `/explore/#main-room`, `/explore/#workshop`, `/explore/#kitchen`, `/explore/#reading-nook`, `/explore/#garden`, and `/explore/#contact`.
- The standard header and footer link to the **3D home**. The **3D house map** links directly to its rooms. Brand links and **Back to portfolio** return to `/`; **Say hello** goes to the standard overview’s `/#contact` section.
- Inside the 3D home, move the pointer to look around. The eye cursor highlights inspectable objects; click an object or its illustrated marker to open its story. Marker names appear on hover or keyboard focus; touch devices keep compact names visible. The **Objects in this room** list provides equivalent buttons.
- On touch devices in the 3D home, drag to look and tap an object to inspect it. With the canvas focused, use arrow keys to look around and **Home** to reset the view. Close stories with the close button or **Escape**.
- Evening is the default. Daylight and camera-motion choices persist locally. Reduced motion disables animated travel and continuous walking while room shortcuts and object lists remain usable.
- **Free explore** gives visitors direct movement: WASD to walk, arrows or Q/E to turn, and drag to look. Touch visitors use the thumb joystick and drag the scene. Furniture, walls, and property boundaries stop the camera; **Reset** returns to the main room. Opening a story pauses movement and returns to the same walking position when closed.
- Seven authored course books open interactive mathematics and ML notebooks. The same collection is available at `/credentials/#course-notebooks`. LeetCode has a lit physical display and an always-visible shortcut; the statistics remain the supplied snapshot.
- At `/explore/`, an SVG courtyard poster appears while the 3D view loads. An HTML fallback remains available when JavaScript or WebGL is unavailable; the standard portfolio at `/` and its direct content routes do not require the 3D experience.

## Editing the home

- `src/components/QuickOverview.astro` is the shared overview for `/` and `/quick-view/`. `src/pages/explore.astro` owns the separate 3D route.

- `src/components/home/ImmersiveHome.astro` defines the scene interface, room links, object stories, and HTML fallback.
- `src/components/home/house-world.ts` constructs the Three.js house, garden, furnishings, textures, and inspectable objects.
- `src/components/home/house-experience.ts` handles rendering, camera transitions, raycasting, projected labels, input, history, and preferences. `house-navigation.ts` supplies collision, safe-spawn, and property-boundary calculations.
- `src/styles/spatial.css` styles the immersive interface. `home.css` and `interiors.css` support the standard pages; `global.css` also supports retained technical exhibits and the credential viewer.
- `src/components/home/HouseScene.astro` supplies the SVG courtyard poster. `RoomIllustration.astro` retains the coordinated SVG room artwork.
- `src/data/profile.ts`, `projects.ts`, `credentials.ts`, and `courses.ts` hold shared public content. `CourseNotebook.astro` contains the seven interactive learning demonstrations. `CodingPractice.astro` renders the LeetCode snapshot from that data.
- `PORTFOLIO_HOME_AGENT_PROMPT.md` records the creative brief. `PORTFOLIO_PLAN.md` preserves the earlier design plan.

The current project collection contains Nexora IMS, MM2 Pattern Miner, Zikuala Management System, and Digital Examination & Analysis. The latter two remain explicitly in progress; frontend demonstrations are not deployment evidence.

Keep room/object identifiers consistent between the interface, camera controller, and world. Keep essential text and actions in HTML, with equivalent buttons for canvas interactions. Reuse shared data so stories, case studies, and quick view remain consistent.

## Checks

```bash
npm run format:check
npm run check
npm run test:navigation
npm run build
npm run validate
```

`npm run verify` runs formatting, walking-geometry tests, Astro checks, the production build, and build validation. Validation checks local targets, required outputs, metadata landmarks, and unpublished contact patterns.

## Deployment paths

The default local build uses `/`. For the existing GitHub project page:

```bash
SITE_URL=https://yonayetol.github.io BASE_PATH=/my-portfolio npm run build
BASE_PATH=/my-portfolio npm run validate
```

The included GitHub Pages workflow applies the deployment values. Use `withBase` from `src/utils/paths.ts` for internal links and assets so both root and project-page builds work.

## Content and privacy

`PORTFOLIO_DATA.md` is the internal content source of truth. Keep private contact details out of public pages and assets. Preserve project status distinctions. The LeetCode totals reflect a shared screenshot, not a live feed; the earlier rank and badge metadata have a separate historical capture date. Do not infer a date for an undated snapshot or describe its totals as current activity.
