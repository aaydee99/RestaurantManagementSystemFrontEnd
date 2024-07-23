import api from '../api';

export const getTables = async () => {
  const response = await api.get('/tables');
  return response.data;
};

export const getTable = async (id) => {
  const response = await api.get(`/tables/${id}`);
  return response.data;
};

export const createTable = async (table) => {
  const response = await api.post('/tables', table);
  return response.data;
};

export const updateTable = async (id, table) => {
  const response = await api.put(`/tables/${id}`, table);
  return response.data;
};

export const deleteTable = async (id) => {
  const response = await api.delete(`/tables/${id}`);
  return response.data;
};
