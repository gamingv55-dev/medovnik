import { useId, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, NumberField, PageHeader, Stat, TextArea, TextField } from '@/components/ui';
import { abvStandard, scaleAmount } from '@/lib/brewing';
import { num, parseNumber, todayInput } from '@/lib/format';
import { BASE_LITERS, RECIPES, recipeById, type Recipe } from '@/content/recipes';
import { createBatch } from '@/store/batches';
import { t } from '@/i18n';

const f = t.batches.form;

const gravityError = (raw: string, v: number): string | undefined =>
  raw.trim() === '' ? undefined : Number.isNaN(v) || v < 0.98 || v > 1.2 ? f.optionalRange : undefined;

/** Honey line for a recipe at a given volume, e.g. "1,54 кг". */
function honeyFor(recipe: Recipe | undefined, liters: number): string {
  const honey = recipe?.ingredients.find((i) => i.name === 'Мед');
  if (!honey?.amount || !Number.isFinite(liters)) return '';
  return `${num(scaleAmount(honey.amount, BASE_LITERS, liters), 2)} кг`;
}

export function BatchNewPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialRecipe = recipeById(params.get('recipe') ?? undefined);
  const initialLiters = params.get('liters') ?? String(BASE_LITERS);

  const [recipeId, setRecipeId] = useState(initialRecipe?.id ?? '');
  const [name, setName] = useState(initialRecipe?.name ?? '');
  const [startedOn, setStartedOn] = useState(todayInput());
  const [litersRaw, setLiters] = useState(initialLiters);
  const [honey, setHoney] = useState(honeyFor(initialRecipe, parseNumber(initialLiters)));
  const [yeast, setYeast] = useState(initialRecipe?.yeast ?? '');
  const [ogRaw, setOg] = useState('');
  const [fgRaw, setFg] = useState(initialRecipe ? ((initialRecipe.fg[0] + initialRecipe.fg[1]) / 2).toFixed(3) : '');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const selectId = useId();

  const liters = parseNumber(litersRaw);
  const og = parseNumber(ogRaw);
  const fg = parseNumber(fgRaw);
  const nameErr = name.trim() === '' ? f.nameError : undefined;
  const litersErr = Number.isNaN(liters) ? t.common.invalid : liters <= 0 ? t.calc.positive : undefined;
  const ogErr = gravityError(ogRaw, og);
  const fgErr = gravityError(fgRaw, fg);
  const valid = !nameErr && !litersErr && !ogErr && !fgErr && startedOn !== '';

  const pickRecipe = (id: string) => {
    setRecipeId(id);
    const r = recipeById(id);
    if (!r) return;
    if (name.trim() === '' || RECIPES.some((x) => x.name === name)) setName(r.name);
    setYeast(r.yeast);
    setHoney(honeyFor(r, liters));
    setFg(((r.fg[0] + r.fg[1]) / 2).toFixed(3));
  };

  const submit = () => {
    setSubmitted(true);
    if (!valid) return;
    const id = createBatch({
      name: name.trim(),
      recipeId: recipeId || undefined,
      startedOn,
      liters,
      honey: honey.trim(),
      yeast: yeast.trim(),
      og: Number.isFinite(og) ? og : undefined,
      targetFg: Number.isFinite(fg) ? fg : undefined,
      notes: notes.trim(),
    });
    navigate(`/batches/${id}`, { replace: true });
  };

  const potential = Number.isFinite(og) && Number.isFinite(fg) && !ogErr && !fgErr && og > fg ? abvStandard(og, fg) : undefined;

  return (
    <>
      <PageHeader back={{ to: '/batches', label: t.batches.title }} title={f.title} />
      <form
        className="flex max-w-prose flex-col gap-4"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Card className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={selectId} className="label">{f.recipe}</label>
            <select
              id={selectId}
              value={recipeId}
              onChange={(e) => pickRecipe(e.target.value)}
              className="min-h-[46px] rounded-md border border-line bg-ground/60 px-3 text-strong outline-none focus:border-gold/70"
            >
              <option value="">{f.ownRecipe}</option>
              {RECIPES.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <TextField label={f.name} value={name} onChange={setName} placeholder={f.namePlaceholder} error={submitted ? nameErr : undefined} />
          <div className="grid grid-cols-2 gap-3">
            <TextField label={f.started} type="date" value={startedOn} onChange={setStartedOn} max={todayInput()} />
            <NumberField label={f.liters} value={litersRaw} onChange={setLiters} unit="л" error={litersErr} />
          </div>
          <TextField label={f.honey} value={honey} onChange={setHoney} placeholder={f.honeyPlaceholder} />
          <TextField label={f.yeast} value={yeast} onChange={setYeast} placeholder={f.yeastPlaceholder} />
        </Card>
        <Card className="flex flex-col gap-4 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <NumberField label={f.og} value={ogRaw} onChange={setOg} placeholder="1.090" error={ogErr} hint={f.ogHint} />
            <NumberField label={f.fg} value={fgRaw} onChange={setFg} placeholder="1.000" error={fgErr} />
          </div>
          {potential !== undefined && <Stat label={f.potential} value={num(potential, 1)} unit="%" />}
          <TextArea label={f.notes} value={notes} onChange={setNotes} />
        </Card>
        <Button type="submit" className="w-full sm:w-fit">{f.create}</Button>
      </form>
    </>
  );
}
