import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FLAVOR_VISUAL } from './FlavoringIllustrations';

export default function AddonCard({ addon }) {
  const { addToCart, isInCart, qtyInCart } = useCart();
  const [qty, setQty] = useState(1);

  const ready   = addon.price != null;
  const inCart  = isInCart(addon.id);
  const cartQty = qtyInCart(addon.id);
  const Visual  = FLAVOR_VISUAL[addon.id];

  function handleAdd() {
    if (!ready) return;
    addToCart(addon, qty);
  }

  return (
    <article className="addon">
      <div className="addon-visual">
        {addon.image
          ? <img src={addon.image} alt={addon.name} className="addon-img" />
          : Visual
            ? <div className="addon-svg-wrap"><Visual /></div>
            : <div className="addon-emoji">{addon.emoji}</div>
        }
      </div>

      <div className="addon-content">
        <div className="addon-name">{addon.name}</div>
        <div className="addon-desc">{addon.desc}</div>

        <div className="addon-foot">
          <div className="addon-price-col">
            <div className="addon-price">
              {ready ? `${addon.price} лв.` : <span className="placeholder">Скоро</span>}
            </div>
            {inCart && cartQty > 0 && (
              <div className="addon-in-cart">× {cartQty} в количката</div>
            )}
          </div>

          <div className="addon-actions">
            {addon.quantifiable && ready && (
              <div className="addon-qty">
                <button
                  className="addon-qty-btn"
                  type="button"
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  aria-label="Намали"
                >−</button>
                <span className="addon-qty-num">{qty}</span>
                <button
                  className="addon-qty-btn"
                  type="button"
                  onClick={() => setQty(q => Math.min(20, q + 1))}
                  aria-label="Увеличи"
                >+</button>
              </div>
            )}
            <button
              className="addon-add"
              type="button"
              disabled={!ready}
              onClick={handleAdd}
            >
              {ready ? 'Добави →' : 'Очаквайте'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
