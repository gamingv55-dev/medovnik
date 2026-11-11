import { Plus, X } from 'lucide-react';
import type { ReactNode } from 'react';

/** Shared chrome for the editable row lists in the scaler and the cost calculator. */
export function RowList({ children, onAdd, addLabel }: { children: ReactNode; onAdd: () => void; addLabel: string }) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      <button
        type="button"
        onClick={onAdd}
        className="mt-1 inline-flex min-h-[42px] w-fit items-center gap-2 rounded-md border border-dashed border-line px-3 text-sm text-muted hover:border-gold/60 hover:text-strong"
      >
        <Plus size={16} aria-hidden /> {addLabel}
      </button>
    </div>
  );
}

export function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="grid h-[42px] w-9 shrink-0 place-items-center text-dim hover:text-danger">
      <X size={16} aria-hidden />
    </button>
  );
}

export const CELL =
  'min-h-[42px] w-full min-w-0 rounded-md border border-line bg-ground/60 px-2.5 text-strong outline-none placeholder:text-dim focus:border-gold/70';
