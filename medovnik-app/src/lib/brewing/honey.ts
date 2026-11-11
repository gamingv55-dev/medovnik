import { HONEY_DENSITY_KG_PER_L, HONEY_POINTS_PER_KG_PER_L, fromPoints, toPoints } from './gravity';

export interface HoneyPlan {
  honeyKg: number;
  honeyLiters: number;
  waterLiters: number;
}

/**
 * Honey needed for a target original gravity in a given total volume.
 * `otherPoints` is gravity already supplied by something else (juice, for example).
 */
export function honeyForGravity(liters: number, targetOg: number, otherPoints = 0): HoneyPlan {
  const points = Math.max(0, toPoints(targetOg) - otherPoints);
  const honeyKg = (points * liters) / HONEY_POINTS_PER_KG_PER_L;
  const honeyLiters = honeyKg / HONEY_DENSITY_KG_PER_L;
  return { honeyKg, honeyLiters, waterLiters: Math.max(0, liters - honeyLiters) };
}

/** Original gravity produced by a honey weight dissolved to a total volume. */
export function gravityFromHoney(honeyKg: number, liters: number): number {
  if (liters <= 0) return 1;
  return fromPoints((HONEY_POINTS_PER_KG_PER_L * honeyKg) / liters);
}
