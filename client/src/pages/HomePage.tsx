import Hero from '../components/sections/Hero';
import ProductShowcase from '../components/sections/ProductShowcase';
import StatsRow from '../components/sections/StatsRow';
import WaterComposition from '../components/sections/WaterComposition';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import VisionMission from '../components/sections/VisionMission';
import Collaboration from '../components/sections/Collaboration';
import Testimonials, { PartnerCTA } from '../components/sections/Testimonials';

export default function HomePage() {
  return (
    <main className="home-page">
      <Hero />
      <ProductShowcase />
      <StatsRow />
      <WaterComposition />
      <WhyChooseUs />
      <VisionMission />
      <Collaboration />
      <Testimonials />
      <PartnerCTA />
    </main>
  );
}
