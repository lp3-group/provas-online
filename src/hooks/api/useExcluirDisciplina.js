import useAsync from '../useAsync';

import * as disciplinaApi from '../../services/disciplinaApi';

export default function useExcluirDisciplina() {
  const {
    status,
    result,
    error,
    execute: excluirDisciplina,
  } = useAsync(disciplinaApi.excluirDisciplina, false);

  return {
    status,
    result,
    error,
    excluirDisciplina,
  };
}
