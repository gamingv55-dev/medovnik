import { useEffect, useRef, useState, useCallback } from 'react';

const ALL_ITEMS = [
  { type: 'stat', num: '30',   label: ['Дни до', 'първата партида'] },
  { type: 'stat', num: '0',    label: ['Опит', 'необходим'] },
  { type: 'qual', icon: 'check',     label: ['Всичко', 'включено'] },
  { type: 'qual', icon: 'honeycomb', label: ['Натурални', 'съставки'] },
  { type: 'qual', icon: 'list',      label: ['Стъпка по стъпка', 'инструкции'] },
  { type: 'qual', icon: 'gift',      label: ['Подходящ за', 'подарък'] },
  { type: 'qual', icon: 'truck',     label: ['Доставка в', 'цяла България'] },
];

const RATIO = 0.68;

export default function Trust() {
  const [cur, setCur]   = useState(0);
  const [offset, setOffset] = useState(0);
  const vpRef           = useRef(null);
  const curRef          = useRef(0);
  const timerRef        = useRef(null);
  const touchStart      = useRef(null);

  const calcOffset = useCallback((idx) => {
    if (!vpRef.current) return 0;
    const w     = vpRef.current.offsetWidth;
    const slide = w * RATIO;
    const peek  = (w - slide) / 2;
    return peek - idx * slide;
  }, []);

  const goTo = useCallback((raw) => {
    const idx = ((raw % ALL_ITEMS.length) + ALL_ITEMS.length) % ALL_ITEMS.length;
    curRef.current = idx;
    setCur(idx);
    setOffset(calcOffset(idx));
  }, [calcOffset]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(curRef.current + 1), 3200);
  }, [goTo]);

  useEffect(() => {
    setOffset(calcOffset(0));
    resetTimer();
    const onResize = () => setOffset(calcOffset(curRef.current));
    window.addEventListener('resize', onResize);
    return () => { clearInterval(timerRef.current); window.removeEventListener('resize', onResize); };
  }, [calcOffset, resetTimer]);

  const next = () => { goTo(curRef.current + 1); resetTimer(); };
  const prev = () => { goTo(curRef.current - 1); resetTimer(); };

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) { diff > 0 ? next() : prev(); }
    touchStart.current = null;
  };

  return (
    <div className="trust">

      {/* ── Desktop ── */}
      <div className="trust-inner trust-desktop">
        <Stat num="30"    label={<>Дни до<br />първата партида</>} />
        <div className="trust-div" />
        <Stat num="0"     label={<>Опит<br />необходим</>} />
        <div className="trust-div" />
        <Qual icon={<CheckSvg />}     label={<>Всичко<br />включено</>} />
        <div className="trust-div" />
        <Qual icon={<HoneycombSvg />} label={<>Натурални<br />съставки</>} />
        <div className="trust-div" />
        <Qual icon={<ListSvg />}      label={<>Стъпка по стъпка<br />инструкции</>} />
        <div className="trust-div" />
        <Qual icon={<GiftSvg />}      label={<>Подходящ за<br />подарък</>} />
        <div className="trust-div" />
        <Qual icon={<TruckSvg />}     label={<>Доставка в<br />цяла България</>} />
      </div>

      {/* ── Mobile peek carousel ── */}
      <div className="trust-mob" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

        <button className="trust-arr trust-arr-l" onClick={prev} aria-label="Назад">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="trust-mob-vp" ref={vpRef}>
          <div
            className="trust-mob-track"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {ALL_ITEMS.map((item, i) => (
              <div key={i} className={`trust-mob-slide${i === cur ? ' active' : ''}`}>
                {item.type === 'stat'
                  ? <Stat num={item.num} label={<>{item.label[0]}<br />{item.label[1]}</>} />
                  : <Qual icon={iconFor(item.icon)} label={<>{item.label[0]}{item.label[1] ? <><br />{item.label[1]}</> : null}</>} />
                }
              </div>
            ))}
          </div>
        </div>

        <button className="trust-arr trust-arr-r" onClick={next} aria-label="Напред">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <div className="trust-dots">
          {ALL_ITEMS.map((_, i) => (
            <button
              key={i}
              className={`trust-dot${i === cur ? ' active' : ''}`}
              onClick={() => { goTo(i); resetTimer(); }}
              aria-label={`Елемент ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

function iconFor(name) {
  if (name === 'honeycomb') return <HoneycombSvg />;
  if (name === 'check')     return <CheckSvg />;
  if (name === 'list')      return <ListSvg />;
  if (name === 'gift')      return <GiftSvg />;
  if (name === 'truck')     return <TruckSvg />;
  return null;
}

function Stat({ num, label }) {
  return (
    <div className="trust-item">
      <div className="trust-num">{num}</div>
      <div className="trust-lbl">{label}</div>
    </div>
  );
}

function Qual({ icon, label }) {
  return (
    <div className="trust-item">
      <div className="trust-ico">{icon}</div>
      <div className="trust-lbl">{label}</div>
    </div>
  );
}

function HoneycombSvg() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="18,15 24.06,18.5 24.06,25.5 18,29 11.94,25.5 11.94,18.5" />
      <polygon points="30.12,15 36.18,18.5 36.18,25.5 30.12,29 24.06,25.5 24.06,18.5" />
      <polygon points="24.06,25.5 30.12,29 30.12,36 24.06,39.5 18,36 18,29" />
    </svg>
  );
}
function CheckSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12.5 10.8 15.5 16 9" />
    </svg>
  );
}
function ListSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="6"  r="1.3" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="1.3" fill="currentColor" stroke="none" />
      <line x1="9" y1="6"  x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
    </svg>
  );
}
function GiftSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="18" height="4" rx="1" />
      <rect x="4" y="13" width="16" height="8" rx="1" />
      <line x1="12" y1="9" x2="12" y2="21" />
      <path d="M12 9C11 6 8 5 7 6.5S8 9 12 9Z" />
      <path d="M12 9c1-3 4-4 5-2.5S16 9 12 9Z" />
    </svg>
  );
}
function TruckSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="7" width="13" height="10" rx="1" />
      <path d="M14 10h4l3 3v4h-7z" />
      <circle cx="6"  cy="18.5" r="1.6" />
      <circle cx="17" cy="18.5" r="1.6" />
    </svg>
  );
}
