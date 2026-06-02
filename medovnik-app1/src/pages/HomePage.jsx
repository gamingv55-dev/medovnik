import { lazy, Suspense } from 'react';

import Hero          from '../components/sections/Hero';
import WhyMead from '../components/sections/WhyMead';
import Trust         from '../components/sections/Trust';

// Below-the-fold sections are split into their own chunks and rendered after
// first paint, so they don't run on the main thread during initial load.
const HowItWorks     = lazy(() => import('../components/sections/HowItWorks'));
const DiscordSection = lazy(() => import('../components/sections/DiscordSection'));
const Testimonials   = lazy(() => import('../components/sections/Testimonials'));
const FAQ            = lazy(() => import('../components/sections/FAQ'));
const CtaBanner      = lazy(() => import('../components/sections/CtaBanner'));

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
      <WhyMead />
      <Suspense fallback={null}>
        <HowItWorks />
        <DiscordSection />
        <Testimonials />
        <FAQ />
        <CtaBanner />
      </Suspense>
    </main>
  );
}
