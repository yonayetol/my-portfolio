# Yonas Portfolio Home Design and Implementation Prompt

Act as a creative director, interaction designer, illustrator, and senior frontend engineer. Transform my existing portfolio into an extraordinary personal home on the web. Build the experience described below, using the existing repository and its real content. Take ownership of coherent design decisions and carry the implementation through responsive, accessibility, and performance validation.

The central idea is **a home for a mind that builds**. Visitors arrive at a garden gate, enter a welcoming courtyard, and explore rooms that reveal my work, learning, and personality. The kitchen is where current projects are cooking. The workshop contains things I have built. The garden represents ideas I am cultivating. This should feel intimate, imaginative, and beautifully crafted, with the clarity of an excellent professional portfolio.

This document is the creative direction and implementation prompt. Its proposed copy is creative copy, not a claim about my real home or personal history. Use the house as an expressive metaphor.

## 1 The emotional experience

Create the feeling of arriving at a thoughtful builder’s home just before sunset: warm plaster, a cobalt gate, plants catching the light, an open workshop door, and a kitchen window glowing in the courtyard. Someone interesting lives here. Their work is visible. You are welcome to look around.

The desired sequence is curiosity, welcome, discovery, confidence, and connection. Wonder should come from art direction, spatial continuity, and meaningful responses to visitors. Every beautiful interaction should either orient the visitor, reveal real work, or make the space feel cared for.

The house is a portrait of how I think. Its recurring structural motif is connection: branching garden paths, a trellis, a workshop diagram, and the house map echo the relationship between symbolic reasoning, learning, products, and production engineering. Keep that motif subtle enough to discover.

Give the site a distinctive silhouette that remains recognizable with all text hidden: an asymmetrical courtyard house, a blue gate, a climbing plant, a luminous kitchen window, and a workshop facing the yard.

## 2 Ground the experience in my real work

I am Yonas, an AI engineer, software builder, and fourth-year Computer Science student at Addis Ababa University (AAU), based in Addis Ababa, Ethiopia. My existing portfolio includes Nexora Technology PLC, iCog Labs, A2SV, symbolic AI, machine learning, software delivery, and technical teaching.

Read the repository instructions, `PORTFOLIO_DATA.md`, existing content modules, routes, and components before implementing. Reuse verified content from `src/data/profile.ts`, `src/data/projects.ts`, and `src/data/credentials.ts`. Inspect the current Astro setup and preserve useful foundations. This brief replaces the old visual concept; preserve its factual and privacy constraints.

Existing project records include:

| Project                        | Role in the home                                        | Content boundary                                                                                    |
| ------------------------------ | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Nexora IMS                     | A substantial finished object in the workshop           | Existing record labels it shipped; explain actual engineering decisions and available evidence      |
| MM2 Pattern Miner              | An active kitchen recipe and a workshop research record | Keep its in-progress status; explain support filtering, conjunction expansion, and surprisingness   |
| Zikuala Management System      | An academic operations model in the workshop            | In progress; distinguish the frontend foundation from backend integration and production acceptance |
| Digital Examination & Analysis | Current work in the kitchen and workshop                | In progress; explain exam delivery and post-exam analysis without claiming production adoption      |

Do not invent metrics, deployments, testimonials, employment dates, partnerships, research results, repository links, or recent activity. Existing learning statistics are shared snapshots, not live feeds. Show a capture date only when supplied, and keep historical metadata separate from the current shared snapshot. Never expose unpublished contact details. Do not turn the current education record into a guessed graduation date.

Rewrite internal-sounding phrases such as “the supplied project record” into clear first-person portfolio copy where supported. A project’s declared status is not itself evidence; show actual artifacts when available and make missing evidence a content task rather than fabricating it.

## 3 Choose a clear visual approach

