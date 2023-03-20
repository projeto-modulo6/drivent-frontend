import styled from 'styled-components';

export default function NoEnrollmentDetected({ text }) {
  return (
    <Container>
      <Aviso>
        <p>{text}</p>
      </Aviso>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Aviso = styled.div`
  width: 390px;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    text-align: center;
    color: #8e8e8e;
  }
`;
