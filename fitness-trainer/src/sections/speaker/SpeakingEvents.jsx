import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, cardVariant } from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { SPEAKING_EVENTS, SPEAKER_FORMATS } from '@/data/speaker';
import './SpeakingEvents.css';

const TYPE_LABEL = {
  conference: 'Конференция',
  summit:     'Саммит',
  corporate:  'Корпоративно',
  podcast:    'Подкаст',
};

export default function SpeakingEvents() {
  return (
    <>
      <section className="section section--dark speaking-events">
        <div className="container">
          <AnimatedSection>
            <SectionTitle
              label="Лектор"
              title="Говоря за това, което правя"
              subtitle="Практичен, ангажиращ лектор по теми за фитнес, хранене, психология на навиците и ефективност."
            />
          </AnimatedSection>

          <motion.div
            className="events__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {SPEAKING_EVENTS.map((ev) => (
              <motion.article key={ev.id} className="event-card" variants={cardVariant} whileHover={{ y: -5 }}>
                <div className="event-card__type">{TYPE_LABEL[ev.type] || ev.type}</div>
                <div className="event-card__body">
                  <div className="event-card__date">{ev.month} {ev.year}</div>
                  <h3 className="event-card__name">{ev.event}</h3>
                  <p className="event-card__topic">{ev.topic}</p>
                </div>
                <div className="event-card__footer">
                  <LocationIcon />
                  <span>{ev.location}</span>
                </div>
              </motion.article>
            ))}

            <motion.div className="event-card event-card--cta" variants={cardVariant}>
              <div className="event-card__cta-inner">
                <MicIcon />
                <h3 className="event-card__cta-title">Поканете ме за вашето събитие</h3>
                <p className="event-card__cta-text">
                  Свържете се с мен за семинари, корпоративни обучения, подкасти или фитнес събития.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section section--secondary speaker-formats">
        <div className="container">
          <AnimatedSection>
            <SectionTitle
              label="Формати"
              title="Как мога да помогна на вашата аудитория"
            />
          </AnimatedSection>
          <motion.div
            className="formats__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {SPEAKER_FORMATS.map((f) => (
              <motion.div key={f.title} className="format-card" variants={cardVariant}>
                <h3 className="format-card__title">{f.title}</h3>
                <p className="format-card__desc">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  );
}
