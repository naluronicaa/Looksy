import api from './api';

export const listarLooks = async () => {
  const response = await api.get('/looks');
  return response.data;
};


export const listarLooksRecentes = async () => {
  const response = await api.get('/looks/recentes');
  return response.data;
};


export const cadastrarLook = async (data) => {
  const response = await api.post('/looks', data);
  return response.data;
};


export const deletarLook = async (lookId) => {
  const response = await api.delete(`/looks/${lookId}`);
  return response.data;
};
