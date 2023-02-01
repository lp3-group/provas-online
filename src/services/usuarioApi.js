import api from './api';

export async function pegarUsuarios({ token }) {
  const { data, status } = await api.get('/usuarios', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data, status };
}
