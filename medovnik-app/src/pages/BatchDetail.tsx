import { useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Check, Trash2, X } from 'lucide-react';
import { Button, Card, Note, NumberField, PageHeader, Stat, TextField, cx } from '@/components/ui';
import { LineChart } from '@/components/charts/LineChart';
import { abvStandard, attenuation } from '@/lib/brewing';
import { latestGravity, nextActions, type Advice } from '@/lib/batch/advice';
import { date as fmtDate, daysBetween, num, parseNumber, sg, shortDate, todayInput, volume } from '@/lib/format';
import { recipeById } from '@/content/recipes';
import {
  STAGE_IDS, addBottles, addLog, addMeasurement, deleteBatch, removeBottles, removeLog, removeMeasurement,
  toggleStage, useBatch, type Batch,
} from '@/store/batches';
import { t } from '@/i18n';
import { NotFound } from './NotFound';

const b = t.batches;

const fill = (text: string, values: Record<string, string | number>): string =>
  Object.entries(values).reduce((s, [k, v]) => s.replace(`{${k}}`, String(v)), text);

function Panel({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="label text-gold">{title}</h2>
        {aside}
      </div>
      {children}
    </Card>
  );
}

function RemoveIcon({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={b.remove} className="grid h-9 w-9 shrink-0 place-items-center text-dim hover:text-danger">
      <X size={16} aria-hidden />
    </button>
  );
}

function AdviceList({ advice }: { advice: Advice[] }) {
  if (advice.length === 0) return <p className="text-[0.95rem] text-muted">{b.nothingNext}</p>;
  return (
    <div className="flex flex-col gap-2.5">
      {advice.map((a) => {
        const copy = b.advice[a.id];
        return (
          <Note key={a.id} tone={a.tone === 'warn' ? 'warn' : 'info'} title={copy.title}>
            {fill(copy.text, a.values)}
            {a.id === 'maybe-stuck' && (
              <Link to="/guide/problems/stuck" className="mt-1.5 flex w-fit items-center gap-1 text-gold hover:text-honey">
                {b.readProblem} <ArrowRight size={14} aria-hidden />
              </Link>
            )}
            {a.id === 'feed' || a.id === 'last-feed' ? (
              <Link to="/calculators/nutrients" className="mt-1.5 flex w-fit items-center gap-1 text-gold hover:text-honey">
                {t.calcs.nutrients.title} <ArrowRight size={14} aria-hidden />
              </Link>
            ) : null}
          </Note>
        );
      })}
    </div>
  );
}

