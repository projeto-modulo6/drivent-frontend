import styled from 'styled-components';

export default function ActivityComponent({ id, name, begin, end, seats }) {
  return (
    <>
      <ActivityComponentStyle>
        <div>
          <h1>Minecraft: montando o PC ideal</h1>
          <p>09:00 - 10:00</p>
        </div>
      </ActivityComponentStyle>
    </>
  );
}

const ActivityComponentStyle = styled.div`
  display: flex;
  max-width: 265px;
  height: 79px;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 12px;
  font-size: 12px;
  h1 {
    color: #343434;
    font-weight: 700;
    padding-bottom: 6px;
  }
  div{
    
  }
`;
