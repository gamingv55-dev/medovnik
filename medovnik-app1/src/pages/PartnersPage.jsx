import ScrollReveal from '../components/layout/ScrollReveal';

export default function PartnersPage() {
  return (
    <div style={{ paddingTop: '8rem', background: 'var(--bark)', minHeight: '100vh' }}>
      <div className="prt-wrap">

        <ScrollReveal>
          <div className="why-eyebrow" style={{ marginBottom: '1.4rem' }}>
            <i /><span>Партньори & Спонсори</span><i />
          </div>

          <h1 className="prt-h1">
            Хората, с които<br />
            <span className="prt-accent">изграждаме</span> това движение
          </h1>

          <p className="prt-lead">
            Медовник не работи сам. Зад всяка партида стоят производители,
            магазини и съмишленици — хора, с които споделяме едни и същи ценности.
            Качество, занаят и автентичност.
          </p>
        </ScrollReveal>

        <div className="prt-rule" />

        <div className="prt-grid">
          {[0, 1, 2, 3].map((i) => (
            <ScrollReveal key={i} delay={i * 70}>
              <PlaceholderCard />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="prt-footer">
            <div className="prt-footer-orn">✦</div>
            <p className="prt-footer-title">
              Искаш да работим заедно?
            </p>
            <p className="prt-footer-body">
              Ако работиш с мед, билки, оборудване или просто обичаш медовината —
              пиши ни. Търсим хора, с които да растем.
            </p>
            <a href="mailto:medovnik@abv.bg" className="prt-footer-link">
              medovnik@abv.bg
            </a>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}

function PlaceholderCard() {
  return (
    <article className="prt-card prt-card-empty">
      {/* Въртящ се border ефект */}
      <div className="prt-empty-border" aria-hidden="true" />

      {/* Ъглови декорации */}
      <span className="prt-corner prt-corner-tl" aria-hidden="true" />
      <span className="prt-corner prt-corner-tr" aria-hidden="true" />
      <span className="prt-corner prt-corner-bl" aria-hidden="true" />
      <span className="prt-corner prt-corner-br" aria-hidden="true" />

      {/* Централно съдържание */}
      <div className="prt-empty-inner">
        <div className="prt-empty-hex" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 3 L20 7.5 L20 16.5 L12 21 L4 16.5 L4 7.5 Z" />
            <line x1="12" y1="9" x2="12" y2="15" />
            <line x1="9" y1="12" x2="15" y2="12" />
          </svg>
        </div>
        <p className="prt-empty-label">Това може да сте вие</p>
        <span className="prt-empty-sub">Свържете се с нас →</span>
      </div>
    </article>
  );
}
