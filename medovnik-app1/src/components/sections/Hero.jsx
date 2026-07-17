import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ============================================================
   HERO — самостоятелен компонент.
   Всички стилове са ВГРАДЕНИ тук с префикс .mh- (уникални имена),
   затова НЕ зависи от global.css и не може да влезе в конфликт.
   Просто замени целия този файл — нищо друго не пипай.
   ============================================================ */

const HERO_CSS = `
.mh-hero { position: relative; width: 100%; height: 100vh; min-height: 600px; display: block; background: #0a0703; }
.mh-hero * { box-sizing: border-box; }
.mh-hero .mh-main { position: relative; width: 100%; height: 100%; display: block; }
.mh-hero .mh-bg { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
.mh-hero .mh-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top; z-index: 0; filter: blur(3px); transform: scale(1.03); }

.mh-orb { position: absolute; border-radius: 50%; pointer-events: none; z-index: 2; }
.mh-orb-1 { width: 90px; height: 90px; top: 28%; left: 58%; background: radial-gradient(circle, rgba(242,200,78,0.38) 0%, rgba(184,98,26,0.14) 55%, transparent 72%); animation: mh-fl1 9s ease-in-out infinite; }
.mh-orb-2 { width: 55px; height: 55px; top: 55%; left: 72%; background: radial-gradient(circle, rgba(255,220,100,0.32) 0%, rgba(212,131,31,0.12) 55%, transparent 70%); animation: mh-fl2 12s ease-in-out infinite; }
.mh-orb-3 { width: 120px; height: 120px; top: 15%; left: 78%; background: radial-gradient(circle, rgba(242,200,78,0.22) 0%, rgba(184,98,26,0.08) 55%, transparent 72%); animation: mh-fl3 15s ease-in-out infinite; }
.mh-orb-4 { width: 40px; height: 40px; top: 70%; left: 45%; background: radial-gradient(circle, rgba(255,210,80,0.42) 0%, rgba(212,131,31,0.15) 55%, transparent 70%); animation: mh-fl4 7s ease-in-out infinite; }
.mh-orb-5 { width: 65px; height: 65px; top: 40%; left: 88%; background: radial-gradient(circle, rgba(242,190,60,0.3) 0%, rgba(180,95,20,0.1) 55%, transparent 70%); animation: mh-fl5 11s ease-in-out infinite; }

@keyframes mh-fl1 { 0%,100%{transform:translate(0,0)} 30%{transform:translate(12px,-22px)} 65%{transform:translate(-8px,-12px)} }
@keyframes mh-fl2 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(-14px,-18px)} 70%{transform:translate(6px,-8px)} }
@keyframes mh-fl3 { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-10px,-16px)} 60%{transform:translate(14px,-24px)} }
@keyframes mh-fl4 { 0%,100%{transform:translate(0,0)} 35%{transform:translate(8px,-14px)} 75%{transform:translate(-6px,-20px)} }
@keyframes mh-fl5 { 0%,100%{transform:translate(0,0)} 45%{transform:translate(-12px,-10px)} 80%{transform:translate(10px,-18px)} }

.mh-hero .mh-grad { position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    linear-gradient(180deg, rgba(10,7,3,0.58) 0%, rgba(10,7,3,0) 17%),
    linear-gradient(0deg,   rgba(10,7,3,0.62) 0%, rgba(10,7,3,0) 22%),
    linear-gradient(90deg,  rgba(10,7,3,0.80) 0%, rgba(10,7,3,0.38) 32%, rgba(10,7,3,0) 56%); }

.mh-hero .mh-left { position: absolute; left: 5.5%; top: 58%; transform: translateY(-50%); width: 48%; z-index: 5; }
.mh-hero .mh-h1 { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 4vw; line-height: 1.1; letter-spacing: -0.01em; color: #faf3e0; margin: 0; }
.mh-hero .mh-h1 .mh-white { display: block; }
.mh-hero .mh-h1 .mh-line { display: block; padding-bottom: 0.16em; line-height: 1.18; background: linear-gradient(120deg, #f0b33b 0%, #d4831f 55%, #b8621a 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }

.mh-hero .mh-divider { width: 2.6vw; height: 2px; border-radius: 2px; background: linear-gradient(90deg, #f0b33b, #b8621a); margin: 2vw 0 1.8vw; }

.mh-hero .mh-sub { font-family: 'Manrope', sans-serif; font-weight: 400; font-size: 1.1vw; line-height: 1.8; color: #c7b69a; max-width: 32vw; margin: 0 0 2.8vw; }

.mh-hero .mh-btns { display: flex; align-items: center; gap: 1.6vw; flex-wrap: wrap; margin-bottom: 3.2vw; }
.mh-hero .mh-btn-primary { font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 0.88vw; letter-spacing: 0.13em; text-transform: uppercase; padding: 1.1vw 2vw; border-radius: 4px; cursor: pointer; text-decoration: none; white-space: nowrap; display: inline-block; background: linear-gradient(135deg, #d9b46a 0%, #bb8a3d 100%); color: #271705; border: none; }

.mh-hero .mh-what { position: relative; display: inline-flex; align-items: center; gap: 0.7rem; cursor: pointer; background: none; border: none; padding: 0; }
.mh-hero .mh-what-play { width: 2.4vw; height: 2.4vw; min-width: 36px; min-height: 36px; border-radius: 50%; border: 1px solid rgba(226,171,40,0.55); display: flex; align-items: center; justify-content: center; color: #e8c97a; flex-shrink: 0; transition: border-color 0.2s, background 0.2s; }
.mh-hero .mh-what.mh-open .mh-what-play { border-color: rgba(226,171,40,0.9); background: rgba(226,171,40,0.08); }
.mh-hero .mh-what-label { font-family: 'Manrope', sans-serif; font-weight: 500; font-size: 0.95vw; color: #e8c97a; }
.mh-hero .mh-what-tip { position: absolute; top: calc(100% + 14px); left: 0; width: 300px; background: rgba(10,6,2,0.97); border: 1px solid rgba(217,144,34,0.4); border-radius: 8px; padding: 1rem 1.2rem; font-family: 'Manrope', sans-serif; font-weight: 400; font-size: 0.85rem; line-height: 1.65; color: #c7b69a; opacity: 0; pointer-events: none; transform: translateY(-6px); transition: opacity 0.22s ease, transform 0.22s ease; z-index: 20; backdrop-filter: blur(8px); box-shadow: 0 12px 32px rgba(0,0,0,0.6); }
.mh-hero .mh-what-tip::before { content: ''; position: absolute; top: -6px; left: 22px; width: 10px; height: 10px; background: rgba(10,6,2,0.97); border-left: 1px solid rgba(217,144,34,0.4); border-top: 1px solid rgba(217,144,34,0.4); transform: rotate(45deg); }
.mh-hero .mh-what.mh-open .mh-what-tip { opacity: 1; pointer-events: auto; transform: translateY(0); }

.mh-hero .mh-badges { display: flex; gap: 2.8vw; }
.mh-hero .mh-badge { display: flex; align-items: center; gap: 0.9vw; }
.mh-hero .mh-badge-ico { width: 3.1vw; height: 3.1vw; min-width: 46px; min-height: 46px; border-radius: 50%; border: 1px solid rgba(226,171,40,0.4); display: flex; align-items: center; justify-content: center; color: #e8c97a; flex-shrink: 0; }
.mh-hero .mh-badge-ico svg { width: 46%; height: 46%; }
.mh-hero .mh-badge-lbl { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 0.92vw; letter-spacing: 0.03em; text-transform: uppercase; color: #f4ead7; line-height: 1.35; }

@media (max-width: 1024px) and (min-width: 861px) {
  .mh-hero .mh-h1 { font-size: 2.8vw; }
  .mh-hero .mh-sub { font-size: 1vw; max-width: 34vw; }
}
@media (max-width: 860px) {
  .mh-hero .mh-main { min-height: 100vh; }
  .mh-hero .mh-photo { object-position: 72% center; }
  .mh-hero .mh-grad { background: linear-gradient(180deg, rgba(10,7,3,0.8) 0%, rgba(10,7,3,0.6) 40%, rgba(10,7,3,0.95) 100%); }
  .mh-hero .mh-left { position: relative; left: 0; top: 0; transform: none; width: auto; max-width: 100%; padding: 7.5rem 1.4rem 2rem; }
  .mh-hero .mh-h1 { font-size: 2.4rem; }
  .mh-hero .mh-divider { width: 44px; margin: 1.3rem 0 1.2rem; }
  .mh-hero .mh-sub { font-size: 1rem; max-width: 30rem; margin-bottom: 1.6rem; }
  .mh-hero .mh-btns { gap: 1rem; margin-bottom: 1.8rem; }
  .mh-hero .mh-btn-primary { font-size: 0.78rem; padding: 1rem 1.5rem; }
  .mh-hero .mh-what-play { width: 40px; height: 40px; }
  .mh-hero .mh-what-label { font-size: 0.85rem; }
  .mh-hero .mh-badges { flex-wrap: wrap; gap: 1.4rem; }
  .mh-hero .mh-badge-ico { width: 40px; height: 40px; }
  .mh-hero .mh-badge-lbl { font-size: 0.68rem; }
}
`;

