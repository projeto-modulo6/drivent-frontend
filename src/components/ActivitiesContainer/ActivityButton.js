import dayjs from 'dayjs';
import styled from 'styled-components';

export default function ActivityButton({ id, activityName, seats, startTime, endTime }) {
  let startHour = dayjs(startTime).format('HH:mm');
  let endHour = dayjs(endTime).format('HH:mm');

  return (
    <ActivityHolder>
      <LeftInfo>
        <h1>{activityName}</h1>
        <p>
          {startHour} - {endHour}
        </p>
      </LeftInfo>
      <RightInfo> ícone </RightInfo>
    </ActivityHolder>
  );
}

const ActivityHolder = styled.li`
  display: flex;
  border-radius: 5px;
  border: none;
  background-color: #f1f1f1;
  width: 265px;
  height: 79px;
  padding-top: 10px;
  padding-bottom: 9px;
  box-sizing: border-box;
  margin: 10px 11px;
`;

const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #cfcfcf;
  width: 199px;
  padding-left: 10px;
  box-sizing: border-box;

  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    line-height: 14px;
    font-weight: 700;
    margin-bottom: 6px;
    margin-top: 2px;
  }

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    line-height: 14px;
  }
`;

const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 66px;
`;
