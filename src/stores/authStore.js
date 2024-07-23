import create from 'zustand';
import authService from '../services/authService';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
  loading: false,
  register: async (userData) => {
    set({ loading: true });
    try {
      const user = await authService.register(userData);
      set({ user, loading: false, error: null });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
  login: async (userData) => {
    set({ loading: true });
    try {
      const user = await authService.login(userData);
      set({ user, loading: false, error: null });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
  logout: () => {
    authService.logout();
    set({ user: null });
  },
}));

export default useAuthStore;
