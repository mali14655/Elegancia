import { STATS } from '../../data/content';

export default function StatsRow() {
  return (
    <section className="stats-row section solid-secondary">
      <div className="section-inner stats-inner">
        {STATS.map((s) => (
          <div key={s.label} className="stat-item">
            <p className="stat-value">{s.value}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
