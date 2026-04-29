// src/lib/seo/person.ts
// Single source of truth for site identity. All meta tags + JSON-LD pull from here.
// Spec: .omc/specs/deep-dive-now-lets-work-on-proper.md (Person identity locked).

export const PERSON = {
  name: 'Raj Kumar Rai Danuwar',
  givenName: 'Raj Kumar',
  familyName: 'Rai Danuwar',
  alternateName: 'razzkumar',
  jobTitle: 'Lead Software Engineer',
  description:
    'Lead Software Engineer building resilient multi-region Kubernetes platforms — DevOps, SRE, AI infrastructure, full-stack.',
  url: 'https://razzkumar.github.io/',
  image: 'https://razzkumar.github.io/og-default.png',
  addressLocality: 'Kathmandu',
  addressCountry: 'NP',
  sameAs: [
    'https://github.com/razzkumar',
    'https://www.linkedin.com/in/drazzkumar/',
  ],
} as const

export const SITE = {
  name: 'razzkumar',
  description: PERSON.description,
  url: 'https://razzkumar.github.io',
  defaultOgImage: 'https://razzkumar.github.io/og-default.png',
  defaultOgImagePath: '/og-default.png',
  defaultOgImageAlt:
    'Raj Kumar Rai Danuwar (razzkumar) — Lead Software Engineer · DevOps · SRE · AI infrastructure',
  themeColor: '#0E0B09',
  locale: 'en_US',
  rssTitle: 'razzkumar — Writing',
} as const
