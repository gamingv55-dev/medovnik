import type { LucideIcon } from 'lucide-react';
import { Calculator, House } from 'lucide-react';
import { t } from '@/i18n';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

/** Destinations of the bottom bar (and of the side rail on wide screens). */
export const NAV: NavItem[] = [
  { to: '/', label: t.nav.home, icon: House },
  { to: '/calculators', label: t.nav.calculators, icon: Calculator },
];

export const isActive = (pathname: string, to: string): boolean =>
  to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);
