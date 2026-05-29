/**
 * One-shot asset optimizer for Медовник.
 *
 * Goal: cut LCP / Speed Index without touching layout, structure or visuals.
 *   1. Product & flavoring photos: PNG -> WebP at NATIVE resolution (q80).
 *      Native res is kept on purpose so the product lightbox (max 90vw) stays
 *      pixel-for-pixel identical — only the byte size changes.
 *   2. Logo: resized to 512px (it is never displayed larger than 160px) and
 *      recompressed as PNG in place, so favicon / og:image / component imports
 *      keep working with zero code changes.
 *   3. The UniSans Heavy font embedded in global.css is re-encoded from inline
 *      base64 OTF to inline base64 WOFF2 — same glyphs, ~3x smaller, still
 *      inline so there is no FOUT and no extra request.
 *
 * Run with:  node scripts/optimize-assets.mjs
 */
import sharp from 'sharp';
import { compress } from 'wawoff2';
import { readFileSync, writeFileSync, statSync, existsSync, rmSync } from 'node:fs';

const kb = (n) => (n / 1024).toFixed(0) + ' KB';
const sizeOf = (p) => (existsSync(p) ? statSync(p).size : 0);

// 1. Photographic images -> WebP at native resolution.
const photos = ['public/kit1.png', 'public/kit2.png', 'public/viking.png', 'public/winter-spice.png'];
let before = 0, after = 0;
for (const src of photos) {
  const out = src.replace(/\.png$/, '.webp');
  const inSize = sizeOf(src);
  await sharp(src).webp({ quality: 80, effort: 6 }).toFile(out);
  const outSize = sizeOf(out);
  before += inSize; after += outSize;
  rmSync(src); // ref now points at .webp; drop the heavy original from the deploy
  console.log(`${src.padEnd(28)} ${kb(inSize).padStart(8)} -> ${kb(outSize).padStart(8)}  (${out})`);
}

// 2. Logo -> 512px, recompressed PNG, in place (keeps .png path everywhere).
for (const logo of ['public/logo.png', 'src/assets/logo.png']) {
  const inSize = sizeOf(logo);
  const buf = await sharp(logo)
    .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
  writeFileSync(logo, buf);
  before += inSize; after += buf.length;
  console.log(`${logo.padEnd(28)} ${kb(inSize).padStart(8)} -> ${kb(buf.length).padStart(8)}`);
}

// 3. Inline OTF font in global.css -> inline WOFF2.
const cssPath = 'src/styles/global.css';
let css = readFileSync(cssPath, 'utf8');
const m = css.match(/url\(data:font\/otf;base64,([A-Za-z0-9+/=]+)\)\s*format\('opentype'\)/);
if (m) {
  const otf = Buffer.from(m[1], 'base64');
  const woff2 = Buffer.from(await compress(otf));
  const replacement = `url(data:font/woff2;base64,${woff2.toString('base64')}) format('woff2')`;
  css = css.replace(m[0], replacement);
  writeFileSync(cssPath, css);
  before += otf.length; after += woff2.length;
  console.log(`${'global.css font (OTF->WOFF2)'.padEnd(28)} ${kb(otf.length).padStart(8)} -> ${kb(woff2.length).padStart(8)}`);
} else {
  console.log('font: no inline OTF found (already converted?)');
}

console.log('\nTOTAL'.padEnd(29) + `${kb(before).padStart(8)} -> ${kb(after).padStart(8)}  (${(100 - after / before * 100).toFixed(1)}% smaller)`);
