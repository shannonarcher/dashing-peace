import Referee from './Referee';
import Player from 'models/player/Player';
import Board from 'models/board/Board';
import GridSquare from 'models/board/GridSquare';
import Card from 'models/card/Card';
import CardMap from 'models/card/CardMap';
import MasterPawn from 'models/board/pawns/MasterPawn';
import StudentPawn from 'models/board/pawns/StudentPawn';

jest.mock('models/player/Player');
jest.mock('models/board/Board');
jest.mock('models/board/GridSquare');
jest.mock('models/card/Card');
jest.mock('models/card/CardMap');
jest.mock('models/board/pawns/MasterPawn');
jest.mock('models/board/pawns/StudentPawn');

function setup() {
    const card = new Card('ox', new CardMap('ox'));
    const p1 = new Player('red', true, card, card);
    const p2 = new Player('blue', true, card, card);
    Object.defineProperty(p1, 'color', {value: 'red'});
    Object.defineProperty(p2, 'color', {value: 'blue'});
    p1.findMatchingCard = jest.fn().mockReturnValue({
        getRelativePosition: () => {},
    });
    Board.from = jest.fn().mockReturnValue({});
    const board = new Board(p1, p2);
    board.at = jest.fn().mockReturnValue({pawn: {color: 'red'}});

    return {
        card,
        p1,
        p2,
        board,
    };
}

describe('Referee', () => {
    describe('when judging a move', () => {
        test('illegal coordinate', () => {
            const {p1, board} = setup();
            expect(Referee.judgeMove(
                p1, board, 'invalid', 'ox', 1,
            )).toBeFalsy();
        });

        test('subject pawn doesnt exist', () => {
            const {p1, board} = setup();
            board.at = jest.fn().mockReturnValue(new GridSquare(undefined, 0, 0));
            
            expect(Referee.judgeMove(
                p1, board, 'a1', 'ox', 1,
            )).toBeFalsy();
        });

        test('subject pawn belongs to other player', () => {
            const {p1, board} = setup();

            Object.defineProperty(p1, 'color', { value: 'red' });
            board.at = jest.fn().mockReturnValue({pawn: {color: 'blue'}});

            expect(Referee.judgeMove(
                p1, board, 'a1', 'ox', 1,
            )).toBeFalsy();
        });

        test('player has card being used', () => {
            const {p1, board} = setup();
            p1.findMatchingCard = jest.fn().mockReturnValue(undefined);
            expect(Referee.judgeMove(
                p1, board, 'a1', 'ox', 1,
            )).toBeFalsy();
        });

        test('card has the position being requested', () => {
            const {p1, board} = setup();
            p1.findMatchingCard = jest.fn().mockReturnValue(
                {
                    getRelativePosition: jest.fn().mockImplementation(() => {
                        throw new Error();
                    }),
                }
            );

            expect(Referee.judgeMove(
                p1, board, 'a1', 'ox', 1,
            )).toBeFalsy();
        });

        test('subject pawn can move to the target position', () => {
            const {p1, board} = setup();
            board.at = jest.fn()
                .mockImplementation(() => ({
                    pawn: {
                        color: 'red',
                    }
                }));
            p1.findMatchingCard = jest.fn().mockReturnValue({
                getRelativePosition: () => ({
                    x: 0,
                    y: 0,
                }),
            });
            
            expect(Referee.judgeMove(
                p1, board, 'a1', 'ox', 1,
            )).toBeFalsy();
        });

        test('target position is within bounds of the board', () => {
            const {p1, board} = setup();
            board.at = jest.fn()
                .mockImplementationOnce(() => ({
                    pawn: {
                        color: 'red',
                    },
                }))
                .mockImplementationOnce(() => {
                    throw new Error();
                });
            p1.findMatchingCard = jest.fn().mockReturnValue({
                getRelativePosition: () => ({
                    x: 0,
                    y: 0,
                }),
            });
            
            expect(Referee.judgeMove(
                p1, board, 'a1', 'ox', 1,
            )).toBeFalsy();
        });

        test('legal move', () => {
            const {p1, board} = setup();
            board.at = jest.fn()
                .mockImplementationOnce(() => ({
                    pawn: {
                        color: 'red',
                    },
                }))
                .mockImplementationOnce(() => ({
                    pawn: {
                        color: 'blue',
                    },
                }));
            
            p1.findMatchingCard = jest.fn().mockReturnValue({
                getRelativePosition: () => ({
                    x: 0,
                    y: 0,
                }),
            });
            
            expect(Referee.judgeMove(
                p1, board, 'a1', 'ox', 1,
            )).toBeTruthy();
        });
    });

    describe('when judging a win', () => {
        test('a win', () => {
            const { board } = setup();

            Object.defineProperty(board, 'grid', {
                value: [
                    [{pawn: new MasterPawn('red')}],
                    [{pawn: new StudentPawn('red', 0)}],
                ],
            });
            
            expect(Referee.judgeWin(board)).toBeTruthy();
        });

        test('no win', () => {
            const { board } = setup();

            const redKing = new MasterPawn('red');
            Object.defineProperty(redKing, 'color', {value: 'red'});
            const blueKing = new MasterPawn('blue');
            Object.defineProperty(blueKing, 'color', {value: 'blue'});

            Object.defineProperty(board, 'grid', {
                value: [
                    [{pawn: redKing }],
                    [{pawn: blueKing }],
                ],
            });
            
            expect(Referee.judgeWin(board)).toBeFalsy();
        });
    });
});