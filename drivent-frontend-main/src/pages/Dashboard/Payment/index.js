import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import OptionsContainer from '../../../components/PaymentComponents/OptionsContainer';
import TicketTypeReservation from '../../../components/PaymentComponents/TicketTypeChoice/TicketTypeReservation';
import TicketPayment from '../../../components/PaymentComponents/TicketPayment/TicketPayment';

export default function Payment() {
  const [reserved, setReserved] = useState(false);
  const [paid, setPaid] = useState(false);
  const [ticket, setTicket] = useState({ price: 0, Remote: null, Hotel: null });
  const [ticketId, setTicketId] = useState(0);
  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {!reserved ? (
        <TicketTypeReservation
          setReserved={setReserved}
          ticket={ticket}
          setTicket={setTicket}
          setTicketId={setTicketId}
        />
      ) : (
        <TicketPayment ticket={ticket} setPaid={setPaid} paid={paid} ticketId={ticketId} />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
