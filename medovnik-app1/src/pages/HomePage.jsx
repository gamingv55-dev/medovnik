import { lazy, Suspense } from 'react';

import Hero    from '../components/sections/Hero';
import WhyMead from '../components/sections/WhyMead';
import Trust   from '../components/sections/Trust';

// Below-the-fold sections are split into their own chunks and rendered after
// first paint, so they don't run on the main thread during initial load.
const HowItWorks     = lazy(() => import('../components/sections/HowItWorks'));
const Memories       = lazy(() => import('../components/sections/Memories'));
const DiscordSection = lazy(() => import('../components/sections/DiscordSection'));
const FAQ            = lazy(() => import('../components/sections/FAQ'));
const CtaBanner      = lazy(() => import('../components/sections/CtaBanner'));

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Trust />
      <WhyMead />
      <Suspense fallback={null}>
        <HowItWorks />
        <Memories />
        <DiscordSection />
        <FAQ />
        <CtaBanner />
      </Suspense>
    </main>
  );
}
