import { Link } from 'react-router-dom';
import { FlaskConical, Plus } from 'lucide-react';
import { Button, Card, EmptyState, PageHeader } from '@/components/ui';
import { abvStandard } from '@/lib/brewing';
import { latestGravity } from '@/lib/batch/advice';
import { daysBetween, num, sg, todayInput } from '@/lib/format';
import { STAGE_IDS, useBatches, type Batch } from '@/store/batches';
import { t } from '@/i18n';

const b = t.batches;

export function BatchCard({ batch }: { batch: Batch }) {
  const done = STAGE_IDS.filter((s) => batch.stages[s]).length;
  const current = latestGravity(batch);
  const day = Math.max(1, daysBetween(batch.startedOn, todayInput()) + 1);
  return (
    <Link to={`/batches/${batch.id}`} className="group block">
      <Card className="flex h-full flex-col gap-3 p-5 transition group-hover:border-gold/50">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.45rem] leading-tight">{batch.name}</h3>
          <span className="label shrink-0 pt-1.5 text-gold">{b.day.replace('{n}', String(day))}</span>
        </div>
        <div className="num flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span>{num(batch.liters, Number.isInteger(batch.liters) ? 0 : 1)} л</span>
          {current !== undefined && <span>{sg(current)}</span>}
          {batch.og !== undefined && current !== undefined && current < batch.og && <span>{num(abvStandard(batch.og, current), 1)} %</span>}
        </div>
        <div className="mt-auto flex flex-col gap-1.5">
          <div className="flex gap-1" aria-hidden>
            {STAGE_IDS.map((s) => (
              <span key={s} className={`h-1 flex-1 rounded-full ${batch.stages[s] ? 'bg-gold' : 'bg-raised'}`} />
            ))}
          </div>
          <span className="text-xs text-dim">{b.stagesDone.replace('{n}', String(done))}</span>
        </div>
      </Card>
    </Link>
  );
}

export function BatchesPage() {
  const batches = useBatches();
  const active = batches.filter((x) => !x.stages.bottling);
  const bottled = batches.filter((x) => x.stages.bottling);

  return (
    <>
      <PageHeader
        eyebrow={t.app.name}
        title={b.title}
        lede={b.lede}
        aside={batches.length > 0 ? <Button to="/batches/new"><Plus size={16} aria-hidden /> {b.new}</Button> : undefined}
      />
      {batches.length === 0 ? (
        <EmptyState
          icon={<FlaskConical size={38} strokeWidth={1.3} aria-hidden />}
          title={b.emptyTitle}
          text={b.emptyText}
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <Button to="/batches/new"><Plus size={16} aria-hidden /> {b.new}</Button>
              <Button to="/recipes" variant="outline">{b.fromRecipe}</Button>
            </div>
          }
        />
      ) : (
        <div className="flex flex-col gap-8">
          {[{ title: b.active, list: active }, { title: b.bottled, list: bottled }].map(
            ({ title, list }) =>
              list.length > 0 && (
                <section key={title}>
                  <h2 className="label mb-3 text-gold">{title}</h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    {list.map((x) => (
                      <BatchCard key={x.id} batch={x} />
                    ))}
                  </div>
                </section>
              ),
          )}
        </div>
      )}
    </>
  );
}
