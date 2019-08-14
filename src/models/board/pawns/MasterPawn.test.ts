import MasterPawn from './MasterPawn';

test('it should instantiate', () => {
    const pawn = new MasterPawn('red');
    expect(pawn instanceof MasterPawn).toBeTruthy();
});