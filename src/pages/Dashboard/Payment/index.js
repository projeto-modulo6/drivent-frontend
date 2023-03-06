import styled from 'styled-components';
import PaymentSummary from '../../../components/PaymentSummary';
import NoEnrollmentDetected from '../../../components/NoEnrollment';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import useToken from '../../../hooks/useToken';
import { Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import OptionsContainer from '../../../components/PaymentComponents/OptionsContainer';
import TicketTypeReservation from '../../../components/PaymentComponents/TicketTypeChoice/TicketTypeReservation';
import WithCreditCard from '../../../components/EndPayment/withCreditCard';
import TicketPayment from '../../../components/PaymentComponents/TicketPayment/TicketPayment';

export default function Payment() {
  const [reserved, setReserved] = useState(false);
  const [paid, setPaid] = useState(false);
  const [enrollment, setEnrollment] = useState(true);
  const [ticketId, setTicketId] = useState(0);
  const [ticket, setTicket] = useState({ price: 0, Remote: null, Hotel: null });
  const token = useToken();

  useEffect(() => {
    getPersonalInformations(token)
      .then((res) => {
        setEnrollment(true);
      })
      .catch((err) => {
        setEnrollment(false);
      });
  }, []);

  if (enrollment === false) {
    return (
      <>
        <NoEnrollmentDetected />
      </>
    );
  }
  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {!reserved ? <TicketTypeReservation setReserved = {setReserved} /> : <WithCreditCard/>}
      {!reserved ? (
        <TicketTypeReservation
          setReserved={setReserved}
          setTicketId={setTicketId}
          setTicket={setTicket}
          ticket={ticket}
        />
      ) : (
        <TicketPayment setPaid={setPaid} paid={paid} ticketId={ticketId} ticket={ticket} />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
