import api from '../api';

export const getReservations = async () => {
  const response = await api.get('/reservations');
  return response.data;
};

export const getReservation = async (id) => {
  const response = await api.get(`/reservations/${id}`);
  return response.data;
};

export const createReservation = async (reservation) => {
  const response = await api.post('/reservations', reservation);
  return response.data;
};

export const updateReservation = async (id, reservation) => {
  const response = await api.put(`/reservations/${id}`, reservation);
  return response.data;
};

export const deleteReservation = async (id) => {
  const response = await api.delete(`/reservations/${id}`);
  return response.data;
};
