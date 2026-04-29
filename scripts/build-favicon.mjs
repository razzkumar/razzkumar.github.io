// scripts/build-favicon.mjs
// One-shot: rasterises public/favicon.svg into ICO (32×32) + apple-touch-icon (180×180).
// Run with: node scripts/build-favicon.mjs   (or `pnpm build:assets`)
//
// `sharp` is declared in package.json:devDependencies (^0.33.0) so the bare
// import below is reproducible across fresh clones, regardless of whether
// Astro keeps sharp as a direct dep or moves it to optionalDependencies.
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'

const svg = await readFile('public/favicon.svg')

// 180×180 apple-touch-icon
await sharp(svg).resize(180, 180).png().toFile('public/apple-touch-icon.png')

// 32×32 PNG, then wrap as ICO. Modern browsers + Windows 10+ accept PNG-in-ICO.
const png32 = await sharp(svg).resize(32, 32).png().toBuffer()
const ico = Buffer.alloc(6 + 16 + png32.length)
// ICONDIR
ico.writeUInt16LE(0, 0)        // reserved
ico.writeUInt16LE(1, 2)        // type = icon
ico.writeUInt16LE(1, 4)        // count = 1
// ICONDIRENTRY
ico.writeUInt8(32, 6)          // width  (0 means 256; we use 32)
ico.writeUInt8(32, 7)          // height
ico.writeUInt8(0, 8)           // colour palette
ico.writeUInt8(0, 9)           // reserved
ico.writeUInt16LE(1, 10)       // colour planes
ico.writeUInt16LE(32, 12)      // bits per pixel
ico.writeUInt32LE(png32.length, 14) // image size
ico.writeUInt32LE(22, 18)      // offset
png32.copy(ico, 22)
await writeFile('public/favicon.ico', ico)
console.log('favicon.ico + apple-touch-icon.png written')
