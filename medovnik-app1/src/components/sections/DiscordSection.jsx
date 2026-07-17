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
    <g transform="translate(12, 17) scale(0.315)">
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" fill="#d4831f" />
    </g>
  </svg>
);

export default function DiscordSection({ compactLead = false, noBorderTop = false }) {
  return (
    <div className="comm-bg" style={noBorderTop ? { borderTop: 'none' } : undefined}>
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
            Разгледай комплектите
          </Link>
          <div className="unlock-hint">
            Достъпът се дава автоматично след поръчката
          </div>
        </div>

      </div>
    </div>
  );
}
