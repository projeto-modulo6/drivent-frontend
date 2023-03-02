import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import OptionsContainer from '../../../components/OptionsContainer';
import { useState } from 'react';
import ConfirmationContainer from '../../../components/ConfirmationContainer';

export default function Payment() {
  const [isRemote, setIsRemote] = useState(false);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      <OptionsContainer
        title="Primeiro, escolha sua modalidade de ingresso"
        optionToTrue="Online"
        priceToTrue="100"
        optionToFalse="Presencial"
        priceToFalse="250"
        setIsParam={setIsRemote}
      />
      <ConfirmationContainer finalPrice={100} />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
