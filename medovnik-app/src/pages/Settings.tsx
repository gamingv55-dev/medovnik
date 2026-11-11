import { ArrowUpRight, Monitor, Moon, Sun } from 'lucide-react';
import { Button, Card, PageHeader, cx } from '@/components/ui';
import { SITE_URL } from '@/lib/site';
import { setTheme, usePrefs, type Theme } from '@/store/prefs';
import { t } from '@/i18n';

const THEMES: Array<{ value: Theme; label: string; icon: typeof Sun }> = [
  { value: 'dark', label: t.settings.dark, icon: Moon },
  { value: 'light', label: t.settings.light, icon: Sun },
  { value: 'system', label: t.settings.system, icon: Monitor },
];

export function Settings() {
  const { theme } = usePrefs();
  return (
    <>
      <PageHeader title={t.settings.title} />
      <div className="flex max-w-prose flex-col gap-4">
        <Card className="flex flex-col gap-4 p-5">
          <h2 className="label text-gold">{t.settings.theme}</h2>
          <div role="radiogroup" aria-label={t.settings.theme} className="grid gap-2 sm:grid-cols-3">
            {THEMES.map(({ value, label, icon: Icon }) => {
              const active = theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setTheme(value)}
                  className={cx(
                    'flex min-h-[52px] items-center gap-3 rounded-md border px-4 text-left text-[0.95rem] transition',
                    active ? 'border-gold bg-gold/10 text-strong' : 'border-line text-muted hover:text-strong',
                  )}
                >
                  <Icon size={18} strokeWidth={1.7} className={active ? 'text-gold' : undefined} aria-hidden />
                  {label}
                </button>
              );
            })}
          </div>
        </Card>
        <Card className="flex flex-col gap-3 p-5">
          <h2 className="label text-gold">{t.settings.about}</h2>
          <p className="text-[0.95rem] text-text/90">{t.settings.aboutText}</p>
          <p className="text-[0.85rem] text-muted">{t.settings.age}</p>
          <Button href={SITE_URL} variant="outline" className="w-fit">
            {t.settings.site} <ArrowUpRight size={15} aria-hidden />
          </Button>
        </Card>
      </div>
    </>
  );
}
