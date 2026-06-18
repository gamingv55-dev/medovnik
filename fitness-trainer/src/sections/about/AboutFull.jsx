import AnimatedSection from '@/components/ui/AnimatedSection';
import './AboutFull.css';

const BULLETS = [
  'NSCA — Certified Strength & Conditioning Specialist',
  'Precision Nutrition Level 1 Coach',
  'Бивш национален шампион по класически бодибилдинг',
  'Над 500 успешно трансформирани клиента',
  'Специализация в хранително поведение и психология',
  'Фокус върху дългосрочни, устойчиви навици',
];

export default function AboutFull() {
  return (
    <section className="section section--dark about-full">
      <div className="container">
        <div className="about-full__grid">
          <AnimatedSection className="about-full__image-col">
            <div className="about-full__image">
              {/* Replace with: <img src="/images/trainer-full.webp" alt="Виктор Костов" /> */}
            </div>
            <div className="about-full__quote-block">
              <p className="about-full__quote">
                "Тялото ти е най-добрият проект, в който можеш да инвестираш."
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="about-full__content" delay={0.15}>
            <span className="label-tag">За мен</span>
            <h1 className="about-full__h1">
              Виктор Костов —<br />
              <em className="gold-text">Персонален треньор</em>
            </h1>
            <p className="about-full__text">
              Казвам се Виктор Костов. Посветих последните 10 години на разбирането
              на човешкото тяло — първо като бивш национален шампион по класически бодибилдинг,
              а после като сертифициран треньор и коуч с над 500 трансформирани клиента.
            </p>
            <p className="about-full__text">
              Вярвам, че няма универсална формула. Всеки човек е различен — различна история,
              различни навици, различен ритъм на живот. Затова всяка програма, която изграждам,
              е изцяло индивидуална и съобразена с реалността на клиента.
            </p>
            <p className="about-full__text">
              Моята цел не е да ти дам план за 12 седмици. Целта ми е да те науча да разбираш
              тялото си — как се храниш, как се тренираш, как се възстановяваш. Резултати, които
              не изчезват след края на програмата.
            </p>

            <div className="about-full__divider" />

            <h3 className="about-full__bullets-title">Квалификации и опит</h3>
            <ul className="about-full__bullets">
              {BULLETS.map((b) => (
                <li key={b} className="about-full__bullet">
                  <CheckIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="about-full__check" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
