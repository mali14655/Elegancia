export default function AnimatedWave() {
  return (
    <div className="animated-wave" aria-hidden>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="wave-layer wave-1">
        <path fill="none" stroke="#BAE6FD" strokeWidth="2" opacity="0.7" d="M0,24 C240,8 480,40 720,24 C960,8 1200,40 1440,24" />
      </svg>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="wave-layer wave-2">
        <path fill="none" stroke="#7DD3FC" strokeWidth="1.5" opacity="0.5" d="M0,28 C360,12 720,44 1080,28 C1260,20 1380,32 1440,28" />
      </svg>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="wave-layer wave-3">
        <path fill="none" stroke="#00AEEF" strokeWidth="1" opacity="0.35" d="M0,32 C180,16 540,48 900,32 C1170,20 1350,40 1440,32" />
      </svg>
    </div>
  );
}
