import api from './api';

/**
 * Salvar ou atualizar questionário (POST).
 * A lógica do backend já decide se é insert ou update.
 */
export const salvarOuAtualizarQuestionario = async (dados) => {
  const response = await api.post('/questionario', dados);
  return response.data;
};

/**
 * Buscar questionário de um usuário específico.
 */
export const buscarQuestionario = async (usuarioId) => {
  const response = await api.get(`/questionario/${usuarioId}`);
  return response.data;
};
