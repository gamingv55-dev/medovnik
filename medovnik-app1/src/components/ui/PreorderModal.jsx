import { useState } from 'react';
import { formatPrice } from '../../utils/format';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznixroXH49aoXdDFts5ZT3kDU6ILG8msYcI9yw8wall0RViQD2er59-cgw8WN6CKkfTg/exec';
const EUR_RATE   = 1.95583;

// Excludes ambiguous chars (0/O, 1/I/L) so codes are easy to read and communicate.
const CODE_CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
function generateOrderCode() {
  let suffix = '';
  const arr = new Uint8Array(7);
  crypto.getRandomValues(arr);
  for (const byte of arr) suffix += CODE_CHARS[byte % CODE_CHARS.length];
  return 'MDV-' + suffix;
}

export default function PreorderModal({ items, total, discordUnlocked, onClose, onSuccess }) {
  const [name,   setName]   = useState('');
  const [phone,  setPhone]  = useState('');
  const [email,  setEmail]  = useState('');
  const [note,   setNote]   = useState('');
  const [status, setStatus] = useState('idle');
  const [orderCode]         = useState(generateOrderCode);

  const totalEur = items
    .reduce((s, i) => s + (i.priceEur ?? i.price / EUR_RATE) * (i.qty || 1), 0)
    .toFixed(2);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const itemsDetail = items.map(i => ({
        name:     i.name,
        qty:      i.qty || 1,
        priceEur: i.priceEur ? Number(i.priceEur) : Number((i.price / EUR_RATE).toFixed(2)),
        priceBgn: i.price,
      }));

      const params = new URLSearchParams({
        orderCode,
        name,
        phone,
        email,
        note:            note || '',
        date:            new Date().toLocaleString('bg-BG'),
        items:           items.map(i => `${i.name}${i.qty > 1 ? ' ×' + i.qty : ''}`).join(', '),
        total:           total,
        totalEur:        totalEur,
        discordUnlocked: discordUnlocked ? '1' : '0',
        itemsJson:       JSON.stringify(itemsDetail),
      });

      await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: params });
      setStatus('success');
      setTimeout(() => { onSuccess?.(); onClose?.(); }, 2400);
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="po-modal" role="dialog" aria-modal="true" aria-label="Предварителна поръчка">
      <div className="po-card">
        <button className="po-close" onClick={onClose} aria-label="Затвори">✕</button>

        {status === 'success' ? (
          <div className="po-success">
            <div className="po-success-icon">✓</div>
            <h3>Поръчката е приета!</h3>
            <p style={{ marginBottom: '0.5rem' }}>
              Изпратихме потвърждение на <strong>{email}</strong>.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Код на поръчката:{' '}
              <strong style={{ fontFamily: 'monospace', letterSpacing: '0.08em', fontSize: '1.1em' }}>
                {orderCode}
              </strong>
            </p>
            <p style={{ fontSize: '0.88rem', opacity: 0.7 }}>Ще се свържем с вас скоро!</p>
          </div>
        ) : (
          <>
            <h3 className="po-title">Предварителна поръчка</h3>

            <div className="po-summary">
              {items.map(item => (
                <div className="po-summary-row" key={item.id}>
                  <span>
                    {item.emoji && `${item.emoji} `}{item.name}
                    {item.qty > 1 && <span className="po-qty"> ×{item.qty}</span>}
                  </span>
                  <span>{formatPrice(item.price * (item.qty || 1))}</span>
                </div>
              ))}
              <div className="po-summary-total">
                <span>Общо</span>
                <span>{totalEur} € / {formatPrice(total)}</span>
              </div>
            </div>

            <form className="po-form" onSubmit={handleSubmit}>
              <label className="po-label">
                Имe *
                <input className="po-input" type="text" value={name}
                  onChange={e => setName(e.target.value)} required placeholder="Иван Иванов" autoFocus />
              </label>

              <label className="po-label">
                Телефон *
                <input className="po-input" type="tel" value={phone}
                  onChange={e => setPhone(e.target.value)} required placeholder="+359 88 888 8888" />
              </label>

              <label className="po-label">
                Имейл * <span className="po-optional">(за потвърждение на поръчката)</span>
                <input className="po-input" type="email" value={email}
                  onChange={e => setEmail(e.target.value)} required placeholder="ivan@example.com" />
              </label>

              <label className="po-label">
                Допълнителна информация <span className="po-optional">(незадължително)</span>
                <textarea className="po-input po-textarea" value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Адрес за доставка, въпроси, предпочитания…" rows={3} />
              </label>

              {status === 'error' && (
                <p className="po-error">Нещо се обърка. Провери интернет връзката и опитай отново.</p>
              )}

              <button className="po-submit" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Изпращане…' : 'Потвърди поръчката →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
