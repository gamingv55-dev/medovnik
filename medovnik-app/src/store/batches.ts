import { createStore, uid, useStore } from '@/lib/storage';

/** The ten stages of the production timeline, in order. */
export const STAGE_IDS = [
  'prep', 'primary', 'feeding', 'active-end', 'racking', 'secondary', 'clearing', 'stabilizing', 'bottling', 'aging',
] as const;
export type StageId = (typeof STAGE_IDS)[number];

export interface Measurement {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  sg?: number;
  tempC?: number;
  ph?: number;
  note?: string;
}

export interface LogEntry {
  id: string;
  date: string;
  text: string;
}

export interface BottleLot {
  id: string;
  count: number;
  volumeMl: number;
  bottledOn: string;
  /** When to open the first one. */
  readyOn?: string;
  note?: string;
}

export interface Batch {
  id: string;
  name: string;
  recipeId?: string;
  startedOn: string;
  liters: number;
  honey: string;
  yeast: string;
  og?: number;
  targetFg?: number;
  notes: string;
  /** Stage id → date it was completed. */
  stages: Partial<Record<StageId, string>>;
  measurements: Measurement[];
  log: LogEntry[];
  bottles: BottleLot[];
}

const isBatchList = (raw: unknown): raw is Batch[] =>
  Array.isArray(raw) && raw.every((b) => typeof b === 'object' && b !== null && typeof (b as Batch).id === 'string');

export const batchesStore = createStore<Batch[]>('medovnik.batches', [], (raw) => (isBatchList(raw) ? raw : []));

export const useBatches = (): Batch[] => useStore(batchesStore);
export const useBatch = (id: string | undefined): Batch | undefined => useBatches().find((b) => b.id === id);

export type NewBatch = Pick<Batch, 'name' | 'recipeId' | 'startedOn' | 'liters' | 'honey' | 'yeast' | 'og' | 'targetFg' | 'notes'>;

export function createBatch(input: NewBatch): string {
  const id = uid();
  batchesStore.set((list) => [{ ...input, id, stages: {}, measurements: [], log: [], bottles: [] }, ...list]);
  return id;
}

const patch = (id: string, change: (b: Batch) => Batch): void =>
  batchesStore.set((list) => list.map((b) => (b.id === id ? change(b) : b)));

export const deleteBatch = (id: string): void => batchesStore.set((list) => list.filter((b) => b.id !== id));

export const toggleStage = (id: string, stage: StageId, date: string): void =>
  patch(id, (b) => {
    const stages = { ...b.stages };
    if (stages[stage]) delete stages[stage];
    else stages[stage] = date;
    return { ...b, stages };
  });

export const addMeasurement = (id: string, m: Omit<Measurement, 'id'>): void =>
  patch(id, (b) => ({ ...b, measurements: [...b.measurements, { ...m, id: uid() }] }));

export const removeMeasurement = (id: string, measurementId: string): void =>
  patch(id, (b) => ({ ...b, measurements: b.measurements.filter((m) => m.id !== measurementId) }));

export const addLog = (id: string, date: string, text: string): void =>
  patch(id, (b) => ({ ...b, log: [{ id: uid(), date, text }, ...b.log] }));

export const removeLog = (id: string, logId: string): void =>
  patch(id, (b) => ({ ...b, log: b.log.filter((l) => l.id !== logId) }));

export const addBottles = (id: string, lot: Omit<BottleLot, 'id'>): void =>
  patch(id, (b) => ({ ...b, bottles: [...b.bottles, { ...lot, id: uid() }] }));

export const removeBottles = (id: string, lotId: string): void =>
  patch(id, (b) => ({ ...b, bottles: b.bottles.filter((l) => l.id !== lotId) }));
