import ServicesList from '@/sections/services/ServicesList';
import HowWeWork from '@/sections/services/HowWeWork';
import Tracking from '@/sections/services/Tracking';
import HomeCTA from '@/sections/home/HomeCTA';

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: 'var(--header-h)' }}>
      <ServicesList />
      <HowWeWork />
      <Tracking />
      <HomeCTA />
    </main>
  );
}
