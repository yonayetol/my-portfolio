# Yonas Portfolio — Product, Design, and Build Plan

> Living execution plan for turning the supplied profile data into a distinctive, evidence-led portfolio. Every significant decision, task, validation gate, and launch requirement belongs here.

## 1. Outcome

Build a fast, accessible, memorable portfolio that positions Yonas at the intersection of:

1. **AI reasoning** — classical ML, symbolic AI, pattern mining, and learning systems.
2. **Production engineering** — full-stack products, deployment, infrastructure, and operational problem-solving.
3. **Technical teaching** — training, evaluation, mentorship, and explaining difficult ideas from first principles.

The site should make a visitor think: “This person understands difficult systems, can build them, and can explain the work.” It should create confidence for engineering opportunities, international freelance work, technical collaboration, and future product partnerships.

## 2. Success criteria

The finished portfolio must:

- Establish who Yonas is and what he builds within the first viewport.
- Put proof before long skill lists.
- Make the three strongest projects understandable in under two minutes.
- Clearly distinguish shipped work, in-progress work, research, and concepts.
- Give recruiters a fast scan path and technical visitors a deeper path.
- Feel original without compromising readability or performance.
- Work comfortably on low-end mobile devices and slower connections.
- Meet WCAG 2.2 AA expectations for color, keyboard use, focus, structure, and motion.
- Respect `prefers-reduced-motion` and keep all essential content usable without JavaScript.
- Target Lighthouse scores of 95+ for Performance, Accessibility, Best Practices, and SEO on the production build, with any exceptions documented.
- Keep the initial JavaScript budget deliberate; interactive flourishes must earn their cost.
- Contain no unsupported claim, broken credential link, exposed private detail, or fake metric.

## 3. Audience and visitor paths

### Primary audiences

| Audience                     | What they need quickly                                             | Desired action                            |
| ---------------------------- | ------------------------------------------------------------------ | ----------------------------------------- |
| Recruiter / hiring manager   | Positioning, strongest shipped work, role, stack, location, resume | Contact Yonas or download resume          |
| Technical lead / engineer    | Architecture decisions, algorithms, constraints, code, trade-offs  | Inspect a case study or GitHub            |
| Founder / client             | Problems solved, delivery ability, reliability, product thinking   | Discuss a project                         |
| AI researcher / collaborator | Symbolic AI, Hyperon/MeTTa, pattern-mining work, learning depth    | Review research-oriented work and connect |
| Student / community member   | Learning path, from-scratch work, teaching material                | Read notes or follow profiles             |

### Two reading speeds

- **60-second scan:** hero → proof strip → featured work → experience → contact.
- **Technical deep dive:** interactive system map → project case study → architecture/evidence → learning notes → credentials.

The site will support both paths naturally; no intrusive onboarding or audience selector is required.

## 4. Core creative direction

### Concept: “The Intelligence Workshop”

The portfolio behaves like a calm, precise visual field manual for intelligent systems—not a generic résumé page and not a noisy “hacker” interface.

The signature visual is a **Proof Graph**: a restrained, interactive network connecting capabilities to real evidence. For example:

```text
Symbolic AI ── MM2 Pattern Miner ── Hyperon / MeTTa
      │                 │
Teaching ─────── iCog Labs ─────── First-principles learning
      │
Product engineering ── Nexora IMS ── Deployment / operations
      │
School workflows ───── Zikuala Management System
      │
Assessment ─────────── Digital Examination & Analysis
```

On the homepage this appears as a subtle hero/section transition. Hovering or focusing a node reveals one compact proof statement; selecting it moves to the relevant case study or section. On reduced-motion devices it becomes a clear static relationship map.

### Brand idea

**Reason clearly. Build deeply. Ship usefully.**

This is a derived creative line, not a supplied quote. It requires approval before launch.

### Visual character

- Dark graphite canvas rather than pure featureless black.
- Warm off-white typography for reduced eye strain.
- Electric cobalt as the main accent, honoring the supplied blue preference.
- A small warm amber accent inspired by Addis Ababa light; used sparingly for “in progress” and human details, not as a cultural cliché.
- Fine blueprint/grid lines, hypergraph connections, and annotated technical marks.
- Generous negative space and strong editorial typography.
- Space Grotesk for display and body; Space Mono for metadata, labels, and technical annotations.
- Soft depth, sharp alignment, and intentional asymmetry.
- No stock 3D astronauts, Matrix rain, endless terminal typing, floating skill spheres, or percentage skill bars.

