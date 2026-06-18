import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import './AboutTeaser.css';

const BULLETS = [
  'NSCA сертифициран треньор',
  'Бивш национален шампион по класически бодибилдинг',
  'Над 500 трансформирани клиента',
  'Наука + практика = устойчиви резултати',
];

export default function AboutTeaser() {
  return (
    <section className="section section--secondary about-teaser" id="about">
      <div className="container">
        <div className="about-teaser__grid">
          <AnimatedSection className="about-teaser__image-wrap">
            <div className="about-teaser__image">
              {/* Replace with: <img src="/images/trainer-about.webp" alt="Виктор Костов" /> */}
            </div>
          </AnimatedSection>

          <AnimatedSection className="about-teaser__content" delay={0.15}>
            <span className="label-tag">За мен</span>
            <h2 className="about-teaser__h2">
              Вярвам, че тялото е<br />
              <em className="gold-text">най-добрият ти проект.</em>
            </h2>
            <p className="about-teaser__text">
              Казвам се Виктор Костов. Като бивш национален шампион по класически бодибилдинг
              и сертифициран треньор, помагам на хората да стигнат до реални, устойчиви резултати
              — без крайности и без празни обещания.
            </p>
            <p className="about-teaser__text">
              Комбинирам наука, дългогодишен опит и индивидуален подход, за да изградим
              програма, която работи за твоя живот — не за чужд.
            </p>
            <ul className="about-teaser__bullets">
              {BULLETS.map((b) => (
                <li key={b} className="about-teaser__bullet">
                  <CheckIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button as={Link} to="/about" variant="ghost">
              Научи повече за мен →
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="about-teaser__check-icon" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
