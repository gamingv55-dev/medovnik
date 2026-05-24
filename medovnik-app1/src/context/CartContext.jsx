import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { PRODUCTS } from '../data/products';
import { ADDONS }   from '../data/addons';
import { FLAVORINGS } from '../data/flavorings';
import { HONEY_TYPES } from '../data/honey';

const CartContext = createContext(null);
const DISCORD_THRESHOLD = 70;

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.item.id);
      if (exists) {
        if (!action.item.quantifiable) return state;
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.item.id
              ? { ...i, qty: i.qty + (action.qty || 1) }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: action.qty || 1 }] };
    }
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map(i => i.id === action.id ? { ...i, qty: i.qty - 1 } : i)
          .filter(i => i.qty > 0),
      };
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

  const addToCart = useCallback((idOrProduct, qty = 1) => {
    let item = idOrProduct;
    if (typeof idOrProduct === 'number' || typeof idOrProduct === 'string') {
      item = PRODUCTS.find(p => p.id === idOrProduct)
          || ADDONS.find(a => a.id === idOrProduct)
          || FLAVORINGS.find(f => f.id === idOrProduct)
          || HONEY_TYPES.find(h => h.id === idOrProduct);
    }
    if (!item || item.price == null) return;
    dispatch({ type: 'ADD', item, qty });
    dispatch({ type: 'OPEN' });
  }, []);

  const removeFromCart  = useCallback((id) => dispatch({ type: 'REMOVE', id }), []);
  const incrementCart   = useCallback((id) => dispatch({ type: 'INCREMENT', id }), []);
  const decrementCart   = useCallback((id) => dispatch({ type: 'DECREMENT', id }), []);
  const clearCart       = useCallback(()   => dispatch({ type: 'CLEAR' }), []);
  const openCart        = useCallback(()   => dispatch({ type: 'OPEN'  }), []);
  const closeCart       = useCallback(()   => dispatch({ type: 'CLOSE' }), []);
  const toggleCart      = useCallback(()   => dispatch({ type: 'TOGGLE' }), []);

  const value = useMemo(() => {
    const total           = state.items.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
    const count           = state.items.reduce((s, i) => s + (i.qty || 1), 0);
    const discordUnlocked = total >= DISCORD_THRESHOLD;
    const toDiscord       = Math.max(DISCORD_THRESHOLD - total, 0);
    const isInCart        = (id) => state.items.some(i => i.id === id);
    const qtyInCart       = (id) => { const it = state.items.find(i => i.id === id); return it ? it.qty : 0; };

    return {
      items: state.items, isOpen: state.isOpen,
      total, count, discordUnlocked, toDiscord,
      isInCart, qtyInCart,
      addToCart, removeFromCart, incrementCart, decrementCart,
      clearCart, openCart, closeCart, toggleCart,
    };
  }, [state, addToCart, removeFromCart, incrementCart, decrementCart,
      clearCart, openCart, closeCart, toggleCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
