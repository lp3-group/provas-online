import useAsync from '../useAsync';

import * as provaApi from '../../services/provaApi';

export default function useRealizarProva() {
  const {
    status,
    result,
    error,
    execute: realizarProva,
  } = useAsync(provaApi.realizarProva, false);

  return {
    status,
    result,
    error,
    realizarProva,
  };
}
