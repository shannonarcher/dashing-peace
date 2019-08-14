import Coordinate from './Coordinate';

test('it has x, y', () => {
    const coordinate = new Coordinate(1, 2);
    expect(coordinate.x).toBe(1);
    expect(coordinate.y).toBe(2);
});