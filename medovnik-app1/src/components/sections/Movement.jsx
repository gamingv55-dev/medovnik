import { HandshakeIcon, ScrollIcon, SparkleIcon } from '../ui/Icons';

/**
 * "Защо медовина" — three-column manifesto strip between Trust
 * and HowItWorks. Carries the brand's emotional pitch.
 */
export default function Movement() {
  return (
    <div style={{
      background: 'linear-gradient(180deg, var(--ink) 0%, #120c05 50%, var(--ink) 100%)',
      padding: '7rem 0',
      borderBottom: '1px solid rgba(184, 98, 26, 0.12)',
    }}>
      <div className="sec" style={{ paddingTop: 0, paddingBottom: 0, textAlign: 'center' }}>
        <div className="sec-label" style={{ justifyContent: 'center' }}>Защо медовина</div>
        <h2 className="sec-h2" style={{ maxWidth: 800, margin: '0 auto 2rem' }}>
          Едно питие, което <span className="h2-accent">събира хората</span>
        </h2>
        <p style={leadStyle}>
          Медовината е най-древното алкохолно питие — варено по български земи преди хилядолетия.
          Днес я връщаме у дома, при семейството, при приятелите. Не като продукт от магазина,
          а като нещо, което{' '}
          <span style={{ color: 'var(--honey)', fontStyle: 'normal', fontWeight: 600 }}>
            ти сам направи
          </span>.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2.5rem',
          maxWidth: 1100,
          margin: '0 auto',
        }}>
          <Pillar
            icon={<HandshakeIcon size={40} />}
            title="Споделено е по-сладко"
            body="Няма по-голяма тръпка от това да отвориш бутилка, която ти сам направи, и да я налееш на хората, които обичаш."
          />
          <Pillar
            icon={<ScrollIcon size={40} />}
            title="Българска традиция"
            body="Траките и прабългарите я варили векове наред. Ние я връщаме — със същата простота, със същата душа."
          />
          <Pillar
            icon={<SparkleIcon size={40} />}
            title="Твое творение"
            body="Купуваш мед и вода. Получаваш питие, което носи твоя характер, търпение и вкус. Това не е поръчка — това е творчество."
          />
        </div>
      </div>
    </div>
  );
}

function Pillar({ icon, title, body }) {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1.2rem' }}>{icon}</div>
      <h3 style={pillarTitle}>{title}</h3>
      <p style={pillarBody}>{body}</p>
    </div>
  );
}

const leadStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 24,
  color: 'var(--text)',
  lineHeight: 1.8,
  maxWidth: 720,
  margin: '0 auto 4rem',
  fontStyle: 'italic',
};

const pillarTitle = {
  fontFamily: "'UniSans', sans-serif",
  fontSize: '1.2rem',
  color: 'var(--cream)',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  marginBottom: '1rem',
};

const pillarBody = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 22,
  color: 'var(--text)',
  lineHeight: 1.75,
  fontStyle: 'italic',
};
