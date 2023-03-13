import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import { HotelContext } from '../../contexts/HotelContext';
import useHotelVacancy from '../../hooks/api/useHotelVacancy';
import RoomChoiceButton from './RoomChoiceButton';
import usePostBooking from '../../hooks/api/usePostBooking';
import { toast } from 'react-toastify';

export default function RoomChoiceContainer({ hotelId, setBookingCompleted }) {
  const { hotelVacancy } = useHotelVacancy();
  const [hotelInfo, setHotelInfo] = useState([]);
  const { chosenRoom } = useContext(HotelContext);
  const { postBooking } = usePostBooking();

  useEffect(() => {
    async function getVacancy(hotelId) {
      try {
        const hotelInfo = await hotelVacancy(hotelId);
        const sortedInfo = _.sortBy(hotelInfo, 'id');
        setHotelInfo(sortedInfo);
      } catch (err) {
        /* eslint-disable-next-line no-console */
        console.log(err);
      }
    }
    getVacancy(hotelId);
  }, []);

  async function postOrChangeBooking(event) {
    event.preventDefault();
    const body = { roomId: chosenRoom.id };
    try {
      await postBooking(body);
      toast('Seu quarto foi reservado!');
      setBookingCompleted(true);
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.log(err);
    }
  }
  return (
    <>
      <StyledH1>Ótima pedida! Agora escolha seu quarto:</StyledH1>
      <StyledContainer>
        {hotelInfo.map((room) => (
          <RoomChoiceButton
            key={room.id}
            id={room.id}
            name={room.name}
            capacity={room.capacity}
            reserveCount={room._count.Booking}
            isChosen={room.name === chosenRoom.name ? true : false}
          />
        ))}
      </StyledContainer>
      <StyledButton onClick={postOrChangeBooking} disabled={chosenRoom.id === 0 ? true : false}>
        RESERVAR QUARTO
      </StyledButton>
    </>
  );
}

const StyledContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const StyledH1 = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 23.4px;
  margin: 33px 0px;
  color: #8e8e8e;
`;

const StyledButton = styled.button`
  width: 162px;
  height: 37px;
  border-radius: 4px;
  background-color: #e0e0e0;
  margin-top: 17px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  p {
    /* width: 138px; */
    /* height: 16px; */
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    line-height: 16px;
    /* text-align: center; */
    font-weight: 400;
  }
`;
