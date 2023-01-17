import api from './api';

export async function pegarDisciplinas({ token }) {
  const { data, status } = await api.get('/disciplinas', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}
