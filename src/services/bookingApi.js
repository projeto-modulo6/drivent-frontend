import api from './api';

export async function updateBooking(body, bookingId, token) {
  const response = await api.put(`/booking/${bookingId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getBooking(token) {
  const response = await api.put('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postBooking(body, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post('/booking', body, config);
  return response.data;
}
