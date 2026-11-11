import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge, Button, Card, Note, NumberField, Stat, cx } from '@/components/ui';
import { FavoriteButton } from '@/components/FavoriteButton';
import { GlassSwatch } from '@/components/GlassSwatch';
import { abvStandard, scaleAmount, tidy, tosna } from '@/lib/brewing';
import { num, parseNumber, sg } from '@/lib/format';
import { kitById } from '@/content/kits';
import { problemById } from '@/content/problems';
import { BASE_LITERS, CATEGORY_LABEL, DIFFICULTY_LABEL, fermentedGravity, recipeById, type Ingredient } from '@/content/recipes';
import { t } from '@/i18n';
import { NotFound } from './NotFound';

const PRESETS = [1, 5, 10, 20, 30];
const COUNT_UNITS = ['бр.', 'пръчка'];

/** An ingredient amount for the chosen volume, in the unit that reads best. */
function amountFor(ing: Ingredient, liters: number): string {
  if (ing.amount === undefined) return '';
  const value = ing.scales === false ? ing.amount : scaleAmount(ing.amount, BASE_LITERS, liters);
  const unit = ing.unit ?? '';
  if (COUNT_UNITS.includes(unit)) return `${num(Math.max(1, Math.round(value)), 0)} ${unit}`;
  if (unit === 'кг' && value < 1) return `${num(tidy(value * 1000), 0)} г`;
  if (unit === 'г' && value >= 1000) return `${num(value / 1000, 2)} кг`;
  // Weights and volumes keep two decimals; everything else is rounded for a kitchen scale.
  if (unit === 'кг' || unit === 'л') return `${num(value, 2)} ${unit}`;
  const tidied = tidy(value);
  return `${num(tidied, Number.isInteger(tidied) ? 0 : 1)} ${unit}`;
}

