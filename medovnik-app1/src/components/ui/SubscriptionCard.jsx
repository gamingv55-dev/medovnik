/**
 * Subscription tier card on the Community page. The middle tier
 * passes `hl=true` to enable the highlighted treatment + ribbon.
 */
export default function SubscriptionCard({ plan }) {
  return (
    <div style={{
      border: `1px solid rgba(184, 98, 26, ${plan.hl ? 0.4 : 0.18})`,
      borderRadius: 8,
      padding: '2.6rem 2.2rem',
      background: plan.hl ? 'rgba(184, 98, 26, 0.08)' : 'rgba(255, 255, 255, 0.02)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {plan.hl && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, var(--ember), var(--honey))',
        }} />
      )}
      <div style={tierLabel}>{plan.plan}</div>
      <div style={tierName}>{plan.name}</div>
      <div style={tierPrice}>
        {plan.price} лв.
        <span style={tierPer}>{plan.per}</span>
      </div>

      <ul style={tierFeatures}>
        {plan.features.map((f) => (
          <li key={f} style={tierFeatureItem}>
            <span style={{ color: 'var(--honey)' }}>→</span>{f}
          </li>
        ))}
      </ul>

      <button
        className={plan.hl ? 'btn-primary' : 'btn-ghost'}
        style={{ width: '100%' }}
      >{plan.price === '0' ? 'Присъедини се' : 'Абонирай се'}</button>
    </div>
  );
}

const tierLabel = {
  fontFamily: 'UniSans, sans-serif',
  fontSize: '0.75rem', letterSpacing: '0.2em',
  textTransform: 'uppercase', color: 'var(--honey)',
  marginBottom: '0.9rem',
};
const tierName = {
  fontFamily: 'UniSans, sans-serif',
  fontSize: '1.5rem', color: 'var(--cream)',
  marginBottom: '0.5rem',
  textTransform: 'uppercase', letterSpacing: '0.02em',
};
const tierPrice = {
  fontFamily: 'UniSans, sans-serif',
  fontSize: '2.6rem', color: 'var(--honey)',
  margin: '1.3rem 0',
};
const tierPer = {
  fontFamily: 'UniSans, sans-serif',
  fontSize: '0.85rem', color: 'var(--muted)',
  letterSpacing: '0.05em',
};
const tierFeatures = {
  listStyle: 'none', display: 'flex', flexDirection: 'column',
  gap: '0.8rem', margin: '1.6rem 0',
};
const tierFeatureItem = {
  display: 'flex', gap: '0.8rem',
  fontSize: '1.05rem', color: 'var(--text)',
  fontStyle: 'italic',
  fontFamily: 'Cormorant Garamond, serif',
};