### Proposed design tokens

These are starting points and will be contrast-tested in the browser.

| Token          | Draft value                 | Use                          |
| -------------- | --------------------------- | ---------------------------- |
| Canvas         | `#080A0F`                   | Main background              |
| Surface        | `#0E121A`                   | Cards and raised panels      |
| Surface strong | `#151B26`                   | Active/interactive panels    |
| Text           | `#F3F0E8`                   | Primary text                 |
| Text muted     | `#9CA6B5`                   | Secondary copy               |
| Cobalt         | `#4D7CFF`                   | Main action and graph signal |
| Cobalt bright  | `#79A0FF`                   | Hover/focus detail           |
| Amber          | `#F2A65A`                   | In-progress/human accent     |
| Border         | `rgba(243, 240, 232, 0.12)` | Dividers and card edges      |

### Motion language

- Nodes resolve into connections as sections enter view.
- Project media uses small, user-controlled depth shifts, never disconnected floating effects.
- Labels, headings, and evidence groups reveal in short, legible sequences.
- The selected-work chapter uses a bounded desktop card stack as the signature scroll sequence.
- A continuous page field, progress line, and section rail make the journey feel connected without obscuring copy.
- Page transitions remain subtle fades/masks when supported.
- No animation delays access to content.
- Micro-interactions remain between 160–500 ms; narrative entrances may run 620–1,150 ms and always follow the visitor's scroll.
- Reduced-motion mode removes transforms and graph movement while preserving state changes.

## 5. Content strategy

### Narrative hierarchy

1. **What Yonas does:** builds intelligent, deployable software.
2. **Why believe it:** selected shipped and active projects.
3. **How he works:** first principles, evidence, clean systems, teaching.
4. **Where he is going:** AI automation, deeper ML, and research contribution.
5. **How to connect:** direct, simple contact routes.

### Claim-to-proof rule

Every strong claim should point to one of:

- A shipped project.
- A public repository, PR, or live product.
- A role with scope and dates.
- A credential with a working verification URL.
- A teaching artifact or documented outcome.
- A transparent “currently learning/building” label.

### Project status vocabulary

Use exactly four public states:

- **Shipped** — completed and demonstrably used or hosted.
- **In progress** — active implementation exists.
- **Research / exploration** — evidence-gathering or technical investigation.
- **Concept** — problem and direction exist, but no product claim.

Map current projects as follows after confirmation:

| Project                        | Planned public status | Placement                                             |
| ------------------------------ | --------------------- | ----------------------------------------------------- |
| Nexora IMS                     | Shipped               | Featured case study, with confidentiality controls    |
| MM2 Pattern Miner              | In progress           | Featured technical case study                         |
| Zikuala Management System      | In progress           | Academic operations and eLearning frontend case study |
| Digital Examination & Analysis | In progress           | Ongoing examination delivery and post-exam analysis   |

### Case-study template

Each featured project will follow the same evidence-driven structure:

1. One-sentence outcome/problem.
2. Status, role, date, team, and links.
3. Context: who needed what and why.
4. Constraints: technical, operational, market, or privacy limits.
5. System: architecture and key flows.
6. Decisions: 2–4 important trade-offs and why they were made.
7. Deep dive: algorithm, infrastructure, or interaction detail.
8. Evidence: screenshots, code/PRs, tests, metrics, or demo.
9. Outcome: only confirmed results.
10. Reflection: what Yonas learned and what he would improve.

### Copy tone

- Direct, thoughtful, technically precise.
- First person for the About page and project reflections.
- Short sentences in the hero; richer explanations in case studies.
- Confident about completed work, transparent about work in progress.
- Avoid generic phrases such as “passionate developer,” “cutting-edge solutions,” and “results-driven professional.”

## 6. Information architecture

### Primary routes

```text
/
├── /work
│   ├── /work/nexora-ims
│   ├── /work/mm2-pattern-miner
│   ├── /work/zikuala-management-system
│   └── /work/digital-examination-analysis
├── /about
├── /notes                         (launch only with at least 2 strong notes)
│   └── /notes/[slug]
├── /credentials
├── /resume.pdf                    (when supplied)
└── /404
```

