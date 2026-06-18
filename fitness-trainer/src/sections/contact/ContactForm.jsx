import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import './ContactForm.css';

const GOALS = [
  'Отслабване',
  'Качване на маса',
  'Подобряване на форма',
  'Подготовка за сцена',
  'Хранителен режим',
  'Общо здраве и тонус',
];

const SERVICE_GOAL_MAP = {
  'online-coaching': 'Отслабване',
  'personal-training': 'Подобряване на форма',
  'nutrition': 'Хранителен режим',
  'full-plan': 'Отслабване',
  'stage-prep': 'Подготовка за сцена',
};

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: '', phone: '', email: '', goal: '', message: '' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const service = searchParams.get('service');
    if (service && SERVICE_GOAL_MAP[service]) {
      setForm((f) => ({ ...f, goal: SERVICE_GOAL_MAP[service] }));
    }
  }, [searchParams]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <section className="section section--dark contact-form">
        <div className="container">
          <div className="contact__success">
            <div className="contact__success-icon">✓</div>
            <h2 className="contact__success-title">Запитването е изпратено!</h2>
            <p>Ще се свържа с теб до 24 часа.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--dark contact-form" id="contact">
      <div className="container">
        <div className="contact__grid">
          <AnimatedSection className="contact__info">
            <span className="label-tag">Контакт</span>
            <h2 className="contact__h2">
              Нека поговорим<br />
              <em className="gold-text">за твоите цели</em>
            </h2>
            <p className="contact__intro">
              Попълни формата или се свържи с мен директно.
              Безплатна консултация — без задължения.
            </p>
            <ul className="contact__details">
              <li>
                <PhoneIcon />
                <a href="tel:+359881234567">+359 88 123 45 67</a>
              </li>
              <li>
                <EmailIcon />
                <a href="mailto:victor.kostov@gmail.com">victor.kostov@gmail.com</a>
              </li>
              <li>
                <InstaIcon />
                <a href="https://instagram.com/victor.kostov.fit" target="_blank" rel="noreferrer">@victor.kostov.fit</a>
              </li>
            </ul>
          </AnimatedSection>

          <AnimatedSection className="contact__form-wrap" delay={0.15}>
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Ime</label>
                  <input id="name" type="text" placeholder="Иван Иванов" value={form.name} onChange={set('name')} required />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Телефон</label>
                  <input id="phone" type="tel" placeholder="+359 88..." value={form.phone} onChange={set('phone')} />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="email">Имейл</label>
                <input id="email" type="email" placeholder="ivan@example.com" value={form.email} onChange={set('email')} required />
              </div>
              <div className="form-field">
                <label htmlFor="goal">Цел</label>
                <select id="goal" value={form.goal} onChange={set('goal')} required>
                  <option value="" disabled>Избери цел...</option>
                  {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="message">Съобщение</label>
                <textarea id="message" rows={5} placeholder="Разкажи ми повече за себе си и твоите цели..." value={form.message} onChange={set('message')} />
              </div>
              <Button type="submit" variant="primary" disabled={status === 'sending'} className="contact__submit">
                {status === 'sending' ? 'Изпращане...' : 'Изпрати запитване'}
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.36 2 2 0 0 1 3.6 1.1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.1z"/></svg>;
}
function EmailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function InstaIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>;
}
