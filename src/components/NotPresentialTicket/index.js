import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function NotPresentialTicket() {
  return (
    <Container>
      <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
      <Aviso>
        <p>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</p>
      </Aviso>
    </Container>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const Aviso = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  p {
    width: 462px;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23.44px;
    text-align: center;
    color: #8e8e8e;
  }
`;
