import { useState } from 'react';
import { NumberField, Segmented, Stat } from '@/components/ui';
import { waterForAbv, waterForGravity } from '@/lib/brewing';
import { volume } from '@/lib/format';
import { t } from '@/i18n';
import { CalcLayout, StatGrid, positiveError, useNumber } from './shared';

export function DilutionCalc() {
  const c = t.calcs.dilution;
  const [mode, setMode] = useState<'gravity' | 'abv'>('gravity');
  const [volRaw, setVol, liters] = useNumber('5');
  const [curSgRaw, setCurSg, curSg] = useNumber('1.120');
  const [tgtSgRaw, setTgtSg, tgtSg] = useNumber('1.100');
  const [curAbvRaw, setCurAbv, curAbv] = useNumber('14');
  const [tgtAbvRaw, setTgtAbv, tgtAbv] = useNumber('12');

  const volErr = positiveError(liters);
  const byGravity = mode === 'gravity';
  const current = byGravity ? curSg : curAbv;
  const target = byGravity ? tgtSg : tgtAbv;
  const floor = byGravity ? 1 : 0;
  const currentErr = Number.isNaN(current) ? t.common.invalid : current <= floor ? t.calc.positive : undefined;
  const targetErr = Number.isNaN(target)
    ? t.common.invalid
    : target <= floor
      ? t.calc.positive
      : target >= current
        ? c.lower
        : undefined;
  const ok = !volErr && !currentErr && !targetErr;
  const water = byGravity ? waterForGravity(liters, curSg, tgtSg) : waterForAbv(liters, curAbv, tgtAbv);

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
              { value: 'gravity', label: c.gravity },
              { value: 'abv', label: c.abv },
            ]}
          />
          <NumberField label={c.volume} value={volRaw} onChange={setVol} unit="л" error={volErr} />
          {byGravity ? (
            <>
              <NumberField label={c.currentSg} value={curSgRaw} onChange={setCurSg} error={currentErr} />
              <NumberField label={c.targetSg} value={tgtSgRaw} onChange={setTgtSg} error={targetErr} />
            </>
          ) : (
            <>
              <NumberField label={c.currentAbv} value={curAbvRaw} onChange={setCurAbv} unit="%" error={currentErr} />
              <NumberField label={c.targetAbv} value={tgtAbvRaw} onChange={setTgtAbv} unit="%" error={targetErr} />
            </>
          )}
        </>
      }
      result={
        ok ? (
          <>
            <Stat lead label={c.water} value={volume(water).split(' ')[0] ?? ''} unit={volume(water).split(' ')[1]} />
            <StatGrid>
              <Stat label={c.final} value={volume(liters + water)} />
            </StatGrid>
          </>
        ) : null
      }
    />
  );
}
