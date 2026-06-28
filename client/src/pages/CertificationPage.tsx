import PageHero from '../components/ui/PageHero';

export default function CertificationPage() {
  return (
    <main className="inner-page">
      <PageHero
        eyebrow="Quality Assurance"
        title="Certification"
        subtitle="Every bottle meets international standards of purity and safety."
      />
      <section className="page-section section">
        <div className="section-inner prose">
          <p>
            Elegancía undergoes rigorous laboratory testing and quality certification at every stage —
            from source to bottle. Our mineral composition is verified, our packaging is food-grade certified,
            and our facilities operate under strict hygiene protocols.
          </p>
          <p>
            We maintain full transparency in our sourcing and production processes, ensuring that every
            sip delivers the purity and elegance our brand promises.
          </p>
        </div>
      </section>
    </main>
  );
}
