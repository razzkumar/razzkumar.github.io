import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  return rss({
    title: 'razzkumar — Writing',
    description: 'Notes on cloud, platform engineering, Kubernetes, and the tooling that ships them.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        link: `/blog/${post.slug}/`,
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        categories: post.data.tags,
      })),
  })
}
