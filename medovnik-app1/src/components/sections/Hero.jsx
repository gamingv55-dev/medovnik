import { Link } from 'react-router-dom';

/* ============================================================
   HERO — самостоятелен компонент.
   Всички стилове са ВГРАДЕНИ тук с префикс .mh- (уникални имена),
   затова НЕ зависи от global.css и не може да влезе в конфликт.
   Просто замени целия този файл — нищо друго не пипай.
   ============================================================ */

const HERO_CSS = `
@font-face {
  font-family: 'Beograd';
  src: url('/fonts/Beograd.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.mh-hero { position: relative; width: 100%; height: 100vh; min-height: 600px; display: block; overflow: hidden; }
.mh-hero * { box-sizing: border-box; }
.mh-hero .mh-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top; z-index: 0; filter: blur(2.5px); transform: scale(1.03); }

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
.mh-hero .mh-left { position: absolute; left: 4%; top: 22%; width: 42%; z-index: 5; }
.mh-hero .mh-h1 { font-family: 'Beograd', 'Cormorant Garamond', serif; font-weight: normal; font-size: 3.65vw; line-height: 1.07; letter-spacing: -0.01em; color: #faf3e0; margin: 0; }
.mh-hero .mh-h1 .mh-white { display: block; }
.mh-hero .mh-h1 .mh-line { display: block; padding-bottom: 0.16em; line-height: 1.18; background: linear-gradient(120deg, #f0b33b 0%, #d4831f 55%, #b8621a 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.mh-hero .mh-divider-row { display: flex; align-items: center; gap: 1rem; margin: 0.8vw 0 0.8vw; }
.mh-hero .mh-divider { width: 3.5vw; height: 2px; border-radius: 2px; background: linear-gradient(90deg, #f0b33b, #b8621a); flex-shrink: 0; }
.mh-hero .mh-sub { font-family: 'Manrope', sans-serif; font-weight: 400; font-size: 1.12vw; line-height: 1.7; color: #c7b69a; max-width: 30vw; margin: 0 0 2.6vw; }
.mh-hero .mh-btns { display: flex; gap: 1.1vw; flex-wrap: wrap; }

.mh-hero .mh-what { position: relative; display: inline-flex; align-items: center; gap: 0.55rem; border: 1px solid rgba(226,171,40,0.45); border-radius: 4px; padding: 0.6vw 1.2vw; font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 0.8vw; letter-spacing: 0.1em; text-transform: uppercase; color: #e8c97a; cursor: default; width: fit-content; transition: border-color 0.2s, background 0.2s; }
.mh-hero .mh-what:hover { border-color: rgba(226,171,40,0.8); background: rgba(226,171,40,0.06); }
.mh-hero .mh-what-icon { font-style: normal; font-size: 1em; opacity: 0.75; }
.mh-hero .mh-what-tip { position: absolute; top: calc(100% + 10px); left: 0; width: 300px; background: rgba(10,6,2,0.97); border: 1px solid rgba(217,144,34,0.4); border-radius: 8px; padding: 1rem 1.2rem; font-family: 'Manrope', sans-serif; font-weight: 400; font-size: 0.85rem; line-height: 1.65; color: #c7b69a; letter-spacing: 0; text-transform: none; opacity: 0; pointer-events: none; transform: translateY(-6px); transition: opacity 0.22s ease, transform 0.22s ease; z-index: 20; backdrop-filter: blur(8px); box-shadow: 0 12px 32px rgba(0,0,0,0.6); }
.mh-hero .mh-what-tip::before { content: ''; position: absolute; top: -6px; left: 18px; width: 10px; height: 10px; background: rgba(10,6,2,0.97); border-left: 1px solid rgba(217,144,34,0.4); border-top: 1px solid rgba(217,144,34,0.4); transform: rotate(45deg); }
.mh-hero .mh-what:hover .mh-what-tip { opacity: 1; transform: translateY(0); }

@media (max-width: 860px) { .mh-hero .mh-what { font-size: 0.72rem; padding: 0.6rem 1rem; } .mh-hero .mh-what-tip { width: 260px; } }
.mh-hero .mh-btn-primary, .mh-hero .mh-btn-ghost { font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 0.92vw; letter-spacing: 0.13em; text-transform: uppercase; padding: 1.15vw 2.3vw; border-radius: 4px; cursor: pointer; text-decoration: none; white-space: nowrap; display: inline-block; }
.mh-hero .mh-btn-primary { background: linear-gradient(135deg, #d9b46a 0%, #bb8a3d 100%); color: #271705; border: none; }
.mh-hero .mh-btn-ghost { background: transparent; color: #f4ead7; border: 1px solid rgba(226, 171, 40, 0.5); }

.mh-hero .mh-trust { position: absolute; left: 4%; bottom: clamp(2rem, 7vh, 4.75rem); width: min(72%, 960px); max-width: calc(100% - 2rem); z-index: 8; display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(0.5rem, 0.8vw, 0.85rem); }
.mh-hero .mh-card { display: flex; align-items: center; gap: clamp(0.5rem, 0.8vw, 0.8rem); background: rgba(12, 7, 2, 0.82); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(217, 144, 34, 0.55); border-radius: 10px; padding: clamp(0.6rem, 0.85vw, 0.85rem) clamp(0.65rem, 0.95vw, 1rem); box-shadow: 0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(242,200,78,0.08); }
.mh-hero .mh-ico { flex: none; width: clamp(26px, 2.1vw, 38px); height: clamp(26px, 2.1vw, 38px); color: #d6a448; display: flex; align-items: center; justify-content: center; align-self: flex-start; }
.mh-hero .mh-ico svg { width: 100%; height: 100%; display: block; }
.mh-hero .mh-lbl { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: clamp(0.62rem, 0.74vw, 0.8rem); letter-spacing: 0.12em; text-transform: uppercase; color: #f0dcab; line-height: 1.22; }
.mh-hero .mh-desc { font-family: 'Manrope', sans-serif; font-size: clamp(0.66rem, 0.74vw, 0.8rem); line-height: 1.36; color: #cdbb98; margin: 0.42em 0 0; text-wrap: pretty; }

@media (max-width: 1024px) and (min-width: 861px) {
  .mh-hero .mh-trust { grid-template-columns: repeat(2, 1fr); width: min(70%, 720px); left: auto; right: 4%; transform: none; }
}
@media (max-width: 860px) {
  .mh-hero { height: auto; min-height: 100vh; overflow: visible; }
  .mh-hero .mh-photo { object-position: 72% center; }
  .mh-hero .mh-grad { background: linear-gradient(180deg, rgba(10,7,3,0.75) 0%, rgba(10,7,3,0.55) 40%, rgba(10,7,3,0.92) 100%); }
  .mh-hero .mh-left { position: relative; left: 0; top: 0; width: auto; max-width: 100%; padding: 7.5rem 1.4rem 2rem; background: linear-gradient(180deg, rgba(10,7,3,0.45) 0%, transparent 100%); }
  .mh-hero .mh-h1 { font-size: 2.5rem; }
  .mh-hero .mh-divider { width: 48px; margin: 1.4rem 0 1.3rem; }
  .mh-hero .mh-sub { font-size: 1rem; max-width: 30rem; margin-bottom: 2rem; }
  .mh-hero .mh-btn-primary, .mh-hero .mh-btn-ghost { font-size: 0.8rem; padding: 1rem 1.6rem; }
  .mh-hero .mh-btn-ghost { margin-top: 1rem; }
  .mh-hero .mh-trust { position: relative; z-index: 8; transform: none; left: auto; right: auto; width: auto; margin: 5rem 1.4rem 0; grid-template-columns: repeat(2, 1fr); gap: 0.7rem; }
.mh-hero .mh-card { background: #372008; backdrop-filter: none; -webkit-backdrop-filter: none; border-color: rgba(217,144,34,0.75); box-shadow: 0 4px 18px rgba(0,0,0,0.4); }
  .mh-hero .mh-lbl { color: #faebc4; }
  .mh-hero .mh-desc { color: #e2ceaa; }
  .mh-hero .mh-ico { color: #e8b84b; }
}
@media (max-width: 480px) { .mh-hero .mh-trust { grid-template-columns: 1fr; } }
`;

