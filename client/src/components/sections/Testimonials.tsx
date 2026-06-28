import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../../data/content';

export default function Testimonials() {
  return (
    <section className="testimonials section solid-white">
      <div className="section-inner">
        <p className="section-eyebrow">Reviews</p>
        <h2 className="section-heading">What our clients say</h2>
        <p className="section-sub">Trusted by homeowners and businesses across Pakistan</p>
        <div className="reviews-grid">
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="review-card">
              <span className="review-stars">★★★★★</span>
              <p>{t.text}</p>
              <h4>{t.name}</h4>
              <span className="review-city">{t.city}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerCTA() {
  return (
    <section className="partner-cta section">
      <div className="partner-cta-sky" aria-hidden />
      <div className="partner-cta-card section-inner">
        <p className="partner-eyebrow">Partnership</p>
        <h2 className="partner-heading">Become Our Partner</h2>
        <p className="partner-text">
          Join hands with a brand that defines refinement. Let&apos;s create value, share vision, and bring the purity of
          The Water of Elites to more people around the world.
        </p>
        <div className="partner-cta-actions">
          <Link to="/partner" className="btn-partner-primary">Become a Partner</Link>
          <Link to="/contact" className="btn-partner-outline">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