Build a **layered illustrated courtyard with shallow spatial depth**. Use an elevated three-quarter view for the house overview, then nearer, mostly frontal compositions inside rooms. The style should combine architectural illustration, tactile editorial design, and a gently playful diorama.

Prefer art-directed SVG, optimized illustration layers, HTML, CSS transforms, and selective animation. Full 3D is optional only if a prototype demonstrates a substantial benefit without sacrificing mobile usability or loading speed. The concept must already succeed as a still image.

Avoid a generic dashboard with room names, a conventional card grid with house icons, photorealistic property-tour styling, pixel art, and an asset collage with conflicting perspectives. Do not imitate a recognizable existing portfolio. Create a consistent visual language specifically for this house.

### Materials and color

Use warm limestone plaster, lightly textured paper, muted terracotta, walnut, garden greens, cobalt-painted metal, and honey-colored light. Texture should be subtle and compressed, never layered over reading text.

Suggested starting palette, subject to contrast testing:

| Material or purpose             | Color     |
| ------------------------------- | --------- |
| Plaster background              | `#F3EBDD` |
| Paper reading surface           | `#FFF9EF` |
| Primary ink                     | `#252A25` |
| Cobalt gate and primary actions | `#3159BE` |
| Foliage                         | `#48634A` |
| Terracotta decoration           | `#B9674F` |
| Honey light decoration          | `#E9B96C` |
| Evening background              | `#182522` |

Use foliage, terracotta, and light primarily as material colors; verify all actual text and controls independently. For evening mode, develop a complete readable palette rather than mechanically inverting daytime colors.

Retain Space Grotesk for readable content if it suits the final composition. Consider one restrained editorial serif for warm display headings. Use Space Mono sparingly for technical labels. Handwritten marks may decorate recipe notes, but never carry essential information. Limit font payload and keep body text comfortable at 16–18 pixels on phones.

Let Addis Ababa appear through truthful location copy and the warmth of the environment. Avoid invented cultural biography, borrowed sacred motifs, or generic “African” decoration. Personal cultural details should come from existing material or future input from me.

## 4 Organize the home

Every destination must have a poetic room name and a plain-language label. Visitors should never need to decode the metaphor.

| Place               | Navigation label | What visitors find                         | Signature object                            |
| ------------------- | ---------------- | ------------------------------------------ | ------------------------------------------- |
| Front gate and yard | Welcome          | Identity, proposition, immediate routes    | Cobalt gate with a readable nameplate       |
| Main room           | About            | Introduction, experience, working style    | Portrait, writing desk, experience shelf    |
| Workshop            | Projects         | Selected work and technical case studies   | Project objects on a broad workbench        |
| Kitchen             | In progress      | Current work and supported next steps      | Recipe notebook and three preparation areas |
| Garden              | Learning         | Foundations, current learning, connections | Trellis and labeled planting beds           |
| Reading nook        | Credentials      | Certificates and algorithm practice        | Accessible bookshelf and framed records     |
| Veranda             | Contact          | Invitation to collaborate and public links | Writing table overlooking the courtyard     |

The reading nook belongs inside the main room, keeping the house compact. The veranda is visible from the courtyard. Do not expand this into a maze of unnecessary rooms.

### The first viewport

Show both my identity and the house immediately. Use a spacious composition with readable introduction copy beside or above the illustrated gate and courtyard. A path leads from the foreground into the house; the kitchen window and workshop opening hint at what is inside.

Proposed copy:

> Welcome to my corner of the internet.
>
> I’m Yonas. I build intelligent systems—and make them useful in the real world.
>
> AI engineer · Software builder · Addis Ababa

Primary action: **Explore my work**. Secondary action: **Come inside**. A visible **Contact** link must also be available. Put “Yonas” and a concise professional role on the gate nameplate, using actual HTML text.

The gate must never be a splash-screen barrier. The page is readable and navigable immediately. No loading percentage as entertainment, no mandatory “enter” click, no forced tutorial, and no instruction to use WASD.

