import api from '../api';

export const getEmployees = async () => {
  const response = await api.get('/employees');
  console.log(response);
  return response.data;
};

export const getEmployee = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await api.post('/employees', employee);
  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await api.put(`/employees/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};
