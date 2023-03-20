import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import { getUserActivitiesByActivityId } from '../../services/activityApi';
import { FaSignInAlt } from 'react-icons/fa';
import { BiXCircle } from 'react-icons/bi';

export default function ActivityButton({ id, activityName, seats, startTime, endTime }) {
  const [full, setFull] = useState(false);
  const [userActivitiesLength, setUserActivitiesLength] = useState();
  const token = useToken();

  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const startHour = start.format('HH:mm');
  const endHour = end.format('HH:mm');
  const duration = end.diff(start) / (1000 * 60 * 60);

  useEffect(() => {
    async function getUserActivities() {
      const userActivities = await getUserActivitiesByActivityId(token, id);
      let totalSeats = seats - userActivities.length;
      if (totalSeats === 0) {
        setFull(true);
      }
      setUserActivitiesLength(totalSeats);
    }
    getUserActivities();
  }, []);

  return (
    <ActivityHolder h={`${80 * duration}px`}>
      <LeftInfo>
        <h1>{activityName}</h1>
        <p>
          {startHour} - {endHour}
        </p>
      </LeftInfo>
      <RightInfo>
        {' '}
        {full === true ? (
          <>
            {' '}
            <BiXCircle fill="#CC6666" fontSize={25} /> <h1>Esgotado</h1>
          </>
        ) : (
          <>
            {' '}
            <FaSignInAlt fill="#078632" fontSize={20} /> <p> {userActivitiesLength} Vagas</p>{' '}
          </>
        )}{' '}
      </RightInfo>
    </ActivityHolder>
  );
}

const ActivityHolder = styled.li`
  display: flex;
  border-radius: 5px;
  border: none;
  background-color: #f1f1f1;
  width: 265px;
  min-height: ${(props) => props.h};
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

  p {
    color: #078632;
    font-size: 9px;
    font-weight: 400;
    padding-top: 4px;
  }
  h1 {
    color: #cc6666;
    font-size: 9px;
    font-weight: 400;
    padding-top: 4px;
  }
`;