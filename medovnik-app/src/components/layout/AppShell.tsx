import { useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Settings } from 'lucide-react';
import { t } from '@/i18n';
import { cx } from '@/components/ui';
import { NAV, isActive } from './nav';

/** Jump to the top whenever the route changes. */
function useScrollReset(pathname: string) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

function Brand({ large }: { large?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={t.app.name}>
      <img src="/logo.webp" alt="" width={large ? 56 : 36} height={large ? 56 : 36} className="rounded-full" />
      <span className={cx('font-label uppercase tracking-[0.16em] text-gold', large ? 'text-base' : 'text-sm')}>
        {t.app.name}
      </span>
    </Link>
  );
}

function SideRail({ pathname }: { pathname: string }) {
  const secondary = [
    { to: '/kits', label: t.nav.kits, icon: Package },
    { to: '/settings', label: t.nav.settings, icon: Settings },
  ];
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-surface/70 px-5 py-7 backdrop-blur lg:flex">
      <Brand large />
      <nav className="mt-10 flex flex-1 flex-col gap-1" aria-label="Основна навигация">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = isActive(pathname, to);
          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? 'page' : undefined}
              className={cx(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.95rem] transition',
                active ? 'bg-gold/10 text-gold' : 'text-muted hover:bg-raised/70 hover:text-strong',
              )}
            >
              <Icon size={19} strokeWidth={1.7} aria-hidden />
              {label}
            </Link>
          );
        })}
        <div className="hairline my-4" />
        {secondary.map(({ to, label, icon: Icon }) => {
          const active = isActive(pathname, to);
          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? 'page' : undefined}
              className={cx(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.95rem] transition',
                active ? 'bg-gold/10 text-gold' : 'text-muted hover:bg-raised/70 hover:text-strong',
              )}
            >
              <Icon size={19} strokeWidth={1.7} aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <p className="text-[0.78rem] leading-relaxed text-dim">{t.app.tagline}</p>
    </aside>
  );
}

function TopBar() {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between border-b border-line/70 bg-ground/85 px-4 py-2.5 backdrop-blur lg:hidden"
      style={{ paddingTop: 'max(0.625rem, env(safe-area-inset-top))' }}
    >
      <Brand />
      <div className="flex items-center">
        <Link to="/kits" aria-label={t.nav.kits} className="grid h-11 w-11 place-items-center text-muted hover:text-strong">
          <Package size={20} strokeWidth={1.7} aria-hidden />
        </Link>
        <Link to="/settings" aria-label={t.nav.settings} className="grid h-11 w-11 place-items-center text-muted hover:text-strong">
          <Settings size={20} strokeWidth={1.7} aria-hidden />
        </Link>
      </div>
    </header>
  );
}

function BottomNav({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Основна навигация"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-lg">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = isActive(pathname, to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'relative flex min-h-[58px] flex-col items-center justify-center gap-1 text-[0.66rem] transition',
                  active ? 'text-gold' : 'text-muted',
                )}
              >
                <span
                  className={cx(
                    'absolute top-0 h-0.5 w-8 rounded-full bg-gold transition-opacity',
                    active ? 'opacity-100' : 'opacity-0',
                  )}
                  aria-hidden
                />
                <Icon size={21} strokeWidth={active ? 2 : 1.6} aria-hidden />
                <span className="leading-none">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useScrollReset(pathname);
  return (
    <>
      <SideRail pathname={pathname} />
      <TopBar />
      <main className="lg:pl-60">
        <div key={pathname} className="mx-auto max-w-page animate-rise px-4 pb-28 sm:px-6 lg:px-10 lg:pb-20">
          {children}
        </div>
      </main>
      <BottomNav pathname={pathname} />
    </>
  );
}
