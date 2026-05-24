/**
 * Format a Bulgarian-lev price. `null` → "Скоро" (the addon placeholder state).
 * @param  {number|null} value
 * @param  {string} [currency='лв.']
 */
export function formatPrice(value, currency = 'лв.') {
  if (value == null) return 'Скоро';
  return `${value} ${currency}`;
}
