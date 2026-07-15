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
    <article className={`addon${!ready ? ' addon--coming-soon' : ''}`}>
      <div className="addon-visual">
        {!ready && <div className="addon-coming-badge">Очаквайте скоро</div>}
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
              {ready ? (
                <>
                  <span className="addon-price-eur">{addon.priceEur} €</span>
                  <span className="addon-price-bgn">{addon.price} лв.</span>
                </>
              ) : <span className="placeholder">Скоро</span>}
            </div>
          </div>

          <div className="addon-actions">
            <button className="addon-add" type="button" disabled>
              Очаквайте
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
