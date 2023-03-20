import dayjs from 'dayjs';
import styled from 'styled-components';

export default function ButtonDay({ dayId, setDayId, getDay, setDaySelected, item, setReRenderBool, reRenderBool }) {
  function select() {
    setDaySelected(true);
    setDayId(item.id);
    setReRenderBool(!reRenderBool);
  }
  return (
    <>
      <Button boolean={dayId === item.id} onClick={select}>
        {getDay(dayjs(item.date))}
      </Button>
    </>
  );
}

const Button = styled.button`
  cursor: pointer;
  width: 131px;
  height: 37px;
  background: ${(props) => (props.boolean ? '#FFD37D' : '#e0e0e0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: 0px;
  margin-right: 17px;
  font-family: 'Roboto';
  font-size: 14px;
`;
