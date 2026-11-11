import { useSyncExternalStore } from 'react';

/**
 * A tiny persisted store. Everything a person creates lives on this device
 * only (localStorage) — there are no accounts and no server.
 */
export interface Store<T> {
  get: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (listener: () => void) => () => void;
}

export function createStore<T>(key: string, initial: T, revive?: (raw: unknown) => T): Store<T> {
  let value = initial;
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) value = revive ? revive(JSON.parse(raw)) : (JSON.parse(raw) as T);
  } catch {
    // Unreadable or blocked storage: start from the initial value.
  }
  const listeners = new Set<() => void>();

  return {
    get: () => value,
    set: (next) => {
      value = typeof next === 'function' ? (next as (prev: T) => T)(value) : next;
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Storage full or blocked: keep working in memory for this session.
      }
      listeners.forEach((l) => l());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

export const uid = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
