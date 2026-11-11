import { useState } from 'react';
import { Note, NumberField, Segmented, Stat } from '@/components/ui';
import { primingSugar, type PrimingSugar } from '@/lib/brewing';
import { num } from '@/lib/format';
import { t } from '@/i18n';
import { CalcLayout, StatGrid, positiveError, useNumber } from './shared';

type Preset = '1.5' | '2.2' | '2.8' | 'custom';

export function PrimingCalc() {
  const c = t.calcs.priming;
  const [sugar, setSugar] = useState<PrimingSugar>('sucrose');
  const [preset, setPreset] = useState<Preset>('2.2');
  const [litersRaw, setLiters, liters] = useNumber('5');
  const [tempRaw, setTemp, temp] = useNumber('20');
  const [customRaw, setCustom, custom] = useNumber('2,5');

  const target = preset === 'custom' ? custom : Number(preset);
  const litersErr = positiveError(liters);
  const tempErr = Number.isNaN(temp) ? t.common.invalid : temp < 0 || temp > 35 ? c.tempRange : undefined;
  const targetErr =
    preset === 'custom' ? (Number.isNaN(custom) ? t.common.invalid : custom <= 0 || custom > 4.5 ? c.targetRange : undefined) : undefined;
  const ok = !litersErr && !tempErr && !targetErr;
  const plan = primingSugar(liters, temp, target, sugar);

  return (
    <CalcLayout
      about={c}
      inputs={
        <>
          <NumberField label={t.calc.volume} value={litersRaw} onChange={setLiters} unit="л" error={litersErr} />
          <NumberField label={c.temp} value={tempRaw} onChange={setTemp} unit="°C" error={tempErr} />
          <Segmented
            label={c.target}
            value={preset}
            onChange={setPreset}
            options={[
              { value: '1.5', label: c.light },
              { value: '2.2', label: c.medium },
              { value: '2.8', label: c.lively },
              { value: 'custom', label: c.custom },
            ]}
          />
          {preset === 'custom' && (
            <NumberField label={c.target} value={customRaw} onChange={setCustom} unit={c.targetUnit} error={targetErr} />
          )}
          <Segmented
            label={c.sugar}
            value={sugar}
            onChange={setSugar}
            options={[
              { value: 'sucrose', label: c.sucrose },
              { value: 'dextrose', label: c.dextrose },
              { value: 'honey', label: c.honey },
            ]}
          />
        </>
      }
      result={
        ok ? (
          <>
            <Stat lead label={c.grams} value={num(plan.grams, 0)} unit="г" />
            <StatGrid>
              <Stat label={c.perLiter} value={num(plan.gramsPerLiter, 1)} unit="г" />
              <Stat label={c.perBottle} value={num(plan.gramsPerLiter / 2, 1)} unit="г" />
              <Stat label={c.residual} value={num(plan.residual, 2)} unit={c.volumes} />
            </StatGrid>
            {target > 3 && <p className="text-[0.85rem] text-danger">{c.highWarn}</p>}
          </>
        ) : null
      }
      extra={<Note tone="warn" title={c.warnTitle}>{c.warn}</Note>}
    />
  );
}