### Navigation

- Home
- Work
- About
- Notes, only when substantive content exists
- Contact button

Credentials will be discoverable from About and the homepage without crowding primary navigation.

### Homepage sequence

1. **Hero / positioning**
   - Name, primary title, clear value proposition.
   - Availability/location indicator after confirmation.
   - Primary action: Explore selected work.
   - Secondary action: Contact / resume.
   - Signature Proof Graph starts here without obscuring the message.

2. **Proof strip**
   - Two current roles.
   - Shipped systems claim connected to actual case studies.
   - Symbolic AI / teaching signal.
   - No unverified numeric counters.

3. **Selected work**
   - Three excellent project panels rather than a large generic grid.
   - Each panel uses a different evidence form: product interaction, infrastructure map, algorithm trace.

4. **How I build**
   - Reasoning systems, learning systems, product systems, shipping systems.
   - Proof Graph interaction becomes fully visible here.

5. **Experience / teaching timeline**
   - Nexora, iCog Labs, education, A2SV.
   - Dates must be supplied before launch.

6. **Current lab**
   - Honest snapshot of MM2 Pattern Miner, Zikuala Management System, and ongoing Digital Examination & Analysis.
   - Shows momentum without presenting plans as products.

7. **Credentials**
   - A curated subset on the homepage; all verified credentials on `/credentials`.

8. **Human note / About bridge**
   - Addis Ababa, learning discipline, teaching, and sports routine in a concise, authentic paragraph.

9. **Contact**
   - Clear collaboration prompt, email, LinkedIn, GitHub, and approved social links.
   - No unnecessary contact form at first launch.

### About page

- Personal/professional story.
- Career timeline with dates.
- Principles shown through examples.
- Technical capability map.
- Learning journey.
- Education and A2SV.
- Selected credentials.
- Photo and resume action.

### Work index

- Filter by status and domain, implemented as semantic buttons.
- Projects sorted by evidence strength, not merely recency.
- Concept-stage ideas placed in a visually separate Explorations area.

### Notes

- Use for original technical writing, not a placeholder blog.
- Initial recommended topics:
  - What implementing ML algorithms from scratch changes about framework use.
  - Evidence-driven debugging inside a symbolic AI/pattern-mining system.
  - Deploying a school system under real hosting and mobile-network constraints.
- If two strong articles are not ready, omit Notes from launch navigation and add it later.

## 7. Technical architecture

### Proposed stack

- **Astro + strict TypeScript** for a content-first, mostly static site with excellent baseline performance.
- **React islands** only for the Proof Graph and any interaction that genuinely benefits from component state.
- **Astro content collections / Markdown or MDX** for projects, notes, credentials, and timeline data.
- **Plain modern CSS with design tokens and component scopes** rather than a large utility/runtime styling layer.
- **SVG** for the Proof Graph and architecture diagrams; progressive enhancement keeps a static fallback.
- **Minimal motion utilities** built with CSS/Web Animations where practical; add a motion dependency only if it materially improves accessible interaction.
- **Static deployment** so the site can run on GitHub Pages, Cloudflare Pages, or Vercel without a server.

Astro is built on Vite, respects the supplied Vite/React preferences, and lets the site ship far less client JavaScript than a fully hydrated single-page app.

### Planned repository structure

```text
my-portfolio/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── resume.pdf
│   ├── favicon.svg
│   └── social-card.png
├── src/
│   ├── components/
│   │   ├── global/
│   │   ├── home/
│   │   ├── work/
│   │   └── interactive/
│   ├── content/
│   │   ├── projects/
│   │   ├── notes/
│   │   └── config.ts
│   ├── data/
│   │   ├── profile.ts
│   │   ├── experience.ts
│   │   └── credentials.ts
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── utilities.css
│   └── utils/
├── tests/
│   └── e2e/
├── PORTFOLIO_DATA.md
├── PORTFOLIO_PLAN.md
├── README.md
└── package.json
```

### Content model

Project content should contain typed fields similar to:

```ts
type ProjectStatus = "shipped" | "in-progress" | "research" | "concept";

interface Project {
  title: string;
  summary: string;
  status: ProjectStatus;
  year?: string;
  role?: string;
  team?: string;
  featured: boolean;
  disciplines: string[];
  technologies: string[];
  links: { label: string; href: string }[];
  confidentiality?: string;
  cover: { src: string; alt: string };
}
```

