import useAsync from '../useAsync';
import useToken from '../useToken';

import * as OAuthApi from '../../services/oAuthApi';

export default function useSignInOAuth() {
  const {
    loading: signInOAuthLoading,
    error: signInOAuthError,
    act: signInOAuth,
  } = useAsync((data) => OAuthApi.postOAuth(data), false);

  return {
    signInOAuthLoading,
    signInOAuthError,
    signInOAuth,
  };
}
