import api from './api';

/**
 * Lista todos os looks do usuário logado.
 */
export const listarLooks = async () => {
  const response = await api.get('/looks');
  return response.data;
};

/**
 * Lista os looks mais recentes do usuário (limite definido no backend).
 */
export const listarLooksRecentes = async () => {
  const response = await api.get('/looks/recentes');
  return response.data;
};

/**
 * Cadastra um novo look.
 * Exemplo de `data`:
 * {
 *   titulo: "Look Fashion Week",
 *   descricao: "Para brilhar nas passarelas.",
 *   imagem_uri: "file:///path/to/imagem.jpg"
 * }
 */
export const cadastrarLook = async (data) => {
  const response = await api.post('/looks', data);
  return response.data;
};

/**
 * Deleta um look pelo ID.
 */
export const deletarLook = async (lookId) => {
  const response = await api.delete(`/looks/${lookId}`);
  return response.data;
};
