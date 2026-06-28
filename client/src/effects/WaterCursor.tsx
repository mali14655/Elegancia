import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function WaterCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add('custom-cursor-active');
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.14, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.14, ease: 'power2.out' });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onEnter = () => gsap.to(cursor, { scale: 1.6, duration: 0.2 });
    const onLeave = () => gsap.to(cursor, { scale: 1, duration: 0.2 });

    window.addEventListener('mousemove', move);

    const interactives = 'a, button, input, textarea, select, [role="button"]';
    document.querySelectorAll(interactives).forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return <div ref={cursorRef} className="water-cursor-simple" aria-hidden />;
}
