import useAsync from '../useAsync';

import * as activityApi from '../../services/activityApi';
import useToken from '../useToken';

export default function useDateWithActivities() {
  const token = useToken();

  const {
    loading: dateWithActivitiesLoading,
    error: dateWithActivitiesError,
    act: dateWithActivities,
  } = useAsync((data) => activityApi.getDateWithActivities(token), false);

  return {
    dateWithActivities,
    dateWithActivitiesLoading,
    dateWithActivitiesError,
  };
}
