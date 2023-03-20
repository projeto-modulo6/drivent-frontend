import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ActivityDay from '../../../components/ActivityDay';
import NotPresentialTicket from '../../../components/NotPresentialTicket';
import useGetTicket from '../../../hooks/api/useGetTicket';
import EventLocaleContainer from '../../../components/ActivitiesContainer/EventLocaleContainer';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import NoEnrollmentDetected from '../../../components/NoEnrollment';
import useToken from '../../../hooks/useToken';

export default function Activities() {
  const [ticketInfo, setTicketInfo] = useState('');
  const [dayId, setDayId] = useState(false);
  const [reRenderBool, setReRenderBool] = useState(false);
  const { getTicket } = useGetTicket();
  const [enrollment, setEnrollment] = useState(false);
  const [ticketPaid, setTicketPaid] = useState(false);

  const token = useToken();

  useEffect(() => {
    async function getUserTicket() {
      try {
        const userTicket = await getTicket();
        if (userTicket.status == 'PAID') {
          setTicketPaid(true);
        }
        setTicketInfo(userTicket);
      } catch (err) {
        console.log(err);
      }
    }
    getUserTicket();

    async function getUserEnrrolment() {
      try {
        const userEnrollment = await getPersonalInformations(token);
        setEnrollment(true);
      } catch (err) {
        console.log(err);
      }
    }
    getUserEnrrolment();
  }, []);

  if (!ticketPaid) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
        <NoEnrollmentDetected text={'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem'} />
      </>
    );
  }

  if (!enrollment) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
        <NoEnrollmentDetected
          text={
            'Você precisa completar sua inscrição, seu ingresso e seu hotel antes de prosseguir pra escolha de atividades'
          }
        />
      </>
    );
  }

  if (ticketInfo) {
    if (ticketInfo.TicketType.isRemote === true) {
      return <NotPresentialTicket />;
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
      <ActivityDay setReRenderBool={setReRenderBool} reRenderBool={reRenderBool} dayId={dayId} setDayId={setDayId} />
      {dayId !== false ? <EventLocaleContainer reRenderBool={reRenderBool} dayId={dayId} /> : ''}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
