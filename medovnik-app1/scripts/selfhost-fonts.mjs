/**
 * Self-host the Google Fonts used by Медовник.
 *
 * Reads the Google-generated CSS (google-fonts.css, fetched with a Chrome UA so
 * we get woff2), keeps ONLY the subsets the site actually renders
 * (latin, latin-ext, cyrillic, cyrillic-ext — no greek/vietnamese), downloads
 * each woff2 into public/fonts/, and emits public/fonts/fonts.css with the src
 * URLs rewritten to local /fonts/ paths.
 *
 * unicode-range, font-weight, font-style and font-display:swap are preserved
 * verbatim, so rendering is byte-for-byte identical to the Google version —
 * just served from our own origin (no external request chain).
 *
 * Run with:  node scripts/selfhost-fonts.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const KEEP = new Set(['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext']);
const css = readFileSync('google-fonts.css', 'utf8');
mkdirSync('public/fonts', { recursive: true });

// Split into "/* subset */ @font-face {...}" units.
const blocks = css.split('/*').slice(1).map((b) => '/*' + b);
const out = [];
const preload = [];
let downloaded = 0;

for (const block of blocks) {
  const subset = block.match(/\/\*\s*([a-z-]+)\s*\*\//)?.[1];
  if (!subset || !KEEP.has(subset)) continue;

  const family = block.match(/font-family:\s*'([^']+)'/)[1];
  const weight = block.match(/font-weight:\s*(\d+)/)[1];
  const style = block.match(/font-style:\s*(\w+)/)[1];
  const url = block.match(/url\((https:\/\/[^)]+\.woff2)\)/)[1];

  const slug = family.toLowerCase().replace(/\s+/g, '-');
  const file = `${slug}-${weight}-${style}-${subset}.woff2`;

  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(`public/fonts/${file}`, buf);
  downloaded++;

  out.push(block.replace(url, `/fonts/${file}`).trim());

  // Above-the-fold hero sub-paragraph = Cormorant Garamond italic 400.
  if (family === 'Cormorant Garamond' && weight === '400' && style === 'italic'
      && (subset === 'cyrillic' || subset === 'latin')) {
    preload.push(`/fonts/${file}`);
  }
}

writeFileSync('public/fonts/fonts.css', out.join('\n\n') + '\n');
console.log(`Downloaded ${downloaded} woff2 files -> public/fonts/`);
console.log('Preload candidates (Cormorant Garamond italic 400):');
preload.forEach((p) => console.log('  ' + p));
