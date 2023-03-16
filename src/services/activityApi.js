import api from './api';

export async function getSeatsByActivityId(token, activityId){
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`/activity/${activityId}`, config);
      return response.data;
}

export async function getSeats(token){
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`/activity`, config);
      return response.data;
}