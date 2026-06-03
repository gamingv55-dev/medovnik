import { useEffect, useRef } from 'react';

export default function ScrollReveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('sr-visible');
        } else {
          el.style.transitionDelay = '0ms';
          el.classList.remove('sr-visible');
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`sr-hidden sr-${direction}`}>
      {children}
    </div>
  );
}
