import styled from 'styled-components';
import EventInfoContext from '../../contexts/EventInfoContext';
import { useContext, useState } from 'react';

export default function Main() {
  const { eventInfo } = useContext(EventInfoContext);

  return (
    <MainContainer background={eventInfo.backgroundImageUrl}>
      <InputContainer>Olá</InputContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  min-height: 100vh;
  background: ${(props) => props.background};
`;

const InputContainer = styled.div`
  width: 80%;
  height: 750px;
  background: #FFFFFF;
  border-radius: 10px;
`;
