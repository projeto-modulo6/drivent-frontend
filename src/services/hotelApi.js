import api from './api';

export async function getHotelVacancy(hotelId) {
  const response = await api.get(`/hotels/${hotelId}/vacancy`);
  return response.data;
}
