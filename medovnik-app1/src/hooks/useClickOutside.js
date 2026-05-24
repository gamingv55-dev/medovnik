import { useEffect, useRef } from 'react';

/**
 * Calls `onOutside` whenever the user mousedowns outside the returned ref.
 * Used for closing dropdowns/menus that don't have their own backdrop.
 */
export function useClickOutside(onOutside) {
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside(e);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onOutside]);

  return ref;
}
