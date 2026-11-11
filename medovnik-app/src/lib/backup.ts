import { batchesStore, type Batch } from '@/store/batches';
import { applyTheme, prefsStore, type Prefs } from '@/store/prefs';

/** Everything the app keeps on the device, as one file. */
interface Backup {
  app: 'medovnik';
  version: 1;
  exportedAt: string;
  prefs: Prefs;
  batches: Batch[];
}

export function exportBackup(): void {
  const data: Backup = {
    app: 'medovnik',
    version: 1,
    exportedAt: new Date().toISOString(),
    prefs: prefsStore.get(),
    batches: batchesStore.get(),
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `medovnik-${data.exportedAt.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Parse a backup file's text. Returns null when it is not one of ours. */
export function parseBackup(text: string): Backup | null {
  try {
    const raw = JSON.parse(text) as Partial<Backup>;
    if (raw.app !== 'medovnik' || !Array.isArray(raw.batches) || typeof raw.prefs !== 'object' || raw.prefs === null) return null;
    if (!raw.batches.every((b) => typeof b?.id === 'string' && typeof b?.name === 'string' && Array.isArray(b?.measurements))) return null;
    return raw as Backup;
  } catch {
    return null;
  }
}

export function restoreBackup(backup: Backup): void {
  batchesStore.set(backup.batches);
  prefsStore.set((current) => ({ ...current, ...backup.prefs }));
  applyTheme(prefsStore.get().theme);
}

export function wipeEverything(): void {
  batchesStore.set([]);
  prefsStore.set({ theme: prefsStore.get().theme, readLessons: [], favorites: [] });
}
