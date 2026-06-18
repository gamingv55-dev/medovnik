import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, cardVariant } from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { SERVICES } from '@/data/services';
import { ServiceIcon } from './ServiceIcon';
import './ServicesList.css';

export default function ServicesList() {
  return (
    <section className="section section--dark services-list">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Услуги"
            title="Изберете своя план"
            subtitle="Всяка програма е изградена индивидуално — няма шаблони, само резултати."
          />
        </AnimatedSection>

        <motion.ul
          className="services-list__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {SERVICES.map((service) => (
            <motion.li key={service.id} variants={cardVariant} whileHover={{ y: -6 }}>
              <article className={`service-detail-card${service.featured ? ' service-detail-card--featured' : ''}`}>
                {service.featured && <div className="service-detail-card__badge">Популярен избор</div>}
                <div className="service-detail-card__icon">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="service-detail-card__name">{service.name}</h3>
                <p className="service-detail-card__desc">{service.description}</p>
                <div className="service-detail-card__price">{service.price}</div>
                <Button
                  as={Link}
                  to={`/contact?service=${service.slug}`}
                  variant={service.featured ? 'primary' : 'ghost'}
                  className="service-detail-card__cta"
                >
                  Изпрати запитване
                </Button>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
