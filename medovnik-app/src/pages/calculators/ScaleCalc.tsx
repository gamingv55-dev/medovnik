import { useState } from 'react';
import { NumberField, Stat, cx } from '@/components/ui';
import { scaleAmount, tidy } from '@/lib/brewing';
import { num, parseNumber } from '@/lib/format';
import { uid } from '@/lib/storage';
import { t } from '@/i18n';
import { CalcLayout, positiveError, useNumber } from './shared';
import { CELL, RemoveButton, RowList } from './rows';

interface Row {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

export function ScaleCalc() {
  const c = t.calcs.scale;
  const [baseRaw, setBase, base] = useNumber('5');
  const [targetRaw, setTarget, target] = useNumber('20');
  const [rows, setRows] = useState<Row[]>(() => [
    { id: uid(), name: c.sample[0] ?? '', amount: '1,5', unit: 'кг' },
    { id: uid(), name: c.sample[1] ?? '', amount: '4', unit: 'л' },
    { id: uid(), name: c.sample[2] ?? '', amount: '5', unit: 'г' },
  ]);

  const baseErr = positiveError(base);
  const targetErr = positiveError(target);
  const ok = !baseErr && !targetErr;
  const patch = (id: string, change: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...change } : r)));

  return (
    <CalcLayout
      about={c}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={c.base} value={baseRaw} onChange={setBase} unit="л" error={baseErr} />
            <NumberField label={c.target} value={targetRaw} onChange={setTarget} unit="л" error={targetErr} />
          </div>
          <RowList onAdd={() => setRows((rs) => [...rs, { id: uid(), name: '', amount: '', unit: 'г' }])} addLabel={c.addRow}>
            <div className="label grid grid-cols-[1fr_5rem_3.5rem_2.25rem] gap-2">
              <span>{c.ingredient}</span>
              <span>{c.amount}</span>
              <span>{c.unit}</span>
              <span />
            </div>
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-[1fr_5rem_3.5rem_2.25rem] gap-2">
                <input className={CELL} aria-label={c.ingredient} value={r.name} onChange={(e) => patch(r.id, { name: e.target.value })} />
                <input className={cx(CELL, 'num')} aria-label={c.amount} inputMode="decimal" value={r.amount} onChange={(e) => patch(r.id, { amount: e.target.value })} />
                <input className={CELL} aria-label={c.unit} value={r.unit} onChange={(e) => patch(r.id, { unit: e.target.value })} />
                <RemoveButton label={c.removeRow} onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))} />
              </div>
            ))}
          </RowList>
        </>
      }
      result={
        ok ? (
          <>
            <Stat lead label={c.factor} value={`× ${num(target / base, 2)}`} />
            <ul className="flex flex-col border-t border-line">
              {rows
                .filter((r) => r.name.trim() !== '' || r.amount.trim() !== '')
                .map((r) => {
                  const amount = parseNumber(r.amount);
                  return (
                    <li key={r.id} className="flex items-baseline justify-between gap-4 border-b border-line/60 py-2.5">
                      <span className="min-w-0 truncate">{r.name || '—'}</span>
                      <span className="num shrink-0 text-strong">
                        {Number.isNaN(amount) ? '—' : num(tidy(scaleAmount(amount, base, target)), 2).replace(/,00$/, '')} {r.unit}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </>
        ) : null
      }
    />
  );
}