function Timeline({ batch }: { batch: Batch }) {
  return (
    <Panel title={b.timeline}>
      <ol className="flex flex-col">
        {STAGE_IDS.map((stage, i) => {
          const doneOn = batch.stages[stage];
          return (
            <li key={stage} className="relative flex items-center gap-3 pb-1 last:pb-0">
              {i < STAGE_IDS.length - 1 && (
                <span className={cx('absolute left-[15px] top-9 h-[calc(100%-1.75rem)] w-px', doneOn ? 'bg-gold/60' : 'bg-line')} aria-hidden />
              )}
              <button
                type="button"
                role="checkbox"
                aria-checked={doneOn !== undefined}
                aria-label={b.stages[stage]}
                onClick={() => toggleStage(batch.id, stage, todayInput())}
                className={cx(
                  'relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition',
                  doneOn ? 'border-gold bg-gold text-ongold' : 'border-line bg-ground text-dim hover:border-gold/60',
                )}
              >
                {doneOn ? <Check size={16} strokeWidth={2.4} aria-hidden /> : <span className="num text-xs">{i + 1}</span>}
              </button>
              <div className="flex min-h-[44px] min-w-0 flex-1 items-center justify-between gap-3">
                <span className={doneOn ? 'text-strong' : 'text-text/90'}>{b.stages[stage]}</span>
                {doneOn && <span className="num shrink-0 text-xs text-muted">{shortDate(doneOn)}</span>}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="text-[0.82rem] text-muted">{b.stageHint}</p>
    </Panel>
  );
}

function MeasurementForm({ batchId }: { batchId: string }) {
  const [day, setDay] = useState(todayInput());
  const [sgRaw, setSg] = useState('');
  const [tempRaw, setTemp] = useState('');
  const [phRaw, setPh] = useState('');
  const [note, setNote] = useState('');
  const [tried, setTried] = useState(false);

  const v = { sg: parseNumber(sgRaw), temp: parseNumber(tempRaw), ph: parseNumber(phRaw) };
  const range = (raw: string, n: number, lo: number, hi: number, msg: string) =>
    raw.trim() === '' ? undefined : Number.isNaN(n) || n < lo || n > hi ? msg : undefined;
  const sgErr = range(sgRaw, v.sg, 0.98, 1.2, b.sgRange);
  const tempErr = range(tempRaw, v.temp, 0, 40, b.tempRange);
  const phErr = range(phRaw, v.ph, 2, 7, b.phRange);
  const empty = [sgRaw, tempRaw, phRaw].every((r) => r.trim() === '');
  const valid = !sgErr && !tempErr && !phErr && !empty && day !== '';

  const save = () => {
    setTried(true);
    if (!valid) return;
    addMeasurement(batchId, {
      date: day,
      sg: Number.isFinite(v.sg) ? v.sg : undefined,
      tempC: Number.isFinite(v.temp) ? v.temp : undefined,
      ph: Number.isFinite(v.ph) ? v.ph : undefined,
      note: note.trim() || undefined,
    });
    setSg(''); setTemp(''); setPh(''); setNote(''); setTried(false);
  };

  return (
    <form
      className="flex flex-col gap-3 rounded-lg bg-raised/50 p-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <TextField label={b.date} type="date" value={day} onChange={setDay} max={todayInput()} />
        <NumberField label={b.sg} value={sgRaw} onChange={setSg} placeholder="1.050" error={sgErr} />
        <NumberField label={b.temp} value={tempRaw} onChange={setTemp} unit="°C" error={tempErr} />
        <NumberField label={b.ph} value={phRaw} onChange={setPh} error={phErr} />
      </div>
      <TextField label={b.note} value={note} onChange={setNote} />
      {tried && empty && <p className="text-[0.82rem] text-danger" role="alert">{b.needOne}</p>}
      <Button type="submit" variant="outline" className="w-fit">{b.addMeasurement}</Button>
    </form>
  );
}

function Measurements({ batch }: { batch: Batch }) {
  const sorted = [...batch.measurements].sort((x, y) => y.date.localeCompare(x.date));
  const sgPoints = [
    ...(batch.og !== undefined ? [{ date: batch.startedOn, value: batch.og }] : []),
    ...batch.measurements.filter((m) => m.sg !== undefined).map((m) => ({ date: m.date, value: m.sg as number })),
  ];
  const tempPoints = batch.measurements.filter((m) => m.tempC !== undefined).map((m) => ({ date: m.date, value: m.tempC as number }));

  return (
    <Panel title={b.measurements}>
      <MeasurementForm batchId={batch.id} />
      {sgPoints.length >= 2 ? (
        <LineChart points={sgPoints} format={(n) => n.toFixed(3)} label={b.chartSg} />
      ) : (
        <p className="text-[0.88rem] text-muted">{b.chartNeedsTwo}</p>
      )}
      {tempPoints.length >= 2 && <LineChart points={tempPoints} format={(n) => `${num(n, 0)}°`} label={b.chartTemp} />}
      {sorted.length === 0 ? (
        <p className="text-[0.95rem] text-muted">{b.noMeasurements}</p>
      ) : (
        <ul>
          {sorted.map((m) => (
            <li key={m.id} className="flex items-center gap-3 border-b border-line/60 py-2 last:border-0">
              <span className="w-16 shrink-0 text-sm text-muted">{shortDate(m.date)}</span>
              <span className="num flex min-w-0 flex-1 flex-wrap gap-x-4 gap-y-0.5 text-strong">
                {m.sg !== undefined && <span>{sg(m.sg)}</span>}
                {m.tempC !== undefined && <span>{num(m.tempC, 1)} °C</span>}
                {m.ph !== undefined && <span>pH {num(m.ph, 2)}</span>}
                {m.note && <span className="font-sans text-[0.88rem] text-muted">{m.note}</span>}
              </span>
              <RemoveIcon onClick={() => removeMeasurement(batch.id, m.id)} />
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

function Journal({ batch }: { batch: Batch }) {
  const [text, setText] = useState('');
  const save = () => {
    if (text.trim() === '') return;
    addLog(batch.id, todayInput(), text.trim());
    setText('');
  };
  return (
    <Panel title={b.log}>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={b.logPlaceholder}
          aria-label={b.log}
          className="min-h-[46px] min-w-0 flex-1 rounded-md border border-line bg-ground/60 px-3 text-strong outline-none placeholder:text-dim focus:border-gold/70"
        />
        <Button type="submit" variant="outline" disabled={text.trim() === ''}>{b.addLog}</Button>
      </form>
      {batch.log.length === 0 ? (
        <p className="text-[0.88rem] text-muted">{b.noLog}</p>
      ) : (
        <ul>
          {batch.log.map((entry) => (
            <li key={entry.id} className="flex items-start gap-3 border-b border-line/60 py-2.5 last:border-0">
              <span className="w-16 shrink-0 pt-0.5 text-sm text-muted">{shortDate(entry.date)}</span>
              <span className="min-w-0 flex-1 text-[0.95rem]">{entry.text}</span>
              <RemoveIcon onClick={() => removeLog(batch.id, entry.id)} />
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

function Bottles({ batch }: { batch: Batch }) {
  const [countRaw, setCount] = useState('');
  const [volRaw, setVol] = useState('750');
  const [bottledOn, setBottledOn] = useState(todayInput());
  const [readyOn, setReadyOn] = useState('');
  const count = parseNumber(countRaw);
  const vol = parseNumber(volRaw);
  const valid = Number.isInteger(count) && count > 0 && vol > 0 && bottledOn !== '';
  const today = todayInput();
  const total = batch.bottles.reduce((n, lot) => n + lot.count, 0);
  const liters = batch.bottles.reduce((n, lot) => n + (lot.count * lot.volumeMl) / 1000, 0);

  const save = () => {
    if (!valid) return;
    addBottles(batch.id, { count, volumeMl: vol, bottledOn, readyOn: readyOn || undefined });
    setCount(''); setReadyOn('');
  };

  return (
    <Panel
      title={b.bottles}
      aside={total > 0 ? <span className="num text-sm text-muted">{b.bottlesTotal.replace('{n}', String(total)).replace('{l}', volume(liters))}</span> : undefined}
    >
      {batch.bottles.length === 0 ? (
        <p className="text-[0.88rem] text-muted">{b.noBottles}</p>
      ) : (
        <ul>
          {batch.bottles.map((lot) => {
            const ready = lot.readyOn !== undefined && lot.readyOn <= today;
            return (
              <li key={lot.id} className="flex items-center gap-3 border-b border-line/60 py-2.5 last:border-0">
                <span className="num shrink-0 whitespace-nowrap text-strong">{lot.count} × {lot.volumeMl} мл</span>
                <span className="min-w-0 flex-1 text-[0.88rem] text-muted">
                  {fmtDate(lot.bottledOn)}
                  {lot.readyOn && (
                    <span className={cx('block', ready && 'text-gold')}>
                      {ready ? b.ready : b.readyFrom.replace('{date}', fmtDate(lot.readyOn))}
                    </span>
                  )}
                </span>
                <RemoveIcon onClick={() => removeBottles(batch.id, lot.id)} />
              </li>
            );
          })}
        </ul>
      )}
      <form
        className="flex flex-col gap-3 rounded-lg bg-raised/50 p-4"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <NumberField label={b.bottleCount} value={countRaw} onChange={setCount} />
          <NumberField label={b.bottleVolume} value={volRaw} onChange={setVol} unit="мл" />
          <TextField label={b.bottledOn} type="date" value={bottledOn} onChange={setBottledOn} max={today} />
          <TextField label={b.readyOn} type="date" value={readyOn} onChange={setReadyOn} min={bottledOn} />
        </div>
        <Button type="submit" variant="outline" className="w-fit" disabled={!valid}>{b.addBottles}</Button>
      </form>
    </Panel>
  );
}

export function BatchDetailPage() {
  const batch = useBatch(useParams().id);
  const navigate = useNavigate();
  if (!batch) return <NotFound />;

  const recipe = recipeById(batch.recipeId);
  const today = todayInput();
  const current = latestGravity(batch);
  const advice = nextActions(batch, today, recipe ? { min: recipe.tempC[0], max: recipe.tempC[1] } : undefined);
  const day = Math.max(1, daysBetween(batch.startedOn, today) + 1);
  const fermenting = batch.og !== undefined && current !== undefined && current < batch.og;

  const remove = () => {
    if (!window.confirm(b.deleteConfirm)) return;
    deleteBatch(batch.id);
    navigate('/batches', { replace: true });
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        back={{ to: '/batches', label: b.title }}
        eyebrow={`${b.day.replace('{n}', String(day))} · ${fmtDate(batch.startedOn)}`}
        title={batch.name}
      />
      <Card className="grid grid-cols-2 gap-x-4 gap-y-5 p-5 sm:grid-cols-4">
        <Stat label={b.stats.og} value={batch.og !== undefined ? sg(batch.og) : '—'} />
        <Stat label={b.stats.now} value={current !== undefined ? sg(current) : '—'} note={batch.targetFg !== undefined ? `${b.stats.target} ${sg(batch.targetFg)}` : undefined} />
        <Stat label={b.stats.abv} value={fermenting ? num(abvStandard(batch.og as number, current as number), 1) : '—'} unit={fermenting ? '%' : undefined} />
        <Stat label={b.stats.fermented} value={fermenting ? num(attenuation(batch.og as number, current as number), 0) : '—'} unit={fermenting ? '%' : undefined} />
      </Card>

      <Panel title={b.next}>
        <AdviceList advice={advice} />
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.35fr] lg:items-start">
        <Timeline batch={batch} />
        <Measurements batch={batch} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start">
        <Journal batch={batch} />
        <Bottles batch={batch} />
      </div>

      <Panel title={b.details}>
        <dl className="grid gap-x-6 gap-y-3 text-[0.95rem] sm:grid-cols-2">
          {[
            [t.batches.form.liters, `${num(batch.liters, Number.isInteger(batch.liters) ? 0 : 1)} л`],
            [t.batches.form.honey, batch.honey],
            [t.batches.form.yeast, batch.yeast],
            [t.batches.form.notes, batch.notes],
          ].map(([label, value]) =>
            value ? (
              <div key={label}>
                <dt className="label">{label}</dt>
                <dd className="text-strong">{value}</dd>
              </div>
            ) : null,
          )}
          {recipe && (
            <div>
              <dt className="label">{t.batches.form.recipe}</dt>
              <dd><Link to={`/recipes/${recipe.id}`} className="text-gold hover:text-honey">{recipe.name}</Link></dd>
            </div>
          )}
        </dl>
        <Button variant="quiet" onClick={remove} className="-ml-3 w-fit !text-danger">
          <Trash2 size={15} aria-hidden /> {b.delete}
        </Button>
      </Panel>
    </div>
  );
}
