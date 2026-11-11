/** Scale an amount written for `baseLiters` to `targetLiters`. */
export function scaleAmount(amount: number, baseLiters: number, targetLiters: number): number {
  if (baseLiters <= 0) return amount;
  return (amount * targetLiters) / baseLiters;
}

/** Round to a precision that makes sense on a kitchen scale for the size of the number. */
export function tidy(value: number): number {
  const abs = Math.abs(value);
  if (abs >= 100) return Math.round(value / 5) * 5;
  if (abs >= 10) return Math.round(value);
  if (abs >= 1) return Math.round(value * 10) / 10;
  return Math.round(value * 100) / 100;
}
