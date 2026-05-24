const G   = 'rgba(242,200,78,0.82)';
const GD  = 'rgba(242,200,78,0.38)';
const GF  = 'rgba(242,200,78,0.16)';
const F   = 'rgba(184,98,26,0.13)';

/* ── Viking Mead Pack — drinking horn + Valknut ───────────── */
export function VikingIllustration() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M70 37 Q70 26 50 25 Q30 24 20 37 Q16 45 20 53 Q30 63 50 61 Q70 59 70 49 Z"
        fill={F} stroke={G} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 45 Q12 50 14 63 Q16 70 20 72"
        stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="66" cy="29" r="4"   fill="rgba(255,255,255,0.05)" stroke={GD} strokeWidth="1"/>
      <circle cx="58" cy="24" r="3.5" fill="rgba(255,255,255,0.05)" stroke={GD} strokeWidth="1"/>
      <circle cx="72" cy="34" r="3"   fill="rgba(255,255,255,0.05)" stroke={GD} strokeWidth="1"/>
      <line x1="38" y1="25" x2="37" y2="60" stroke={GF} strokeWidth="0.9"/>
      <line x1="54" y1="26" x2="53" y2="59" stroke={GF} strokeWidth="0.9"/>
      {/* Valknut */}
      <polygon points="50,74 44,84 56,84" stroke={GD} strokeWidth="1.2" fill={F}/>
      <polygon points="43,80 37,90 49,90" stroke={GD} strokeWidth="1.2" fill={F}/>
      <polygon points="57,80 51,90 63,90" stroke={GD} strokeWidth="1.2" fill={F}/>
    </svg>
  );
}

/* ── Winter Spice Mead — snowflake + cinnamon strip ──────── */
export function WinterSpiceIllustration() {
  const cx = 50, cy = 45, R = 26, R2 = 15;
  const arms = Array.from({ length: 6 }, (_, i) => (i * 60 * Math.PI) / 180);
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {arms.map((a, i) => {
        const x2 = cx + R * Math.cos(a),  y2 = cy + R * Math.sin(a);
        const bx = cx + R2 * Math.cos(a), by = cy + R2 * Math.sin(a);
        const br = 9;
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
            <line x1={bx} y1={by}
              x2={bx + br * Math.cos(a + Math.PI / 3)}
              y2={by + br * Math.sin(a + Math.PI / 3)}
              stroke={G} strokeWidth="1.1" strokeLinecap="round"/>
            <line x1={bx} y1={by}
              x2={bx + br * Math.cos(a - Math.PI / 3)}
              y2={by + br * Math.sin(a - Math.PI / 3)}
              stroke={G} strokeWidth="1.1" strokeLinecap="round"/>
            <circle cx={x2} cy={y2} r="2.2" fill={GD}/>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="4.5" fill={F} stroke={G} strokeWidth="1.4"/>
      {/* Cinnamon stick at bottom */}
      <rect x="30" y="78" width="40" height="8" rx="4"
        fill="rgba(120,60,10,0.18)" stroke={GD} strokeWidth="1.2"/>
      <line x1="36" y1="78" x2="36" y2="86" stroke={GF} strokeWidth="0.8"/>
      <line x1="43" y1="78" x2="43" y2="86" stroke={GF} strokeWidth="0.8"/>
      <line x1="50" y1="78" x2="50" y2="86" stroke={GF} strokeWidth="0.8"/>
      <line x1="57" y1="78" x2="57" y2="86" stroke={GF} strokeWidth="0.8"/>
      <line x1="64" y1="78" x2="64" y2="86" stroke={GF} strokeWidth="0.8"/>
    </svg>
  );
}

/* ── Cherry Oak Reserve — cherries + barrel ──────────────── */
export function CherryOakIllustration() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Stems */}
      <path d="M37 43 C36 34 50 27 50 27 C50 27 64 22 63 41"
        stroke={G} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      {/* Leaf */}
      <path d="M50 27 C55 21 62 23 60 28 C57 33 50 27 50 27 Z"
        fill={F} stroke={GD} strokeWidth="1.1"/>
      <line x1="50" y1="27" x2="56" y2="26" stroke={GF} strokeWidth="0.8"/>
      {/* Cherry 1 */}
      <circle cx="36" cy="56" r="14"
        fill="rgba(110,18,18,0.28)" stroke={G} strokeWidth="1.5"/>
      <ellipse cx="31" cy="51" rx="4" ry="2.8" fill="rgba(255,255,255,0.09)"
        transform="rotate(-30 31 51)"/>
      {/* Cherry 2 */}
      <circle cx="64" cy="54" r="14"
        fill="rgba(110,18,18,0.28)" stroke={G} strokeWidth="1.5"/>
      <ellipse cx="59" cy="49" rx="4" ry="2.8" fill="rgba(255,255,255,0.09)"
        transform="rotate(-30 59 49)"/>
      {/* Barrel */}
      <rect x="36" y="82" width="28" height="13" rx="5" fill={F} stroke={GD} strokeWidth="1.1"/>
      <line x1="36" y1="87" x2="64" y2="87" stroke={GD} strokeWidth="0.8"/>
      <line x1="37" y1="91" x2="63" y2="91" stroke={GF} strokeWidth="0.7"/>
    </svg>
  );
}

/* ── Citrus Honey Brew — citrus slice + honey dipper ─────── */
export function CitrusHoneyIllustration() {
  const cx = 44, cy = 47, r = 26, ri = 22;
  const segs = Array.from({ length: 8 }, (_, i) => (i * 45 * Math.PI) / 180);
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Rind */}
      <circle cx={cx} cy={cy} r={r}
        fill="rgba(220,180,40,0.07)" stroke={G} strokeWidth="1.5"/>
      {/* Pith ring */}
      <circle cx={cx} cy={cy} r={ri}
        fill="rgba(220,180,40,0.05)" stroke={GD} strokeWidth="1"/>
      {/* Segments */}
      {segs.map((a, i) => (
        <line key={i}
          x1={cx} y1={cy}
          x2={cx + ri * Math.cos(a)} y2={cy + ri * Math.sin(a)}
          stroke={GF} strokeWidth="0.9"/>
      ))}
      <circle cx={cx} cy={cy} r="3" fill={F} stroke={GD} strokeWidth="1"/>
      {/* Honey dipper stick */}
      <line x1="74" y1="26" x2="84" y2="70"
        stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Dipper grooves */}
      {[0.45, 0.55, 0.65, 0.75].map((t, i) => {
        const dx = 74 + (84 - 74) * t;
        const dy = 26 + (70 - 26) * t;
        const ang = Math.atan2(70 - 26, 84 - 74) + Math.PI / 2;
        return (
          <line key={i}
            x1={dx - 4 * Math.cos(ang)} y1={dy - 4 * Math.sin(ang)}
            x2={dx + 4 * Math.cos(ang)} y2={dy + 4 * Math.sin(ang)}
            stroke={G} strokeWidth="1.2" strokeLinecap="round"/>
        );
      })}
      {/* Honey drip teardrop */}
      <path d="M82 74 Q85 80 82 86 Q79 80 82 74 Z"
        fill="rgba(242,200,78,0.25)" stroke={GD} strokeWidth="1" strokeLinejoin="round"/>
    </svg>
  );
}

export const FLAVOR_VISUAL = {
  201: VikingIllustration,
  202: WinterSpiceIllustration,
  203: CherryOakIllustration,
  204: CitrusHoneyIllustration,
};
