import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDateWithActivities from '../../hooks/api/useDateWithActivity';
import ButtonDay from './ButtonDay';

export default function ActivityDay({ dayId, setDayId, setReRenderBool, reRenderBool }) {
  const [daySelected, setDaySelected] = useState(false);
  const { dateWithActivities, dateWithActivitiesLoading, dateWithActivitiesError } = useDateWithActivities();
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    async function getDates() {
      try {
        const dates = await dateWithActivities();
        setActivities(dates);
      } catch (err) {
        console.log(err);
      }
    }
    getDates();
  }, []);

  function getDay(date) {
    let weekDay = '';
    /* eslint-disable */
    switch (date.day()) {
      case 0:
        weekDay = 'Domingo';
        break;
      case 1:
        weekDay = 'Segunda';
        break;
      case 2:
        weekDay = 'Terça';
        break;
      case 3:
        weekDay = 'Quarta';
        break;
      case 4:
        weekDay = 'Quinta';
        break;
      case 5:
        weekDay = 'Sexta';
        break;
      case 6:
        weekDay = 'Sábado';
        break;
      default:
        break;
    }
    /* eslint-enable */
    return weekDay + ', ' + date.format('DD/MM');
  }
  return (
    <>
      <div>
        {daySelected ? null : <Text>Primeiro, filtre pelo dia do evento: </Text>}
        <Box>
          {activities.map((item) => (
            <ButtonDay
              dayId={dayId}
              setDayId={setDayId}
              setDaySelected={setDaySelected}
              getDay={getDay}
              item={item}
              setReRenderBool={setReRenderBool}
              reRenderBool={reRenderBool}
            ></ButtonDay>
          ))}
        </Box>
      </div>
    </>
  );
}

const Box = styled.div`
  display: flex;
`;

const Text = styled.h1`
  font-size: 20px;
  font-family: 'Roboto';
  color: #8e8e8e;
  margin-bottom: 25px;
`;
