import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className={`prod${product.featured ? ' featured' : ''}`}>
        <div className="prod-visual">
          <div className="prod-glow" />
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="prod-img prod-img-zoomable"
              onClick={() => setLightbox(true)}
              title="Клик за увеличаване"
            />
          ) : (
            <div className="prod-jar">{product.emoji}</div>
          )}
        </div>

        <div className="prod-body">
          <div className="prod-cat">{product.cat}</div>
          <div className="prod-name">{product.name}</div>
          {product.subtitle && <div className="prod-subtitle">{product.subtitle}</div>}
          <div className="prod-desc">{product.desc}</div>

          <div className="prod-includes">
            {product.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="prod-foot">
            <div className="prod-price">
              <span className="prod-price-eur">{product.priceEur ?? product.price} €</span>
              <span className="prod-price-bgn">{product.price} лв.</span>
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

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <button
            className="lightbox-close"
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
            aria-label="Затвори"
          >✕</button>
          <img
            src={product.image}
            alt={product.name}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
