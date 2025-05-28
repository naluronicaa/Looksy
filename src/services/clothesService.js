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

/**
 * Cadastra uma nova roupa.
 * Exemplo de `data`:
 * {
 *   foto_uri: "uri_da_foto",
 *   categoria: "Parte de Cima",
 *   subtipo: "Blusa",
 *   descricao: "Blusa rosa de tricô",
 *   usos: ["Trabalho", "Férias"]
 * }
 */
export const cadastrarRoupa = async (data) => {
  const response = await api.post('/roupas', data);
  return response.data;
};

/**
 * Deleta uma roupa pelo ID.
 */
export const deletarRoupa = async (roupaId) => {
  const response = await api.delete(`/roupas/${roupaId}`);
  return response.data;
};
