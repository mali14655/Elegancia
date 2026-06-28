import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../../assets';
import HeroWaterEffects from '../../effects/HeroWaterEffects';

export default function Hero() {
  const bottleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from('.hero-reveal', {
      y: 20, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.15,
    });

    const bottle = bottleRef.current;
    if (bottle) {
      gsap.to(bottle, { y: -8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
  }, []);

  return (
    <section ref={heroRef} className="hero section">
      <div className="hero-sky" aria-hidden />
      <HeroWaterEffects heroRef={heroRef} />
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-badge hero-reveal">THE WATER OF ELITES</p>
          <h1 className="hero-title hero-reveal">
            <span>Make every sip</span>
            <span className="water-gradient">as pure as nature</span>
          </h1>
          <p className="hero-sub hero-reveal">
            Premium mineral water bottled with care — crafted for those who see elegance in every detail.
          </p>
          <div className="hero-btns hero-reveal">
            <Link to="/products" className="btn-primary">Buy Now</Link>
            <Link to="/partner" className="btn-outline">Become Partner</Link>
          </div>
        </div>
        <div className="hero-visual hero-reveal">
          <div ref={bottleRef} className="hero-bottle-wrap">
            <div className="hero-bottle-glow" aria-hidden />
            <img
              src={ASSETS.waterBottle}
              alt="Elegancía 500ml"
              className="hero-bottle-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
