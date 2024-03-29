import api from './api';

export async function pegarDisciplinas({ token }) {
  const { data, status } = await api.get('/disciplinas', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}

export async function criarDisciplina({ nome, token }) {
  const { data, status } = await api.post('/disciplinas', { nome }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}


export async function excluirDisciplina({ disciplinaId, token }) {
  const { data, status } = await api.delete(`/disciplinas/${disciplinaId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}

export async function editarDisciplina({ disciplinaId, nome, token }) {
  const { data, status } = await api.put(`/disciplinas/${disciplinaId}`, { nome }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}
