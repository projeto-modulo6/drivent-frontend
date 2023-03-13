import { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import styled from 'styled-components';

import { HiUser, HiOutlineUser } from 'react-icons/hi';
import { HotelContext } from '../../contexts/HotelContext';

export default function RoomChoiceButton({ id, name, capacity, reserveCount, isChosen }) {
  const [vacancyArr, setVacancyArr] = useState([]);
  const [roomState, setRoomState] = useState('available');
  const { chosenRoom, setChosenRoom } = useContext(HotelContext);
  if (isChosen) {
    console.log(chosenRoom);
  }

  useEffect(() => {
    // define Room state
    const freeSpots = capacity - reserveCount;
    if (freeSpots === 0) {
      setRoomState('full');
    } else if (isChosen === true) {
      setRoomState('chosen');
    } else {
      setRoomState('available');
    }
    console.log('free spots', name, freeSpots);

    // create vacancy array
    const tempArray = [];
    for (let i = 0; i < freeSpots; i++) {
      if (isChosen === true && i === freeSpots - 1) {
        tempArray.push('chosen');
      } else {
        tempArray.push('vacant');
      }
    }

    for (let i = 0; i < reserveCount; i++) {
      tempArray.push('taken');
    }
    console.log('Temp Array', tempArray);
    // assign vacancy array to state
    setVacancyArr(tempArray);
  }, [reserveCount, isChosen]);

  let backColor;

  if (roomState === 'full') {
    backColor = '#cecece';
  } else if (roomState === 'available') {
    backColor = '#ffffff';
  } else {
    backColor = '#FFEED2';
  }

  function reserveSpot() {
    setChosenRoom({ ...chosenRoom, id: id, name: name });
  }

  return (
    <StyledEntry>
      <StyledButton
        backgroundColor={backColor}
        onClick={reserveSpot}
        disabled={roomState === 'available' ? false : true}
      >
        <p>{name}</p>
        <IconHolder>
          {vacancyArr.map((roomPop, idx) => {
            if (vacancyArr[idx] === 'vacant') {
              return (
                <IconContext.Provider value={{ size: '22px' }}>
                  <HiOutlineUser />
                </IconContext.Provider>
              );
            } else if (vacancyArr[idx] === 'taken') {
              return (
                <IconContext.Provider value={{ size: '22px' }}>
                  <HiUser />
                </IconContext.Provider>
              );
            } else {
              return (
                <IconContext.Provider value={{ size: '22px', color: '#FF4791' }}>
                  <HiUser />
                </IconContext.Provider>
              );
            }
          })}
        </IconHolder>
      </StyledButton>
    </StyledEntry>
  );
}

const StyledEntry = styled.li`
  display: flex;
  margin: 0 17px 8px 0px;
`;

const StyledButton = styled.button`
  padding: 0px 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;

  p {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 23.5px;
    margin-left: 3px;
  }
`;

const IconHolder = styled.div`
  display: flex;
`;