No content should be buried inside presentation components. Profile, experience, credentials, and project metadata remain structured and reusable.

### Performance budget

- Prefer locally hosted WOFF2 font subsets with correct licensing and fallbacks.
- Hero/LCP media optimized and responsive; no autoplay video on mobile.
- Keep the initial route mostly HTML/CSS.
- Avoid WebGL for the Proof Graph; SVG is more accessible and proportionate.
- Lazy-load below-the-fold media and nonessential islands.
- Reserve image dimensions to prevent layout shift.
- Aim for less than 200 KB compressed client JavaScript on the homepage, with a stretch target substantially below that.

### SEO and sharing

- Unique title and description for every page.
- Canonical URLs after domain selection.
- Open Graph and social-card images.
- `Person`, `WebSite`, `ProfilePage`, and relevant `CreativeWork` JSON-LD based only on confirmed facts.
- Sitemap, robots file, RSS feed when Notes launches.
- Semantic heading structure and descriptive internal links.
- Favicon and web manifest.

### Privacy and security

- Phone remains unpublished unless explicitly approved.
- Use a mail link at launch; avoid collecting personal data through a form.
- If a form is later added: server-side validation, spam protection, narrow retention, and a privacy note.
- No third-party trackers by default.
- External links use safe attributes where relevant.
- Dependabot or equivalent automated dependency review after repository setup.
- No secrets or private source material committed.

## 8. Component and interaction inventory

### Global components

- Skip link
- Header / navigation
- Mobile navigation dialog
- Footer
- Section label
- Status badge
- Button / text link
- Focus ring system
- Social link
- Theme metadata (dark is primary; a full light theme is optional, not required for v1)

### Homepage components

- Hero statement
- Availability/location chip
- Proof Graph
- Proof strip
- Featured project panel
- Capability cluster
- Experience timeline
- Current lab cards
- Credential rail
- Contact block

### Case-study components

- Project header
- Metadata rail
- Media frame
- Architecture diagram
- Decision/trade-off block
- Code or algorithm excerpt
- Evidence list
- Outcome/reflection block
- Previous/next project navigation

### Interaction details

- All hover interactions must have keyboard and touch equivalents.
- Proof Graph nodes use real focusable elements, not pointer-only SVG groups.
- Filters announce results and preserve visible focus.
- External links are labeled clearly.
- Status is communicated by text, not color alone.
- Mobile navigation traps focus and restores it correctly.

## 9. Asset plan

### Required from Yonas

- [x] Professional portrait supplied at 900 × 1200 and integrated as an identity-record visual.
- Optional workspace/candid photo.
- [x] Nexora IMS / Abdi Adama School Life interface capture supplied and approved for portfolio use.
- MM2 Pattern Miner public repository/PRs and technical output examples.
- Company/project logos with publication permission.
- Resume PDF.
- Exact role and education dates.
- Optional testimonial text plus author permission.

### Assets we will create

- Responsive image derivatives (AVIF/WebP plus fallback where needed).
- Project cover compositions based on real screenshots.
- Lightweight architecture diagrams in accessible SVG.
- Proof Graph visual system.
- Favicon/monogram.
- Open Graph/social-sharing card.
- Subtle grid/noise textures in CSS or tiny optimized assets.
- A dated LeetCode proof module derived from the supplied profile capture, linked to the live profile.

AI-generated imagery will not substitute for proof of real projects. If used at all, it will be clearly decorative and visually subordinate to authentic screenshots and diagrams.

## 10. Execution roadmap

### Phase 0 — Repository and evidence foundation

- [x] Inspect the supplied remote repository before any history-changing action; it was empty.
- [x] Initialize the existing workspace, connect the supplied remote, and use `main` as the default branch.
- [x] Create the first clean implementation commit and project README.
- [x] Consolidate all supplied source data into `PORTFOLIO_DATA.md`.
- [x] Record the complete product/design/build plan in `PORTFOLIO_PLAN.md`.
- [ ] Confirm public name, contact/privacy settings, primary GitHub, role dates, education, and availability.
- [ ] Manually validate every public profile and certification URL.
- [ ] Gather project links, media, outcomes, and permission boundaries.
- [ ] Build a content evidence matrix: claim → source → proof → publication status.

