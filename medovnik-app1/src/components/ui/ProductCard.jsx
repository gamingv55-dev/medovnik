import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';

/**
 * Brewing-kit card on the Shop page. Adds the product to the cart
 * and opens the drawer on click. Shows "✓ Добавен" when already in.
 */
export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  return (
    <div className={`prod${product.featured ? ' featured' : ''}`}>
      <div className="prod-visual">
        <div className="prod-glow" />
        {product.image
          ? <img src={product.image} alt={product.name} className="prod-img" />
          : <div className="prod-jar">{product.emoji}</div>
        }
      </div>

      <div className="prod-body">
        <div className="prod-cat">{product.cat}</div>
        <div className="prod-name">{product.name}</div>
        <div className="prod-desc">{product.desc}</div>

        <div className="prod-includes">
          {product.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>

        <div className="prod-foot">
          <div className="prod-price">
            {formatPrice(product.price)}
            <small>еднократно</small>
          </div>
          <button
            className="btn-add"
            onClick={() => addToCart(product)}
            disabled={inCart}
          >
            {inCart ? '✓ Добавен' : 'Добави →'}
          </button>
        </div>
      </div>
    </div>
  );
}
