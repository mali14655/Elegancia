import { WHY_CHOOSE } from '../../data/content';

export default function WhyChooseUs() {
  return (
    <section className="why-choose section solid-white">
      <div className="section-inner">
        <p className="section-eyebrow">Why Elegancía</p>
        <h2 className="section-heading">Why Choose Us</h2>
        <div className="why-grid">
          {WHY_CHOOSE.map((item) => (
            <div key={item.title} className="why-card plutonic-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
