import { ArrowUpRight } from 'lucide-react';
import { Badge, Button, Card, PageHeader } from '@/components/ui';
import { KITS, type Kit } from '@/content/kits';
import { t } from '@/i18n';

export function KitCard({ kit, compact }: { kit: Kit; compact?: boolean }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {kit.image ? (
        <img src={kit.image} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover" />
      ) : (
        <div className="grid aspect-[3/2] w-full place-items-center bg-raised">
          <img src="/logo.webp" alt="" width={96} height={96} className="opacity-70" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl">{kit.name}</h2>
            <p className="text-[0.88rem] text-muted">{kit.subtitle}</p>
          </div>
          {kit.comingSoon && <Badge tone="gold">{t.kits.soon}</Badge>}
        </div>
        <p className="text-[0.95rem] text-text/90">{kit.blurb}</p>
        {!compact && (
          <div>
            <p className="label mb-2">{t.kits.contents}</p>
            <ul className="flex flex-wrap gap-1.5">
              {kit.contents.map((item) => (
                <li key={item}><Badge>{item}</Badge></li>
              ))}
            </ul>
          </div>
        )}
        <Button href={kit.url} variant="outline" className="mt-auto w-full">
          {t.kits.cta} <ArrowUpRight size={15} aria-hidden />
        </Button>
      </div>
    </Card>
  );
}

export function KitsPage() {
  return (
    <>
      <PageHeader eyebrow={t.app.name} title={t.kits.title} lede={t.kits.lede} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {KITS.map((kit) => (
          <KitCard key={kit.id} kit={kit} />
        ))}
      </div>
      <p className="pt-5 text-[0.85rem] text-muted">{t.kits.note}</p>
    </>
  );
}
