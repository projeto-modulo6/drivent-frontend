import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import OptionsContainer from '../../../components/OptionsContainer';
import { useState } from 'react';

export default function Payment() {
  const [isRemote, setIsRemote] = useState(false);
  const [hasHotel, setHasHotel] = useState(false);
  const [ticket, setTicket] = useState({ isRemote: null, hasHotel: null });
  const [reserved, setReserved] = useState(false);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      <OptionsContainer
        title="Primeiro, escolha sua modalidade de ingresso"
        optionToTrue="Online"
        priceToTrue={100}
        optionToFalse="Presencial"
        priceToFalse={250}
        setIsParam={setIsRemote}
      />
      {isRemote ? (
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
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
