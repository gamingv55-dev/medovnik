import Hero from '@/sections/home/Hero';
import AboutTeaser from '@/sections/home/AboutTeaser';
import ServicesTeaser from '@/sections/home/ServicesTeaser';
import ResultsTeaser from '@/sections/home/ResultsTeaser';
import HomeCTA from '@/sections/home/HomeCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutTeaser />
      <ServicesTeaser />
      <ResultsTeaser />
      <HomeCTA />
    </main>
  );
}
