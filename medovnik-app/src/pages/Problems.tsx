import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight, RotateCcw } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button, Card, Note, PageHeader } from '@/components/ui';
import { HELPER, HELPER_START, PROBLEMS, problemById } from '@/content/problems';
import { t } from '@/i18n';
import { NotFound } from './NotFound';

const p = t.problems;

export function ProblemsPage() {
  return (
    <>
      <PageHeader back={{ to: '/guide', label: t.guide.backToGuide }} title={p.title} lede={p.lede} />
      <div className="flex flex-col gap-5">
        <Button to="/guide/helper" className="w-fit">
          {p.helperCta} <ArrowRight size={16} aria-hidden />
        </Button>
        <Card className="px-5">
          {PROBLEMS.map((problem) => (
            <Link key={problem.id} to={`/guide/problems/${problem.id}`} className="group flex items-center gap-3 border-b border-line/60 py-4 last:border-0">
              <span className="min-w-0 flex-1">
                <span className="block font-display text-xl leading-tight text-strong group-hover:text-gold">{problem.title}</span>
                <span className="block text-[0.88rem] text-muted">{problem.summary}</span>
              </span>
              <ChevronRight size={18} className="shrink-0 text-dim group-hover:text-gold" aria-hidden />
            </Link>
          ))}
        </Card>
      </div>
    </>
  );
}

function Section({ title, items, tone }: { title: string; items: string[]; tone?: 'avoid' }) {
  return (
    <Card className="p-5">
      <h2 className={`label mb-3 ${tone === 'avoid' ? 'text-danger' : 'text-gold'}`}>{title}</h2>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[0.95rem] text-text/90">
            <span className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full ${tone === 'avoid' ? 'bg-danger' : 'bg-gold'}`} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function ProblemPage() {
  const problem = problemById(useParams().id);
  if (!problem) return <NotFound />;
  return (
    <article className="flex flex-col gap-4">
      <PageHeader back={{ to: '/guide/problems', label: p.title }} title={problem.title} lede={problem.summary} />
      <Note>{p.disclaimer}</Note>
      <div className="grid gap-4 lg:grid-cols-2">
        <Section title={p.causes} items={problem.causes} />
        <Section title={p.check} items={problem.check} />
        <Section title={p.measure} items={problem.measure} />
        <Section title={p.actions} items={problem.actions} />
        <Section title={p.avoid} items={problem.avoid} tone="avoid" />
        <Note tone="warn" title={p.serious}>{problem.serious}</Note>
      </div>
    </article>
  );
}

function Option({ children, onClick, to }: { children: ReactNode; onClick?: () => void; to?: string }) {
  const cls =
    'flex min-h-[56px] w-full items-center justify-between gap-3 rounded-lg border border-line bg-surface/85 px-4 py-3 text-left text-[0.98rem] transition hover:border-gold/60 hover:text-strong';
  const inner = (
    <>
      <span>{children}</span>
      <ChevronRight size={18} className="shrink-0 text-dim" aria-hidden />
    </>
  );
  return to ? <Link to={to} className={cls}>{inner}</Link> : <button type="button" onClick={onClick} className={cls}>{inner}</button>;
}

/** Walks the question tree; every leaf is a link to a problem page. */
export function HelperPage() {
  const [path, setPath] = useState<string[]>([HELPER_START]);
  const node = HELPER[path[path.length - 1] ?? HELPER_START];
  if (!node) return <NotFound />;

  return (
    <>
      <PageHeader back={{ to: '/guide/problems', label: p.title }} title={p.helperTitle} lede={p.helperLede} />
      <div className="flex max-w-prose flex-col gap-4">
        <p className="label text-gold">{path.length} / 2</p>
        <h2 key={node.question} className="animate-rise text-[1.7rem]">{node.question}</h2>
        <div key={path.join('/')} className="flex animate-rise flex-col gap-2">
          {node.options.map((o) =>
            o.problem ? (
              <Option key={o.label} to={`/guide/problems/${o.problem}`}>{o.label}</Option>
            ) : (
              <Option key={o.label} onClick={() => o.next && setPath((prev) => [...prev, o.next as string])}>{o.label}</Option>
            ),
          )}
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {path.length > 1 && (
            <Button variant="quiet" onClick={() => setPath((prev) => prev.slice(0, -1))}>
              <RotateCcw size={15} aria-hidden /> {p.back}
            </Button>
          )}
          <Button variant="quiet" to="/guide/problems">{p.all}</Button>
        </div>
      </div>
    </>
  );
}
