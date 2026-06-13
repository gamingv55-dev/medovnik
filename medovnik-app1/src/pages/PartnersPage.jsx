import { PARTNERS } from '../data/partners';
import ScrollReveal from '../components/layout/ScrollReveal';

/* ── Background illustrations per partner (large, ghosted SVG paths) ── */
const BG_ILLUSTRATIONS = {
  1: (
    <svg viewBox="0 0 220 220" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="110" cy="140" rx="55" ry="65" />
      <ellipse cx="110" cy="140" rx="40" ry="50" />
      <path d="M80 110 Q110 95 140 110" />
      <path d="M75 125 Q110 108 145 125" />
      <path d="M73 140 Q110 122 147 140" />
      <path d="M75 155 Q110 138 145 155" />
      <path d="M80 170 Q110 154 140 170" />
      <path d="M110 75 L110 50" />
      <path d="M98 65 Q110 55 122 65" />
      <circle cx="110" cy="47" r="5" />
      <path d="M90 50 Q80 38 85 28" />
      <path d="M130 50 Q140 38 135 28" />
      <path d="M55 140 Q40 130 45 115" />
      <path d="M165 140 Q180 130 175 115" />
    </svg>
  ),
  2: (
    <svg viewBox="0 0 220 220" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M75 170 L75 90 Q75 80 85 80 L135 80 Q145 80 145 90 L145 170 Z" />
      <path d="M68 95 L152 95" />
      <path d="M68 80 Q75 65 110 65 Q145 65 152 80" />
      <ellipse cx="110" cy="65" rx="20" ry="8" />
      <path d="M95 95 L95 170" />
      <path d="M125 95 L125 170" />
      <path d="M75 130 L145 130" />
      <path d="M100 65 L100 50 Q100 42 110 42 Q120 42 120 50 L120 65" />
      <circle cx="110" cy="38" r="6" />
      <path d="M88 115 Q110 108 132 115" />
      <path d="M88 148 Q110 141 132 148" />
    </svg>
  ),
  3: (
    <svg viewBox="0 0 220 220" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M110 180 Q80 160 70 130 Q60 100 80 80 Q95 65 110 70 Q125 65 140 80 Q160 100 150 130 Q140 160 110 180Z" />
      <path d="M110 70 L110 40" />
      <path d="M95 55 Q110 45 125 55" />
      <path d="M85 90 Q110 78 135 90" />
      <path d="M80 110 Q110 96 140 110" />
      <path d="M82 130 Q110 118 138 130" />
      <path d="M88 150 Q110 140 132 150" />
      <path d="M110 40 Q95 28 82 32" />
      <path d="M110 40 Q125 28 138 32" />
      <circle cx="110" cy="36" r="4" />
    </svg>
  ),
  4: (
    <svg viewBox="0 0 220 220" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M70 170 L70 95 Q70 85 80 85 L140 85 Q150 85 150 95 L150 170 Z" />
      <ellipse cx="110" cy="85" rx="40" ry="12" />
      <path d="M70 120 L150 120" />
      <path d="M70 145 L150 145" />
      <path d="M95 85 L95 170" />
      <path d="M125 85 L125 170" />
      <path d="M150 100 L168 100 Q175 100 175 108 L175 128 Q175 136 168 136 L150 136" />
      <path d="M150 108 L168 108" />
      <path d="M150 128 L168 128" />
      <path d="M88 55 Q90 40 110 38 Q130 40 132 55" />
      <path d="M100 55 L100 85" />
      <path d="M120 55 L120 85" />
    </svg>
  ),
};