**Exit gate:** identity and privacy decisions are confirmed, and each featured project has enough truthful evidence for a case study.

### Phase 1 — Content and brand definition

- [ ] Approve primary title, value proposition, and brand line.
- [x] Draft the complete homepage narrative in plain language.
- [x] Select the four current work records from the revised data.
- [ ] Interview Yonas through focused questions for missing project details.
- [x] Draft all selected case studies using Context → System → Decisions → Evidence → Reflection.
- [x] Separate shipped, in-progress, and learning-lab work.
- [x] Resolve mobile and desktop layouts directly in the implemented design system.
- [x] Validate and implement the Proof Graph content relationships.

**Exit gate:** complete approved copy deck and wireframes; no unsupported hero claim.

### Phase 2 — Technical foundation

- [x] Scaffold Astro, TypeScript, formatting, validation, and audit tooling.
- [x] Configure strict TypeScript and import aliases.
- [x] Establish typed profile, project, experience, and credential data modules.
- [x] Set up CSS tokens, fluid type, spacing, grid, and breakpoints.
- [x] Add locally bundled Space Grotesk and Space Mono fonts with fallbacks.
- [x] Build base layout, SEO metadata, header, footer, and error page.
- [x] Configure development, build, preview, verification, and privacy-validation scripts.
- [x] Add GitHub Pages continuous deployment with type checks and production build.

**Exit gate:** a deployable skeleton with clean CI and baseline accessibility.

### Phase 3 — Design system and homepage

- [x] Implement final color, typography, surface, border, and focus tokens.
- [x] Build all global UI primitives and states.
- [x] Build responsive header and mobile navigation.
- [x] Implement hero and proof strip.
- [x] Build selected-work editorial panels.
- [x] Implement capability clusters and experience timeline.
- [x] Add learning-lab, credential, About bridge, and contact sections.
- [x] Visually test the production site in Chromium at 390 px mobile and 1440 px desktop sizes.

**Exit gate:** homepage tells the full story without relying on animation or unfinished routes.

### Phase 4 — Signature interaction and case studies

- [x] Build the static Proof Graph fallback first.
- [x] Add lightweight keyboard-accessible progressive enhancement and contextual details.
- [x] Add responsive behavior for small screens without dense node overlap.
- [x] Implement reduced-motion behavior.
- [x] Build the work index and semantic filters with a live result announcement.
- [x] Build a reusable case-study layout.
- [x] Complete Nexora IMS, MM2 Pattern Miner, Zikuala Management System, and Digital Examination & Analysis case studies with accurate progress labels.
- [x] Create code-native, nonessential system diagrams with accessible surrounding content.

**Exit gate:** signature interaction is useful, stable, and accessible; every featured work route is complete.

### Phase 5 — About, credentials, and optional notes

- [x] Build the About page and supplied experience/education timeline.
- [x] Build the credentials page with all nine supplied external links and a verification disclosure.
- [x] Add a learning-journey section that distinguishes completed and current topics.
- [ ] Add resume only after the current PDF is supplied and reviewed.
- [x] Intentionally omit Notes until at least two substantive original articles are ready.
- [ ] Add RSS and article schema if Notes launches.

**Exit gate:** all primary navigation destinations are substantive; no placeholder page ships.

### Phase 6 — Quality, performance, and content audit

- [x] Run formatting, strict type/content checks, and the production build.
- [x] Add automated build checks for internal navigation/assets, required outputs, and private contact leakage.
- [x] Run Lighthouse accessibility checks; manual assistive-technology review remains a pre-launch task.
- [ ] Test screen-reader landmarks, headings, labels, alt text, and announcements.
- [x] Validate and correct automated color-contrast findings; forced-colors styles are included.
- [x] Implement reduced-motion and no-JavaScript fallbacks.
- [x] Audit images, local fonts, JavaScript, layout shift, and LCP.
- [x] Run a mobile Lighthouse production audit: 100 Performance, Accessibility, Best Practices, and SEO.
- [ ] Check Firefox, Chromium, and WebKit/Safari behavior.
- [x] Pass the Lighthouse touch-target audit; real-device review remains pre-launch.
- [x] Validate sitemap, metadata, schema, favicon, PNG social card, and 404 output.
- [ ] Manually click every contact, profile, project, and credential link.
- [x] Add and pass a public-build privacy audit against the private phone and unapproved Telegram value.

