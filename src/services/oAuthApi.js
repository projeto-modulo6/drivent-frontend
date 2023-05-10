import api from './api';

export async function postOAuth(body) {
  const response = await api.post('/oAuth/sign-in', body);
  return response.data;
}

export async function getTokenOAuth(body) {
  const response = await api.post('/oAuth/token', body);
  return response.data;
}

export async function postSyncGitHub(body) {
  console.log(body);
  const response = await api.post('/auth/sign-in/syncOAuth', body);
  return response.data;
}
