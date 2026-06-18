import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import './HomeCTA.css';

export default function HomeCTA() {
  return (
    <section className="home-cta section--dark">
      <div className="home-cta__bg" />
      <div className="container">
        <AnimatedSection className="home-cta__inner">
          <span className="label-tag">Следваща стъпка</span>
          <h2 className="home-cta__h2">
            Готов ли си да<br />
            <em className="gold-text">започнеш?</em>
          </h2>
          <p className="home-cta__sub">
            Запиши безплатна консултация. Без обвързване, без скрити такси.
            Само един разговор — и вземаме решение заедно.
          </p>
          <div className="home-cta__actions">
            <Button as={Link} to="/contact" variant="primary">
              Запази безплатна консултация
            </Button>
            <Button as={Link} to="/services" variant="ghost">
              Виж услугите
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
