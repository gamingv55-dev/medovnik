import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { FAQS } from '@/data/faq';
import './FAQ.css';

export default function FAQ() {
  return (
    <section className="section section--secondary faq">
      <div className="container">
        <AnimatedSection>
          <SectionTitle
            label="FAQ"
            title="Честo задавани въпроси"
          />
        </AnimatedSection>
        <div className="faq__list">
          {FAQS.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button
        className="faq-item__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="faq-item__q">{question}</span>
        <motion.span
          className="faq-item__icon"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-item__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="faq-item__answer">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