## 5 Design each room as a meaningful scene

### Front gate and courtyard

The gate opens gently when the visitor chooses “Come inside.” The view settles into the courtyard, where the destinations are visibly labeled. The courtyard acts as the overview, orientation point, and visual identity of the site.

Use stepping stones and a planted border to lead the eye, not to make users click individual steps. The map and normal navigation always provide direct access. A garden leaf may shift as the gate moves; keep this a small connected detail rather than a particle explosion.

### Main room

Create an inviting reading composition with a portrait, a desk, books, and generous wall space. Show my name, role, location, a short personal introduction, and actual experience. The architecture frames the content; the text itself stays on clean, flat surfaces.

An experience shelf can organize Nexora, iCog Labs, A2SV, and education into readable entries. Do not invent dates to make a timeline. “How I work” opens a short notebook with supported ideas about first-principles thinking, teaching, and delivery.

The portrait should feel like a personal presence in the room, not a corporate headshot pasted onto a generic component.

### Workshop

Make this the most substantial professional destination. Place a small number of distinct project objects on a workbench. Give each object an always-visible title, purpose, and status. A visitor should immediately understand which object leads to which project.

Nexora IMS could use a miniature architectural model of a school system. MM2 could use a carefully drawn graph instrument. These are illustrative metaphors, not fabricated product screenshots.

Selecting a project opens a proper case-study route with a readable editorial layout. Carry over the selected object, color, or label as a short visual transition. Present the problem, my responsibility, status, engineering decisions, actual evidence, limitations, and lessons. Include source or demo links only when verified. Preserve existing project URLs wherever possible.

Use screenshots of real interfaces when available. Illustrations establish atmosphere; actual artifacts establish credibility.

### Kitchen

This is the conceptual heart of the home: **What’s cooking**. Warm light and a tiny amount of steam make the room feel active. The recipe notebook presents current work without implying real-time updates.

Translate kitchen language into useful project information:

| Kitchen language | Actual information                         |
| ---------------- | ------------------------------------------ |
| Recipe           | Project or experiment                      |
| Ingredients      | Tools and technical ideas                  |
| On the counter   | Exploration or preparation, when supported |
| On the stove     | Work in progress                           |
| Ready to serve   | A verified shipped result                  |
| Next step        | A documented next action, if available     |

Use only supported current work. Digital Examination & Analysis is current work, with MM2 and Zikuala also explicitly in progress. Show last-updated dates only when known. Do not create fake progress percentages, completion timers, heat gauges pretending to measure progress, or automatically changing activity messages.

On focus or selection, a recipe page lifts slightly and its details appear in a clean reading area. The steam remains decorative. The kitchen should communicate the state of the work even with all animation removed.

### Garden

Represent learning as cultivation without assigning arbitrary skill scores. Studied foundations sit in established planting beds; current learning appears near a trellis or nursery bench. Plant size must not imply a measured proficiency level.

Keep topic labels visible. Selecting a topic reveals a short supported description, a relevant project, or a real learning artifact. For example, pattern mining connects back to MM2; machine-learning foundations connect to the supplied coursework and algorithm practice. Group the existing learning topics so the garden does not become a forest of floating technology logos.

The signature interaction is a **thread of understanding**: selecting a topic highlights a fine route through the trellis to its associated project. Show the same relationship in text. Trigger this on keyboard focus or deliberate selection as well as pointer interaction. Do not imply relationships that the content does not support.

### Reading nook

Present credentials as readable records arranged beside a bookshelf or a small gallery wall. Each entry shows title and provider before opening. Reuse the existing credential viewer where useful, with proper dialog behavior and a direct document link.

Algorithm practice may appear as a notebook page containing the shared coding profile snapshot and external profile links. Do not infer a capture date. Keep it secondary to shipped work. Avoid a trophy room that overwhelms the personal atmosphere.

### Veranda

