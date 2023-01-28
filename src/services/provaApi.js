import api from './api';

export async function criarProva({
  titulo,
  idDisciplina,
  questoes,
  token
}) {
  const { data, status } = await api.post('/provas', { titulo, idDisciplina, questoes }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}

export async function pegarProvas({ token }) {
  const { data, status } = await api.get('/provas', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}

export async function excluirProva({ provaId, token }) {
  const { data, status } = await api.delete(`/provas/${provaId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}

export async function pegarProvaPeloId({ provaId, token }) {
  const { data, status } = await api.get(`/provas/${provaId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}
