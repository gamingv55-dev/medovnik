import { useState } from 'react';
import { Card, NumberField, Segmented, Stat } from '@/components/ui';
import { labelDose, rehydration, tosna, type NitrogenNeed } from '@/lib/brewing';
import { num, sg } from '@/lib/format';
import { t } from '@/i18n';
import { CalcLayout, StatGrid, ogError, positiveError, useNumber } from './shared';

export function NutrientCalc() {
  const c = t.calcs.nutrients;
  const [need, setNeed] = useState<NitrogenNeed>('low');
  const [litersRaw, setLiters, liters] = useNumber('5');
  const [ogRaw, setOg, og] = useNumber('1.090');
  const [yeastRaw, setYeast, yeast] = useNumber('5');
  const [doseRaw, setDose, dose] = useNumber('30');

  const litersErr = positiveError(liters);
  const ogErr = ogError(og);
  const yeastErr = positiveError(yeast);
  const ok = !litersErr && !ogErr && !yeastErr;
  const plan = tosna(liters, og, need);
  const rehydrate = rehydration(yeast);
  const doseOk = !litersErr && !positiveError(dose);

  return (
    <CalcLayout
      about={c}
      inputs={
        <>
          <NumberField label={t.calc.volume} value={litersRaw} onChange={setLiters} unit="л" error={litersErr} />
          <NumberField label={t.calc.og} value={ogRaw} onChange={setOg} error={ogErr} placeholder="1.090" />
          <div className="flex flex-col gap-1.5">
            <Segmented
              label={c.need}
              value={need}
              onChange={setNeed}
              options={[
                { value: 'low', label: c.low },
                { value: 'medium', label: c.medium },
                { value: 'high', label: c.high },
              ]}
            />
            <p className="text-[0.8rem] text-muted">{c.needHint}</p>
          </div>
          <NumberField label={c.yeast} value={yeastRaw} onChange={setYeast} unit="г" error={yeastErr} />
        </>
      }
      result={
        ok ? (
          <>
            <Stat lead label={c.total} value={num(plan.totalGrams, 1)} unit="г" />
            <StatGrid>
              <Stat label={c.each} value={num(plan.perAddition, 1)} unit="г" />
              <Stat label={c.yan} value={num(plan.yanTarget, 0)} unit="мг/л" />
              <Stat label={c.goferm} value={num(rehydrate.goFermGrams, 1)} unit="г" />
              <Stat label={c.gofermWater} value={num(rehydrate.waterMl, 0)} unit="мл" />
            </StatGrid>
            <div className="border-t border-line pt-5">
              <h3 className="label mb-3">{c.schedule}</h3>
              <ol className="flex flex-col gap-2.5">
                {c.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-[0.92rem]">
                    <span className="num mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/50 text-xs text-gold">
                      {i + 1}
                    </span>
                    <span>
                      <span className="num text-strong">{num(plan.perAddition, 1)} г</span>
                      <span className="text-muted"> · {step.replace('{sg}', sg(plan.lastAdditionGravity))}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </>
        ) : null
      }
      extra={
        <Card className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="flex flex-col gap-3">
            <h2 className="label text-gold">{c.labelTitle}</h2>
            <p className="text-[0.9rem] text-muted">{c.labelHint}</p>
            <div className="max-w-xs">
              <NumberField label={c.dose} value={doseRaw} onChange={setDose} unit="г/хл" error={positiveError(dose)} />
            </div>
          </div>
          <Stat label={c.doseResult} value={doseOk ? num(labelDose(liters, dose), 1) : '—'} unit="г" />
        </Card>
      }
    />
  );
}
