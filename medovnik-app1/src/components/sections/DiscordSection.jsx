import { Link } from 'react-router-dom';
import { CHANNELS } from '../../data/channels';
import { TargetIcon } from '../ui/Icons';

/**
 * Discord community section. Used on both the home and community
 * pages. Left column = sales pitch + channel list. Right = CTA card.
 */
export default function DiscordSection({ compactLead = false }) {
  return (
    <div className="comm-bg">
      <div className="comm-grid">
        <div style={compactLead ? undefined : { height: 834, padding: '0 0 15px' }}>
          <div className="sec-label">Общност</div>
          <h2 className="sec-h2">
            <span className="h2-accent">ПРИСЪЕДИНИ СЕ</span> КЪМ НАШАТА ДИСКОРД ОБЩНОСТ
          </h2>
          <p className="sec-body" style={{ marginBottom: '1rem' }}>
            Нашият Discord е място, където начинаещи и опитни споделят рецепти,
            решават проблеми и се надпреварват всеки месец.
          </p>

          <button
            type="button"
            className="discord-info"
            aria-label="Какво е Discord"
            style={{ margin: '8px 0 26px', padding: '11px 19px 15px', gap: 4 }}
          >
            <span className="di-q">?</span>
            Какво е Discord
            <span className="di-tip">
              Приложение чрез което комуникацията между хора е много лесна и удобна.
            </span>
          </button>

          <ul className="channels">
            {CHANNELS.map((c) => (
              <li className="channel" key={c.name}>
                <span className="channel-hash">#</span>
                <span className="channel-name">{c.name}</span>
                <span className="channel-meta">
                  {c.locked
                    ? <span className="lock-badge">Premium</span>
                    : c.meta}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="comm-cta">
            <div style={{ color: 'var(--honey)', marginBottom: '1.5rem' }}><TargetIcon size={56} /></div>
            <h3>Отключи Discord достъп</h3>
            <p>
              Поръчай за над 70 лв. и получи автоматична покана към нашата частна
              Discord общност.
            </p>
            <Link className="btn-primary" to="/shop">Разгледай комплектите</Link>
            <div className="unlock-hint">Автоматична покана след поръчката</div>
          </div>
        </div>
      </div>
    </div>
  );
}
