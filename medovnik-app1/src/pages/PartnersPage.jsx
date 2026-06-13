import { PARTNERS } from '../data/partners';
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
          {PARTNERS.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 70}>
              <PartnerCard partner={p} />
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

function PartnerCard({ partner }) {
  return (
    <article className="prt-card">
      <div className="prt-card-type">{partner.typeLabel}</div>
      <h2 className="prt-card-name">{partner.name}</h2>
      <div className="prt-card-tagline">{partner.tagline}</div>
      <p className="prt-card-desc">{partner.description}</p>
    </article>
  );
}
