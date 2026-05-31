/**
 * Safe partial CSS split for Медовник.
 *
 * Moves the page-scoped blocks that never appear on the homepage out of the
 * monolithic global.css and into per-route stylesheets that Vite emits as
 * separate chunks (cssCodeSplit is on), so the initial load no longer ships
 * Shop/Community styles it doesn't use.
 *
 *   • Shop-only:      PRODUCTS / ADDONS  +  HONEY CARD … Lightbox   -> shop.css
 *   • Community-only: COMMUNITY section                              -> community.css
 *
 * Deliberately LEFT in global.css (shared / uncertain ownership):
 *   Cart qty controls (also used by the always-mounted cart drawer),
 *   Testimonials (homepage + reviews), modals, nav, hero, footer, media queries.
 *
 * Idempotent: if the markers are already gone it just ensures the imports exist.
 * Aborts (exit 1) on any unexpected ordering so a bad slice can never ship.
 *
 * Run with:  node scripts/split-css.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const CSS = 'src/styles/global.css';
const SHOP = 'src/styles/shop.css';
const COMMUNITY = 'src/styles/community.css';

const findLine = (lines, pred) => lines.findIndex(pred);

function ensureImport(file, importLine) {
  if (!existsSync(file)) { console.log(`! ${file} missing — cannot add import`); return; }
  let src = readFileSync(file, 'utf8');
  if (src.includes(importLine)) { console.log(`= import already in ${file}`); return; }
  src = importLine + '\n' + src;
  writeFileSync(file, src);
  console.log(`+ added import to ${file}`);
}

let lines = readFileSync(CSS, 'utf8').split('\n');

const iProducts     = findLine(lines, l => l.trim() === '/* PRODUCTS */');
const iCartQty      = findLine(lines, l => l.includes('Cart qty controls'));
const iHoney        = findLine(lines, l => l.includes('HONEY CARD'));
const iCommunity    = findLine(lines, l => l.trim() === '/* COMMUNITY */');
const iTestimonials = findLine(lines, l => l.trim() === '/* TESTIMONIALS */');

const allFound = [iProducts, iCartQty, iHoney, iCommunity, iTestimonials].every(i => i >= 0);

if (!allFound) {
  console.log('Markers not all present — assuming already split. Ensuring imports only.');
} else {
  // Sanity: strict ordering, or abort without writing anything.
  const ordered = iProducts < iCartQty && iCartQty < iHoney
               && iHoney < iCommunity && iCommunity < iTestimonials;
  if (!ordered) {
    console.error('ABORT: CSS section markers are out of expected order.');
    process.exit(1);
  }

  const shopA     = lines.slice(iProducts, iCartQty);      // PRODUCTS/ADDONS
  const shopB     = lines.slice(iHoney, iCommunity);       // HONEY CARD … Lightbox
  const community = lines.slice(iCommunity, iTestimonials);// COMMUNITY

  const header = (name) => `/* ${name} — split out of global.css; loaded only with its route chunk. */\n`;
  writeFileSync(SHOP, header('Shop styles') + shopA.concat('', shopB).join('\n') + '\n');
  writeFileSync(COMMUNITY, header('Community styles') + community.join('\n') + '\n');

  // New global = head + (cart-qty block kept) + tail(from Testimonials on).
  const newGlobal = [
    ...lines.slice(0, iProducts),
    ...lines.slice(iCartQty, iHoney),
    ...lines.slice(iTestimonials),
  ].join('\n');
  writeFileSync(CSS, newGlobal);

  console.log(`shop.css      <- ${shopA.length + shopB.length} lines`);
  console.log(`community.css <- ${community.length} lines`);
  console.log(`global.css     : ${lines.length} -> ${newGlobal.split('\n').length} lines`);
}

// Drop the now-unused expensive SVG blur filter reference, if present anywhere.
for (const f of [CSS, SHOP, COMMUNITY]) {
  if (!existsSync(f)) continue;
  const before = readFileSync(f, 'utf8');
  const after = before.replace(/\s*filter:\s*url\(#hxglow\)[^;}]*;/g, '');
  if (after !== before) { writeFileSync(f, after); console.log(`- stripped url(#hxglow) from ${f}`); }
}

ensureImport('src/pages/ShopPage.jsx', "import '../styles/shop.css';");
ensureImport('src/pages/CommunityPage.jsx', "import '../styles/community.css';");

console.log('done.');
