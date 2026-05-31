import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';

/**
 * Closing call-to-action banner on the home page.
 */
export default function CtaBanner() {
  return (
    <div className="cta-banner">
      <img src={logo} className="cta-logo" alt="Медовник" />
      <h2 className="sec-h2" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Готов да започнеш?
      </h2>
      <p style={{
        color: 'var(--text)',
        fontStyle: 'italic',
        fontSize: '1.2rem',
        maxWidth: 540,
        margin: '0 auto 2.5rem',
        lineHeight: 1.75,
        fontFamily: "'Cormorant Garamond', serif",
      }}>
        Твоята първа медовина е само 30 дни далеч. Хиляди хора вече са го направили.
      </p>
      <Link
        className="btn-primary"
        to="/shop"
        style={{ fontSize: '0.95rem', padding: '1.3rem 3.2rem' }}
      >Вземи комплекта си сега</Link>
    </div>
  );
}
