# Yonas — A Home for a Mind That Builds

A personal portfolio for Yonas, an AI engineer, software builder, and technical trainer in Addis Ababa. The `feat/portfolio-home` redesign turns the site into an illustrated courtyard home: a main room for introductions, a workshop for projects, a kitchen for work in progress, a learning garden, a credential reading nook, and a contact veranda.

Built with Astro, strict TypeScript, locally served Space Grotesk and Space Mono fonts, semantic HTML, CSS, and small progressive-enhancement scripts. The site produces static files for the existing GitHub Pages deployment.

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

- `/` contains the courtyard and rooms with direct section links and a house-map dialog.
- `/quick-view/` presents the essentials in a compact reading layout.
- `/work/` lists projects with status filters; `/work/[slug]/` contains their case studies.
- `/about/` and `/credentials/` provide the detailed introduction and learning records.
- Daylight/evening and motion controls store preferences locally. Reduced-motion preferences are respected.
- Kitchen recipe details use native disclosure elements. Credential links retain their external destinations when JavaScript is unavailable.

## Editing the home

- `src/data/profile.ts`, `projects.ts`, and `credentials.ts` hold shared public content.
- `src/components/home/HouseScene.astro` draws the custom SVG courtyard and destination links.
- `src/components/home/RoomIllustration.astro` contains the coordinated room illustrations.
- `src/components/home/home.ts` handles the map, preferences, garden selection, and email copying.
- `src/styles/home.css` defines the home design; `interiors.css` styles the secondary pages. Existing `global.css` supports retained components, including technical exhibits and the credential viewer.
- `PORTFOLIO_HOME_AGENT_PROMPT.md` records the creative brief. `PORTFOLIO_PLAN.md` preserves the earlier design plan.

Keep navigation and essential text in HTML rather than embedding them in illustrations. Reuse the shared data modules so the home, case studies, and quick view stay consistent.

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

`PORTFOLIO_DATA.md` is the internal content source of truth. Keep private contact details out of public pages and assets. Preserve project status distinctions and the capture date on coding statistics; do not present concepts, learning records, or dated snapshots as shipped features or live activity.
