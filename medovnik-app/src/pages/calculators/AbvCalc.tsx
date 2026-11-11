import { NumberField, Stat } from '@/components/ui';
import { abvAlternate, abvStandard, attenuation, strengthFromAbv, sweetnessFromFg } from '@/lib/brewing';
import { num } from '@/lib/format';
import { t } from '@/i18n';
import { CalcLayout, StatGrid, fgError, ogError, useNumber } from './shared';

export function AbvCalc() {
  const c = t.calcs.abv;
  const [ogRaw, setOg, og] = useNumber('1.090');
  const [fgRaw, setFg, fg] = useNumber('1.000');
  const ogErr = ogError(og);
  const fgErr = fgError(fg, og);
  const ok = !ogErr && !fgErr;
  const abv = abvStandard(og, fg);

  return (
    <CalcLayout
      about={c}
      inputs={
        <>
          <NumberField label={t.calc.og} value={ogRaw} onChange={setOg} error={ogErr} placeholder="1.090" />
          <NumberField label={t.calc.fg} value={fgRaw} onChange={setFg} error={fgErr} placeholder="1.000" />
        </>
      }
      result={
        ok ? (
          <>
            <Stat lead label={c.standard} value={num(abv, 1)} unit="% об." />
            <StatGrid>
              <Stat label={c.alternate} value={num(abvAlternate(og, fg), 1)} unit="%" />
              <Stat label={c.attenuation} value={num(attenuation(og, fg), 0)} unit="%" />
              <Stat label={c.sweetness} value={t.sweetness[sweetnessFromFg(fg)]} />
              <Stat label={c.strength} value={t.strength[strengthFromAbv(abv)]} />
            </StatGrid>
          </>
        ) : null
      }
    />
  );
}
