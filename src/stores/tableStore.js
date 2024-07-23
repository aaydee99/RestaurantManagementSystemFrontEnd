import create from 'zustand';
import {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
} from '../services/tableService';

const useTableStore = create((set) => ({
  tables: [],
  fetchTables: async () => {
    const tables = await getTables();
    set({ tables });
  },
  fetchTable: async (id) => {
    const table = await getTable(id);
    set((state) => ({
      tables: state.tables.map((t) =>
        t._id === id ? table : t
      ),
    }));
  },
  addTable: async (table) => {
    const newTable = await createTable(table);
    set((state) => ({
      tables: [...state.tables, newTable],
    }));
  },
  updateTable: async (id, table) => {
    const updatedTable = await updateTable(id, table);
    set((state) => ({
      tables: state.tables.map((t) =>
        t._id === id ? updatedTable : t
      ),
    }));
  },
  removeTable: async (id) => {
    await deleteTable(id);
    set((state) => ({
      tables: state.tables.filter((t) => t._id !== id),
    }));
  },
}));

export default useTableStore;
