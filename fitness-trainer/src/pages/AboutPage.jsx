import AboutFull from '@/sections/about/AboutFull';
import CompetitionHistory from '@/sections/about/CompetitionHistory';
import Certificates from '@/sections/about/Certificates';
import HomeCTA from '@/sections/home/HomeCTA';

export default function AboutPage() {
  return (
    <main style={{ paddingTop: 'var(--header-h)' }}>
      <AboutFull />
      <CompetitionHistory />
      <Certificates />
      <HomeCTA />
    </main>
  );
}
