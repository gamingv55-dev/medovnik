import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../../context/CartContext';
import { TAG_TIPS } from '../../data/products';
import { flyToCart } from '../../utils/flyToCart';

export default function ProductCard({ product }) {
  const { addToCart, isInCart, qtyInCart, incrementCart, decrementCart } = useCart();
  const inCart = isInCart(product.id);
  const cartQty = qtyInCart(product.id);
  const [lightbox, setLightbox] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!lightbox) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = prevOverflow; };
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
          {product.comingSoon && (
            <div className="prod-stamp" aria-hidden="true"><span>Очаквай скоро</span></div>
          )}
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className={`prod-img prod-img-zoomable${product.comingSoon ? ' prod-img--muted' : ''}`}
              onClick={() => setLightbox(true)}
              title="Клик за увеличаване"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={`prod-jar${product.comingSoon ? ' prod-jar--muted' : ''}`}>{product.emoji}</div>
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
              <span className="prod-price-eur">{product.price} €</span>
              <small>еднократно</small>
            </div>
            {!product.comingSoon && (
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
            )}
            {product.comingSoon ? (
              <button className="btn-add btn-add--soon" type="button" disabled>
                Очаквайте
              </button>
            ) : (
              <button
                className="btn-add"
                onClick={(e) => { addToCart(product, qty); flyToCart(e.currentTarget); }}
              >
                Добави →
              </button>
            )}
          </div>
        </div>
      </div>

      {lightbox && createPortal(
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
        </div>,
        document.body
      )}
    </>
  );
}
