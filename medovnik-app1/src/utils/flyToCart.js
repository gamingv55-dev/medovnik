// Animates a small dot flying from the clicked "add" button to the cart
// icon in the navbar, then bumps the cart icon. Pure DOM — crosses the
// component boundary between product cards and the navbar without needing
// shared React state.
export function flyToCart(fromEl) {
  const cartBtn = document.querySelector('.cart-ico-btn');
  if (!cartBtn || !fromEl) return;

  const fromRect = fromEl.getBoundingClientRect();
  const toRect = cartBtn.getBoundingClientRect();

  const dot = document.createElement('div');
  dot.className = 'fly-to-cart';
  dot.style.left = `${fromRect.left + fromRect.width / 2 - 9}px`;
  dot.style.top = `${fromRect.top + fromRect.height / 2 - 9}px`;
  document.body.appendChild(dot);

  const dx = (toRect.left + toRect.width / 2) - (fromRect.left + fromRect.width / 2);
  const dy = (toRect.top + toRect.height / 2) - (fromRect.top + fromRect.height / 2);

  requestAnimationFrame(() => {
    dot.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
    dot.style.opacity = '0.15';
  });

  dot.addEventListener('transitionend', () => {
    dot.remove();
    cartBtn.classList.add('cart-bump');
    setTimeout(() => cartBtn.classList.remove('cart-bump'), 350);
  }, { once: true });
}
