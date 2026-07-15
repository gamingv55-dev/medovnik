import '../styles/community.css';
import DiscordSection from '../components/sections/DiscordSection';
import { BookIcon, HandshakeIcon, TrophyIcon } from '../components/ui/Icons';

export default function CommunityPage() {
  return (
    <div style={{ paddingTop: '8rem', minHeight: '100vh' }}>

      <div className="social-bar">
        <a className="social-link" href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <IconTikTok />
          <span>TikTok</span>
        </a>
        <div className="social-sep" />
        <a className="social-link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <IconInstagram />
          <span>Instagram</span>
        </a>
      </div>

      <DiscordSection compactLead noBorderTop />

      <div className="dc-divider">
        <p className="dc-divider-eyebrow">общност · тази седмица</p>
        <h2 className="dc-divider-title">Живо от Discord</h2>
        <div className="dc-divider-rule" />
      </div>

      <div className="sec" style={{ paddingTop: '3rem' }}>
        <div className="dc-preview">

          <div className="dc-thread">
            <div className="dc-channel"># рецепти</div>
            <Msg avatar="М" name="Мартин" time="днес в 14:22"
              text="Пробвах с малини и черна бъзова — 13 дни ферментация, алкохол 12%. Вкусът е невероятен, леко стипчив на края." />
            <Msg avatar="Е" name="Елена" time="14:35"
              text="Колко мед си сложил на литър? Аз правих подобна, ама ми излезе много сухо." />
            <Msg avatar="М" name="Мартин" time="14:37"
              text="180г/л. Следващия път ще пробвам с 200г — искам малко повече тяло." />
            <Reaction emojis={['🍇 12', '🔥 8', '👀 5']} />
          </div>

          <div className="dc-thread">
            <div className="dc-channel"># помощ</div>
            <Msg avatar="Г" name="Георги" time="вчера в 21:04"
              text="Хлопащото спря на 6-ти ден. Мъстта е малко мътна. Нормално ли е или съм го убил?" />
            <Msg avatar="С" name="Стефан" time="21:11"
              text="Напълно нормално — дрождите са легнали на дъното. Виж дали не е просто бурно спряло. Провери с хидрометър след 2 дни." />
            <Msg avatar="Г" name="Георги" time="23:58"
              text="Жив е 😅 захаромерът показва движение. Благодаря, щях да го изхвърля." />
            <Reaction emojis={['😅 19', '✅ 14']} />
          </div>

          <div className="dc-thread">
            <div className="dc-channel"># предизвикателство-декември</div>
            <Msg avatar="🏆" name="Медовник" time="01 дек." isSystem
              text="Темата за декември е: Зимна медовина — канела, карамфил или портокал. Качете партидата си до 28-ми!" />
            <Msg avatar="Н" name="Николай" time="03 дек."
              text="Тръгнах с канела + ванилия. Миризмата в кухнята в момента е невероятна 😍" />
            <Msg avatar="Д" name="Диана" time="11 дек."
              text="Аз слагам портокалова кора и малко джинджифил. Пуснах снимка в #галерия" />
            <Reaction emojis={['🎄 23', '🍊 17', '🤤 9']} />
          </div>

        </div>
      </div>
    </div>
  );
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function Msg({ avatar, name, time, text, isSystem }) {
  return (
    <div className={`dc-msg${isSystem ? ' dc-msg--system' : ''}`}>
      <div className="dc-avatar">{avatar}</div>
      <div className="dc-msg-body">
        <div className="dc-msg-meta">
          <span className="dc-name">{name}</span>
          <span className="dc-time">{time}</span>
        </div>
        <div className="dc-text">{text}</div>
      </div>
    </div>
  );
}

function Reaction({ emojis }) {
  return (
    <div className="dc-reactions">
      {emojis.map(e => <span className="dc-react" key={e}>{e}</span>)}
    </div>
  );
}
