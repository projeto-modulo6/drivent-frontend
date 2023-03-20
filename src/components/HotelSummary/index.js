import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { getBooking } from '../../services/bookingApi';
import { getHotelByHotelId, getHotelVacancy } from '../../services/hotelApi';

export default function HotelSummary({ setBookingCompleted, setQuery, hotelId }) {
  const token = useToken();
  const [roomData, setRoomData] = useState('');
  const [hotelData, setHotelData] = useState([]);
  const [hotelName, sethotelName] = useState('');
  const [hotelImg, setHotelImg] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomInfo, setRoomInfo] = useState('');
  const [roomName, setRoomName] = useState('');

  function backScreen() {
    setBookingCompleted(false);
    setQuery(true);
  }

  useEffect(() => {
    let hotelId;

    getBooking(token)
      .then((resposta) => {
        setRoomData(resposta.Room);
        hotelId = resposta.Room.hotelId;
        getHotelVacancy(hotelId)
          .then((res) => {
            setHotelData(res);
            const arr = res.filter((room) => room.id === resposta.Room.id);
            console.log(arr, 'ARR FILTER');

            if (arr.length !== 0) {
              setRoomName(arr[0].name);

              if (arr[0]._count.Booking === 1) {
                setRoomDescription('Apenas você');
              }
              if (arr[0]._count.Booking === 2) {
                setRoomDescription('Você e mais um');
              }
              if (arr[0]._count.Booking === 3) {
                setRoomDescription('Você e mais dois');
              }
              if (arr[0].capacity === 1) {
                setRoomInfo('Single');
              }
              if (arr[0].capacity === 2) {
                setRoomInfo('Double');
              }
              if (arr[0].capacity === 3) {
                setRoomInfo('Triple');
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
        getHotelByHotelId(token, hotelId)
          .then((res) => {
            console.log(res, 'RES');
            sethotelName(res.name);
            setHotelImg(res.image);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <TopTitle>Você já escolheu o seu quarto:</TopTitle>
      <TicketSummary>
        <img src={hotelImg}></img>
        <HotelName>{hotelName}</HotelName>
        <Weight>Quarto reservado</Weight>
        <NotWeight>
          Quarto {roomName} ({roomInfo})
        </NotWeight>
        <Weight>Pessoas no seu quarto:</Weight>
        <NotWeight>{roomDescription}</NotWeight>
      </TicketSummary>
      <ChangeRoomButton onClick={backScreen}>
        <p>TROCAR DE QUARTO</p>
      </ChangeRoomButton>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 30px;
`;

const TopTitle = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;

const TicketSummary = styled.div`
  margin-top: 17px;
  width: 196px;
  height: 264px;
  left: 330px;
  top: 292px;
  background: #ffeed2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
`;

const HotelName = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #343434;
  margin: 10px 0 10px 0;
`;

const Weight = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #3c3c3c;
`;

const NotWeight = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #3c3c3c;
  margin-bottom: 14px;
`;

const ChangeRoomButton = styled.button`
  margin-top: 38px;
  width: 182px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  cursor: pointer;
  p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #000000;
  }
`;
