import { useState } from 'react';
import { HONEY_TYPES } from '../../data/honey';
import { useCart } from '../../context/CartContext';
import { HoneyJarIcon } from './Icons';

export default function HoneyCard() {
  const [selectedId, setSelectedId] = useState(HONEY_TYPES[0].id);
  const { addToCart, isInCart } = useCart();

  const selected = HONEY_TYPES.find(h => h.id === selectedId);
  const inCart   = isInCart(selected.id);

  return (
    <div className="honey-card">
      <div className="honey-visual">
        <img src="/honey.webp" alt="Мед за медовина" className="honey-photo" />
      </div>

      <div className="honey-body">
        <div className="honey-label">Мед за медовина</div>
        <div className="honey-title">950 г Буркан</div>

        <div className="honey-select-wrap">
          <label className="honey-select-label">Вид</label>
          <select
            className="honey-select"
            value={selectedId}
            onChange={e => setSelectedId(Number(e.target.value))}
          >
            {HONEY_TYPES.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
        </div>

        <p className="honey-desc">{selected.desc}</p>

        <div className="honey-foot">
          <div className="honey-price">{selected.price} лв.</div>
          <button className="addon-add" type="button" disabled>
            Очаквайте
          </button>
        </div>
      </div>
    </div>
  );
}