/* Trust-card icons (outlined, gold) */
const HoneycombIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="18,15 24.06,18.5 24.06,25.5 18,29 11.94,25.5 11.94,18.5" />
    <polygon points="30.12,15 36.18,18.5 36.18,25.5 30.12,29 24.06,25.5 24.06,18.5" />
    <polygon points="24.06,25.5 30.12,29 30.12,36 24.06,39.5 18,36 18,29" />
  </svg>
);
const HandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
    <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);
const BarrelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3 C5 8 5 16 8 21" />
    <path d="M16 3 C19 8 19 16 16 21" />
    <path d="M8 3 H16" />
    <path d="M8 21 H16" />
    <path d="M5.6 8 C10 7 14 7 18.4 8" />
    <path d="M5.6 16 C10 17 14 17 18.4 16" />
    <path d="M12 3 V21" />
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z" />
  </svg>
);

const FEATURES = [
  { Icon: HoneycombIcon, label: 'Натурални съставки', desc: 'Без изкуствени добавки и консерванти.' },
  { Icon: HandIcon,      label: 'Ръчна изработка',    desc: 'Всяка бутилка е създадена с внимание и грижа.' },
  { Icon: BarrelIcon,    label: 'Отлежаване',         desc: 'Време и търпение за плътен и мек вкус.' },
  { Icon: HeartIcon,     label: 'Създадено с любов',  desc: 'За хора, които ценят истинските неща.' },
];

