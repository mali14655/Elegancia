import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../../assets';
import { MINERALS } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

function DropletIcon({ id }: { id: string }) {
  return (
    <svg className="droplet-icon" viewBox="0 0 24 28" fill="none" aria-hidden>
      <path
        d="M12 2C12 2 4 12 4 17.5C4 21.1 7.6 24 12 24C16.4 24 20 21.1 20 17.5C20 12 12 2 12 2Z"
        fill={`url(#dropletGrad-${id})`}
        stroke="#00AEEF"
        strokeWidth="1.2"
      />
      <defs>
        <linearGradient id={`dropletGrad-${id}`} x1="12" y1="2" x2="12" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8F6FC" />
          <stop offset="1" stopColor="#BAE6FD" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function WaterComposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from('.droplet-card', {
      scrollTrigger: { trigger: section, start: 'top 85%' },
      y: 24, duration: 0.45, stagger: 0.06, ease: 'power2.out', immediateRender: false,
    });

    const bottle = bottleRef.current;
    if (bottle) {
      gsap.to(bottle, { y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
  }, []);

  return (
    <section ref={sectionRef} className="composition section solid-white" id="composition">
      <div className="section-inner">
        <p className="section-eyebrow">What&apos;s Inside?</p>
        <h2 className="section-heading">Water Composition</h2>
        <p className="section-sub">Professional mineral balance tailored for refined taste and wellness.</p>
        <div className="mineral-layout">
          <div className="mineral-grid">
            {MINERALS.map((m) => (
              <div key={m.name} className="droplet-card">
                <DropletIcon id={m.name} />
                <span className="droplet-symbol">{m.symbol}</span>
                <p className="droplet-value">{m.value}</p>
                <p className="droplet-name">{m.name}</p>
                <p className="droplet-desc">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="composition-bottle-col">
            <div ref={bottleRef} className="composition-bottle-float">
              <img
                src={ASSETS.waterBottle}
                alt="Elegancía premium bottle"
                className="composition-bottle-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
