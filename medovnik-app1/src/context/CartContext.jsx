import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { PRODUCTS } from '../data/products';
import { ADDONS } from '../data/addons';

// ────────────────────────────────────────────────────────────
// Cart state. Items are stored as full product objects so the
// drawer can render emoji/name/price without re-lookups.
// ────────────────────────────────────────────────────────────

const CartContext = createContext(null);

const DISCORD_THRESHOLD = 70;   // лв. Above this the buyer unlocks Discord.

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      if (state.items.find(i => i.id === action.item.id)) return state; // already added
      return { ...state, items: [...state.items, action.item] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'OPEN':   return { ...state, isOpen: true  };
    case 'CLOSE':  return { ...state, isOpen: false };
    case 'TOGGLE': return { ...state, isOpen: !state.isOpen };
    default:       return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });

  // ── Adders/removers ──────────────────────────────────────
  // Accept either a product object or an id (looks up in PRODUCTS / ADDONS).
  const addToCart = useCallback((idOrProduct) => {
    let item = idOrProduct;
    if (typeof idOrProduct === 'number' || typeof idOrProduct === 'string') {
      item = PRODUCTS.find(p => p.id === idOrProduct)
          || ADDONS.find(a => a.id === idOrProduct);
    }
    if (!item || item.price == null) return; // disabled placeholder addon
    dispatch({ type: 'ADD', item });
    dispatch({ type: 'OPEN' }); // mirrors original site UX
  }, []);

  const removeFromCart = useCallback((id) => dispatch({ type: 'REMOVE', id }), []);
  const clearCart      = useCallback(()   => dispatch({ type: 'CLEAR' }), []);
  const openCart       = useCallback(()   => dispatch({ type: 'OPEN'  }), []);
  const closeCart      = useCallback(()   => dispatch({ type: 'CLOSE' }), []);
  const toggleCart     = useCallback(()   => dispatch({ type: 'TOGGLE' }), []);

  // ── Derived values memoised on cart changes ──────────────
  const value = useMemo(() => {
    const total       = state.items.reduce((s, i) => s + (i.price || 0), 0);
    const count       = state.items.length;
    const discordUnlocked = total >= DISCORD_THRESHOLD;
    const toDiscord   = Math.max(DISCORD_THRESHOLD - total, 0);
    const isInCart    = (id) => state.items.some(i => i.id === id);

    return {
      items: state.items, isOpen: state.isOpen,
      total, count, discordUnlocked, toDiscord,
      isInCart,
      addToCart, removeFromCart, clearCart,
      openCart, closeCart, toggleCart,
    };
  }, [state, addToCart, removeFromCart, clearCart, openCart, closeCart, toggleCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
