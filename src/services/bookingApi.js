import api from './api';

export async function postBooking(body, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post('/booking', body, config);
  return response.data;
}
