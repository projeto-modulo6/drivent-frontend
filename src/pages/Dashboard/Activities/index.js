import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NotPresentialTicket from '../../../components/NotPresentialTicket';
import useGetTicket from '../../../hooks/api/useGetTicket';

export default function Activities() {
  const [ticketInfo, setTicketInfo] = useState('');
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
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
