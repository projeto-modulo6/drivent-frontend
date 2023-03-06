import ConfirmedPaymentContainer from '../../ConfirmedPaymentContainer';
import PaymentSummary from '../../PaymentSummary';
import CreditCard from './CreditCards';

export default function TicketPayment({ ticket, setPaid, paid, ticketId }) {
  return (
    <>
      <PaymentSummary ticket={ticket} />{' '}
      {paid ? <ConfirmedPaymentContainer /> : <CreditCard setPaid={setPaid} ticketId={ticketId} />}
    </>
  );
}