End with an open, quiet composition facing the garden. The contact invitation should feel like sitting down for a conversation.

Proposed heading: **There’s room for another good idea.**

Supporting text can invite engineering work, research collaboration, or a thoughtful technical conversation. Use existing public email and social links. A **Write to Yonas** action opens the actual mail link, and a secondary action copies the address with clear feedback. Do not pretend a message has been sent. Add a form only if a working submission service is actually implemented and verified.

## 6 Make exploration effortless

Support two equally polished paths through the same content:

- **Explore the home:** a spatial overview and room illustrations with obvious, labeled destinations.
- **Quick view:** a compact editorial overview of identity, projects, experience, and contact, reachable in one action.

These are presentations of shared content, not two separately maintained portfolios. Quick view must feel intentionally designed and remain available without JavaScript.

Keep a restrained navigation bar visible: **Home, Projects, In progress, About, Contact**, plus an accessible **House map** control. Learning and credentials remain reachable through the map and relevant sections. The current location is always apparent. Use normal links, real URLs, browser history, meaningful page titles, and shareable destinations.

The map opens a small labeled floor plan with a text list of the same destinations. It is an orientation aid, never the only navigation. Close controls and Escape behavior must be predictable.

Keep ordinary vertical scrolling. Do not capture the scroll wheel to drive a camera or force visitors through a fixed tour. Visitors may jump directly from the gate to any room. Room transitions must work between any two destinations, even if that uses a simple fade instead of a literal journey through the house.

Direct links should open directly at their content without replaying the gate sequence. Back should restore the previous room and sensible scroll position. Never animate through the whole house just to reach a case study.

## 7 Choreograph a few exceptional moments

Concentrate the highest craft in three interactions: the gate opening into the courtyard, the project object resolving into a case study, and the garden connection illuminating a real piece of work. Other motion should support these moments.

| Interaction       | Motion direction                                                                 | Approximate duration | Reduced motion                                |
| ----------------- | -------------------------------------------------------------------------------- | -------------------- | --------------------------------------------- |
| Initial arrival   | Scene becomes visible immediately; light settles softly                          | 300–500 ms           | Immediate display                             |
| Gate entry        | Gate rotates on its hinge; courtyard expands slightly                            | 600–800 ms           | Immediate destination or short opacity change |
| Room selection    | Small translation and crossfade; matching doorway or object maintains continuity | 350–550 ms           | Immediate content                             |
| Project selection | Selected object visually becomes the case-study masthead                         | 350–500 ms           | Standard navigation                           |
| Object focus      | Gentle elevation, outline, and readable label emphasis                           | 120–180 ms           | Outline and color only                        |
| Recipe details    | Page lifts a few pixels; details appear                                          | 180–250 ms           | Immediate details                             |
| Garden connection | One fine path illuminates toward related evidence                                | 400–600 ms           | Static highlighted path and text              |
| Day and evening   | Materials and light transition together                                          | 450–700 ms           | Immediate palette change                      |

Treat durations as tuning ranges, not reasons to delay navigation. New actions interrupt or replace pending transitions cleanly. Never queue camera motions or trap input until a decorative sequence ends. Focus and URL state must remain correct during rapid navigation.

Limit ambient motion to two or three subtle elements in the visible scene: a leaf cluster, kitchen steam, or a soft curtain. Pause offscreen and background-tab animation. Provide a visible motion control; reduced-motion preferences should disable looping ambience by default. Avoid large continuous parallax and moving reading surfaces.

An optional evening toggle can be shaped like a porch light, accompanied by a text label. Persist a visitor’s explicit choice locally. Keep the default warm daylight and do not add location permission or a clock dependency.

Sound is off by default. Omit it from the first implementation unless the visual experience is already complete. Any later sound requires an explicit opt-in and independent mute control.

## 8 Add personal surprises sparingly

