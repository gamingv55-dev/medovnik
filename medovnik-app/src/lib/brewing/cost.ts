export interface CostResult {
  total: number;
  yieldLiters: number;
  perLiter: number;
  bottles: number;
  perBottle: number;
}

/**
 * Batch cost. `lossPercent` covers what stays behind with the sediment at
 * racking and bottling.
 */
export function batchCost(costs: number[], liters: number, lossPercent: number, bottleMl: number): CostResult {
  const total = costs.reduce((sum, c) => sum + (Number.isFinite(c) ? c : 0), 0);
  const yieldLiters = Math.max(0, liters * (1 - lossPercent / 100));
  const bottles = bottleMl > 0 ? Math.floor((yieldLiters * 1000) / bottleMl) : 0;
  return {
    total,
    yieldLiters,
    perLiter: yieldLiters > 0 ? total / yieldLiters : 0,
    bottles,
    perBottle: bottles > 0 ? total / bottles : 0,
  };
}
