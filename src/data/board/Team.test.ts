import Team from './Team';
import StudentPawn from './StudentPawn';
import MasterPawn from './MasterPawn';

jest.mock('./MasterPawn');
jest.mock('./StudentPawn');

it('should have a master pawn', () => {
    const t = new Team('magenta');
    expect(t.master instanceof MasterPawn).toBeTruthy();
});

it('should have 4 student pawns', () => {
    const t = new Team('cyan');
    expect(t.students.length).toEqual(4);
    expect(t.students.every(p => p instanceof StudentPawn)).toBeTruthy();
});