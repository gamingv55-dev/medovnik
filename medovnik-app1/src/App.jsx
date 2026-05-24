import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CartProvider }  from './context/CartContext';

import Navbar        from './components/layout/Navbar';
import Footer        from './components/layout/Footer';
import CartDrawer    from './components/layout/CartDrawer';
import IntroOverlay  from './components/layout/IntroOverlay';

import ScrollToTop  from './components/layout/ScrollToTop';

import HomePage      from './pages/HomePage';
import ShopPage      from './pages/ShopPage';
import CommunityPage from './pages/CommunityPage';
import ReviewsPage   from './pages/ReviewsPage';
// import MyMeadPage    from './pages/MyMeadPage';
import NotFoundPage  from './pages/NotFoundPage';

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


          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/shop"       element={<ShopPage />} />
            <Route path="/community"  element={<CommunityPage />} />
            <Route path="/reviews"    element={<ReviewsPage />} />
            {/* <Route path="/my-mead"    element={<MyMeadPage />} /> */}
            <Route path="*"           element={<NotFoundPage />} />
          </Routes>

          <Footer />
        </CartProvider>

    </BrowserRouter>
  );
}
