import styled from 'styled-components';
import qs from 'query-string';
import { useContext, useEffect } from 'react';
import useSignInOAuth from '../../hooks/api/useSignInOAuth';
import OAuthContext from '../../contexts/OAuthContext';
import useGetTokenOAuth from '../../hooks/api/useGetTokenOAuth';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export function OAuth() {
  function redirectToGithub() {
    const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user public_repo',
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_REDIRECT_URL,
    };
    const queryStrings = qs.stringify(params);
    const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;
    window.location.href = authorizationUrl;
  }

  return (
    <>
      <Button onClick={redirectToGithub}>
        <GitHub>
          <svg height="24" viewBox="0 0 16 16" version="1.1" width="24">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
        </GitHub>
        <p>Sign in with GitHub</p>
      </Button>
    </>
  );
}

const Button = styled.div`
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2);
  height: 35px;
  max-width: 230px;
  margin-top: 9px;
  margin-bottom: -20px;
  border-radius: 5px;
  width: 100%;
  background-color: #161b22;
  color: #f0f6fc;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    filter: brightness(1.1);
  }
  p {
    margin-left: 10px;
  }
`;

const GitHub = styled.div`
  height: fit-content;
  width: fit-content;
  margin-top: 1px;
  fill: #f0f6fc;
`;
