import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer } from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { PROCESS_STEPS } from '@/data/process';
import { ServiceIcon } from './ServiceIcon';
import './HowWeWork.css';

const stepVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function HowWeWork() {
  return (
    <section className="section section--secondary how-we-work" id="how-we-work">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="Как работим"
            title="Пътят към резултата"
            subtitle="Ясна, структурирана система — от първия разговор до устойчивата трансформация."
          />
        </AnimatedSection>

        <motion.div
          className="process__steps"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {PROCESS_STEPS.map((step, i) => (
            <motion.div key={step.num} className="process__step" variants={stepVariant}>
              <div className="process__step-circle">
                <span className="process__step-num">{step.num}</span>
              </div>
              {i < PROCESS_STEPS.length - 1 && (
                <div className="process__connector" aria-hidden="true" />
              )}
              <div className="process__step-icon">
                <ServiceIcon name={step.icon} size={28} />
              </div>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
