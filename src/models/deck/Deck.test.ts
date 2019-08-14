import Deck from './Deck';
import { getTypes } from 'models/card/CardFactory';
import Card from 'models/card/Card';

jest.mock('models/card/Card');
jest.mock('models/card/CardMap');
jest.mock('models/card/CardFactory', () => ({
    __esModule: true, // this property makes it work
    default: () => {},
    getTypes: jest.fn().mockImplementation(() => ({
        'donkey': true,
        'monkey': true,
        'zonkey': true,
    })),
}));

describe('deck', () => {
    test('it should create a deck with all the cards', () => {
        const deck = new Deck();
        expect(deck.cards.length).toBe(
            Object.values(getTypes()).length,
        );
    });
    
    test('it should shuffle the deck', () => {
        const deck = new Deck();
        const existingDeck: Card[] = [...deck.cards];
        deck.shuffle('seed');

        expect(existingDeck.some(
            (card: Card, index: number) => (
                card !== deck.cards[index]
            ),
        )).toBeTruthy();
    });

    test('it should draw a card', () => {
        const deck = new Deck();
        const nextCard = deck.cards[deck.cards.length - 1];
        expect(deck.draw()).toEqual(nextCard);
    });

    test('it should throw an error when drawing a card from an empty deck', () => {
        const deck = new Deck();
        for (let i = 0; i < Object.values(getTypes()).length; i++) {
            deck.draw();
        }

        expect(() => {
            deck.draw();
        }).toThrowError('Empty Deck!');
    });
});