const nf = (digits: number) =>
  new Intl.NumberFormat('bg-BG', { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** Number with a decimal comma, the Bulgarian way. */
export const num = (value: number, digits = 1): string =>
  Number.isFinite(value) ? nf(digits).format(value) : '—';

/** Gravity the way a hydrometer prints it: 1.090. */
export const sg = (value: number): string => (Number.isFinite(value) ? value.toFixed(3) : '—');

/** Weight that switches from grams to kilograms where it reads better. */
export function weight(kg: number): string {
  if (!Number.isFinite(kg)) return '—';
  return kg < 1 ? `${num(kg * 1000, 0)} г` : `${num(kg, 2)} кг`;
}

/** Volume that switches from millilitres to litres where it reads better. */
export function volume(liters: number): string {
  if (!Number.isFinite(liters)) return '—';
  return liters < 1 ? `${num(liters * 1000, 0)} мл` : `${num(liters, 2)} л`;
}

const dateFmt = new Intl.DateTimeFormat('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' });
const shortFmt = new Intl.DateTimeFormat('bg-BG', { day: 'numeric', month: 'short' });

export const date = (iso: string): string => dateFmt.format(new Date(iso));
export const shortDate = (iso: string): string => shortFmt.format(new Date(iso));

/** Whole days between two ISO dates (b − a). */
export function daysBetween(a: string, b: string): number {
  return Math.floor((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

/** Today as YYYY-MM-DD in local time, for date inputs. */
export function todayInput(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Parse what a person types into a number field: accepts a comma or a dot. */
export function parseNumber(raw: string): number {
  const cleaned = raw.trim().replace(/\s/g, '').replace(',', '.');
  if (cleaned === '') return NaN;
  return Number(cleaned);
}
