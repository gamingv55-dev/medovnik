import { Link } from 'react-router-dom';
const logo = '/logo.webp';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            <img className="footer-logo-img" src={logo} alt="Медовник" />
            <div className="footer-logo">Медовник</div>
          </div>
          <div className="footer-desc">
            Българско движение за домашно варене на медовина.
            Вярваме, че всеки може да направи нещо прекрасно с ръцете си.
          </div>
        </div>

        <FooterCol title="Магазин" links={[
          { label: 'Starter Kit', to: '/shop' },
          { label: 'Premium Kit', to: '/shop' },
          { label: 'Абонамент',   to: '/shop' },
        ]} />

        <FooterCol title="Помощ" links={[
          { label: 'Discord',    to: '/community' },
          { label: 'Партньори', to: '/partners' },
        ]} faqLink />
      </div>

      <div className="footer-bottom">
        <span className="fc">© {year} Медовник · Всички права запазени · All Rights Reserved</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, faqLink }) {
  return (
    <div>
      <div className="fc-title">{title}</div>
      <ul className="fc-links">
        {faqLink && (
          <li>
            <a href="/#faq" onClick={(e) => {
              const el = document.getElementById('faq');
              if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
            }}>FAQ</a>
          </li>
        )}
        {links.map((l) => (
          <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
