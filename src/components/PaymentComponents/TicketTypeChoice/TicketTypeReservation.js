import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import OptionsContainer from '../OptionsContainer';

export default function TicketTypeReservation() {
  const token = useToken();

  const [isRemote, setIsRemote] = useState(null);
  const [hasHotel, setHasHotel] = useState(null);
  const [ticket, setTicket] = useState({ price: 0, Remote: null, Hotel: null });
  const [completedTicket, setCompletedTicket] = useState(false);

  useEffect(() => {
    setCompletedTicket(false);
    if (isRemote === true) {
      setTicket({ ...ticket, Remote: true, Hotel: false, price: 100 });
      setHasHotel(null);
      setCompletedTicket(true);
      return;
    }

    if (isRemote === false && hasHotel === false) {
      setTicket({ ...ticket, Remote: false, Hotel: false, price: 250 });
      setCompletedTicket(true);
      return;
    }

    if (isRemote === false && hasHotel === true) {
      setTicket({ ...ticket, Remote: true, Hotel: true, price: 600 });
      setCompletedTicket(true);
      return;
    }
  }, [isRemote, hasHotel]);

  console.log(ticket);

  function reservation() {
    const body = { ticketTypeId: 3 }; //chumbado online
    const token = '1234';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.post('http://localhost:4000/tickets', body, config);
  }
  return (
    <>
      <OptionsContainer
        title="Primeiro, escolha sua modalidade de ingresso"
        optionToTrue="Online"
        priceToTrue={100}
        optionToFalse="Presencial"
        priceToFalse={250}
        setIsParam={setIsRemote}
      />
      {isRemote === null || isRemote === true ? (
        ''
      ) : (
        <OptionsContainer
          title="Ótimo! Agora escolha sua modalidade de hospedagem"
          optionToTrue="Com Hotel"
          priceToTrue={350}
          optionToFalse="Sem Hotel"
          priceToFalse={0}
          setIsParam={setHasHotel}
        />
      )}
      {completedTicket ? (
        <>
          <StyledP>
            Fechado! O total ficou em <strong>R${ticket.price}</strong>. Agora é só confirmar:
          </StyledP>
          <StyledButton>
            <p> RESERVAR INGRESSO</p>
          </StyledButton>
        </>
      ) : (
        ''
      )}
    </>
  );
}

const StyledP = styled.p`
  color: #8e8e8e;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

const StyledButton = styled.button`
  width: 162px;
  height: 37px;
  border-radius: 4px;
  background-color: #e0e0e0;
  margin-top: 17px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