export default function Hero() {
  const [whatOpen, setWhatOpen] = useState(false);
  const whatRef = useRef(null);

  useEffect(() => {
    if (!whatOpen) return;

    const close = () => setWhatOpen(false);
    const handleClickOutside = (e) => {
      if (whatRef.current && !whatRef.current.contains(e.target)) close();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('scroll', close, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', close);
    };
  }, [whatOpen]);

  return (
    <section className="mh-hero">
      <style>{HERO_CSS}</style>

      <div className="mh-main">
        <div className="mh-bg">
          <img className="mh-photo" src="/hero-product.webp" srcSet="/hero-product-mobile.webp 768w, /hero-product.webp 1920w" sizes="100vw" width="1920" height="1280" alt="" aria-hidden="true" fetchPriority="high" />
          <div className="mh-grad" />
          <div className="mh-orb mh-orb-1" aria-hidden="true" />
          <div className="mh-orb mh-orb-2" aria-hidden="true" />
          <div className="mh-orb mh-orb-3" aria-hidden="true" />
          <div className="mh-orb mh-orb-4" aria-hidden="true" />
          <div className="mh-orb mh-orb-5" aria-hidden="true" />
        </div>

        <div className="mh-left" id="what">
          <h1 className="mh-h1">
            <span className="mh-white">Направи своята</span>
            <span className="mh-line">първа медовина</span>
          </h1>

          <div className="mh-divider" />

          <p className="mh-sub">
            Комплект с всичко необходимо, за да създадеш домашна медовина
            лесно, без специално оборудване и без предишен опит.
          </p>

          <div className="mh-btns">
            <Link className="mh-btn-primary" to="/shop">Разгледай комплектите</Link>

            <div
              className={`mh-what${whatOpen ? ' mh-open' : ''}`}
              ref={whatRef}
              role="button"
              tabIndex={0}
              onClick={() => setWhatOpen((open) => !open)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setWhatOpen((open) => !open); } }}
              aria-expanded={whatOpen}
            >
              <span className="mh-what-play" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </span>
              <span className="mh-what-label">Какво е медовина?</span>
              <div className="mh-what-tip">
                Медовината е една от най-древните алкохолни напитки в света — приготвя се от мед, вода и дрожди и наподобява вино.
                Ферментацията превръща натуралните захари в алкохол, а резултатът е напитка с богат,
                сладко-плодов вкус и мека текстура. Позната от хилядолетия в почти всяка култура по света.
              </div>
            </div>
          </div>

          <div className="mh-badges">
            <div className="mh-badge">
              <span className="mh-badge-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1.5-.7-2.3-1.3-3.2.4 2-1 2.7-1.7 1.7-.9-1.3.2-2.7-1-4C13 2.6 12.5 2.3 12 2Z"/><path d="M8 14c0 4 3 6 4 8 1-2 4-4 4-8"/></svg>
              </span>
              <span className="mh-badge-lbl">Натурални<br />съставки</span>
            </div>
            <div className="mh-badge">
              <span className="mh-badge-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5.5C4 4.5 7 4 9 5.2v13.3C7 17.3 4 17.8 2 18.8Z"/><path d="M22 5.5C20 4.5 17 4 15 5.2v13.3c2-1.2 5-.7 7 .3Z"/></svg>
              </span>
              <span className="mh-badge-lbl">Стъпка по стъпка<br />инструкции</span>
            </div>
            <div className="mh-badge">
              <span className="mh-badge-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5"/></svg>
              </span>
              <span className="mh-badge-lbl">Подходящо за<br />начинаещи</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
