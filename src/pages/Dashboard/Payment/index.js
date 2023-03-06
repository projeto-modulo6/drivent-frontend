import styled from 'styled-components';
import PaymentSummary from '../../../components/PaymentSummary';
import NoEnrollmentDetected from '../../../components/NoEnrollment';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import useToken from '../../../hooks/useToken';
import { Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import OptionsContainer from '../../../components/PaymentComponents/OptionsContainer';
import TicketTypeReservation from '../../../components/PaymentComponents/TicketTypeChoice/TicketTypeReservation';

export default function Payment() {
  const [reserved, setReserved] = useState(false);
  const [paid, setPaid] = useState(false);
  const [enrollment, setEnrollment] = useState(true);
  const token = useToken();

  useEffect(() => {
    getPersonalInformations(token)
      .then((res) => {
        setEnrollment(true);
      })
      .catch((err) => {
        setEnrollment(false);
      });
  }, []);

  if (enrollment === false) {
    return (
      <>
        <NoEnrollmentDetected />
      </>
    );
  }
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
