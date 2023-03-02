import styled from 'styled-components';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function ConfirmedPaymentContainer() {
  return (
    <>
      <ConfirmatedPaymentContainerStyle>
        <h6>Pagamento</h6>
        <ConfirmatedPaymentCheckContainerStyle>
          <AiFillCheckCircle
            size="40px"
            color="#36B853
"
          />
          <div>
            <h5>Pagamento confirmado!</h5>
            <h6>Prossiga para escolha de hospedagem e atividades</h6>
          </div>
        </ConfirmatedPaymentCheckContainerStyle>
      </ConfirmatedPaymentContainerStyle>
    </>
  );
}

const ConfirmatedPaymentContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  h6 {
    color: #8e8e8e;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    padding-bottom: 17px;
  }
`;

const ConfirmatedPaymentCheckContainerStyle = styled.div`
  display: flex;
  div {
    padding-left: 13px;
    font-size: 16px;
    color: #454545;
    h5 {
      font-weight: 700;
    }
    h6 {
      color: #454545;
      font-family: 'Roboto', sans-serif;
    }
  }
`;
