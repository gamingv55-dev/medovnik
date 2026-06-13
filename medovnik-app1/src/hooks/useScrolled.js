import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Runs synchronously before paint, after ScrollToTop has already reset scrollY to 0.
  // Prevents a flash of the solid-nav state when navigating from a scrolled page.
  useLayoutEffect(() => {
    setScrolled(window.scrollY > threshold);
  }, [pathname, threshold]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
