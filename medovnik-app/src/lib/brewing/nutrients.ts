import { LITERS_PER_US_GALLON, sgToBrix } from './gravity';

export type NitrogenNeed = 'low' | 'medium' | 'high';

const NEED_FACTOR: Record<NitrogenNeed, number> = { low: 0.75, medium: 0.9, high: 1.25 };

export interface TosnaPlan {
  /** Target yeast-assimilable nitrogen, mg/L. */
  yanTarget: number;
  /** Total Fermaid-O for the batch, grams. */
  totalGrams: number;
  /** One of the four equal additions, grams. */
  perAddition: number;
  /** Gravity at which the last addition is due (the 1/3 sugar break). */
  lastAdditionGravity: number;
}

/**
 * TOSNA 2.0 schedule for Fermaid-O: four equal additions at 24 h, 48 h and 72 h
 * after pitching, and the last at the 1/3 sugar break or day 7, whichever is first.
 */
export function tosna(liters: number, og: number, need: NitrogenNeed): TosnaPlan {
  const yanTarget = sgToBrix(og) * 10 * NEED_FACTOR[need];
  const totalGrams = (yanTarget / 50) * (liters / LITERS_PER_US_GALLON);
  return {
    yanTarget,
    totalGrams,
    perAddition: totalGrams / 4,
    lastAdditionGravity: og - (og - 1) / 3,
  };
}

export interface RehydrationPlan {
  goFermGrams: number;
  waterMl: number;
}

/** Go-Ferm rehydration: 1.25 g per gram of yeast, in 20 mL of water per gram of Go-Ferm. */
export function rehydration(yeastGrams: number): RehydrationPlan {
  const goFermGrams = yeastGrams * 1.25;
  return { goFermGrams, waterMl: goFermGrams * 20 };
}

/** Dose from a product label given in grams per hectolitre. */
export function labelDose(liters: number, gramsPerHectoliter: number): number {
  return (liters * gramsPerHectoliter) / 100;
}
