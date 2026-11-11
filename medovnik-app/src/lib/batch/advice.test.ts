import { describe, expect, it } from 'vitest';
import type { Batch } from '@/store/batches';
import { latestGravity, nextActions } from './advice';

const base: Batch = {
  id: 'b', name: 'Тест', startedOn: '2026-03-01', liters: 5, honey: '', yeast: '', og: 1.09, notes: '',
  stages: {}, measurements: [], log: [], bottles: [],
};
const ids = (b: Batch, today: string, range?: { min: number; max: number }) => nextActions(b, today, range).map((a) => a.id);
const m = (date: string, sg?: number, tempC?: number) => ({ id: date + (sg ?? '') + (tempC ?? ''), date, sg, tempC });

describe('next actions', () => {
  it('asks for the original gravity first', () => {
    expect(ids({ ...base, og: undefined }, '2026-03-01')).toEqual(['measure-og']);
  });

  it('prompts feeding before the sugar break and the last feed after it', () => {
    expect(ids(base, '2026-03-01')).toEqual(['feed']);
    // Break for 1.090 is 1.060.
    expect(ids({ ...base, measurements: [m('2026-03-04', 1.058)] }, '2026-03-04')).toEqual(['last-feed']);
    expect(ids({ ...base, measurements: [m('2026-03-04', 1.058)], stages: { feeding: '2026-03-04' } }, '2026-03-04')).toEqual([]);
  });

  it('suggests a reading only after days without one', () => {
    const fed = { ...base, stages: { feeding: '2026-03-02' } };
    expect(ids(fed, '2026-03-02')).toEqual([]);
    expect(ids(fed, '2026-03-03')).toEqual(['first-reading']);
    expect(ids({ ...fed, measurements: [m('2026-03-05', 1.04)] }, '2026-03-07')).toEqual([]);
    expect(ids({ ...fed, measurements: [m('2026-03-05', 1.04)] }, '2026-03-08')).toEqual(['reading-due']);
  });

  it('calls a fermentation finished from two matching readings, not from elapsed time', () => {
    const fed = { ...base, stages: { feeding: '2026-03-02' } };
    const falling = { ...fed, measurements: [m('2026-03-10', 1.02), m('2026-03-14', 1.008)] };
    expect(ids(falling, '2026-03-14')).toEqual([]);
    const stable = { ...fed, measurements: [m('2026-03-20', 1.0), m('2026-03-24', 1.0)] };
    expect(ids(stable, '2026-03-24')).toEqual(['stable']);
    // Matching readings one day apart are not enough.
    const tooClose = { ...fed, measurements: [m('2026-03-23', 1.0), m('2026-03-24', 1.0)] };
    expect(ids(tooClose, '2026-03-24')).toEqual([]);
    // A batch left untouched for a month is still not "finished" without readings.
    expect(ids(fed, '2026-04-01')).toEqual(['first-reading']);
  });

  it('flags a stable but high gravity as a possible stall', () => {
    const fed = { ...base, stages: { feeding: '2026-03-02' } };
    const stalled = { ...fed, measurements: [m('2026-03-10', 1.045), m('2026-03-14', 1.045)] };
    expect(nextActions(stalled, '2026-03-14')).toEqual([{ id: 'maybe-stuck', tone: 'warn', values: { sg: '1.045' } }]);
  });

  it('checks temperature only against a known range', () => {
    const fed = { ...base, stages: { feeding: '2026-03-02' }, measurements: [m('2026-03-03', 1.07, 26)] };
    expect(ids(fed, '2026-03-03')).toEqual([]);
    expect(ids(fed, '2026-03-03', { min: 16, max: 20 })).toEqual(['temp-high']);
    expect(ids({ ...fed, measurements: [m('2026-03-03', 1.07, 12)] }, '2026-03-03', { min: 16, max: 20 })).toEqual(['temp-low']);
  });

  it('after bottling asks for the bottles, then announces the tasting date', () => {
    const bottled = { ...base, stages: { feeding: 'x', racking: 'x', bottling: '2026-05-01' } };
    expect(ids(bottled, '2026-06-01')).toEqual(['record-bottles']);
    const lot = { id: 'l', count: 6, volumeMl: 750, bottledOn: '2026-05-01', readyOn: '2026-08-01' };
    expect(ids({ ...bottled, bottles: [lot] }, '2026-07-31')).toEqual([]);
    expect(ids({ ...bottled, bottles: [lot] }, '2026-08-01')).toEqual(['tasting']);
  });

  it('reads the latest gravity by date, falling back to the original', () => {
    expect(latestGravity(base)).toBe(1.09);
    expect(latestGravity({ ...base, measurements: [m('2026-03-09', 1.01), m('2026-03-05', 1.04)] })).toBe(1.01);
  });
});
