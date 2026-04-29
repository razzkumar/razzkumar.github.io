---
title: "Hello, blog"
description: "First post on the new Astro setup — exercising every feature in the kit."
pubDate: 2026-04-29
tags: [meta, astro, platform]
cover: /blog-covers/hello.png
coverAlt: "Welcome banner"
---

This is the first post on the new Astro stack. It exists to exercise every feature in the kit so we can be sure each piece is wired before real writing starts.

## What works on this page

This paragraph has **bold**, *italic*, and an [external link](https://astro.build). It also has inline `code`. Below is a fenced TypeScript block — Shiki should syntax-highlight it.

```ts
// Shiki must syntax-highlight this block.
export function hello(name: string): string {
  return `Hello, ${name}`
}
```

A short list:

- Reading time appears under the title.
- The OG image at `/og/hello-blog.png` is generated at build time.
- Giscus mounts at the bottom (lazy, on scroll into view).
- Pagefind indexes this file; searching for "Hello" on the index returns it.

## Why Astro

Less JavaScript on the wire. Static-by-default with React islands only where they earn their bytes. Build-time data baking instead of runtime fetches. Tailwind v4 via the Vite plugin, Shiki for code, and content collections for type-checked frontmatter.

That's the boring part. The interesting part is what comes next.
