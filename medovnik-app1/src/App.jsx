import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

/**
 * App shell. Wraps the router in Auth + Cart providers so every
 * page and overlay can read/write the shared state.
 */
export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <BrowserRouter>
      {showIntro && <IntroOverlay onDone={() => setShowIntro(false)} />}

        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <CartDrawer />


          <Suspense fallback={null}>
            <Routes>
              <Route path="/"           element={<HomePage />} />
              <Route path="/shop"       element={<ShopPage />} />
              <Route path="/community"  element={<CommunityPage />} />
              <Route path="/reviews"    element={<ReviewsPage />} />
              <Route path="*"           element={<NotFoundPage />} />
            </Routes>
          </Suspense>

          <Footer />
        </CartProvider>

    </BrowserRouter>
  );
}
