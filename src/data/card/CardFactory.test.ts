import CardFactory from './CardFactory';
import Card from './Card';
import CardMap from './CardMap';

it('should create a card', () => {
    const card: Card = CardFactory('monkey');
    expect(card.name).toEqual('monkey');
    expect(card.map).toEqual(new CardMap('monkey'));
})