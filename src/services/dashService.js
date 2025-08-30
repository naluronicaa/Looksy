// src/services/dashboardService.js

import api from './api';

// Retorna o resumo do dashboard do usuário logado
export const getDashboardResumo = async () => {
  const response = await api.get('/dashboard/resumo');
  return response.data;
};
