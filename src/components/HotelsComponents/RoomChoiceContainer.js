import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import _ from 'underscore';
import useHotelVacancy from '../../hooks/api/useHotelVacancy';
import RoomChoiceButton from './RoomChoiceButton';

export default function RoomChoiceContainer({ hotelId }) {
  const { hotelVacancyLoading, hotelVacancyError, hotelVacancy } = useHotelVacancy();
  const [hotelInfo, setHotelInfo] = useState([]);
  const [chosenRoom, setChosenRoom] = useState('');
  const [chosenRoomId, setChosenRoomId] = useState(0);
  console.log(hotelId);

  useEffect(() => {
    const hotelId = 1;
    async function getVacancy(hotelId) {
      try {
        const hotelInfo = await hotelVacancy(hotelId);
        const sortedInfo = _.sortBy(hotelInfo, 'id');
        setHotelInfo(sortedInfo);
      } catch (err) {
        console.log(err);
      }
    }
    getVacancy(hotelId);
  }, []);

  async function postBooking(event) {
    event.preventDefault();
    if (chosenRoomId !== 0) {
      const body = { roomId: chosenRoomId };
    } else {
      toast('Você deve escolher um quarto para fazer uma reserva.');
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
            isChosen={room.name === chosenRoom ? true : false}
            setChosenRoom={setChosenRoom}
            setChosenRoomId={setChosenRoomId}
          />
        ))}
      </StyledContainer>
      <StyledButton onClick={postBooking}>RESERVAR QUARTO</StyledButton>
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
