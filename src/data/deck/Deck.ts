import seedrandom from 'seedrandom';

import Card from "data/card/Card";
import CardMap from "data/card/CardMap";
import { getTypes } from "data/card/CardFactory";

class Deck {
    private _cards: Card[];

    constructor() {
        this._cards = Object.values(getTypes())
            .map((type: string) => new Card(
                type, 
                new CardMap(type),
            ));
    }

    get cards(): Card[] {
        return this._cards;
    }

    shuffle(seed: string | undefined): Deck {
        const rng = seedrandom(seed);

        this._cards = this._cards
            .map(a => [rng(), a])
            .sort((a: any[], b: any[]) => a[0] - b[0])
            .map((a: any[]) => a[1]);
        
        return this;
    }

    draw(): Card {
        if (this._cards.length === 0) {
            throw new Error('Empty Deck!');
        }
        const drawnCard: Card = this._cards[this._cards.length - 1];
        this._cards.pop();
        return drawnCard;
    }
}

export default Deck;