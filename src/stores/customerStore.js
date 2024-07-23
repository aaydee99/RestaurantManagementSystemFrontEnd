import create from 'zustand';
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../services/customerService';

const useCustomerStore = create((set) => ({
  customers: [],
  fetchCustomers: async () => {
    const customers = await getCustomers();
    set({ customers });
  },
  fetchCustomer: async (id) => {
    const customer = await getCustomer(id);
    set((state) => ({
      customers: state.customers.map((c) =>
        c._id === id ? customer : c
      ),
    }));
  },
  addCustomer: async (customer) => {
    const newCustomer = await createCustomer(customer);
    set((state) => ({
      customers: [...state.customers, newCustomer],
    }));
  },
  updateCustomer: async (id, customer) => {
    const updatedCustomer = await updateCustomer(id, customer);
    set((state) => ({
      customers: state.customers.map((c) =>
        c._id === id ? updatedCustomer : c
      ),
    }));
  },
  removeCustomer: async (id) => {
    await deleteCustomer(id);
    set((state) => ({
      customers: state.customers.filter((c) => c._id !== id),
    }));
  },
}));

export default useCustomerStore;
