import api from './api';

export async function login({ nomeUsuario, senha }) {
  const { data, status } = await api.post('/auth/login', {
    nomeUsuario, senha
  });

  return { data, status };
}
