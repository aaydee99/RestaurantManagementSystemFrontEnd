import create from 'zustand';
import {
  getInventoryItems,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from '../services/inventoryService';

const useInventoryStore = create((set) => ({
  inventoryItems: [],
  fetchInventoryItems: async () => {
    const inventoryItems = await getInventoryItems();
    set({ inventoryItems });
  },
  fetchInventoryItem: async (id) => {
    const inventoryItem = await getInventoryItem(id);
    set((state) => ({
      inventoryItems: state.inventoryItems.map((i) =>
        i._id === id ? inventoryItem : i
      ),
    }));
  },
  addInventoryItem: async (inventoryItem) => {
    const newInventoryItem = await createInventoryItem(inventoryItem);
    set((state) => ({
      inventoryItems: [...state.inventoryItems, newInventoryItem],
    }));
  },
  updateInventoryItem: async (id, inventoryItem) => {
    const updatedInventoryItem = await updateInventoryItem(id, inventoryItem);
    set((state) => ({
      inventoryItems: state.inventoryItems.map((i) =>
        i._id === id ? updatedInventoryItem : i
      ),
    }));
  },
  removeInventoryItem: async (id) => {
    await deleteInventoryItem(id);
    set((state) => ({
      inventoryItems: state.inventoryItems.filter((i) => i._id !== id),
    }));
  },
}));

export default useInventoryStore;
