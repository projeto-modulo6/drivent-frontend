import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { getBooking } from '../../services/bookingApi';
import { getHotelVacancy } from '../../services/hotelApi';

export default function HotelSummary({ setBookingCompleted, setQuery, hotelId }) {
  const token = useToken();
  const [roomData, setRoomData] = useState('');
  const [hotelData, setHotelData] = useState([]);

  function backScreen() {
    setBookingCompleted(false);
    setQuery(true);
  }

  useEffect(() => {
    let hotelId;
    getBooking(token)
      .then((res) => {
        setRoomData(res.Room);
        hotelId = res.Room.hotelId;
        getHotelVacancy(hotelId)
          .then((res) => {
            setHotelData(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    //getHotelVacancy(hotelId)
  }, []);

  const arr = hotelData.filter((room) => room.id === roomData.id);

  return (
    <Container>
      <TopTitle>Você já escolheu o seu quarto:</TopTitle>
      <TicketSummary>
        <img src="https://cdn.pixabay.com/photo/2019/04/04/15/17/smartphone-4103051_1280.jpg"></img>
        <HotelName>Drivent Resort</HotelName>
        <Weight>Quarto reservado</Weight>
        <NotWeight>101 (double)</NotWeight>
        <Weight>Pessoas no seu quarto:</Weight>
        <NotWeight>Você e mais um</NotWeight>
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
