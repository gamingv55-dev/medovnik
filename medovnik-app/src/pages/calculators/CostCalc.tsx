import { useState } from 'react';
import { NumberField, Segmented, Stat, cx } from '@/components/ui';
import { batchCost } from '@/lib/brewing';
import { num, parseNumber, volume } from '@/lib/format';
import { uid } from '@/lib/storage';
import { t } from '@/i18n';
import { CalcLayout, StatGrid, positiveError, useNumber } from './shared';
import { CELL, RemoveButton, RowList } from './rows';

interface Row {
  id: string;
  name: string;
  cost: string;
}

export function CostCalc() {
  const c = t.calcs.cost;
  const [litersRaw, setLiters, liters] = useNumber('5');
  const [lossRaw, setLoss, loss] = useNumber('10');
  const [bottle, setBottle] = useState<'330' | '500' | '750'>('750');
  const [rows, setRows] = useState<Row[]>(() => c.defaults.map((name) => ({ id: uid(), name, cost: '' })));

  const litersErr = positiveError(liters);
  const lossErr = Number.isNaN(loss) ? t.common.invalid : loss < 0 || loss >= 100 ? c.lossRange : undefined;
  const ok = !litersErr && !lossErr;
  const result = batchCost(rows.map((r) => parseNumber(r.cost)), liters, loss, Number(bottle));
  const patch = (id: string, change: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...change } : r)));

  return (
    <CalcLayout
      about={c}
      inputs={
        <>
          <RowList onAdd={() => setRows((rs) => [...rs, { id: uid(), name: '', cost: '' }])} addLabel={c.addRow}>
            <div className="label grid grid-cols-[1fr_6rem_2.25rem] gap-2">
              <span>{c.item}</span>
              <span>{c.price}, €</span>
              <span />
            </div>
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-[1fr_6rem_2.25rem] gap-2">
                <input className={CELL} aria-label={c.item} value={r.name} onChange={(e) => patch(r.id, { name: e.target.value })} />
                <input className={cx(CELL, 'num')} aria-label={`${c.price} — ${r.name}`} inputMode="decimal" placeholder="0" value={r.cost} onChange={(e) => patch(r.id, { cost: e.target.value })} />
                <RemoveButton label={c.removeRow} onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))} />
              </div>
            ))}
          </RowList>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={t.calc.volume} value={litersRaw} onChange={setLiters} unit="л" error={litersErr} />
            <NumberField label={c.loss} value={lossRaw} onChange={setLoss} unit="%" error={lossErr} />
          </div>
          <Segmented
            label={c.bottle}
            value={bottle}
            onChange={setBottle}
            options={[
              { value: '330', label: '330 мл' },
              { value: '500', label: '500 мл' },
              { value: '750', label: '750 мл' },
            ]}
          />
        </>
      }
      result={
        ok ? (
          <>
            <Stat lead label={c.perLiter} value={num(result.perLiter, 2)} unit="€" />
            <StatGrid>
              <Stat label={c.perBottle} value={result.bottles > 0 ? num(result.perBottle, 2) : '—'} unit="€" />
              <Stat label={c.total} value={num(result.total, 2)} unit="€" />
              <Stat label={c.yield} value={volume(result.yieldLiters)} />
              <Stat label={c.bottles} value={String(result.bottles)} />
            </StatGrid>
          </>
        ) : null
      }
    />
  );
}
