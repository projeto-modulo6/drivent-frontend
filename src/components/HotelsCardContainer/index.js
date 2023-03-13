import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { chooseHotel } from '../../services/hotelApi';
import CardHotels from '../HotelsCard';

export default function CardHotelsContainer() {
  const token = useToken();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function getHotels() {
      try {
        const hotels = await chooseHotel(token);
        setHotels(hotels);
      } catch (error) {
        console.log(error.message);
      }
    }
    getHotels();
  }, []);

  console.log(hotels);

  return (
    <>
      <h1>Primeiro, escolha seu hotel</h1>
      <HotelCardsContainerStyle>
        {hotels.map((item) => (
          <CardHotels image={item.image} name={item.name} />
        ))}
      </HotelCardsContainerStyle>
    </>
  );
}

const HotelCardsContainerStyle = styled.div`
  display: flex;
  padding-top: 36px;
  h1 {
    color: #8e8e8e;
    font-size: 20px;
  }
`;