**Exit gate:** launch checklist passes, known exceptions are documented, and no private information is exposed.

### Phase 7 — Deployment and launch

- [x] Configure GitHub Pages as the repository-default deployment path.
- [x] Configure and validate the `/my-portfolio` base path across all nine generated pages.
- [ ] Add custom domain and DNS when selected.
- [ ] Configure HTTPS, canonical host, and redirects.
- [x] Add a repeatable GitHub Pages build-and-deploy workflow for the `main` branch.
- [ ] Deploy production and repeat smoke, link, accessibility, and Lighthouse checks.
- [ ] Connect Search Console after ownership approval.
- [ ] Add privacy-friendly analytics only if Yonas wants it.
- [ ] Publish launch links and update GitHub/LinkedIn profiles.

**Exit gate:** production URL is stable, indexed deliberately, and backed by a repeatable deployment process.

### Phase 8 — Maintenance

- [ ] Review links and project statuses quarterly.
- [ ] Add new evidence when projects ship; do not silently relabel concepts.
- [ ] Update credentials and resume from the structured data source.
- [ ] Monitor performance budgets and dependency health.
- [ ] Add technical notes only when they meet the quality bar.
- [ ] Keep case studies outcome-focused as new metrics become available.

## 11. Testing strategy

### Automated checks

- TypeScript strict type check.
- Astro/content-schema validation.
- Linting and formatting check.
- Production build.
- Component tests for interactive state where valuable.
- Playwright smoke tests for core routes and navigation.
- Automated accessibility scan on representative pages.
- Internal-link and missing-asset checks.

### Manual checks

- Full keyboard navigation.
- Screen-reader spot check.
- Reduced motion.
- 200% zoom and text reflow.
- Touch and mobile navigation.
- Slow-network behavior.
- No-JavaScript content access.
- Dark palette contrast on multiple displays.
- External link and fact verification.

## 12. Definition of done

The first public version is done only when:

- The homepage, Work, About, Credentials, at least three case studies, and Contact experience are complete.
- Notes is either substantive or intentionally omitted.
- All launch copy is approved and fact-checked.
- Every featured claim has evidence or an explicit progress label.
- All approved links work when logged out.
- The phone number and confidential client/internal data are not exposed.
- Mobile, keyboard, reduced-motion, and no-JavaScript paths work.
- Automated checks and production build pass.
- Performance and accessibility targets are met or any exception is documented with a fix plan.
- Metadata, sitemap, schema, social card, favicon, 404, and canonical URLs are correct.
- Deployment is reproducible from the connected repository.
- The production URL is added back to GitHub, LinkedIn, and the source-of-truth file.

## 13. Risks and controls

| Risk                                    | Control                                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Beautiful but generic portfolio         | Anchor the design in Yonas’s specific three-part story and Proof Graph                          |
| Style overwhelms content                | Static semantic content first; animation is progressive enhancement                             |
| Too many projects dilute quality        | Feature three evidence-rich case studies; separate explorations                                 |
| Learning topics look like expert claims | Explicit completed/studying/status labels and claim-to-proof review                             |
| Proprietary work is overshared          | Permission gate, anonymized visuals, confidentiality notes                                      |
| Personal contact data leaks             | Phone private by default; final privacy audit                                                   |
| Site is slow on mobile                  | Static output, SVG rather than WebGL, local optimized assets, JS budget                         |
| Blog launches empty                     | Hide Notes until two strong articles exist                                                      |
| Broken certification/profile links      | Logged-out manual validation before launch and quarterly link review                            |
| Repository history mismatch             | Read-only remote inspection and explicit repository setup decision before writes to Git history |

## 14. Decisions requiring Yonas

These do not block initial design-system work, but they block accurate launch content:

1. Public display name: “Yonas,” “Yonas Ayele,” or another exact name.
2. Primary GitHub account: `japuyon` or `yonayetol`.
3. Whether Telegram should be a public contact option.
4. Whether the phone should remain private (recommended) or be public.
5. Exact role, education, and A2SV dates.
6. Current availability and preferred opportunity types.
7. Which projects may show source code, screenshots, company/client names, and metrics.
8. Preferred launch host and any custom domain.
9. Whether the derived brand line and proposed warm amber accent feel authentic.

