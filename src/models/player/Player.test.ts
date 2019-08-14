import Player from './Player';
import Card from 'models/card/Card';
import CardMap from 'models/card/CardMap';
import Board from 'models/board/Board';
import Pawn from 'models/board/pawns/Pawn';
import Coordinate from 'models/Coordinate';
import PlayerViewModel from 'view-models/player/PlayerViewModel';

jest.mock('view-models/player/PlayerViewModel');

jest.mock('models/card/Card', () => {
    class Card {
        readonly name: string;
        constructor(name: string) {
            this.name = name;
        }

        get viewModel() {
            const map = [[' ',' ','o',' ',' ']];
            return {};
        }
    }
    
    return {
        __esModule: true,
        default: Card,
    };
});
jest.mock('models/card/CardMap');
jest.mock('models/board/Board');

const card = new Card('ox', new CardMap('ox'));

test('it should have two cards', () => {
    expect(new Player('red', true, card, card).cards.length).toBe(2);
});

test('it should have a direction of 1 if facing south', () => {
    expect(new Player('red', true, card, card).direction).toBe(1);
});

test('it should have a direction of -1 if facing north', () => {
    expect(new Player('red', false, card, card).direction).toBe(-1);
});

test('it should move a pawn', () => {
    const player = new Player('red', true, card, card);
    
    const board = new Board(player, player);
    const pawn = new Pawn('red');
    player.movePawn(board, pawn, new Coordinate(3, 3));
    
    expect(Board.prototype.set).toHaveBeenCalledWith(3, 3, pawn);
});

test('it should throw an error if trying to move a pawn that doesnt exist', () => {
    const player = new Player('red', true, card, card);
    
    const board = new Board(player, player);
    expect(() => {
        player.movePawn(board, undefined, new Coordinate(3, 3));
    }).toThrowError('no pawn selected for movement');
});

test('it should swap cards', () => {
    const c1 = new Card('ox', new CardMap('ox'));
    const c2 = new Card('dragon', new CardMap('dragon'));
    const field = new Card('rabbit', new CardMap('rabbit'));

    const player = new Player('red', true, c1, c2);

    expect(player.swapCard(c1, field)).toBe(c1);
    expect(player.cards).toContain(field);
    expect(player.cards).not.toContain(c1);

    expect(player.swapCard(c2, c1)).toBe(c2);
    expect(player.cards).toContain(c1);
    expect(player.cards).not.toContain(c2);
});

test('it should find a matching card', () => {
    const c1 = new Card('ox', new CardMap('ox'));
    const c2 = new Card('dragon', new CardMap('dragon'));
    const player = new Player('red', true, c1, c2);

    expect(player.findMatchingCard('ox')).toBe(c1);
});

test('it should create a view model', () => {
    const player = new Player('red', true, card, card);
    expect(player.viewModel instanceof PlayerViewModel).toBeTruthy();
});