import useAsync from '../useAsync';

import * as disciplinaApi from '../../services/disciplinaApi';

export default function useLogin() {
  const {
    status,
    result,
    error,
    execute: pegarDisciplinas,
  } = useAsync(disciplinaApi.pegarDisciplinas, false);

  return {
    status,
    result,
    error,
    pegarDisciplinas,
  };
}