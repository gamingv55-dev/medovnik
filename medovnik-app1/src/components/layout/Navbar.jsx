import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useScrolled } from '../../hooks/useScrolled';
// import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
const logo = '/logo.webp';
import { CartIcon } from '../ui/Icons';
import ContactDropdown from './ContactDropdown';
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
          style={scrolled
            ? { width: 72, height: 68, margin: '0 15px 0 0', transition: 'all 0.35s ease' }
            : { width: 160, height: 150, margin: '-2px 15px -90px 0', transition: 'all 0.35s ease' }
          }
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
        <NavItem to="/"       onClick={closeMenu}>Начало</NavItem>
        <NavItem to="/shop"   onClick={closeMenu}>Магазин</NavItem>
        <NavItem to="/community" onClick={closeMenu}>Общност</NavItem>
        <NavItem to="/partners" onClick={closeMenu}>Партньори</NavItem>
        {/* {user && (
          <NavItem to="/my-mead" onClick={closeMenu}>Моята медовина</NavItem>
        )} */}
        <li className="nav-contact-wrap">
          <ContactDropdown />
        </li>
      </ul>

      <div className="nav-icons" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>

        <a className="nav-social" href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z"/></svg>
        </a>
        <a className="nav-social" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>

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
  const { pathname, hash } = useLocation();
  const active = to.includes('#') ? `${pathname}${hash}` === to : pathname === to && !hash;
  return (
    <li>
      <NavLink to={to} onClick={onClick} className={active ? 'active' : ''}>
        {children}
      </NavLink>
    </li>
  );
}
