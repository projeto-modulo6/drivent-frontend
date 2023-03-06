import api from './api';

export async function getPaymentByTicketId(body, token, ticketId) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/payments/${ticketId}`, body, config);

  return response.data;
}
