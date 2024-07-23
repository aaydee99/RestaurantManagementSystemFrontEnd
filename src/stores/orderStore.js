import create from 'zustand';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../services/orderService';

const useOrderStore = create((set) => ({
  orders: [],
  fetchOrders: async () => {
    const orders = await getOrders();
    set({ orders });
  },
  fetchOrder: async (id) => {
    const order = await getOrder(id);
    set((state) => ({
      orders: state.orders.map((o) =>
        o._id === id ? order : o
      ),
    }));
  },
  addOrder: async (order) => {
    const newOrder = await createOrder(order);
    set((state) => ({
      orders: [...state.orders, newOrder],
    }));
  },
  updateOrder: async (id, order) => {
    const updatedOrder = await updateOrder(id, order);
    set((state) => ({
      orders: state.orders.map((o) =>
        o._id === id ? updatedOrder : o
      ),
    }));
  },
  removeOrder: async (id) => {
    await deleteOrder(id);
    set((state) => ({
      orders: state.orders.filter((o) => o._id !== id),
    }));
  },
}));

export default useOrderStore;
