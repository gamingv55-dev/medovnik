import { lazy, Suspense } from 'react';

import Hero         from '../components/sections/Hero';
import WhyMead      from '../components/sections/WhyMead';
import Trust        from '../components/sections/Trust';
import ScrollReveal from '../components/layout/ScrollReveal';

const HowItWorks     = lazy(() => import('../components/sections/HowItWorks'));
const DiscordSection = lazy(() => import('../components/sections/DiscordSection'));

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
      </Suspense>
    </main>
  );
}
