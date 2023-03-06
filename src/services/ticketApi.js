import api from './api';

export async function postReservation(body, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.post('/tickets', body, config);

  return response.data;
}
