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

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <img src={ASSETS.logo} alt="Elegancía" />
        </Link>
        <nav className={`header-nav ${open ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path} className={location.pathname === link.path ? 'active' : ''}>
              {link.label}
            </Link>
          ))}
          <CartButton />
        </nav>
        <button type="button" className="header-toggle" onClick={() => setOpen(!open)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
