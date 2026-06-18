import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { TRACKING_FEATURES } from '@/data/process';
import './Tracking.css';

const ICON_MAP = {
  dumbbell: '🏋️',
  food:     '🥗',
  habit:    '✅',
  graph:    '📈',
  check:    '💬',
};

export default function Tracking() {
  return (
    <section className="section section--dark tracking">
      <div className="container">
        <div className="tracking__grid">
          <AnimatedSection className="tracking__content">
            <span className="label-tag">Проследяване</span>
            <h2 className="tracking__h2">
              Виж прогреса си<br />
              <em className="gold-text">в реално време</em>
            </h2>
            <p className="tracking__text">
              Всичко е в ред — тренировки, хранене, навици и измервания.
              Проследяваме заедно, коригираме при нужда и знаеш точно
              накъде вървиш.
            </p>
            <ul className="tracking__feature-list">
              {TRACKING_FEATURES.map((f) => (
                <li key={f.name} className="tracking__feature-item">
                  <span className="tracking__feature-icon">{ICON_MAP[f.icon] || '•'}</span>
                  <div>
                    <strong>{f.name}</strong>
                    <span>{f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection className="tracking__dashboard-wrap" delay={0.2}>
            <div className="tracking__dashboard">
              <div className="tracking__dashboard-header">
                <div className="tracking__dots">
                  <span /><span /><span />
                </div>
                <span className="tracking__dashboard-title">Моят прогрес</span>
              </div>

              <div className="tracking__dashboard-hero">
                <div className="tracking__stat-big">
                  <span className="tracking__stat-val">-6.2 кг</span>
                  <span className="tracking__stat-period">тази седмица</span>
                </div>
                <div className="tracking__chart">
                  {[40, 55, 45, 70, 60, 80, 75].map((h, i) => (
                    <div key={i} className="tracking__bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              <div className="tracking__tiles">
                <div className="tracking__tile">
                  <span className="tracking__tile-val">12</span>
                  <span className="tracking__tile-label">тренировки</span>
                </div>
                <div className="tracking__tile">
                  <span className="tracking__tile-val">1 842</span>
                  <span className="tracking__tile-label">ккал днес</span>
                </div>
                <div className="tracking__tile tracking__tile--cta">
                  <span className="tracking__tile-val">Check-in</span>
                  <span className="tracking__tile-label">Готов за нова седмица?</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
