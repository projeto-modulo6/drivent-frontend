import CreditCard from './CreditCards';

export default function TicketPayment({ ticket, setPaid, paid, ticketId }) {
  return <>{paid ? null : <CreditCard ticket={ticket} setPaid={setPaid} ticketId={ticketId} />}</>;
}
