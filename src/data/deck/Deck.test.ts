import Deck from './Deck';
import { getTypes } from 'data/card/CardFactory';
import Card from 'data/card/Card';

jest.mock('data/card/Card');
jest.mock('data/card/CardMap');

describe('deck', () => {
    it('should create a deck with all the cards', () => {
        const deck = new Deck();
        expect(deck.cards.length).toBe(
            Object.values(getTypes()).length,
        );
    });
    
    it('should shuffle the deck', () => {
        const deck = new Deck();
        const existingDeck: Card[] = [...deck.cards];
        deck.shuffle('seed');

        expect(existingDeck.some(
            (card: Card, index: number) => (
                card !== deck.cards[index]
            ),
        )).toBeTruthy();
    });

    it('should draw a card', () => {
        const deck = new Deck();
        const nextCard = deck.cards[deck.cards.length - 1];
        expect(deck.draw()).toEqual(nextCard);
    });

    it('should throw an error when drawing a card from an empty deck', () => {
        const deck = new Deck();
        for (let i = 0; i < Object.values(getTypes()).length; i++) {
            deck.draw();
        }

        try {
            deck.draw();
            throw Error('bad error');
        } catch(e) {
            expect(e.message).toEqual('Empty Deck!');
        }
    });
});