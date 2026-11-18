import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/discord-preview.css';

// Примерно съдържание — само за илюстрация как изглежда общността.
const CHANNELS = [
  {
    id: 'start',
    name: 'начало-тук',
    topic: 'Добре дошъл! Прочети правилата и се представи.',
    messages: [
      { user: 'Медовник', role: 'team', color: '#f2c84e', time: 'Днес в 10:02', text: 'Добре дошли в общността! 🍯 Тук споделяме рецепти, питаме и си помагаме. Представи се с няколко думи — откъде си и какво искаш да правиш първо?' },
      { user: 'Борис', color: '#7fb8e6', time: 'Днес в 10:15', text: 'Здравейте! Аз съм Борис от Пловдив, купих Стартов кит и не знам откъде да започна 😅' },
      { user: 'Медовник', role: 'team', color: '#f2c84e', time: 'Днес в 10:17', text: 'Добре дошъл, Борис! Започни с видео наръчника от комплекта, а ако нещо не е ясно — питай в „въпроси-за-начинаещи“.' },
    ],
  },
  {
    id: 'questions',
    name: 'въпроси-за-начинаещи',
    topic: 'Всеки въпрос е добре дошъл — няма глупави въпроси.',
    messages: [
      { user: 'Борис', color: '#7fb8e6', time: 'Вчера в 18:40', text: 'Колко време трябва да стои на ферментация първата партида?' },
      { user: 'Деница', color: '#e68fb8', time: 'Вчера в 18:52', text: 'Около 3–4 седмици, докато спрат мехурчетата във въздушния клапан. После я претакаш и я оставяш да отлежи.' },
      { user: 'Медовник', role: 'team', color: '#f2c84e', time: 'Вчера в 19:05', text: 'Точно така. Захаромерът ти показва кога плътността е стабилна — ако два дни подред е същата, ферментацията е свършила ✅' },
      { user: 'Борис', color: '#7fb8e6', time: 'Вчера в 19:10', text: 'Супер, благодаря! 🙌' },
    ],
  },
  {
    id: 'show',
    name: 'покажи-партидата-си',
    topic: 'Снимай, похвали се и получи обратна връзка.',
    messages: [
      { user: 'Деница', color: '#e68fb8', time: 'Пон в 20:11', text: 'Първата ми медовина с малина и мента е готова за бутилиране! Цветът стана страхотен.', image: true },
      { user: 'Георги', color: '#9be68f', time: 'Пон в 20:30', text: 'Изглежда невероятно! Колко мед сложи за 5 л?' },
      { user: 'Деница', color: '#e68fb8', time: 'Пон в 20:34', text: 'Около 1.4 кг. Получи се лека и малко сладка, около 11%.' },
    ],
  },
  {
    id: 'recipes',
    name: 'рецепти',
    topic: 'Споделяй и откривай нови рецепти.',
    messages: [
      { user: 'Георги', color: '#9be68f', time: 'Нед в 12:00', text: '📌 Рецепта: Медовина с канела и портокал (5 л)', card: ['1.4 кг мед', '2 портокала', '2 канелени пръчки', 'Винени дрожди', '≈ 4 седмици първична ферментация'] },
      { user: 'Медовник', role: 'team', color: '#f2c84e', time: 'Нед в 12:20', text: 'Страхотна рецепта, Георги! Добави я към любимите си 🧡' },
    ],
  },
  {
    id: 'month',
    name: 'медовина-на-месеца',
    topic: 'Всеки месец избираме най-хубавата партида на общността.',
    messages: [
      { user: 'Медовник', role: 'team', color: '#f2c84e', time: 'Сря в 09:00', text: '🏆 Медовина на месеца: „Златна есен“ на Деница — с ябълки, канела и карамфил!', card: ['Автор: Деница', 'Градус: ≈ 11%', 'Основа: полифлорен мед', 'Отлежаване: 3 месеца'] },
      { user: 'Георги', color: '#9be68f', time: 'Сря в 09:25', text: 'Заслужено! Вкусих я на последната среща — невероятен аромат 🍎' },
      { user: 'Деница', color: '#e68fb8', time: 'Сря в 09:40', text: 'Благодаря на всички! Следващия месец гласувайте и за вашите партиди 🧡' },
    ],
  },
];

