import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(ref.current?.children ?? [], {
      y: 20, stagger: 0.08, duration: 0.45, ease: 'power2.out', delay: 0.1,
    });
  }, []);

  return (
    <div ref={ref} className="page-hero">
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <p className="page-hero-sub">{subtitle}</p>}
    </div>
  );
}
