import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, cardVariant } from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { SERVICES } from '@/data/services';
import { ServiceIcon } from '@/sections/services/ServiceIcon';
import './ServicesTeaser.css';

const FEATURED = SERVICES.filter((s) => s.featured);

export default function ServicesTeaser() {
  return (
    <section className="section section--dark services-teaser" id="services">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Услуги"
            title="Какво предлагам"
            subtitle="Персонализиран подход за всеки тип цел и начин на живот."
          />
        </AnimatedSection>

        <motion.ul
          className="services-teaser__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {SERVICES.map((service) => (
            <motion.li key={service.id} variants={cardVariant} whileHover={{ y: -6 }}>
              <div className={`service-card${service.featured ? ' service-card--featured' : ''}`}>
                <div className="service-card__icon">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="service-card__name">{service.name}</h3>
                <p className="service-card__desc">{service.description}</p>
                <div className="service-card__price">{service.price}</div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <AnimatedSection className="services-teaser__cta">
          <Button as={Link} to="/services" variant="ghost">
            Всички услуги и цени →
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
