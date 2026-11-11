import { useState } from 'react';
import { NumberField, Segmented, Stat } from '@/components/ui';
import { abvStandard, gravityFromHoney, honeyForGravity, ogForAbv, type Sweetness } from '@/lib/brewing';
import { num, sg, volume, weight } from '@/lib/format';
import { t } from '@/i18n';
import { CalcLayout, StatGrid, ogError, positiveError, useNumber } from './shared';

type Mode = 'gravity' | 'abv' | 'honey';

/** Final gravity assumed for each sweetness when working back from an alcohol target. */
const STYLE_FG: Record<Sweetness, number> = { dry: 1.0, semi: 1.015, sweet: 1.03 };

export function HoneyCalc() {
  const c = t.calcs.honey;
  const [mode, setMode] = useState<Mode>('gravity');
  const [style, setStyle] = useState<Sweetness>('dry');
  const [litersRaw, setLiters, liters] = useNumber('5');
  const [ogRaw, setOg, targetOg] = useNumber('1.090');
  const [abvRaw, setAbv, targetAbv] = useNumber('12');
  const [kgRaw, setKg, honeyKg] = useNumber('1,5');

  const litersErr = positiveError(liters);
  const ogErr = mode === 'gravity' ? ogError(targetOg) : undefined;
  const abvErr =
    mode === 'abv' ? (Number.isNaN(targetAbv) ? t.common.invalid : targetAbv <= 0 || targetAbv > 20 ? c.abvRange : undefined) : undefined;
  const kgErr = mode === 'honey' ? positiveError(honeyKg) : undefined;
  const ok = !litersErr && !ogErr && !abvErr && !kgErr;

  const fg = mode === 'abv' ? STYLE_FG[style] : 1;
  const og = mode === 'gravity' ? targetOg : mode === 'abv' ? ogForAbv(targetAbv, fg) : gravityFromHoney(honeyKg, liters);
  const plan = honeyForGravity(liters, og);
  const tooStrong = ok && og > 1.16;

  return (
    <CalcLayout
      about={c}
      inputs={
        <>
          <Segmented
            label={c.mode}
            value={mode}
            onChange={setMode}
            options={[
              { value: 'gravity', label: c.byGravity },
              { value: 'abv', label: c.byAbv },
              { value: 'honey', label: c.fromHoney },
            ]}
          />
          <NumberField label={c.liters} value={litersRaw} onChange={setLiters} unit="л" error={litersErr} />
          {mode === 'gravity' && <NumberField label={c.targetOg} value={ogRaw} onChange={setOg} error={ogErr} placeholder="1.090" />}
          {mode === 'abv' && (
            <>
              <NumberField label={c.targetAbv} value={abvRaw} onChange={setAbv} unit="%" error={abvErr} />
              <Segmented
                label={c.style}
                value={style}
                onChange={setStyle}
                options={[
                  { value: 'dry', label: t.sweetness.dry },
                  { value: 'semi', label: t.sweetness.semi },
                  { value: 'sweet', label: t.sweetness.sweet },
                ]}
              />
            </>
          )}
          {mode === 'honey' && <NumberField label={c.honeyKg} value={kgRaw} onChange={setKg} unit="кг" error={kgErr} />}
        </>
      }
      result={
        ok ? (
          <>
            {mode === 'honey' ? (
              <Stat lead label={c.og} value={sg(og)} />
            ) : (
              <Stat lead label={c.honey} value={plan.honeyKg < 1 ? num(plan.honeyKg * 1000, 0) : num(plan.honeyKg, 2)} unit={plan.honeyKg < 1 ? 'г' : 'кг'} />
            )}
            <StatGrid>
              <Stat label={c.water} value={volume(plan.waterLiters)} />
              <Stat label={c.honeyVolume} value={volume(plan.honeyLiters)} />
              {mode === 'honey' ? <Stat label={c.honey} value={weight(plan.honeyKg)} /> : <Stat label={c.og} value={sg(og)} />}
              <Stat
                label={c.potential}
                value={num(abvStandard(og, fg), 1)}
                unit="%"
                note={c.potentialNote.replace('{fg}', sg(fg))}
              />
            </StatGrid>
            {tooStrong && (
              <p className="text-[0.85rem] text-danger">{c.tooStrong}</p>
            )}
          </>
        ) : null
      }
    />
  );
}
