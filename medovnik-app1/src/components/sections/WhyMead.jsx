/* Иконите са готови златни PNG-та с прозрачен фон — слагат се в public/.
   Долните снимки също се слагат в public/. */
const CARDS = [
  { icon: '/icon-cheers.png',   title: 'Събира приятели',      desc: 'Отвори бутилка, налей в чаша и създай повод за разговори, смях и спомени.', img: '/why-friends.webp' },
  { icon: '/icon-gift.png',     title: 'Подарък със стойност', desc: 'Домашната медовина е личен подарък, който показва внимание и отношение.',   img: '/why-gift.webp' },
  { icon: '/icon-calendar.png', title: 'Възнаградено търпение', desc: 'Няколко седмици и получаваш питие с характер и история, създадено от теб.',  img: '/why-patience.webp' },
  { icon: '/icon-heart.png',    title: 'Споделяш емоция',      desc: 'Във всяка чаша има твоя труд, време и желание да създадеш нещо истинско.',  img: '/why-emotion.webp' },
];

export default function WhyMead() {
  return (
    <section className="why">
      <div className="why-inner">

        {/* TOP */}
        <div className="why-top">
          <div className="why-photo">
            <img src="/why-hero.webp" alt="Наздравица с медовина" loading="lazy" />
          </div>

          <div className="why-copy">
            <div className="why-eyebrow"><i></i><span>Защо медовина</span><i></i></div>
            <h2 className="why-h2">Едно питие,<br />което <span className="accent">събира хората</span></h2>
            <p className="why-p">
              Медовината е най-древното алкохолно питие — варено по български
              земи преди хилядолетия. Днес я връщаме у дома, при семейството,
              при приятелите. Не като продукт от магазина, а като нещо, което{' '}
              <span className="hl">ти сам направи</span>.
            </p>
          </div>
        </div>

        <div className="why-rule" />

        {/* BAND */}
        <div className="why-band">
          <span className="orn"><svg viewBox="0 0 74 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 7h30" /><path d="M40 7c4-5 8 5 12 0s8-5 12 0" /><circle cx="36" cy="7" r="2.2" fill="currentColor" stroke="none" /></svg></span>
          <span>Споделяш повече от питие</span>
          <span className="orn"><svg viewBox="0 0 74 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M72 7H42" /><path d="M34 7c-4-5-8 5-12 0s-8-5-12 0" /><circle cx="38" cy="7" r="2.2" fill="currentColor" stroke="none" /></svg></span>
        </div>

        {/* CARDS */}
        <div className="why-cards">
          {CARDS.map(({ icon, title, desc, img }) => (
            <article className="wm-card" key={title}>
              <img className="wm-ico" src={icon} alt="" />
              <h3 className="wm-title">{title}</h3>
              <p className="wm-desc">{desc}</p>
              <div className="wm-photo"><img src={img} alt={title} loading="lazy" /></div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
