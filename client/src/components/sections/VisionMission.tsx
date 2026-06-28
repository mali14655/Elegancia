import { useEffect, useRef } from 'react';
import { ASSETS } from '../../assets';

export default function VisionMission() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="mission-section section" id="vision">
      <div className="mission-video-wrap">
        <video
          ref={videoRef}
          className="mission-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={ASSETS.video}
        />
      </div>
      <div className="mission-content section-inner">
        <p className="section-eyebrow">Our Mission</p>
        <h2 className="section-heading">Our Vision to Mission</h2>
        <p className="mission-text">
          To be the most trusted and admired premium water brand, a symbol of elegance, purity, and refinement
          in every home, event, and establishment across the world. We envision a future where every sip of
          Elegancía reflects sophistication, sustainability, and the art of living beautifully.
        </p>
        <p className="mission-text">
          From responsible sourcing to luxurious presentation, every step embodies our dedication to quality,
          sustainability, and elegance. We aim to inspire a lifestyle that values purity, wellness, and the subtle
          art of sophistication — because elegance is not created; it&apos;s cultivated.
        </p>
      </div>
    </section>
  );
}
