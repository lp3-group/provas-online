import useAsync from '../useAsync';

import * as usuarioApi from '../../services/usuarioApi';

export default function usePegarUsuarios() {
  const {
    status,
    result,
    error,
    execute: pegarUsuarios,
  } = useAsync(usuarioApi.pegarUsuarios, false);

  return {
    status,
    result,
    error,
    pegarUsuarios,
  };
}
