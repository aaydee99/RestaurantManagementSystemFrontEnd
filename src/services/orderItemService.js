import api from '../api';

export const getOrderItems = async () => {
  const response = await api.get('/orderItems');
  return response.data;
};

export const getOrderItem = async (id) => {
  const response = await api.get(`/orderItems/${id}`);
  return response.data;
};

export const createOrderItem = async (orderItem) => {
  const response = await api.post('/orderItems', orderItem);
  return response.data;
};

export const updateOrderItem = async (id, orderItem) => {
  const response = await api.put(`/orderItems/${id}`, orderItem);
  return response.data;
};

export const deleteOrderItem = async (id) => {
  const response = await api.delete(`/orderItems/${id}`);
  return response.data;
};
