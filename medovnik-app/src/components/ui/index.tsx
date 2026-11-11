import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Info, TriangleAlert } from 'lucide-react';

const cx = (...parts: Array<string | false | null | undefined>): string => parts.filter(Boolean).join(' ');
export { cx };

/* ── Button ─────────────────────────────────────────────── */

type Variant = 'primary' | 'outline' | 'quiet';

const BUTTON_BASE =
  'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md px-5 font-label text-[0.72rem] uppercase tracking-[0.12em] transition duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40';

const BUTTON_VARIANT: Record<Variant, string> = {
  primary: 'bg-gold text-ongold shadow-glow hover:bg-honey',
  outline: 'border border-line bg-surface/70 text-text hover:border-gold/60 hover:text-strong',
  quiet: 'px-3 text-muted hover:text-strong',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** Internal route: renders a router link. */
  to?: string;
  /** External address: renders an anchor that opens in a new tab. */
  href?: string;
  children: ReactNode;
}

export function Button({ variant = 'primary', to, href, className, children, ...rest }: ButtonProps) {
  const cls = cx(BUTTON_BASE, BUTTON_VARIANT[variant], className);
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

/* ── Card ───────────────────────────────────────────────── */

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('rounded-xl border border-line bg-surface/85 shadow-card', className)}>{children}</div>;
}

/* ── Fields ─────────────────────────────────────────────── */

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  unit?: string;
  id: string;
  children: ReactNode;
}

function FieldShell({ label, hint, error, unit, id, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label">{label}</label>
      <div
        className={cx(
          'flex items-center rounded-md border bg-ground/60 transition focus-within:border-gold/70',
          error ? 'border-danger/70' : 'border-line',
        )}
      >
        {children}
        {unit && <span className="num pr-3 text-sm text-dim">{unit}</span>}
      </div>
      {error ? (
        <p className="text-[0.8rem] text-danger" role="alert">{error}</p>
      ) : (
        hint && <p className="text-[0.8rem] text-muted">{hint}</p>
      )}
    </div>
  );
}

const INPUT = 'min-h-[46px] w-full min-w-0 bg-transparent px-3 text-strong outline-none placeholder:text-dim';

interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
}

/** Numeric input kept as text so a decimal comma can be typed. */
export function NumberField({ label, value, onChange, unit, hint, error, placeholder }: NumberFieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} hint={hint} error={error} unit={unit} id={id}>
      <input
        id={id}
        className={cx(INPUT, 'num')}
        inputMode="decimal"
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </FieldShell>
  );
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
}

export function TextField({ label, value, onChange, hint, error, ...rest }: TextFieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} hint={hint} error={error} id={id}>
      <input id={id} className={INPUT} value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
    </FieldShell>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextArea({ label, value, onChange, placeholder, rows = 3 }: TextAreaProps) {
  const id = useId();
  return (
    <FieldShell label={label} id={id}>
      <textarea
        id={id}
        rows={rows}
        className={cx(INPUT, 'resize-y py-2.5 leading-relaxed')}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </FieldShell>
  );
}

/* ── Segmented control ──────────────────────────────────── */

interface SegmentedProps<T extends string> {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
}

export function Segmented<T extends string>({ label, value, onChange, options }: SegmentedProps<T>) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="label">{label}</span>}
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1 rounded-md border border-line bg-ground/60 p-1">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.value)}
              className={cx(
                'min-h-[38px] flex-1 whitespace-nowrap rounded px-3 text-sm transition',
                active ? 'bg-gold font-semibold text-ongold' : 'text-muted hover:text-strong',
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Result figures ─────────────────────────────────────── */

interface StatProps {
  label: string;
  value: string;
  unit?: string;
  /** The headline figure of a result panel. */
  lead?: boolean;
  note?: string;
}

export function Stat({ label, value, unit, lead, note }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="label">{label}</span>
      <span className="flex items-baseline gap-1.5">
        <span
          className={cx(
            'text-strong',
            // Figures go in the mono face; words (a sweetness class, say) in the display face.
            /^[\d\s.,×—–≈-]+$/.test(value) ? 'num' : 'font-display',
            lead ? 'text-[2.6rem] leading-none text-gold' : 'text-xl',
          )}
        >
          {value}
        </span>
        {unit && <span className={cx('text-muted', lead ? 'text-lg' : 'text-sm')}>{unit}</span>}
      </span>
      {note && <span className="text-[0.8rem] text-muted">{note}</span>}
    </div>
  );
}

/* ── Callout ────────────────────────────────────────────── */

export function Note({ tone = 'info', title, children }: { tone?: 'info' | 'warn'; title?: string; children: ReactNode }) {
  const Icon = tone === 'warn' ? TriangleAlert : Info;
  return (
    <div
      className={cx(
        'flex gap-3 rounded-lg border p-4 text-[0.92rem] leading-relaxed',
        tone === 'warn' ? 'border-danger/40 bg-danger/[0.07]' : 'border-line bg-raised/60',
      )}
    >
      <Icon size={18} className={cx('mt-0.5 shrink-0', tone === 'warn' ? 'text-danger' : 'text-gold')} aria-hidden />
      <div className="min-w-0">
        {title && <p className="mb-1 font-semibold text-strong">{title}</p>}
        <div className="text-text/90">{children}</div>
      </div>
    </div>
  );
}

/* ── Badges ─────────────────────────────────────────────── */

export function Badge({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'gold' | 'demo' }) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[0.72rem] leading-5',
        tone === 'gold' && 'border-gold/50 text-gold',
        tone === 'demo' && 'border-dashed border-muted/60 text-muted',
        tone === 'plain' && 'border-line text-muted',
      )}
    >
      {children}
    </span>
  );
}

/* ── Page furniture ─────────────────────────────────────── */

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  back?: { to: string; label: string };
  aside?: ReactNode;
}

export function PageHeader({ eyebrow, title, lede, back, aside }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-3 pb-6 pt-5 lg:pt-10">
      {back && (
        <Link to={back.to} className="-ml-1 inline-flex w-fit items-center gap-1 py-1 text-sm text-muted hover:text-strong">
          <ChevronLeft size={16} aria-hidden /> {back.label}
        </Link>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          {eyebrow && <p className="label text-gold">{eyebrow}</p>}
          <h1 className="text-[2.1rem] sm:text-[2.6rem]">{title}</h1>
        </div>
        {aside && <div className="shrink-0 pt-1">{aside}</div>}
      </div>
      {lede && <p className="max-w-prose text-muted">{lede}</p>}
    </header>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: { to: string; label: string } }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="text-2xl">{title}</h2>
      {action && (
        <Link to={action.to} className="label shrink-0 pb-1 text-gold hover:text-honey">
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function EmptyState({ icon, title, text, action }: { icon: ReactNode; title: string; text: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line px-6 py-12 text-center">
      <div className="text-gold">{icon}</div>
      <h2 className="text-2xl">{title}</h2>
      <p className="max-w-sm text-muted">{text}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
