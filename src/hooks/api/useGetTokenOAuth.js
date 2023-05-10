import useAsync from '../useAsync';
import useToken from '../useToken';

import * as OAuthApi from '../../services/oAuthApi';

export default function useGetTokenOAuth() {
  const {
    loading: getTokenOAuthLoading,
    error: getTokenOAuthError,
    act: getTokenOAuth,
  } = useAsync((data) => OAuthApi.getTokenOAuth(data), false);

  return {
    getTokenOAuthLoading,
    getTokenOAuthError,
    getTokenOAuth,
  };
}
