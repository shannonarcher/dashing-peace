import seedrandom from 'seedrandom';

import Card from 'models/card/Card';
import CardMap from 'models/card/CardMap';
import { getTypes } from 'models/card/CardFactory';

class Deck {
  private _cards: Card[];

  constructor() {
    this._cards = Object.values(getTypes()).map(
      (type: string) => new Card(type, new CardMap(type))
    );
  }

  get cards(): Card[] {
    return this._cards;
  }

  shuffle(seed: string | undefined): Deck {
    const rng = seedrandom(seed);

    this._cards = this._cards
      .map(a => ({
        num: rng(),
        card: a
      }))
      .sort((a: { num: number }, b: { num: number }) => a.num - b.num)
      .map((a: { card: Card }) => a.card);

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
