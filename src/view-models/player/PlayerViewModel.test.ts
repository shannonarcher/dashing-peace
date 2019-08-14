import PlayerViewModel from './PlayerViewModel';

jest.mock('view-models/card/CardViewModel');

test('it should have color and cards', () => {
    const player = new PlayerViewModel('red', []);
    expect(player.color).toEqual('red');
    expect(player.cards).toEqual([]);
});