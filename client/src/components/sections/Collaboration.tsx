import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../../assets';

export default function Collaboration() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const partners = ASSETS.partners;

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!row1 || !row2) return;

    const t1 = gsap.to(row1, { x: '-50%', duration: 60, repeat: -1, ease: 'none' });
    const t2 = gsap.fromTo(row2, { x: '-50%' }, { x: '0%', duration: 70, repeat: -1, ease: 'none' });

    return () => { t1.kill(); t2.kill(); };
  }, []);

  const renderLogo = (src: string, key: string) => (
    <div key={key} className="partner-logo-card">
      <img src={src} alt="Partner" loading="lazy" />
    </div>
  );

  const row1Logos = [...partners, ...partners];
  const row2Logos = [...partners].reverse().concat([...partners].reverse());

  return (
    <section className="collaboration section solid-secondary">
      <div className="collab-sky-band" aria-hidden />
      <div className="section-inner">
        <div className="collab-header">
          <p className="section-eyebrow">Cooperate</p>
          <h2 className="section-heading">Collaboration</h2>
          <p className="section-sub collab-sub">
            Trusted by leading hotels, restaurants, and brands who choose elegance in every detail.
          </p>
        </div>
        <div className="marquee-wrap">
          <div ref={row1Ref} className="marquee-track">
            {row1Logos.map((src, i) => renderLogo(src, `a-${i}`))}
          </div>
        </div>
        <div className="marquee-wrap">
          <div ref={row2Ref} className="marquee-track reverse">
            {row2Logos.map((src, i) => renderLogo(src, `b-${i}`))}
          </div>
        </div>
      </div>
    </section>
  );
}
