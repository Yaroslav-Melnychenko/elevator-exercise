export interface ElevatorInterface {
  id: number;
  floor: number;
}

export const getInitialElevatorsState = (count: number): ElevatorInterface[] => [...Array(count)]
  .map((_, index) => ({
    id: index  + 1,
    floor: 0
  }));

// We are checking the distance:
// "When multiple elevators exist in the same building,
// and a person calls an elevator, you should detect the one that can arrive faster"
export const getClosestElevatorId = (elevators: ElevatorInterface[], floorDestination: number): number => {
  let distance: number = Infinity;
  let targetIndex: number = -1

  elevators.forEach((elevator, index) => {
    const currentDistance = Math.abs(floorDestination - elevator.floor);
    if (currentDistance < distance) {
      distance = currentDistance;
      targetIndex = index;
    }
  });

  if (targetIndex !== -1) {
    return elevators[targetIndex].id
  }

  return elevators[0]?.id || -1;
}