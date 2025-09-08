import api from './api';

const OPENAI_API_KEY = "sk-...SUA_KEY_AQUI...";

export const sugerirLookIA = async (data) => {
  const response = await api.post('/sugestao/look', {
    ...data,
    openai_api_key: OPENAI_API_KEY
  });
  return response.data;
};

export const cadastrarRoupaIA = async (data) => {
  const response = await api.post('/roupas/auto', {
    ...data,
    openai_api_key: OPENAI_API_KEY
  });
  return response.data;
};
