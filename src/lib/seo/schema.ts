// src/lib/seo/schema.ts
// JSON-LD builders. Every function returns a plain object that JSON.stringify
// will serialise inside <script type="application/ld+json">. No nulls in output.

import type { CollectionEntry } from 'astro:content'
import { PERSON, SITE } from './person'

const personRef = {
  '@type': 'Person',
  '@id': `${SITE.url}/#person`,
  name: PERSON.name,
} as const

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: PERSON.name,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    alternateName: PERSON.alternateName,
    jobTitle: PERSON.jobTitle,
    description: PERSON.description,
    url: PERSON.url,
    image: PERSON.image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: PERSON.addressLocality,
      addressCountry: PERSON.addressCountry,
    },
    sameAs: [...PERSON.sameAs],
  }
}

export function websiteSchema() {
  // T2-refix (iter 3): `potentialAction.SearchAction` has been removed.
  // Pagefind UI does not read query strings from URL on mount; shipping a
  // SearchAction template that lies about runtime behaviour invites Google to
  // ignore the rich result. Re-add once URL-driven Pagefind state is wired.
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE.url}/#person` },
  }
}

export function blogSchema(posts: CollectionEntry<'blog'>[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE.url}/blog/#blog`,
    name: 'razzkumar — Writing',
    description: 'Notes on cloud, platform engineering, and tooling.',
    url: `${SITE.url}/blog/`,
    publisher: { '@id': `${SITE.url}/#person` },
    inLanguage: 'en-US',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      '@id': `${SITE.url}/blog/${p.slug}/#post`,
      headline: p.data.title,
      description: p.data.description,
      datePublished: p.data.pubDate.toISOString(),
      ...(p.data.updatedDate
        ? { dateModified: p.data.updatedDate.toISOString() }
        : {}),
      url: `${SITE.url}/blog/${p.slug}/`,
      author: personRef,
      keywords: p.data.tags.join(', '),
    })),
  }
}

export function blogPostingSchema(post: CollectionEntry<'blog'>) {
  const url = `${SITE.url}/blog/${post.slug}/`
  const ogImage = `${SITE.url}/og/${post.slug}.png`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    headline: post.data.title,
    description: post.data.description,
    image: ogImage,
    datePublished: post.data.pubDate.toISOString(),
    ...(post.data.updatedDate
      ? { dateModified: post.data.updatedDate.toISOString() }
      : { dateModified: post.data.pubDate.toISOString() }),
    author: { ...personRef, url: PERSON.url },
    publisher: { '@id': `${SITE.url}/#person` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    keywords: post.data.tags.join(', '),
    inLanguage: 'en-US',
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}
