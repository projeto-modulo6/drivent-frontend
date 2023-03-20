import api from './api';

export async function getHotelVacancy(hotelId) {
  const response = await api.get(`/hotels/${hotelId}/vacancy`);
  return response.data;
}

export async function chooseHotel(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get('/hotels', config);
  return response.data;
}

export async function getHotelByHotelId(token, hotelId) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/hotels/${hotelId}`, config);
  return response.data;
}