export function RecipeDetailPage() {
  const recipe = recipeById(useParams().id);
  const [raw, setRaw] = useState(String(BASE_LITERS));
  if (!recipe) return <NotFound />;

  const r = t.recipes;
  const parsed = parseNumber(raw);
  const valid = Number.isFinite(parsed) && parsed >= 1 && parsed <= 100;
  const liters = valid ? parsed : BASE_LITERS;
  const plan = tosna(liters, recipe.og, recipe.need);
  const abv = abvStandard(recipe.og, fermentedGravity(recipe));
  const kit = kitById(recipe.kit);

  return (
    <article className="flex flex-col gap-8 pt-5 lg:pt-10">
      <header className="flex flex-col gap-4">
        <Link to="/recipes" className="-ml-1 w-fit py-1 text-sm text-muted hover:text-strong">‹ {r.title}</Link>
        <div className="flex items-start gap-4">
          <GlassSwatch color={recipe.color} size={72} />
          <div className="min-w-0 flex-1">
            <h1 className="text-[2rem] sm:text-[2.6rem]">{recipe.name}</h1>
            <p className="mt-1 text-muted">{recipe.tagline}</p>
          </div>
          <FavoriteButton id={`recipe:${recipe.id}`} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge tone="gold">{CATEGORY_LABEL[recipe.category]}</Badge>
          <Badge>{t.sweetness[recipe.sweetness]}</Badge>
          <Badge>{DIFFICULTY_LABEL[recipe.difficulty]}</Badge>
          {!recipe.verified && <Badge tone="demo">{t.common.demo}</Badge>}
        </div>
        <p className="max-w-prose text-[1.05rem] text-text/90">{recipe.profile}</p>
        {!recipe.verified && <Note>{t.common.demoNote}</Note>}
        <Button to={`/batches/new?recipe=${recipe.id}&liters=${liters}`} className="w-full sm:w-fit">
          {r.start} <ArrowRight size={16} aria-hidden />
        </Button>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <Card className="flex flex-col gap-5 p-5">
          <div className="flex flex-col gap-3">
            <NumberField label={r.volume} value={raw} onChange={setRaw} unit="л" error={valid ? undefined : r.volumeRange} />
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={liters === p}
                  onClick={() => setRaw(String(p))}
                  className={cx(
                    'num min-h-[38px] min-w-[3.25rem] rounded-full border px-3 text-sm transition',
                    liters === p ? 'border-gold bg-gold text-ongold' : 'border-line text-muted hover:text-strong',
                  )}
                >
                  {p} л
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="label mb-1 text-gold">
              {r.ingredients} · {r.forVolume.replace('{l}', num(liters, Number.isInteger(liters) ? 0 : 1))}
            </h2>
            <ul>
              {recipe.ingredients.map((ing) => (
                <li key={ing.name} className="flex items-baseline justify-between gap-4 border-b border-line/60 py-3 last:border-0">
                  <span className="min-w-0">
                    <span className="text-strong">{ing.name}</span>
                    {ing.note && <span className="block text-[0.82rem] text-muted">{ing.note}</span>}
                  </span>
                  <span className="num shrink-0 text-strong">{amountFor(ing, liters)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-raised/60 p-4 text-[0.9rem]">
            <p className="label mb-1.5">{r.feeding}</p>
            <p className="text-text/90">
              {r.feedingText
                .replace('{total}', num(plan.totalGrams, 1))
                .replace('{each}', num(plan.perAddition, 1))
                .replace('{sg}', sg(plan.lastAdditionGravity))}
            </p>
            <Link to="/calculators/nutrients" className="mt-2 inline-flex items-center gap-1 text-gold hover:text-honey">
              {r.feedingLink} <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </Card>

        <Card className="flex flex-col gap-5 p-5">
          <h2 className="label text-gold">{r.numbers}</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <Stat label={r.og} value={sg(recipe.og)} />
            <Stat label={r.fg} value={`${sg(recipe.fg[0])}–${sg(recipe.fg[1])}`} />
            <Stat label={r.abv} value={`≈ ${num(abv, 1)}`} unit="%" />
            <Stat label={r.temp} value={`${recipe.tempC[0]}–${recipe.tempC[1]}`} unit="°C" />
          </div>
          <div className="hairline" />
          <div className="flex flex-col gap-1">
            <span className="label">{r.yeast}</span>
            <span className="text-strong">{recipe.yeast}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="label">{r.duration}</span>
            <span className="text-strong">{recipe.duration}</span>
            <span className="text-[0.82rem] text-muted">{r.durationNote}</span>
          </div>
        </Card>
      </div>

      <section>
        <h2 className="mb-4 text-2xl">{r.steps}</h2>
        <ol className="flex flex-col">
          {recipe.steps.map((step, i) => (
            <li key={`${i}-${step.title}`} className="relative flex gap-4 pb-6 last:pb-0">
              {i < recipe.steps.length - 1 && <span className="absolute left-[15px] top-8 h-full w-px bg-line" aria-hidden />}
              <span className="num relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 bg-ground text-sm text-gold">
                {i + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="font-sans text-[1.02rem] font-semibold">{step.title}</h3>
                <p className="mt-1 max-w-prose text-[0.95rem] text-text/90">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="flex flex-col gap-2 p-5">
          <h2 className="label text-gold">{r.aging}</h2>
          <p className="text-[0.95rem] text-text/90">{recipe.aging}</p>
        </Card>
        <Card className="flex flex-col gap-2 p-5">
          <h2 className="label text-gold">{r.watchFor}</h2>
          <ul className="flex flex-col">
            {recipe.watchFor.map((id) => {
              const p = problemById(id);
              return p ? (
                <li key={id}>
                  <Link to={`/guide/problems/${id}`} className="flex items-center justify-between gap-3 border-b border-line/60 py-2.5 text-[0.95rem] hover:text-gold">
                    {p.title} <ArrowRight size={15} className="shrink-0 text-dim" aria-hidden />
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </Card>
      </div>

      {kit && (
        <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="label mb-1.5 text-gold">{r.kit}</h2>
            <p className="max-w-prose text-[0.95rem] text-text/90">{r.kitText.replace('{kit}', kit.name)}</p>
          </div>
          <Button to="/kits" variant="outline" className="shrink-0">{r.kitLink}</Button>
        </Card>
      )}
    </article>
  );
}
