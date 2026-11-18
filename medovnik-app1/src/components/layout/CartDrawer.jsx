import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';
import { KIT_BONUSES } from '../../data/products';
import PreorderModal from '../ui/PreorderModal';
import { PRODUCT_ICONS, BoxIcon } from '../ui/Icons';

const GiftSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13M5 12v8a1 1 0 001 1h12a1 1 0 001-1v-8" />
    <path d="M12 8c-1.5-4-6-4-5-1 .6 1.6 3 1 5 1zM12 8c1.5-4 6-4 5-1-.6 1.6-3 1-5 1z" />
  </svg>
);

/**
 * Slide-in cart drawer. Renders the items, the Discord-unlock
 * progress strip, the total, and the checkout button.
 */
export default function CartDrawer() {
  const {
    items, isOpen, total, toggleCart, closeCart,
    removeFromCart, incrementCart, decrementCart,
    clearCart, discordUnlocked, toDiscord, discordThreshold,
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
                <div className="ci-emoji" style={{ color: 'var(--honey)' }}>
                  {(() => { const I = PRODUCT_ICONS[item.iconType]; return I ? <I size={28} /> : <BoxIcon size={28} />; })()}
                </div>
                <div className="ci-info" style={{ flex: 1 }}>
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-price">
                    {formatPrice(item.price * (item.qty || 1))}
                    {item.qty > 1 && (
                      <span className="ci-unit"> ({item.price} € × {item.qty})</span>
                    )}
                  </div>
                </div>
                <div className="ci-qty-ctrl">
                  <button className="ci-q-btn" onClick={() => decrementCart(item.id)} aria-label="Намали">−</button>
                  <span className="ci-q-num">{item.qty}</span>
                  <button className="ci-q-btn" onClick={() => incrementCart(item.id)} aria-label="Увеличи">+</button>
                </div>
                <button
                  className="ci-rm"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Премахни ${item.name}`}
                >✕</button>

                {(item.cat || '').toLowerCase().includes('комплект') && (
                  <ul className="ci-bonuses" aria-label="Бонуси към комплекта">
                    {KIT_BONUSES.map((b) => (
                      <li className="ci-bonus" key={b}>
                        <span className="ci-bonus-ico" aria-hidden="true"><GiftSvg /></span>
                        <span className="ci-bonus-tag">Бонус</span>
                        <span className="ci-bonus-name">{b}</span>
                        <span className="ci-bonus-free">безплатно</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-foot" style={{ display: 'block' }}>
            <div className="cart-upsell">
              <div className="cup-lbl">
                {discordUnlocked ? '✅ Discord отключен!' : `До Discord: ${toDiscord} €`}
              </div>
              <p className="cup-p">
                {discordUnlocked
                  ? 'Ще получиш покана на имейл след поръчката.'
                  : `Поръчай комплект или надвиши ${discordThreshold} € и влез в общността.`}
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
          discordUnlocked={discordUnlocked}
          onClose={() => setShowModal(false)}
          onSuccess={() => { clearCart(); closeCart(); setShowModal(false); }}
        />
      )}
    </>
  );
}
