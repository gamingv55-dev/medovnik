import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, cardVariant } from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { CLIENT_RESULTS } from '@/data/results';
import { TESTIMONIALS } from '@/data/testimonials';
import './ResultsTeaser.css';

const PREVIEW = CLIENT_RESULTS.slice(0, 3);
const QUOTE = TESTIMONIALS[0];

export default function ResultsTeaser() {
  return (
    <section className="section section--secondary results-teaser" id="results">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Резултати"
            title="Реални трансформации"
            subtitle="Числата говорят сами — реализирани с конкретен план и последователност."
          />
        </AnimatedSection>

        <motion.div
          className="results-teaser__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {PREVIEW.map((r) => (
            <motion.div key={r.id} className="result-card" variants={cardVariant} whileHover={{ y: -4 }}>
              <div className="result-card__before-after">
                <div className="result-card__img result-card__img--before">
                  {/* Replace with: <img src={`/images/${r.id}-before.webp`} alt="Преди" /> */}
                  <span className="result-card__img-label">Преди</span>
                </div>
                <div className="result-card__img result-card__img--after">
                  {/* Replace with: <img src={`/images/${r.id}-after.webp`} alt="След" /> */}
                  <span className="result-card__img-label">След</span>
                </div>
              </div>
              <div className="result-card__info">
                <div className="result-card__change">{r.change}</div>
                <div className="result-card__meta">
                  {r.secondChange} · {r.duration}
                </div>
                <div className="result-card__name">{r.name}</div>
              </div>
            </motion.div>
          ))}

          <motion.div className="testimonial-card" variants={cardVariant}>
            <div className="testimonial-card__quote-mark">"</div>
            <p className="testimonial-card__text">{QUOTE.text}</p>
            <div className="testimonial-card__footer">
              <Stars count={QUOTE.rating} />
              <div>
                <div className="testimonial-card__author">{QUOTE.author}</div>
                <div className="testimonial-card__detail">{QUOTE.detail}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <AnimatedSection className="results-teaser__cta">
          <Button as={Link} to="/results" variant="ghost">
            Виж всички резултати →
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Stars({ count }) {
  return (
    <div className="stars" aria-label={`${count} от 5 звезди`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}
