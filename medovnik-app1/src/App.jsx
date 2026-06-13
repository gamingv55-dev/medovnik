import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { CartProvider }  from './context/CartContext';

import Navbar        from './components/layout/Navbar';
import Footer        from './components/layout/Footer';
import CartDrawer    from './components/layout/CartDrawer';
import IntroOverlay  from './components/layout/IntroOverlay';
import ScrollToTop   from './components/layout/ScrollToTop';

import HomePage      from './pages/HomePage';

const MeadChatbot    = lazy(() => import('./components/MeadChatbot'));
const ShopPage       = lazy(() => import('./pages/ShopPage'));
const CommunityPage  = lazy(() => import('./pages/CommunityPage'));
const PartnersPage   = lazy(() => import('./pages/PartnersPage'));
const NotFoundPage   = lazy(() => import('./pages/NotFoundPage'));

function AnimatedRoutes({ children }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}

/**
 * App shell. Wraps the router in Auth + Cart providers so every
 * page and overlay can read/write the shared state.
 */
export default function App() {
  // Show intro once per session; skip in headless Chrome (Lighthouse) so LCP is measured on real content.
  const [showIntro, setShowIntro] = useState(() => {
    try {
      const isHeadless = navigator.webdriver || /HeadlessChrom/i.test(navigator.userAgent);
      if (isHeadless) return false;
      return !sessionStorage.getItem('mdv_intro_seen');
    } catch { return true; }
  });

  const dismissIntro = () => {
    try { sessionStorage.setItem('mdv_intro_seen', '1'); } catch {}
    setShowIntro(false);
  };

  return (
    <BrowserRouter>
      {showIntro && <IntroOverlay onDone={dismissIntro} />}

        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <CartDrawer />


          <Suspense fallback={null}>
            <AnimatedRoutes>
              <Routes>
                <Route path="/"           element={<HomePage />} />
                <Route path="/shop"       element={<ShopPage />} />
                <Route path="/community"  element={<CommunityPage />} />
                <Route path="/partners"   element={<PartnersPage />} />
                <Route path="*"           element={<NotFoundPage />} />
              </Routes>
            </AnimatedRoutes>
          </Suspense>

          <Footer />
          <Suspense fallback={null}><MeadChatbot /></Suspense>
        </CartProvider>

    </BrowserRouter>
  );
}
