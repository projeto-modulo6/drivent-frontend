import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import RoomChoiceContainer from '../../../components/HotelsComponents/RoomChoiceContainer';
import NoHotelDetected from '../../../components/NoHotel';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import { getTicket } from '../../../services/ticketApi';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import { getBooking } from '../../../services/bookingApi';
import NoEnrollmentDetected from '../../../components/NoEnrollment';
import CardHotelsContainer from '../../../components/HotelsCardContainer';
import HotelSummary from '../../../components/HotelSummary';

export default function Hotel() {
  const [onlineTicket, setOnlineTicket] = useState(false);
  const [enrollment, setEnrollment] = useState(false);
  const [pickedHotel, setPickedHotel] = useState(false);
  const [hotelId, setHotelId] = useState([]);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [query, setQuery] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [ticketPaid, setTicketPaid] = useState(false);

  const token = useToken();

  useEffect(() => {
    getTicket(token)
      .then((res) => {
        if (res.TicketType.includesHotel === false) {
          setOnlineTicket(true);
        }
        if (res.status === 'PAID') {
          setTicketPaid(true);
        }
      })
      .catch((err) => {});

    getPersonalInformations(token)
      .then((res) => {
        setEnrollment(true);
      })
      .catch((err) => {
        console.log(err);
      });

    getBooking(token)
      .then((res) => {
        if (query === false) {
          setBookingCompleted(true);
        }
      })
      .catch((err) => {
        setBookingCompleted(false);
        console.log(err);
      });
  });

  if (!ticketPaid) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <NoEnrollmentDetected text={'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem'} />
      </>
    );
  }

  if (onlineTicket) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <NoHotelDetected />
      </>
    );
  }

  if (!enrollment) {
    return (
      <>
        <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
        <NoEnrollmentDetected
          text={'Você precisa completar sua inscrição e seu ingresso antes de prosseguir pra escolha de hotel'}
        />
      </>
    );
  }
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {bookingCompleted === false ? (
        <>
          <CardHotelsContainer setHotelId={setHotelId} setPickedHotel={setPickedHotel} />
          {pickedHotel ? (
            <RoomChoiceContainer
              hotelId={hotelId}
              setBookingCompleted={setBookingCompleted}
              query={query}
              token={token}
              setQuery={setQuery}
              bookingId={bookingId}
              setBookingId={setBookingId}
            />
          ) : (
            ''
          )}
        </>
      ) : (
        <HotelSummary setBookingCompleted={setBookingCompleted} setQuery={setQuery} hotelId={hotelId} setPickedHotel={setPickedHotel} />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
