import { useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { PhoneIcon, MailIcon } from '../ui/Icons';

const PHONE = '+359988779092';
const EMAIL = 'medovnikbg@gmail.com';

/**
 * "Контакти ▼" dropdown in the main nav. Closes on outside click.
 * Phone/email rows have a copy-to-clipboard button each.
 */
export default function ContactDropdown() {
  const [open, setOpen]   = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  return (
    <span ref={ref}>
      <button className="nav-link-btn" onClick={() => setOpen(o => !o)}>
        Контакти ▼
      </button>
      <div className={`contact-drop${open ? ' open' : ''}`} style={{ fontWeight: 500, width: 380 }}>
        <div className="contact-drop-head">Свържи се с нас</div>
        <ContactRow icon={<PhoneIcon size={18} />} label="Телефон" value="+359 98 877 9092" href={`tel:${PHONE}`} copy={PHONE} />
        <ContactRow icon={<MailIcon size={18} />}  label="Имейл"   value={EMAIL}            href={`mailto:${EMAIL}`} copy={EMAIL} />
      </div>
    </span>
  );
}

function ContactRow({ icon, label, value, href, copy }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e) {
    e.preventDefault();
    e.stopPropagation();
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(copy).then(done).catch(done);
    } else {
      // Older browsers fallback
      const ta = document.createElement('textarea');
      ta.value = copy;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove();
      done();
    }
  }

  return (
    <a className="contact-row" href={href} style={{ padding: '8px 16px' }}>
      <div className="contact-ico">{icon}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div className="contact-lbl">{label}</div>
        <div
          className="contact-val"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.95rem',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}
        >{value}</div>
      </div>
      <button
        className={`contact-copy${copied ? ' copied' : ''}`}
        type="button"
        aria-label={`Копирай ${label.toLowerCase()}`}
        onClick={handleCopy}
      >
        <svg className="copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
    </a>
  );
}
