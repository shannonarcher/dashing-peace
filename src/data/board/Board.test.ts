import Board from './Board';

jest.mock('data/board/Team', () => function() {
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

it('should create the starting board state', () => {
    const board = new Board();

    expect(board.grid.length).toBe(5);
    expect(board.grid[0].length).toBe(5);

    expect(board.grid[0]).toEqual(
        [1, 2, 'm', 3, 4],
    );
    expect(board.grid[board.grid.length - 1]).toEqual(
        [1, 2, 'm', 3, 4],
    );
});
