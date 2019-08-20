import Game from './Game';

import Player from 'models/player/Player';
import Board from 'models/board/Board';
import Deck from 'models/deck/Deck';
import Referee from 'services/referee/Referee';
import * as GameViewModel from 'view-models/game/GameViewModel';

jest.mock('models/board/Board');
jest.mock('models/player/Player', () => {
    const Player = function() {};
    Player.prototype.color = 'red';
    Player.prototype.cards = [
        {name: 'ox', map: { toString: () => 'a map' }},
        {name: 'ox', map: { toString: () => 'a map' }},
    ];
    Player.prototype.viewModel = {};

    Player.prototype.findMatchingCard = jest.fn();
    Player.prototype.movePawn = jest.fn();
    Player.prototype.swapCard = jest.fn().mockReturnValue({name: '', map: ''});

    return {
        __esModule: true,
        default: Player,
    };
});
jest.mock('models/card/Card');
jest.mock('models/deck/Deck', () => {
    const Deck = function () {};
    Deck.prototype.draw = jest.fn().mockReturnValue({name: '', map: ''});
    Deck.prototype.shuffle = jest.fn().mockReturnThis();
    
    return {
        __esModule: true,
        default: Deck,
    };
});
jest.mock('models/Coordinate');

jest.mock('view-models/game/GameViewModel', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('services/referee/Referee');

describe('Game', () => {
    test('it should start a new game', () => {
        jest.spyOn(Deck.prototype, 'draw');

        const game = new Game();
        expect(game.board instanceof Board).toBeTruthy();
        expect(Deck.prototype.draw).toHaveBeenCalledTimes(5);
    });

    test('it should have an active player', () => {
        const game = new Game();
        expect(game.activePlayer).toBe(game.p1);
    });

    test('it should return a view model without a winning player', () => {
        const game = new Game();
        game.viewModel;

        expect(GameViewModel.default).toHaveBeenCalledWith(
            undefined,
            {},
            {},
            undefined,
            undefined,
        );
    });

    describe('when moving a pawn', () => {
        test('it shouldnt move if its not a legal move', () => {
            Referee.judgeMove = jest.fn().mockReturnValue(false);

            const game = new Game();
            game.move('a1', 'ox', '1');

            expect(Player.prototype.movePawn).not.toHaveBeenCalled();
        });

        test('it should throw an error if in a win state', () => {
            Referee.judgeMove = jest.fn().mockReturnValue(true);
            Referee.judgeWin = jest.fn().mockReturnValue(true);
            Board.from = jest.fn().mockReturnValue({x: 0, y: 0});
            Board.prototype.at = jest.fn().mockReturnValue({
                pawn: null,
            });
            Player.prototype.findMatchingCard = jest.fn().mockReturnValue({
                getRelativePosition: () => ({x: 0, y: 0}),
            });

            const game = new Game();
            game.move('a1', 'ox', '1');

            expect(game.winningPlayer).toBeDefined();
            expect(game.viewModel).toBeDefined();
            expect(GameViewModel.default).toHaveBeenCalledWith(
                undefined,
                {},
                {},
                undefined,
                {},
            );

            expect(() => {
                game.move('a1', 'ox', '1');
            }).toThrowError('game complete. start a new game.');
        }); 

        test('it should change active player once turn is complete and noone has won', () => {
            Referee.judgeMove = jest.fn().mockReturnValue(true);
            Referee.judgeWin = jest.fn().mockReturnValue(false);
            Board.from = jest.fn().mockReturnValue({x: 0, y: 0});
            Board.prototype.at = jest.fn().mockReturnValue({
                pawn: null,
            });
            Player.prototype.findMatchingCard = jest.fn().mockReturnValue({
                getRelativePosition: () => ({x: 0, y: 0}),
            });

            const game = new Game();
            game.move('a1', 'ox', '1');
            expect(game.activePlayer).toEqual(game.p2);
            game.move('a1', 'ox', '1');
            expect(game.activePlayer).toEqual(game.p1);
        });
    });

    describe('when passing a turn', () => {
        test('it should pass if not able to move', () => {
            jest.spyOn(Referee, 'judgeNoLegalMoves').mockReturnValue(true);
            Player.prototype.findMatchingCard = jest.fn().mockReturnValue({ name: 'a-card' });
            Player.prototype.swapCard = jest.fn();
            
            const game = new Game();
            game.pass('cardName');
            expect(game.activePlayer).toEqual(game.p2);
            expect(Player.prototype.swapCard).toHaveBeenCalled();
        });

        test('it should throw an error if able to move', () => {
            jest.spyOn(Referee, 'judgeNoLegalMoves').mockReturnValue(false);

            const game = new Game();
            expect(() => {
                game.pass('cardName');
            }).toThrowError('legal moves exist');
        });

        test('it should throw an error if no card found', () => {
            jest.spyOn(Referee, 'judgeNoLegalMoves').mockReturnValue(true);
            Player.prototype.findMatchingCard = jest.fn().mockReturnValue(undefined);
            Player.prototype.swapCard = jest.fn();
            
            const game = new Game();
            expect(() => {
                game.pass('cardName');
            }).toThrowError('no card matching "cardName" found');
        });
    });

    describe('when getting help', () => {
        test('it should report no legal moves exist', () => {
            jest.spyOn(Referee, 'judgeNoLegalMoves').mockReturnValue(true);
            expect(() => {
                new Game().help();
            }).toThrowError('no legal moves exist');
        });
        test('it should report legal moves exist', () => {
            jest.spyOn(Referee, 'judgeNoLegalMoves').mockReturnValue(false);
            expect(() => {
                new Game().help();
            }).toThrowError('legal moves exist');
        });
    });
});
