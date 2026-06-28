import PageHero from '../components/ui/PageHero';

export default function AboutPage() {
  return (
    <main className="inner-page">
      <PageHero
        eyebrow="Our Story"
        title="About Elegancía"
        subtitle="Because true refinement flows from within."
      />
      <section className="page-section section">
        <div className="section-inner prose">
          <p>
            Elegancía is more than premium bottled water — it is a symbol of elegance, purity, and refinement.
            Bottled with care and enriched with nature&apos;s purity, every detail is crafted for those who see
            elegance in every sip.
          </p>
          <p>
            From responsible sourcing to luxurious presentation, every step embodies our dedication to quality,
            sustainability, and the art of living beautifully.
          </p>
        </div>
      </section>
      <section className="page-section section" id="why">
        <div className="section-inner">
          <h2 className="section-heading">Why Choose Us</h2>
          <div className="feature-grid">
            {[
              { title: 'Natural Purity', desc: 'Sourced from pristine natural springs with meticulous quality control.' },
              { title: 'Mineral Balance', desc: 'Scientifically enriched composition for refined taste and wellness.' },
              { title: 'Elegant Design', desc: 'Premium glass bottles that elevate every table and occasion.' },
              { title: 'Trusted Brand', desc: 'Chosen by elite establishments, hotels, and discerning households.' },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