export default function Hero() {
  return (
    <section className="mh-hero">
      <style>{HERO_CSS}</style>

      <img className="mh-photo" src="/hero-product.webp" srcSet="/hero-product-mobile.webp 768w, /hero-product.webp 1920w" sizes="100vw" width="1920" height="1280" alt="" aria-hidden="true" fetchPriority="high" />
      <div className="mh-grad" />
      <div className="mh-orb mh-orb-1" aria-hidden="true" />
      <div className="mh-orb mh-orb-2" aria-hidden="true" />
      <div className="mh-orb mh-orb-3" aria-hidden="true" />
      <div className="mh-orb mh-orb-4" aria-hidden="true" />
      <div className="mh-orb mh-orb-5" aria-hidden="true" />

      <div className="mh-left">
        <h1 className="mh-h1">
          <span className="mh-white">Направи собствена</span>
          <span className="mh-line">медовина у дома.</span>
        </h1>

        <div className="mh-divider-row">
          <div className="mh-divider" />
          <div className="mh-what">
            <i className="mh-what-icon">?</i>
            Какво е медовина?
            <div className="mh-what-tip">
              Медовината е една от най-древните алкохолни напитки в света — приготвя се от мед, вода и дрожди и наподобява вино.
              Ферментацията превръща натуралните захари в алкохол, а резултатът е напитка с богат,
              сладко-плодов вкус и мека текстура. Позната от хилядолетия в почти всяка култура по света.
            </div>
          </div>
        </div>

        <p className="mh-sub">
          Представи си момента — отваряш бутилка, която ти сам направи
          преди седмици. Наливаш в чаши на най-близките хора. Това не е
          просто питие, а истинско преживяване, споделено заедно.
        </p>

        <div className="mh-btns">
          <Link className="mh-btn-primary" to="/shop">Разгледай продуктите</Link>
          <button
            className="mh-btn-ghost"
            type="button"
            onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
          >Научи повече</button>
        </div>
      </div>

      <div className="mh-trust">
        {FEATURES.map(({ Icon, label, desc }) => (
          <div className="mh-card" key={label}>
            <span className="mh-ico" aria-hidden="true"><Icon /></span>
            <div>
              <div className="mh-lbl">{label}</div>
              <p className="mh-desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
