import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { PageHeader, cx } from '@/components/ui';
import { RecipeCard } from '@/components/RecipeCard';
import { CATEGORY_LABEL, RECIPES, type RecipeCategory } from '@/content/recipes';
import { usePrefs } from '@/store/prefs';
import { t } from '@/i18n';

type Filter = 'all' | 'favorites' | RecipeCategory;

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'min-h-[38px] shrink-0 rounded-full border px-4 text-sm transition',
        active ? 'border-gold bg-gold text-ongold' : 'border-line text-muted hover:text-strong',
      )}
    >
      {children}
    </button>
  );
}

export function RecipesPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const { favorites } = usePrefs();

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => {
      if (filter === 'favorites' && !favorites.includes(`recipe:${r.id}`)) return false;
      if (filter !== 'all' && filter !== 'favorites' && r.category !== filter) return false;
      if (!q) return true;
      const hay = [r.name, r.tagline, r.profile, ...r.ingredients.map((i) => i.name)].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [query, filter, favorites]);

  const categories = Object.keys(CATEGORY_LABEL) as RecipeCategory[];

  return (
    <>
      <PageHeader eyebrow={t.app.name} title={t.recipes.title} lede={t.recipes.lede} />
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-2 rounded-md border border-line bg-ground/60 px-3 focus-within:border-gold/70">
          <Search size={17} className="text-dim" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.recipes.searchPlaceholder}
            aria-label={t.common.search}
            className="min-h-[46px] w-full bg-transparent text-strong outline-none placeholder:text-dim"
          />
        </label>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          <Chip active={filter === 'all'} onClick={() => setFilter('all')}>{t.common.all}</Chip>
          <Chip active={filter === 'favorites'} onClick={() => setFilter('favorites')}>{t.recipes.favorites}</Chip>
          {categories.map((c) => (
            <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>{CATEGORY_LABEL[c]}</Chip>
          ))}
        </div>
        {list.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line px-6 py-10 text-center text-muted">{t.recipes.none}</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {list.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
