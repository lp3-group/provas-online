import useAsync from '../useAsync';

import * as provaApi from '../../services/provaApi';

export default function usePegarProva() {
  const {
    status,
    result,
    error,
    execute: pegarProvaPeloId,
  } = useAsync(provaApi.pegarProvaPeloId, false);

  return {
    status,
    result,
    error,
    pegarProvaPeloId,
  };
}
