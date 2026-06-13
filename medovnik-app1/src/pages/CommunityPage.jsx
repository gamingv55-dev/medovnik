import '../styles/community.css';
import DiscordSection from '../components/sections/DiscordSection';
import { BookIcon, HandshakeIcon, TrophyIcon } from '../components/ui/Icons';

/**
 * Community page. Re-uses the same Discord section as the home,
 * then adds a "Discord living" strip with three card highlights.
 */
export default function CommunityPage() {
  return (
    <div style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <DiscordSection compactLead noBorderTop />

      <div className="sec">
        <div className="sec-label">Discord живот</div>
        <h2 className="sec-h2">
          Какво се случва <span className="h2-accent">в общността</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          <LivingCard
            icon={<BookIcon size={40} />}
            title="Рецепти"
            body="Членовете споделят стотици рецепти — от класическа медовина до плодови варианти."
          />
          <LivingCard
            icon={<HandshakeIcon size={40} />}
            title="Помощ"
            body="Задаваш въпрос, получаваш отговор за минути. Никой не е сам в процеса."
          />
          <LivingCard
            icon={<TrophyIcon size={40} />}
            title="Предизвикателства"
            body="Всеки месец различна тема с награди и признание."
          />
        </div>
      </div>
    </div>
  );
}

function LivingCard({ icon, title, body }) {
  return (
    <div style={cardStyle}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1.2rem' }}>{icon}</div>
      <div style={titleStyle}>{title}</div>
      <div style={bodyStyle}>{body}</div>
    </div>
  );
}

const cardStyle = {
  background: 'rgba(255,255,255,.02)',
  border: '1px solid rgba(184, 98, 26, 0.18)',
  borderRadius: 8,
  padding: '2.2rem',
};

const titleStyle = {
  fontFamily: "'Ithaca', 'UniSans', sans-serif",
  fontSize: '1.3rem',
  color: 'var(--cream)',
  marginBottom: '0.8rem',
  textTransform: 'uppercase',
};

const bodyStyle = {
  fontSize: '1.05rem',
  color: 'var(--text)',
  fontStyle: 'italic',
  lineHeight: 1.7,
  fontFamily: "'Cormorant Garamond', serif",
};