Small discoveries may reward attention without carrying essential information. A decorative cat might briefly look toward a selected room; a lamp may illuminate a real note; the house-map path may recall the symbolic graph in MM2. Choose at most two initially and make their illustration style match the house.

Do not invent a pet or imply that an illustrated animal belongs to me. No scavenger hunt to unlock my resume, no collectible achievements, no forced visitor account, no chat character interrupting the experience. There is no need to build every playful idea in this brief.

The strongest detail should be relational: a seedling in the garden connects to a recipe in the kitchen and eventually to a built object in the workshop. If the data does not establish that progression, present only the relationship that is supported.

## 9 Design mobile as its own composition

On a phone, make the experience a sequence of beautifully composed room vignettes with normal scrolling. Show a compact courtyard illustration above the introduction or directly beneath it. Do not shrink an entire desktop floor plan until labels become illegible.

Recompose each room around one signature object and readable content below it. Use large labeled links and touch targets of at least 44 by 44 CSS pixels where feasible. No hover-only instructions or precision tapping. Keep map access clear and ensure navigation never covers contact actions or focused content.

Reduce decorative layers, remove pointer parallax, and substitute static illustrations where needed. Avoid mandatory horizontal scrolling. Test at 320, 390, 768, 1024, and 1440 pixels, including short landscape viewports and browser zoom.

## 10 Build accessibility into the architecture

All room content must be semantic HTML. Decorative canvases, SVG layers, and image assets must not be the sole source of text, status, navigation, or project evidence. An interactive object is a real link or button with an accessible name and visible focus. Its art is decoration around that control.

Maintain a logical heading structure, a skip link, legible text, and WCAG AA contrast for text and controls. Use labels alongside colors and icons. Mark decorative illustration appropriately so screen readers do not enumerate every leaf.

For dialogs, implement focus entry, containment, Escape, and restoration. For navigation, manage focus so the new page or destination is understandable without unexpectedly moving focus during ordinary scrolling. Support browser zoom and text reflow without covering content.

The site must remain useful when JavaScript fails, animation is disabled, illustration assets are unavailable, or a visitor uses a keyboard or screen reader. The home metaphor is an enhancement around a complete portfolio.

## 11 Use a maintainable technical structure

Start with the existing Astro application. Keep content in shared typed modules and server-render meaningful pages. Use small interactive islands only where needed. Choose animation dependencies after inspecting the current stack; do not add multiple libraries for overlapping effects.

Suggested responsibilities, adaptable to the repository:

- `HomeScene`: courtyard art and labeled destination links.
- `RoomShell`: shared room structure, title, navigation, and reading area.
- `HouseMap`: accessible map and equivalent destination list.
- `ProjectObject`: illustrated project entry backed by real project data.
- `KitchenBoard`: supported current-work records and recipe details.
- `LearningGarden`: grouped learning content and explicit project connections.
- `ExperiencePreferences`: motion and day/evening settings.

Keep route state authoritative. Decorative scene state follows navigation, rather than controlling whether navigation is allowed. Avoid duplicating content in separate desktop, mobile, and quick-view data stores.

Preserve working project and credential URLs, public contact links, SEO metadata, sitemap behavior, and base-path handling. Inspect current deployment configuration before changing routing assumptions. Replace the previous visual system deliberately instead of stacking incompatible animation systems on top of it.

## 12 Make the art achievable

Create a compact asset plan before coding detailed scenes: one courtyard master composition, coordinated room vignettes, four project objects, a small foliage set, and reusable material textures. Lock perspective, shadow direction, line weight, and color treatment first.

For generated art, use one consistent art-direction brief and references. Generate background and foreground layers separately where needed. Keep all text out of generated imagery. Retain editable source assets when available and track rights for third-party materials.

If image tools are unavailable, create intentional SVG or CSS illustrations with the same architecture and palette. Do not substitute unrelated stock photos, emoji furniture, or generic placeholder cards. Keep decorative effects modest until the main house silhouette and room compositions are excellent.

