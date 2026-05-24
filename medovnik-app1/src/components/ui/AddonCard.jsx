import { useCart } from '../../context/CartContext';

/**
 * Add-on card on the Shop page. Disabled when price is null
 * (placeholder slot for upcoming products).
 */
export default function AddonCard({ addon }) {
  const { addToCart } = useCart();
  const ready = addon.price != null;

  return (
    <article className="addon" data-slot={addon.slot}>
      <div className="addon-emoji">{addon.emoji}</div>
      <div className="addon-name">{addon.name}</div>
      <div className="addon-desc">{addon.desc}</div>
      <div className="addon-foot">
        <div className="addon-price">
          {ready
            ? `${addon.price} лв.`
            : <span className="placeholder">Скоро</span>}
        </div>
        <button
          className="addon-add"
          type="button"
          disabled={!ready}
          onClick={() => ready && addToCart(addon)}
        >{ready ? 'Добави' : 'Очаквайте'}</button>
      </div>
    </article>
  );
}
