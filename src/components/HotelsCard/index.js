import styled from 'styled-components';

export default function CardHotels({ name, image }) {
  return (
    <>
      <CardHotelsStyle>
        <img src="https://i2.wp.com/blogchicosoares.com/wp-content/uploads/2021/12/FLA.jpg?fit=636%2C371&ssl=1"></img>
        <h1>Flamengo Resort</h1>
        <strong>Tipos de Acomodação</strong>
        <p>Single e Double</p>
        <strong>Vagas Disponíveis</strong>
        <p>103</p>
      </CardHotelsStyle>
    </>
  );
}

const CardHotelsStyle = styled.div`
  display: flex;
  max-width: 196px;
  flex-direction: column;
  background-color: #ebebeb;
  border-radius: 10px;
  font-size: 12px;
  color: #3c3c3c;
  box-sizing: border-box;
  padding: 14px;
  font-family: 'Roboto', sans-serif;
  img {
    width: 168px;
    height: 109px;
    object-fit: cover;
    border-radius: 5px;
    padding-bottom: 10px;
  }
  h1 {
    color: #343434;
    font-size: 20px;
    padding-bottom: 10px;
  }
  p {
    padding-bottom: 14px;
    padding-top: 3px;
  }
  p:last-child {
    padding-bottom: 0px;
  }
`;
