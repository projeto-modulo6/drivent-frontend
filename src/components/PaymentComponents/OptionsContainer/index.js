import { useState } from 'react';
import styled from 'styled-components';

export default function OptionsContainer({
  title,
  optionToTrue,
  optionToFalse,
  priceToTrue,
  priceToFalse,
  setIsParam,
  ticket,
  setTicket,
}) {
  const [isClicked1, setIsClicked1] = useState('branco');
  const [isClicked2, setIsClicked2] = useState('branco');

  function click1() {
    setIsClicked1('vermelho');
    setIsClicked2('branco');
  }

  function click2() {
    setIsClicked1('branco');
    setIsClicked2('vermelho');
  }

  return (
    <>
      <OptionsContainerStyle>
        <h6>{title}</h6>
        <Options>
          <Option
            className={isClicked1}
            onClick={() => {
              setIsParam(false);
              click1();
            }}
          >
            <p>{optionToFalse}</p>
            <h6>R$ {priceToFalse}</h6>
          </Option>
          <Option
            className={isClicked2}
            onClick={() => {
              setIsParam(true);
              click2();
            }}
          >
            <p>{optionToTrue}</p>
            <h6>R$ {priceToTrue}</h6>
          </Option>
        </Options>
      </OptionsContainerStyle>
    </>
  );
}

const OptionsContainerStyle = styled.div`
  height: 32%;
  width: auto;
  margin-top: 17px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;

  h6 {
    color: #8e8e8e;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
  }
`;

const Options = styled.div`
  height: auto;
  width: auto;
  display: flex;
  margin-top: 1px;

  .branco {
    border: 1px solid #cecece;
  }
  .vermelho {
    background-color: #ffeed2;
  }
`;

const Option = styled.div`
  height: 145px;
  width: 145px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin-right: 24px;
  cursor: pointer;
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
  }
  h6 {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }
`;
