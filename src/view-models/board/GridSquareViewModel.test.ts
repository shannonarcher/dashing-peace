import GridSquareViewModel from './GridSquareViewModel';

test('it creates a grid square view model', () => {
  const g = new GridSquareViewModel('', '', 'yo', 0, 0);
  expect(g.text).toEqual('yo');
});