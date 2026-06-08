import { useState, useRef, useEffect, useCallback } from 'react';
import { QA_DATABASE, QUICK_QUESTIONS, FALLBACK_RESPONSES, GREETING } from '../data/meadChatData';
import '../styles/chatbot.css';

function findAnswer(text) {
  const lower = text.toLowerCase().trim();
  let best = null;
  let bestScore = 0;

  for (const entry of QA_DATABASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw.toLowerCase())) score++;
    }
    if (score > bestScore) { bestScore = score; best = entry; }
  }

  if (bestScore === 0) {
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }
  return best.answer;
}

let msgId = 0;
const mkMsg = (role, text) => ({ id: ++msgId, role, text });

export default function MeadChatbot() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [msgs, setMsgs] = useState([mkMsg('bot', GREETING)]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const arrowTimer = useRef(null);

  const scheduleArrow = useCallback(() => {
    clearTimeout(arrowTimer.current);
    // показва стрелката след 5s, скрива след 6s, и се повтаря на всеки 18s
    arrowTimer.current = setTimeout(() => {
      setShowArrow(true);
      setTimeout(() => {
        setShowArrow(false);
        arrowTimer.current = setTimeout(() => scheduleArrow(), 8000);
      }, 8000);
    }, 4000);
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
      setSeen(true);
      setShowArrow(false);
      clearTimeout(arrowTimer.current);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  function send(text) {
    const q = (text || input).trim();
    if (!q || typing) return;
    setInput('');
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
        <div className="mbot-messages">
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

        {/* Quick questions */}
        <div className="mbot-quick">
          {QUICK_QUESTIONS.map(q => (
            <button key={q} className="mbot-chip" onClick={() => send(q)}>
              {q}
            </button>
          ))}
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
