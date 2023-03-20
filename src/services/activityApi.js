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

export async function getUserActivitiesByActivityId(token, activityId) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/activity/useractivity/${activityId}`, config);
  return response.data;
}

export async function postUserActivity(token, id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = { name: 'name' };

  const post = await api.post(`/activity/${id}`, body, config);
  return post.data;
}

export async function deleteUserActivity(token, id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const deletar = await api.delete(`/activity/${id}`, config);

  return deletar.data;
}
