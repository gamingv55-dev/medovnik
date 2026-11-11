import { Heart } from 'lucide-react';
import { cx } from '@/components/ui';
import { toggleFavorite, usePrefs } from '@/store/prefs';
import { t } from '@/i18n';

export function FavoriteButton({ id }: { id: string }) {
  const active = usePrefs().favorites.includes(id);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? t.recipes.saved : t.recipes.save}
      title={active ? t.recipes.saved : t.recipes.save}
      onClick={() => toggleFavorite(id)}
      className={cx(
        'grid h-11 w-11 place-items-center rounded-full border transition',
        active ? 'border-gold/60 text-gold' : 'border-line text-muted hover:text-strong',
      )}
    >
      <Heart size={19} strokeWidth={1.7} fill={active ? 'currentColor' : 'none'} aria-hidden />
    </button>
  );
}
