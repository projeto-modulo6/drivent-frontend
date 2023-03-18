import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export default function useGetLocaleActivitiesByDay() {
  const token = useToken();

  const {
    loading: getLocaleActivitiesByDayLoading,
    error: getLocaleActivitiesByDayError,
    act: getLocaleActivitiesByDay,
  } = useAsync((dayId, localeId) => activityApi.getLocaleActivitiesByDay(token, dayId, localeId), false);

  return {
    getLocaleActivitiesByDayLoading,
    getLocaleActivitiesByDayError,
    getLocaleActivitiesByDay,
  };
}