const HexIcon = ({ type }) => {
  const paths = {
    supplier: <path d="M12 3 L20 7.5 L20 16.5 L12 21 L4 16.5 L4 7.5 Z M12 8 L16 10.5 L16 15.5 L12 18 L8 15.5 L8 10.5 Z" />,
    partner:  <><path d="M12 3 L20 7.5 L20 16.5 L12 21 L4 16.5 L4 7.5 Z" /><path d="M9 12 L11 14 L15 10" /></>,
    sponsor:  <><path d="M12 3 L20 7.5 L20 16.5 L12 21 L4 16.5 L4 7.5 Z" /><path d="M12 7 L13.5 10.5 L17 11 L14.5 13.5 L15 17 L12 15.3 L9 17 L9.5 13.5 L7 11 L10.5 10.5 Z" /></>,
  };
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {paths[type] ?? paths.partner}
    </svg>
  );
};

const BeeDivider = () => (
  <div className="prt-divider">
    <div className="prt-divider-line" />
    <div className="prt-divider-bee">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="16" cy="18" rx="7" ry="9" />
        <line x1="9" y1="15" x2="23" y2="15" />
        <line x1="9" y1="19" x2="23" y2="19" />
        <path d="M16 9 L16 5" />
        <path d="M13 7 Q16 4 19 7" />
        <path d="M9 14 Q4 10 6 5" />
        <path d="M23 14 Q28 10 26 5" />
      </svg>
    </div>
    <div className="prt-divider-line" />
  </div>
);

export default function PartnersPage() {
  return (
    <div className="prt-page">

      {/* ── ТЪМНА ГОРНА СЕКЦИЯ ── */}
      <div className="prt-hero">
        <ScrollReveal>
          <div className="prt-eyebrow">
            <span className="prt-eyebrow-line" />
            <span className="prt-eyebrow-label">Партньори</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M12 3 L20 7.5 L20 16.5 L12 21 L4 16.5 L4 7.5 Z" />
            </svg>
            <span className="prt-eyebrow-label">&amp; Спонсори</span>
            <span className="prt-eyebrow-line prt-eyebrow-line-r" />
          </div>

          <h1 className="prt-h1">
            Хората, с които<br />
            <span className="prt-accent">изграждаме</span> това движение
          </h1>

          <p className="prt-lead">
            Медовник не работи сам. Зад всяка партида стоят производители,
            магазини и съмишленици — хора, с които споделяме едни и същи
            ценности. Качество, занаят и автентичност.
          </p>

          <div className="prt-hero-orn">◦</div>
        </ScrollReveal>
      </div>

      {/* ── РАЗДЕЛИТЕЛ С ПЧЕЛА ── */}
      <BeeDivider />

      {/* ── ПО-СВЕТЛА ДОЛНА СЕКЦИЯ ── */}
      <div className="prt-body">
        <div className="prt-grid">
          {PARTNERS.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 80}>
              <PartnerCard partner={p} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="prt-cta">
            <p className="prt-cta-title">Искаш да работим заедно?</p>
            <p className="prt-cta-body">
              Ако работиш с мед, билки, оборудване или просто обичаш медовината —
              пиши ни. Търсим хора, с които да растем.
            </p>
            <a href="mailto:medovnik@abv.bg" className="prt-cta-link">
              medovnik@abv.bg
            </a>
          </div>
        </ScrollReveal>
      </div>

    </div>
  );
}

function PartnerCard({ partner }) {
  return (
    <article className="prt-card">
      <div className="prt-card-bg" aria-hidden="true">
        {BG_ILLUSTRATIONS[partner.id]}
      </div>

      <div className="prt-card-left">
        <div className="prt-card-hex">
          <HexIcon type={partner.type} />
        </div>
      </div>

      <div className="prt-card-content">
        <div className="prt-card-type">{partner.typeLabel}</div>
        <h2 className="prt-card-name">{partner.name}</h2>
        <div className="prt-card-tagline">{partner.tagline}</div>
        <div className="prt-card-rule" />
        <p className="prt-card-desc">{partner.description}</p>

        {partner.link ? (
          <a href={partner.link} className="prt-card-link" target="_blank" rel="noopener noreferrer">
            {partner.linkLabel} <span>→</span>
          </a>
        ) : (
          <span className="prt-card-link prt-card-link-inactive">
            {partner.linkLabel} <span>→</span>
          </span>
        )}
      </div>
    </article>
  );
}
