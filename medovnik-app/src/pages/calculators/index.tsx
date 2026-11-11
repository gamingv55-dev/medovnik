import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight, Coins, Droplets, FlaskRound, Percent, Scale, Sparkles, Sprout } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Card, PageHeader } from '@/components/ui';
import { t } from '@/i18n';
import { NotFound } from '@/pages/NotFound';
import { AbvCalc } from './AbvCalc';
import { CostCalc } from './CostCalc';
import { DilutionCalc } from './DilutionCalc';
import { HoneyCalc } from './HoneyCalc';
import { NutrientCalc } from './NutrientCalc';
import { PrimingCalc } from './PrimingCalc';
import { ScaleCalc } from './ScaleCalc';

export interface CalculatorEntry {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  component: ComponentType;
}

export const CALCULATORS: CalculatorEntry[] = [
  { id: 'abv', ...pick(t.calcs.abv), icon: Percent, component: AbvCalc },
  { id: 'honey', ...pick(t.calcs.honey), icon: FlaskRound, component: HoneyCalc },
  { id: 'scale', ...pick(t.calcs.scale), icon: Scale, component: ScaleCalc },
  { id: 'nutrients', ...pick(t.calcs.nutrients), icon: Sprout, component: NutrientCalc },
  { id: 'priming', ...pick(t.calcs.priming), icon: Sparkles, component: PrimingCalc },
  { id: 'dilution', ...pick(t.calcs.dilution), icon: Droplets, component: DilutionCalc },
  { id: 'cost', ...pick(t.calcs.cost), icon: Coins, component: CostCalc },
];

function pick(c: { title: string; summary: string }) {
  return { title: c.title, summary: c.summary };
}

export function CalculatorTile({ calc }: { calc: CalculatorEntry }) {
  const Icon = calc.icon;
  return (
    <Link to={`/calculators/${calc.id}`} className="group block">
      <Card className="flex h-full items-center gap-4 p-4 transition group-hover:border-gold/50">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
          <Icon size={20} strokeWidth={1.6} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-xl leading-tight text-strong">{calc.title}</span>
          <span className="block text-[0.88rem] text-muted">{calc.summary}</span>
        </span>
        <ChevronRight size={18} className="shrink-0 text-dim transition group-hover:translate-x-0.5 group-hover:text-gold" aria-hidden />
      </Card>
    </Link>
  );
}

export function CalculatorsPage() {
  return (
    <>
      <PageHeader eyebrow={t.app.name} title={t.calc.title} lede={t.calc.lede} />
      <div className="grid gap-3 sm:grid-cols-2">
        {CALCULATORS.map((calc) => (
          <CalculatorTile key={calc.id} calc={calc} />
        ))}
      </div>
    </>
  );
}

export function CalculatorPage() {
  const { id } = useParams();
  const calc = CALCULATORS.find((c) => c.id === id);
  if (!calc) return <NotFound />;
  const Body = calc.component;
  return (
    <>
      <PageHeader back={{ to: '/calculators', label: t.calc.title }} title={calc.title} lede={calc.summary} />
      <Body />
    </>
  );
}
