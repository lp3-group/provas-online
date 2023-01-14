import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useLogin() {
  const {
    status,
    result,
    error,
    execute: login,
  } = useAsync(authApi.login, false);

  return {
    status,
    result,
    error,
    login,
  };
}