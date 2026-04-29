// scripts/build-og-default.mjs
// One-shot: 1200×630 default OG image for portfolio + blog index.
// Palette mirrors src/pages/og/[slug].ts (#0E0B09 → #161210 gradient, #D94B1F border).
// Run with: node scripts/build-og-default.mjs   (or `pnpm build:assets`)
//
// `sharp` is declared in package.json:devDependencies (^0.33.0) — explicit,
// reproducible, no createRequire dance required.
import sharp from 'sharp'

const W = 1200, H = 630
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0E0B09"/>
      <stop offset="1" stop-color="#161210"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="4" y="4" width="${W - 8}" height="${H - 8}" fill="none" stroke="#D94B1F" stroke-width="8"/>
  <text x="80" y="180" font-family="ui-monospace, Menlo, monospace" font-size="36" fill="#D94B1F" font-weight="700">~/razzkumar</text>
  <text x="80" y="320" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="78" font-weight="600" fill="#F2EBDD">Raj Kumar Rai Danuwar</text>
  <text x="80" y="400" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="44" font-weight="500" fill="#D9A441">Lead Software Engineer</text>
  <text x="80" y="470" font-family="ui-monospace, Menlo, monospace" font-size="28" fill="#C8BFAE">DevOps · SRE · AI infrastructure · Full-stack</text>
  <text x="80" y="560" font-family="ui-monospace, Menlo, monospace" font-size="24" fill="#8A8073">razzkumar.github.io</text>
</svg>
`
await sharp(Buffer.from(svg)).png().toFile('public/og-default.png')
const meta = await sharp('public/og-default.png').metadata()
console.log('og-default.png', meta.width + 'x' + meta.height)
