import api from './api';

export async function getTicketByEnrollmentId(token, enrollmentId) {
  const response = await api.get(`/tickets/types/${enrollmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
