import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useAlterarSenha() {
  const {
    status,
    result,
    error,
    execute: alterarSenha,
  } = useAsync(authApi.alterarSenha, false);

  return {
    status,
    result,
    error,
    alterarSenha,
  };
}
