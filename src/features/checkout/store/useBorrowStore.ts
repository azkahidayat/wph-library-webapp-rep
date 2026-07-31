import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BorrowStore {
  dueDate: string;
  addDueDate: (dueDate: string) => void;
  removeDueDate: () => void;
}

export const useBorrowStore = create<BorrowStore>()(
  persist(
    (set) => ({
      dueDate: '',
      addDueDate: (dueDate) =>
        set({
          dueDate,
        }),
      removeDueDate: () => set({ dueDate: '' }),
    }),
    { name: 'dueDate' }
  )
);
