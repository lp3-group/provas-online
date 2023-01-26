import useAsync from '../useAsync';

import * as provaApi from '../../services/provaApi';

export default function usePegarProvas() {
  const {
    status,
    result,
    error,
    execute: pegarProvas,
  } = useAsync(provaApi.pegarProvas, false);

  return {
    status,
    result,
    error,
    pegarProvas,
  };
}
