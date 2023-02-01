import useAsync from '../useAsync';

import * as provaApi from '../../services/provaApi';

export default function useEditarProva() {
  const {
    status,
    result,
    error,
    execute: editarProva,
  } = useAsync(provaApi.editarProva, false);

  return {
    status,
    result,
    error,
    editarProva,
  };
}
