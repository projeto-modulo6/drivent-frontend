import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function ConfirmationContainer({ finalPrice }) {
  return (
    <>
      <ConfirmationContainerStyle>
        <h6>
          Fechado! O total ficou em <span> R$ {finalPrice}</span>. Agora é só confirmar:
        </h6>
        <ConfirmationButton>
          <p>RESERVAR INGRESSO</p>
        </ConfirmationButton>
      </ConfirmationContainerStyle>
    </>
  );
}

const ConfirmationContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  h6 {
    color: #8e8e8e;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    padding-bottom: 17px;
    span {
      font-weight: bold;
    }
  }
`;

const ConfirmationButton = styled.div`
  display: flex;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  align-items: center;
  max-width: 162px;
  height: 37px;
  p {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;  
}
  justify-content: center;
`;
