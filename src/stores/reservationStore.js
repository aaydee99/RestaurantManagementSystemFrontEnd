import create from 'zustand';
import {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} from '../services/reservationService';

const useReservationStore = create((set) => ({
  reservations: [],
  fetchReservations: async () => {
    const reservations = await getReservations();
    set({ reservations });
  },
  fetchReservation: async (id) => {
    const reservation = await getReservation(id);
    set((state) => ({
      reservations: state.reservations.map((r) =>
        r._id === id ? reservation : r
      ),
    }));
  },
  addReservation: async (reservation) => {
    const newReservation = await createReservation(reservation);
    set((state) => ({
      reservations: [...state.reservations, newReservation],
    }));
  },
  updateReservation: async (id, reservation) => {
    const updatedReservation = await updateReservation(id, reservation);
    set((state) => ({
      reservations: state.reservations.map((r) =>
        r._id === id ? updatedReservation : r
      ),
    }));
  },
  removeReservation: async (id) => {
    await deleteReservation(id);
    set((state) => ({
      reservations: state.reservations.filter((r) => r._id !== id),
    }));
  },
}));

export default useReservationStore;
