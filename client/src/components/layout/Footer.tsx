import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ASSETS } from '../../assets';
import { FOOTER_COLS } from '../../data/content';
import AnimatedWave from '../ui/AnimatedWave';

export default function Footer() {
  const hoverSocial = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1.25, rotation: 8, duration: 0.2 });
  };
  const leaveSocial = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { scale: 1, rotation: 0, duration: 0.2 });
  };

  return (
    <footer className="site-footer">
      <div className="footer-sky" aria-hidden />
      <div className="footer-inner">
      <img src={ASSETS.logo} alt="Elegancía" className="footer-logo" loading="lazy" />
      <AnimatedWave />
      <div className="footer-grid">
        <div className="footer-col">
          <h4>Get Started</h4>
          {FOOTER_COLS.getStarted.map((l) => (
            <Link key={l.path} to={l.path}>{l.label}</Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>More Info</h4>
          {FOOTER_COLS.moreInfo.map((l) => (
            <Link key={l.path} to={l.path}>{l.label}</Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Contact Info</h4>
          {FOOTER_COLS.contact.emails.map((e) => (
            <a key={e} href={`mailto:${e}`}>{e}</a>
          ))}
          <a href="tel:+923134666686">{FOOTER_COLS.contact.phone}</a>
          <p>{FOOTER_COLS.contact.location}</p>
        </div>
      </div>
      <div className="footer-social">
        {['Facebook', 'Instagram', 'YouTube', 'TikTok'].map((s) => (
          <a key={s} href="#" onMouseEnter={hoverSocial} onMouseLeave={leaveSocial}>{s}</a>
        ))}
      </div>
      <p className="footer-copy">&copy; Elegancía — All Rights Reserved</p>
      </div>
    </footer>
  );
}
