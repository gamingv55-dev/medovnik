import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

const HomePage    = lazy(() => import('@/pages/HomePage'));
const AboutPage   = lazy(() => import('@/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ResultsPage = lazy(() => import('@/pages/ResultsPage'));
const SpeakerPage = lazy(() => import('@/pages/SpeakerPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader__dots">
        <div className="page-loader__dot" />
        <div className="page-loader__dot" />
        <div className="page-loader__dot" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/results"  element={<ResultsPage />} />
          <Route path="/speaker"  element={<SpeakerPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
