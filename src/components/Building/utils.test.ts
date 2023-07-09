import { getClosestElevatorId } from './utils';

describe('Check closest elevators calculation', () => {
  test('Check with one elevator', () => {
    expect(getClosestElevatorId([
      { id: 1, floor: 0 }
    ], 10)).toBe(1)
  });

  test('Check with two elevators', () => {
    expect(getClosestElevatorId([
      { id: 1, floor: 0 }, { id: 2, floor: 5 }
    ], 8)).toBe(2)
  });

  test('Check with 5 elevators', () => {
    expect(getClosestElevatorId([
      { id: 1, floor: 0 }, { id: 2, floor: 5 }, { id: 3, floor: 1 }, { id: 4, floor: 2 }, { id: 5, floor: 6 }
    ], 8)).toBe(5)
  });
});