import Team from './Team';
import StudentPawn from 'models/board/pawns/StudentPawn';
import MasterPawn from 'models/board/pawns/MasterPawn';

jest.mock('models/board/pawns/MasterPawn');
jest.mock('models/board/pawns/StudentPawn');

it('should have a master pawn', () => {
    const t = new Team('magenta');
    expect(t.master instanceof MasterPawn).toBeTruthy();
});

it('should have 4 student pawns', () => {
    const t = new Team('cyan');
    expect(t.students.length).toEqual(4);
    expect(t.students.every(p => p instanceof StudentPawn)).toBeTruthy();
});