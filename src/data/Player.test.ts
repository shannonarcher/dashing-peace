import Player from './Player';
import Card from 'data/card/Card';
jest.mock('data/card/Card');

it('should have cards', () => {
    const c = jest.fn<Card, [string]>();
    const p = new Player(c, c);
    expect(p.cards).toEqual([c, c]);
});