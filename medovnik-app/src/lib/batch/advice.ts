import type { Batch, Measurement } from '@/store/batches';
import { daysBetween } from '@/lib/format';

/**
 * What to do next with a batch, worked out from its measurements and stages.
 * Nothing here is tied to a fixed number of days since the start: the
 * hydrometer decides, the calendar only prompts a new reading.
 */
export type AdviceId =
  | 'measure-og' | 'first-reading' | 'reading-due' | 'feed' | 'last-feed' | 'stable' | 'maybe-stuck'
  | 'temp-high' | 'temp-low' | 'record-bottles' | 'tasting';

export interface Advice {
  id: AdviceId;
  tone: 'do' | 'warn';
  /** Values for the placeholders in the dictionary text. */
  values: Record<string, string | number>;
}

/** Days without a reading after which a new one is suggested. */
const READING_INTERVAL_DAYS = 3;
/** Two readings this far apart and this close together count as stable. */
const STABLE_GAP_DAYS = 3;
const STABLE_TOLERANCE = 0.001;
/** A stable gravity above this, for a must that started well higher, may be a stall rather than the end. */
const STALL_GRAVITY = 1.02;

export const gravityReadings = (batch: Batch): Measurement[] =>
  batch.measurements
    .filter((m) => m.sg !== undefined)
    .sort((a, b) => a.date.localeCompare(b.date));

export const latestGravity = (batch: Batch): number | undefined => gravityReadings(batch).at(-1)?.sg ?? batch.og;

export interface TempRange {
  min: number;
  max: number;
}

export function nextActions(batch: Batch, today: string, tempRange?: TempRange): Advice[] {
  const out: Advice[] = [];
  const bottled = batch.stages.bottling !== undefined;
  const readings = gravityReadings(batch);
  const last = readings.at(-1);

  if (batch.og === undefined && readings.length === 0) {
    out.push({ id: 'measure-og', tone: 'do', values: {} });
    return out;
  }

  if (!bottled) {
    const lastDate = last?.date ?? batch.startedOn;
    const since = daysBetween(lastDate, today);
    if (readings.length === 0 && since >= 2) out.push({ id: 'first-reading', tone: 'do', values: { days: since } });
    else if (readings.length > 0 && since >= READING_INTERVAL_DAYS) out.push({ id: 'reading-due', tone: 'do', values: { days: since } });
  }

  const og = batch.og ?? readings[0]?.sg;
  if (og !== undefined && batch.stages.feeding === undefined && !bottled) {
    const breakSg = og - (og - 1) / 3;
    const current = last?.sg ?? og;
    out.push({ id: current <= breakSg ? 'last-feed' : 'feed', tone: 'do', values: { sg: breakSg.toFixed(3) } });
  }

  const previous = readings.at(-2);
  if (last && previous && last.sg !== undefined && previous.sg !== undefined && batch.stages.racking === undefined && !bottled) {
    const apart = daysBetween(previous.date, last.date);
    if (apart >= STABLE_GAP_DAYS && Math.abs(last.sg - previous.sg) <= STABLE_TOLERANCE) {
      const stalled = last.sg > STALL_GRAVITY && og !== undefined && og - last.sg > 0.01;
      out.push({ id: stalled ? 'maybe-stuck' : 'stable', tone: stalled ? 'warn' : 'do', values: { sg: last.sg.toFixed(3) } });
    }
  }

  const lastTemp = [...batch.measurements].sort((a, b) => a.date.localeCompare(b.date)).filter((m) => m.tempC !== undefined).at(-1);
  if (tempRange && lastTemp?.tempC !== undefined && batch.stages['active-end'] === undefined && !bottled) {
    if (lastTemp.tempC > tempRange.max) out.push({ id: 'temp-high', tone: 'warn', values: { temp: lastTemp.tempC, max: tempRange.max } });
    else if (lastTemp.tempC < tempRange.min) out.push({ id: 'temp-low', tone: 'warn', values: { temp: lastTemp.tempC, min: tempRange.min } });
  }

  if (bottled && batch.bottles.length === 0) out.push({ id: 'record-bottles', tone: 'do', values: {} });
  if (batch.bottles.some((lot) => lot.readyOn !== undefined && lot.readyOn <= today)) out.push({ id: 'tasting', tone: 'do', values: {} });

  return out;
}
