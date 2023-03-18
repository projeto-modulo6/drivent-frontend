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

export async function getAllLocales(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get('/activity/allLocales', config);

  return response.data;
}

export async function getLocaleActivitiesByDay(token, dayId, localeId) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/activity/locale/${dayId}/${localeId}`, config);

  return response.data;
}
