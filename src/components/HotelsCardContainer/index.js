import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { getHotels } from '../../services/hotelApi';
import CardHotels from '../HotelsCard';

export default function CardHotelsContainer() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    getHotels(token)
      .then((response) => {
        setHotels(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(hotels);

  return (
    <>
      <h1>Primeiro, escolha seu hotel</h1>
      <HotelCardsContainerStyle>
        {hotels.map((value) => {
          <CardHotels image={value.image} name={value.name} />;
        })}
      </HotelCardsContainerStyle>
    </>
  );
}

const HotelCardsContainerStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 36px;
  h1 {
    color: #8e8e8e;
    font-size: 20px;
  }
`;
