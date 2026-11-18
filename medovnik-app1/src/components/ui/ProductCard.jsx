import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../../context/CartContext';
import { TAG_TIPS, KIT_BONUSES } from '../../data/products';
import { flyToCart } from '../../utils/flyToCart';

// Прогресивно размазване: [blur px, начало %, край %] — всеки слой се добавя върху предишния,
// така че размазването нараства плавно от горе (лек блър) към долу (силен).
const SOLD_BLUR_LAYERS = [
  [6, 0, 0],
  [2, 6, 24],
  [4, 20, 38],
  [5, 34, 54],
  [6, 48, 72],
  [7, 62, 88],
  [8, 76, 100],
];

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

          <div className="prod-bonus" aria-label="Бонуси към комплекта">
            <div className="prod-bonus-head"><span>Бонус към комплекта</span></div>
            <ul>
              {KIT_BONUSES.map((b) => (
                <li key={b}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="8" width="18" height="4" rx="1" />
                    <path d="M12 8v13M5 12v8a1 1 0 001 1h12a1 1 0 001-1v-8" />
                    <path d="M12 8c-1.5-4-6-4-5-1 .6 1.6 3 1 5 1zM12 8c1.5-4 6-4 5-1-.6 1.6-3 1-5 1z" />
                  </svg>
                  <em>Бонус</em> {b}
                </li>
              ))}
            </ul>
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
                Няма в наличност
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

        {product.comingSoon && (
          <div className="prod-soldout" role="note">
            {SOLD_BLUR_LAYERS.map(([blur, from, to], i) => {
              const mask = `linear-gradient(180deg, transparent ${from}%, #000 ${to}%)`;
              return (
                <div
                  key={i}
                  className="prod-soldout-blur"
                  aria-hidden="true"
                  style={{
                    backdropFilter: `blur(${blur}px)`,
                    WebkitBackdropFilter: `blur(${blur}px)`,
                    maskImage: mask,
                    WebkitMaskImage: mask,
                  }}
                />
              );
            })}
            <div className="prod-soldout-tint" aria-hidden="true" />
            <div className="prod-soldout-msg">
              <strong>Няма в наличност</strong>
              <small>Бурканът е празен — скоро пак ще има</small>
            </div>
          </div>
        )}
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
