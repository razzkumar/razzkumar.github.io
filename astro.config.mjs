// @ts-check
import { defineConfig } from 'astro/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import pagefind from 'astro-pagefind'
import tailwindcss from '@tailwindcss/vite'
// R12 fix — single-source-of-truth for site URL. Importing SITE here avoids
// drift between `astro.config.mjs:site` and `src/lib/seo/person.ts:SITE.url`
// (the JSON-LD/canonical/og:url builder source). One literal, one bug class
// removed.
// R12-polish (iter 3): drop the `.ts` extension. Vite/Astro's resolver picks
// up `.ts` automatically and avoids the Vite-SSR fallback path that an
// explicit `.ts` import in a `.mjs` config triggers on every `astro` CLI
// invocation.
import { SITE } from './src/lib/seo/person'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// R1 mitigation (ADR-002 Option A, refined post-iter-3): preload blog post
// dates so the synchronous serialize hook can look up frontmatter dates by
// slug. The Astro `astro:content` virtual module is not bootstrapped at
// config-load time — neither static `import { getCollection }` nor dynamic
// `await import('astro:content')` resolves cleanly. We bypass that whole
// lifecycle issue by reading the markdown frontmatter directly via fs +
// a tiny YAML-line regex. This is a build-time read of in-repo files,
// no astro lifecycle dependency, no extra deps.
import { readdirSync, readFileSync } from 'node:fs'

const buildTime = new Date().toISOString()
const blogLastmod = new Map()
try {
  const blogDir = path.resolve(__dirname, 'src/content/blog')
  const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'))
  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const raw = readFileSync(path.join(blogDir, file), 'utf8')
    const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---/)
    const fm = fmMatch?.[1]
    if (!fm) continue
    const draft = /^draft:\s*true\s*$/m.test(fm)
    if (draft) continue
    const updatedMatch = fm.match(/^updatedDate:\s*([^\s#]+)/m)
    const pubMatch = fm.match(/^pubDate:\s*([^\s#]+)/m)
    const dateStr = updatedMatch?.[1] ?? pubMatch?.[1]
    if (!dateStr) continue
    const d = new Date(dateStr)
    if (Number.isFinite(d.getTime())) {
      blogLastmod.set(slug, d.toISOString())
    }
  }
} catch (err) {
  // If src/content/blog is missing entirely, all URLs fall back to buildTime.
  console.warn('[sitemap] blog frontmatter scan failed:', (err instanceof Error ? err.message : String(err)))
}

export default defineConfig({
  site: SITE.url,
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/og/'),
      serialize(item) {
        const m = item.url.match(/\/blog\/([^\/]+)\/$/)
        if (m && blogLastmod.has(m[1])) {
          item.lastmod = blogLastmod.get(m[1])
        } else {
          item.lastmod = buildTime
        }
        return item
      },
    }),
    pagefind(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    assetsInclude: ['**/*.svg'],
  },
  build: {
    format: 'directory',
  },
})
