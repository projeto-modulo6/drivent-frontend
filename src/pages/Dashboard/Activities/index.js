import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ActivityDay from '../../../components/ActivityDay';
import NotPresentialTicket from '../../../components/NotPresentialTicket';
import useGetTicket from '../../../hooks/api/useGetTicket';
import EventLocaleContainer from '../../../components/ActivitiesContainer/EventLocaleContainer';

export default function Activities() {
  const [ticketInfo, setTicketInfo] = useState('');
  const [dayId, setDayId] = useState(false);
  const [reRenderBool, setReRenderBool] = useState(false);
  const { getTicket } = useGetTicket();

  useEffect(() => {
    async function getUserTicket() {
      try {
        const userTicket = await getTicket();
        setTicketInfo(userTicket);
      } catch (err) {
        console.log(err);
      }
    }
    getUserTicket();
  }, []);

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
