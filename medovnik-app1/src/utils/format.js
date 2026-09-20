export function formatPrice(value) {
  if (value == null) return 'Скоро';
  return `${value} €`;
}
