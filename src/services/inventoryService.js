import api from '../api';

export const getInventoryItems = async () => {
  const response = await api.get('/inventory');
  return response.data;
};

export const getInventoryItem = async (id) => {
  const response = await api.get(`/inventory/${id}`);
  return response.data;
};

export const createInventoryItem = async (inventoryItem) => {
  const response = await api.post('/inventory', inventoryItem);
  return response.data;
};

export const updateInventoryItem = async (id, inventoryItem) => {
  const response = await api.put(`/inventory/${id}`, inventoryItem);
  return response.data;
};

export const deleteInventoryItem = async (id) => {
  const response = await api.delete(`/inventory/${id}`);
  return response.data;
};
