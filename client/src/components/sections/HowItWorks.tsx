import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOW_IT_WORKS } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from('.step-card', {
      scrollTrigger: { trigger: section, start: 'top 80%' },
      y: 30, opacity: 0, stagger: 0.1, duration: 0.45, ease: 'power2.out',
    });
  }, []);

  return (
    <section ref={sectionRef} className="how-it-works section solid-secondary">
      <div className="section-inner">
        <p className="section-eyebrow">Simple process</p>
        <h2 className="section-heading">How it works</h2>
        <p className="section-sub">
          Experience premium mineral water in four easy steps — from browse to delivery.
        </p>
        <div className="steps-grid">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="step-card plutonic-card">
              <span className="step-num">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="steps-cta">
          <Link to="/partner" className="btn-primary">Start Booking</Link>
          <Link to="/products" className="btn-outline">View all products</Link>
        </div>
      </div>
    </section>
  );
}
