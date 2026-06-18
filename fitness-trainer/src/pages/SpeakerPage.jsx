import SpeakingEvents from '@/sections/speaker/SpeakingEvents';
import HomeCTA from '@/sections/home/HomeCTA';

export default function SpeakerPage() {
  return (
    <main style={{ paddingTop: 'var(--header-h)' }}>
      <SpeakingEvents />
      <HomeCTA />
    </main>
  );
}
