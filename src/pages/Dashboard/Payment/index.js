import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import OptionsContainer from '../../../components/PaymentComponents/OptionsContainer';
import TicketTypeReservation from '../../../components/PaymentComponents/TicketTypeChoice/TicketTypeReservation';

export default function Payment() {
  const [reserved, setReserved] = useState(false);
  const [paid, setPaid] = useState(false);
  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {!reserved ? <TicketTypeReservation /> : 'Adicionar AQUI o Componente de Pagamento'}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
