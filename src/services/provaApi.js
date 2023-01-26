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