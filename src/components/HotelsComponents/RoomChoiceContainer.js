import styled from 'styled-components';
import RoomChoiceButton from './RoomChoiceButton';

export default function RoomChoiceContainer() {
  const Rooms = [
    {
      id: 1,
      name: 101,
      capacity: 2,
    },
    {
      id: 2,
      name: 102,
      capacity: 2,
    },
    {
      id: 3,
      name: 103,
      capacity: 1,
    },
    {
      id: 4,
      name: 104,
      capacity: 3,
    },
    {
      id: 5,
      name: 105,
      capacity: 2,
    },
  ];
  return (
    <>
      <StyledH1>Ótima pedida! Agora escolha seu quarto:</StyledH1>
      <StyledContainer>
        {Rooms.map((room) => (
          <RoomChoiceButton id={room.id} name={room.name} capacity={room.capacity} />
        ))}
      </StyledContainer>
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
