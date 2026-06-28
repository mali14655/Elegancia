import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WATER_CATEGORIES } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function WaterCategories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from('.category-card', {
      scrollTrigger: { trigger: section, start: 'top 80%' },
      y: 30, opacity: 0, stagger: 0.1, duration: 0.45, ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} className="categories section solid-white">
      <div className="section-inner">
        <p className="section-eyebrow">Our Offerings</p>
        <h2 className="section-heading">Our Services</h2>
        <p className="section-sub">Professional hydration solutions tailored for homes, businesses, and elite experiences.</p>
        <div className="categories-grid">
          {WATER_CATEGORIES.map((c) => (
            <Link key={c.title} to={c.path} className="category-card plutonic-card">
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className="category-explore">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
