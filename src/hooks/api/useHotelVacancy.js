import useAsync from '../useAsync';

import * as hotelApi from '../../services/hotelApi';

export default function useHotelVacancy() {
  const {
    loading: hotelVacancyLoading,
    error: hotelVacancyError,
    act: hotelVacancy,
  } = useAsync((data) => hotelApi.getHotelVacancy(data), false);

  return {
    hotelVacancyLoading,
    hotelVacancyError,
    hotelVacancy,
  };
}
