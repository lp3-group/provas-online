import useAsync from '../useAsync';

import * as disciplinaApi from '../../services/disciplinaApi';

export default function useCriarDisciplina() {
  const {
    status,
    result,
    error,
    execute: criarDisciplina,
  } = useAsync(disciplinaApi.criarDisciplina, false);

  return {
    status,
    result,
    error,
    criarDisciplina,
  };
}