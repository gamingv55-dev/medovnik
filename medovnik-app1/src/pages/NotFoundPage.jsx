import { Link } from 'react-router-dom';
import { HoneyJarIcon } from '../components/ui/Icons';

export default function NotFoundPage() {
  return (
    <main style={{
      minHeight: '100vh',
      paddingTop: '8rem',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', gap: '1.2rem',
    }}>
      <div style={{ color: 'var(--honey)' }}><HoneyJarIcon size={72} /></div>
      <h1 className="sec-h2">404 · Страницата я няма</h1>
      <p style={{
        color: 'var(--text)', fontStyle: 'italic',
        fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem',
      }}>
        Може би медът се е разлял по пътя. Ела при нас в началото.
      </p>
      <Link to="/" className="btn-primary">← Към началото</Link>
    </main>
  );
}
