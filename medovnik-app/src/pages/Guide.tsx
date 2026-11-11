import { Link } from 'react-router-dom';
import { ArrowRight, Check, LifeBuoy } from 'lucide-react';
import { Badge, Card, PageHeader, cx } from '@/components/ui';
import { LESSONS, LESSON_CATEGORIES, LEVEL_LABEL, type Lesson } from '@/content/lessons';
import { usePrefs } from '@/store/prefs';
import { t } from '@/i18n';

export function LessonRow({ lesson, read }: { lesson: Lesson; read: boolean }) {
  return (
    <Link
      to={`/guide/lesson/${lesson.id}`}
      className="group flex items-center gap-3 border-b border-line/60 py-3.5 last:border-0"
    >
      <span
        className={cx(
          'grid h-7 w-7 shrink-0 place-items-center rounded-full border',
          read ? 'border-gold bg-gold text-ongold' : 'border-line text-transparent',
        )}
        aria-hidden
      >
        <Check size={15} strokeWidth={2.4} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-strong group-hover:text-gold">{lesson.title}</span>
        <span className="block text-[0.85rem] text-muted">{lesson.summary}</span>
      </span>
      <span className="num shrink-0 text-xs text-dim">{t.guide.minutes.replace('{n}', String(lesson.minutes))}</span>
    </Link>
  );
}

export function GuidePage() {
  const { readLessons } = usePrefs();
  const done = LESSONS.filter((l) => readLessons.includes(l.id)).length;

  return (
    <>
      <PageHeader eyebrow={t.app.name} title={t.guide.title} lede={t.guide.lede} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between text-sm text-muted">
            <span>{t.guide.progress.replace('{done}', String(done)).replace('{all}', String(LESSONS.length))}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-raised" role="progressbar" aria-valuemin={0} aria-valuemax={LESSONS.length} aria-valuenow={done}>
            <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${(done / LESSONS.length) * 100}%` }} />
          </div>
        </div>

        <Link to="/guide/problems" className="group block">
          <Card className="flex items-center gap-4 border-gold/30 p-5 transition group-hover:border-gold/60">
            <LifeBuoy size={28} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block font-display text-2xl leading-tight text-strong">{t.guide.helpTitle}</span>
              <span className="block text-[0.9rem] text-muted">{t.guide.helpText}</span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-gold" aria-hidden />
          </Card>
        </Link>

        <div className="grid gap-4 lg:grid-cols-2">
          {LESSON_CATEGORIES.map((cat) => {
            const lessons = LESSONS.filter((l) => l.category === cat.id);
            const level = lessons[0]?.level ?? 1;
            return (
              <Card key={cat.id} className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl">{cat.title}</h2>
                    <p className="text-[0.88rem] text-muted">{cat.blurb}</p>
                  </div>
                  <Badge>{LEVEL_LABEL[level]}</Badge>
                </div>
                {lessons.map((l) => (
                  <LessonRow key={l.id} lesson={l} read={readLessons.includes(l.id)} />
                ))}
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
