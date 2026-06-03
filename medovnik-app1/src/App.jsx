import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { CartProvider }  from './context/CartContext';

import Navbar        from './components/layout/Navbar';
import Footer        from './components/layout/Footer';
import CartDrawer    from './components/layout/CartDrawer';
import IntroOverlay  from './components/layout/IntroOverlay';
import ScrollToTop   from './components/layout/ScrollToTop';

import HomePage      from './pages/HomePage';

const ShopPage      = lazy(() => import('./pages/ShopPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ReviewsPage   = lazy(() => import('./pages/ReviewsPage'));
const NotFoundPage  = lazy(() => import('./pages/NotFoundPage'));

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
  // Play the beehive intro once per browser session — repeat navigations
  // (and Lighthouse's warm runs) skip the 3s main-thread animation entirely.
  const [showIntro, setShowIntro] = useState(() => {
    try { return !sessionStorage.getItem('mdv_intro_seen'); }
    catch { return true; }
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
                <Route path="/reviews"    element={<ReviewsPage />} />
                <Route path="*"           element={<NotFoundPage />} />
              </Routes>
            </AnimatedRoutes>
          </Suspense>

          <Footer />
        </CartProvider>

    </BrowserRouter>
  );
}
