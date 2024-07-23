import create from 'zustand';
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../services/menuService';

const useMenuStore = create((set) => ({
  menuItems: [],
  fetchMenuItems: async () => {
    const menuItems = await getMenuItems();
    set({ menuItems });
  },
  fetchMenuItem: async (id) => {
    const menuItem = await getMenuItem(id);
    set((state) => ({
      menuItems: state.menuItems.map((m) =>
        m._id === id ? menuItem : m
      ),
    }));
  },
  addMenuItem: async (menuItem) => {
    const newMenuItem = await createMenuItem(menuItem);
    set((state) => ({
      menuItems: [...state.menuItems, newMenuItem],
    }));
  },
  updateMenuItem: async (id, menuItem) => {
    const updatedMenuItem = await updateMenuItem(id, menuItem);
    set((state) => ({
      menuItems: state.menuItems.map((m) =>
        m._id === id ? updatedMenuItem : m
      ),
    }));
  },
  removeMenuItem: async (id) => {
    await deleteMenuItem(id);
    set((state) => ({
      menuItems: state.menuItems.filter((m) => m._id !== id),
    }));
  },
}));

export default useMenuStore;
