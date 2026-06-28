import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../products/ProductCard';
import CustomOrderSection from '../products/CustomOrderSection';

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from('.product-card-v2', {
      scrollTrigger: { trigger: section, start: 'top 85%' },
      y: 24, stagger: 0.06, duration: 0.4, ease: 'power2.out', immediateRender: false,
    });
  }, []);

  return (
    <section ref={sectionRef} className="products section solid-light" id="products">
      <div className="section-inner">
        <p className="section-eyebrow">Pure Collection</p>
        <h2 className="section-heading">Popular Products</h2>
        <p className="section-sub">Premium mineral water — crafted for those who see elegance in every detail.</p>
        <div className="products-grid">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <CustomOrderSection />
      </div>
    </section>
  );
}
