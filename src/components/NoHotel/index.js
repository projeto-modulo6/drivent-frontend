import styled from 'styled-components';

export default function NoHotelDetected() {
  return (
    <Container>
      <Aviso>
        <p>Sua modalidade de ingresso não inclui hospedagem</p>
        <p>Prossiga para a escolha de atividades</p>
      </Aviso>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Aviso = styled.div`
  width: 464px;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    text-align: center;
    color: #8e8e8e;
  }
`;
