import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import './Hero.css';

const STATS = [
  { value: '500+', label: 'Клиента' },
  { value: '7+',   label: 'Години опит' },
  { value: '25 000+', label: 'Тренировки' },
  { value: '100%', label: 'Индивидуален подход' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__inner container">
        <div className="hero__content">
          <span className="label-tag hero__eyebrow">Персонален треньор</span>
          <h1 className="hero__h1">
            Тренирай умно.<br />
            <em>Живей силно.</em>
          </h1>
          <p className="hero__subtitle">
            Индивидуални програми за тренировки, хранене и навици,
            създадени около твоя живот и реалните ти цели.
          </p>
          <div className="hero__ctas">
            <Button as={Link} to="/contact" variant="primary">
              Запази безплатна консултация
            </Button>
            <Button as={Link} to="/services" variant="ghost">
              Виж услугите
            </Button>
          </div>
          <div className="hero__stats">
            {STATS.map(({ value, label }) => (
              <div key={label} className="hero__stat">
                <span className="hero__stat-value">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-placeholder">
            {/* Replace with: <img src="/images/trainer-hero.webp" alt="Виктор Костов" /> */}
            <div className="hero__image-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}
