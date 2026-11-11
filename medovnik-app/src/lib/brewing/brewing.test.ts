import { describe, expect, it } from 'vitest';
import {
  abvAlternate, abvStandard, attenuation, batchCost, brixToSg, gravityFromHoney, honeyForGravity,
  labelDose, ogForAbv, primingSugar, rehydration, residualCo2, scaleAmount, sgToBrix,
  strengthFromAbv, sugarBreak, sweetnessFromFg, tidy, tosna, waterForAbv, waterForGravity,
} from './index';

// Expected values below were worked out by hand from the formulas, not copied from the code.

describe('gravity', () => {
  it('converts gravity to Brix', () => {
    expect(sgToBrix(1.1)).toBeCloseTo(23.77, 1);
    expect(sgToBrix(1.04)).toBeCloseTo(9.99, 1);
    expect(sgToBrix(1)).toBeCloseTo(0, 1);
  });
  it('round-trips Brix and gravity', () => {
    for (const sg of [1.03, 1.065, 1.09, 1.12, 1.15]) expect(brixToSg(sgToBrix(sg))).toBeCloseTo(sg, 3);
  });
  it('classifies sweetness and strength by the BJCP ranges', () => {
    expect(sweetnessFromFg(0.998)).toBe('dry');
    expect(sweetnessFromFg(1.012)).toBe('semi');
    expect(sweetnessFromFg(1.03)).toBe('sweet');
    expect(strengthFromAbv(5)).toBe('hydromel');
    expect(strengthFromAbv(12)).toBe('standard');
    expect(strengthFromAbv(16)).toBe('sack');
  });
});

describe('alcohol', () => {
  it('standard formula', () => {
    expect(abvStandard(1.1, 1)).toBeCloseTo(13.125, 3);
    expect(abvStandard(1.09, 0.998)).toBeCloseTo(12.075, 3);
  });
  it('alternate formula reads higher for strong musts', () => {
    expect(abvAlternate(1.1, 1)).toBeCloseTo(14.2, 1);
    expect(abvAlternate(1.12, 1.01)).toBeGreaterThan(abvStandard(1.12, 1.01));
  });
  it('attenuation and sugar break', () => {
    expect(attenuation(1.1, 1.05)).toBeCloseTo(50, 5);
    expect(attenuation(1, 1)).toBe(0);
    expect(sugarBreak(1.09)).toBeCloseTo(1.06, 5);
    expect(sugarBreak(1.12, 1 / 3, 1.01)).toBeCloseTo(1.0833, 3);
  });
  it('original gravity for an alcohol target', () => {
    expect(ogForAbv(12, 1)).toBeCloseTo(1.0914, 3);
    expect(abvStandard(ogForAbv(10, 1.01), 1.01)).toBeCloseTo(10, 6);
  });
});

describe('honey', () => {
  it('honey for a target gravity', () => {
    const plan = honeyForGravity(5, 1.1);
    expect(plan.honeyKg).toBeCloseTo(1.712, 3); // 100 × 5 / 292
    expect(plan.honeyLiters).toBeCloseTo(1.206, 3); // 1.712 / 1.42
    expect(plan.waterLiters).toBeCloseTo(3.794, 3);
  });
  it('subtracts gravity that juice already provides', () => {
    expect(honeyForGravity(5, 1.1, 48).honeyKg).toBeCloseTo(0.89, 2); // 52 × 5 / 292
    expect(honeyForGravity(5, 1.04, 60).honeyKg).toBe(0);
  });
  it('gravity from a honey weight, and back', () => {
    expect(gravityFromHoney(1.5, 5)).toBeCloseTo(1.0876, 4);
    expect(gravityFromHoney(honeyForGravity(20, 1.085).honeyKg, 20)).toBeCloseTo(1.085, 6);
    expect(gravityFromHoney(1, 0)).toBe(1);
  });
});

describe('nutrients', () => {
  it('TOSNA 2.0 total for a 5 gallon batch', () => {
    const plan = tosna(18.927, 1.1, 'medium');
    expect(plan.yanTarget).toBeCloseTo(214, 0); // 23.77 × 10 × 0.9
    expect(plan.totalGrams).toBeCloseTo(21.4, 1); // 214 / 50 × 5
    expect(plan.perAddition).toBeCloseTo(plan.totalGrams / 4, 6);
    expect(plan.lastAdditionGravity).toBeCloseTo(1.0667, 3);
  });
  it('scales with the yeast nitrogen need', () => {
    const low = tosna(5, 1.09, 'low').totalGrams;
    const high = tosna(5, 1.09, 'high').totalGrams;
    expect(high / low).toBeCloseTo(1.25 / 0.75, 6);
  });
  it('rehydration and label dose', () => {
    expect(rehydration(5)).toEqual({ goFermGrams: 6.25, waterMl: 125 });
    expect(labelDose(20, 30)).toBeCloseTo(6, 6);
  });
});

describe('priming', () => {
  it('residual CO₂ falls as temperature rises', () => {
    expect(residualCo2(20)).toBeCloseTo(0.86, 2);
    expect(residualCo2(10)).toBeGreaterThan(residualCo2(20));
  });
  it('sugar for a carbonation target', () => {
    const plan = primingSugar(5, 20, 2.5, 'sucrose');
    expect(plan.grams).toBeCloseTo(31.5, 0); // (2.5 − 0.8615) × 3.84 × 5
    expect(primingSugar(5, 20, 2.5, 'honey').grams).toBeGreaterThan(plan.grams);
  });
  it('never returns a negative dose', () => {
    expect(primingSugar(5, 5, 0.5, 'sucrose').grams).toBe(0);
  });
});

describe('dilution', () => {
  it('water to lower gravity', () => {
    expect(waterForGravity(5, 1.12, 1.1)).toBeCloseTo(1, 6); // 5 × (120 / 100 − 1)
    expect(waterForGravity(5, 1.08, 1.1)).toBe(0);
  });
  it('water to lower alcohol', () => {
    expect(waterForAbv(4, 14, 12)).toBeCloseTo(0.6667, 3);
    expect(waterForAbv(4, 10, 12)).toBe(0);
  });
});

describe('cost', () => {
  it('per litre and per bottle after losses', () => {
    const r = batchCost([30, 4, 2.5], 5, 10, 750);
    expect(r.total).toBeCloseTo(36.5, 6);
    expect(r.yieldLiters).toBeCloseTo(4.5, 6);
    expect(r.perLiter).toBeCloseTo(8.111, 3);
    expect(r.bottles).toBe(6);
    expect(r.perBottle).toBeCloseTo(6.083, 3);
  });
  it('ignores empty rows and survives zero volume', () => {
    expect(batchCost([10, NaN], 0, 0, 750)).toMatchObject({ total: 10, perLiter: 0, bottles: 0, perBottle: 0 });
  });
});

describe('scaling', () => {
  it('scales linearly', () => {
    expect(scaleAmount(1.5, 5, 20)).toBeCloseTo(6, 6);
    expect(scaleAmount(2, 0, 20)).toBe(2);
  });
  it('rounds to a sensible precision', () => {
    expect(tidy(1234.4)).toBe(1235);
    expect(tidy(23.6)).toBe(24);
    expect(tidy(4.26)).toBe(4.3);
    expect(tidy(0.456)).toBe(0.46);
  });
});
