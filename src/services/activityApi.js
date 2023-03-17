import api from './api';

export async function getDateWithActivities(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get('/activity/dates', config);

  return response.data;
}
