import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../../data/testimonials';
import TestimonialCard from '../ui/TestimonialCard';

/**
 * Testimonials strip on the home page. Shows the curated three,
 * with a button to the full reviews page.
 */
export default function Testimonials() {
  return (
    <div className="testi-bg">
      <div className="sec">
        <div className="sec-label">Обратна връзка</div>
        <h2 className="sec-h2">
          Те вече са го <span className="h2-accent">направили</span>
        </h2>

        <div className="testi-grid">
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link className="btn-ghost" to="/reviews">Виж всички отзиви →</Link>
        </div>
      </div>
    </div>
  );
}
