import { createStore, useStore } from '@/lib/storage';

export type Theme = 'dark' | 'light' | 'system';

export interface Prefs {
  theme: Theme;
  /** Lessons marked as read. */
  readLessons: string[];
  /** Saved recipes and lessons, as "recipe:id" / "lesson:id". */
  favorites: string[];
}

const DEFAULTS: Prefs = { theme: 'dark', readLessons: [], favorites: [] };

export const prefsStore = createStore<Prefs>('medovnik.prefs', DEFAULTS, (raw) => ({
  ...DEFAULTS,
  ...(typeof raw === 'object' && raw !== null ? (raw as Partial<Prefs>) : {}),
}));

export const usePrefs = (): Prefs => useStore(prefsStore);

export function applyTheme(theme: Theme): void {
  const light =
    theme === 'light' || (theme === 'system' && matchMedia('(prefers-color-scheme: light)').matches);
  if (light) document.documentElement.dataset.theme = 'light';
  else delete document.documentElement.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f7f1e3' : '#080603');
}

export function setTheme(theme: Theme): void {
  prefsStore.set((p) => ({ ...p, theme }));
  applyTheme(theme);
}

const toggle = (list: string[], id: string): string[] =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

export const toggleFavorite = (key: string): void =>
  prefsStore.set((p) => ({ ...p, favorites: toggle(p.favorites, key) }));

export const toggleRead = (lessonId: string): void =>
  prefsStore.set((p) => ({ ...p, readLessons: toggle(p.readLessons, lessonId) }));
