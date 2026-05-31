/**
 * Perf image pass for Медовник — downscale + recompress only.
 *
 * Safe by construction:
 *   • Never enlarges (withoutEnlargement: true) so nothing gets blurry.
 *   • Keeps the same file paths / formats, so no code or markup changes.
 *   • Reads each file into a Buffer first, so sharp never holds a lock on the
 *     path we are about to overwrite (required on Windows).
 *
 * Targets:
 *   1. logo.webp — the LCP / above-the-fold mark. It is preloaded with
 *      fetchpriority=high yet displayed ≤280px (≤560px @2x); capping at 640px
 *      cuts it from ~170KB to a few tens of KB with zero visible change.
 *   2. Product / flavoring photos — only ever shown in a ≤90vw lightbox, so a
 *      1600px cap + q74 trims bytes with no visible change.
 *
 * Run with:  node scripts/perf-images.mjs
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';

const kb = (n) => (n / 1024).toFixed(1) + ' KB';

const jobs = [
  { file: 'public/logo.webp',          max: 640,  quality: 82 },
  { file: 'src/assets/logo.webp',      max: 640,  quality: 82 },
  { file: 'public/kit1.webp',          max: 1600, quality: 74 },
  { file: 'public/kit2.webp',          max: 1600, quality: 74 },
  { file: 'public/viking.webp',        max: 1600, quality: 74 },
  { file: 'public/winter-spice.webp',  max: 1600, quality: 74 },
];

let before = 0, after = 0;
for (const { file, max, quality } of jobs) {
  if (!existsSync(file)) { console.log(`${file.padEnd(28)} (missing, skipped)`); continue; }
  const input = readFileSync(file);          // read fully -> no file lock held
  const inSize = input.length;
  const meta = await sharp(input).metadata();
  const out = await sharp(input)
    .resize(max, max, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
  // Only write if we actually saved bytes.
  if (out.length < inSize) writeFileSync(file, out);
  const outSize = statSync(file).size;
  before += inSize; after += outSize;
  console.log(`${file.padEnd(28)} ${(meta.width + 'x' + meta.height).padStart(11)}  ${kb(inSize).padStart(10)} -> ${kb(outSize).padStart(10)}`);
}

console.log('\nTOTAL'.padEnd(41) + `${kb(before).padStart(10)} -> ${kb(after).padStart(10)}  (${(100 - after / before * 100).toFixed(1)}% smaller)`);
