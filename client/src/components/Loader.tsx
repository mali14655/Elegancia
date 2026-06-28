import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../assets';

interface LoaderProps {
  onComplete: () => void;
  onRipple?: (x: number, y: number) => void;
}

export default function Loader({ onComplete, onRipple }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const drop = dropRef.current;
    const splash = splashRef.current;
    const tagline = taglineRef.current;
    const line = lineRef.current;
    if (!overlay || !logo || !drop || !splash || !tagline || !line) return;

    const text = 'THE WATER OF ELITES';
    tagline.innerHTML = text.split('').map((c) => `<span>${c === ' ' ? '&nbsp;' : c}</span>`).join('');
    const letters = tagline.querySelectorAll('span');

    gsap.set(logo, { scale: 0, opacity: 0 });
    gsap.set(drop, { y: 0, opacity: 0 });
    gsap.set(splash, { scale: 0, opacity: 0 });
    gsap.set(letters, { y: -10, opacity: 0 });
    gsap.set(line, { scaleX: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        if (doneRef.current) return;
        doneRef.current = true;
        onComplete();
      },
    });

    tl.to(logo, { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
      .to(drop, { opacity: 1, duration: 0.1 }, 0.8)
      .to(drop, { y: 40, duration: 0.35, ease: 'power2.in' }, 0.8)
      .call(() => {
        const rect = drop.getBoundingClientRect();
        onRipple?.(rect.left + rect.width / 2, rect.bottom);
      }, [], 1.15)
      .to(splash, { scale: 1, opacity: 1, duration: 0.15, ease: 'power2.out' }, 1.15)
      .to(splash, { scale: 2.5, opacity: 0, duration: 0.35, ease: 'power2.out' }, 1.3)
      .to(letters, { y: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: 'power2.out' }, 1.2)
      .to(line, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 2.2)
      .to(overlay, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'power3.inOut' }, 3.0);

    return () => { tl.kill(); };
  }, [onComplete, onRipple]);

  return (
    <div ref={overlayRef} className="loader-overlay">
      <img ref={logoRef} src={ASSETS.logo} alt="Elegancía" className="loader-logo" />
      <div ref={dropRef} className="loader-drop" />
      <div ref={splashRef} className="loader-splash" />
      <p ref={taglineRef} className="loader-tagline" />
      <div ref={lineRef} className="loader-line" />
    </div>
  );
}
