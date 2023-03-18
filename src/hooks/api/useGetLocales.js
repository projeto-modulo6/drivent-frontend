import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useGetAllLocales() {
  const token = useToken();

  const {
    loading: getLocalesLoading,
    error: getLocalesError,
    act: getAllLocales,
  } = useAsync(() => activityApi.getAllLocales(token), false);

  return {
    getLocalesLoading,
    getLocalesError,
    getAllLocales,
  };
}
