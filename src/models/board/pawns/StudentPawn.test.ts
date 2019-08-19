import StudentPawn from './StudentPawn';

test('it should instantiate', () => {
    const pawn = new StudentPawn('red', 1);
    expect(pawn instanceof StudentPawn).toBeTruthy();
    expect(pawn.color).toBe('red');
    expect(pawn.id).toBe(1);
    expect(pawn.type).toBe('student');
});