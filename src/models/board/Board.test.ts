import Board from './Board';
import Player from 'models/player/Player';
import Card from 'models/card/Card';
import CardMap from 'models/card/CardMap';
import Pawn from './pawns/Pawn';
import BoardViewModel from 'view-models/board/BoardViewModel';

jest.mock('models/player/Player');
jest.mock('models/card/Card');
jest.mock('models/card/CardMap');
jest.mock('models/board/pawns/StudentPawn');
jest.mock('models/board/team/Team', () => function() {
    return {
        students: [
            1,
            2,
            3,
            4
        ],
        master: 'm',
    };
});
jest.mock('view-models/board/BoardViewModel');

const card = new Card('ox', new CardMap('ox'));

test('it should create the starting board state', () => {
    const player = new Player('red', true, card, card);
    const board = new Board(player, player);

    expect(board.grid.length).toBe(6);
    expect(board.grid[0].length).toBe(6);
});

test('it should get the grid square', () => {
    const player = new Player('red', true, card, card);
    const board = new Board(player, player);

    const sq = board.at(1, 1);
    expect(sq.x).toBe(1);
    expect(sq.y).toBe(1);
});

test('it should throw an error when getting an out of bounds gridsquare', () => {
    const player = new Player('red', true, card, card);
    const board = new Board(player, player);

    expect(() => {
        board.at(5, 10);
    }).toThrowError('out of bounds');
});

test('it should get a coordinate from a string', () => {
    expect(Board.from('a1')).toEqual({ x: 1, y: 1 });
    expect(Board.from('a2')).toEqual({ x: 2, y: 1 });
    expect(Board.from('a3')).toEqual({ x: 3, y: 1 });
    expect(Board.from('a4')).toEqual({ x: 4, y: 1 });
    expect(Board.from('a5')).toEqual({ x: 5, y: 1 });

    expect(Board.from('b1')).toEqual({ x: 1, y: 2 });
    expect(Board.from('b2')).toEqual({ x: 2, y: 2 });
    expect(Board.from('b3')).toEqual({ x: 3, y: 2 });
    expect(Board.from('b4')).toEqual({ x: 4, y: 2 });
    expect(Board.from('b5')).toEqual({ x: 5, y: 2 });

    expect(Board.from('c1')).toEqual({ x: 1, y: 3 });
    expect(Board.from('c2')).toEqual({ x: 2, y: 3 });
    expect(Board.from('c3')).toEqual({ x: 3, y: 3 });
    expect(Board.from('c4')).toEqual({ x: 4, y: 3 });
    expect(Board.from('c5')).toEqual({ x: 5, y: 3 });

    expect(Board.from('d1')).toEqual({ x: 1, y: 4 });
    expect(Board.from('d2')).toEqual({ x: 2, y: 4 });
    expect(Board.from('d3')).toEqual({ x: 3, y: 4 });
    expect(Board.from('d4')).toEqual({ x: 4, y: 4 });
    expect(Board.from('d5')).toEqual({ x: 5, y: 4 });

    expect(Board.from('e1')).toEqual({ x: 1, y: 5 });
    expect(Board.from('e2')).toEqual({ x: 2, y: 5 });
    expect(Board.from('e3')).toEqual({ x: 3, y: 5 });
    expect(Board.from('e4')).toEqual({ x: 4, y: 5 });
    expect(Board.from('e5')).toEqual({ x: 5, y: 5 });
});

test('it should move the pawn from one position to another', () => {
    const player = new Player('red', true, card, card);
    const board = new Board(player, player);

    const pawn = board.grid[1][1].pawn;

    board.set(1, 2, pawn);
    expect(board.at(1, 1).pawn).toBeUndefined();
    expect(board.at(1, 2).pawn).toEqual(pawn);
});

test('it should throw an error if there is no pawn to move', () => {
    const player = new Player('red', true, card, card);
    const board = new Board(player, player);

    const pawn = new Pawn('red');
    expect(() => {
        board.set(1, 1, pawn);
    }).toThrowError('pawn doesnt exist');
});

test('it should get/set the active team', () => {
    const player = new Player('red', true, card, card);
    const board = new Board(player, player);

    const newPlayer = new Player('blue', true, card, card);
    board.activeTeam = newPlayer;
    expect(board.activeTeam).toBe(newPlayer);
});

test('it should have a view model', () => {
    const player = new Player('red', true, card, card);
    const board = new Board(player, player);
    expect(board.viewModel instanceof BoardViewModel).toBeTruthy();
});