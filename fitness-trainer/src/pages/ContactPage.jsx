import ContactForm from '@/sections/contact/ContactForm';
import FAQ from '@/sections/contact/FAQ';

export default function ContactPage() {
  return (
    <main style={{ paddingTop: 'var(--header-h)' }}>
      <ContactForm />
      <FAQ />
    </main>
  );
}
