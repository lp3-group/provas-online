import useAsync from '../useAsync';

import * as provaApi from '../../services/provaApi';

export default function usePegarProvas() {
  const {
    status,
    result,
    error,
    execute: pegarProvaParaRealizar,
  } = useAsync(provaApi.pegarProvaParaRealizar, false);

  return {
    status,
    result,
    error,
    pegarProvaParaRealizar,
  };
}
