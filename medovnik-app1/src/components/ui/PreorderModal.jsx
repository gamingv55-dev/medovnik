import { useState } from 'react';
import { formatPrice } from '../../utils/format';

// Paste your deployed Google Apps Script URL here after setup:
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznixroXH49aoXdDFts5ZT3kDU6ILG8msYcI9yw8wall0RViQD2er59-cgw8WN6CKkfTg/exec';

export default function PreorderModal({ items, total, onClose, onSuccess }) {
  const [name,  setName]  = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note,  setNote]  = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const params = new URLSearchParams({
        name,
        phone,
        email,
        items: items.map(i => i.name).join(', '),
        total,
        note,
        date: new Date().toLocaleString('bg-BG'),
      });
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      });
      setStatus('success');
      setTimeout(() => { onSuccess?.(); onClose?.(); }, 2200);
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
            <p>Ще се свържем с вас скоро!</p>
          </div>
        ) : (
          <>
            <h3 className="po-title">Предварителна поръчка</h3>

            <div className="po-summary">
              {items.map(item => (
                <div className="po-summary-row" key={item.id}>
                  <span>{item.emoji} {item.name}</span>
                  <span>{formatPrice(item.price)}</span>
                </div>
              ))}
              <div className="po-summary-total">
                <span>Общо</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <form className="po-form" onSubmit={handleSubmit}>
              <label className="po-label">
                Имe *
                <input
                  className="po-input"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Иван Иванов"
                  autoFocus
                />
              </label>

              <label className="po-label">
                Телефон *
                <input
                  className="po-input"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  placeholder="+359 88 888 8888"
                />
              </label>

              <label className="po-label">
                Имейл <span className="po-optional">(незадължително)</span>
                <input
                  className="po-input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ivan@example.com"
                />
              </label>

              <label className="po-label">
                Допълнителна информация <span className="po-optional">(незадължително)</span>
                <textarea
                  className="po-input po-textarea"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Адрес за доставка, въпроси, предпочитания…"
                  rows={3}
                />
              </label>

              {status === 'error' && (
                <p className="po-error">Нещо се обърка. Провери интернет връзката и опитай отново.</p>
              )}

              <button
                className="po-submit"
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Изпращане…' : 'Потвърди поръчката →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
