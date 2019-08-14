import Card from './Card';
import CardMap from './CardMap';
import CardViewModel from 'view-models/card/CardViewModel';

jest.mock('./CardMap');
jest.mock('view-models/card/CardViewModel');
jest.mock('models/Coordinate');

test('it should get the relative coordinate for a move from the card map', () => {
    const map = new CardMap('ox');
    map.getRelativePosition = jest.fn();

    const card = new Card('ox', map);
    card.getRelativePosition(1);
    expect(map.getRelativePosition).toHaveBeenCalledWith(1);
});

test('it should get a view model', () => {
    const map = new CardMap('ox');
    Object.defineProperty(map, 'mapData', {
        value: [
            '     ',
            '  o  ',
            '  x  ',
        ],
    });

    const card = new Card('ox', map);
    expect(card.viewModel instanceof CardViewModel).toBeTruthy();
});