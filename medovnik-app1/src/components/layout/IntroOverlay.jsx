import { useEffect, useState } from 'react';
const logo = '/logo.png';

// ── Pointy-top hexagon grid math ──────────────────────────────
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
const R     = 44;
const W     = R * Math.sqrt(3);
const H     = R * 2;
const ROW_H = H * 0.75;
const COLS  = isMobile ? 12 : 19;
const ROWS  = isMobile ? 9  : 14;
const GRID_W = (COLS + 0.5) * W;
const GRID_H = ROWS * ROW_H + H * 0.25;
const CX = GRID_W / 2;
const CY = GRID_H / 2;

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
}

const HEXES = (() => {
  const list = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = col * W + (row % 2 ? W / 2 : 0) + W / 2;
      const y = row * ROW_H + R;
      const dist = Math.sqrt((x - CX) ** 2 + (y - CY) ** 2);
      list.push({ x, y, dist, key: `${row}-${col}` });
    }
  }
  return list;
})();

const MAX_D      = Math.max(...HEXES.map(h => h.dist));
const VOID_RATIO  = 0.20;
const FRAME_RATIO = 0.32;

export default function IntroOverlay({ onDone }) {
  const [phase, setPhase] = useState('init');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const raf = requestAnimationFrame(() => setPhase('enter'));
    const t1  = setTimeout(() => setPhase('zoom'),  1900);
    const t2  = setTimeout(() => setPhase('fade'),  2600);
    const t3  = setTimeout(() => { onDone?.(); },   3300);
    return () => {
      document.body.style.overflow = '';
      cancelAnimationFrame(raf);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, [onDone]);

  const isZoomed = phase === 'zoom' || phase === 'fade';
  const logoOut  = phase === 'zoom' || phase === 'fade';

  return (
    <div className={`intro intro-${phase}`} aria-hidden="true">

      {/* Honeycomb grid with void in centre */}
      <div className={`intro-hive${isZoomed ? ' intro-hive-zoom' : ''}`}>
        <svg
          className="intro-svg"
          viewBox={`0 0 ${Math.round(GRID_W)} ${Math.round(GRID_H)}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="hxglow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {phase !== 'init' && HEXES.map(h => {
            if (h.dist < MAX_D * VOID_RATIO) return null;
            const delay   = (h.dist / MAX_D) * 1100;
            const isFrame = h.dist < MAX_D * FRAME_RATIO;
            return (
              <polygon
                key={h.key}
                className={`intro-cell${isFrame ? ' intro-cell-frame' : ''}`}
                points={hexPoints(h.x, h.y, R - 1.5)}
                style={{ animationDelay: `${delay}ms` }}
              />
            );
          })}
        </svg>
      </div>

      {/* Logo in the clear centre void */}
      {phase !== 'init' && (
        <div className={`intro-logo-wrap${logoOut ? ' intro-logo-out' : ''}`}>
          <img
            src={logo}
            alt="Медовник"
            className="intro-logo-img"
            draggable={false}
            fetchpriority="high"
            decoding="async"
          />
        </div>
      )}
    </div>
  );
}
