import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, cardVariant } from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { CERTIFICATES } from '@/data/certificates';
import './Certificates.css';

export default function Certificates() {
  return (
    <section className="section section--secondary certificates" id="certificates">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Сертификати"
            title="Квалификации"
            subtitle="Международно признати сертификати и специализации."
          />
        </AnimatedSection>

        <motion.div
          className="certificates__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {CERTIFICATES.map((cert) => (
            <motion.div key={cert.id} className="cert-card" variants={cardVariant} whileHover={{ y: -4 }}>
              <div className="cert-card__logo" style={{ '--accent': cert.accentColor }}>
                <span className="cert-card__abbr">{cert.abbr}</span>
              </div>
              <div className="cert-card__body">
                <span className="cert-card__org">{cert.org}</span>
                <h3 className="cert-card__name">{cert.name}</h3>
                <span className="cert-card__year">{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
