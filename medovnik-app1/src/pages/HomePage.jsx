import Hero          from '../components/sections/Hero';
import Trust         from '../components/sections/Trust';
import Movement      from '../components/sections/Movement';
import HowItWorks    from '../components/sections/HowItWorks';
import DiscordSection from '../components/sections/DiscordSection';
import Testimonials  from '../components/sections/Testimonials';
import FAQ           from '../components/sections/FAQ';
import CtaBanner     from '../components/sections/CtaBanner';

/**
 * Home page — composed of the hero, the trust strip, the
 * "Why mead" manifesto, the four-step explainer, the Discord
 * pitch, social proof, FAQ, and the final CTA.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Trust />
      <Movement />
      <HowItWorks />
      <DiscordSection />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </main>
  );
}
