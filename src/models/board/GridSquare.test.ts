import GridSquare from './GridSquare';
import Pawn from './pawns/Pawn';

jest.mock('./pawns/Pawn');

test('pawn grid square', () => {
    const gs = new GridSquare(new Pawn('red'), 0, 0);
    expect(gs.pawn instanceof Pawn).toBeTruthy();
});

test('text grid square', () => {
    const gs = new GridSquare('a', 0, 0);
    expect(gs.text).toEqual('a');
});