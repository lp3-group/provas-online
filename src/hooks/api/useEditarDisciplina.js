import useAsync from '../useAsync';

import * as disciplinaApi from '../../services/disciplinaApi';

export default function useEditarDisciplina() {
  const {
    status,
    result,
    error,
    execute: editarDisciplina,
  } = useAsync(disciplinaApi.editarDisciplina, false);

  return {
    status,
    result,
    error,
    editarDisciplina,
  };
}
