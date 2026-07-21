# Yonas — Intelligence Workshop Portfolio

A fast, static, evidence-led portfolio for Yonas: AI Engineer, software builder, and technical trainer in Addis Ababa.

## Stack

- Astro and strict TypeScript
- Local Space Grotesk / Space Mono font assets
- Semantic HTML, modern CSS, and small progressive-enhancement scripts
- Static deployment with a GitHub Pages workflow

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Checks

```bash
npm run format:check
npm run check
npm run build
npm run validate
```

`npm run verify` runs formatting, type/content checks, the production build, internal-link validation, required-output checks, and a privacy guard for unpublished contact data.

## Deployment paths

The default local build uses `/`. For a GitHub project page, build with:

```bash
SITE_URL=https://yonayetol.github.io BASE_PATH=/my-portfolio npm run build
```

The included workflow applies those values automatically.

## Content and privacy

- `PORTFOLIO_DATA.md` is the internal content source of truth.
- `PORTFOLIO_PLAN.md` records design and execution decisions.
- The private phone number is intentionally absent from the public site.
- Project statuses are explicit; concepts and learning work are never presented as shipped products.
