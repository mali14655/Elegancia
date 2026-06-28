import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import { DISTRIBUTORS, DISTRIBUTORS_INTRO } from '../data/content';

function phoneHref(phone: string) {
  const digits = phone.split(',')[0].replace(/\D/g, '');
  return digits.startsWith('92') ? `tel:+${digits}` : `tel:+92${digits.replace(/^0/, '')}`;
}

function formatEmail(email?: string | null) {
  if (!email || email.toLowerCase() === 'null') return null;
  return email;
}

export default function DistributorsPage() {
  return (
    <main className="inner-page distributors-page">
      <PageHero
        eyebrow="Distribution"
        title="Distributors"
        subtitle="Find an authorised Elegancía distributor near you."
      />

      <section className="page-section section">
        <div className="section-inner">
          <p className="distributors-intro">{DISTRIBUTORS_INTRO}</p>

          <div className="distributors-list-head">
            <p className="section-eyebrow">Distribution List</p>
            <h2 className="section-heading">Our Partners</h2>
          </div>

          <div className="distributors-grid">
            {DISTRIBUTORS.map((d) => {
              const email = formatEmail(d.email);
              return (
                <article key={`${d.name}-${d.city}`} className="distributor-card">
                  {d.image && (
                    <div className={`distributor-photo${d.image.includes('/logo.png') ? ' distributor-photo-logo' : ''}`}>
                      <img src={d.image} alt={d.name} className="distributor-photo-img" loading="lazy" />
                    </div>
                  )}
                  <div className="distributor-body">
                    <h3>{d.name}</h3>
                    <dl className="distributor-details">
                    <div>
                      <dt>City</dt>
                      <dd>{d.city}</dd>
                    </div>
                    {d.address && (
                      <div>
                        <dt>Address</dt>
                        <dd>{d.address}</dd>
                      </div>
                    )}
                    {d.phone && (
                      <div>
                        <dt>Contact</dt>
                        <dd>
                          <a href={phoneHref(d.phone)}>{d.phone}</a>
                        </dd>
                      </div>
                    )}
                    {email && (
                      <div>
                        <dt>Email</dt>
                        <dd>
                          <a href={`mailto:${email}`}>{email}</a>
                        </dd>
                      </div>
                    )}
                  </dl>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="distributors-cta">
            <p>Interested in becoming a distributor?</p>
            <Link to="/partner" className="btn-primary">Apply to Distribute</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
