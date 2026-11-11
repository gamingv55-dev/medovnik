/**
 * Specific gravity helpers. Gravity is written the way a hydrometer shows it
 * (1.090); "points" are the last three digits (90).
 */

/** Gravity points one kilogram of honey adds to one litre of must (≈35 points per lb per US gallon). */
export const HONEY_POINTS_PER_KG_PER_L = 292;
/** Typical density of liquid honey in kg per litre. */
export const HONEY_DENSITY_KG_PER_L = 1.42;
export const LITERS_PER_US_GALLON = 3.78541;

export const toPoints = (sg: number): number => (sg - 1) * 1000;
export const fromPoints = (points: number): number => 1 + points / 1000;

/** Specific gravity → °Brix (cubic fit, valid for roughly 1.000–1.180). */
export function sgToBrix(sg: number): number {
  return ((182.4601 * sg - 775.6821) * sg + 1262.7794) * sg - 669.5622;
}

/** °Brix → specific gravity. */
export function brixToSg(brix: number): number {
  return 1 + brix / (258.6 - (brix / 258.2) * 227.1);
}

export type Sweetness = 'dry' | 'semi' | 'sweet';

/** Sweetness class from final gravity, following the BJCP mead ranges. */
export function sweetnessFromFg(fg: number): Sweetness {
  if (fg < 1.01) return 'dry';
  if (fg < 1.025) return 'semi';
  return 'sweet';
}

export type Strength = 'hydromel' | 'standard' | 'sack';

/** Strength class from alcohol by volume, following the BJCP mead ranges. */
export function strengthFromAbv(abv: number): Strength {
  if (abv < 7.5) return 'hydromel';
  if (abv <= 14) return 'standard';
  return 'sack';
}
