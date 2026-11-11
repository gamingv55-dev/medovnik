export type PrimingSugar = 'sucrose' | 'dextrose' | 'honey';

/**
 * Grams per litre that add one volume of CO₂, from fermentation stoichiometry.
 * Honey is taken as 80 % fermentable sugar.
 */
const GRAMS_PER_LITER_PER_VOLUME: Record<PrimingSugar, number> = {
  sucrose: 3.84,
  dextrose: 4.04,
  honey: 5.05,
};

/** CO₂ already dissolved after fermentation at the given temperature, in volumes. */
export function residualCo2(tempC: number): number {
  const f = (tempC * 9) / 5 + 32;
  return 3.0378 - 0.050062 * f + 0.00026555 * f * f;
}

export interface PrimingPlan {
  residual: number;
  grams: number;
  gramsPerLiter: number;
}

export function primingSugar(liters: number, tempC: number, targetVolumes: number, sugar: PrimingSugar): PrimingPlan {
  const residual = residualCo2(tempC);
  const gramsPerLiter = Math.max(0, targetVolumes - residual) * GRAMS_PER_LITER_PER_VOLUME[sugar];
  return { residual, grams: gramsPerLiter * liters, gramsPerLiter };
}
