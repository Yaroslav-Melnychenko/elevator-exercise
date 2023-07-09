import { useState, useEffect, useCallback } from 'react';
import Elevator from '../Elevator';
import {
  getInitialElevatorsState,
  ElevatorInterface,
  getClosestElevatorId
} from './utils';
import FloorActions from '../FloorActions/FloorActions';
import elevatorPingUrl from '../../assets/audios/elevator_ping.mp3';
import styles from './Building.module.scss';

interface Props {
  floorsNumber: number,
  elevatorsNumber: number
}

const Building: React.FC<Props> = ({ floorsNumber, elevatorsNumber }) => {
  const [elevators, setElevators] = useState<ElevatorInterface[]>(getInitialElevatorsState(elevatorsNumber));

  // Next to states we need to implement this feature from requirements
  // "the elevator will arrive at the floor in the order it was called"
  const [busyElevatorsIds, setBusyElevatorsIds] = useState<number[]>([]);
  const [floorsQueue, setFloorsQueue] = useState<number[]>([]);

  const addBusyElevatorToStack = (elevatorId: number) => {
    // We are adding busy elevator
    setBusyElevatorsIds(prevIds => [...prevIds, elevatorId]);

    // Elevator is going for 5 sec, we need to remove it from the busy list after this time
    setTimeout(() => {
      setBusyElevatorsIds(prevIds => {
        const index = prevIds.findIndex(id => elevatorId === id);
        const newBusyElevatorsArray = [...prevIds];
        newBusyElevatorsArray.splice(index, 1);
        return newBusyElevatorsArray;
      });
      new Audio(elevatorPingUrl).play();
    }, 5000);
  }

  const callElevator = useCallback((floor: number) => {
    // We are finding the closest elevator
    const elevatorId = getClosestElevatorId(
      elevators.filter(elevator => !busyElevatorsIds.includes(elevator.id)),
      floor
    );
    const elevatorIndex = elevators.findIndex(elevator => elevator.id === elevatorId);

    if (elevatorIndex !== -1) {
      // Changing the elevator floor
      const updatedElevators = structuredClone(elevators);
      updatedElevators[elevatorIndex].floor = floor;

      addBusyElevatorToStack(elevatorId);
      setElevators(updatedElevators);
    }
  }, [busyElevatorsIds, elevators]);

  useEffect(() => {
    // If we have at least one floors that elevator need to go
    // And we have at least one elevator that not busy
    // We can execute callElevator() method and pass floor number from floors queue
    if (floorsQueue.length > 0 && (busyElevatorsIds.length !== elevators.length)) {
      const newFloorsQueue = [...floorsQueue];
      newFloorsQueue.splice(0, 1);
      callElevator(floorsQueue[0]);
      setFloorsQueue(newFloorsQueue);
    }
  }, [floorsQueue, busyElevatorsIds.length, elevators.length, callElevator]);

  return (
    <div className={styles.container} style={{ width: (elevators.length) * 100 + 150 }}>
      <div className={styles.floors}>
        {[...Array(floorsNumber)].map((_, index, floorsArray) => {
          const floorNumber = floorsArray.length - 1 - index;
          return (
            <div key={index} className={styles.floor} data-testid="floor">
              <FloorActions
                key={index}
                disabled={Boolean(
                  elevators.find(elevator => elevator.floor === floorNumber)
                  || floorsQueue.includes(floorNumber)
                )}
                floorNumber={floorNumber}
                callElevator={() => {
                  if (busyElevatorsIds.length !== elevators.length) {
                    // If there are available elevator
                    // call it to the required floor
                    callElevator(floorNumber);
                  } else {
                    // If there are no available elevators
                    // create a queue of floors
                    setFloorsQueue([...floorsQueue, floorNumber]);
                  }
                }}
              />
              {floorsArray.length - 1 === index && (
                <div className={styles.elevators}>
                  {elevators.map((elevator, index) => (
                    <div key={index} className={styles.elevatorItem} data-testid="elevator">
                      <Elevator floor={elevator.floor} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default Building;
