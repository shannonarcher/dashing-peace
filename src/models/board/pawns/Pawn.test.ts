import Pawn from './Pawn';

test('it should instantiate', () => {
    const pawn = new Pawn('red');
    expect(pawn instanceof Pawn).toBeTruthy();
    expect(pawn.color).toBe('red');
    expect(pawn.id).toBe(0);
});