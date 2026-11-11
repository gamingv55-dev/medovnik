/** Colours resolve to CSS variables (see src/index.css) so dark/light share one class set. */
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: c('ground'),
        surface: c('surface'),
        raised: c('raised'),
        line: c('line'),
        text: c('text'),
        muted: c('muted'),
        dim: c('dim'),
        gold: c('gold'),
        honey: c('honey'),
        amber: c('amber'),
        ember: c('ember'),
        strong: c('strong'),
        ongold: c('ongold'),
        danger: c('danger'),
        ok: c('ok'),
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        label: ['UniSans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { page: '68rem', prose: '42rem' },
      boxShadow: {
        card: '0 1px 0 rgb(var(--sheen) / 0.05) inset, 0 12px 32px -18px rgb(0 0 0 / 0.55)',
        glow: '0 0 0 1px rgb(var(--gold) / 0.35), 0 10px 30px -12px rgb(var(--gold) / 0.35)',
      },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'none' } },
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        rise: 'rise 0.42s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
};
