import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { Badge, Button, Card, PageHeader } from '@/components/ui';
import { FavoriteButton } from '@/components/FavoriteButton';
import { RecipeCard } from '@/components/RecipeCard';
import { LESSON_CATEGORIES, LEVEL_LABEL, lessonById } from '@/content/lessons';
import { recipeById } from '@/content/recipes';
import { toggleRead, usePrefs } from '@/store/prefs';
import { t } from '@/i18n';
import { CALCULATORS, CalculatorTile } from './calculators';
import { NotFound } from './NotFound';

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="p-5">
      <h2 className="label mb-3 text-gold">{title}</h2>
      {children}
    </Card>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.95rem] text-text/90">
          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LessonPage() {
  const lesson = lessonById(useParams().id);
  const { readLessons } = usePrefs();
  if (!lesson) return <NotFound />;

  const g = t.guide;
  const read = readLessons.includes(lesson.id);
  const category = LESSON_CATEGORIES.find((c) => c.id === lesson.category);
  const next = lessonById(lesson.next);
  const recipes = (lesson.recipes ?? []).map(recipeById).filter((r) => r !== undefined);
  const calcs = CALCULATORS.filter((c) => lesson.calculators?.includes(c.id));

  return (
    <article className="flex flex-col gap-6">
      <PageHeader
        back={{ to: '/guide', label: g.backToGuide }}
        eyebrow={category?.title}
        title={lesson.title}
        lede={lesson.summary}
        aside={<FavoriteButton id={`lesson:${lesson.id}`} />}
      />
      <div className="-mt-3 flex flex-wrap gap-1.5">
        <Badge>{LEVEL_LABEL[lesson.level]}</Badge>
        <Badge>{g.minutes.replace('{n}', String(lesson.minutes))}</Badge>
      </div>

      <div className="prose-app max-w-prose text-[1.04rem] leading-[1.75] text-text/95">
        {lesson.body.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>

      <div className="grid max-w-4xl gap-4 lg:grid-cols-2">
        {lesson.steps && (
          <Block title={g.stepsTitle}>
            <ol className="flex flex-col gap-3">
              {lesson.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-[0.95rem] text-text/90">
                  <span className="num grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/50 text-xs text-gold">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Block>
        )}
        {lesson.tools && <Block title={g.tools}><Bullets items={lesson.tools} /></Block>}
        {lesson.tips && <Block title={g.tips}><Bullets items={lesson.tips} /></Block>}
        {lesson.mistakes && <Block title={g.mistakes}><Bullets items={lesson.mistakes} /></Block>}
      </div>

      {(recipes.length > 0 || calcs.length > 0) && (
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl">{g.related}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {calcs.map((c) => (
              <CalculatorTile key={c.id} calc={c} />
            ))}
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button variant={read ? 'outline' : 'primary'} onClick={() => toggleRead(lesson.id)} aria-pressed={read}>
          <Check size={16} aria-hidden /> {read ? g.read : g.markRead}
        </Button>
        {next && (
          <Link to={`/guide/lesson/${next.id}`} className="group flex items-center gap-3 text-right sm:ml-auto">
            <span>
              <span className="label block">{g.next}</span>
              <span className="font-display text-xl text-strong group-hover:text-gold">{next.title}</span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-gold" aria-hidden />
          </Link>
        )}
      </div>
    </article>
  );
}
