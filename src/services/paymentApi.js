import api from './api';

export async function postPayment(body, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.post('/payments/process', body, config);

  return response.data;
}
