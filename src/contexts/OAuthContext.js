import { createContext, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const OAuthContext = createContext();
export default OAuthContext;

export function OAuthProvider({ children }) {
  const [oAuthData, setOAuthData] = useLocalStorage('OAuthToken', { tokenGitHub: '' });

  return <OAuthContext.Provider value={{ oAuthData, setOAuthData }}>{children}</OAuthContext.Provider>;
}
