import useAsync from '../useAsync';

import * as provaApi from '../../services/provaApi';

export default function useCriarProva() {
  const {
    status,
    result,
    error,
    execute: criarProva,
  } = useAsync(provaApi.criarProva, false);

  return {
    status,
    result,
    error,
    criarProva,
  };
}
