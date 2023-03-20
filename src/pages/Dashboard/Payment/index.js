import styled from 'styled-components';
import NoEnrollmentDetected from '../../../components/NoEnrollment';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import useToken from '../../../hooks/useToken';
import { Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import TicketTypeReservation from '../../../components/PaymentComponents/TicketTypeChoice/TicketTypeReservation';
import WithCreditCard from '../../../components/EndPayment/withCreditCard';
import TicketPayment from '../../../components/PaymentComponents/TicketPayment/TicketPayment';
import { getTicketByEnrollmentId } from '../../../services/ticketApi';

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

    getTicketByEnrollmentId(token)
      .then((res) => {
        if (res.status === 'PAID') {
          setPaid(true);
        }
        setTicketId(res.id);
        setTicket({
          price: res.TicketType.price,
          Remote: res.TicketType.isRemote,
          Hotel: res.TicketType.includesHotel,
        });
        setReserved(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (enrollment === false) {
    return (
      <>
        <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
        <NoEnrollmentDetected
          text={'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso'}
        />
      </>
    );
  }
  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
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
