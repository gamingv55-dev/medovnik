import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, cardVariant } from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { TESTIMONIALS } from '@/data/testimonials';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section className="section section--dark testimonials">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Отзиви"
            title="Какво казват клиентите"
          />
        </AnimatedSection>

        <motion.div
          className="testimonials__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {TESTIMONIALS.map((t) => (
            <motion.article key={t.id} className="tcard" variants={cardVariant} whileHover={{ y: -4 }}>
              <div className="tcard__quote-mark">"</div>
              <p className="tcard__text">{t.text}</p>
              <div className="tcard__footer">
                <Stars count={t.rating} />
                <div className="tcard__author-block">
                  <span className="tcard__author">{t.author}</span>
                  <span className="tcard__detail">{t.detail}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stars({ count }) {
  return (
    <div className="stars" aria-label={`${count} от 5 звезди`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}
