import api from './api';

export async function login({ nomeUsuario, senha }) {
  const { data, status } = await api.post('/auth/login', {
    nomeUsuario, senha
  });

  return { data, status };
}

export async function alterarSenha({ senha, confirmaSenha, token }) {
  const { data, status } = await api.put('/auth/alterarSenha', {
    senha, confirmaSenha
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}
