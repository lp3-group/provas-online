import useAsync from '../useAsync';

import * as usuarioApi from '../../services/usuarioApi';

export default function useCriarUsuario() {
  const {
    status,
    result,
    error,
    execute: criarUsuario,
  } = useAsync(usuarioApi.criarUsuario, false);

  return {
    status,
    result,
    error,
    criarUsuario,
  };
}
