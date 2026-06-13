import { PARTNERS, TYPE_COLORS } from '../data/partners';
import ScrollReveal from '../components/layout/ScrollReveal';

const ICONS = {
  bee: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="13" rx="5" ry="7" />
      <path d="M12 6V3" />
      <path d="M9 4.5C9 4.5 7 3 7 1" />
      <path d="M15 4.5C15 4.5 17 3 17 1" />
      <path d="M7 10h10" />
      <path d="M7 14h10" />
      <path d="M8.5 18.5C6 20 4 20 4 20s1-2 3.5-3.5" />
      <path d="M15.5 18.5C18 20 20 20 20 20s-1-2-3.5-3.5" />
    </svg>
  ),
  shop: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l1-5h16l1 5" />
      <path d="M3 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0" />
      <path d="M5 9v11h14V9" />
      <rect x="9" y="14" width="6" height="6" />
    </svg>
  ),
  herb: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12C12 12 8 10 6 6c4 0 6 6 6 6z" />
      <path d="M12 12C12 12 16 10 18 6c-4 0-6 6-6 6z" />
      <path d="M12 17C12 17 9 15 7 11c3.5 0 5 6 5 6z" />
      <path d="M12 17C12 17 15 15 17 11c-3.5 0-5 6-5 6z" />
    </svg>
  ),
  brew: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 010 8h-1" />
      <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  ),
};

export default function PartnersPage() {
  return (
    <div style={{ paddingTop: '8rem', background: 'var(--bark)', minHeight: '100vh' }}>
      <div className="sec" style={{ paddingTop: '2rem' }}>

        <ScrollReveal>
          <div className="sec-label">Партньори & Спонсори</div>
          <h2 className="sec-h2" style={{ maxWidth: 700 }}>
            Хората, с които{' '}
            <span className="h2-accent">изграждаме</span> това движение
          </h2>
          <p className="sec-body" style={{ maxWidth: 620, marginBottom: '5rem' }}>
            Медовник не работи сам. Зад всяка партида стоят производители,
            магазини и съмишленици, с които споделяме ценности —
            качество, занаят и автентичност.
          </p>
        </ScrollReveal>

        <div className="partners-grid">
          {PARTNERS.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 80}>
              <PartnerCard partner={p} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="partners-cta">
            <div className="partners-cta-inner">
              <div className="partners-cta-icon">⟡</div>
              <h3 className="partners-cta-title">Искаш да се присъединиш?</h3>
              <p className="partners-cta-body">
                Ако работиш с мед, билки, оборудване или просто обичаш
                медовината — пиши ни. Търсим партньори, с които да растем заедно.
              </p>
              <a
                href="mailto:medovnik@abv.bg"
                className="btn-primary"
                style={{ display: 'inline-block', textDecoration: 'none', marginTop: '0.5rem' }}
              >
                Свържи се с нас
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}

function PartnerCard({ partner }) {
  const colors = TYPE_COLORS[partner.type];
  return (
    <article className="partner-card">
      <div
        className="partner-badge"
        style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
      >
        {partner.typeLabel}
      </div>

      <div className="partner-icon" style={{ color: colors.text }}>
        {ICONS[partner.icon]}
      </div>

      <div className="partner-name">{partner.name}</div>
      <div className="partner-tagline">{partner.tagline}</div>
      <p className="partner-desc">{partner.description}</p>

      <div className="partner-divider" style={{ background: colors.border }} />
    </article>
  );
}
