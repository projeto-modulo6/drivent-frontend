import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useSaveTicketReservation() {
  const token = useToken();

  const {
    loading: saveTicketReservationLoading,
    error: saveTicketReservationError,
    act: saveTicketReservation,
  } = useAsync((data) => ticketApi.postReservation(data, token), false);

  return {
    saveTicketReservationLoading,
    saveTicketReservationError,
    saveTicketReservation,
  };
}
