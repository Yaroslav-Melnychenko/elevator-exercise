import { render, screen } from '@testing-library/react';
import Building from './Building';



describe('Test Building component', () => {
  test('renders without crashing', () => {
    render(<Building floorsNumber={100} elevatorsNumber={10} />);
  });

  test('renders the correct number of floors and elevators', () => {
    const floorsNumber = 1000;
    const elevatorsNumber = 25;
  
    render(<Building floorsNumber={floorsNumber} elevatorsNumber={elevatorsNumber} />);
  
    const floors = screen.getAllByTestId('floor');
    const elevators = screen.getAllByTestId('elevator');
  
    expect(floors.length).toBe(floorsNumber);
    expect(elevators.length).toBe(elevatorsNumber);
  });
});
