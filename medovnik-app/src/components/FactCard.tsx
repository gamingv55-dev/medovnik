import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui';
import { FACTS } from '@/content/facts';
import { t } from '@/i18n';

/** One fact at a time; starts on a different one each day. */
export function FactCard() {
  const [index, setIndex] = useState(() => Math.floor(Date.now() / 86_400_000) % FACTS.length);
  return (
    <Card className="flex flex-col gap-4 p-6">
      <p className="label text-gold">{t.home.fact}</p>
      <p key={index} className="animate-rise font-display text-[1.45rem] leading-snug text-strong">
        {FACTS[index]}
      </p>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % FACTS.length)}
        className="inline-flex min-h-[40px] w-fit items-center gap-2 text-sm text-muted hover:text-strong"
      >
        <RefreshCw size={15} aria-hidden /> {t.home.nextFact}
      </button>
    </Card>
  );
}
