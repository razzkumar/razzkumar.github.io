# razzkumar.github.io

Personal site of Rajkumar — portfolio at `/` and blog at `/blog`. Astro 5 + React 18 + Tailwind v4. Deployed to GitHub Pages from `main`.

## Stack

- [Astro 5](https://astro.build) — static-by-default, React islands where they earn their bytes.
- [React 18](https://react.dev) — only inside hydration islands (`client:load` for `Cursor`/`Navbar`/`Hero`; `client:visible` for everything else; static for `Footer`).
- [motion/react](https://motion.dev) — animations inside islands.
- [Tailwind v4](https://tailwindcss.com) via `@tailwindcss/vite` — CSS-first config in `src/styles/tailwind.css`.
- [Shiki](https://shiki.style) — syntax highlighting (`github-dark` theme, baked in by Astro).
- [Pagefind](https://pagefind.app) — static client-side search index for the blog.
- [astro-og-canvas](https://github.com/delucis/astro-og-canvas) — per-post OG images at build time.
- [@astrojs/rss](https://docs.astro.build/en/guides/rss/) + [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — feed and sitemap.
- [Giscus](https://giscus.app) — GitHub Discussions-backed comments (env-gated).
- [GitHub Actions](https://docs.github.com/actions) — daily cron + push-triggered build/deploy.

## Local

```sh
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # static dist/
pnpm preview      # serve dist/ for Lighthouse
pnpm check        # astro check (TypeScript + content collections)
```

Node 20+ recommended.

## Project layout

```
astro.config.mjs            integrations + Tailwind v4 + alias
src/
  pages/
    index.astro             portfolio (11 sections via Base layout)
    blog/index.astro        blog index + Pagefind search
    blog/[slug].astro       per-post page
    blog/tags/[tag].astro   per-tag listing
    og/[slug].ts            per-post OG image (build-time PNG)
    rss.xml.ts              feed
  layouts/
    Base.astro              Cursor + Navbar + Footer + slot
    BlogPost.astro          post chrome + Giscus
  components/               React islands
  components/blog/          PostCard, TagPill, Search, Giscus
  content/blog/             Markdown posts (frontmatter validated by Zod)
  content/config.ts         collection schema
  lib/github-stats.ts       build-time fetcher for GithubStats
  styles/                   tailwind.css + globals.css + theme.css + fonts.css
public/
  giscus-theme.css          Giscus dark theme matching site palette
.github/workflows/deploy.yml  push + 06:00 UTC daily cron → GH Pages
```

## Authoring a post

Create `src/content/blog/<slug>.md`:

```md
---
title: "My new post"
description: "Short summary used in OG meta and the index card."
pubDate: 2026-04-29
tags: [tag1, tag2]
draft: false
cover: /blog-covers/my-post.png
coverAlt: "Description"
---

Body in Markdown. Code blocks render via Shiki. Images use the Astro
asset pipeline. Drafts (`draft: true`) are excluded from the index,
RSS, sitemap, and OG generation.
```

Reading time, OG image, RSS entry, sitemap entry, Pagefind index entry, and Giscus comment thread are all derived automatically.

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and publishes via `actions/deploy-pages`. The 06:00 UTC daily cron rebuilds with fresh GitHub stats.

Repo settings to configure once:

- Settings → Pages → Source: **GitHub Actions**
- Settings → Secrets → `GH_STATS_TOKEN` (fine-grained PAT, public_repo:read) — optional but recommended (5000/hr vs 60/hr unauth).
- Settings → Variables → `GISCUS_REPO`, `GISCUS_REPO_ID`, `GISCUS_CATEGORY`, `GISCUS_CATEGORY_ID` — optional; comments stay disabled (silent fallback) until set.
