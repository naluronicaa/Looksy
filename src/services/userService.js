import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, senha) => {
  const response = await api.post('/usuarios/login', { email, senha });
  const { token } = response.data;
  await AsyncStorage.setItem('token', token);
  return token;
};

export const criarUsuario = async (nome, email, senha) => {
  const response = await api.post('/usuarios', { nome, email, senha });
  return response.data;
};

export const atualizarUsuario = async (usuarioId, data) => {
  // data pode conter nome, email, idade, sexo, biotipo etc.
  const response = await api.put(`/usuarios/${usuarioId}`, data);
  return response.data;
};

// Atualiza só idade, sexo, biotipo (mas aceita nome/email também se quiser!)
export const atualizarPerfil = async (usuarioId, { idade, sexo, biotipo }) => {
  const response = await api.put(`/usuarios/${usuarioId}`, {
    idade,
    sexo,
    biotipo,
  });
  return response.data;
};

export const trocarSenha = async (usuarioId, senha_antiga, nova_senha) => {
  const response = await api.put(`/usuarios/${usuarioId}/senha`, {
    senha_antiga,
    nova_senha,
  });
  return response.data;
};

export const deletarUsuario = async (usuarioId) => {
  const response = await api.delete(`/usuarios/${usuarioId}`);
  await AsyncStorage.removeItem('token');
  return response.data;
};

export const buscarUsuarioPorEmail = async (email) => {
  const response = await api.get(`/usuarios/email/${email}`);
  return response.data;
};

export const atualizarImagemUsuario = async (usuarioId, imagem_url) => {
  const response = await api.put(`/usuarios/${usuarioId}/imagem`, {
    imagem_url,
  });
  return response.data;
};
