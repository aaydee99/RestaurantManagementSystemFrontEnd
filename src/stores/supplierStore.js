import create from 'zustand';
import {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../services/supplierService';

const useSupplierStore = create((set) => ({
  suppliers: [],
  fetchSuppliers: async () => {
    const suppliers = await getSuppliers();
    set({ suppliers });
  },
  fetchSupplier: async (id) => {
    const supplier = await getSupplier(id);
    set((state) => ({
      suppliers: state.suppliers.map((s) =>
        s._id === id ? supplier : s
      ),
    }));
  },
  addSupplier: async (supplier) => {
    const newSupplier = await createSupplier(supplier);
    set((state) => ({
      suppliers: [...state.suppliers, newSupplier],
    }));
  },
  updateSupplier: async (id, supplier) => {
    const updatedSupplier = await updateSupplier(id, supplier);
    set((state) => ({
      suppliers: state.suppliers.map((s) =>
        s._id === id ? updatedSupplier : s
      ),
    }));
  },
  removeSupplier: async (id) => {
    await deleteSupplier(id);
    set((state) => ({
      suppliers: state.suppliers.filter((s) => s._id !== id),
    }));
  },
}));

export default useSupplierStore;
