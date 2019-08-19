import GridSquare from './GridSquare';
import Pawn from './pawns/Pawn';

jest.mock('./pawns/Pawn');

test('grid square has x, y and pawn', () => {
    const gs = new GridSquare(new Pawn('red'), 0, 0);
    expect(gs.pawn instanceof Pawn).toBeTruthy();
});