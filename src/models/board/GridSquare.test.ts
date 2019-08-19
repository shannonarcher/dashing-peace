import GridSquare from './GridSquare';
import Pawn from './pawns/Pawn';

jest.mock('./pawns/Pawn', () => {
    class Pawn {
        color: string;
        constructor(color: string) {
            this.color = color;
        }
    }
    return Pawn;
});

test('grid square has x, y and pawn', () => {
    const gs = new GridSquare(new Pawn('red'), 0, 0);
    expect(gs.pawn instanceof Pawn).toBeTruthy();
    expect(gs.archOfTheTemple).toBeUndefined();
});

test('grid square is an arch of the temple', () => {
    const gs = new GridSquare(new Pawn('red'), 0, 0, true);
    expect(gs.archOfTheTemple).toEqual('red');
});