Reusable illustration direction:

> An intimate courtyard home for a thoughtful software and AI engineer, elevated three-quarter architectural illustration, warm limestone plaster, cobalt metal gate, muted terracotta paving, walnut doors, climbing greenery, a softly glowing kitchen window, an open maker’s workshop, tactile but restrained surfaces, coherent afternoon light from the upper left, elegant asymmetry, quiet editorial composition, broad uncluttered areas for separate HTML text, shallow dimensional depth, handcrafted precision, no text, no logos, no watermark, no exaggerated cartoon proportions.

Adapt this direction consistently for each room rather than reinventing the style per asset.

## 13 Set performance targets before embellishment

Treat these as implementation targets to measure, not claims of achieved performance:

- Aim for LCP at or below 2.5 seconds, INP at or below 200 ms, and CLS at or below 0.1 under representative conditions. Distinguish lab diagnostics from real field measurements.
- Aim for no more than roughly 150 KB compressed initial JavaScript and 1 MB of initial visual assets. Document any justified exception and its measured impact.
- Prioritize the first scene and primary content. Lazy-load later room art and case-study media. Reserve dimensions to avoid layout shifts.
- Animate transforms and opacity where possible. Avoid continuous expensive blur, full-screen filters, and animation loops that update application state every frame.
- Make navigation usable before all decorative assets finish loading. Do not preload the entire house.

Use the repository’s existing checks, a production build, and browser validation. Record the tested environment. Mobile loading and responsiveness take precedence over decorative complexity.

## 14 Follow a disciplined build sequence

1. Inspect the existing application, content, assets, and local instructions. Identify preserved URLs, genuine evidence, and missing assets.
2. Establish the house composition, palette, typography, destination structure, and mobile layout. Make concrete choices without seeking approval for routine details.
3. Build one polished vertical slice: gate and courtyard to workshop to a real project case study, including the mobile and reduced-motion versions.
4. Validate that the slice feels like an authored home and that a visitor can reach project evidence immediately. Refine the art and hierarchy before multiplying rooms.
5. Build the main room, kitchen, garden, nook, and veranda using shared content and the established visual system.
6. Add the three signature transitions, then only the ambient details that improve the experience.
7. Verify keyboard behavior, direct links, browser back, rapid navigation, no-JavaScript content, reduced motion, zoom, touch interaction, and narrow layouts.
8. Run appropriate repository checks and inspect production desktop and mobile renders. Fix broken links, console errors, overflow, contrast problems, missing assets, and interaction failures.
9. Deliver the implementation with preview instructions, key screenshots, validation results, and any genuine unresolved content gaps. Do not publish or change hosting unless separately requested.

## 15 Evaluate the finished experience

The implementation is ready when all of these are true:

- Within five seconds, a visitor can identify Yonas, his professional role, and where to find projects or contact him.
- The first viewport unmistakably communicates a personal home with a yard, gate, garden, and inhabitable rooms.
- Projects and contact are reachable in one deliberate action from global navigation.
- The kitchen clearly communicates actual work in progress without invented freshness or progress.
- The workshop presents real technical substance, not only attractive project props.
- Every spatial destination has a readable plain-language label and a standard navigation equivalent.
- The three signature moments feel connected to the content and remain interruptible.
- Mobile feels intentionally composed. It does not resemble a miniaturized desktop game.
- Reduced-motion and no-JavaScript experiences retain the same essential information and routes.
- Day and evening states remain legible, and all contact actions work honestly.
- Existing valid URLs and content privacy are preserved.
- Visual assets share one perspective and material language, with no unfinished placeholders.
- Performance and accessibility results are measured and reported accurately.

The final impression should be: **I visited Yonas’s world, understood how he thinks, saw what he can build, and knew how to reach him.**

Build for that feeling. Be ambitious with composition and craft, precise with interaction, and honest with the work.
