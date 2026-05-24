import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import PreorderModal from '../ui/PreorderModal';

/**
 * Slide-in cart drawer. Renders the items, the Discord-unlock
 * progress strip, the total, and the checkout button.
 */
export default function CartDrawer() {
  const {
    items, isOpen, total, toggleCart, closeCart,
    removeFromCart, clearCart, discordUnlocked, toDiscord,
  } = useCart();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? ' open' : ''}`}
        onClick={toggleCart}
      />
      <aside className={`cart-drawer${isOpen ? ' open' : ''}`} aria-label="Количка">
        <div className="cart-head">
          <div className="cart-title">Количка</div>
          <button className="cart-x" onClick={closeCart} aria-label="Затвори">✕</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              Количката е празна.<br />Добави своя комплект.
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="ci-emoji">{item.emoji}</div>
                <div className="ci-info" style={{ flex: 1 }}>
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-price">{formatPrice(item.price)}</div>
                </div>
                <button
                  className="ci-rm"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Премахни ${item.name}`}
                >✕</button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-foot" style={{ display: 'block' }}>
            <div className="cart-upsell">
              <div className="cup-lbl">
                {discordUnlocked ? '✅ Discord отключен!' : `До Discord: ${toDiscord} лв.`}
              </div>
              <p className="cup-p">
                {discordUnlocked
                  ? 'Ще получиш покана на имейл след поръчката.'
                  : 'Поръчай за над 70 лв. и влез в общността.'}
              </p>
            </div>
            <div className="cart-total">
              <span className="ct-lbl">Общо</span>
              <span className="ct-val">{formatPrice(total)}</span>
            </div>
            <button className="btn-checkout" type="button" onClick={() => setShowModal(true)}>
              Завърши поръчката →
            </button>
          </div>
        )}
      </aside>

      {showModal && (
        <PreorderModal
          items={items}
          total={total}
          onClose={() => setShowModal(false)}
          onSuccess={() => { clearCart(); closeCart(); setShowModal(false); }}
        />
      )}
    </>
  );
}
