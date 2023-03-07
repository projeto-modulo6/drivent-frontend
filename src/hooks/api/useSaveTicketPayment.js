import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useSaveTicketPayment() {
  const token = useToken();

  const {
    loading: saveTicketPaymentLoading,
    error: saveTicketPaymentError,
    act: saveTicketPayment,
  } = useAsync((data) => paymentApi.postPayment(data, token), false);

  return {
    saveTicketPaymentLoading,
    saveTicketPaymentError,
    saveTicketPayment,
  };
}
