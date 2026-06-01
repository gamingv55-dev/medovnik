import { Link } from 'react-router-dom';

/* ── Trust-card icons (outlined, gold) ─────────────────────────── */
const HoneycombIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <polygon points="18,15 24.06,18.5 24.06,25.5 18,29 11.94,25.5 11.94,18.5" />
    <polygon points="30.12,15 36.18,18.5 36.18,25.5 30.12,29 24.06,25.5 24.06,18.5" />
    <polygon points="24.06,25.5 30.12,29 30.12,36 24.06,39.5 18,36 18,29" />
  </svg>
);
const HandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
    <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);
const BarrelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
       strokeLinecap="round" strokeLinejoin="round">
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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
       strokeLinecap="round" strokeLinejoin="round">
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
    <section className="hero">
      <img
        className="hero-bg-photo"
        src="/hero-product.jpg"
        alt=""
        aria-hidden="true"
        fetchpriority="high"
      />
      <div className="hero-bg" />

      <div className="hero-left">
        <h1 className="hero-h1">
          <span className="h1-white">Истинска медовина,</span>
          <span className="h1-line">създадена с традиция.</span>
        </h1>

        <div className="hero-divider" />

        <p className="hero-sub">
          Ръчно приготвена по стари рецепти, от натурални
          съставки и с внимание към всеки детайл.
        </p>

        <div className="hero-btns">
          <Link className="btn-primary" to="/shop">Разгледай продуктите</Link>
          <button
            className="btn-ghost"
            type="button"
            onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
          >Научи повече</button>
        </div>
      </div>

      {/* Trust cards overlaid on the photo, bottom */}
      <div className="hero-trust">
        {FEATURES.map(({ Icon, label, desc }) => (
          <div className="htc" key={label}>
            <span className="htc-ico" aria-hidden="true"><Icon /></span>
            <div className="htc-txt">
              <div className="htc-lbl">{label}</div>
              <p className="htc-desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
