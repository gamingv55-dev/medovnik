import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, cardVariant } from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { COMPETITION_RESULTS } from '@/data/results';
import './CompetitionHistory.css';

const PLACEMENT_COLOR = {
  '1-во място': '#c9a84c',
  '2-ро място': '#a0a0a0',
  '3-то място': '#a0522d',
};

export default function CompetitionHistory() {
  return (
    <section className="section section--dark competition" id="competition">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Бодибилдинг сцена"
            title="Спортна история"
            subtitle="Преди да стана треньор, бях спортист. Тази история е основата на моята работа."
            align="left"
          />
        </AnimatedSection>

        <div className="competition__layout">
          <AnimatedSection className="competition__intro">
            <p className="competition__text">
              Участвах активно в класическия бодибилдинг от 2016 до 2022 г. под егидата на
              Българска федерация по бодибилдинг (BBBF) и IFBB. Националната титла от 2020 г.
              е моят личен пик — и резултат от години дисциплина, наука и отдаденост.
            </p>
            <p className="competition__text">
              Тази опит е безценен при работата с клиенти, стремящи се към сцената.
              Знам какво изисква подготовката — физически, психологически, диетично.
            </p>
            <div className="competition__stage-cta">
              <div className="competition__stage-badge">
                <TrophyIcon />
                <span>Подготовка за сцена</span>
              </div>
              <p>
                Помагам на клиенти да се подготвят за тяхното първо — или следващо —
                участие в бодибилдинг, физик или фитнес категории.
              </p>
              <Button as={Link} to="/contact?service=stage-prep" variant="outline">
                Запитване за сцена →
              </Button>
            </div>
          </AnimatedSection>

          <motion.div
            className="competition__results"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {COMPETITION_RESULTS.map((c) => (
              <motion.div key={c.id} className="competition__card" variants={cardVariant}>
                <div
                  className="competition__placement"
                  style={{ color: PLACEMENT_COLOR[c.placement] || 'var(--color-text-muted)' }}
                >
                  {c.placement}
                </div>
                <div className="competition__card-body">
                  <div className="competition__year-badge">{c.year}</div>
                  <h3 className="competition__comp-name">{c.competition}</h3>
                  <p className="competition__category">{c.category}</p>
                  <span className="competition__fed">{c.federation}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  );
}
