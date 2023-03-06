import styled from 'styled-components';
import PaymentSummary from '../../../components/PaymentSummary';
import NoEnrollmentDetected from '../../../components/NoEnrollment';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import useToken from '../../../hooks/useToken';
import { Typography } from '@material-ui/core';
import OptionsContainer from '../../../components/OptionsContainer';
import { useState, useEffect } from 'react';
import dotenv from 'dotenv';

dotenv.config();

export default function Payment() {
  const [isRemote, setIsRemote] = useState(false);
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
      <OptionsContainer
        title="Primeiro, escolha sua modalidade de ingresso"
        optionToTrue="Online"
        priceToTrue="100"
        optionToFalse="Presencial"
        priceToFalse="250"
        setIsParam={setIsRemote}
      />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