const HashIcon = ({ locked }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    {locked
      ? <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>
      : <><path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16" /></>}
  </svg>
);

function Avatar({ name, color }) {
  return <span className="dp-avatar" style={{ background: color }}>{name[0]}</span>;
}

export default function DiscordPreview() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('start');
  const [closing, setClosing] = useState(false);
  const btnRef = useRef(null);
  const winRef = useRef(null);
  const active = CHANNELS.find((c) => c.id === activeId);

  // Затваряне от UI: ако сме добавили history запис, го връщаме (popstate ще затвори прозореца)
  const close = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      if (window.history.state && window.history.state.dpOpen) window.history.back();
      else setOpen(false);
    }, 220);
  };

  // Прозорецът „израства“ от бутона, който го е отворил
  useLayoutEffect(() => {
    if (!open || !winRef.current || !btnRef.current) return;
    const wEl = winRef.current; // offset* не зависи от текущата анимация
    const b = btnRef.current.getBoundingClientRect();
    winRef.current.style.transformOrigin = (b.left + b.width / 2 - wEl.offsetLeft) + 'px ' + (b.top + b.height / 2 - wEl.offsetTop) + 'px';
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    // Бутонът „назад“ на телефона затваря превюто вместо да напуска страницата
    if (!(window.history.state && window.history.state.dpOpen)) {
      window.history.pushState({ ...(window.history.state || {}), dpOpen: true }, '');
    }
    const onPop = () => { setOpen(false); setClosing(false); };
    window.addEventListener('popstate', onPop);

    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const block = (e) => e.preventDefault();

  return (
    <>
      <button type="button" className="dp-open" ref={btnRef} onClick={() => { setClosing(false); setOpen(true); }}>
        Виж как изглежда
      </button>

      {open && createPortal(
        <div className={`dp-overlay${closing ? " is-closing" : ""}`} onClick={close}>
          <div
            className="dp-window"
            ref={winRef}
            role="dialog"
            aria-modal="true"
            aria-label="Превю на Discord общността"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={block}
            onCopy={block}
            onCut={block}
            onDragStart={block}
          >
            <button type="button" className="dp-close" onClick={close} aria-label="Затвори">✕</button>

            <aside className="dp-side">
              <div className="dp-server">Медовник</div>
              <div className="dp-cat">Текстови канали</div>
              <ul className="dp-channels">
                {CHANNELS.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className={`dp-ch${c.id === activeId ? ' is-active' : ''}`}
                      onClick={() => setActiveId(c.id)}
                    >
                      <HashIcon locked={c.locked} />
                      <span>{c.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <section className="dp-main">
              <header className="dp-head">
                <HashIcon locked={active.locked} />
                <strong>{active.name}</strong>
                <span className="dp-topic">{active.topic}</span>
              </header>

              <div className={`dp-feed${active.locked ? ' is-locked' : ''}`} key={active.id}>
                {active.messages.map((m, i) => (
                  <div className="dp-msg" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                    <Avatar name={m.user} color={m.color} />
                    <div className="dp-body">
                      <div className="dp-meta">
                        <span className="dp-user" style={{ color: m.color }}>{m.user}</span>
                        {m.role === 'team' && <span className="dp-tag">ЕКИП</span>}
                        <span className="dp-time">{m.time}</span>
                      </div>
                      <div className="dp-text">{m.text}</div>
                      {m.image && <div className="dp-img" aria-hidden="true">📷 снимка на партидата</div>}
                      {m.card && (
                        <ul className="dp-card">
                          {m.card.map((line) => <li key={line}>{line}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
                {active.locked && (
                  <div className="dp-lock">
                    <strong>🔒 Само за премиум членове</strong>
                    <span>Този канал се отключва с premium достъп.</span>
                  </div>
                )}
              </div>

              <footer className="dp-input">
                {active.locked ? 'Нямаш достъп до този канал' : `Съобщение в #${active.name}`}
              </footer>
              <div className="dp-note">Примерно съдържание — истинската общност е в Discord.</div>
            </section>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
