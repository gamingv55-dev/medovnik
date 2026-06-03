import { useEffect, useRef, useState, useCallback } from 'react';

const STATS = [
  { num: '30',   label: ['Дни до', 'първата партида'] },
  { num: '4.9★', label: ['Средна оценка', 'от клиенти'] },
  { num: '0',    label: ['Опит', 'необходим'] },
];

const RATIO = 0.68; // active slide = 68% of viewport width

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
    const idx = ((raw % STATS.length) + STATS.length) % STATS.length;
    curRef.current = idx;
    setCur(idx);
    setOffset(calcOffset(idx));
  }, [calcOffset]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(curRef.current + 1), 3200);
  }, [goTo]);

  /* initial mount: measure after DOM paint */
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
        <Stat num="4.9★"  label={<>Средна оценка<br />от клиенти</>} />
        <div className="trust-div" />
        <Stat num="0"     label={<>Опит<br />необходим</>} />
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
            {STATS.map((s, i) => (
              <div key={i} className={`trust-mob-slide${i === cur ? ' active' : ''}`}>
                <Stat num={s.num} label={<>{s.label[0]}<br />{s.label[1]}</>} />
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
          {STATS.map((_, i) => (
            <button
              key={i}
              className={`trust-dot${i === cur ? ' active' : ''}`}
              onClick={() => { goTo(i); resetTimer(); }}
              aria-label={`Статистика ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

function Stat({ num, label }) {
  return (
    <div className="trust-item">
      <div className="trust-num">{num}</div>
      <div className="trust-lbl">{label}</div>
    </div>
  );
}
