import { toPoints } from './gravity';

/** Water to add so a must at `currentSg` drops to `targetSg`. */
export function waterForGravity(liters: number, currentSg: number, targetSg: number): number {
  const target = toPoints(targetSg);
  if (target <= 0 || currentSg <= targetSg) return 0;
  return liters * (toPoints(currentSg) / target - 1);
}

/** Water to add so a finished mead at `currentAbv` drops to `targetAbv`. */
export function waterForAbv(liters: number, currentAbv: number, targetAbv: number): number {
  if (targetAbv <= 0 || currentAbv <= targetAbv) return 0;
  return liters * (currentAbv / targetAbv - 1);
}
