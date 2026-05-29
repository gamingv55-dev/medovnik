import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useScrolled } from '../../hooks/useScrolled';
// import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
const logo = '/logo.png';
import ContactDropdown from './ContactDropdown';
import { CartIcon } from '../ui/Icons';
// import UserChip from './UserChip';

/**
 * Sticky top nav. Switches to a solid blurred background once the
 * user scrolls past 60px. Collapses into a slide-in panel below
 * 768px via a hamburger toggle.
 */
export default function Navbar() {
  const scrolled              = useScrolled(60);
  // const { user, openAuth }    = useAuth();
  const { count, toggleCart } = useCart();
  const [menuOpen, setMenu]   = useState(false);

  const closeMenu = () => {
    setMenu(false);
    document.body.style.overflow = '';
  };
  const toggleMenu = () => {
    setMenu((open) => {
      const next = !open;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  return (
    <nav className={`nav${scrolled ? ' solid' : ''}`} id="nav" style={{ padding: '19px 56px 19px 18px' }}>
      <Link to="/" className="logo-wrap" aria-label="Медовник" onClick={closeMenu}>
        <img
          className="logo-img"
          src={logo}
          alt="Медовник"
          style={{ width: 160, height: 150, margin: '-2px 15px -90px 0' }}
          fetchpriority="high"
          decoding="async"
        />
        {/* Wordmark hidden — the logo PNG already contains the word "МЕДОВНИК". */}
        <span className="logo-text" style={{ display: 'none' }}>Медовник</span>
      </Link>

      {/* Hamburger — mobile only, hidden ≥768px via CSS */}
      <button
        className={`nav-toggle${menuOpen ? ' open' : ''}`}
        type="button"
        aria-label="Меню"
        onClick={toggleMenu}
      >
        <span /><span /><span />
      </button>

      <ul
        className={`nav-links${menuOpen ? ' open' : ''}`}
        style={{ padding: '0 15px 0 0' }}
      >
        <NavItem to="/"          onClick={closeMenu}>Начало</NavItem>
        <NavItem to="/shop"      onClick={closeMenu}>Магазин</NavItem>
        <NavItem to="/community" onClick={closeMenu}>Общност</NavItem>
        <NavItem to="/reviews"   onClick={closeMenu}>Обратна връзка</NavItem>
        {/* {user && (
          <NavItem to="/my-mead" onClick={closeMenu}>Моята медовина</NavItem>
        )} */}
        <li className="nav-contact-wrap">
          <ContactDropdown />
        </li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>

        <button className="cart-ico-btn" onClick={toggleCart} aria-label="Количка">
          <CartIcon size={22} />
          {count > 0 && (
            <span className="cart-badge" style={{ display: 'flex' }}>{count}</span>
          )}
        </button>

        <Link className="nav-cta" to="/shop" onClick={closeMenu}>
          Купи сега
        </Link>
      </div>
    </nav>
  );
}

/* ── NavLink wrapper that mirrors the original .active styling ───── */
function NavItem({ to, onClick, children }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <li>
      <NavLink to={to} onClick={onClick} className={active ? 'active' : ''}>
        {children}
      </NavLink>
    </li>
  );
}
