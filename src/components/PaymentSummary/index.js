import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getPersonalInformations } from '../../services/enrollmentApi';
import { getTicketByEnrollmentId } from '../../services/ticketApi';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';

export default function PaymentSummary({ ticket }) {
  const [preco, setPreco] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');
  const [presencial, setPresencial] = useState('Presencial');
  const [hotel, setHotel] = useState('Com Hotel');

  const token = useToken();

  useEffect(() => {
    getTicketByEnrollmentId(token)
      .then((resposta) => {
        setPreco(resposta.TicketType.price);
        if (resposta.TicketType.isRemote === true) {
          setPresencial('Remoto');
        }
        if (resposta.TicketType.includesHotel === false) {
          setHotel('Sem hotel');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Container>
      <p>Ingresso escolhido</p>
      <TicketSummary>
        <p>
          {presencial} + {hotel}
        </p>
        <p>R$ {ticket.price}</p>
      </TicketSummary>
    </Container>
  );
}

const Container = styled.div`
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
  }
  margin-bottom: 30px;
`;

const TicketSummary = styled.div`
  margin-top: 17px;
  width: 190px;
  height: 108px;
  width: 290px;
  height: 108px;
  left: 330px;
  top: 292px;
  background: #ffeed2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #8e8e8e;
  }
`;
