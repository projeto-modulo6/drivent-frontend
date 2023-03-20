import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useGetLocaleActivitiesByDay from '../../hooks/api/useGetLocaleActivitiesByDay';
import ActivityButton from './ActivityButton';

export default function LocaleContainer({ localeName, localeId, dayId, reRenderBool }) {
  const [dayActivities, setDayActivities] = useState([]);
  const [userId, setUserId] = useState('');
  const { getLocaleActivitiesByDay } = useGetLocaleActivitiesByDay();
  useEffect(() => {
    async function retrieveDayActivities() {
      try {
        const activities = await getLocaleActivitiesByDay(dayId, localeId);
        setDayActivities(activities.activities);
        setUserId(activities.userId);
      } catch (err) {
        console.log(err);
      }
    }

    retrieveDayActivities();
  }, [dayId]);

  return (
    <Locale>
      <LocaleTitle>{localeName}</LocaleTitle>
      <ActivityContainer>
        {dayActivities.map((activity) => (
          <ActivityButton
            key={activity.id}
            id={activity.id}
            activityName={activity.name}
            seats={activity.seats}
            startTime={activity.begin}
            endTime={activity.end}
            userId={userId}
            reRenderBool={reRenderBool}
            dayId={dayId}
            localeId={localeId}
          />
        ))}
      </ActivityContainer>
    </Locale>
  );
}

const Locale = styled.li`
  display: flex;
  flex-direction: column;
  width: 288px;
`;

const LocaleTitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  line-height: 19.92px;
  color: #7b7b7b;
  text-align: center;
`;

const ActivityContainer = styled.ul`
  height: 390px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d7d7d7;
  overflow-y: auto;
  overflow-x: hidden;
`;
