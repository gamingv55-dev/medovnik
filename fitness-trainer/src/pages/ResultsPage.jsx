import ClientResults from '@/sections/results/ClientResults';
import StageResults from '@/sections/results/StageResults';
import Testimonials from '@/sections/results/Testimonials';
import HomeCTA from '@/sections/home/HomeCTA';

export default function ResultsPage() {
  return (
    <main style={{ paddingTop: 'var(--header-h)' }}>
      <ClientResults />
      <StageResults />
      <Testimonials />
      <HomeCTA />
    </main>
  );
}
