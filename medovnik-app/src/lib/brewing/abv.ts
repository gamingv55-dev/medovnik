/** Standard homebrew formula. Reads slightly low for strong meads. */
export function abvStandard(og: number, fg: number): number {
  return (og - fg) * 131.25;
}

/** Alternate formula that tracks high-gravity fermentations more closely. */
export function abvAlternate(og: number, fg: number): number {
  return ((76.08 * (og - fg)) / (1.775 - og)) * (fg / 0.794);
}

/** Share of the starting sugar that has fermented, in percent. */
export function attenuation(og: number, sg: number): number {
  if (og <= 1) return 0;
  return ((og - sg) / (og - 1)) * 100;
}

/** Gravity at which the given fraction of the fermentable sugar is gone (1/3 = the "sugar break"). */
export function sugarBreak(og: number, fraction = 1 / 3, expectedFg = 1): number {
  return og - (og - expectedFg) * fraction;
}

/** Original gravity needed to reach an alcohol target at a given final gravity. */
export function ogForAbv(abv: number, fg: number): number {
  return fg + abv / 131.25;
}
