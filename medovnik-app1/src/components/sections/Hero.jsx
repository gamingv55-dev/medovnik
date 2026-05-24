import { Link } from 'react-router-dom';

/**
 * Hero banner — first viewport on the home page.
 * Headline, lede paragraph, two CTAs, and a tiny "Скролни" hint.
 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <div className="hero-content">
        <h1 className="hero-h1" style={{ margin: '95px 0 32px' }}>
          Направи собствена
          <span className="h1-line">медовина у дома.</span>
        </h1>

        <p className="hero-sub" style={{ fontSize: 23 }}>
          Представи си момента — отваряш бутилка, която ти сам направи преди седмици.
          Наливаш в чаши на най-близките хора. Това не е просто питие, а истинско
          преживяване, споделено заедно.
        </p>

        <div className="hero-btns">
          <Link className="btn-primary" to="/shop">Разгледай комплектите</Link>
          <button
            className="btn-ghost"
            type="button"
            onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
          >Как работи</button>
        </div>
      </div>

      <div className="hero-scroll">
        <div style={{
          width: 1, height: 50,
          background: 'linear-gradient(180deg, var(--honey), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
        <span>Скролни</span>
      </div>
    </section>
  );
}
