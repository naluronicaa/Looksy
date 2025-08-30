import api from './api';

/**
 * Lista todas as roupas do usuário logado.
 */
export const listarRoupas = async () => {
  const response = await api.get('/roupas');
  return response.data;
};

/**
 * Lista as roupas mais recentes do usuário (limite definido no backend).
 */
export const listarRoupasRecentes = async () => {
  const response = await api.get('/roupas/recentes');
  return response.data;
};

export const cadastrarRoupa = async (data) => {
  const response = await api.post('/roupas', data);
  return response.data;
};

/**
 * Atualiza uma roupa pelo ID.
 * Exemplo de uso:
 * atualizarRoupa(10, { nome: "Camisa nova", recusada: 15 })
 */
export const atualizarRoupa = async (roupaId, campos) => {
  const response = await api.put(`/roupas/${roupaId}`, campos);
  return response.data;
};

/**
 * Deleta uma roupa pelo ID.
 */
export const deletarRoupa = async (roupaId) => {
  const response = await api.delete(`/roupas/${roupaId}`);
  return response.data;
};
