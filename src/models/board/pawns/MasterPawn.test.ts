import MasterPawn from './MasterPawn';

test('it should instantiate', () => {
    const pawn = new MasterPawn('red');
    expect(pawn instanceof MasterPawn).toBeTruthy();
    expect(pawn.color).toBe('red');
    expect(pawn.type).toBe('master');
});