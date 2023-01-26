import useAsync from '../useAsync';

import * as provaApi from '../../services/provaApi';

export default function useExcluirProva() {
  const {
    status,
    result,
    error,
    execute: excluirProva,
  } = useAsync(provaApi.excluirProva, false);

  return {
    status,
    result,
    error,
    excluirProva,
  };
}
