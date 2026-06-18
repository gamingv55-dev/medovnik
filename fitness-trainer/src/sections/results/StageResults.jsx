import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { COMPETITION_RESULTS } from '@/data/results';
import './StageResults.css';

export default function StageResults() {
  return (
    <section className="section section--secondary stage-results">
      <div className="container">
        <div className="stage-results__inner">
          <AnimatedSection className="stage-results__header">
            <span className="label-tag">Бодибилдинг сцена</span>
            <h2 className="stage-results__h2">
              Подготовка за<br />
              <em className="gold-text">сцената</em>
            </h2>
            <p className="stage-results__text">
              Като бивш национален шампион по класически бодибилдинг, знам точно какво
              изисква подготовката за сцена. Предлагам специализирани програми за всяка
              категория — от първо участие до международна сцена.
            </p>
            <div className="stage-results__services">
              <div className="stage-services__item">
                <strong>Competition Prep</strong>
                <span>12–20 седмична подготовка за конкретна категория</span>
              </div>
              <div className="stage-services__item">
                <strong>Off-Season план</strong>
                <span>Изграждане на мускулна маса между сезоните</span>
              </div>
              <div className="stage-services__item">
                <strong>Peak Week протокол</strong>
                <span>Финална седмица преди сцената — вода, въглехидрати, натрий</span>
              </div>
            </div>
            <Button as={Link} to="/contact?service=stage-prep" variant="primary">
              Запитване за подготовка
            </Button>
          </AnimatedSection>

          <AnimatedSection className="stage-results__timeline" delay={0.2}>
            <div className="stage-results__timeline-label">Лични резултати</div>
            {COMPETITION_RESULTS.map((c, i) => (
              <div key={c.id} className="stage-timeline__item">
                <div className="stage-timeline__year">{c.year}</div>
                <div className="stage-timeline__dot" />
                <div className="stage-timeline__content">
                  <div className="stage-timeline__placement">{c.placement}</div>
                  <div className="stage-timeline__comp">{c.competition}</div>
                  <div className="stage-timeline__cat">{c.category}</div>
                  <span className="stage-timeline__fed">{c.federation}</span>
                </div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
