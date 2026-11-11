import { ArrowRight } from 'lucide-react';
import { Button, SectionTitle } from '@/components/ui';
import { FactCard } from '@/components/FactCard';
import { t } from '@/i18n';
import { CALCULATORS, CalculatorTile } from './calculators';

function Hero() {
  return (
    <section className="relative -mx-4 overflow-hidden sm:-mx-6 lg:mx-0 lg:mt-10 lg:rounded-2xl lg:border lg:border-line">
      <picture>
        <source media="(max-width: 640px)" srcSet="/img/hero-product-mobile.webp" />
        <img
          src="/img/hero-product.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-70"
          // React 18 only passes the lowercase attribute through; its types only know the camelCase one.
          {...{ fetchpriority: 'high' }}
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/75 to-ground/10 lg:bg-gradient-to-r lg:from-ground lg:via-ground/80 lg:to-transparent" />
      <div className="relative flex min-h-[26rem] flex-col justify-end gap-4 px-4 pb-8 pt-24 sm:px-6 lg:min-h-[28rem] lg:max-w-xl lg:justify-center lg:px-12 lg:py-16">
        <p className="label text-gold">{t.home.eyebrow}</p>
        <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl">{t.home.title}</h1>
        <p className="max-w-md text-[1.02rem] text-text/90">{t.home.lede}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button to="/calculators/honey">
            {t.home.start} <ArrowRight size={16} aria-hidden />
          </Button>
          <Button to="/calculators" variant="outline">{t.calc.title}</Button>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <section>
        <SectionTitle title={t.home.tools} action={{ to: '/calculators', label: t.common.seeAll }} />
        <div className="grid gap-3 sm:grid-cols-2">
          {CALCULATORS.slice(0, 4).map((calc) => (
            <CalculatorTile key={calc.id} calc={calc} />
          ))}
        </div>
      </section>
      <section>
        <FactCard />
      </section>
    </div>
  );
}
