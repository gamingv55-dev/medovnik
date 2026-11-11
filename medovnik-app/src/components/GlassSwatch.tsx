/** A small glass filled with the recipe's colour — stands in for a photo we do not have. */
export function GlassSwatch({ color, size = 56 }: { color: string; size?: number }) {
  const id = `g${color.replace('#', '')}`;
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.95" />
          <stop offset="1" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path d="M17 20h22l-1.6 13.5a9.5 9.5 0 0 1-18.8 0z" fill={`url(#${id})`} />
      <path d="M15 9h26l-2.6 24.6a10.5 10.5 0 0 1-20.8 0z" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-muted" />
      <path d="M28 44v6M21 50.5h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="text-muted" />
      <path d="M21 13l1.4 14" stroke="#fff" strokeOpacity="0.28" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
