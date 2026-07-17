import { useState, useRef, useEffect, useCallback } from 'react';
import { QA_DATABASE, QUICK_CATEGORIES, MORE_QUESTIONS, FALLBACK_RESPONSES } from '../data/meadChatData';
import '../styles/chatbot.css';

// Score an entry: keyword matches + similarity to question text
function scoreEntry(entry, lower) {
  let score = 0;
  for (const kw of entry.keywords) {
    if (lower.includes(kw.toLowerCase())) score += 2;
  }
  // bonus if user input contains words from the canonical question
  const qWords = entry.question.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  for (const w of qWords) {
    if (lower.includes(w)) score += 1;
  }
  return score;
}

function findAnswer(text) {
  const lower = text.toLowerCase().trim();
  let best = null;
  let bestScore = 0;

  for (const entry of QA_DATABASE) {
    const score = scoreEntry(entry, lower);
    if (score > bestScore) { bestScore = score; best = entry; }
  }

  if (bestScore < 2) {
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }
  return best.answer;
}

let msgId = 0;
const mkMsg = (role, text) => ({ id: ++msgId, role, text });

export default function MeadChatbot() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [quickHidden, setQuickHidden] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [walkthroughHiding, setWalkthroughHiding] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const arrowTimer = useRef(null);
  const walkthroughTimer = useRef(null);

  const scheduleArrow = useCallback(() => {
    clearTimeout(arrowTimer.current);
    arrowTimer.current = setTimeout(() => {
      setShowArrow(true);
      setTimeout(() => {
        setShowArrow(false);
        arrowTimer.current = setTimeout(() => scheduleArrow(), 45000);
      }, 5000);
    }, 20000);
  }, []);

  const dismissWalkthrough = useCallback(() => {
    clearTimeout(walkthroughTimer.current);
    setWalkthroughHiding(true);
    setTimeout(() => { setShowWalkthrough(false); setWalkthroughHiding(false); }, 500);
  }, []);

  useEffect(() => {
    scheduleArrow();
    return () => clearTimeout(arrowTimer.current);
  }, [scheduleArrow]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) {
      if (!seen) {
        setShowWalkthrough(true);
        walkthroughTimer.current = setTimeout(dismissWalkthrough, 3800);
      }
      setSeen(true);
      setShowArrow(false);
      clearTimeout(arrowTimer.current);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    return () => clearTimeout(walkthroughTimer.current);
  }, [open]);

  function send(text) {
    const q = (text || input).trim();
    if (!q || typing) return;
    setInput('');
    setShowMore(false);
    setMsgs(prev => [...prev, mkMsg('user', q)]);
    setTyping(true);
    setTimeout(() => {
      const answer = findAnswer(q);
      setTyping(false);
      setMsgs(prev => [...prev, mkMsg('bot', answer)]);
    }, 600 + Math.random() * 500);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* FAQ arrow callout */}
      {!open && (
        <div className={`mbot-arrow-callout ${showArrow ? 'visible' : ''}`} aria-hidden="true">
          <span className="mbot-arrow-label">Често задавани въпроси</span>
          <svg className="mbot-arrow-svg" width="52" height="52" viewBox="0 0 36 36" fill="none">
            <path d="M6 6 Q18 10 28 28" stroke="#f2c84e" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
            <polyline points="20,28 28,28 28,20" stroke="#f2c84e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      )}

      {/* FAB */}
      <button
        className={`mbot-fab ${open ? 'open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label="Чат асистент"
      >
        {!seen && <span className="mbot-badge" />}
        <span className="mbot-fab-icon mbot-fab-icon--honey" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
            <polygon points="24,4 42,14 42,34 24,44 6,34 6,14"
              fill="rgba(10,6,2,0.6)" stroke="#271705" strokeWidth="1.5" />
            <text x="24" y="31" textAnchor="middle" fontSize="20" fill="#271705">🍯</text>
          </svg>
        </span>
        <span className="mbot-fab-icon mbot-fab-icon--close" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#271705" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      </button>

      {/* Panel */}
      <div className={`mbot-panel ${open ? 'open' : ''}`} role="dialog" aria-label="Медко Асистент">
        {showWalkthrough && (
          <div
            className={`mbot-walkthrough${walkthroughHiding ? ' mbot-walkthrough--hide' : ''}`}
            onClick={dismissWalkthrough}
          >
            <div className="mbot-walkthrough-icon">🍯</div>
            <div className="mbot-walkthrough-title">Здравей, аз съм Медко</div>
            <p className="mbot-walkthrough-text">
              Твоят асистент за медовини — питай ме за рецепти, ферментация или избери
              готов въпрос отдолу, а аз ще ти отговоря веднага.
            </p>
            <span className="mbot-walkthrough-hint">Натисни за да продължиш</span>
          </div>
        )}

        {/* Header */}
        <div className="mbot-header">
          <div className="mbot-avatar">🍯</div>
          <div className="mbot-header-info">
            <div className="mbot-name">Медко</div>
            <div className="mbot-status">
              <span className="mbot-dot" />
              Асистент за медовини
            </div>
          </div>
          <button className="mbot-close" onClick={() => setOpen(false)} aria-label="Затвори">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className={`mbot-messages${msgs.length === 0 && !typing ? ' mbot-messages--empty' : ''}`}>
          {msgs.map(m => (
            <div key={m.id} className={`mbot-msg mbot-msg--${m.role}`}>
              <div className="mbot-bubble">{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="mbot-msg mbot-msg--bot">
              <div className="mbot-bubble mbot-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick questions — categorised */}
        <div className={`mbot-quick${msgs.length === 0 && !typing && !quickHidden ? ' mbot-quick--fill' : ''}${quickHidden ? ' mbot-quick--collapsed' : ''}`}>
          <button className="mbot-quick-toggle" onClick={() => setQuickHidden(v => !v)}>
            <span>Бързи въпроси</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: quickHidden ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {!quickHidden && (
          <>
          {QUICK_CATEGORIES.map(cat => (
            <div key={cat.label} className="mbot-cat">
              <div className="mbot-cat-label">{cat.label}</div>
              <div className="mbot-cat-chips">
                {cat.questions.map(q => (
                  <button key={q} className="mbot-chip" onClick={() => send(q)}>{q}</button>
                ))}
              </div>
            </div>
          ))}

          {/* More questions toggle */}
          {showMore && (
            <div className="mbot-cat">
              <div className="mbot-cat-label">Още въпроси</div>
              <div className="mbot-cat-chips">
                {MORE_QUESTIONS.map(q => (
                  <button key={q} className="mbot-chip" onClick={() => send(q)}>{q}</button>
                ))}
              </div>
            </div>
          )}

          <button className="mbot-more-btn" onClick={() => setShowMore(v => !v)}>
            {showMore ? '▲ По-малко' : '▼ Виж още въпроси'}
          </button>
          </>
          )}
        </div>

        {/* Input */}
        <div className="mbot-input-row">
          <input
            ref={inputRef}
            className="mbot-input"
            placeholder="Питай за медовини…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={typing}
          />
          <button className="mbot-send" onClick={() => send()} disabled={!input.trim() || typing} aria-label="Изпрати">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
