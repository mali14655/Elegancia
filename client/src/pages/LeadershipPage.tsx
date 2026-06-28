import PageHero from '../components/ui/PageHero';
import { CHAIRMAN, CEO, LEADERSHIP_TEAM } from '../data/content';
import type { LeaderProfile } from '../data/content';

function LeaderPhotoCard({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="leader-photo-card">
      <div className="leader-photo">
        <img src={image} alt={name} className="leader-photo-img" loading="lazy" />
      </div>
      <div className="leader-photo-overlay">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </div>
  );
}

function LeaderMessage({
  profile,
  heading,
}: {
  profile: LeaderProfile;
  heading: string;
}) {
  return (
    <div className="leader-message">
      <p className="leader-message-tag">{profile.tag}</p>
      <h2>{heading}</h2>
      <p className="leader-message-role">{profile.role}</p>
      <p className="leader-message-lead">{profile.lead}</p>
      {profile.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
      <div className="leader-signature">
        <span className="leader-signature-line" aria-hidden />
        <strong>{profile.name}</strong>
      </div>
    </div>
  );
}

function LeaderSpotlight({
  profile,
  heading,
  alt = false,
}: {
  profile: LeaderProfile;
  heading: string;
  alt?: boolean;
}) {
  return (
    <section className={`leader-spotlight${alt ? ' leader-spotlight-alt' : ''}`}>
      <div className="section-inner leader-spotlight-row">
        <LeaderPhotoCard name={profile.name} role={profile.role} image={profile.image} />
        <LeaderMessage profile={profile} heading={heading} />
      </div>
    </section>
  );
}

export default function LeadershipPage() {
  return (
    <main className="inner-page leadership-page">
      <PageHero
        eyebrow="Governance"
        title="Leadership"
        subtitle="Meet the leadership behind Elegancía — guiding purity, elegance, and premium service across Pakistan."
      />

      <LeaderSpotlight profile={CHAIRMAN} heading="Chairman's Message" />
      <LeaderSpotlight profile={CEO} heading="CEO's Message" alt />

      <section className="leader-team-section section solid-light">
        <div className="section-inner">
          <div className="leader-team-head">
            <p className="section-eyebrow">Our People</p>
            <h2 className="section-heading">Leadership & Team</h2>
            <p className="section-sub leader-team-sub">
              The specialists who drive sales, operations, and partner success across Pakistan.
            </p>
          </div>
          <div className="leader-team-grid leader-team-grid-single">
            {LEADERSHIP_TEAM.map((person) => (
              <article key={person.name} className="leader-team-card">
                <div className="leader-team-photo">
                  <img src={person.image} alt={person.name} className="leader-team-photo-img" loading="lazy" />
                </div>
                <div className="leader-team-body">
                  <h3>{person.name}</h3>
                  <p className="leader-team-role">{person.role}</p>
                  <p>{person.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
