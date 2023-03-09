import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import RoomChoiceContainer from '../../../components/HotelsComponents/RoomChoiceContainer';
import NoHotelDetected from '../../../components/NoHotel';
import { useEffect } from 'react';
import useGetTicket from '../../../hooks/api/useGetTicket';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { getTicket } from '../../../services/ticketApi';

export default function Hotel() {
  const [onlineTicket, setOnlineTicket] = useState(false);
  const [pickedHotel, setPickedHotel] = useState(true);
  const token = useToken();

  useEffect(() => {
    getTicket(token)
      .then((res) => {
        if (res.TicketType.includesHotel === false) {
          setOnlineTicket(true);
        }
      })
      .catch((err) => console.log(err));
  });

  if (onlineTicket) {
    return <NoHotelDetected />;
  }
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {pickedHotel ? <RoomChoiceContainer /> : ''}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
