import { readFileSync, writeFileSync, statSync } from 'node:fs';

let html = readFileSync('index.html', 'utf8');
const faces = readFileSync('public/fonts/fonts.css', 'utf8').trim();

// Match the Google preconnect + stylesheet block regardless of CRLF/spacing.
const re = /[ \t]*<link rel="preconnect"[\s\S]*?rel="stylesheet"\s*\/>/;
if (!re.test(html)) throw new Error('Google Fonts block not found');

const preload = [
  '/fonts/cormorant-garamond-400-italic-cyrillic.woff2',
  '/fonts/cormorant-garamond-400-italic-latin.woff2',
]
  .map((f) => `    <link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n');

const indented = faces.split('\n').map((l) => (l ? '      ' + l : l)).join('\n');
const block =
  preload +
  '\n\n    <!-- Self-hosted fonts (was Google Fonts) — identical files, no external request chain -->\n' +
  '    <style>\n' +
  indented +
  '\n    </style>';

html = html.replace(re, block);
writeFileSync('index.html', html);

console.log('index.html size:', statSync('index.html').size, 'bytes');
console.log('google refs remaining:', (html.match(/googleapis|gstatic/g) || []).length);
console.log('preload links:', (html.match(/rel="preload"/g) || []).length);
console.log('@font-face inlined:', (html.match(/@font-face/g) || []).length);
