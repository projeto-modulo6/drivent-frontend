import useAsync from '../useAsync';
import useToken from '../useToken';

import * as OAuthApi from '../../services/oAuthApi';

export default function useSignInSyncGitHub() {
  const {
    loading: signInSyncGitHubLoading,
    error: signInSyncGitHubError,
    act: signInSyncGitHub,
  } = useAsync((data) => OAuthApi.postSyncGitHub(data), false);

  return {
    signInSyncGitHubLoading,
    signInSyncGitHubError,
    signInSyncGitHub,
  };
}
