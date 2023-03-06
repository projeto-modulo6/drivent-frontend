import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getPersonalInformations } from '../../services/enrollmentApi';
import { getTicketByEnrollmentId } from '../../services/ticketApi1';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';

export default function PaymentSummary() {
  const [preco, setPreco] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');
  const [presencial, setPresencial] = useState('Presencial');
  const [hotel, setHotel] = useState('Com Hotel');

  const token = useToken();

  useEffect(() => {
    getPersonalInformations(token)
      .then((res) => {
        console.log(res.data.id, 'RES.DATA.ID AQUI');
        setEnrollmentId(res.data.id);
        useEffect(() => {
          getTicketByEnrollmentId(token, enrollmentId)
            .then((res) => {
              setPreco(res.data.price);
              if (res.data.isRemote === true) {
                setPresencial('Remoto');
              }
              if (res.data.includesHotel === false) {
                setHotel('Sem hotel');
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <p>Ingresso escolhido</p>
      <TicketSummary>
        <p>
          {presencial} + {hotel}
        </p>
        <p>R$ {preco}</p>
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
