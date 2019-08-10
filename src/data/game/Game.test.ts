import Game from './Game';
import * as Deck from 'data/deck/Deck';
import * as Player from 'data/Player';
import Card from 'data/card/Card';
import CardMap from 'data/card/CardMap';

jest.mock('data/board/Board');
jest.mock('data/Player');

describe('Game', () => {
    beforeEach(() => {
        Deck.default = jest.fn().mockImplementation(() => ({
            shuffle() {
                return this;
            },
            draw() {
                return new Card(
                    'monkey',
                    new CardMap('monkey'),
                );
            },
        }));

        Player.default = jest.fn();
    });

    it('should start a new game', () => {
        const game = new Game();

        expect(game.board).toBeDefined();

        const monkeyCard = {name: 'monkey'};
        expect(Player.default.mock.calls[0][0]).toMatchObject(monkeyCard);
        expect(Player.default.mock.calls[0][1]).toMatchObject(monkeyCard);
        
        expect(Player.default.mock.calls[1][0]).toMatchObject(monkeyCard);
        expect(Player.default.mock.calls[1][1]).toMatchObject(monkeyCard);

        expect(game.fieldCard instanceof Card).toBeTruthy();
        expect(game.fieldCard).toMatchObject(monkeyCard);
    });
});