## 15. Immediate next actions

1. Review the implemented site locally and approve or revise the positioning, brand line, and visual direction.
2. Authenticate this machine with GitHub and push the completed local `main` branch.
3. Gather the launch-blocking dates, public profile confirmation, project evidence, and approved media listed in the data file.
4. Manually validate every external profile and certificate URL in a logged-out browser.
5. Push the implementation to the connected repository and enable GitHub Pages deployment.

## Change log

- **2026-07-21:** Initial plan created from the three supplied profile/context documents and the current empty workspace audit.
- **2026-07-21:** Implemented the complete static portfolio, project case studies, responsive visual system, Proof Graph, About and Credentials pages, validation/privacy tooling, SEO assets, and GitHub Pages workflow. Production build generated nine routes and the final mobile Lighthouse audit scored 100 in all four primary categories.
- **2026-07-21:** Refined the hero for short laptop and mobile viewports, eliminating the perceived bottom clipping. Added accessible inertial scrolling, smooth anchors, active section rail, scroll progress, direct-hash reveal handling, and reduced-motion fallbacks.
- **2026-07-21:** Integrated the supplied portrait as an identity-record visual and added a dated LeetCode proof module with an explicit link to the live profile.
- **2026-07-22:** Replaced the Nexora IMS placeholder topology with an optimized approved School Life capture. Rebuilt the subtle view-linked motion as explicit JS-backed scroll choreography with full-screen chapter transitions, opposing project parallax, media depth, mobile tuning, and reduced-motion protection.
- **2026-07-22:** Replaced direct credential navigation with an accessible on-site verification window featuring minimize, maximize/restore, close, a minimized dock, keyboard and focus handling, and a persistent Coursera source action.
- **2026-07-22:** Disabled Astro's development toolbar so the local development view no longer shows a clipped framework control beneath the site footer.
- **2026-07-22:** Removed the misleading static Addis Ababa clock in favor of factual location coordinates and timezone context. Tightened credential-window typography and spacing, with adaptive title sizing, to eliminate unnecessary desktop scrolling.
- **2026-07-22:** Recalibrated the portfolio's oversized display typography and rebuilt navigation and motion as global systems. Added a persistent page-aware vertical navigator with previous/next jumps, illuminated progress, active labels, and compact mobile behavior; expanded cinematic chapter transitions and view-linked scene motion across the homepage, About, Credentials, Work, and every case study.
- **2026-07-22:** Removed the disruptive full-screen chapter text treatment after studying OJI's continuous brand journey, Ricardo Chance's depth-led portfolio, and Explanideo's user-paced scrollytelling. Replaced it with an original continuous story field, section-linked media crops, scale, parallax, and progress motion. Added a no-flash, system-aware light/dark theme with persistent preference and a responsive bottom story controller on mobile.
- **2026-07-22:** Replaced the portfolio's repeated node-and-orbit diagrams with evidence-led, project-specific compositions: an active-project workbench in the hero and an interactive capability-to-project evidence panel. Removed faux identity scans, decorative project codes, arbitrary visual numbering, and unsupported dashboard metrics so the presentation feels authored, credible, and specific to the work.
- **2026-07-22:** Removed the standalone Addis Ababa context section from the About page and closed the navigation sequence so Contact follows the learning section directly.
- **2026-07-22:** Rebuilt the motion hierarchy around user-paced storytelling after studying OJI's chapter continuity, Ricardo Chance's layered portfolio movement, and Explanideo's scrollytelling principles. Added staggered editorial entrances, a continuous chapter field and progress sweep, a bounded stacked-project sequence, scroll-driven media depth and marquee movement, live reduced-motion teardown, and a continuously updating section rail across desktop and mobile. Removed the redundant fixed glow layer and synchronized first-paint motion defaults; the final mobile production audit scored 98 Performance and 100 for Accessibility, Best Practices, and SEO, with CLS reduced to 0.03.

## Current revision — Evening, exploration, and personal evidence

### Intent

Make the home a place visitors can explore on their own, filled with objects that represent Yonas's actual projects, coursework, and problem-solving practice. This revision follows the user's latest corrections and supersedes conflicting content and interaction choices above.

### Implementation order

