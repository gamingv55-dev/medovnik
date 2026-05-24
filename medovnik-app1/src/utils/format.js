const EUR_RATE = 1.95583; // fixed BGN/EUR rate

export function formatPrice(value, currency = 'лв.') {
  if (value == null) return 'Скоро';
  return `${value} ${currency}`;
}

export function toEUR(bgn) {
  if (bgn == null) return null;
  return (bgn / EUR_RATE).toFixed(2);
}
