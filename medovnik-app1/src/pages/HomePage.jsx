import { lazy, Suspense } from 'react';

import Hero         from '../components/sections/Hero';
import WhyMead      from '../components/sections/WhyMead';
import Trust        from '../components/sections/Trust';
import ScrollReveal from '../components/layout/ScrollReveal';

// Below-the-fold sections are split into their own chunks and rendered after
// first paint, so they don't run on the main thread during initial load.
const HowItWorks     = lazy(() => import('../components/sections/HowItWorks'));
const DiscordSection = lazy(() => import('../components/sections/DiscordSection'));
const CtaBanner      = lazy(() => import('../components/sections/CtaBanner'));

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ScrollReveal direction="up">
        <Trust />
      </ScrollReveal>
      <ScrollReveal direction="left" delay={80}>
        <WhyMead />
      </ScrollReveal>
      <Suspense fallback={null}>
        <ScrollReveal direction="up" delay={60}>
          <HowItWorks />
        </ScrollReveal>
        <ScrollReveal direction="right" delay={60}>
          <DiscordSection />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={80}>
          <CtaBanner />
        </ScrollReveal>
      </Suspense>
    </main>
  );
}
