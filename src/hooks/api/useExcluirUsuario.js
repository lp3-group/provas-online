import useAsync from '../useAsync';

import * as usuarioApi from '../../services/usuarioApi';

export default function useExcluirUsuario() {
  const {
    status,
    result,
    error,
    execute: excluirUsuario,
  } = useAsync(usuarioApi.excluirUsuario, false);

  return {
    status,
    result,
    error,
    excluirUsuario,
  };
}
