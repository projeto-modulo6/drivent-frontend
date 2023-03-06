import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { formatCreditCardNumber, formatExpirationDate, formatCVC, errors, clearNumber } from './utils';
import Payment from 'payment';
import { toast } from 'react-toastify';
import useSaveTicketPayment from '../../../hooks/api/useSaveTicketPayment';

export default function CreditCard({ ticket, setPaid, ticketId }) {
  const { saveTicketPaymentLoading, saveTicketPaymentError, saveTicketPayment } = useSaveTicketPayment();
  const [disabled, setDisabled] = React.useState(false);
  const [card, setCard] = React.useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    issuer: '',
  });
  const [error, setError] = React.useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  function handleInputFocus(e) {
    let hi = { ...card };
    hi.focus = e.target.name;
    setCard(hi);
  }

  function handleInputChange({ target }) {
    let cardObject = { ...card };
    let objectError = { ...error };

    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
      const issuer = Payment.fns.cardType(target.value);
      if (issuer === null) {
        cardObject.issuer = '';
      } else {
        cardObject.issuer = issuer;
      }
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    }

    cardObject[target.name] = target.value;
    objectError[target.name] = '';

    setCard(cardObject);
    setError(objectError);
  }

  async function submit(e) {
    e.preventDefault();
    let objectError = { ...error };
    let errorBolean = errors(objectError, card);
    setDisabled(true);

    if (errorBolean) {
      setError(objectError);
      setDisabled(false);
      return;
    }

    const body = {
      ticketId: ticketId,
      cardData: {
        issuer: card.issuer,
        number: clearNumber(card.number),
        name: card.name,
        expirationDate: card.expiry,
        cvv: card.cvc,
      },
    };

    try {
      await saveTicketPayment(body);
      toast('Ingresso pago com sucesso!');
      setPaid(true);
    } catch (err) {
      console.log(err);
      toast('Houve um erro ao fazer o pagamento.');
      setDisabled(false);
    }
  }

  return (
    <>
      <Title>Pagamento</Title>

      <form onSubmit={submit}>
        <div id="PaymentForm">
          <BoxCard>
            <Cards
              class="card"
              cvc={card.cvc}
              expiry={card.expiry}
              focused={card.focus}
              name={card.name}
              number={card.number}
            />

            <BoxInputs>
              <NumberInput>
                <Input
                  variant="outlined"
                  label="Card Number"
                  type="tel"
                  name="number"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  size="small"
                  error={error.number}
                  helperText={error.number}
                />
                {error.number ? null : <h1>E.g.: 49...,51...,36...,37...</h1>}
              </NumberInput>
              <NameInput>
                <Input
                  type="tel"
                  name="name"
                  label="Name"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  variant="outlined"
                  size="small"
                  error={error.name}
                  helperText={error.name}
                />
              </NameInput>
              <ExpiryCVC>
                <ExpiryInput>
                  <Input
                    type="tel"
                    name="expiry"
                    label="Valid Thru"
                    pattern="\d\d/\d\d"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    variant="outlined"
                    size="small"
                    error={error.expiry}
                    helperText={error.expiry}
                  />
                </ExpiryInput>
                <CVCInput>
                  <Input
                    type="tel"
                    name="cvc"
                    label="CVC"
                    pattern="\d{3}"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    variant="outlined"
                    size="small"
                    error={error.cvc}
                    helperText={error.cvc}
                  />
                </CVCInput>
              </ExpiryCVC>
            </BoxInputs>
          </BoxCard>
        </div>
        <Button disabled={disabled}>FINALIZAR PAGAMENTO</Button>
      </form>
    </>
  );
}

const Title = styled.h1`
  color: #8e8e8e;
  font-size: 20px;
  font-weight: 400;
  font-family: 'Roboto';
`;

const BoxCard = styled.div`
  display: flex;
  margin-top: 25px;
  color: blue;
  max-width: 686px;
  .rccs {
    margin-left: 0px;
  }
`;

const BoxInputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  justify-content: space-between;
  height: 183px;
`;

const Input = styled(TextField)`
  width: 100%;
`;

const NumberInput = styled.div`
  width: 100%;
  height: 40px;
  border: solid black 0px;
  margin-bottom: 20px;
  h1 {
    font-size: 14px;
    color: #9e9e9e;
    font-weight: 400;
    font-family: Roboto;
    margin-top: 5px;
  }
`;

const NameInput = styled.div`
  width: 100%;
  height: 40px;
  border: solid black 0px;
  margin-bottom: 10px;
`;

const ExpiryInput = styled.div`
  width: 100%;
  height: 40px;
  border: solid black 0px;
  margin-right: 20px;
`;

const CVCInput = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: solid black 0px;
`;

const ExpiryCVC = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 182px;
  height: 37px;
  background: #e0e0e0;
  border-radius: 4px;
  border: 0px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  margin-top: 55px;
  font-size: 14px;
  font-family: 'Roboto';
  font-weight: 400;
  cursor: pointer;
  :active {
    background-color: #c0c0c0;
  }
`;