1. Default to a warm evening scene, with local light around the workbench, learning collection, and entry. Preserve a daylight toggle and save choices using a fresh preference key so the previous daylight default does not override this revision.
2. Add an explicit free-exploration mode. Desktop visitors use WASD and turn controls; touch visitors use a movement joystick and drag to look. Bound movement to the property and prevent walking through major furniture and walls. Keep room shortcuts, a reset route, keyboard object lists, and reduced-motion alternatives.
3. Replace anonymous shelf blocks with seven authored course objects: linear algebra, neural networks, NLP, probability and statistics, supervised learning, exploratory data analysis, and neural-network optimization. Each should have a real title, meaningful visual identity, supplied topics, and a small explanatory interaction. Do not imply that studying a course establishes mastery or production experience.
4. Put the LeetCode record on an unobstructed, illuminated display. Add direct access from the interface and retain the exact supplied snapshot: 420 of 4,101 solved; 187/975 easy, 205/2,139 medium, 28/987 hard; 5 attempting.
5. Replace the ML Engineering Dojo project with Zikuala Management System. Inspect existing local project documentation for supported scope before writing details. Feature digital examination and post-exam analysis as ongoing work. Do not invent deployment status, adoption numbers, or capabilities.
6. Update education to fourth-year Computer Science at AAU. Keep shared content consistent across the house, quick view, About, project archive, and supporting records.
7. Validate formatting, types, production builds, base-path support, free movement, collisions, touch input, keyboard focus, reduced motion, loading/error fallbacks, and all object-to-content mappings. Commit the finished revision on the existing feature branch.

### Acceptance criteria

- The initial house is evening-lit without requiring a toggle.
- Movement responds directly to the visitor and never leaves them stuck; room shortcuts remain available.
- Every featured course object opens relevant learning content, and the collection feels personal rather than decorative filler.
- LeetCode is discoverable immediately and legible on desktop and mobile.
- Zikuala and the ongoing examination project replace obsolete content without unsupported claims.
- AAU and fourth-year CS are visible in the biography.
- The experience remains usable with keyboard navigation, reduced motion, and a readable fallback.

### Implemented and verified

- Evening now defaults on through a versioned preference; six local lights warm the house. An explicit daylight choice persists.
- Free exploration supports WASD, arrows/Q/E, pointer dragging, and a touch joystick. Collision stepping, safe starting positions, and property bounds are covered by a repeatable navigation test. Room shortcuts and Reset remain available.
- Seven clothbound course volumes open seven interactive notebooks with the supplied course topics. The same notebooks render on the standard credentials route.
- LeetCode has a freestanding illuminated display beside the collection and a persistent shortcut. The supplied totals remain labeled as a shared snapshot.
- Zikuala and Digital Examination & Analysis have dedicated case studies grounded in local project documentation. Both are clearly in progress. The kitchen presents the examination project; education consistently states fourth-year Computer Science at AAU.
- Browser checks exercised all 17 stories, keyboard Escape/focus restoration, nested course navigation, desktop walking/turning/stopping, return to the same walking pose after inspection, mobile joystick/drag/release/reset, 320px layouts, all seven course demonstrations, reduced motion, stored preferences, no-JavaScript content, malformed hashes, and WebGL context loss.
- `npm run verify` passes, including navigation geometry tests, Astro diagnostics, production generation, and internal-link/metadata validation. The `/my-portfolio/` base-path build also validates. The Three.js bundle retains Vite's advisory size warning; no new performance score is claimed.

## Current revision — Portfolio first, optional 3D

The quick overview is now the homepage at `/`; `/quick-view/` remains an alias with a root canonical. The 3D house lives at `/explore/`, reached through explicit invitations. Portfolio return links remain visible in the 3D header and story dialog. Room links and maps point to the new route, while ordinary project, biography, credentials, and contact links stay in the standard portfolio. The homepage does not load the 3D scene.

Replace the repeated cream label boxes and plus signs with compact, object-specific illustrated markers. Reveal names on hover and keyboard focus; retain short visible names on touch devices and the equivalent object list. Keep motion preferences, minimum touch targets, and readable contrast.

Verified the route change, explicit 3D entry, room deep links, return actions in both header and stories, legacy quick-view canonical, desktop hover and keyboard captions, touch labels and targets at 320px, and the no-JavaScript homepage. Root and `/my-portfolio/` production builds validate.
