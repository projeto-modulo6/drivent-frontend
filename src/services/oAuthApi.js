import api from './api';

export async function postOAuth(body) {
  const response = { data: 'oi' };
  /*const response = await api.post(`/payments`, body);*/

  return response.data;
}
