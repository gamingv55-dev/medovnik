import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { TAG_TIPS } from '../../data/products';

export default function ProductCard({ product }) {
  const { addToCart, isInCart, qtyInCart, incrementCart, decrementCart } = useCart();
  const inCart = isInCart(product.id);
  const cartQty = qtyInCart(product.id);
  const [lightbox, setLightbox] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!lightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [lightbox]);

  return (
    <>
      <div className={`prod${product.featured ? ' featured' : ''}`}>
        {product.featured && (
          <div className="prod-recommended" aria-label="Препоръчан избор">
            <span className="prod-rec-text">ПРЕПОРЪЧАН ИЗБОР</span>
          </div>
        )}
        <div className="prod-visual">
          <div className="prod-glow" />
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="prod-img prod-img-zoomable"
              onClick={() => setLightbox(true)}
              title="Клик за увеличаване"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="prod-jar">{product.emoji}</div>
          )}
        </div>

        <div className="prod-body">
          <div className="prod-cat">{product.cat}</div>
          <div className="prod-name">{product.name}</div>
          {product.subtitle && <div className="prod-subtitle">{product.subtitle}</div>}
          <div className="prod-desc" style={{ whiteSpace: 'pre-line' }}>{product.desc}</div>

          <div className="prod-includes">
            {product.tags.map((tag) => {
              const tip = TAG_TIPS[tag];
              return tip ? (
                <span className="tag tag--tip" key={tag}>
                  {tag}
                  <span className="tag-tip">{tip}</span>
                </span>
              ) : (
                <span className="tag" key={tag}>{tag}</span>
              );
            })}
          </div>

          <div className="prod-foot">
            <div className="prod-price">
              <span className="prod-price-eur">{product.priceEur ?? product.price} €</span>
              <span className="prod-price-bgn">{product.price} лв.</span>
              <small>еднократно</small>
            </div>
            <div className="prod-qty">
              <button
                className="prod-qty-btn"
                type="button"
                onClick={() => inCart ? decrementCart(product.id) : setQty(q => Math.max(1, q - 1))}
                aria-label="Намали"
              >−</button>
              <span className="prod-qty-num">{inCart ? cartQty : qty}</span>
              <button
                className="prod-qty-btn"
                type="button"
                onClick={() => inCart ? incrementCart(product.id) : setQty(q => Math.min(20, q + 1))}
                aria-label="Увеличи"
              >+</button>
            </div>
            <button
              className="btn-add"
              onClick={() => addToCart(product, qty)}
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
            onClick={() => setLightbox(false)}
          />
        </div>
      )}
    </>
  );
}
