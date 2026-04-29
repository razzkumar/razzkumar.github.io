import { OGImageRoute } from 'astro-og-canvas'
import { getCollection } from 'astro:content'

const posts = await getCollection('blog', ({ data }) => !data.draft)
const pages = Object.fromEntries(
  posts.map((p) => [
    p.slug,
    { title: p.data.title, description: p.data.description, tags: p.data.tags },
  ])
)

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  param: 'slug',
  getImageOptions: (_path, page) => ({
    title: page.title,
    description:
      Array.isArray(page.tags) && page.tags.length > 0
        ? page.tags.map((t: string) => `#${t}`).join('  ')
        : page.description,
    bgGradient: [
      [14, 11, 9],   // #0E0B09 — site warm-ink black
      [22, 18, 16],  // #161210 — soft ink
    ],
    border: { color: [217, 75, 31], width: 8 }, // #D94B1F orange
    padding: 60,
    font: {
      title: { color: [242, 235, 221], weight: 'SemiBold', size: 60 },    // #F2EBDD
      description: { color: [217, 164, 65], weight: 'Normal', size: 30 }, // #D9A441 gold
    },
  }),
})
