import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { getHotels } from '../../services/hotelApi';
import CardHotels from '../HotelsCard';

export default function CardHotelsContainer() {
  const token = useToken();
  const [hotels, setHotels] = useState([
    {
      name: 'Flamengo Resort',
      image: 'https://i2.wp.com/blogchicosoares.com/wp-content/uploads/2021/12/FLA.jpg?fit=636%2C371&ssl=1',
    },
    {
      name: 'Flamengo Palace',
      image: 'http://multirio.rio.rj.gov.br/images/img_2017_02/rep200.jpg',
    },
    {
      name: 'Flamengo World',
      image: 'https://pbs.twimg.com/media/Fpbn9amXEAwiABT.jpg',
    },
  ]);

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
