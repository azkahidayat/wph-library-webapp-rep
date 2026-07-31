import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  itemIds: number[];
  addItemId: (itemId: number) => void;
  deleteItemId: (itemId: number) => void;
  addAllItemIds: (itemIds: number[]) => void;
  deleteAllItemIds: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      itemIds: [],
      addItemId: (itemId) =>
        set((state) => ({
          itemIds: [...new Set([...state.itemIds, itemId])],
        })),
      deleteItemId: (itemId) =>
        set((state) => ({
          itemIds: state.itemIds.filter((id) => id !== itemId),
        })),
      addAllItemIds: (itemIds) =>
        set((state) => ({
          itemIds: [...new Set([...state.itemIds, ...itemIds])],
        })),
      deleteAllItemIds: () => set({ itemIds: [] }),
    }),
    { name: 'cartItemIds' }
  )
);
