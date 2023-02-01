import api from './api';

export async function pegarUsuarios({ token }) {
  const { data, status } = await api.get('/usuarios', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}

export async function criarUsuario({ token, matricula, nome, sobrenome, senha, nomeUsuario, tipoUsuario }) {
  const { data, status } = await api.post('/usuarios', { matricula, nome, sobrenome, senha, nomeUsuario, tipoUsuario }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}
