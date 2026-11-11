import { useState, type ReactNode } from 'react';
import { Card, Note } from '@/components/ui';
import { parseNumber } from '@/lib/format';
import { t } from '@/i18n';

/** A number field's text plus its parsed value. */
export function useNumber(initial: string): [string, (raw: string) => void, number] {
  const [raw, setRaw] = useState(initial);
  return [raw, setRaw, parseNumber(raw)];
}

export const ogError = (v: number): string | undefined =>
  Number.isNaN(v) ? t.common.invalid : v < 1 || v > 1.2 ? t.calc.ogRange : undefined;

export const fgError = (v: number, og: number): string | undefined =>
  Number.isNaN(v) ? t.common.invalid : v < 0.98 || (Number.isFinite(og) && v > og) ? t.calc.fgRange : undefined;

export const positiveError = (v: number): string | undefined =>
  Number.isNaN(v) ? t.common.invalid : v <= 0 ? t.calc.positive : undefined;

interface AboutText {
  how: string;
  meaning: string;
  limits: string;
}

interface CalcLayoutProps {
  inputs: ReactNode;
  /** Rendered only when every input is valid. */
  result: ReactNode | null;
  about: AboutText;
  extra?: ReactNode;
}

/** Inputs on the left, live result on the right (stacked on a phone), explanation below. */
export function CalcLayout({ inputs, result, about, extra }: CalcLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <Card className="flex flex-col gap-4 p-5">
          <h2 className="label text-gold">{t.calc.inputs}</h2>
          {inputs}
        </Card>
        <Card className="flex flex-col gap-5 p-5 lg:sticky lg:top-8">
          <h2 className="label text-gold">{t.calc.result}</h2>
          <div aria-live="polite" className="flex flex-col gap-5">
            {result ?? <p className="text-muted">{t.calc.fillIn}</p>}
          </div>
        </Card>
      </div>
      {extra}
      <div className="grid gap-3 lg:grid-cols-3">
        <Note title={t.common.howTo}>{about.how}</Note>
        <Note title={t.common.meaning}>{about.meaning}</Note>
        <Note title={t.common.limits}>{about.limits}</Note>
      </div>
    </div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-5">{children}</div>;
}
