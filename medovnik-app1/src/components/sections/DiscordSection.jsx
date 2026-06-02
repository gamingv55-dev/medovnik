import { Link } from 'react-router-dom';
import { CHANNELS } from '../../data/channels';
import '../../styles/community.css';

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const QuestionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const PeopleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
  </svg>
);

const StarIconSm = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ICONS = { chat: ChatIcon, question: QuestionIcon, people: PeopleIcon, book: BookIcon, star: StarIconSm };

const DiscordHexIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" stroke="#d4831f" strokeWidth="1.5" fill="rgba(212,131,31,0.08)" />
    <path d="M43 24.5c-2.7-1.25-5.6-2.17-8.65-2.67a.1.1 0 00-.1.05c-.37.66-.78 1.52-1.07 2.2a25.5 25.5 0 00-7.56 0c-.3-.7-.71-1.54-1.08-2.2a.1.1 0 00-.1-.05c-3.05.5-5.94 1.42-8.65 2.67a.1.1 0 00-.04.04C11.5 31.3 10.5 37.9 11 44.4c0 .03.02.06.04.08 3.27 2.4 6.44 3.86 9.55 4.83a.1.1 0 00.11-.04c.74-1 1.4-2.06 1.96-3.17a.1.1 0 00-.05-.14c-1.04-.4-2.03-.88-2.98-1.44a.1.1 0 010-.17c.2-.15.4-.3.59-.46a.1.1 0 01.1-.01c6.26 2.86 13.04 2.86 19.23 0a.1.1 0 01.1.01c.19.16.39.31.6.46a.1.1 0 010 .17c-.95.56-1.95 1.05-2.99 1.44a.1.1 0 00-.05.14c.57 1.1 1.23 2.16 1.96 3.17a.1.1 0 00.11.04c3.12-.97 6.29-2.43 9.56-4.83a.1.1 0 00.04-.08c.6-7.42-1.01-13.87-4.27-19.86a.08.08 0 00-.04-.04zM26.2 40.5c-1.63 0-2.97-1.5-2.97-3.33s1.32-3.33 2.97-3.33c1.66 0 2.99 1.51 2.97 3.33 0 1.84-1.32 3.33-2.97 3.33zm10.97 0c-1.63 0-2.97-1.5-2.97-3.33s1.32-3.33 2.97-3.33c1.66 0 2.99 1.51 2.97 3.33 0 1.84-1.31 3.33-2.97 3.33z" fill="#d4831f" />
  </svg>
);

export default function DiscordSection({ compactLead = false }) {
  return (
    <div className="comm-bg">
      <div className="comm-grid">

        {/* LEFT */}
        <div>
          <div className="sec-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ color: '#d4831f' }}>—</span>
            <span>Общност</span>
          </div>

          <h2 className="comm-h2">
            <span className="h2-accent">ПРИСЪЕДИНИ СЕ</span><br />
            КЪМ НАШАТА<br />
            ДИСКОРД ОБЩНОСТ
          </h2>

          <p className="comm-body">
            Нашият Discord е място, където начинаещи и опитни споделят рецепти,
            решават проблеми и се надграждат всеки месец.
          </p>

          <button type="button" className="discord-info" aria-label="Какво е Discord">
            <span className="di-q">?</span>
            КАКВО Е DISCORD?
            <span className="di-tip">
              Приложение чрез което комуникацията между хора е много лесна и удобна.
            </span>
          </button>

          <ul className="channels">
            {CHANNELS.map((c) => {
              const Icon = ICONS[c.icon] || ChatIcon;
              return (
                <li className="channel" key={c.name}>
                  <span className="ch-icon"><Icon /></span>
                  <span className="ch-body">
                    <span className="ch-name">{c.name}</span>
                    <span className="ch-meta">{c.meta}</span>
                  </span>
                  {c.locked
                    ? <span className="lock-badge">PREMIUM</span>
                    : <span className="ch-chevron"><ChevronIcon /></span>
                  }
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT – CTA */}
        <div className="comm-cta">
          <div className="comm-cta-icon"><DiscordHexIcon /></div>
          <h3 className="comm-cta-h3">ОТКЛЮЧИ DISCORD ДОСТЪП</h3>
          <p className="comm-cta-p">
            Първият комплект или дарение от 50 лв. ти дава автоматичен достъп до нашата частна Discord общност.
          </p>
          <Link className="comm-cta-btn" to="/shop">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            РАЗГЛЕДАЙ КОМПЛЕКТИТЕ
          </Link>
          <div className="unlock-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            ДОСТЪПЪТ СЕ ДАВА АВТОМАТИЧНО СЛЕД ПОРЪЧКАТА
          </div>
        </div>

      </div>
    </div>
  );
}
