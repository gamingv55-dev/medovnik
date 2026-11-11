import { shortDate } from '@/lib/format';

export interface Point {
  /** YYYY-MM-DD */
  date: string;
  value: number;
}

interface LineChartProps {
  points: Point[];
  /** Formats a value for the axis and the end label. */
  format: (v: number) => string;
  label: string;
}

const W = 640;
const H = 220;
const PAD = { top: 18, right: 58, bottom: 30, left: 50 };

/** A small dependency-free line chart. Time runs left to right at true scale. */
export function LineChart({ points, format, label }: LineChartProps) {
  const sorted = [...points].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  if (!first || !last || sorted.length < 2) return null;

  const t0 = new Date(first.date).getTime();
  const t1 = Math.max(new Date(last.date).getTime(), t0 + 86_400_000);
  const values = sorted.map((p) => p.value);
  let lo = Math.min(...values);
  let hi = Math.max(...values);
  if (hi - lo < 1e-9) { hi += 1; lo -= 1; }
  const pad = (hi - lo) * 0.12;
  lo -= pad; hi += pad;

  const x = (date: string) => PAD.left + ((new Date(date).getTime() - t0) / (t1 - t0)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - (v - lo) / (hi - lo)) * (H - PAD.top - PAD.bottom);
  const line = sorted.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.date).toFixed(1)} ${y(p.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(last.date).toFixed(1)} ${H - PAD.bottom} L${x(first.date).toFixed(1)} ${H - PAD.bottom} Z`;
  const ticks = [hi - pad, (hi + lo) / 2, lo + pad];

  return (
    <figure className="flex flex-col gap-2">
      <figcaption className="label">{label}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${label}: ${format(first.value)} → ${format(last.value)}`}>
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgb(var(--gold))" stopOpacity="0.28" />
            <stop offset="1" stopColor="rgb(var(--gold))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((v) => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} stroke="rgb(var(--line))" strokeDasharray="3 5" />
            <text x={PAD.left - 8} y={y(v) + 4} textAnchor="end" fontSize="12" fill="rgb(var(--muted))" fontFamily="DM Mono, monospace">
              {format(v)}
            </text>
          </g>
        ))}
        <path d={area} fill="url(#chart-fill)" />
        <path d={line} fill="none" stroke="rgb(var(--gold))" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        {sorted.map((p) => (
          <circle key={p.date + p.value} cx={x(p.date)} cy={y(p.value)} r="3.6" fill="rgb(var(--ground))" stroke="rgb(var(--gold))" strokeWidth="2" />
        ))}
        <text x={x(last.date) + 9} y={y(last.value) + 4} fontSize="13" fill="rgb(var(--strong))" fontFamily="DM Mono, monospace">
          {format(last.value)}
        </text>
        <text x={PAD.left} y={H - 8} fontSize="12" fill="rgb(var(--muted))">{shortDate(first.date)}</text>
        <text x={W - PAD.right} y={H - 8} textAnchor="end" fontSize="12" fill="rgb(var(--muted))">{shortDate(last.date)}</text>
      </svg>
    </figure>
  );
}
