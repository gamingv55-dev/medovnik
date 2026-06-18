import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, cardVariant } from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { CLIENT_RESULTS } from '@/data/results';
import './ClientResults.css';

export default function ClientResults() {
  return (
    <section className="section section--dark client-results">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Трансформации"
            title="Реални резултати"
            subtitle="Всеки клиент е различен. Всеки резултат е постигнат с конкретна, персонализирана програма."
          />
        </AnimatedSection>

        <motion.div
          className="client-results__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {CLIENT_RESULTS.map((r) => (
            <motion.article key={r.id} className="cr-card" variants={cardVariant} whileHover={{ y: -4 }}>
              <div className="cr-card__images">
                <div className="cr-card__img cr-card__img--before">
                  {/* Replace with: <img src={`/images/results/${r.id}-before.webp`} alt={`${r.name} преди`} /> */}
                  <div className="cr-card__img-badge">Преди</div>
                </div>
                <div className="cr-card__img cr-card__img--after">
                  {/* Replace with: <img src={`/images/results/${r.id}-after.webp`} alt={`${r.name} след`} /> */}
                  <div className="cr-card__img-badge cr-card__img-badge--after">След</div>
                </div>
              </div>
              <div className="cr-card__body">
                <div className="cr-card__metrics">
                  <div className="cr-card__change">{r.change}</div>
                  <div className="cr-card__second">{r.secondChange}</div>
                </div>
                <div className="cr-card__duration">{r.duration}</div>
                <blockquote className="cr-card__quote">"{r.quote}"</blockquote>
                <div className="cr-card__author">{r.name}, {r.age} г.</div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
