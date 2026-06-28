import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ASSETS } from '../../assets';
import { NAV_LINKS } from '../../data/content';
import CartButton from '../cart/CartButton';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const renderNavLinks = () =>
    NAV_LINKS.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className={location.pathname === link.path ? 'active' : ''}
        onClick={() => setOpen(false)}
      >
        {link.label}
      </Link>
    ));

  return (
    <>
      <div
        className={`mobile-nav-backdrop${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <nav
        className={`header-nav header-nav--drawer${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <div className="mobile-nav-head">
          <span className="mobile-nav-label">Menu</span>
          <button
            type="button"
            className="mobile-nav-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="mobile-nav-links">{renderNavLinks()}</div>
        <div className="mobile-nav-foot">
          <CartButton showLabel />
          <Link to="/products" className="btn-primary mobile-nav-cta" onClick={() => setOpen(false)}>
            Shop Now
          </Link>
        </div>
      </nav>
      <header className={`site-header${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="header-logo" onClick={() => setOpen(false)}>
            <img src={ASSETS.logo} alt="Elegancía" />
          </Link>
          <nav className="header-nav header-nav--desktop">{renderNavLinks()}</nav>
          <div className="header-actions">
            <div className="header-cart-desktop">
              <CartButton />
            </div>
            <button
              type="button"
              className={`header-toggle${open ? ' open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
