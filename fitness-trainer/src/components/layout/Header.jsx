import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useScrolled } from '@/hooks/useScrolled';
import Button from '@/components/ui/Button';
import './Header.css';

const NAV_LINKS = [
  { to: '/',        label: 'Начало',   end: true },
  { to: '/about',   label: 'За мен' },
  { to: '/services', label: 'Услуги' },
  { to: '/results', label: 'Резултати' },
  { to: '/speaker', label: 'Лектор' },
  { to: '/contact', label: 'Контакт' },
];

export default function Header() {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo" onClick={close}>
          VK<span className="header__logo-dot">.</span>
          <span className="header__logo-sub">Персонален треньор</span>
        </Link>

        <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`} aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => isActive ? 'header__link header__link--active' : 'header__link'}
              onClick={close}
            >
              {label}
            </NavLink>
          ))}
          <Button as={Link} to="/contact" variant="primary" className="header__cta" onClick={close}>
            Запази час
          </Button>
        </nav>

        <button
          className={`header__toggle${menuOpen ? ' header__toggle--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Затвори меню' : 'Отвори меню'}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
